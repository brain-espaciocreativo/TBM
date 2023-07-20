import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { config } from '../../config/config.js';
import { get } from "../../redux/slices/newSlice.js";
import Progress from '../progress/Progress';
import NotificationsIcon from '@mui/icons-material/Notifications';

const stringCase = (param) => {
    return `${param}`.replace(/(^\w{1})|(\s+\w{1})/g, (letra) =>
        letra.toUpperCase()
    )
}

export default function MediaCard(props) {
    const [Notifi, setNotif] = useState();
    useEffect(() => {
        get(props.id).then((result) => {
            setNotif(result);
        })

    }, [props.id]);

    const theme = useTheme();

    return (
        <>
            {Notifi && <Card sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ width: '150px', display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <Typography component="div" variant="h6">
                            <IconButton aria-label="settings">
                                <NotificationsIcon />   {Notifi.id}
                            </IconButton>

                        </Typography>
                    </Box>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            {Notifi.name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {Notifi.description}
                        </Typography>
                    </CardContent>

                </Box>
                <video controls width="25%">
                    <source
                        src={`${config.apiURL}/${Notifi.video}`}
                        type="video/mp4"
                    />
                </video>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

                        {Notifi.progresses &&
                            Notifi.progresses.map((p, i) => {
                                return (
                                    <Progress
                                        key={`progressesOfNew${i}`}
                                        value={p.value}
                                        categorie={stringCase(
                                            `${p?.category.name}`
                                        )}
                                    />
                                )
                            })}

                    </Box>
                </Box>
            </Card>}
        </>

    );
}