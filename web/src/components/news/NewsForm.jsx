import { Grid, TextareaAutosize, TextField, Typography, useTheme, useMediaQuery, Select, MenuItem, Box, FormControl, Button, Stack, InputLabel, Chip } from "@mui/material";
import NavDashboard2 from "../navDachboard2/NavDashboard2";
import NavDashboard from "../navDashboard/NavDashboard";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAllWorks } from "../../redux/slices/workSlice";
import { getAllCategories } from "../../redux/slices/categoriesSlice";
import './NewsStyle.css'

export default function NewsForm() {

  const dispatch = useDispatch();
  const works = useSelector(state => state.works.workList);
  const categories = useSelector(state => state.categories.categories);
  const navigate = useNavigate();
  const [ship, setShip] = useState([]);

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  const [selectWork, setSelectWork] = useState("");
  const [progress, setProgress] = useState({
    value: "",
    weight: ""
  });

  const [data, setData] = useState({
    name: '',
    description: '',
    video: '',
    workId: selectWork
  });

  const [array, setArray] = useState([])

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCategory, SetSelectedCategory] = useState({
    id: "",
    name: ""
  })

  const [categoriachip, setCategoriaChip] = useState(null);

  const [categoriaUnica, setCategoriaUnica] = useState({
    name: "name"
  })

  useEffect(() => {
    dispatch(getAllWorks());
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    setData(state => ({ ...state, workId: selectWork }))
  }, [selectWork])


  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, description, workId } = data;

    if (!description || !name) {
      return Swal.fire({ title: 'los campos deben estar llenos' })
    }



    const formData = new FormData();
    formData.append("video", selectedFile);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("workId", workId);
    formData.append("progresses", JSON.stringify(ship));

    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_URL}/news`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        Swal.fire({ title: 'Novedad creada!' })
      })
      navigate('/admin')
    } catch (error) {
      Swal.fire({ title: 'Ocurrio un error al intentar crear la novedad' })
    }
  }

  const handleselectWork = (e) => {
    setSelectWork(e.target.value);
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleSelectCategoria = (e) => {
    SetSelectedCategory(e.target.value);
    setCategoriaUnica(e.target.value.name)
  }

  const handleCreateName = (e) => {
    const { name, value } = e.target;
    setData(state => ({ ...state, [name]: value }));
  }

  const handleCreateDescription = (e) => {
    const { name, value } = e.target;
    setData(state => ({ ...state, [name]: value }));
  }

  const handleAdd = () => {
    if (selectedCategory.name === "") {
      return Swal.fire({ title: 'llene los campos para añadir categoria' })
    }

    if (progress.value === "") {
      return Swal.fire({ title: 'llene el avance de la categoria' })
    }

    if (!array.includes(selectedCategory)) {
      setShip(state => [...state, { categoryId: selectedCategory.id, category: selectedCategory.name, value: progress.value, weight: progress.weight }]);
    } else {
      Swal.fire({ title: 'categoria ya está añadida' })
    }

    setArray([...array, selectedCategory])
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProgress({
      ...progress, [name]: value
    });
  }

  const handleChipDelete = (chipToDelete) => {
    setShip((chips) => chips.filter((chip) => chip.category != chipToDelete))
    setArray((e) => e.filter((array) => array !== chipToDelete))
  }

  return (
    <>
      <NavDashboard />
      <Grid container>
        {
          !isMatch &&
          <Grid item md={3} columns={1}>
            <NavDashboard2 />
          </Grid>
        }
        <Grid item xs={12} md={9} columns={2}>
          <Grid item xs={12} md={9} sx={{
            width: '70%',
            height: '80vh',
            marginTop: '9rem',
            marginLeft: '9rem'
          }} >
            <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', gap: '6', width: '50%' }} >
              <Typography sx={{ fontSize: '1.5rem', color: '#333', margin: '1rem 0' }}>Creacion de Novedades</Typography>
              <form onSubmit={(e) => handleSubmit(e)} id='formulario' encType="multipart/form-data" noValidate>
                <Grid container>
                  <Grid sm={12}>
                    <TextField
                      placeholder="Nombre"
                      type="text"
                      name="name"
                      value={data.name}
                      onChange={handleCreateName}
                      sx={{
                        marginTop: '2rem',
                        boxShadow: '5px 5px 13px 2px rgba(0,0,0,0.39)', border: '3px solid rgb(160, 7, 7)', borderRadius: 2
                      }}
                    />
                  </Grid>
                  <Grid sm={12}>
                    <TextareaAutosize
                      className="description"
                      placeholder="Descripción"
                      type="text"
                      name="description"
                      value={data.description}
                      onChange={handleCreateDescription}
                      sx={{
                        marginTop: '2rem',
                        boxShadow: '5px 5px 13px 2px rgba(0,0,0,0.39)', border: '3px solid rgb(160, 7, 7)', borderRadius: 2
                      }}
                    />
                  </Grid>
                  <Grid sm={12}>
                    <TextField type="file" name="video" accept="video/mp4" onChange={handleFileSelect} sx={{
                      marginTop: '2rem',
                      boxShadow: '5px 5px 13px 2px rgba(0,0,0,0.39)', border: '3px solid rgb(160, 7, 7)', borderRadius: 2
                    }} />
                  </Grid>
                  <Grid sm={12}>
                    <Typography sx={{
                      marginTop: '2rem',

                    }}>
                      Selecciona una Obra
                    </Typography>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      name="name"
                      value={selectWork}
                      onChange={handleselectWork}
                      label="Obras"
                      sx={{
                        marginTop: '1rem',
                        marginBlockStart: '5',
                        boxShadow: '5px 5px 13px 2px rgba(0,0,0,0.39)', border: '3px solid rgb(160, 7, 7)', borderRadius: 2
                      }}
                    >
                      {
                        works && works.length ?
                          works.map((e) => {
                            return <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>
                          }) : <MenuItem value='No hay Obras'>No hay Obras</MenuItem>
                      }
                    </Select>
                  </Grid>

                  <Grid > <FormControl sx={{ marginTop: '1rem' }} >
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
                  </FormControl></Grid>
                  <Grid>
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

                        }
                      }}
                      sx={{
                        marginTop: '1rem',
                        boxShadow: '5px 5px 13px 2px rgba(0,0,0,0.39)', border: '3px solid rgb(160, 7, 7)', borderRadius: 2
                      }}
                    />
                  </Grid>

                  <Grid container>
                    <Grid>
                      <Typography sx={{ marginTop: '1.2rem', color: 'rgb(160, 7, 7) ' }}>
                        asignar categoria...
                      </Typography>
                    </Grid>
                    <Grid>
                      <Button sx={{ marginTop: '.8rem', marginLeft: '.5rem', fontSize: '.7rem', backgroundColor: 'rgb(160, 7, 7) ', color: '#fff' }} onClick={() => handleAdd(selectedCategory.name)}>crear</Button>
                    </Grid>

                  </Grid>
                  <Grid sm={12}>
                    <Box sx={{ width: '100%' }}>
                      <Stack direction="row" spacing={1}>
                        {ship && ship.length > 0 ? ship.map((e, i) => (
                          <Chip key={i} label={` ${e.category} ${e.value}%`} onDelete={() => handleChipDelete(`${e.category}`)} />
                        )) : <Typography sx={{ color: '#636362', marginTop: '2rem' }}>No hay Categorias</Typography>}
                      </Stack>
                    </Box>
                  </Grid>
                  <Grid sm={12}>
                    <input className="submit" type="submit" value='Enviar' />
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
