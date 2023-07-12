import { Button, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import React, {useEffect} from 'react'
import ReactPlayer from 'react-player';
import { useDispatch } from 'react-redux';
import { deleteOneNews } from '../../redux/slices/newSlice';
import {config} from '../../config/config.js';


const useStyle = makeStyles({
    btn: {
      background: 'black',
      color: 'white'
    },
    root:{
      maxWidth:245,
      marginTop:'10rem',
      marginLeft: '.2rem',
      border:'3px solid rgb(160, 7, 7)',
      borderRadius: 10,
      padding:15
    },
    media:{
      height:140
    }
  });

export default function CardNews( { id, name, description, video } ) {

  const styles = useStyle();
  const dispatch = useDispatch();
  

  const deleteNews = (data)=>{
    console.log(data);
    dispatch(deleteOneNews(data))
  }

    
  return (
    <div>
        <Card className={styles.root} key={id}>
                    <CardActionArea className='player-wrapper' >
                      <CardContent>
                        <Typography 
                        gutterBottom variant="h6" 
                        component="h6"
                        sx={{
                          color: '#000',
                          fontWeight: '600',
                          display: 'flex',
                          justifyContent: 'end'
                        }}
                        >
                          {name}
                        </Typography>
                        <Typography variant='body2' color="textSecondary" component="p">
                          {description}
                        </Typography>
                      </CardContent>
                      <Typography 
                        gutterBottom variant="h6" 
                        component="h6"
                        sx={{
                          color: '#000',
                          fontWeight: '600',
                          display: 'flex',
                          justifyContent: 'end'
                        }}
                        >
                        </Typography>
                        {
                            video &&
                             <video controls width='100%'>
                              <source src={`${config.apiURL}/${video}`} type='video/mp4'/>
                             </video>
                        }
                        <Button 
                          onClick={()=>deleteNews(id)}
                          sx={{marginTop: '.8rem',marginLeft:'.5rem',fontSize:'.7rem' , backgroundColor:'rgb(160, 7, 7) ', color:'#fff'}}
                        >
                          Borrar Novedad
                        </Button>
                    </CardActionArea>
                  </Card>
    </div>
  )
}
