import React, { useState } from "react";
import "./Cardcharacter.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useSpring, animated } from "@react-spring/web";

// funciones
const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Cardcharacter = ({
  imagen,
  nombre,
  especie,
  estado,
  genero,
  origen,
  locacion,
  capitulo,
}) => {
  //variables
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
<Card
  className="character-card"
  
  onClick={handleOpen}
>
  <CardActionArea
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
    }}
  >
  <CardMedia
  component="img"
  image={imagen}
  alt={nombre}
  sx={{
    height: 220,
    objectFit: "contain",
    backgroundColor: "#f5f5f5",
  }}
/>

    <CardContent
      sx={{
        flexGrow: 1,
      }}
    >
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        noWrap
      >
        {nombre}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
        }}
      >
        Especie: {especie} <br />
        Estado: {estado} <br />
        Género: {genero}
      </Typography>
    </CardContent>
  </CardActionArea>
</Card>

   <Modal
  aria-labelledby="spring-modal-title"
  aria-describedby="spring-modal-description"
  open={open}
  onClose={handleClose}
  closeAfterTransition
  slots={{ backdrop: Backdrop }}
  slotProps={{
    backdrop: {
      slots: { transition: Fade },
      className: "custom-backdrop",
    },
  }}
>
     <Fade in={open}>
  <Box className="character-modal">

    <img
      src={imagen}
      alt={nombre}
      className="modal-image"
    />

    <Typography
      id="spring-modal-title"
      variant="h6"
      component="h2"
      className="modal-title"
    >
      {nombre}
    </Typography>

    <Typography
      id="spring-modal-description"
      className="modal-description"
      sx={{ mt: 2 }}
    >
      Especie: {especie} <br />
      Estado: {estado} <br />
      Género: {genero} <br />
      Origen: {origen} <br />
      Locación: {locacion} <br />
      Capítulo: {capitulo}
    </Typography>

  </Box>
</Fade>
      </Modal>
    </>
  );
};

export default Cardcharacter;
