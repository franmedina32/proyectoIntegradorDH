import React, { useEffect, useState } from 'react';
import '../recomendados/recomendados.css';
import CardTaller from '../talleres/CardTaller';
import cargando from '../../../Img/cargando.gif';
import { apiUrl } from '../../../utils/variables';
const Recomendados = () => {
  const urlListado = `${apiUrl}/taller/listar`;
  const [talleres, setTalleres] = useState(false);
  const [filtrado, setFiltrado] = useState([]);
  const comparadorAleatorio = () => Math.random() - 0.5;
  useEffect(() => {
    fetch(urlListado)
      .then((res) => res.json())
      .then((data) => {
        setTalleres(data);
        if (data) {
          const tempFiltrado = [];
          while (tempFiltrado.length < 3) {
            const indiceAleatorio = Math.floor(Math.random() * data.length);
            tempFiltrado.push(data[indiceAleatorio]);
          }
          setFiltrado(tempFiltrado);
        }
      });
  }, []);
  return (
    <>
      <div
        className="separador"></div>

      <div className="divRecomendados">
        <h2 style={{ textAlign: 'center' }}>Talleres recomendados</h2>
        {talleres ? (
          <div className="containerReco">
            {filtrado.map((tall) => (
              <CardTaller
                key={tall.id}
                nombre={tall.nombre}
                descripcion={tall.descripcion}
                ciudad={tall.ciudad.nombre}
                direccion={tall.direccion}
                img={tall.urlImgPrincipal}
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

export default Recomendados;

/*  <>
    <div className='separador' style={{width:"100%", height:"80px", backgroundColor:"#004AAD", marginTop:"70px"}}></div>
    <section className="recomendados" >
        <h2>Talleres recomendados</h2>
        <div className="sliderRecomendados">
          <input type="radio" name="toggle" id="btn-1" checked/>
          <input type="radio" name="toggle" id="btn-2"/>
          <input type="radio" name="toggle" id="btn-3"/>

          <div className="slider-controls">
            <label htmlFor="btn-1"></label>
            <label htmlFor="btn-2"></label>
            <label htmlFor="btn-3"></label>
          </div>
          <ul className="slides">
          <li className="slide">
              <div className="cardRecomendados">
                <h2>Autolab</h2>
                <p>Todo lo relacionado con la pintura y latonerialatonería de su vehículos </p>
                <h3>CALLE 164# 18-48 Bogotá</h3>
                <a href="https://g.co/kgs/9v3hmm" target="_blank"className="slide-link">Como llegar</a>
              </div>
              <p className="slide-img">
              <img src={logoCard} alt="#" style={{width:"320px", height:"240px"}} />
              </p>
            </li>

            <li className="slide">
              <div className="cardRecomendados">
                <h2>TecniAutos</h2>
                <p>Somos especializtas en reparaciones de direcciones y mantenimiento de la suspención de su vehículo </p>
                <h3>CRA 27 #17-102 Bogotá</h3>
                <a href="https://g.co/kgs/9v3hmm" className="slide-link">Como llegar</a>
              </div>
              <p className="slide-img">
              <img src={logoCard2} alt="#" style={{width:"320px", height:"240px"}} />
              </p>
            </li>
            <li className="slide">
              <div className="cardRecomendados">
                <h2>TecniAutos</h2>
                <p>Todo lo relacionado con la pintura y latonerialatonería de su vehículos </p>
                <h3>CALLE 164# 18-48 Bogotá</h3>
                <a href="https://g.co/kgs/9v3hmm" target="_blank" className="slide-link">Como llegar</a>
              </div>
              <p className="slide-img">
               
              <img src={logoCard} alt="#" style={{width:"320px", height:"240px"}} />
              </p>
            </li>
            <li className="slide">
              <div className="cardRecomendados">
                <h2>TecniAutos</h2>
                <p>Todo lo relacionado con la pintura y latonerialatonería de su vehículos </p>
                <h3>CALLE 164# 18-48 Bogotá</h3>
                <a href="#" target="_blank" className="slide-link">Como llegar</a>
              </div>
              <p className="slide-img">
                <img src={logoCard2} alt="" style={{width:320, height:240}} />
              </p>
            </li>
          </ul>
        </div> 
      </section>

    </> */
