import { Card, CardContent, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { getOneWork } from "../../redux/slices/workSlice";
import NavDashboard2 from "../navDachboard2/NavDashboard2";
import NavDashboard from "../navDashboard/NavDashboard";
import KeyboardBackspace from '@mui/icons-material/KeyboardBackspace';

export default function WorkId () {

    const [data, setData] = useState({})
    const dispatch = useDispatch();
    const work = useSelector(state => state.works.work);

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        dispatch(getOneWork(id))
    }, [id, dispatch])

    useEffect(() => {
        if(work){
            setData({
            name: work.name,
            description: work.description})
        }
    }, [work]);

    const theme = useTheme();

    const isMatch = useMediaQuery(theme.breakpoints.down('md'));

    return(
        <>
        <NavDashboard/>
        <Grid container >
            {
                !isMatch &&
                <Grid  xs={3} columns={1}>
                    <NavDashboard2/>
                </Grid>
            }
            <Grid item xs={9} columns={1} sx={{ marginTop:'10rem'}}>
                    <KeyboardBackspace sx={{color:'red', cursor:'pointer'}} onClick={()=>navigate('/work')}/>
                <Card sx={{ minWidth: 275,boxShadow: '5px 5px 13px 2px rgba(0,0,0,0.39)', margin:'20px 0', width:'20%' }}>
                        <CardContent>
                            <Typography  sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Nombre de la Obra
                            </Typography>
                            <Typography variant="h5" component="div">
                            {data.name}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Descripcion
                            </Typography>
                            <Typography variant="body2">
                            {data.description}
                            </Typography>
                        </CardContent>
                </Card>
            </Grid>
        </Grid>
        </>
    )
}