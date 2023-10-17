import { Card, CardContent, Chip, Grid, Typography, useMediaQuery, useTheme, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { getOneWorkAllProgress } from "../../redux/slices/workSlice";
import NavDashboard2 from "../navDachboard2/NavDashboard2";
import NavDashboard from "../navDashboard/NavDashboard";
import KeyboardBackspace from '@mui/icons-material/KeyboardBackspace';
import { GroupByCategoryProgress, totalProcProgress } from "./functions";
import Progress from '../progress/Progress';
import MediaCard from "./CardWork";

const stringCase = (param) => {
    return `${param}`.replace(/(^\w{1})|(\s+\w{1})/g, (letra) =>
        letra.toUpperCase()
    )
}

export default function WorkId() {

    const dispatch = useDispatch();
    const work = useSelector(state => state.works.work);

    const navigate = useNavigate();

    const { id } = useParams();

    const [data, setData] = useState();
    const [progresses, setProgresses] = useState([]);
    const [prog, setProg] = useState([]);
    const [total, settotal] = useState();

    useEffect(() => {
        dispatch(getOneWorkAllProgress(id))
    }, [id, dispatch])

    useEffect(() => {
        if (work) {
            setData({
                name: work.name,
                description: work.description
            })
            setProgresses(work.progresses);
        }
        
    }, [work]);

    useEffect(() => {
        /**
         * Here I calculate and group by category the Progress Matrix
         */
        if (progresses !== undefined) {
            const arrayfinal = GroupByCategoryProgress(progresses);
            const totalAcumulado = totalProcProgress(arrayfinal);
            setProg(arrayfinal);
            settotal(totalAcumulado);
        }

    }, [progresses]);

    useEffect(() => {
        /**
         * Here I calculate and group by category the Progress Matrix
         */
        if (progresses !== undefined) {
            const arrayfinal = GroupByCategoryProgress(progresses);
            const totalAcumulado = totalProcProgress(arrayfinal);
            setProg(arrayfinal);
            settotal(totalAcumulado);
        }

    }, [progresses]);

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
                                {prog &&
                                prog.map((prog, i) => {
                                    return (
                                        <Progress
                                            key={i}
                                            value={prog.Percentage}
                                            categorie={stringCase(
                                                `${prog?.category}`
                                            )}
                                        />
                                    )
                                })}

                            {total && <Progress
                                key={`totalcategoryas`}
                                value={total}
                                categorie={stringCase(
                                    `Total`
                                )}
                            />}
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
                                        ? work.news.map((element,i) => {
                                            return (
                                                <MediaCard key={i} id={element.id}></MediaCard>
                                            )
                                        })
                                        : <p>No hay Notificaciones</p>
                                }

                            </>
                            : <p>No se encontro trabajo</p>}
                </Grid>
            </Grid>
        </>
    )
}