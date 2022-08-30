import React from 'react'
import { AppBar, Button, Toolbar, Typography, useTheme, useMediaQuery } from '@mui/material/';
import { makeStyles } from '@mui/styles';
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
            <Typography>TBM</Typography>
                {
                    isMatch ? (
                    <>
                    <DrawerDashboard links={links}/>
                    </>
                ) : (
                    <>
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
