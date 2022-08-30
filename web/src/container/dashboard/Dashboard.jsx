import React from 'react';
import { Grid, ListItem, ListItemIcon, ListItemText, Divider, Box, Typography, useMediaQuery, useTheme} from '@mui/material/';
import NavDashboard from '../../components/NavDashboard/NavDashboard';
import { makeStyles } from '@mui/styles';
import ListUserDashboard from '../../components/listUserDashboard/ListUserDashboard';
const linksArray = ['Charts', 'Users'];
import MenuHamburger from '../../components/menuHamburger/MenuHamburger';

const useStyle = makeStyles(theme => ({
  btn: {
    background: 'black',
    color: 'white'
  },
  h1style: {
    marginBottom: 1000
  }
}));
export default function Dashboard() {

  const styles = useStyle();
  const theme = useTheme();

  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div>
      <div>
      <NavDashboard links={linksArray} />
      </div>
      <br />
      <br />
      <br />

      <Grid container>
        {
          !isMatch ?  <Grid item xs={3} columns={1}>
            <MenuHamburger />
          </Grid> : <p></p>
          }
          <Grid item xs columns={2}>
            <ListUserDashboard />
          </Grid>
        </Grid>
        
    </div>
  )
};
