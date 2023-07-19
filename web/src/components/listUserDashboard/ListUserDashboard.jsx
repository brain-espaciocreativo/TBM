import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal, Button, TextField, Typography, InputLabel, Select, MenuItem, FormControl } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { createOneUser, deleteOneUser, getAllUsers, updateOneUser, user } from '../../redux/slices/userSlice';
import { makeStyles } from '@mui/styles';
import './ListUserDas.css';
import Swal from 'sweetalert2';


const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    margin: 'auto',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '1rem',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    gap: '.8rem'
  },
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%'
  },
  inputs: {
    width: '100%',
    boxShadow: '1px 4px 17px -10px #000000'
  }
}));

export default function ListUserDashboard() {


  const styles = useStyles();
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [createUserState, setCreateUserState] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
    role: ''
  });
  const [editState, setEditState] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    role: "",
    password: ""
  });

  const dispatch = useDispatch();

  let users=[];

  const [usersList, setUsersList] = useState([])
  
  users =  useSelector(state => state.users.list);
  
  useEffect(()=>{
    
    if (users) {
      users.map((e) => {
        setUsersList(state => [...state, e.email])
      })
   
    }
    
  },[users]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleModalCreate = () => {
    setModal(!modal);
  };

  const handleModalEdit = (data) => {
    setModalEdit(!modalEdit);
    if (data) [
      setEditState({
        id: data.id,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        role: data.role,
        password: data.password,
      })
    ]
   
  }

  const handleCreateUser = (e) => {
    const { name, value } = e.target;
    setCreateUserState(state => ({ ...state, [name]: value }));
  }

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setEditState(state => ({ ...state, [name]: value }));
  }

  const createUser = async () => {
    if (usersList.includes(createUserState.email)) {
      return(
      Swal.fire({
        title: 'usuario con email ya registrado!',
      }),
      handleModalCreate())
    }
    //  else{
    //   dispatch(createOneUser(createUserState));
    //   dispatch(getAllUsers());
    //  Swal.fire({
    //    title: 'Usuario creado!',
    //  })
    //  handleModalCreate()
    //  setCreateUserState('')

    if (!createUserState.name || !createUserState.surname || !createUserState.email || !createUserState.password || !createUserState.role || !createUserState.phone) {
      return (
        Swal.fire({ title: 'Llene los campos para crear un usuario' }),
        handleModalCreate()
      )
    } else {
      await dispatch(createOneUser(createUserState));
      await dispatch(getAllUsers());
      Swal.fire({
        title: 'Usuario creado!',
      })
      setCreateUserState('')
      handleModalCreate()
    }

  }

  const editUser = () => {
/*    if (usersList.includes(editState.email) &&usersList.includes(editState.email) ) {
      return(
      Swal.fire({
        title: 'usuario con email ya registrado!',
      }),
      handleModalEdit())
    }
*/
    dispatch(updateOneUser(editState))
    Swal.fire({
      title: 'Usuario actualizado!',
    }).then(() => dispatch(getAllUsers()))
    handleModalEdit()
  }

  const deleteUser = (data) => {
    const { id, email } = data;
    Swal.fire({
      title: `Desea eliminar este usuario ${email}?`,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteOneUser(id));
        Swal.fire('Eliminado!', '', 'success')
      }
      dispatch(getAllUsers())
    })
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
      <Typography className='Encabezado'>
        Agregar Usuario
      </Typography>
      <TextField
        className={styles.inputs}
        label="Nombre"
        name='name'
        required
        onChange={handleCreateUser}
        value={createUserState.name}
        // onBlur={handleBlur}
        InputLabelProps={{
          style: {
            textTransform: "uppercase",
            fontSize: ".8rem"
          }
        }}
      />
      {/* {err.name && <Typography className="error">{err.name}</Typography>} */}
      <TextField className={styles.inputs}
        label="Apellido"
        name='surname'
        required
        onChange={handleCreateUser}
        // onBlur={handleBlur}
        value={createUserState.surname}
        InputLabelProps={{
          style: {
            textTransform: "uppercase",
            fontSize: ".8rem"
          }
        }}
      />
      {/* {err.surname && <Typography className="error">{err.surname}</Typography>} */}
      <TextField
        className={styles.inputs}
        required
        label="Email"
        name='email'
        type='email'
        onChange={handleCreateUser}
        // onBlur={handleBlur}
        value={createUserState.email}
        InputLabelProps={{
          style: {
            textTransform: "uppercase",
            fontSize: ".8rem"
          }
        }}
      />
      {/* {err.email && <Typography className="error">{err.email}</Typography>} */}
      <TextField
        className={styles.inputs}
        label="Contraseña"
        type='password'
        name='password'
        required
        onChange={handleCreateUser}
        // onBlur={handleBlur}
        value={createUserState.password}
        InputLabelProps={{
          style: {
            textTransform: "uppercase",
            fontSize: ".8rem"
          }
        }}
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={createUserState.role}
          label="Role"
          name='role'
          onChange={handleCreateUser}
        >
          <MenuItem value='admin'>Admin</MenuItem>
          <MenuItem value='usuario'>Usuario</MenuItem>
        </Select>
      </FormControl>
      {/* {err.role && <Typography className="error">{err.role}</Typography>} */}
      <TextField
        className={styles.inputs}
        label="Telefono"
        name='phone'
        required
        value={createUserState.phone}
        // onBlur={handleBlur}
        onChange={handleCreateUser}
        InputLabelProps={{
          style: {
            textTransform: "uppercase",
            fontSize: ".8rem"
          }
        }}
      />
      {/* {err.phone && <Typography className="error">{err.phone}</Typography>} */}
      <div >
        <Button onClick={createUser}
          sx={{
            backgroundColor: 'rgb(160, 7, 7) ',
            color: 'white',
            padding: '10px',
            margin: '0 15px',
            border: '1px solid rgb(160, 7, 7) ',
            transition: '.5s'
          }}
          className='aceptar'
        >Aceptar</Button>
        <Button onClick={handleModalCreate} color='error' >Cancelar</Button>
      </div>
    </div>
  );

  const bodyEdit = (
    <div className={styles.modal}>
      <Typography className='Encabezado'>
        Editar Usuario
      </Typography>
      <TextField
        onChange={handleChangeEdit}
        name='name'
        label="Nombre"
        value={editState.name}
        InputLabelProps={{
          style: {
            textTransform: "uppercase",
            fontSize: ".8rem"
          }
        }}
        className={styles.inputs}
      />
      <TextField
        name='surname'
        value={editState.surname}
        onChange={handleChangeEdit}
        InputLabelProps={{
          style: {
            textTransform: "uppercase",
            fontSize: ".8rem"
          }
        }}
        label="Apellido"
        className={styles.inputs}
      />
      <TextField
        onChange={handleChangeEdit}
        InputLabelProps={{
          style: {
            textTransform: "uppercase",
            fontSize: ".8rem"
          }
        }}
        name='email'
        value={editState.email}
        label="Email"
        className={styles.inputs}
      />
      <TextField
        className={styles.inputs}
        label="Contraseña"
        type='password'
        name='password'
        value={editState.password}
        required
        onChange={handleChangeEdit}
        // onBlur={handleBlur}
        InputLabelProps={{
          style: {
            textTransform: "uppercase",
            fontSize: ".8rem"
          }
        }}
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={editState.role}
          label="Role"
          name='role'
          onChange={handleChangeEdit}
        >
          <MenuItem value='admin'>Admin</MenuItem>
          <MenuItem value='usuario'>Usuario</MenuItem>
        </Select>
      </FormControl>
      <TextField
        onChange={handleChangeEdit}
        InputLabelProps={{
          style: {
            textTransform: "uppercase",
            fontSize: ".8rem"
          }
        }}
        name='phone'
        value={editState.phone}
        label="Telefono"
        className={styles.inputs}
      />
      <div align="right">
        <Button onClick={editUser} sx={{
          backgroundColor: 'rgb(160, 7, 7) ',
          color: 'white',
          padding: '10px',
          margin: '0 15px',
          border: '1px solid rgb(160, 7, 7) ',
          transition: '.5s'
        }}
          className='aceptar'
        >Aceptar</Button>
        <Button onClick={handleModalEdit} color='error'>Cancelar</Button>
      </div>
    </div>
  );

  return (
    <div>
      <br />
      <Button onClick={handleModalCreate} sx={{
        backgroundColor: 'rgb(160, 7, 7) ',
        color: 'white',
        padding: '10px',
        margin: '0 15px',
        border: '1px solid rgb(160, 7, 7) ',
        transition: '.5s'
      }} className='aceptar'>Insertar</Button>
      <br /><br />
      <TableContainer>
        <Table >
          <TableHead>
            <TableRow sx={{ margin: 5 }}>
              <TableCell sx={{ color: 'rgb(160,7,7)' }}>Nombre</TableCell>
              <TableCell sx={{ color: 'rgb(160,7,7)' }}>Apellido</TableCell>
              <TableCell sx={{ color: 'rgb(160,7,7)' }}>Email</TableCell>
              <TableCell sx={{ color: 'rgb(160,7,7)' }}>Telefono</TableCell>
              <TableCell sx={{ color: 'rgb(160,7,7)' }}>Role</TableCell>
              <TableCell sx={{ color: 'rgb(160,7,7)' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.length ? users.map((e) => (
              <TableRow key={e.id}>
                <TableCell>{e.name}</TableCell>
                <TableCell>{e.surname}</TableCell>
                <TableCell>{e.email}</TableCell>
                <TableCell>{e.phone}</TableCell>
                <TableCell>{e.role}</TableCell>
                <TableCell>
                  <Edit onClick={() => handleModalEdit(e)} />
                  <Delete onClick={() => deleteUser({ id: e.id, email: e.email })} />
                </TableCell>
              </TableRow>
            )) : null}
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
