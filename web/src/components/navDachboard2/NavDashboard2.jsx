import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material/';
import { cleanOneUser } from '../../redux/slices/userSlice';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import './NavDas.css';

export default function NavDashboard2() {

    const dispatch = useDispatch();

    const navigate = useNavigate()

    const handleClean = () =>{
        dispatch(cleanOneUser())
        navigate('/')
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
                width:'70%',
                boxShadow: '1px 4px 17px -10px #000000'
              }}
            >
            <Link to='/admin'>
            <ListItem button className='boton'>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary='Inicio'/>
            </ListItem>
            </Link>
            <Link to='/work'>
                <ListItem button className='boton'>
                    <ListItemIcon>
                        <HomeWorkIcon />
                    </ListItemIcon>
                    <ListItemText primary='Obras' />
                </ListItem>
            </Link>
            <Link to='/users'>
            <ListItem button className='boton'>
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary='Usuarios' />
            </ListItem>
            </Link>
            <ListItem onClick={handleClean} button className='boton'>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary='Log out' />
            </ListItem>
            </Box>
            </List>
          </Grid>
        </Grid>
    </>
  )
}
