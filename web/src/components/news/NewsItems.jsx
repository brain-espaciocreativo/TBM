import { Button, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { getAllNews } from '../../redux/slices/newSlice';
import { useDispatch, useSelector } from 'react-redux';
import CardNews from '../cardNews/CardNews';
import { Box } from '@mui/system';
import NewsUI from './NewsUI'


export default function WorkItem() {

    const dispatch = useDispatch();
    const news = useSelector(state => state.news.newList);
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(getAllNews());
      },[dispatch]);

    return(
        <div>
            <Grid container>
                <Grid item>
                    <Button 
                        sx={{
                        backgroundColor: 'rgb(160, 7, 7) ',
                        color: 'white',
                        padding: '13px',
                        border:'1px solid rgb(160, 7, 7) ',
                        transition: '.5s'
                        }}

                        onClick={(e, i) =>navigate("/admin/news/create")}
                        >Crear novedades
                    </Button>
                </Grid>
                <Grid item>
                    <Grid item xs={12} columns={2}>
                        <Box p={5} sx={{display: 'flex', flexWrap: 'wrap', gap: '2rem', marginBottom: '10rem'}}>
                        {news && news.length ? news.map((e) =>
                            ( 
                                <CardNews key={e.id} id={e.id} name={e.name} description={e.description} date={e.date} video={e.video} />
                            )) : <NewsUI/>
                        }
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}