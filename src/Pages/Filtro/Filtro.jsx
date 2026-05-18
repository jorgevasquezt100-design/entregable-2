import React from 'react'
import "./Filtro.css"
import Apiconsumer from '../../Components/Apiconsumer/Apiconsumer'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';



const Filtro = () => {
  const op = [
    "Human",
    "Alien",
    "Humanoid",
    "Poopybutthole",
    "Mythological Creature",
    "Animal",
    "Robot",
    "Cronenberg",
    "Disease",
    "unknown",
  ];
  const [busqueda, setBusqueda] = React.useState("");
 return (
  <div>

    <div className="filtro-container">
      <Autocomplete
        disablePortal
        options={op}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Especie" />
        )}
        value={busqueda}
        onInputChange={(event, newValue) =>
          setBusqueda(newValue)
        }
      />
    </div>

    <Apiconsumer especie={busqueda} />

  </div>
)
}

export default Filtro
