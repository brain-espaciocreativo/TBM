import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getOneWork } from "../../redux/slices/workSlice";
import NavDashboard2 from "../navDachboard2/NavDashboard2";
import NavDashboard from "../navDashboard/NavDashboard";



export default function WorkId () {

    const [data, setData] = useState({})
    const dispatch = useDispatch();
    const work = useSelector(state => state.works.work);

    const {id} = useParams();

useEffect(() => {
    dispatch(getOneWork(id))
}, [id, dispatch])

useEffect(() => {
    if(work){
        setData({
        name: work.name,
        progress: work.progress,
        novedades: work.novedades})
      }
  }, [work])

    return(
        <>
        <NavDashboard/>
        <Grid container>
                <Grid item xs={2}>
                    <NavDashboard2 />
                </Grid>
            <Grid item xs={10} columns={1} sx={{marginTop: '8rem'}}>
                <Typography>{data.name}</Typography>
                <Typography>{data.progress}</Typography>
                <Typography>{data.novedades}</Typography>
            </Grid>
        </Grid>
        </>
    )
}