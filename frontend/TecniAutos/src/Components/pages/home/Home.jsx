import { useContext, useEffect, useState } from 'react';
// import { Carousel } from 'react-carousel-minimal';
import logoNav from "../../../Img/TecniAutos.gif";
import '../home/home.css';
import Recomendados from '../../common/recomendados/Recomendados';
import Categorias from '../../common/categorias/Categorias';
import AdminMenu from '../../adminAccessMenu/AdminMenu';
import { LocalStorageContext } from '../../context/LocalStorage.context';
import { LOGGED_USER_STORAGE_KEY } from '../../../utils/variables';
import { Button, TextField } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import imgHome from "../../../Img/image 6 (1).png"


const Home = () => {
const [admin, setAdmin] = useState(false);
const { storage } = useContext(LocalStorageContext);


const { [LOGGED_USER_STORAGE_KEY]: loggedUser } = storage;
useEffect(() => {
if (loggedUser?.role === 'ADMIN') {
setAdmin(true);
} else {
setAdmin(false);
}
}, [loggedUser]);


return (
<>
{admin ? <AdminMenu /> : <>
</>}
<div className="ContainerHome">
<div className="carrusel">
<article>
<img src={logoNav} alt="" />
</article>
</div>


<div className="Buscador">
<img src={imgHome} alt="" />
</div>
</div>
{/* categorias */}
<Categorias />


<Recomendados />
</>
);
};


export default Home;


