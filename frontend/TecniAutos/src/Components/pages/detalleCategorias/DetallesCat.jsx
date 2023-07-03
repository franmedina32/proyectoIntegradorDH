import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../detalleCategorias/detallesCat.css';
import cargando from '../../../Img/cargando.gif';
import logoCard from '../../../Img/autolab.jpeg';
import { Pagination, listClasses } from '@mui/material';
import flecha from '../../../Img/flecha-izquierda.png';
import CardTaller from '../../common/talleres/CardTaller';
import { apiUrl } from '../../../utils/variables';
const DetallesCat = () => {
  const url = `${apiUrl}/taller/categoria/`;
  const [listTalleres, setListTalleres] = useState(false);
  const { titulo } = useParams();

  useEffect(() => {
    const fetchDatosCategoria = async () => {
      try {
        const response = await fetch(`${url}${encodeURIComponent(titulo)}`);
        const data = await response.json();
        setListTalleres(data);
      } catch (error) {
        console.error('Error al obtener los datos de la categoría:', error);
      }
    };
    if (titulo) {
      fetchDatosCategoria();
    }
  }, [titulo]);

  return (
    <>
        <Link to="/" className='flecha'> 
        <img src={flecha} alt="regresar" style={{ width: '50px', height: '50px' }} />
        </Link>

      <div className="tituloCategoria">
        <h1>{titulo}</h1>
        <p>Esta es una lista de los talleres que cuentan con {titulo}</p>
      </div>

      <div>
        {listTalleres ? (
          <div className="talleres-container">
            {listTalleres.map((taller) => (
              <CardTaller
                key={taller.id}
                nombre={taller.nombre}
                descripcion={taller.descripcion}
                ciudad={taller.ciudad.nombre}
                direccion={taller.direccion}
                img={taller.urlImgPrincipal}
              />
            ))}
          </div>
        ) : (
          <div className="loader" style={{ textAlign: 'center' }}>
            <img src={cargando} alt="cargando" />
          </div>
        )}
      </div>
    </>
  );
};

export default DetallesCat;
