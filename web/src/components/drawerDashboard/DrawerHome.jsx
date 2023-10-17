import { useState} from 'react';
import { Drawer,
    IconButton,
    List,
    ListItemIcon,
    ListItemText,
    Box
    } from '@mui/material'
import Menu from '@mui/icons-material/Menu'
import { ListItem } from '@mui/material/';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './Draw.css'

export default function DrawerDashboard({links}) {

    const [ drawerOpen, setDrawerOpen ] = useState(false);
  
    const navigate = useNavigate()

    const handleClean = () =>{
        const logout = localStorage.removeItem('user');
        Swal.fire({
            title: '¿Estás seguro que quieres cerrar Sesiíon?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'si!'
          }).then((logout) => {
            if (logout.isConfirmed) {
              Swal.fire(
                'Sesión cerrada!'
              )
              navigate('/')
            }
          })
    }

    return (
    <div>
        <Drawer open={drawerOpen}
        onClose={()=>setDrawerOpen(false)}
        >
            <List component='nav'>
            <Link to='/home' className='btt'>
                  <ListItem button>
                      <ListItemIcon>
                          <HomeIcon className='icons' />
                      </ListItemIcon>
                      <ListItemText primary='Inicio' className='btns'/>
                  </ListItem>
              </Link>
              <Link to='#' className='btt'>
                <ListItem onClick={handleClean} button >
                    <ListItemIcon>
                        <LogoutIcon className='icons'/>
                    </ListItemIcon>
                    <ListItemText primary='Cerrar Sesión' className='btns'/>
                </ListItem>
              </Link>
            </List>
        </Drawer>
        <IconButton sx={{color: 'white', marginLeft: 'auto'}} onClick={()=>setDrawerOpen(!drawerOpen)}>
            <Menu />
        </IconButton>
    </div>
  )
}
