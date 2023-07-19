import  { useEffect,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box,Grid,CardActionArea,Card,CardContent,Typography} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getAllNews } from '../../redux/slices/newSlice';
import { getData } from "../../redux/slices/userSlice";
const linksArray = ['Charts', 'Users'];
import NavDashboard from '../../components/navDashboard/NavDashboard';
import ReactPlayer from 'react-player/youtube'
import HomeUI from './HomeUI'
import CardNews from '../../components/cardNews/CardNews'
import WorkItem from '../../components/works/WorkNoti'

const useStyle = makeStyles({
    btn: {
        background: 'black',
        color: 'white',
    },
    root: {
        maxWidth: 345,
        marginTop: '10rem',
    },
    media: {
        height: 140,
    },
    progress: {
        paddingTop: '50px',
    },
})
export default function Dashboard() {
    const styles = useStyle()

    const dispatch = useDispatch()

    const news = useSelector((state) => state.news.newList)
    const [work, setWork] = useState({})

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        const payload = {
            email: user.email,
        }

        getData(payload)
            .then((result) => {
                setWork(result)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    useEffect(() => {
        if (work !== undefined) {
            console.log(work)
        }
    }, [work])

    return (
        <div>
            <NavDashboard links={linksArray} />

      <Container className={styles.root}>
        <Grid container>
          <Grid xs={12} sm={6} item>Nombre: {work.name}</Grid><Grid xs={12} sm={6} item>Email: {work.email}</Grid>
        </Grid>
        <Grid container>
          <Typography variant='h5'
            component='h6'
            sx={{
              color: 'rgb(142, 7, 7)',
              padding: '15px 0 15px 0',
            }}
          >Novedades</Typography>
        </Grid>
        <Grid container>
          <Grid item>
            {work.works && work.works.length > 0 ? work.works.map((w) => (
              <WorkItem name={w.name} id={w.id} description={w.description} progresses={w.progresses} key={`obrasdeusuario${w.id}`}></WorkItem>
            )) : ""}
          </Grid>


        </Grid>
      </Container>

    </div>
  )
};