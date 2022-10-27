import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import './Login.css';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2'




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
export default function Login() {

  const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');


  const navigate = useNavigate()

  const onChangeEmail = (e) => {
		setEmail(e.target.value);
	};

	const onChangePassword = (e) => {
		setPassword(e.target.value);
	};


  const user = localStorage.getItem('user')

  const onSubmit = async (e) => {
		e.preventDefault();
    const peticion = await axios.post('http://localhost:3000/auth/login',{
      email,
      password
      }).then( res =>
          {
            if(res.data.data[0].role === 'admin'){
              navigate('/admin')
            }else if(res.data.data[0].role === 'usuario'){
              navigate('/home')
            }
            localStorage.setItem('user', JSON.stringify(res.data.data[0]))
            console.log(res.data.data[0]);
          }
      ).catch( err =>{
          console.log(err)
          if(err.response.status === 401){
              Swal.fire({
                  text: "Datos incorrectos!",
                  icon: 'error'
                })
          }
      })

	}

  return (
   
      <Grid container component="main" sx={{ height: '100vh'}} className="gridContainer">
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          className="bg-grid"
        />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 2}} className="avatar">
              <LockOutlinedIcon variant="contained"/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Ingresar
            </Typography>
            <Box component="form"  onSubmit={onSubmit} sx={{ mt: 3 }}>
              <Box>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                className='input'
                value={email}
                onChange={onChangeEmail}
                InputLabelProps={{
                  style:{
                    textTransform: "uppercase",
                    fontSize:".8rem"
                  }
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                className='input'
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                value={password}
                autoComplete="current-password"
                onChange={onChangePassword}
                InputLabelProps={{
                  style:{
                    textTransform: "uppercase",
                    fontSize:".8rem"
                  }
                }}
              />
              </Box>
              <FormControlLabel
                control={<Checkbox value="remember" color="error" />}
                label="Recordarme"
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="error"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar Sesión
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/resset-password" variant="body2" color="error" >
                    Olvidaste la contraseña?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" color="error">
                    {"No tenes una cuenta? Registráte"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 40 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
}