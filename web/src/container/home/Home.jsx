import React, { useEffect } from 'react';
import { Box, Grid} from '@mui/material/';
import NavDashboard from '../../components/navDashboard/NavDashboard';
import { makeStyles } from '@mui/styles';
const linksArray = ['Charts', 'Users'];
import { useDispatch, useSelector } from 'react-redux';
// import { setNewsList } from '../../redux/slices/newsSlice';

const useStyle = makeStyles({
  btn: {
    background: 'black',
    color: 'white'
  }
});
export default function Dashboard() {

  const styles = useStyle();

  const dispatch = useDispatch();
  const userSelect = useSelector((state) => state.users.user)

  useEffect(() => {
    // dispatch(setNewsList());
  },[dispatch])

  
  return (
    <div>
      <NavDashboard 
      links={linksArray}
       />

      <h1>Home</h1>
      <Grid container>
          <Grid item xs={12} columns={2} sx={{height:'100vh',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Box>
              <h1>Proximamente las novedades</h1>
            </Box>
          </Grid>
        </Grid>
      

    </div>
  )
};;