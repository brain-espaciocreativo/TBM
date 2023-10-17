import { Box, Button, Chip, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextareaAutosize, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";
import { createOneWork, getAllWorks } from "../../redux/slices/workSlice"
import NavDashboard2 from "../navDachboard2/NavDashboard2";
import NavDashboard from "../navDashboard/NavDashboard";
import { useNavigate } from "react-router-dom";
import { createOneCategory, deleteOneCategory, getAllCategories, } from "../../redux/slices/categoriesSlice";
import { getAllUsers } from "../../redux/slices/userSlice";

export default function WorkForm() {

  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.categories);
  const user = useSelector(state => state.users.list);
  const work = useSelector(state => state.works.workList);

  const navigate = useNavigate();

  const [arrayObras, setArrayObras] = useState([])
  const [number, setNumbre] = useState(0)

  if (work && number < 1) {
    work.map((e) => {
      setArrayObras(state => [...state, e.name]);
    })
    setNumbre(number + 1)
  }


  const [createWorkState, setCreateWorkState] = useState({
    name: "",
    description: ""
  });

  const [selectedCategory, SetSelectedCategory] = useState({
    id: "",
    name: ""
  })

  const [selectUser, setSelectUser] = useState("")

  const [categoriachip, setCategoriaChip] = useState(null)

  const [progress, setProgress] = useState({
    value: "",
    weight: ""
  });
  const [ship, setShip] = useState([]);

  const [shipUsers, setShipUsers] = useState([])


  const [categoriaUnica, setCategoriaUnica] = useState({
    name: "name"
  })

  const [stateHeigthValues, setStateHeigthValues] = useState(0)

  const handleSelectCategoria = (e) => {
    SetSelectedCategory(e.target.value);
    setCategoriaUnica(e.target.value.name)
  }


  const handleselectUser = (e) => {
    setSelectUser(e.target.value)
  }

  const deleteCategoria = (name) => {
    Swal.fire({
      title: `¿Estás seguro que quieres borrar la categoria ${name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si!'
    }).then((borrado) => {
      if (borrado.isConfirmed) {
        dispatch(deleteOneCategory(name))
        Swal.fire(
          'categoria borrada!'
        )
      }
    })
  }

  const handleCategoriaChip = (e) => {
    setCategoriaChip(e.target.value)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProgress({
      ...progress, [name]: value
    });
  }

  const [array, setArray] = useState([])


  const handleAdd = () => {
    if (selectedCategory.name === "") {
      return Swal.fire({ title: 'llene los campos para añadir categoria' })
    }

    if (progress.value === "") {
      return Swal.fire({ title: 'llene el avance de la categoria' })
    } else if (progress.weight === "") {
      return Swal.fire({ title: 'llene el peso de la categoria' })
    }

    if (!array.includes(selectedCategory)) {
      setShip(state => [...state, { categoryId: selectedCategory.id, category: selectedCategory.name, value: progress.value, weight: progress.weight }]);
    } else {
      Swal.fire({ title: 'categoria ya está añadida' })
    }

    setArray([...array, selectedCategory])
  }

  const handleChipDelete = (chipToDelete) => {
    setShip((chips) => chips.filter((chip) => chip.category != chipToDelete))
    setArray((e) => e.filter((array) => array !== chipToDelete))
  }

  const handleCreateCategoria = (e) => {
    let array = []
    e.preventDefault();
    if (categoriachip == null || categoriachip === '') {
      return Swal.fire({ title: 'llene el campo para crear categoria' })
    }
    categories.map((e) => {
      array.push(e.name)
      Swal.fire({ title: 'categoria creada' })
    })
    if (!array.includes(categoriachip)) {
      dispatch(createOneCategory(categoriachip.trim().toLowerCase()))
      createOneCategory(categoriachip)
      dispatch(getAllCategories())
    } else {
      Swal.fire({ title: 'categoria ya existente' })
      dispatch(getAllCategories())
    }
    dispatch(getAllCategories())
  }

  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(getAllUsers())
    dispatch(getAllWorks())
    setCreateWorkState('')
  }, [dispatch]);


  const handleCreateWork = (e) => {
    const { name, value } = e.target;
    setCreateWorkState(state => ({ ...state, [name]: value }));
  }

  const handleCreateDescription = (e) => {
    const { name, value } = e.target;
    setCreateWorkState(state => ({ ...state, [name]: value }));
  }

  const createWork = async () => {

    if (arrayObras.includes(createWorkState.name)) {
      return Swal.fire({
        title: `la obra ${createWorkState.name} ya existe`,
      })
    }

    if (createWorkState) {
      await dispatch(createOneWork({ work: createWorkState, ships: ship, shipUsers: shipUsers }));
      Swal.fire({
        title: 'Obra creada!',
      })
      navigate('/work');
    } else {
      return Swal.fire({ title: 'Llene los campos para crear una obra' })
    }

  }


  const handleAddChipUser = () => {
    if (selectUser === '') {
      return Swal.fire({
        title: `Debe selecionar un usuario`,
      })
    } else {
      if (shipUsers.includes(selectUser)) {
        return Swal.fire({
          title: `el usuario  ${selectUser.name} ya existe`,
        })
      } else {
        setShipUsers(state => [...state, selectUser]);
      }

    }
  }

  const handleChipDeleteUser = (chipToDelete) => {
    setShipUsers((chips) => chips.filter((chip) => chip.email != chipToDelete))
  }


  const theme = useTheme();

  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>

      <NavDashboard />
      <Grid container>
        {
          !isMatch &&
          <Grid item xs={3} columns={1}>
            <NavDashboard2 />
          </Grid>
        }
        <Grid item xs={7} columns={1} sx={{
          height: '80vh',
          marginTop: '7rem',
          marginLeft: '5rem',

        }} >
          <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', gap: '1', width: '100%' }} >
            <Typography sx={{ fontSize: '1.5rem', color: '#333', margin: '1rem 0' }}>Creacion de Obras</Typography>
            <TextField
              onChange={handleCreateWork}
              value={createWorkState.name}
              label="Nombre"
              name='name'
              InputLabelProps={{
                style: {
                  textTransform: "uppercase",
                  fontSize: ".8rem"
                }
              }}
              sx={{
                width: '100%',
                boxShadow: '5px 5px 13px 2px rgba(0,0,0,0.39)', border: '3px solid rgb(160, 7, 7)', borderRadius: 2
              }}
            />
            <TextareaAutosize
              value={createWorkState.description}
              onChange={handleCreateDescription}
              name='description'
              placeholder="Descripcion de la obra"
              style={{
                width: '100%', height: 150, marginTop: '2rem',
                boxShadow: '5px 5px 13px 2px rgba(0,0,0,0.39)', border: '3px solid rgb(160, 7, 7)', borderRadius: 2
              }}
            />

            <Box sx={{ marginTop: '2rem' }}>
              <Typography sx={{ color: 'rgb(160, 7, 7) ' }} >
                crea una nueva categoria...
              </Typography>
              <TextField
                value={categoriachip}
                onChange={handleCategoriaChip}
                label="Categoria"
                name='name'
                InputLabelProps={{
                  style: {
                    textTransform: "uppercase",
                    fontSize: ".8rem"
                  }
                }}
                sx={{
                  boxShadow: '5px 5px 13px 2px rgba(0,0,0,0.39)', width: '100%', border: '3px solid rgb(160, 7, 7)', borderRadius: 2
                }}
              />
              <Button sx={{ marginTop: '.8rem', marginLeft: '.5rem', fontSize: '.7rem', backgroundColor: 'rgb(160, 7, 7) ', color: '#fff' }} onClick={handleCreateCategoria}>crear categoria</Button>
            </Box>
            <Typography sx={{ marginTop: '1.2rem', color: 'rgb(160, 7, 7) ' }}>
              asignar categoria...
            </Typography>

            <Box sx={{ width: 320, display: 'flex', gap: '1rem', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

              <Box sx={{ width: '100%', display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
                <FormControl sx={{ marginTop: '1rem' }} >
                  <InputLabel id="demo-simple-select-label"></InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    name="name"
                    value={selectedCategory}
                    onChange={handleSelectCategoria}
                    label="Categoria"
                    sx={{
                      boxShadow: '5px 5px 13px 2px rgba(0,0,0,0.39)', width: '100%', border: '3px solid rgb(160, 7, 7)', borderRadius: 2
                    }}
                  >
                    {
                      categories && categories.length ?
                        categories.map((e, i) => {
                          return <MenuItem key={i} value={e}>{e.name} <Button onClick={() => deleteCategoria(e.name)}>X</Button></MenuItem>
                        }) : <MenuItem value='No hay caregorias'>No hay categorias</MenuItem>
                    }
                  </Select>
                </FormControl>
                <TextField
                  type='number'
                  InputProps={{ inputProps: { min: 10, max: 100, step: 5 } }}
                  onChange={handleChange}
                  value={progress.value}
                  label="% Avance"
                  name='value'
                  InputLabelProps={{
                    style: {
                      textTransform: "uppercase",
                      fontSize: ".8rem",
                    }
                  }}
                  sx={{
                    marginTop: '2rem',
                    boxShadow: '5px 5px 13px 2px rgba(0,0,0,0.39)', border: '3px solid rgb(160, 7, 7)', borderRadius: 2
                  }}
                />
                <TextField
                  type='number'
                  onChange={handleChange}
                  value={progress.weight}
                  label="% Peso de la categoria"
                  name='weight'
                  InputLabelProps={{
                    style: {
                      textTransform: "uppercase",
                      fontSize: ".8rem",
                    }
                  }}
                  InputProps={{ inputProps: { min: 10, max: 100, step: 5 } }}
                  sx={{
                    marginTop: '2rem',
                    boxShadow: '5px 5px 13px 2px rgba(0,0,0,0.39)', border: '3px solid rgb(160, 7, 7)', borderRadius: 2
                  }}
                />
              </Box>

              <Box sx={{ marginLeft: '-17rem' }}>
                <Button sx={{ marginTop: '.8rem', marginLeft: '.5rem', fontSize: '.7rem', backgroundColor: 'rgb(160, 7, 7) ', color: '#fff' }} onClick={() => handleAdd(selectedCategory.name)}>crear</Button>
              </Box>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Stack direction="row" spacing={1}>
                {ship && ship.length > 0 ? ship.map((e, i) => (
                  <Chip key={i} label={` ${e.category} ${e.value}% ${e.weight}%`} onDelete={() => handleChipDelete(`${e.category}`)} />
                )) : <Typography sx={{ color: '#636362', marginTop: '2rem' }}>No hay Categorias</Typography>}
              </Stack>
            </Box>
            <FormControl sx={{ marginTop: '2rem' }} >
              <InputLabel id="demo-simple-select-label">usuarios</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                name="name"
                value={selectUser}
                onChange={handleselectUser}
                label="Usuarios"
                sx={{
                  boxShadow: '5px 5px 13px 2px rgba(0,0,0,0.39)', border: '3px solid rgb(160, 7, 7)', borderRadius: 2
                }}
              >
                {
                  user && user.length ?
                    user.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e.email}</MenuItem>
                    }) : <MenuItem value='No hay usuarios'>No hay Usuarios</MenuItem>
                }
              </Select>
              <Button onClick={handleAddChipUser}>Agregar usuario</Button>
            </FormControl>

            <Stack direction="row" spacing={1}>
              {shipUsers && shipUsers.length > 0 ? shipUsers.map((e, i) => (
                <Chip key={i} label={`${e.email}`} onDelete={() => handleChipDeleteUser(`${e.email}`)} />
              )) : <Typography sx={{ color: '#636362', marginTop: '2rem' }}>No hay Usuarios</Typography>}
            </Stack>

            <Grid item xs={2}>
              <Button
                sx={{
                  backgroundColor: 'rgb(160, 7, 7) ',
                  color: 'white',
                  padding: '10px',
                  border: '1px solid rgb(160, 7, 7) ',
                  transition: '.5s',
                  width: '200px'
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