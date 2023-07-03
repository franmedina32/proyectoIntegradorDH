import React from 'react'
import { Link } from 'react-router-dom'
import './adminMenu.css'
const AdminMenu = () => {
  return (
    <>
      
        <div className='adminMenuDiv'>
        <div className="holaAdmin">
          <h2>Bienvenido admin <br /> ¿Qué haremos hoy?</h2>
        </div>
        <nav className='adminNav'>
            <h3><Link to="/admin/talleres" className='opcionAdmin'>Administrar Talleres</Link></h3>
            <h3><Link to="/admin/categorias" className='opcionAdmin'>Administrar Categorías</Link></h3>
            <h3><Link to="/admin/ciudades" className='opcionAdmin'>Administrar Ciudades</Link></h3>
        </nav>
    </div>
    </>

  )
}

export default AdminMenu