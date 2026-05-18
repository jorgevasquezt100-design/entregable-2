import React, { useState, useEffect } from "react";
import "./Apiconsumer.css";
import Cardcharacter from "../Cardcharacter/Cardcharacter";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';



const Apiconsumer = ({ especie }) => {
  const [personajes, setPersonajes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    setPage(1);
  }, [especie]);

  useEffect(() => {
    setLoading(true);
    // URL dinámica
    const url =
      especie.trim() !== ""
        ? `https://rickandmortyapi.com/api/character?page=${page}&species=${especie}`
        : `https://rickandmortyapi.com/api/character?page=${page}`;

    fetch(url)
      .then((response) => response.json())
      .then(async (data) => {
        // Total dinámico de páginas
        setTotalPages(data.info.pages);

        const personajesConCapitulo = await Promise.all(
          data.results.map(async (personaje) => {
            const resEpisode = await fetch(personaje.episode[0]);

            const dataEpisode = await resEpisode.json();

            return {
              ...personaje,
              capitulo: dataEpisode.name,
            };
          }),
        );

        setPersonajes(personajesConCapitulo);

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);

        setPersonajes([]);
        setTotalPages(1);

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  }, [page, especie]);
  return (
    <div>
      <div className="apiconsumer-container">
        {
          loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <CircularProgress aria-label="Loading…" />
            </Box>
          ) : personajes.length > 0 ? (
            personajes.map((personaje) => (
              <Cardcharacter
                key={personaje.id}
                imagen={personaje.image}
                nombre={personaje.name}
                especie={personaje.species}
                estado={personaje.status}
                genero={personaje.gender}
                origen={personaje.origin.name}
                locacion={personaje.location.name}
                capitulo={personaje.capitulo}
              />
            ))
          ) : (
            <p>No characters found.</p>
          )
        }
      </div>
      <Stack spacing={2}>
        <Pagination
          page={page}
          onChange={handlePageChange}
          count={totalPages}
          color="primary"
          size="large"
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Stack>

    </div>
  );
};

export default Apiconsumer;
