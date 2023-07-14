import { Button, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { getAllNews } from '../../redux/slices/newSlice';
import { useDispatch, useSelector } from 'react-redux';
import CardNews from '../cardNews/CardNews';
import { Box } from '@mui/system';
import NewsUI from './NewsUI';

export default function WorkItem() {

    const dispatch = useDispatch();
    const news = useSelector(state => state.news.newList);

    useEffect(() => {
        dispatch(getAllNews());

    }, [dispatch]);

    return (
        <div>
            <Grid container>
                <Grid item>
                    <Grid item xs={12} columns={2}>
                        <Box p={5} sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '-5rem', width: '100%', marginLeft: '2rem' }}>
                            {news && news.length ? news.map((e) =>
                            (
                                <CardNews key={e.id} id={e.id} name={e.name} description={e.description} date={e.date} video={e.video} progresses={e.progresses} work={e.work}/>
                            )) : <NewsUI />
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}