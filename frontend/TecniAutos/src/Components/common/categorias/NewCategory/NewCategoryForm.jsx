import { Button, TextField } from "@mui/material";
import { useContext, useMemo, useState } from "react";
import "../NewCategory/NewCategoryForm.css";
import { NotificationContext } from "../../../context/Notification.context";
import {apiUrl} from "../../../../utils/variables"

const NewCategoryForm = () => {
  const url = `${apiUrl}/categoria/crear`;
  const { addNotification } = useContext(NotificationContext);
  const [formValues, setFormValues] = useState({
    titulo: "",
    descripcion: "",
    urlImg: "",
  });

  const isSubmitButtonDisabled = useMemo(
    () => Object.keys(formValues).some((key) => formValues[key] === ""),
    [JSON.stringify(formValues)]
  );

  // const [selectedImage, setSelectedImage] = useState(null);

  /* const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  }; */

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("image", selectedImage);
    /* Object.keys(formValues).forEach((key) => {
      formData.append(key, formValues[key]);
    }); */
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    }).then((res) => {
      if (res.ok) {
        addNotification({
          texto: "Nueva Categoría creada con éxito!",
          tipo: "success",
        });
      } else {
        addNotification({
          texto: "Error, la categoria no pudo ser creeada :(",
          tipo: "error",
        });
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          type="text"
          id="outlined-basic"
          label="Título"
          name="titulo"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          required
          multiline
          rows={4}
          type="text"
          id="outlined-basic"
          label="Descripción"
          name="descripcion"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          required
          type="text"
          id="outlined-basic"
          label="Imagen"
          name="urlImg"
          variant="outlined"
          onChange={handleChange}
        />
        {/* <TextField
        type="file"
        label="Seleccionar imagen"
        onChange={handleImageChange}
        InputLabelProps={{ shrink: true }}
        inputProps={{ accept: "image/*" }}
      />
      {selectedImage && (
        <div style={{ maxWidth: "100%", maxHeight: "100%", marginTop: "10px" }}>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
      )} */}
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitButtonDisabled}
        >
          Crear Categoría
        </Button>
      </form>
    </>
  );
};

export default NewCategoryForm;
