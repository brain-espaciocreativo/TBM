import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextareaAutosize, TextField, Typography } from "@mui/material";
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
      description: ""
  });

    // const [ categoria, setCategoria] = useState(null);
    // const [ progreso, setProgreso] = useState(null);
    // const [ ship, setShip] = useState([]);

    // const handleSelectCategoria = (e) =>{
    //   setCategoria(e.target.value);
    // }

    // const handleProgreso = (e) =>{
    //   setProgreso(e.target.value)
    // }

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
                <Grid container spacing={2} sx={{display:'flex', flexDirection:'column', gap: '6', width: '50%'}}>
                <Typography sx={{fontSize:'1.5rem', color:'#333', margin: '1rem 0'}}>Actualizacion de Obras</Typography>
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
                      sx={{border:'none', 
                    boxShadow: '5px 5px 13px 2px rgba(0,0,0,0.39)'}}
                      />
                    <TextareaAutosize
                      value={createWorkState.description}
                      onChange={handleCreateWork}
                      name='description'
                      placeholder="Descripcion de la obra"
                      style={{ width: '100%', height:150, marginTop:'2rem', border:'none', 
                      boxShadow: '5px 5px 13px 2px rgba(0,0,0,0.39)'}}
                    />
                    {/* <FormControl fullWidth sx={{marginTop:'2rem'}} >
                    <InputLabel id="demo-simple-select-label">Categorias</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={categoria}
                        onChange={handleSelectCategoria}
                        label="Categoria"
                        sx={{border:'none', 
                  boxShadow: '5px 5px 13px 2px rgba(0,0,0,0.39)'}} 
                    >
                      <MenuItem value='Redes Cloacales'>Redes Cloacales</MenuItem>
                      <MenuItem value='Electricidad'>Electricidad</MenuItem>
                      <MenuItem value='Agua'>Agua</MenuItem>
                    </Select>
                    </FormControl>
                    <TextField  
                    onChange={handleProgreso}
                    value={progreso}
                    label="Progreso"
                    name='progress'
                    InputLabelProps={{
                                style:{
                                  textTransform: "uppercase",
                                  fontSize:".8rem",
                                }
                              }} 
                    sx={{marginTop:'2rem',border:'none', 
                    boxShadow: '5px 5px 13px 2px rgba(0,0,0,0.39)'}} 
                    /> */}
                  <Grid sx={{display:'flex', gap:'5rem'}} item xs={2}>
                      <Button 
                        sx={{
                          backgroundColor: 'rgb(160, 7, 7) ',
                        color: 'white',
                        padding: '10px 20px',
                        border:'1px solid rgb(160, 7, 7) ',
                        transition: '.5s',
                        }}
                        onClick={handleEdit}
                        >Editar</Button>
                      <Button color='error' onClick={()=>navigate('/work')} >Cancelar</Button>
                  </Grid>
                </Grid> 
                </Grid>
            </Grid>
          
        </>
    )
}