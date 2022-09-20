import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getOneWork, updateOneWork} from "../../redux/slices/workSlice"
import NavDashboard2 from "../navDachboard2/NavDashboard2";
import NavDashboard from "../navDashboard/NavDashboard";


export default function WorkEdit () {
    const dispatch = useDispatch();
    const work = useSelector(state => state.works.work);

    const navigate = useNavigate();
    
    const [ createWorkState, setCreateWorkState ] = useState({
        name: "" ,
        progress: "",
        novedades: ""
    });

    const {id} = useParams();
    
    useEffect(()=>{
      dispatch(getOneWork(id))
    }, []);
            
    useEffect(() => {
      if(work){
        setCreateWorkState({
          ...work})
        }
    }, [work])

  const handleCreateWork = (e) => {
    const { name, value} = e.target;
    setCreateWorkState(state => ({...state, [name]: value}));
}

  const handleEdit = () =>{
      dispatch(updateOneWork(createWorkState))
      Swal.fire({
        title: 'Obra Actualizada!',
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
                  onClick={handleEdit}
                  >Editar Obra</Button>
                <Button color='error' onClick={()=>navigate('/work')} >Cancelar</Button>
              </Grid>
                      </Grid> 
                </Grid>
            </Grid>
          
        </>
    )
}