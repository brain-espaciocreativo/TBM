import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { getAllUsers } from '../../redux/slices/userSlice';
import { Button, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material/';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonIcon from '@mui/icons-material/Person';

export default function Home() {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllUsers());
    },[dispatch]);

  return (
    <div>
        
        <Grid container>
          <Grid item xs={12} columns={1}>
          <List component='nav'>
            <ListItem button>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary='Estadisticas' />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary='Usuarios' />
            </ListItem>
            <Divider />
            </List>
          </Grid>
        </Grid>
    </div>
  )
}
