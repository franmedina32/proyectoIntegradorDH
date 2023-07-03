import React, { useEffect, useState } from 'react';
import { faGear, faL } from '@fortawesome/free-solid-svg-icons';
import { json } from 'react-router-dom';
import './estilosMA.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { apiUrl } from '../../../utils/variables';
import { Button, Grid, TextField } from '@mui/material';

const ModalAdminE = (props) => {
  const [tallerData, setTallerData] = useState(false);
  const [updateInfo, setUpdateInfo] = useState({});
  const [mensajePolitica, setMensajePolitica] = useState(false);
  const [mensajeServicio, setMensajeServicio] = useState(false);
  const [mensajeImagenes, setMensajeImagenes] = useState(false);
  const [mensajeUpdate, setMensajeUpdate] = useState(false);
  const updateUrl = `${apiUrl}/taller/admin/update`;
  const eliminarPoliticaUrl = `${apiUrl}/politicas/admin/delete`;
  const eliminarServicioUrl = `${apiUrl}/servicios/admin/delete`;
  const eliminarImagenUrl = `${apiUrl}/imagenes/admin/delete`;
  const [nuevaPolitica, setNuevaPolitica] = useState('')
  const [nuevoServicio, setNuevoServicio] = useState('')
  const [nuevaUrl, setNuevaUrl] = useState('')

  useEffect(() => {
    const { tallData } = props;
    setTallerData({
      id: tallData.id || '',
      nombre: tallData.nombre || '',
      telefono: tallData.telefono || '',
      ciudad: { nombre: tallData.ciudad.nombre } || '',
      direccion: tallData.direccion || '',
      urlImgPrincipal: tallData.urlImgPrincipal || '',
      descripcion: tallData.descripcion || '',
      categoria: { titulo: tallData.categoria.titulo } || '',
      politicas: tallData.politicas
        ? tallData.politicas.map((politica) => ({ ...politica }))
        : [],
      servicios: tallData.servicios
        ? tallData.servicios.map((servicio) => ({ ...servicio }))
        : [],
      urls: tallData.imgs ? tallData.imgs.map((url) => ({ ...url })) : [],
    });
  }, [props.tallData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'ciudad') {
      setTallerData((prevState) => ({
        ...prevState,
        ciudad: {
          nombre: value,
        },
      }));
    } else if (name === 'categoria') {
      setTallerData((prevState) => ({
        ...prevState,
        categoria: {
          titulo: value,
        },
      }));
    } else {
      setTallerData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleEliminarPolitica = (id, e) => {
    e.preventDefault();
    fetch(eliminarPoliticaUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tallerId: tallerData.id,
        politicaId: id,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setMensajePolitica('SE ELIMINO LA POLITICA CON EXITO');
          setTimeout(() => {
            setMensajePolitica(false);
          }, 3000);
        } else {
          setMensajePolitica('ERROR: NO SE PUDO ELIMINAR LA POLITICA');
          setTimeout(() => {
            setMensajePolitica(false);
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleAgregarPolitica = (inputValue, e) => {
    e.preventDefault();
    const key = 'politicas';
    fetch(`${apiUrl}/taller/politica/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tallerId: tallerData.id,
        nombrePolitica: inputValue,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setMensajePolitica('SE AGREGO LA POLITICA CON EXITO');
          setTimeout(() => {
            setMensajePolitica(false);
          }, 3000);
          setNuevaPolitica('')
        } else {
          setMensajePolitica('ERROR: NO SE PUDO AGREGAR LA POLITICA');
          setTimeout(() => {
            setMensajePolitica(false);
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleEliminarServicio = (id, e) => {
    e.preventDefault();
    fetch(eliminarServicioUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tallerId: tallerData.id,
        servicioId: id,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setMensajeServicio('SE ELIMINO EL SERVICIO CON EXITO');
          setTimeout(() => {
            setMensajeServicio(false);
          }, 3000);
        } else {
          setMensajeServicio('ERROR: NO SE PUDO ELIMINAR EL SERVICIO');
          setTimeout(() => {
            setMensajeServicio(false);
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleAgregarServicio = (inputValue, e) => {
    e.preventDefault();
    const key = 'servicios';
    fetch(`${apiUrl}/taller/servicios/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tallerId: tallerData.id,
        nombreServicio: inputValue,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setMensajeServicio('SE AGREGO EL SERVICIO CON EXITO');
          setTimeout(() => {
            setMensajeServicio(false);
          }, 3000);
          setNuevoServicio('')
        } else {
          setMensajeServicio('ERROR: NO SE PUDO AGREGAR EL SERVICIO');
          setTimeout(() => {
            setMensajeServicio(false);
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleEliminarUrl = (id, e) => {
    e.preventDefault();
    fetch(eliminarImagenUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tallerId: tallerData.id,
        imagenId: id,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setMensajeImagenes('SE ELIMINO LA IMAGEN CON EXITO');
          setTimeout(() => {
            setMensajeImagenes(false);
          }, 3000);
        } else {
          setMensajeImagenes('ERROR: NO SE PUDO ELIMINAR LA IMAGE');
          setTimeout(() => {
            setMensajeImagenes(false);
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleAgregarUrl = (inputValue, e) => {
    e.preventDefault();
    const key = 'urls';
    fetch(`${apiUrl}/taller/imagenes/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tallerId: tallerData.id,
        url: inputValue,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setMensajeImagenes('SE AGREGO LA IMAGEN CON EXITO');
          setTimeout(() => {
            setMensajeImagenes(false);
          }, 3000);
          setNuevaUrl('')
        } else {
          setMensajeImagenes('ERROR: NO SE PUDO AGREGAR LA IMAGEN');
          setTimeout(() => {
            setMensajeImagenes(false);
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const settings = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: tallerData.id,
        nombre: tallerData.nombre,
        telefono: tallerData.telefono,
        nombreCiudad: tallerData.ciudad.nombre,
        direccion: tallerData.direccion,
        urlImgPrincipal: tallerData.urlImgPrincipal,
        descripcion: tallerData.descripcion,
        tituloCategoria: tallerData.categoria.titulo,
      }),
    };
    fetch(updateUrl, settings).then((res) => {
      if (res.ok) {
        setMensajeUpdate('SE ACTUALIZO EL TALLER CON EXITO');
        setTimeout(() => {
          setMensajeUpdate(false);
        }, 3000);
      } else {
        setMensajeUpdate('ERROR: NO SE PUDO ACTUALIZAR EL TALLER');
        setTimeout(() => {
          setMensajeUpdate(false);
        }, 3000);
      }
    });
  };

  return (
    <div className="modal-content">
      <h1>{tallerData.nombre}</h1>
      {tallerData ? (
        <form className='formularioEdit'>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="nombre"
                label="Nombre"
                variant="outlined"
                value={tallerData.nombre}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="telefono"
                label="Teléfono"
                variant="outlined"
                value={tallerData.telefono}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Ciudad"
                variant="outlined"
                name="ciudad"
                value={tallerData.ciudad.nombre}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Dirección"
                variant="outlined"
                name="direccion"
                value={tallerData.direccion}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Url imagen principal"
                variant="outlined"
                name="urlImgPrincipal"
                value={tallerData.urlImgPrincipal}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Descripción"
                variant="outlined"
                name="descripcion"
                value={tallerData.descripcion}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Categoría"
                variant="outlined"
                name="categoria"
                value={tallerData.categoria.titulo}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
            <div>
         
              <Button
                variant="contained"
                className="button"
                onClick={handleUpdate}
                style={{width:"50%"}}
              >
                Guardar
              </Button>
              {mensajeUpdate ? <p>{mensajeUpdate}</p> : <p></p>}
            
            </div>
            </Grid>
            </Grid>
            
            <div className="Edit">
            <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <h3>Políticas del taller</h3>
              {tallerData.politicas.map((politica, index) => (
                <div key={index}>
                  <TextField value={politica.descripcionPolitica} disabled />
                  <Button
                  className='buttonEdit'
                    variant="contained"
                    color="error"
                    onClick={(e) => handleEliminarPolitica(politica.id, e)}
                  >
                    Eliminar
                  </Button>
                </div>
              ))}
              </Grid>
              </Grid>
              <div>
                <TextField type="text" placeholder="Nueva política" value={nuevaPolitica} onChange={(e)=>{setNuevaPolitica(e.target.value)}}/>
                <Button
                   className='buttonEdit'
                  variant="contained"
                  color="primary"
                  onClick={(e) =>
                    handleAgregarPolitica(nuevaPolitica, e)
                  }
                >
                  Agregar
                </Button>
              </div>
              <div>
                {mensajePolitica ? (
                  <div>
                    <p>{mensajePolitica}</p>
                  </div>
                ) : (
                  <p></p>
                )}
              </div>
            </div>

            <div className="Edit">
              <h3>Servicios ofrecidos</h3>
              {tallerData.servicios.map((servicio, index) => (
                <div key={index}>
                      <Grid item xs={12} sm={12}>
                  <TextField
                    type="text"
                    value={servicio.nombreServicio}
                    disabled
                  />
                  <Button
                     className='buttonEdit'
                    variant="contained"
                    color="error"
                    onClick={(e) => handleEliminarServicio(servicio.id, e)}
                  >
                    Eliminar
                  </Button>
                  </Grid>
                </div>
              ))}
              <div>
                <TextField type="text" placeholder="Nuevo servicio" value={nuevoServicio} onChange={(e)=>{setNuevoServicio(e.target.value)}} />
                <Button
                   className='buttonEdit'
                  variant="contained"
                  color="primary"
                  onClick={(e) =>
                    handleAgregarServicio(nuevoServicio, e)
                  }
                >
                  Agregar
                </Button>
              </div>
              <div>
                {mensajeServicio ? (
                  <div>
                    <p>{mensajeServicio}</p>
                  </div>
                ) : (
                  <p></p>
                )}
              </div>
            </div>

            <div className='Edit'>
              <h3>IMÁGENES</h3>
              {tallerData.urls.map((url, index) => (
                <div key={index}>
                  <TextField type="text" value={url.url} disabled />
                  <Button
                     className='buttonEdit'
                    variant="contained"
                    color="error"
                    onClick={(e) => handleEliminarUrl(url.id, e)}
                  >
                    Eliminar
                  </Button>
                </div>
              ))}
              <div>
                <TextField type="text" placeholder="Nueva URL" value={nuevaUrl} onChange={(e)=>{setNuevaUrl(e.target.value)}}/>
                <Button
                   className='buttonEdit'
                  variant="contained"
                  color="primary"
                  onClick={(e) =>
                    handleAgregarUrl(nuevaUrl, e)
                  }
                >
                  Agregar
                </Button>
                {mensajeImagenes ? (
                  <div>
                    <p>{mensajeImagenes}</p>
                  </div>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
       
        </form>
      ) : (
        <p>cargando datos...</p>
      )}
    </div>
  );
};

export default ModalAdminE;
