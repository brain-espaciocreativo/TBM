import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react'
import NavDashboard2 from '../../components/navDachboard2/NavDashboard2'
import NavDashboard from '../../components/navDashboard/NavDashboard'
import ListUserDashboard from '../../components/listUserDashboard/ListUserDashboard';

const useStyle = makeStyles({
    btn: {
      background: 'black',
      color: 'white'
    }
  });

export default function Users() {

    const styles = useStyle();

  return (
    <>
        <NavDashboard 
       />
      <h1>Lista de usuarios</h1>
      <Grid container>
          <Grid item xs={3} columns={1}>
            <NavDashboard2 />
          </Grid>
          <Grid item xs={9} columns={2}>
            <ListUserDashboard />
          </Grid>
        </Grid>
      

        
    </>
  )}
