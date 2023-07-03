
import { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import "./registroUser.css";
import MensajeAlerta from "../MensajeAlerta/MensajeAlerta";
import { apiUrl } from "../../../utils/variables";
import imgRegistro from "../../../Img/image1.png";

const INITIAL_MESSAGE = {
  texto: "",
  tipo: "",
};

const RegistroUsuario = () => {
  const [userData, setUserData] = useState(false);
  const [mensaje, setMensaje] = useState(INITIAL_MESSAGE);
  const url = `${apiUrl}/usuario/signup`;
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then((res) => {
      if (res.ok) {
        setMensaje({
          texto: "El usuario se ha registrado con éxito!",
          tipo: "success",
        });
        return res.json()
      } else {
        setMensaje({
          texto:
            "Error en uno o más campos, el usuario no se pudo registrar :(",
          tipo: "error",
        });
      }
      
    })
    .then(data => sessionStorage.setItem("jwt",data.token))
    .catch(err => console.log(err))
  };

  const handleCloseAlert = () => {
    setMensaje(INITIAL_MESSAGE);
  };

  return (
    <>
      <div className="containerForm">
       
      
        <MensajeAlerta
          open={!!mensaje.texto}
          onClose={handleCloseAlert}
          severity={mensaje.tipo}
          mensaje={mensaje.texto}
        />
             <form className="form-container">
        <h2>¡Estamos contentos de que hagas parte de nuestra red! <br />👨🏽‍🔧 💙 🚘</h2>
        <Grid container spacing={2}>
        <Grid item xs={6} sm={6}>
          <TextField
            type="text"
            id="outlined-basic"
            label="Nombre"
            variant="outlined"
            onChange={(e) => {
              setUserData({ ...userData, nombre: e.target.value });
            }}
          />
          </Grid>
          <Grid item xs={6} sm={6}>
          <TextField
            type="text"
            id="outlined-basic"
            label="Apellidos"
            variant="outlined"
            onChange={(e) => {
              setUserData({ ...userData, apellido: e.target.value });
            }}
          />
          </Grid>
          <Grid item xs={6} sm={6}>
          <TextField
            type="password"
            id="outlined-basic"
            label="Contraseña"
            variant="outlined"
            onChange={(e) => {
              setUserData({ ...userData, password: e.target.value });
            }}
          />
          </Grid>
          <Grid item xs={6} sm={6}>
          <TextField
            type="email"
            id="outlined-basic"
            label="Correo"
            variant="outlined"
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
          />
          </Grid>
          <Grid item xs={6} sm={6}>
          <TextField
            type="number"
            id="outlined-basic"
            label="Teléfono"
            variant="outlined"
            onChange={(e) => {
              setUserData({ ...userData, celular: e.target.value });
            }}
          />
          </Grid>
          <Grid item xs={6} sm={6}>
          <TextField
            type="number"
            id="outlined-basic"
            label="Documento"
            variant="outlined"
            onChange={(e) => {
              setUserData({ ...userData, dni: e.target.value });
            }}
          />
          </Grid>
       
          </Grid>
          <Button type="submit reset"  variant="contained" onClick={handleSubmit}>
            Registrar
          </Button>
        </form>
        <div className="imgRegistro">
        <img src={imgRegistro} alt="login" />
        </div>
      </div>
    </>
  );
};

export default RegistroUsuario;

