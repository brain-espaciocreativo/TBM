import React from 'react';
import { Box, Grid} from '@mui/material/';
import NavDashboard from '../../components/navDashboard/NavDashboard';
import { makeStyles } from '@mui/styles';
import ListUserDashboard from '../../components/listUserDashboard/ListUserDashboard';
const linksArray = ['Charts', 'Users'];
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
      <NavDashboard 
      links={linksArray}
       />

      <h1>Home</h1>
      <Grid container>
          <Grid item xs={3} columns={1}>
            <NavDashboard2 />
          </Grid>
          <Grid item xs={9} columns={2} sx={{height:'100vh',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Box>
              <h1>Sitio en construción</h1>
            </Box>
          </Grid>
        </Grid>
      

    </div>
  )
};;