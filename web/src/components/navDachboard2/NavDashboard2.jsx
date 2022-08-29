import React from 'react'
import { Divider, Grid, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material/';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeWorkIcon from '@mui/icons-material/HomeWork';

export default function NavDashboard2() {
  return (
    <>
        <Grid container>
          <Grid item xs={12} columns={1}>
          <List component='nav'>
            <ListItem button>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary='Home' />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary='Usuarios' />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <HomeWorkIcon />
                </ListItemIcon>
                <ListItemText primary='Obras' />
            </ListItem>
            <Divider />
            <ListItem button>
                <ListItemIcon>
                    <LoginIcon />
                </ListItemIcon>
                <ListItemText primary='Login' />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary='Log out' />
            </ListItem>
            </List>
          </Grid>
        </Grid>
    </>
  )
}
