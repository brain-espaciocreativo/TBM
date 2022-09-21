import React, { useEffect } from 'react';
import { Grid, Typography} from '@mui/material/';
import NavDashboard from '../../components/navDashboard/NavDashboard';
import { makeStyles } from '@mui/styles';
import ListUserDashboard from '../../components/listUserDashboard/ListUserDashboard';
const linksArray = ['Charts', 'Users'];
import NavDashboard2 from '../../components/navDachboard2/NavDashboard2';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNews } from '../../redux/slices/newSlice';
import CardNews from '../../components/cardNews/CardNews';
import { Box } from '@mui/system';

const useStyle = makeStyles({
  btn: {
    background: 'black',
    color: 'white'
  }
});
export default function Dashboard() {

  const styles = useStyle();
  const dispatch = useDispatch();

  const news = useSelector(state => state.news.newList);
  
  useEffect(()=>{
    dispatch(getAllNews());
},[dispatch]);
  
  return (
    <div>
      <NavDashboard 
      links={linksArray}
       />

      
      <Grid container>
          <Grid item xs={3} columns={1}>
            <NavDashboard2 />
          </Grid>
          <Grid item xs={9} columns={2}>
          <Typography sx={{marginTop:'8rem', color: 'rgb(142, 7, 7)'}} variant='h5'>Novedades</Typography>
            <Box p={5} sx={{display: 'flex', flexWrap: 'wrap', gap: '2rem', marginBottom: '10rem'}}>
          {news && news.length ? news.map((e) =>
                ( 
                    <CardNews key={e.id} id={e.id} name={e.name} description={e.description} date={e.date} video={e.video} />
                 )) : ""
                }
              </Box>
          </Grid>
        </Grid>
        

    </div>
  )
};;
