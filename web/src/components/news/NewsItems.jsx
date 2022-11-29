import { Button, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { getAllNews } from '../../redux/slices/newSlice';
import { useDispatch, useSelector } from 'react-redux';
import CardNews from '../cardNews/CardNews';
import { Box } from '@mui/system';
import NewsUI from './NewsUI'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component';


export default function WorkItem() {

    const dispatch = useDispatch();
    const news = useSelector(state => state.news.newList);
    const navigate = useNavigate();

    const [ newsData, setNewsData ] = useState([])
    const [ currentPage , setCurrentPage ] = useState(0)

    const getNewsPage = () =>{
        axios.get(`http://localhost:3000/news?page=${currentPage}&size=10`)
        .then( (res) =>{
          setNewsData([...newsData,...res.data.result])
        })
        .catch( (err) =>{
          console.log(err)
        })
      }
    
      useEffect( () =>{
        getNewsPage()
      },[currentPage]) 

      const moreItems = () =>{
        setCurrentPage(currentPage + 1)
      }

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
                        transition: '.5s',
                        marginLeft: '2rem'
                        }}

                        onClick={(e, i) =>navigate("/admin/news/create")}
                        >Crear novedades
                    </Button>
                </Grid>
                <Grid item>
                    <Grid item xs={12} columns={2}>
                    <InfiniteScroll dataLength={newsData.length} hasMore={true} next={moreItems}>
                        <Box p={5} sx={{display: 'flex', flexWrap: 'wrap', gap: '2rem', marginBottom: '10rem'}}>
                        {newsData && newsData.length ? newsData.map((e) =>
                            (
                                    <CardNews key={e.id} id={e.id} name={e.name} description={e.description} date={e.date} video={e.video} />
                            )) : <NewsUI/>
                        }
                        </Box>
                    </InfiniteScroll>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}