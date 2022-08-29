import React from 'react'
import { AppBar, Button, Grid, IconButton, Tabs, Tab, Toolbar, Typography, Box, useTheme, useMediaQuery } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import DrawerDashboard from '../drawerDashboard/DrawerDashboard';
import AppleIcon from '@mui/icons-material/Apple';

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
    const styles = useStyle();
    const [value, setValue] = useState();

    const theme = useTheme();

    const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div>
        <AppBar>
            <Toolbar>
            <AppleIcon />
                {
                    isMatch ? (
                    <>
                    <Typography>
                        TBM
                    </Typography>
                    <DrawerDashboard links={links}/>
                    </>
                ) : (
                    <>
                    <Tabs
                    indicatorColor='secondary' 
                    textColor='inherit' 
                    value={value} 
                    onChange={(e,value)=>setValue(value)}
                    >
                    {links.map((link, index) => (
                        <Tab key={index} label={link} />
                    ))}
                    </Tabs>
                    <Button sx={{marginLeft: 'auto'}} variant='contained'>
                        Login
                    </Button>
                    <Button sx={{marginLeft: '10px'}} variant='contained'>
                        Log out
                    </Button>
                    </>
                )}
            </Toolbar>
            
        </AppBar>
    </div>
  )
}
