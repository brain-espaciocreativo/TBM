import { Box, Button, Chip, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextareaAutosize, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getOneWork, updateOneWork} from "../../redux/slices/workSlice"
import NavDashboard2 from "../navDachboard2/NavDashboard2";
import NavDashboard from "../navDashboard/NavDashboard";
import { Add} from '@mui/icons-material';
import { getAllCategories } from "../../redux/slices/categoriesSlice";


export default function WorkEdit () {


  const createOneCategory =  (payload) => {
    axios.post('http://localhost:3000/categories', {name: payload})
   .then((res) => {
       console.log(res.data.data)
   })
   .catch(error => console.log(error));
}
    const dispatch = useDispatch();
    const work = useSelector(state => state.works.work);
    const categories = useSelector(state => state.categories.categories);


    const navigate = useNavigate();
    
    const [ createWorkState, setCreateWorkState ] = useState({
      name: "" ,
      description: "",
      
  });

  const [ ship, setShip] = useState([]);

  const [ selectedCategory, SetSelectedCategory] = useState({
    id: "",
    name: ""
  })

  const [ progress, setProgress] = useState({
    value: "",
    height_value: ""
  });

  const [ categoriaUnica , setCategoriaUnica] = useState({
    name:"name"
  })
  const handleCategoriaChip = (e) =>{
    setCategoriaChip(e.target.value)
  }
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
      dispatch(getAllCategories())
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

  // const handleSelectCategoria = (e) =>{
  //   console.log(e.target.value)
  //   SetSelectedCategory(e.target.value);
  //   console.log(selectedCategory)
  // }

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setProgress({
        ...progress,[name]:value
    });
  }
  const handleSelectCategoria = (e) =>{
    SetSelectedCategory(e.target.value);
    setCategoriaUnica(e.target.value.name)
    console.log(categoriaUnica);
  }
//   const handleAdd = () =>{
//     setShip(state => [...state, {category: selectedCategory, progress: progress}]);
//     console.log(ship)
//  }
const [ array , setArray] = useState([])
const [ categoriachip, setCategoriaChip] = useState(null)

const handleAdd = () =>{
  console.log(array);
  if(!array.includes(selectedCategory.name)){
    setShip(state => [...state, {category: selectedCategory, progress: progress }]);
  }else{
    console.log('no se puede agregar');
  }
  setArray([...array, selectedCategory.name])
  console.log(selectedCategory);
}

const handleCreateCategoria  = (e) =>{
  let array = []
  e.preventDefault();
  categories.map( (e) =>{
    array.push( e.name)
  })
  if(!array.includes(categoriachip)){
    createOneCategory(categoriachip)
    dispatch(getAllCategories())
  }else{
    console.log('no se creo');
    dispatch(getAllCategories())
  }
}

const handleChipDelete = (chipToDelete) =>{
  setShip((chips) => chips.filter((chip) => chip.category != chipToDelete))
  setArray((e) => e.filter( (array) => array !== chipToDelete ) )

}

  const theme = useTheme();

  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
        <NavDashboard/>
            <Grid container> 
            {
              !isMatch &&
              <Grid item xs={3} columns={1}>
                <NavDashboard2/>
              </Grid>
            }
                <Grid item xs={9} sx={{
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
                    <Box sx={{marginTop: '2rem'}}>
                      <Typography >
                        crea una nueva categoria...
                      </Typography>
                      <TextField 
                      value={categoriachip}
                      onChange={handleCategoriaChip}
                      label="Categoria"
                      name='name'
                      InputLabelProps={{
                          style:{
                              textTransform: "uppercase",
                              fontSize:".8rem"
                            }
                        }}
                      sx={{border:'none', 
                      boxShadow: '5px 5px 13px 2px rgba(0,0,0,0.39)',width:'400px'}} 
                      />
                        <Button sx={{marginTop: '.8rem',marginLeft:'.5rem',fontSize:'.7rem' , backgroundColor:'rgb(160, 7, 7) ', color:'#fff'}} onClick={handleCreateCategoria}>crear categoria</Button>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                      <FormControl fullWidth sx={{marginTop:'2rem'}} >
                      <InputLabel id="demo-simple-select-label">Categorias</InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        name="name"
                        value={selectedCategory}
                        onChange={handleSelectCategoria}
                        label="Categoria"
                        sx={{border:'none', 
                        boxShadow: '5px 5px 13px 2px rgba(0,0,0,0.39)'}} 
                      >
                      {
                        categories && categories.length ? 
                          categories.map((e, i)=>{
                            return <MenuItem key={i}value={{name: e.name, id: e.id}}>{e.name}</MenuItem>
                          }) : <MenuItem value='No hay caregorias'>No hay categorias</MenuItem>
                      }
                      </Select>
                      </FormControl>
                      <TextField  
                        onChange={handleChange}
                        value={progress.value}
                        label="% Avance"
                        name='value'
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
                      onChange={handleChange}
                      value={progress.height_value}
                      label="% Peso de la categoria"
                      name='height_value'
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
                      <Button sx={{fontSize:'.7rem' , backgroundColor:'rgb(160, 7, 7) ', color:'#fff'}} onClick={() => handleAdd(selectedCategory.name)}>crear</Button>
                      </Box>
                    </Box>
                    <Box sx={{width: '100%'}}>
                    <Stack direction="row" spacing={1}>
                      { ship && ship.length > 0 ? ship.map( (e, i) =>(
                        <Chip key={i} label={`${e.category.name} ${e.progress.value}% ${e.progress.height_value}%`} />
                      )) : <Typography sx={{color: '#636362', marginTop:'2rem'}}>No hay Categorias</Typography>}
                    </Stack>
                    </Box>
                    <p> categorias existentes</p>

                    <Stack direction="row" spacing={1}>
                      { work && typeof work === 'object'? work.progresses.map( (e, i) =>(
                        <Chip key={i} label={`${e.category.name} ${e.value}% ${e.height_value}%`}
                         onDelete={() => console.log('borrado')} 
                         />
                        // setShip(state => [...state, {category: e.category.name, progress: {value:e.value , height_value:e.height_value}}])
                      )) : <Typography sx={{color: '#636362', marginTop:'2rem'}}>No hay Categorias</Typography>
                      }
                    </Stack>




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