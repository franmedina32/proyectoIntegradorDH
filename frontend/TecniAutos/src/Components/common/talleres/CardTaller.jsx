import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../talleres/CardTaller.css';


const CardTaller = ({ img, nombre, descripcion, direccion, ciudad }) => {
return (
<>
<Link
className="cardInfoTaller"
to={`/detalleTalleres/${encodeURIComponent(nombre)}`}
>
<div className="imgCategoria">
<img src={img} alt='imgCategoria' />
</div>


<div className="infoTaller">
<h2>{nombre}</h2>
<p>{descripcion}</p>
<h4>
{direccion}-{ciudad}
</h4>
</div>
<div className="lineaSeparador"></div>

<button className='verMas'>Ver mas</button>

</Link>
</>
);
};


CardTaller.propTypes = {
img: PropTypes.string.isRequired,
nombre: PropTypes.string.isRequired,
descripcion: PropTypes.string.isRequired,
direccion: PropTypes.string.isRequired,
ciudad: PropTypes.string.isRequired,
};


export default CardTaller;


