import { useParams } from "react-router-dom";
import logoCard from "../../../Img/logoCard.png";
import motor from "../../../Img/car-repair.png";

const DetallesServi = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <>

      <section className="recomendados">
        <div className="sliderRecomendados">
          <input type="radio" name="toggle" id="btn-1" checked />
          <input type="radio" name="toggle" id="btn-2" />
          <input type="radio" name="toggle" id="btn-3" />

          <ul className="slides">
            <li className="slide">
              <div className="cardRecomendados">
                <h2>Reparaciónde motor</h2>
                <p style={{textAlign:"justify"}}>
                  El motor de un carro es como el corazón de todo. Es el
                  componente que impulsa todo el funcionamiento. Por eso debemos
                  asegurarnos que siempre esté en las mejores condiciones
                  posibles. Una reparación de motor generalmente se hace por el
                  uso, deterioro, mugre roces sufre un desgaste que hace que las
                  piezas pierdan calibración aunque depende del uso y cuidados
                  que se le ha dado.{" "}
                </p>   
                <a href="/registro" className="slide-link">Registrar Taller</a>
              </div>
              <p className="slide-img">
                <img
                  src={motor}
                  alt="#"
                  style={{ width: "280px", height: "240px" }}
                />
              </p>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default DetallesServi;
