import React, { useContext, useEffect, useState } from 'react'
import { SearchInfoContext } from '../../context/SearchInfo.context'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { decodeJWT } from '../../../utils';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../../utils/variables';
import { Button, Grid, TextField } from '@mui/material';


const ReservaBloque = ({nombre, tallerId}) => {
    const {searchInfo} = useContext(SearchInfoContext)
    const [selectedDateTime, setSelectedDateTime] = useState()
    const [selectedDate, setSelectedDate] = useState()
    const [reservaData, setReservaData] = useState({
        taller_id: tallerId,
    })
    const navigateTo = useNavigate()

    useEffect(()=> {
        //console.log(searchInfo)
        if(searchInfo!=null){
            setSelectedDateTime(searchInfo.fecha)
        }
    },[])

    useEffect(() => {
        if (selectedDateTime) {
          setSelectedDate(transformDateToDatePickerFormat(selectedDateTime));
        }
      }, [selectedDateTime]);

    useEffect(()=>{
        try{
            const userdata = JSON.parse(localStorage.getItem('data'))
            const userEmail = userdata.loggedUser.sub
            if(userEmail){
                setReservaData({...reservaData, user_email: userEmail})
            }
        }
        catch {
            console.log("user not logged")
        }
    },[])

    const transformDateToDatePickerFormat = (date) => {
        return moment(date, 'YYYY-MM-DDTHH:mm:ss').toDate();
      };

    const transformDateToJavaCompatibleFormat = (date) => {
        return moment(date).format('YYYY-MM-DDTHH:mm:ss');
    };

    const handleReserva = () => {
        setReservaData({...reservaData, fecha: selectedDateTime})
        if (!reservaData.user_email){
            navigateTo("/login")
        }
        fetch(`${apiUrl}/reservas/appointment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reservaData)
        })
         .then(res => res.json())
         .then(data => console.log(data))
    }
      
  return (
    <div className='container-reservas'>
        <h1>Reserva tu turno en {nombre}</h1>
     
        <div>
            <form action=""className='form-container'>
            <div>
            <h3>Escoge la fecha de tu reserva</h3>
            <DatePicker className='fecha'
            placeholderText="Selecciona una fecha"
            popperClassName="datepicker-modal"
            dateFormat="dd/MM/yyyy"
            selected={selectedDate}
            onChange={(date)=>{
                const javaCompDate = transformDateToJavaCompatibleFormat(date)
                console.log(javaCompDate)
                setSelectedDateTime(javaCompDate);
              }}
            /> 
        </div>
            <h2>Informacion sobre tu vehiculo</h2>
            <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
            <TextField type="text" id="outlined-basic" label="Marca" variant="outlined"
           onChange={(e)=>{setReservaData({...reservaData, marca: e.target.value})}}/>
            </Grid>

            <Grid item xs={6} sm={6}>
            <TextField type="text" id="outlined-basic" label="Modelo" variant="outlined"
            onChange={(e)=>{setReservaData({...reservaData, modelo: e.target.value})}}/>
            </Grid>

            <Grid item xs={6} sm={6}>
            <TextField type="text" id="outlined-basic" label="Placa" variant="outlined"
            onChange={(e)=>{setReservaData({...reservaData, placa: e.target.value})}}/>
            </Grid>

            <Grid item xs={6} sm={6}>
            <TextField type="number" id="outlined-basic" label="Año" variant="outlined"
            onChange={(e)=>{setReservaData({...reservaData, anio: e.target.value})}}/>
            </Grid>

            <Grid item xs={12} sm={12}>
            <TextField type="number" id="outlined-basic" label="Cilindraje" variant="outlined"
            onChange={(e)=>{setReservaData({...reservaData, cilindraje: e.target.value})}}/>
            </Grid>
            </Grid>
            <Button variant="contained" onClick={handleReserva} >
                Reservar
            </Button>
            </form>
        </div>
       
    </div>
  )
}

export default ReservaBloque