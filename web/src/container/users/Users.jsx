import { Grid, useMediaQuery, useTheme } from '@mui/material';
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

    const theme = useTheme();

    const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
        <NavDashboard/>
      <Grid container>
         {
            !isMatch &&
            <Grid item md={3} columns={1}>
              <NavDashboard2/>
            </Grid>
          }
          <Grid item xs={12} md={9} columns={2} sx={{marginTop:'7rem'}}>
            <ListUserDashboard />
          </Grid>
        </Grid>
    </>
  )}
