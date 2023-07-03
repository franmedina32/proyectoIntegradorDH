import React from 'react'

const CardReserva = ({fecha, nombreTaller, direccionTaller, vehiculoNombre}) => {
  return (
    <>
    <div className='cardReservas'>
        <div className="containerCardReservas">
            <h3>FECHA: {fecha}</h3>
            <h4>Taller: {nombreTaller}</h4>
            <p>direccion: {direccionTaller}</p>
            <h4>vehiculo: {vehiculoNombre}</h4>
          </div>
    </div>
    </>
    
  )
}

export default CardReserva