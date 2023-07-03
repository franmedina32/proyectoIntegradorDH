import { faAdd, faRectangleList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,faArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import {useTable} from 'react-table'
import React, { useState, useEffect } from 'react'
import { faX } from '@fortawesome/free-solid-svg-icons';
import ModalAdmCategoria from '../../../common/adminCategoria/ModalAdmCategoria';
import { apiUrl } from '../../../../utils/variables';
import flecha from '../../../../Img/flecha-izquierda.png';
import { Link } from 'react-router-dom';
import "../adminCategorias/adminCategorias.css"

const AdminCategorias = () => {
    const url = `${apiUrl}/categoria/paginado/pag/`
    const [categoriasData, setCategoriasData] = useState([])
    const [pageCounter, setPageCounter] = useState(0)
    const [mensaje, setMensaje] = useState(false)
    const [showModal, setShowModal] = useState(false)
 
    useEffect(()=>{
        fetch(url+pageCounter)
         .then(res => res.json())
         .then(data => setCategoriasData(data.content))
    },[pageCounter])
    const handleDelete = (row) => {
        fetch(`${apiUrl}/categoria/delete/`+row.values.id,{
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if(res.ok) {
                setMensaje("se elimino la categoria con exito")
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
            accessor: 'id',
          },

          {
            Header: 'CATEGORIA',
            accessor: 'titulo'
          },
          {
            Header: 'ACCIONES',
            Cell: ({ row }) => (
              <div className='acciones-container'>
                  <button onClick={() => handleDelete(row)}><FontAwesomeIcon icon={faTrash}/></button>
              </div>
            ),
            }
        ],
        []
      );
      const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow} = useTable({ columns: columnas, data: categoriasData });
  return (
    <>
        
        <div className='panelCategorias'>
        <Link to="/" className='flecha'> 
                <img src={flecha} alt="regresar" style={{ width: '50px', height: '50px' }} />
            </Link>
        <div className='topPanel'>  
            <h1>PANEL ADMINISTRACION CATEGORIAS</h1>
            <button onClick={()=>{setShowModal(true)}}><FontAwesomeIcon icon={faAdd}/><FontAwesomeIcon icon={faRectangleList}/></button>
        </div>
     
        <table {...getTableProps()} className='table'>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
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
          <FontAwesomeIcon icon={faX} id="cross" onClick={(e)=>{setShowModal(false)}} className='cruzmod'/>
        </div>
        <ModalAdmCategoria/>
      </div> 
        : <p></p>
    }
      </div>
    </div>
    </>

  )
}

export default AdminCategorias