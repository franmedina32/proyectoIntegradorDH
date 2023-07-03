import React, { useContext, useEffect, useState } from 'react';
import { LocalStorageContext } from '../../../context/LocalStorage.context';
import CardTaller from '../../../common/talleres/CardTaller';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import '../favoritos/favoritosUser.css';
import { NotificationContext } from '../../../context/Notification.context';
import { apiUrl } from '../../../../utils/variables';
import cargando from '../../../../Img/cargando.gif';

const FavoritosUser = () => {
  const [favos, setFavos] = useState(false);
  const { storage } = useContext(LocalStorageContext);
  const [mensaje, setMensaje] = useState(false);
  const { addNotification } = useContext(NotificationContext);
  useEffect(() => {
    fetch(`${apiUrl}/stored/fav/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: storage.loggedUser.sub,
      }),
    })
      .then((res) => res.json())
      .then((data) => setFavos(data));
  }, []);

  const handleFavDelete = (favElim) => {
    const url = `${apiUrl}/stored/fav/id/` + favElim.id;
    fetch(url, {
      method: 'DELETE',
    }).then((res) => {
      if (res.ok) {
        addNotification({
          texto: `${favElim.taller.nombre} eliminado`,
          tipo: 'success',
        });
        setTimeout(() => {
          setMensaje(false);
          setFavos((prevFavos) =>
            prevFavos.filter(
              (favorito) => favorito.taller.id !== favElim.taller.id,
            ),
          );
        }, 2000);
      } else {
        addNotification({
          texto: `no se pudo eliminar`,
          tipo: 'error',
        });
      }
    });
  };
  return (
    <>
    
     
       <h1 className='favoritos'>Lista de favoritos</h1>
         {favos ? (
          <div className='card-favo-container'>
            {favos.map((favorito) => (
              <div key={favorito.taller.id} className="card-favo">
                 <CardTaller
                  className="card-taller"
                  key={favorito.taller.id}
                  nombre={favorito.taller.nombre}
                  descripcion={favorito.taller.descripcion}
                  ciudad={favorito.taller.ciudad.nombre}
                  direccion={favorito.taller.direccion}
                  img={favorito.taller.urlImgPrincipal}
                />
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="elimFav"
                  onClick={() => {
                    handleFavDelete(favorito);
                  }}
                />
               
              </div>
            ))}
          </div>
        ) : (
          <div className="loader" style={{ textAlign: 'center' }}>
          <img src={cargando} alt="cargando" />
        </div>
        )}
    </>
 
  );
};

export default FavoritosUser;
