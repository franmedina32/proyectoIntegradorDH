import React, { useEffect, useState } from 'react'
import { faTrash, faPlus, faCity} from '@fortawesome/free-solid-svg-icons';
import {useTable} from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft,faArrowRight, faX } from '@fortawesome/free-solid-svg-icons';
import './adminCiudades.css'
import ModalAdmCiudad from '../../../common/adminCiudad/ModalAdmCiudad';
import { apiUrl } from '../../../../utils/variables';
import flecha from '../../../../Img/flecha-izquierda.png';
import { Link } from 'react-router-dom';

const AdminCiudades = () => {
    const url = `${apiUrl}/ciudad/paginado/pag/`
    const [pageCounter,setPageCounter] = useState(0)
    const [ciudadesData, setCiudadesData] = useState([])
    const [mensaje,setMensaje] = useState(false)
    const [showModal, setShowModal] = useState(false)
    useEffect(()=>{
        fetch(url+pageCounter)
         .then(res => res.json())
         .then(data => setCiudadesData(data.content))
    },[pageCounter, url])
    const handleDelete = (row) =>{
        fetch(`${apiUrl}/ciudad/delete/`+row.values.id,{
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json'
            }
        })
          .then(res => {
            if(res.ok) {
                setMensaje("se elimino la ciudad con exito")
                setTimeout(()=>{
                    setMensaje(false)
                },3000)
            }
          })
          .catch(err => console.log(err))
    }
    const columnas = React.useMemo(
        () => [
          {
            Header: 'ID',
            accessor: 'id'
          },
          {
            Header: 'CIUDAD',
            accessor: 'nombre'
          },
          {
            Header: 'ACCIONES',
            // eslint-disable-next-line react/prop-types
            Cell: ({ row }) => (
              <div className='acciones-container'>
                  <button onClick={() => handleDelete(row)}><FontAwesomeIcon icon={faTrash}/></button>
              </div>
            ),
            }
        ],
        []
      );
      const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow} = useTable({ columns: columnas, data: ciudadesData });
  return (

    <>
        <Link to="/" className='flecha'> 
              <img src={flecha} alt="regresar" style={{ width: '50px', height: '50px' }} />
            </Link>
        <div className='panelCiudades'>
        <div className='topPanel'>
            <h2>PANEL ADMINISTRACIÓN CIUDADES</h2>
            <button className='button' onClick={()=>{setShowModal(true)}}><FontAwesomeIcon icon={faPlus}/> <FontAwesomeIcon icon={faCity} /></button>
         
        </div>
        <table {...getTableProps()} className='table'>
        <thead>
          {headerGroups.map(headerGroup => (
            // eslint-disable-next-line react/jsx-key
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // eslint-disable-next-line react/jsx-key
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              // eslint-disable-next-line react/jsx-key
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  // eslint-disable-next-line react/jsx-key
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className='arrowdiv'>
        <FontAwesomeIcon icon={faArrowLeft} id="arrow" onClick={()=> setPageCounter(pageCounter - 1)}/>
        <FontAwesomeIcon icon={faArrowRight} id="arrow" onClick={() => setPageCounter(pageCounter + 1)}/>
      </div>
      <div className='divMensaje'>
        {mensaje ? <p>{mensaje}</p> : <p></p>}
      </div>
      <div>
        {showModal ? 
        <div className='modal'>
        <div className='cruzdiv'>
          <FontAwesomeIcon icon={faX} id="cross" onClick={()=>{setShowModal(false)}} className='cruzmod'/>
        </div>
        <ModalAdmCiudad/>
      </div> 
        : <p></p>
    }
      </div>
    </div>
    </>

  )
}

export default AdminCiudades