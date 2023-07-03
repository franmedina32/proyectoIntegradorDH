import { useContext, useEffect, useState } from 'react';
import '../detalleTalleres/detalleTalleres.css';
import cargando from '../../../Img/cargando.gif';
import compartir from '../../../Img/compartir.png';
import flecha from '../../../Img/flecha-izquierda.png';
import { Link, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import Modal from '@mui/material/Modal';
import Mapa from './Mapa';
import { apiUrl } from '../../../utils/variables';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ShareIcon from '@mui/icons-material/Share';
import { Tooltip } from '@mui/material';
import ReservaBloque from '../../common/reserva/ReservaBloque';
import Comments from '../../common/Comments';
import { LocalStorageContext } from '../../context/LocalStorage.context';
import { LOGGED_USER_STORAGE_KEY } from '../../../utils/variables';
import StarIcon from '@mui/icons-material/Star';
import Rating from '@mui/material/Rating';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid var(--azul)',
  boxShadow: 24,
  p: 4,
};


const DetalleTalleres = () => {
  const url = `${apiUrl}/taller/nombre/`;
  const [tallerData, setTallerData] = useState(false);
  const { nombre } = useParams();
  const [userInfo, setUserInfo] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [checkFavBody, setCheckFavBody] = useState({
    userEmail: '',
    tallerId: '',
  });
  const [open, setOpen] = useState(false);
  const handleShare = () => setOpen((open) => !open);
  const urlShare = `${apiUrl}/detalleTalleres/${nombre}`;
  const { storage } = useContext(LocalStorageContext);
  const { [LOGGED_USER_STORAGE_KEY]: loggedUser } = storage;
  const [promedioVal, setPromediosVal] = useState(false)
  const [ratingValue, setRatingValue] = useState(false)

  useEffect(() => {
    const fetchDatosTaller = async () => {
      try {
        const response = await fetch(`${url}${encodeURIComponent(nombre)}`);
        const data = await response.json();
        setTallerData(data);
      } catch (error) {
        console.error('Error al obtener los datos del taller:', error);
      }
    };
    if (nombre) {
      fetchDatosTaller();
    }
  }, [nombre]);

  useEffect(() => {
    const storedInfo = JSON.parse(localStorage.getItem('data'));
    if (storedInfo.loggedUser) {
      setUserInfo(storedInfo.loggedUser);
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      setCheckFavBody({
        tallerId: tallerData.id,
        userEmail: userInfo.sub,
      });
    }
  }, [userInfo, tallerData]);

  useEffect(() => {
    if (checkFavBody.tallerId && checkFavBody.userEmail) {
      fetch(`${apiUrl}/stored/fav/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkFavBody),
      })
        .then((res) => res.json())
        .then((data) => setIsFavorite(data));
    }
  }, [checkFavBody.tallerId, checkFavBody.userEmail]);

  const handleAddFav = () => {
    fetch(`${apiUrl}/stored/fav/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkFavBody),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setIsFavorite(true);
        }
      });
  };

  const handleDeleteFav = () => {
    fetch(`${apiUrl}/stored/fav/del/info`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkFavBody),
    }).then((res) => {
      if (res.ok) {
        setIsFavorite(false);
      }
    });
  };

  useEffect(()=>{
    if(tallerData){
      fetch(`${apiUrl}/taller/valoracion/id/${tallerData.id}`)
       .then(res => res.json())
       .then(data => setPromediosVal(data))
    }
  },[tallerData])


  const handleValClick = (newValue) => {
    fetch(`${apiUrl}/taller/valoraciones`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taller_id: tallerData.id, 
        puntos: newValue.toFixed(2)
      }),
    })
     .then(res => {
      if(res.ok){
        setRatingValue(newValue)
      }
     })
  }

  return (
    <>
      <div className="encabezado">
        <div className="taller">
          <h1>
           {tallerData?.nombre}
            {tallerData && (
              <h6>
                <span className="material-symbols-outlined">pin_drop</span>{' '}
                {tallerData.direccion} - {tallerData.ciudad?.nombre}
              </h6>
            )}
          </h1>
        
          {userInfo ? (
            <div className='favorito'>
              <Tooltip
                title={
                  isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'
                }
                placement="right"
                //onClick={handleFavClick}
              >
                {isFavorite ? (
                  <FavoriteOutlinedIcon onClick={handleDeleteFav} />
                ) : (
                  <FavoriteBorderOutlinedIcon onClick={handleAddFav} />
                )}
              </Tooltip>
              <Tooltip
                title="Compartir"
                placement="right"
                onClick={handleShare}
              >
                <ShareIcon />
              </Tooltip>
            </div>
          ) : (
            <a></a>
          )}
       
        </div>
        
        <Modal
          open={open}
          onClose={handleShare}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <strong>{tallerData?.nombre}</strong>
              <br></br>
              {tallerData.direccion} - {tallerData.ciudad?.nombre}
            </Typography>
            <Typography id="modal-modal-imgprincipal" sx={{ mt: 2 }}>
              <div className="imgPrincipalBox">
                {tallerData && <img src={tallerData.urlImgPrincipal} alt="" />}
              </div>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {tallerData.descripcion}
            </Typography>
            <div className="share">
              <FacebookShareButton url={urlShare}>
                <FacebookIcon class="redes"></FacebookIcon>
              </FacebookShareButton>
              <TwitterShareButton url={urlShare}>
                <TwitterIcon class="redes"></TwitterIcon>
              </TwitterShareButton>
            </div>
          </Box>
        </Modal>

        <div className='valoraciones'>
          <Tooltip title="deja tu valoracion" placement='right'>
            <Rating
              name="simple-controlled"
              defaultValue={2.5}
              precision={0.5}
              value={ratingValue}
              onChange={(event, newValue) => {
                handleValClick(newValue)
              }}
            />
          </Tooltip>
          <>
          {promedioVal ? 
          <h4 className='promedioVal'><StarIcon/> {parseFloat(promedioVal.promedio.toFixed(2))}  /  {promedioVal.cantidadValoraciones} valoraciones</h4>
          : <a></a>
          }
          </>
        </div>
        <Link to="/" className='flecha'> 
                <img src={flecha} alt="regresar" style={{ width: '50px', height: '50px' }} />
            </Link>
      </div>
      <div className="containerImg">
        <div className="imgPrincipal">
          {tallerData && <img src={tallerData.urlImgPrincipal} alt="" />}
        </div>

        <div className="imgSecundarias">
          {tallerData &&
            tallerData.imgs.map((img) => (
              <img key={img.id} src={img.url} alt="imagen" />
            ))}
        </div>
      </div>
      {tallerData ? (
        <article className="descripcion">
          <h1 style={{ paddingLeft: '20px' }}>
            Lleva tu vehículo con los mejores especialistas en{' '}
            {tallerData.ciudad.nombre}
          </h1>

          <p>
            {tallerData.descripcion}.Nuestro equipo de profesionales se encarga
            de realizar cambios de aceite de manera eficiente y rápida,
            utilizando productos de alta calidad para mantener tu motor en
            perfecto estado. En nuestro taller de carros, contamos con
            especialistas en suspensión que se encargarán de diagnosticar y
            solucionar cualquier problema relacionado con esta parte vital de tu
            vehículo, para garantizar un manejo seguro y confortable.
          </p>

          <div className="mapa">
            <Mapa
              lat={tallerData?.ubicacion?.latitud}
              long={tallerData?.ubicacion?.longitud}
            />
          </div>

          <div className="politicasServis">
            <div className="seccion1">
            <h2> Los servicios que tenemos para usted </h2>
            <ul className="itemsServicios" type="none">
              {tallerData.servicios.map((servicio, index) => (
                <li key={servicio.id}>
                  <i className="fi fi-rr-badge-check" key={index}></i>
                  {servicio.nombreServicio}{' '}
                </li>
              ))}
            </ul>
            <h2> Estas son nuestras políticas </h2>
            <ul className="itemsPoliticas" type="none">
              {tallerData.politicas.map((politica, index) => (
                <li key={politica.id}>
                  <i className="fi fi-rr-badge-check" key={index}></i>
                  {politica.descripcionPolitica}{' '}
                </li>
              ))}
            </ul>
           
          
          </div>
                <div className='separador2'></div>
          <div className="seccion2">
          {loggedUser?.sub && (
            <Comments emailUsuario={loggedUser.sub} tallerId={tallerData.id} />)}
          </div>
          </div>

          

         
        </article>
      ) : (
        <div className="loader" style={{ textAlign: 'center' }}>
          <img src={cargando} alt="cargando" />
        </div>
      )}
      <div>
        {tallerData ? (
          <ReservaBloque
            nombre={tallerData?.nombre}
            tallerId={tallerData?.id}
          />
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
};

export default DetalleTalleres;
