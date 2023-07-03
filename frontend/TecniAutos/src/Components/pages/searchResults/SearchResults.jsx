import React, { useContext, useEffect, useState } from 'react'
import { SearchInfoContext } from '../../context/SearchInfo.context'
import CardTaller from '../../common/talleres/CardTaller'
import cargando from '../../../Img/cargando.gif';
import { apiUrl } from '../../../utils/variables';
import SearchOffIcon from '@mui/icons-material/SearchOff';
const SearchResults = () => {
    const {searchInfo} = useContext(SearchInfoContext)
    const [talleresData, setTalleresData] = useState(false)
    useEffect(()=>{
      if(searchInfo){
        fetch(`${apiUrl}/taller/search/date`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(searchInfo)
      })
       .then(res => res.json())
       .then(data => {
        if(data.length > 0){
          setTalleresData(data)
        }
      })
       .catch(err => console.log(err))
      }
    },[searchInfo])
  return (
    <div>
        <h1 style={{textAlign:"center", backgroundColor:"var(--azul)", color:"white", height:"60px"}}>Talleres disponibles en la ciudad seleccionada</h1>
        {talleresData ?
          <div className='containerReco'>
              {talleresData.map((tall) => (
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
        :     
          <div className="loader" style={{ textAlign: 'center' }}>
            <img src={cargando} alt="cargando" />
          </div>
        }
        {!talleresData ? 
            <div>
              <h3><SearchOffIcon/> Lo sentimos! </h3>
              <h4>no se encontraron talleres disponibles en esa fecha y ciudad</h4>
              <h4>porfavor intente indicando otra fecha</h4>
            </div>
             : <a></a>
        }
    </div>
  )
}

export default SearchResults