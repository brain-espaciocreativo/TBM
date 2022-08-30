import { useEffect,useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal, Button, TextField,Typography } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { createOneUser, getAllUsers } from '../../redux/slices/userSlice';
import { makeStyles } from '@mui/styles';
import { useForm} from '../../hooks/useForm';
import Swal from 'sweetalert2';
import './ListUserDas.css';
import ListUI from './ListUI';


const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    margin:'auto',
    backgroundColor: theme.palette.background.paper,
    borderRadius:'1rem',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display:'flex',
    flexDirection:'column',
    gap:'.8rem'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  },
  inputs:{
    width:'100%',
    boxShadow: '1px 4px 17px -10px #000000'
  }
}));
 const initialForm ={
   name:'',
   surname:'',
   email:'',
   password:'',
   phone:'',
   role:''
 }
const validationsForm = (user) =>{

   let errors = {};
   let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
   let regexphone = /^(\+\d{1,3}[- ]?)?\d{10}$/;

  
   if(!user.email.trim()){
      errors.email = "Campo  requerido*"
   }else if(!regexEmail.test(user.email.trim())){
     errors.email="formato inválido";
   }
  if(!user.phone.trim()){
    errors.phone = "Campo  requerido*"
  }else if(!regexphone.test(user.phone.trim())){
    errors.phone="formato inválido";
  }
  
  
   if(!user.name.trim()){ errors.name = "Campo es requerido*"}
   if(!user.surname.trim()){ errors.surname = "Campo  requerido*"}
    if(!user.password.trim()){ errors.password = "Campo  requerido*"}
    if(!user.role.trim()){ errors.role = "Campo  requerido*"}

   return errors;
 }

export default function ListUserDashboard() {

  const {err,handleBlur} = useForm(initialForm, validationsForm)

  const styles= useStyles();
  const [ modal, setModal ] = useState(false);
  const [ modalEdit, setModalEdit ] = useState(false);
  const [ createUserState, setCreateUserState ] = useState({
     name: "",
     surname: "",
     email: "",
     phone: "",
     password: "",
     role: ""  
   });
  const [ editState, setEditState ] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    role: "",
    password: ""
  });

  const dispatch = useDispatch();

  const users = useSelector(state => state.users.list);

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

    const createUser = async () => {
      await dispatch(createOneUser(createUserState));
      await dispatch(getAllUsers());
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
        <Typography className='Encabezado'>
          Agregar Usuario
          </Typography>
        <TextField  
        className={styles.inputs}
        label="Nombre"
        name='name'
        onChange={handleCreateUser}
        value={createUserState.name}
        onBlur={handleBlur}
        InputLabelProps={{
                    style:{
                      textTransform: "uppercase",
                      fontSize:".8rem"
                    }
                  }} 
        />
        {err.name && <Typography className="error">{err.name}</Typography>}
        <TextField className={styles.inputs}
         label="Apellido" 
         name='surname' 
         onChange={handleCreateUser}
        onBlur={handleBlur}
        value={createUserState.surname}
         InputLabelProps={{
          style:{
            textTransform: "uppercase",
            fontSize:".8rem"
          }
        }}
        />
        {err.surname && <Typography className="error">{err.surname}</Typography>}
        <TextField 
        className={styles.inputs}
        required
         label="Email" 
         name='email'
         type='email'
          onChange={handleCreateUser}
          onBlur={handleBlur}
        value={createUserState.email}
          InputLabelProps={{
            style:{
              textTransform: "uppercase",
              fontSize:".8rem"
            }
          }}
        />
        {err.email && <Typography className="error">{err.email}</Typography>}
        <TextField 
        className={styles.inputs} 
        label="Contraseña" 
        type='password'
        name='password' 
        onChange={handleCreateUser} 
        onBlur={handleBlur}
        value={createUserState.password}
        InputLabelProps={{
          style:{
            textTransform: "uppercase",
            fontSize:".8rem"
          }
        }}
        />
        {err.password && <Typography className="error">{err.password}</Typography>}
        <TextField 
        className={styles.inputs} 
        label="Role" 
        name='role'
        onChange={handleCreateUser} 
        onBlur={handleBlur}
        value={createUserState.role}
         InputLabelProps={{
          style:{
            textTransform: "uppercase",
            fontSize:".8rem"
          }
        }}
         />
         {err.role && <Typography className="error">{err.role}</Typography>}
        <TextField 
        className={styles.inputs} 
        label="Telefono" 
        name='phone' 
        value={createUserState.phone}
        onBlur={handleBlur}
        onChange={handleCreateUser}
        InputLabelProps={{
          style:{
            textTransform: "uppercase",
            fontSize:".8rem"
          }
        }}
        />
        {err.phone && <Typography className="error">{err.phone}</Typography>}
        <div >
          <Button onClick={createUser}
           sx={{
            backgroundColor: 'rgb(160, 7, 7) ',
            color: 'white',
            padding: '10px',
            margin: '0 15px',
            border:'1px solid rgb(160, 7, 7) ',
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
        InputLabelProps={{
          style:{
            textTransform: "uppercase",
            fontSize:".8rem"
          }
        }} label="Nombre" className={styles.inputs} value={editState&&editState.name} />
        <TextField  InputLabelProps={{
          style:{
            textTransform: "uppercase",
            fontSize:".8rem"
          }
        }} label="Apellido" className={styles.inputs} value={editState&&editState.surname} />
        <TextField  InputLabelProps={{
          style:{
            textTransform: "uppercase",
            fontSize:".8rem"
          }
        }} label="Email" className={styles.inputs} value={editState&&editState.email} />
        <TextField  InputLabelProps={{
          style:{
            textTransform: "uppercase",
            fontSize:".8rem"
          }
        }} label="Contraseña" className={styles.inputs} value={editState&&editState.password} />
        <TextField InputLabelProps={{
          style:{
            textTransform: "uppercase",
            fontSize:".8rem"
          }
        }}  label="Role" className={styles.inputs} value={editState&&editState.role} />
        <TextField  InputLabelProps={{
          style:{
            textTransform: "uppercase",
            fontSize:".8rem"
          }
        }} label="Telefono"  className={styles.inputs} value={editState&&editState.phone} />
        <div align="right">
        <Button onClick={e=>console.log(rowData.name)} sx={{
            backgroundColor: 'rgb(160, 7, 7) ',
            color: 'white',
            padding: '10px',
            margin: '0 15px',
            border:'1px solid rgb(160, 7, 7) ',
            transition: '.5s'
          }} className='aceptar'>Aceptar</Button>
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
            border:'1px solid rgb(160, 7, 7) ',
            transition: '.5s'
          }} className='aceptar'>Insertar</Button>
      <br /><br />
      <TableContainer>
        <Table >
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
            {users && users.length ? users.map((e)=>(
              <TableRow key={e.id}>
                <TableCell>{e.name}</TableCell>
                <TableCell>{e.surname}</TableCell>
                <TableCell>{e.email}</TableCell>
                <TableCell>{e.phone}</TableCell>
                <TableCell>{e.role}</TableCell>
                <TableCell>
                  <Edit onClick={() =>handleModalEdit(e.id)}/>
                  <Delete onClick={() =>alertDelete(e.id)} />
                </TableCell>
              </TableRow>
            )) : <ListUI/>} 
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
