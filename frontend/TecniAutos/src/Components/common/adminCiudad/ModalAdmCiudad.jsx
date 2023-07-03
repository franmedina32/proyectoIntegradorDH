import React, { useState } from 'react'
import './modalAdmCiud.css'
import { faL } from '@fortawesome/free-solid-svg-icons'
import { apiUrl } from '../../../utils/variables'
import { Button, TextField } from "@mui/material";

const ModalAdmCiudad = () => {
    const url = `${apiUrl}/ciudad/crear`
    const [nombreCiudad, setNombreCiudad] = useState({})

    const handleSubmit = () => {
        fetch(url, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(nombreCiudad)
        })
    }

    return (
        <div className='modal-content'>
            <form action="" className='formDiv'>
                <h1>REGISTRO CIUDAD</h1>
               
                    <TextField
                        label="Nombre Ciudad"
                        variant="outlined"
                        onChange={(e) => { setNombreCiudad({ nombre: e.target.value }) }}
                    />
                 {/* <button onClick={handleSubmit}>ADD</button> */}
         <Button onClick={handleSubmit} type="submit" variant="contained"> Registrar ciudad </Button>
              
     
            </form>
            
        </div>
    )
}

export default ModalAdmCiudad
