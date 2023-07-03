import { useContext, useEffect, useState } from "react";
import { apiUrl } from '../../../utils/variables';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {NotificationContext} from "../../context/Notification.context"
import './rtmodal.css'
import { Grid } from "@mui/material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
export const RegistroTallerModal = () => {
  const url = `${apiUrl}/taller/crear`
  const formReg = document.querySelector('form')
  const { addNotification } = useContext(NotificationContext);
  const [tallerData, setTallerData] = useState({
      nombre: '',
      telefono: '',
      ciudad: '',
      direccion: '',
      latitud: "",
      longitud: "",
      imagenPrincipal: '',
      descripcion: '',
      tituloCategoria: '',
      politicas: [],
      nombreServicios: [],
      urlImgs: []
    });

    const [listaPoliticas, setListaPoliticas] = useState(false)
    const [listaServicios, setListaServicios] = useState(false)
    const [listaUrls, setListaUrls] = useState(false)

    useEffect(()=>{
      if(tallerData.politicas != []){
        setListaPoliticas(tallerData.politicas)
      }
      if(tallerData.nombreServicios != []){
        setListaServicios(tallerData.nombreServicios)
      }
      if(tallerData.urlImgs != []){
        setListaUrls(tallerData.urlImgs)
      }
    },[tallerData])

    const resetTallerData = () => {
      setTallerData({
        nombre: '',
        telefono: '',
        ciudad: '',
        direccion: '',
        latitud: "",
        longitud: "",
        imagenPrincipal: '',
        descripcion: '',
        tituloCategoria: '',
        politicas: [],
        nombreServicios: [],
        urlImgs: []
      });
    };

    const handleCreateTaller = (e) => {
      e.preventDefault()
      fetch(url, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tallerData)
      })
       .then(res => {
          if(res.ok){
            addNotification({
              texto: `SE REGISTRO EL TALLER  ${tallerData.nombre} CON EXITO`,
              tipo: "success",
            });
              setTimeout(()=>{
                  formReg.reset();
                  resetTallerData()
              },3000)
          }
          else{
            addNotification({
              texto: "Error, el taller no pudo ser registrar :(",
              tipo: "error",
            });
              setTimeout(()=>{
                  formReg.reset()
                  resetTallerData()

              },3000)
          }
       })
    }
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setTallerData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleAgregarItem = (e, key) => {
      e.preventDefault();
      const inputValue = e.target.parentNode.firstChild.value;
      if (inputValue.trim() !== '') {
        setTallerData((prevState) => ({
          ...prevState,
          [key]: [...prevState[key], inputValue]
        }));
        e.target.parentNode.firstChild.value = '';
      }
    };
    
    
  return (
    <> 
      
      <div className='modal-content'>
    <form onSubmit={handleCreateTaller}>

    <h1>REGISTRO TALLER</h1>
<Grid container spacing={3}>
    <Grid item xs={6} sm={4}>
    <TextField
        required
        type="text"
        placeholder='Nombre'
        name='nombre'
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={6} sm={4}>
      <TextField
        required
        type="number"
        placeholder='Teléfono'
        name='telefono'
        onChange={handleInputChange}
      />
      </Grid>
      <Grid item xs={6} sm={4}>
      <TextField
        required
        type="text"
        placeholder='Ciudad'
        name='ciudad'
        onChange={handleInputChange}
      />
      </Grid>
      <Grid item xs={6} sm={4}>
      <TextField
        required
        type="text"
        placeholder='Dirección'
        name='direccion'
        onChange={handleInputChange}
      />
      </Grid>

      <Grid item xs={6} sm={4}>
      <TextField
        required
        type="number"
        placeholder='Latitud'
        name='latitud'
        onChange={handleInputChange}
      />
      </Grid>

      <Grid item xs={6} sm={4}>
      <TextField
        required
        type="number"
        placeholder='Longitud'
        name='longitud'
        onChange={handleInputChange}
      />
      </Grid>
      <Grid item xs={6} sm={4}>
      <TextField
        required
        type="text"
        placeholder='Url imagen principal'
        name='imagenPrincipal'
        onChange={handleInputChange}
      />
      </Grid>
      <Grid item xs={6} sm={4}>
      <TextField
        required
        type="text"
        placeholder='Descripción'
        name='descripcion'
        onChange={handleInputChange}
      />
      </Grid>
      <Grid item xs={6} sm={4}>
      <TextField
        required
        type="text"
        placeholder='Categoría'
        name='tituloCategoria'
        onChange={handleInputChange}
      />
      </Grid>
     
        <div className="politicasYservicios">
          <div className="seccion-politcas">
            <div>
              <input className="agregarListInput" type="text" placeholder='politicas del taller' />
              <button className='agregarListBt' onClick={(e) => {handleAgregarItem(e, 'politicas')}}>Agregar</button>
            </div>
            <div className="listado-politicas">
              {listaPoliticas && listaPoliticas.map((politica, index) => (
                <p className="elementoLista" key={index}>● {politica}</p>
              ))}
            </div>
          </div>
          <div className="seccion-servicios"> 
            <div>
              <input className="agregarListInput"  type="text" placeholder='servicios ofrecidos' />
              <button className='agregarListBt' onClick={(e) => handleAgregarItem(e, 'nombreServicios')}>Agregar</button>
            </div>
            <div className="listado-servicios">
              {listaServicios && listaServicios.map((serv, index) => (
                <p className="elementoLista" key={index}>● {serv}</p>
              ))}
            </div>
          </div>
          <div className="seccion-imagenes">
            <div>
              <input className="agregarListInput"  type="text" placeholder='urls imagenes' />
              <button className='agregarListBt' onClick={(e) => handleAgregarItem(e, 'urlImgs')}>Agregar</button>
            </div>
            <div className="listado-imagenes">
              {listaUrls && listaUrls.map((urlx, index) => (
                <p className="elementoLista" key={index}>● {urlx}</p>
              ))}
            </div>
          </div>
        </div>

        <Grid item xs={6} sm={4}>

        </Grid>
        </Grid>
          <Button
            className='button'
            type="submit"
            variant="contained"
          >
            Registrar
          </Button>
    </form>
  </div>


    </>
 
  )
}