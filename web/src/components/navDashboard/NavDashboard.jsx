import React from 'react'
import { useNavigate } from 'react-router-dom';
import { AppBar, Button,Toolbar, Typography, Box, useTheme, useMediaQuery } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import DrawerDashboard from '../drawerDashboard/DrawerDashboard';
import './NavDashboard.css';

const useStyle = makeStyles(theme=>({
    offset: theme.mixins.toolbar,
    menuButton: {
        marginRight: theme.spacing(3)
    },
    title: {
        flexGrow: 1
    }
}));

export default function NavDashboard({links}) {

 

    const navigate = useNavigate()

    const handleClean = () =>{
        localStorage.removeItem('user');
        navigate('/')
    }


    const styles = useStyle();

    const theme = useTheme();

    const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div>
        <AppBar sx={{backgroundColor:'rgb(160, 7, 7)', height:'90px'}} >
            <Toolbar>
            TBM
                {
                    isMatch ? (
                    <>
                    <DrawerDashboard links={links}/>
                    </>
                ) : (
                    <>
                    <Button onClick={handleClean} sx={{marginLeft: 'auto', backgroundColor:'rgb(160, 7, 7)'}} className='button' variant='contained'>
                        Log out
                    </Button>
                    </>
                )}
            </Toolbar>
            
        </AppBar>
    </div>
  )
}
