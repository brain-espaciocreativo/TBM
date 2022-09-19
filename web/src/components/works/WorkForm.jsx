import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";
import { createOneWork, getAllWorks} from "../../redux/slices/workSlice"
import NavDashboard2 from "../navDachboard2/NavDashboard2";
import NavDashboard from "../navDashboard/NavDashboard";
import { useNavigate } from "react-router-dom";

export default function WorkForm () {
  const dispatch = useDispatch();
  const works = useSelector(state => state.works.workList);

  const navigate = useNavigate();

  const [ loading, setLoading] = useState(false)
  const [ createWorkState, setCreateWorkState ] = useState({
    name: "" ,
    progress: "",
    novedades: ""
});

  useEffect(() => {
    dispatch(getAllWorks());
    setCreateWorkState('')
  }, [dispatch])


  const handleCreateWork = (e) => {
    const { name, value} = e.target;
    setCreateWorkState(state => ({...state, [name]: value}));
}

const createWork = async () => {
  await dispatch(createOneWork(createWorkState));
  Swal.fire({
    title: 'Obra creada!',
  })
 navigate('/work')
}
return (
        <>
       
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
                <Grid container spacing={2}>
                <Grid item  xs={2}>
                  <TextField  
                  onChange={handleCreateWork}
                  value={createWorkState.name}
                  label="Nombre"
                  name='name'
                  InputLabelProps={{
                      style:{
                          textTransform: "uppercase",
                          fontSize:".8rem"
                        }
                    }} 
                    />
                </Grid>
                <Grid item xs={2}>
                  <TextField  
                  onChange={handleCreateWork}
                  value={createWorkState.progress}
                  label="Progress"
                  name='progress'
                  InputLabelProps={{
                              style:{
                                textTransform: "uppercase",
                                fontSize:".8rem",
                              }
                            }} 
                  />
                  </Grid>
                  <Grid item xs={2}>
                  <TextField  
                  onChange={handleCreateWork}
                  value={createWorkState.novedades}
                  label="Novedades"
                  name='novedades'
                  InputLabelProps={{
                              style:{
                                textTransform: "uppercase",
                                fontSize:".8rem"
                              }
                            }} 
                  />
                  </Grid>
                  <Grid  item xs={2}>
                    <Button 
                      sx={{
                        backgroundColor: 'rgb(160, 7, 7) ',
                        color: 'white',
                        padding: '13px',
                        border:'1px solid rgb(160, 7, 7) ',
                        transition: '.5s'
                      }}
                      onClick={createWork}
                      >Crear Obra</Button>
                  </Grid>
                  </Grid> 
                </Grid>
            </Grid>
          
        </>
    )
}