import React from "react";
import { Grid, useMediaQuery, useTheme} from '@mui/material/';
import NavDashboard2 from "../../components/navDachboard2/NavDashboard2";
import NavDashboard from "../../components/navDashboard/NavDashboard";
import WorkItem from "../../components/works/WorkItem";
import WorkForm from "../../components/works/WorkForm";

export default function WorkContainer() {
    
    const theme = useTheme();

    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    
    return (
        <div>
            <NavDashboard/>
            <Grid container>
            {
                !isMatch &&
                <Grid item xs={3} columns={1}>
                    <NavDashboard2/>
                </Grid>
            }
                <Grid item xs={9}
                    columns={2}
                    sx={{
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