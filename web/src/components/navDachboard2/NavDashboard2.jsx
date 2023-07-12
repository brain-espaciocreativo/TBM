import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material/';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import './NavDas.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function NavDashboard2() {

    const navigate = useNavigate()


    const handleClean = () =>{
        const logout = localStorage.removeItem('user');
        Swal.fire({
            title: '¿Estás seguro que quieres cerrar Sesiíon?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'si!'
          }).then((logout) => {
            if (logout.isConfirmed) {
              Swal.fire(
                'Sesión cerrada!'
              )
              navigate('/')
            }
          })
    }

  return (
    <>
        <Grid container>
          <Grid item xs={12} columns={1}>
          <List component='nav'>
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent:'space-evenly',
                height:'100vh',
                width:'80%',
                boxShadow: '1px 4px 17px -10px #000000'
              }}
            >
              <Link to='/admin' className='links'>
                  <ListItem button>
                      <ListItemIcon>
                          <HomeIcon className='icon' />
                      </ListItemIcon>
                      <ListItemText primary='Inicio'/>
                  </ListItem>
              </Link>
              <Link to='/admin/news/create' className='links'>
                <ListItem button>
                     <ListItemIcon>
                        <AddIcon className='icon'/>
                    </ListItemIcon>
                    <ListItemText primary='Crear novedad' className='btns' />
                </ListItem>
              </Link>
              <Link to='/work' className='links'>
                  <ListItem button>
                      <ListItemIcon>
                          <HomeRepairServiceIcon className='icon' />
                      </ListItemIcon>
                      <ListItemText primary='Obras' />
                  </ListItem>
              </Link>
              <Link to='/users' className='links'>
                <ListItem button>
                    <ListItemIcon>
                        <GroupIcon className='icon'/>
                    </ListItemIcon>
                    <ListItemText primary='Usuarios' />
                </ListItem>
              </Link>
              <Link className='links'>
                <ListItem onClick={handleClean} >
                    <ListItemIcon>
                        <LogoutIcon className='icon'/>
                    </ListItemIcon>
                    <ListItemText primary='Cerrar ' />
                </ListItem>
              </Link>
            </Box>
            </List>
          </Grid>
        </Grid>
    </>
  )
}
