import  { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box,Grid,CardActionArea,Card,CardContent,Typography} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getAllNews } from '../../redux/slices/newSlice';
const linksArray = ['Charts', 'Users'];
import NavDashboard from '../../components/navDashboard/NavDashboard';
import ReactPlayer from 'react-player/youtube'
import HomeUI from './HomeUI';
import CardNews from '../../components/cardNews/CardNews';

const useStyle = makeStyles({
  btn: {
    background: 'black',
    color: 'white'
  },
  root:{
    maxWidth:345,
    marginTop:'10rem'    
  },
  media:{
    height:140
  },
  progress:{
    paddingTop:'50px'
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

     <Box p={5}>
        <Grid container spacing={2}>
          <Typography variant='h5' 
          component='h6'
          sx={{color: 'rgb(142, 7, 7)',
          padding:'15px 0 15px 0',
          marginTop: '80px'
        }}
          >Novedades</Typography>
        <Grid sx={{
          display:'flex',
          gap: '2rem',
          flexWrap: 'wrap'        
        }} item>
                {news && news.length ? news.map((e) =>
                ( 
                    <CardNews key={e.id} id={e.id} name={e.name} description={e.description} date={e.date} video={e.video} />

                 )) : ""
                } 
              </Grid> 
        </Grid>
      </Box>
    </div>
  )
};