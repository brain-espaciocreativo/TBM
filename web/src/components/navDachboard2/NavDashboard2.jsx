import React from 'react'
import { Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material/';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import './NavDas.css';

export default function NavDashboard2() {
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
            <ListItem button className='boton'>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary='Home'/>
            </ListItem>
            <ListItem button className='boton'>
                <ListItemIcon>
                    <PersonIcon className='icon' />
                </ListItemIcon>
                <ListItemText primary='Usuarios' />
            </ListItem>
            <ListItem button className='boton'>
                <ListItemIcon>
                    <HomeWorkIcon />
                </ListItemIcon>
                <ListItemText primary='Obras' />
            </ListItem>
            <ListItem button className='boton'>
                <ListItemIcon>
                    <LoginIcon />
                </ListItemIcon>
                <ListItemText primary='Login' />
            </ListItem>
            <ListItem button className='boton'>
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
