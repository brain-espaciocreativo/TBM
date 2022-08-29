import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal, Button, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { Delete, Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { createOneUser, getAllUsers } from '../../redux/slices/userSlice';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Swal from 'sweetalert2'

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));

export default function ListUserDashboard() {

  const styles= useStyles();
  const [ modal, setModal ] = useState(false);
  const [ modalEdit, setModalEdit ] = useState(false);
  const [ createUserState, setCreateUserState ] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
    phone: "",
  });
  const [ editState, setEditState ] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    phone: "",
  });

  const dispatch = useDispatch();
  const users = useSelector(state => state.users.list);
  console.log(users)

    useEffect(()=>{
        dispatch(getAllUsers());
    },[dispatch]);

    const handleModalCreate = () =>{
      setModal(!modal);
    };

    const handleModalEdit = (id) => {
      setModalEdit(!modalEdit);
      console.log(id)
    }

    const handleCreateUser = (e) => {
      const { name, value} = e.target;
      setCreateUserState(state => ({...state, [name]: value}));
    }

    // const selectedUser = (userSelect, case) => {
    //   setEditState(userSelect);
    //   // (case==='edit')&&handleModalEdit()
    // }

    const createUser = () => {
      dispatch(createOneUser(createUserState));
    }

    const editUser = () => {
      console.log('editado');
    }

    const deleteUser = () => {
      console.log('borrado')
    }

    const alertDelete = () => {
      Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }

    const bodyInsert = (
      <div className={styles.modal}>
        <h3>Agregar Usuario</h3>
        <TextField label="Nombre" name='name' onChange={handleCreateUser} />
        <br />
        <TextField label="Apellido" name='surname' onChange={handleCreateUser} />
        <br />
        <TextField label="Email" name='email' onChange={handleCreateUser} />
        <br />
        <TextField label="Contraseña" name='password' onChange={handleCreateUser} />
        <br />
        <TextField label="Role" name='role' onChange={handleCreateUser} />
        <br />
        <TextField label="Telefono" name='phone' onChange={handleCreateUser} />
        <br />
        <div align="right">
        <Button onClick={createUser} color='primary'>Aceptar</Button>
        <Button onClick={handleModalCreate}>Cancelar</Button>
        </div>
      </div>
    );

    const bodyEdit = (
      <div className={styles.modal}>
        <h3>Editar Usuario</h3>
        <TextField label="Nombre" value={editState&&editState.name} />
        <br />
        <TextField label="Apellido" value={editState&&editState.surname} />
        <br />
        <TextField label="Email" value={editState&&editState.email} />
        <br />
        <TextField label="Contraseña" value={editState&&editState.password} />
        <br />
        <TextField label="Role" value={editState&&editState.role} />
        <br />
        <TextField label="Telefono" value={editState&&editState.phone} />
        <br />
        <div align="right">
        <Button onClick={e=>console.log(rowData.name)} color='primary'>Aceptar</Button>
        <Button onClick={handleModalEdit}>Cancelar</Button>
        </div>
      </div>
    );

  return (
    <div>
      <br />
      <Button onClick={handleModalCreate}>Insertar</Button>
      <br /><br />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telefono</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users ? users.map((e)=>(
              <TableRow key={e.id}>
                <TableCell>{e.name}</TableCell>
                <TableCell>{e.surname}</TableCell>
                <TableCell>{e.email}</TableCell>
                <TableCell>{e.phone}</TableCell>
                <TableCell>{e.role}</TableCell>
                <TableCell>
                  <Edit onClick={handleModalEdit(e.id)}/>
                  <Delete onClick={alertDelete(e.id)} />
                </TableCell>
              </TableRow>
            )) : <p>Cargando...</p>}
          </TableBody>
        </Table>
      </TableContainer>
      


      <Modal
      open={modal}
      onClose={setModal}
      >
        {bodyInsert}
      </Modal>
      <Modal
      open={modalEdit}
      onClose={setModalEdit}
      >
        {bodyEdit}
      </Modal>
    </div>
  )
}
