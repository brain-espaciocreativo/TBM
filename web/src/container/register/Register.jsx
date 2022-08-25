import { FormControl } from '@mui/material';
import { useForm } from '../../hooks/useForm';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import './Register.css';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Brian Espacio Creativo
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
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

export default function SignUp() {

  const {user,err,handleBlur,handleChange,handleSubmit} = useForm(initialForm, validationsForm)

  return (
      <Container component="main" maxWidth="xs" className='caja' >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent:'center'
          }}
        >
          <Avatar sx={{ m: 2}} className="avatar">
              <LockOutlinedIcon variant="contained"/>
            </Avatar>
          <Typography component="h1" variant="h5">
          Registrate
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3}} onSubmit={handleSubmit} >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="name"
                  name="name"
                  value={user.name}
                  required
                  fullWidth
                  id="name"
                  label="Nombre"
                  autoFocus
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    style:{
                      textTransform: "uppercase",
                      fontSize:".8rem"
                    }
                  }}
                />
                {err.name && <Typography className="error">{err.name}</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="surname"
                  label="Apellido"
                  name="surname"
                  value={user.surname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="family-name"
                />
                {err.surname && <Typography className="error">{err.surname}</Typography>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  autoComplete="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    style:{
                      textTransform: "uppercase",
                      fontSize:".8rem"
                    }
                  }}
                />
                {err.email && <Typography className="error">{err.email}</Typography>}

              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Contraseña"
                  type="password"
                  autoComplete="new-password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    style:{
                      textTransform: "uppercase",
                      fontSize:".8rem"
                    }
                  }}
                />
                {err.password && <Typography className="error">{err.password}</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Telefono"
                  type="tel"
                  autoComplete="new-password"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    style:{
                      textTransform: "uppercase",
                      fontSize:".8rem"
                    }
                  }}
                />
                {err.phone && <Typography className="error">{err.phone}</Typography>}
              </Grid>
              <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel  className='rol'>Rol</InputLabel>
                  <Select
                    id="role"
                    name='role'
                    value={user.role}
                    label="role"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="admin">Administrador</MenuItem>
                    <MenuItem value="user">Usuario</MenuItem>
                  </Select>
                {err.role && <Typography className="error">{err.role}</Typography>}
                </FormControl>
              </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="error"
                sx={{ mt: 3, mb: 2 }}
              >
                Registrarse
              </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="../login" variant="body2" color="error">
                  Ya tenés una cuenta? Iniciá Sesión
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 , p:5}} />
      </Container>
  );
}