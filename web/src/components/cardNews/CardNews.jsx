import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import React from 'react'
import ReactPlayer from 'react-player';

const useStyle = makeStyles({
    btn: {
      background: 'black',
      color: 'white'
    },
    root:{
      maxWidth:345,
      marginTop:'10rem'    
    },
    media:{
      height:140
    },
    progress:{
      paddingTop:'50px'
    }
  });

export default function CardNews( { id, name, description, video } ) {

  const styles = useStyle();






    
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
                              <source src={`${video}`} type='video/mp4'/>
                             </video>
                        }
                    </CardActionArea>
                  </Card>
    </div>
  )
}
