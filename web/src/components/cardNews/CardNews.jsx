import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
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

export default function CardNews( { id, name, description, video, date } ) {

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
                          {date.substr(0,10)}
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
                            video?<ReactPlayer url={video} controls loop width='100%' height='100%'  />:""
                        }
                      
                    </CardActionArea>
                  </Card>
    </div>
  )
}
