import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material/';
import PersonIcon from '@mui/icons-material/Person';
import BarChartIcon from '@mui/icons-material/BarChart';

export default function ListDashboard() {
  return (
    <div>
        <List component='nav'>
            <ListItem button>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary='Estadisticas' />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary='Usuarios' />
            </ListItem>
            <Divider />
        </List>
    </div>
  )
}
