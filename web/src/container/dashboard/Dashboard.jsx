import React from 'react';
import { Grid, ListItem, ListItemIcon, ListItemText, Divider, Box} from '@mui/material/';
import NavDashboard from '../../components/NavDashboard/NavDashboard';
import { makeStyles } from '@mui/styles';
import ListUserDashboard from '../../components/listUserDashboard/ListUserDashboard';
import { List } from '@mui/icons-material';
const linksArray = ['Charts', 'Users'];
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonIcon from '@mui/icons-material/Person';
import Home from '../home/Home'
import NavDashboard2 from '../../components/navDachboard2/NavDashboard2';

const useStyle = makeStyles({
  btn: {
    background: 'black',
    color: 'white'
  }
});
export default function Dashboard() {

  const styles = useStyle();

  
  return (
    <div>
      <NavDashboard links={linksArray} />

      <h1>Dashboard</h1>
      <Grid container>
          <Grid item xs={3} columns={1}>
            <NavDashboard2 />
          </Grid>
          <Grid item xs={9} columns={2}>
          <ListUserDashboard />
          </Grid>
        </Grid>
      

    </div>
  )
};
