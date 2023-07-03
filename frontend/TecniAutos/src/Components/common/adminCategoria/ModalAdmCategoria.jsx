import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import "./modalAdmCat.css";
import { apiUrl } from "../../../utils/variables";

import {NotificationContext} from "../../context/Notification.context"

const ModalAdmCategoria = () => {
    const [categoriaData, setCategoriaData] = useState({
      titulo: "",
      urlImg: "",
      descripcion: "",
    });
    const { addNotification } = useContext(NotificationContext);
    const url = `${apiUrl}/categoria/new`;
  
    const handleSubmit = (e) => {
      e.preventDefault();
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoriaData),
      })
        .then((res) => res.json())
        .then((data) => {
          setCategoriaData({ titulo: "", urlImg: "", descripcion: "" });
          addNotification({
            texto: `SE CREO LA CATEGORIA ${data.titulo} CON EXITO`,
            tipo: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          addNotification({
            texto: "Error, la categoria no pudo ser creada :(",
            tipo: "error",
          });
        });
    };
  
    const handleChange = (e) => {
      setCategoriaData({
        ...categoriaData,
        [e.target.name]: e.target.value,
      });
    };
  
    return (
        <div className="modal-content">
          <form id="formRegistroCat" onSubmit={handleSubmit}>
            <h1>REGISTRO CATEGORIA</h1>
            <div className="divInputs">
              <TextField
                required
                type="text"
                name="titulo"
                label="Título"
                value={categoriaData.titulo}
                variant="outlined"
                onChange={handleChange}
              />
              <TextField
                required
                multiline
                rows={4}
                type="text"
                name="descripcion"
                label="Descripción"
                value={categoriaData.descripcion}
                variant="outlined"
                onChange={handleChange}
                className="descripcionArea"
              />
              <TextField
                required
                type="text"
                name="urlImg"
                label="URL Imagen"
                value={categoriaData.urlImg}
                variant="outlined"
                onChange={handleChange}
              />
            </div>
            <Button
          type="submit"
          variant="contained"
        >
          Crear Categoría
        </Button>
          </form>
     
        </div>
    
  )
}

export default ModalAdmCategoria