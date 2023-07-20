import {
    Grid,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    IconButton,
    Badge,
    Avatar,
    Paper,
    Modal
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useDispatch } from 'react-redux'
import { deleteOneNews } from '../../redux/slices/newSlice'
import { categoriesSlide } from '../../redux/slices/categoriesSlice'
import { config } from '../../config/config.js'
import Progress from '../progress/Progress';
import { GroupByCategoryProgress, totalProcProgress } from "./functions";
import NotificationsIcon from '@mui/icons-material/Notifications';
import EngineeringIcon from '@mui/icons-material/Engineering';
import MediaCard from "./CardWork";


const useStyle = makeStyles({
    btn: {
        background: 'black',
        color: 'white',
    },
    root: {
        maxWidth: 245,
        marginLeft: '.2rem',
        border: '3px solid rgb(160, 7, 7)',
        borderRadius: 10,
        padding: 15,
    },
    media: {
        height: 140,
    },
    modal: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100 %',
        height: '100 %',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default function CardWork({
    id,
    name,
    description,
    progresses,
    news

}) {
    const [prog, setProg] = useState([]);
    const [total, settotal] = useState();
    const [Notifi, setNotif] = useState([]);
    const [modal, setModal] = useState(false);
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
        setNotif(news.length);
    }, [news]);


    const styles = useStyle()
    const dispatch = useDispatch()

    const deleteNews = (data) => {
        dispatch(deleteOneNews(data))
    }

    const stringCase = (param) => {
        return `${param}`.replace(/(^\w{1})|(\s+\w{1})/g, (letra) =>
            letra.toUpperCase()
        )
    }

    const modalNotifications = () => {
        setModal(true);
    }

    return (<>
        <Modal className={styles.modal} open={modal} onClose={() => setModal(false)}><Paper>
            <Grid container>
                <Grid item>
                    {news && news.length > 0 ? news.map((n,i) => (
                        <MediaCard key={i} id={n.id}></MediaCard>
                    )) : 'no hay notificaciones'}
                </Grid>
            </Grid>
            </Paper></Modal>
        <Grid item>
            <Card className={styles.root} key={id}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe">
                            <EngineeringIcon />
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings" onClick={modalNotifications}>
                            <Badge badgeContent={Notifi} color="primary">
                                <NotificationsIcon />
                            </Badge>

                        </IconButton>
                    }
                    title={`${name}`}
                    subheader={`${description}`}
                />
                <CardActionArea className="player-wrapper">

                    <CardContent>

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
                        <Paper style={{ maxHeight: 70, overflow: 'auto', padding:5 }}>
                            {total && <Progress
                                key={`totalcategoryas`}
                                value={total}
                                categorie={stringCase(
                                    `Total`
                                )}
                            />}
                        </Paper>



                    </CardContent>
                </CardActionArea>

            </Card>

        </Grid>
    </>
    )
}
