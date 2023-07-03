import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faAdd, faWrench } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft, faArrowRight, faX } from '@fortawesome/free-solid-svg-icons';
import './admintalleres.css';
import ModalAdminE from '../../../common/adminEditModal/ModalAdminE';
import { RegistroTallerModal } from '../../../common/registroTaller/RegistroTallerModal';
import { apiUrl } from '../../../../utils/variables';
import flecha from '../../../../Img/flecha-izquierda.png';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { Button } from '@mui/material';

const AdminTalleres = () => {
  const [talleresData, setTalleresData] = useState([]);
  const url = `${apiUrl}/taller/paginado/pag/`;
  const urlEliminarTaller = `${apiUrl}/taller/eliminar/`;
  const [pageCounter, setPageCounter] = useState(0);
  const [mensaje, setMensaje] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [datosParticulares, setDatosParticulares] = useState(false);
  const [newTallerModal, setNewTallerModal] = useState(false);
  const [deleteRow, setDeleteRow] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetch(url + pageCounter)
      .then((res) => res.json())
      .then((data) => setTalleresData(data.content));
  }, [pageCounter]);

  const handleDelete = (row) => {
    setDeleteRow(row);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (deleteRow) {
      fetch(urlEliminarTaller + deleteRow.original.id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (res.ok) {
            setMensaje('Se eliminó el taller con éxito');
            setTimeout(() => {
              setMensaje(false);
            }, 3000);
          }
        })
        .catch((err) => console.log(err));
    }
    setShowModal(false);
  };

  const handleEdit = (infoTaller) => {
    setDatosParticulares(infoTaller);
    setShowEditModal(true);
  };

  const columnas = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'NOMBRE',
        accessor: 'nombre',
      },
      {
        Header: 'CIUDAD',
        accessor: 'ciudad.nombre',
      },
      {
        Header: 'CATEGORIA',
        accessor: 'categoria.titulo',
      },
      {
        Header: 'ACCIONES',
        Cell: ({ row }) => (
          <div className='acciones-container'>
            <button onClick={() => handleDelete(row)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button onClick={() => handleEdit(row.original)}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: columnas,
    data: talleresData,
  });

  return (
    <>
      <div className='panelAdmin'>
        <Link to='/' className='flecha'>
          <img src={flecha} alt='regresar' style={{ width: '50px', height: '50px' }} />
        </Link>
        <div className='containerTabla'>
          <div className='hbDiv'>
            <h2>PANEL ADMINISTRACION TALLER</h2>
            <button className='button' onClick={() => setNewTallerModal(true)}>
              <FontAwesomeIcon icon={faAdd} />
              <FontAwesomeIcon icon={faWrench} />
            
            </button>
          </div>
          <div className='tabla'>
            <table {...getTableProps()} className='table responsive-table'>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()} style={{ width: '3px' }}>
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()} style={{ padding: '3px' }}>
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className='arrowdiv'>
            <FontAwesomeIcon icon={faArrowLeft} id='arrow' onClick={() => setPageCounter(pageCounter - 1)} />
            <FontAwesomeIcon icon={faArrowRight} id='arrow' onClick={() => setPageCounter(pageCounter + 1)} />
          </div>
          <div>
            {mensaje ? <p>{mensaje}</p> : <p></p>}
          </div>
          <div>

            
            {showModal && (
              <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)} className="modalEliminar">
                <h2>Confirmar eliminación</h2>
                <p>¿Estás seguro de que deseas eliminar este taller?</p>
                <div className='botonesConfirmacion'>
                  <Button variant="contained" color="error" onClick={handleConfirmDelete} >
                      Eliminar
                  </Button>

                  <Button variant="contained"  onClick={() => setShowModal(false)} >
                      Cancelar
                  </Button>
                 
                </div>
              </Modal>
            )}

               {/* Modal de Edición */}
            {showEditModal && (
              <div className='modal'>
                <div className='cruzdiv'>
                  <FontAwesomeIcon icon={faX} id="cross" onClick={(e)=>{setShowEditModal(false), setModalData("")}} className='cruzmod'/>
                </div>
                <ModalAdminE key={datosParticulares.id} tallData={datosParticulares}/>
              </div>
            )}

            
            {newTallerModal ? (
              <div className='modal'>
                <div className='cruzdiv'>
                  <FontAwesomeIcon icon={faX} id='cross' onClick={(e) => setNewTallerModal(false)} className='cruzmod' />
                </div>
                <RegistroTallerModal />
              </div>
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTalleres;
