import React from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function Progress( props ) {

  return (
    <>
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
    <Typography sx={{marginRight: 2}}>{props.categorie}</Typography>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" value={props.value} style={{height: 15, borderRadius: 10}}/>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
    </>
  )
}
