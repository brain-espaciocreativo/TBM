import { Box, Button, Chip, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextareaAutosize, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";
import { createOneWork, getAllWorks} from "../../redux/slices/workSlice"
import NavDashboard2 from "../navDachboard2/NavDashboard2";
import NavDashboard from "../navDashboard/NavDashboard";
import { useNavigate } from "react-router-dom";
import { Add} from '@mui/icons-material';
import { getAllCategories } from "../../redux/slices/categoriesSlice";



export default function WorkForm () {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.categories);

  const navigate = useNavigate();

  const [ createWorkState, setCreateWorkState ] = useState({
    name: "" ,
    description: ""
  });

  const [ categoria, setCategoria] = useState("");
  const [ progreso, setProgreso] = useState("");
  const [ ship, setShip] = useState([]);

  const handleSelectCategoria = (e) =>{
    setCategoria(e.target.value);
  }

  const handleProgreso = (e) =>{
    setProgreso(e.target.value)
  }

  const handleAdd = () =>{
     setShip(state => [...state, {categoria:categoria,progreso: progreso}]) 
  }

  const handleChipDelete = () =>{
   console.log('se borró');
  }

  useEffect(() => {
    dispatch(getAllCategories())
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
                <Grid container spacing={2} sx={{display:'flex', flexDirection:'column', gap: '6', width: '50%'}} >
                    <Typography sx={{fontSize:'1.5rem', color:'#333', margin: '1rem 0'}}>Creacion de Obras</Typography>
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
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                      <FormControl fullWidth sx={{marginTop:'2rem'}} >
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
                      {
                        categories && categories.length ? 
                          categories.map(e=>{
                            return <MenuItem value={e.name}>{e.name}</MenuItem>
                          }) : <MenuItem value='No hay caregorias'>No hay categorias</MenuItem>
                      }
                      </Select>
                      </FormControl>
                      <TextField  
                        onChange={handleProgreso}
                        value={progreso}
                        label="% Avance"
                        name='progress'
                        InputLabelProps={{
                                    style:{
                                      textTransform: "uppercase",
                                      fontSize:".8rem",
                                    }
                                  }} 
                        sx={{marginTop:'2rem',border:'none', 
                        boxShadow: '5px 5px 13px 2px rgba(0,0,0,0.39)'}} 
                        />
                      <TextField  
                      // onChange={handleProgreso}
                      // value={progreso}
                      label="% Peso de la categoria"
                      name='peso'
                      InputLabelProps={{
                                  style:{
                                    textTransform: "uppercase",
                                    fontSize:".8rem",
                                  }
                                }} 
                      sx={{marginTop:'2rem',border:'none', 
                      boxShadow: '5px 5px 13px 2px rgba(0,0,0,0.39)'}} 
                      />
                      <Box sx={{marginTop:'2rem'}}>
                        <Add onClick={handleAdd}/>
                      </Box>
                    </Box>
                    <Stack direction="row" spacing={1}>
                      { ship && ship.length > 0 ? ship.map( (e, i) =>(
                        <Chip key={i} label={`${e.categoria} ${e.progreso}%`} onDelete={handleChipDelete}/>
                      )) : <Typography sx={{color: '#636362', marginTop:'2rem'}}>No hay Categorias</Typography>}
                    </Stack>
                    <Grid  item xs={2}>
                      <Button 
                        sx={{
                          backgroundColor: 'rgb(160, 7, 7) ',
                          color: 'white',
                          padding: '10px',
                          border:'1px solid rgb(160, 7, 7) ',
                          transition: '.5s',
                          width:'200px'
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