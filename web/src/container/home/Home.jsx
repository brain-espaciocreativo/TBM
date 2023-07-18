import  { useEffect,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box,Grid,CardActionArea,Card,CardContent,Typography} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getAllNews } from '../../redux/slices/newSlice';
import { getData } from "../../redux/slices/userSlice";
const linksArray = ['Charts', 'Users'];
import NavDashboard from '../../components/navDashboard/NavDashboard';
import ReactPlayer from 'react-player/youtube'
import HomeUI from './HomeUI';
import CardNews from '../../components/cardNews/CardNews';
import WorkItem from "../../components/works/WorkNoti";

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
   const [work, setWork] = useState({});
   
   useEffect(() => {
    const payload = {
      email: 'andresramirez82@gmail.com'
    };

    getData(payload)
        .then(result => {
            setWork(result);
            //console.log(result)
        })
        .catch(error => {
            console.error(error);
        });
}, []);

useEffect(() => {
  if (work !==undefined){
   
    console.log(work)
  }
 
}, [work]);
  
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
          flexWrap: 'wrap',
          marginTop: '50px'        
        }} item>
                {work.works && work.works.length > 0 ? work.works.map((w) => (
                  <WorkItem name={w.name} id={w.id} description={w.description} progresses={w.progresses}></WorkItem>
                )) : "" }
              </Grid> 
        </Grid>
      </Box>
    </div>
  )
};