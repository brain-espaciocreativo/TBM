import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useEffect } from 'react'
import ReactPlayer from 'react-player'
import { useDispatch } from 'react-redux'
import { deleteOneNews } from '../../redux/slices/newSlice'
import { categoriesSlide } from '../../redux/slices/categoriesSlice'
import { config } from '../../config/config.js'
import Progress from '../progress/Progress'

const useStyle = makeStyles({
    btn: {
        background: 'black',
        color: 'white',
    },
    root: {
        maxWidth: 245,
        marginTop: '10rem',
        marginLeft: '.2rem',
        border: '3px solid rgb(160, 7, 7)',
        borderRadius: 10,
        padding: 15,
    },
    media: {
        height: 140,
    },
})

export default function CardNews({
    id,
    name,
    description,
    video,
    progresses,
    work,
}) {
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

    return (
        <div>
            <Card className={styles.root} key={id}>
                <CardActionArea className="player-wrapper">
                    <CardContent>
                        <Typography variant="h6">{`${work.name}`}</Typography>
                        <Typography
                            gutterBottom
                            variant="h6"
                            component="h6"
                            sx={{
                                color: '#000',
                                fontWeight: '600',
                                display: 'flex',
                                justifyContent: 'end',
                            }}
                        >
                            {stringCase(`${name}`)}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            {description}
                        </Typography>

                        <Typography
                            gutterBottom
                            variant="h6"
                            component="h6"
                            sx={{
                                color: '#000',
                                fontWeight: '600',
                                display: 'flex',
                                justifyContent: 'end',
                            }}
                        ></Typography>
                        {video && (
                            <video controls width="100%">
                                <source
                                    src={`${config.apiURL}/${video}`}
                                    type="video/mp4"
                                />
                            </video>
                        )}
                        {progresses &&
                            progresses.map((prog, i) => {
                                return (
                                    <Progress
                                        key={i}
                                        value={prog.value}
                                        categorie={stringCase(
                                            `${prog.category.name}`
                                        )}
                                    />
                                )
                            })}
                    </CardContent>
                </CardActionArea>
                <Button
                    onClick={() => deleteNews(id)}
                    sx={{
                        marginTop: '.8rem',
                        // marginLeft: '.5rem',
                        fontSize: '.7rem',
                        backgroundColor: 'rgb(160, 7, 7) ',
                        color: '#fff',
                    }}
                >
                    Borrar Novedad
                </Button>
            </Card>
        </div>
    )
}
