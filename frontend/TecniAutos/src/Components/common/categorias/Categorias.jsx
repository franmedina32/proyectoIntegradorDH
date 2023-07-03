import { useContext, useEffect, useState } from 'react';
import '../categorias/categorias.css';
import cargando from '../../../Img/cargando.gif';
import { Button } from '@mui/material';
import NewCategoryForm from './NewCategory/NewCategoryForm';
import { LocalStorageContext } from '../../context/LocalStorage.context';
import CardCategorias from '../cardCategorias/CardCategorias';
import { useNavigate } from 'react-router-dom';
import DetallesCat from '../../pages/detalleCategorias/DetallesCat';
import { apiUrl } from '../../../utils/variables';
import CategoriesCarousel from './CategoriesCarousel';

const Categorias = () => {
  const [isOpen, setIsOpen] = useState(false);
  const listCatUrl = `${apiUrl}/categoria/listar`;
  const [categoriasData, setCategoriasData] = useState(false);
  const openNewCategoryModal = () => {
    setIsOpen(true);
  };

  const closeNewCategoryModal = () => {
    setIsOpen(false);
  };

  const { storage } = useContext(LocalStorageContext);
  const { loggedUser } = storage;

  useEffect(() => {
    fetch(listCatUrl)
      .then((res) => res.json())
      .then((data) => setCategoriasData(data));
  }, []);

  return (
    <div>
      <div className="Categorias">
        <section className="TextCategorias">
          <h2>Las categorías que ofrecemos para usted </h2>
          <p>
            Ofrecemos un servicio integral a nuestros clientes. Nuestro
            propósito es dar un servicio personalizado con la calidad de
            concesionaria, a precio de tu mecánico de confianza.
          </p>
        </section>
        <article className="listado-Categorias">
          {categoriasData ? (
            <CategoriesCarousel items={categoriasData} />
          ) : (
            <div className="loader">
              <img src={cargando} alt="cargando" />
            </div>
          )}
        </article>
        {/*loggedUser && (
         <section className="createContainer">
           <Button
             type="submit"
             variant="contained"
             onClick={openNewCategoryModal}
           >
             Nueva Categoría
           </Button>


           {isOpen && (
             <div className="modal">
               <div className="modal-content">
                 <span className="close" onClick={closeNewCategoryModal}>
                   &times;
                 </span>
                 <NewCategoryForm onSuccess={closeNewCategoryModal} />
               </div>
             </div>
           )}
         </section>
       )*/}
      </div>
    </div>
  );
};

export default Categorias;
