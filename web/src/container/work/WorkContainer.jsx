import React from "react";
import { Grid} from '@mui/material/';
import NavDashboard2 from "../../components/navDachboard2/NavDashboard2";
import NavDashboard from "../../components/navDashboard/NavDashboard";
import WorkItem from "../../components/works/WorkItem";
import WorkForm from "../../components/works/WorkForm";

export default function WorkContainer() {
    
    
    return (
        <div>
            <NavDashboard/>
            <Grid container>
                <Grid item xs={2}>
                    <NavDashboard2 />
                </Grid>
                <Grid item xs={10} sx={{
                    width: '70%',
                    height: '80vh',
                    marginTop: '9rem',
                }} >
                    <WorkItem/>
                </Grid>
            </Grid>

        </div>
    )
}