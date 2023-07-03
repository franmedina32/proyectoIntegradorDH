import React, { useContext, useState } from 'react'
import '../reservas/reservasUser.css'
import { useEffect } from 'react'
import { LocalStorageContext } from '../../../context/LocalStorage.context'
import CardReserva from './CardReserva'
import { NotificationContext } from '../../../context/Notification.context'
import { apiUrl } from '../../../../utils/variables'
import { Button } from '@mui/material'
const ReservasUser = () => {
  const [reservasData, setReservasData] = useState(false)
  const [reservasPasadas, setReservasPasadas] = useState(false)
  const [reservasFuturas, setReservasFuturas] = useState(false)
  const [fechaActual , setFechaActual] = useState(false)
  const { storage } = useContext(LocalStorageContext)
  const { addNotification } = useContext(NotificationContext)
  useEffect(()=>{
    fetch(`${apiUrl}/reservas/usuario`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
      email: storage.loggedUser.sub
      })
    })
     .then(res => res.json())
     .then(data => setReservasData(data))
  },[])

  useEffect(()=>{
    const currentFecha = new Date()
    setFechaActual(currentFecha)
  },[])

  useEffect(()=>{
    if(reservasData){
      const futuras = [];
      const pasadas = [];
      reservasData.map(reserva => {
        const fechaRes = new Date(reserva.fecha)
        if(fechaRes > fechaActual){
          futuras.push(reserva)
        }
        if(fechaRes < fechaActual){
          pasadas.push(reserva)
        }
      })
      setReservasFuturas(futuras)
      setReservasPasadas(pasadas)
    }
  },[reservasData, fechaActual])

  const handleCancelarRes  = (reserva) => {
    const url = `${apiUrl}/reservas/elim/id/` + reserva.id
    fetch(url, {
      method: "DELETE"
    })
     .then(res => {
      if(res.ok){
        setReservasData(prevReservasData => prevReservasData.filter(res => res.id !== reserva.id));
        setReservasFuturas(prevFuturas => prevFuturas.filter(futura => futura.id !== reserva.id));
        addNotification({
          texto: `reserva eliminada`,
          tipo: "success",
        });
      }
      else {
        addNotification({
          texto: `error al eliminar`,
          tipo: "error",
        });
      }
     })
  }

  return (
    <>
     <h1 className='reservas'>Lista de reservas</h1>
    <div className='reservasDiv'>
     
      <div>
        <h2>Reservas futuras</h2>
        {reservasFuturas.length > 0 ? (
          <div>
            {reservasFuturas.map(reserva => (
              <div className='divFuturas' key={reserva.id}>
                <div className='containerCardFuturas'>
                <CardReserva
                  fecha={reserva.fecha}
                  nombreTaller={reserva.taller.nombre}
                  direccionTaller={reserva.taller.direccion}
                  vehiculoNombre={reserva.vehiculo.modelo}/>
                </div>
                <Button variant="contained" onClick={() => handleCancelarRes(reserva)} className='cancelarReserva'>
                  Cancelar reserva
                </Button>
              </div>
              
            ))}
          </div>
        ) : (
          <p>NO HAY RESERVAS PENDIENTES</p>
        )}
      </div>
      <div >
        <h2>Historial</h2>
        <>
        <div className="pasadas">
        {reservasPasadas ? 
        <div className='containerCard'>
          {reservasPasadas.map(res => (
            <CardReserva key={res.id} fecha={res.fecha} nombreTaller={res.taller.nombre} direccionTaller={res.taller.direccion} vehiculoNombre={res.vehiculo.modelo}/>
          ))}
        </div> 
        : <p>NO HAY RESERVAS PENDIENTES</p>}
        </div>
        </>
      </div>
    </div>
    </>
    
  )
}

export default ReservasUser