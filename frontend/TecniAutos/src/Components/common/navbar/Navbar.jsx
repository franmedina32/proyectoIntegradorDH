import { useContext, useEffect, useState, useRef } from 'react';
import logoNav from '../../../Img/logoNav.png';
import '../navbar/navbar.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { NotificationContext } from '../../context/Notification.context';
import { LocalStorageContext } from '../../context/LocalStorage.context';
import {
  faUser,
  faCaretDown,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { SearchInfoContext } from '../../context/SearchInfo.context';
import { SearchInfoProvider } from '../../context/SearchInfo.context';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { HiMenu } from 'react-icons/hi';
import { GrClose } from 'react-icons/gr';
import {
  LOGGED_USER_STORAGE_KEY,
  TOKEN_STORAGE_KEY,
  apiUrl,
} from '../../../utils/variables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  Autocomplete from '@mui/material/Autocomplete';
import  TextField  from '@mui/material/TextField';
import { Box, Stack } from '@mui/material';


const Navbar = () => {
  const { storage, deleteFromStorage } = useContext(LocalStorageContext);
  const { addNotification } = useContext(NotificationContext);
  const navigateTo = useNavigate();
  const { [LOGGED_USER_STORAGE_KEY]: loggedUser } = storage;
  const [cityOptions, setCityOptions] = useState(false)
  const [searchData, setSearchData] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const { setSearchInfo } = useContext(SearchInfoContext);
  const loggedUserName = loggedUser ? loggedUser.name : '';
  const [showModal, setShowModal] = useState(false);
  const transformDateToJavaCompatibleFormat = (date) => {
    return moment(date).format('YYYY-MM-DDTHH:mm:ss');
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInfo(searchData);
    setTimeout(() => {
      navigateTo('/talleres/results');
    }, 1000);
  };

  const handleLogout = () => {
    addNotification({
      texto: `Hasta pronto, ${loggedUser.name} :)`,
      tipo: 'success',
    });
    deleteFromStorage(LOGGED_USER_STORAGE_KEY);
    deleteFromStorage(TOKEN_STORAGE_KEY);
    setSearchInfo(false)
    setSearchData({})
    setSelectedDate(null); 
    //limpiar inputs buscador fecha y ciudad
    setTimeout(() => {
      navigateTo('/login');
    }, 1000);
  };

  useEffect(()=>{
    fetch(`${apiUrl}/ciudad/listar`)
     .then(res => res.json())
     .then(data => {
      setCityOptions(data)
     })
  },[])

  const [show, setShow] = useState(false);

  const showMenu = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const logout = () => {
    handleLogout();
    setShow(false); // Cerrar el menú móvil
  };

  const handleUserAccessClick = () => {
    setShowModal(!showModal);
  };
  const options = [
    { label: 'The Godfather', id: 1 },
    { label: 'Pulp Fiction', id: 2 },
  ];

  return (
    <>
      <header>
        <div className="containerNav">
          <Link to="/">
            <img className="logoNavbar" src={logoNav} alt="logoNavbar" />
          </Link>

          <h4>¡ Conectando tu camino hacia la excelencia automotriz !</h4>
          <div className="botones-registro">
            {loggedUser ? (
              <>
                <h5 className="userAccess" onClick={handleUserAccessClick}>
                  <FontAwesomeIcon icon={faUser} /> {`${loggedUser.name}`}{' '}
                  <FontAwesomeIcon icon={faCaretDown} />
                </h5>
                {showModal && (
                  <div className="modalb">
                    <div className="modal-contentb">
                      <div>
                        <h5
                          onClick={() => {
                            navigateTo('/user/favs');
                            setShowModal(false);
                          }}
                        >
                          Favoritos
                        </h5>
                        <h5
                          onClick={() => {
                            navigateTo('/user/reservas');
                            setShowModal(false);
                          }}
                        >
                          Reservas
                        </h5>
                      </div>
                      <FontAwesomeIcon
                        icon={faXmark}
                        onClick={() => {
                          setShowModal(false);
                        }}
                      />
                    </div>
                  </div>
                )}
                <button className="button-navbar" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/crearUsuario" className="button-navbar">
                  Crear usuario
                </Link>
                <Link to="/login" className="button-navbar">
                  Iniciar sesión
                </Link>
              </>
            )}
          </div>
          {show ? (
            <div className="menu-movil">
              <div className="menu">
                <div className="menu-container">
                  <button onClick={showMenu}>
                    <GrClose />
                  </button>
                  {loggedUser ? (
                    <>
                      <h3
                        className="userAccess"
                        onClick={handleUserAccessClick}
                      >
                        <FontAwesomeIcon icon={faUser} />  {`${loggedUser.name}`}{' '}
                        
                      </h3>
                      {/* {showModal && (
                  <div className="modalb">
                    <div className="modal-contentb">
                      <div>
                        <h5
                          onClick={() => {
                            navigateTo('/user/favs');
                            setShowModal(false);
                          }}
                        >
                          Favoritos
                        </h5>
                        <h5
                          onClick={() => {
                            navigateTo('/user/reservas');
                            setShowModal(false);
                          }}
                        >
                          Reservas
                        </h5>
                      </div>
                      <FontAwesomeIcon
                        icon={faXmark}
                        onClick={() => {
                          setShowModal(false);
                        }}
                      />
                    </div>
                  </div>
                )} */}
                    </>
                  ) : (
                    <>
                    <h4 className='familia'>Forma parte de nosotros</h4>
                      <Link to="/crearUsuario" >
                        <h3 className='crearCuenta'>Crear cuenta</h3>
                      </Link>    
                    </>
                  )}
                </div>
                <ul>
                  {loggedUser ? (
                    <li onClick={logout}>Cerrar sesión</li>
                  ) : (
                    <li>
                      <Link to="/login" className="button-navbar">
                        Iniciar sesión
                      </Link>
                    </li>
                  )}
                  <li
                    onClick={() => {
                      navigateTo('/user/favs');
                      setShowModal(false);
                    }}
                  >
                    Favoritos
                  </li>

                  <li
                    onClick={() => {
                      navigateTo('/user/reservas');
                      setShowModal(false);
                    }}
                  >
                    Reservas
                  </li>
                  <li>
                    <Link to="/"> Inicio </Link>
                  </li>

                  <li>
                    <Link to="/categorias"> Categorias</Link>
                  </li>

                  <li>
                    <Link>Recomendados</Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="menu-icono">
              <button onClick={showMenu}>
                <HiMenu />
              </button>
            </div>
          )}
        </div>
      </header>

      <nav className="Nav">
        <div className="opciones">
          <Link to="/">
            <span className="material-symbols-outlined">home</span> <br />{' '}
            Inicio
          </Link>
          <Link to="/categorias">
            <span className="material-symbols-outlined">
              home_repair_service
            </span>{' '}
            <br />
            Categorias
          </Link>

          <Link to="/">
            <span className="material-symbols-outlined">pin_drop</span>
            <br /> Recomendados
          </Link>
        </div>
        <div className="buscador">
          <div className='divautocomplete'>
                <Stack sx={{width: 300, height: 200, margin: 'auto'}}>
                  <Autocomplete
                  id='city-options'
                  getOptionLabel={(cityOptions)=>`${cityOptions.nombre}`}
                  options={cityOptions}
                  sx={{width: 300, height: 80}}
                  isOptionEqualToValue={(option, value)=>option.nombre === value.nombre}
                  noOptionsText={"Ninguna ciudad con ese nombre"}
                  renderOption={(props, cityOptions)=>(
                    <Box component={'li'} {...props} key={cityOptions.id}>
                      {cityOptions.nombre}
                    </Box>
                  )}
                  renderInput={(params)=> <TextField className='inputCiudad'{...params} label="buscar ciudad"/>}
                  onChange={(event, value)=>{
                    setSearchData((prevSearchData) => ({
                      ...prevSearchData,
                      nombreCiudad: value?.nombre || ''
                    })
                    );
                  }}
                  />
                </Stack>
          </div>
          <div className="datepicker-container">
            <DatePicker
              className='inputFecha'
              placeholderText="Selecciona una fecha"
              popperClassName="datepicker-modal"
              dateFormat="dd/MM/yyyy"
              selected={selectedDate}
              onChange={(date) => {
                const formattedDate = transformDateToJavaCompatibleFormat(date);
                setSearchData((prevSearchData) => ({
                  ...prevSearchData,
                  fecha: formattedDate,
                }));
                setSelectedDate(date);
              }}
            />
          </div>
          <a href="">
            <span
              className="material-symbols-outlined"
              style={{ marginRight: '30px', marginTop: '10px' }}
              onClick={handleSearch}
            >
              search
            </span>
          </a>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
