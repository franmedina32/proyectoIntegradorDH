import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../cardCategorias/cards.css';

const CardCategorias = ({ title, urlImg }) => {
  return (
    <Link to={`/detallesCategoria/${encodeURIComponent(title)}`}>
      
      <div className="infoCard">
        <h3 className="titulo">{title}</h3>
        <img
          className="imagen"
          src={urlImg}
          alt="img"
          style={{ height: '300px', width: '240px' }}
        />
      </div>
    </Link>
  );
};

CardCategorias.propTypes = {
  title: PropTypes.string.isRequired,
  urlImg: PropTypes.string.isRequired,
};

export default CardCategorias;
