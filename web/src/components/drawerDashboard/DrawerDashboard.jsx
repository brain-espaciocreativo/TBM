import React from 'react'
import { Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    } from '@mui/material'
import { useState } from 'react'
import Menu from '@mui/icons-material/Menu'

export default function DrawerDashboard({links}) {

    const [ drawerOpen, setDrawerOpen ] = useState(false);
  
    return (
    <div>
        <Drawer open={drawerOpen}
        onClose={()=>setDrawerOpen(false)}
        >
            <List>
                {
                    links.map((page, index) => (
                        <ListItemButton key={index}>
                            <ListItemIcon>
                                <ListItemText>{page}</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                    ) 
                    )
                }
            </List>
        </Drawer>
        <IconButton sx={{color: 'white', marginLeft: 'auto'}} onClick={()=>setDrawerOpen(!drawerOpen)}>
            <Menu />
        </IconButton>
    </div>
  )
}
