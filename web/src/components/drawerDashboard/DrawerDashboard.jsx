import { useState} from 'react';
import { Drawer,
    IconButton,
    List,
    ListItemIcon,
    ListItemText,
    } from '@mui/material'
import { useState } from 'react'
import Menu from '@mui/icons-material/Menu'
import { Divider, ListItem } from '@mui/material/';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import { useEffect } from 'react';

export default function DrawerDashboard({links}) {

    const [ drawerOpen, setDrawerOpen ] = useState(false);
  
    return (
    <div>
        <Drawer open={drawerOpen}
        onClose={()=>setDrawerOpen(false)}
        >
            <List component='nav'>
            <ListItem button>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary='Home' />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary='Usuarios' />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <HomeWorkIcon />
                </ListItemIcon>
                <ListItemText primary='Obras' />
            </ListItem>
            <Divider />
            <ListItem button>
                <ListItemIcon>
                    <LoginIcon />
                </ListItemIcon>
                <ListItemText primary='Login' />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary='Log out' />
            </ListItem>
            </List>
        </Drawer>
        <IconButton sx={{color: 'white', marginLeft: 'auto'}} onClick={()=>setDrawerOpen(!drawerOpen)}>
            <Menu />
        </IconButton>
    </div>
  )
}
