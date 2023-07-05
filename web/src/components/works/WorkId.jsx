import { Card, CardContent, Chip, Grid, Typography, useMediaQuery, useTheme, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { getOneWork } from "../../redux/slices/workSlice";
import NavDashboard2 from "../navDachboard2/NavDashboard2";
import NavDashboard from "../navDashboard/NavDashboard";
import KeyboardBackspace from '@mui/icons-material/KeyboardBackspace';
import { Visibility } from '@mui/icons-material';

export default function WorkId() {

    const dispatch = useDispatch();
    const work = useSelector(state => state.works.work);

    const navigate = useNavigate();

    const { id } = useParams();

    const [data, setData] = useState()

    useEffect(() => {
        dispatch(getOneWork(id))
    }, [id, dispatch])

    useEffect(() => {
        if (work) {
            setData({
                name: work.name,
                description: work.description
            })
        }
        console.log(work);
    }, [work]);

    const theme = useTheme();

    const isMatch = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <NavDashboard />
            <Grid container >
                {
                    !isMatch &&
                    <Grid item xs={3} columns={1}>
                        <NavDashboard2 />
                    </Grid>
                }
                <Grid item xs={9} columns={1} sx={{ marginTop: '10rem' }}>
                    <KeyboardBackspace sx={{ color: 'red', cursor: 'pointer' }} onClick={() => navigate('/work')} />
                    {
                        work ?
                            < >
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Nombre de la Obra
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {work.name}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Descripcion
                                </Typography>
                                <Typography variant="body2">
                                    {work.description}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Progreso
                                </Typography>
                                {
                                    work && work.progresses
                                        ? work.progresses.map(element => {
                                            return <Chip sx={{ background: '#f0b8ba' }} key={element.id} label={`${element.category.name} ${element.value}% ${element.weight}%`} />
                                        })
                                        : <p>No hay progreso</p>
                                }
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">Usuarios</Typography>
                                {
                                    work && work.users
                                        ? work.users.map(element => {
                                            return <Chip sx={{ background: '#f0b8ba' }} key={element.id} label={`${element.email}`} />
                                        })
                                        : <p>No hay usuarios</p>
                                }
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">Novedades</Typography>
                                {
                                    work && work.news
                                        ? work.news.map(element => {
                                            return (
                                            <Card key={element.id} style={{ margin: '50px 0' }}>
                                                <CardContent >
                                                    <Typography >{element.name}</Typography>
                                                    <Typography variant="body2" sx={{ mb: 1.5 }} color="text.secondary">{element.description}</Typography>
                                                </CardContent>
                                            </Card>
                                            )
                                        })
                                        : <p>No hay usuarios</p>
                                }

                            </>
                            : <p>No se encontro trabajo</p>}
                </Grid>
            </Grid>
        </>
    )
}