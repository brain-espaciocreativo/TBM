import { Grid } from '@mui/material';
import React from 'react'
import { useState } from 'react'
import NavDashboard2 from '../../components/navDachboard2/NavDashboard2'
import NavDashboard from '../../components/navDashboard/NavDashboard'
import Dashboard from '../dashboard/Dashboard';
import WorkContainer from '../work/WorkContainer';

export default function ContainerViews() {

    const [ menuState, setMenuState] = useState('works');

    const change = (data)=>{
        setMenuState(data)
    }

  return (
    <>
    <Grid container>
    <Grid item xs={3} columns={1}>
    <NavDashboard2 change={change}/>
    </Grid>
    <NavDashboard />
    <Grid item xs={9} columns={2}>
    {
        menuState == 'home' ? <Dashboard /> : ""
    }
    {
        menuState == 'works' ? <WorkContainer /> : ""
    }
    </Grid>
    </Grid>
    </>
  )
}
