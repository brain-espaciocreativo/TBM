import { Grid, TextareaAutosize, TextField, Typography, useTheme,useMediaQuery, Button, Select, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import NavDashboard2 from "../navDachboard2/NavDashboard2";
import NavDashboard from "../navDashboard/NavDashboard";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import UploadFiles from "../uploadFiles/UploadFiles";
import { createOneNews } from "../../redux/slices/newSlice";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAllWorks } from "../../redux/slices/workSlice";
import './NewsStyle.css'


export default function NewsForm () {

    const dispatch = useDispatch();
    const news = useSelector(state => state.categories.news);
    const works = useSelector(state => state.works.workList)
    const navigate = useNavigate();

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));

    const [ selectWork, setSelectWork ] = useState("");
    
    const [ data , setData ] = useState({
        name:'',
        description:'',
        video:'',
        workId: selectWork
    })
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
      dispatch(getAllWorks());
  }, [dispatch])


    const handleSubmit = async(event) => {
        event.preventDefault()
        
        if(!data.description || !data.name){
          return Swal.fire({title: 'los campos deben estar llenos'})
        }

        const formData = new FormData();
        formData.append("video", selectedFile);

        try {
          const response = await axios({
            method: "post",
            url: `${import.meta.env.VITE_URL}/news?name=${data.name}&description=${data.description}&workId=${selectWork}`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          }).then((res) =>{
            Swal.fire({title: 'Novedad creada!'})
          })
          navigate('/admin')
        } catch(error) {
          console.log(error)
        }
      }
    
    const handleChange = (e) =>{
        const { name, value} = e.target;
        setData(state => ({...state, [name]: value}));
    }

    const handleselectWork = (e)=>{
        setSelectWork(e.target.value);
        console.log('Esto es work',selectWork);
    };

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
      }   

    const saludar = () =>{
      console.log('hola')
    }
    return (
        <>
            <NavDashboard />
            <Grid container>
            {
              !isMatch &&
              <Grid item  xs={3} columns={1}>
                <NavDashboard2/>
              </Grid>
            }
                            <Grid item xs={9} sx={{
                    width: '70%',
                    height: '80vh',
                    marginTop: '9rem',
                }} >
                <Grid container spacing={2} sx={{display:'flex', flexDirection:'column', gap: '6', width: '50%'}} >
                    <Typography sx={{fontSize:'1.5rem', color:'#333', margin: '1rem 0'}}>Creacion de Novedades</Typography>
                    <form onSubmit={(e)=>handleSubmit(e)} id='formulario' encType="multipart/form-data">
                        <TextField 
                        placeholder="Nombre"
                        type="text" 
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        />
                        <TextareaAutosize
                        className="description"
                        placeholder="Descripción"
                        type="text" 
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        />
                        
                        <input type="file" name="video" accept="video/mp4" onChange={handleFileSelect}></input>
                        <Typography >
                            Selecciona una Obra
                        </Typography>
                        <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        name="name"
                        value={selectWork}
                        onChange={handleselectWork}
                        label="Obras"
                        sx={{border:'none', 
                        boxShadow: '5px 5px 13px 2px rgba(0,0,0,0.39)'}} 
                      >
                      {
                        works && works.length ? 
                          works.map((e)=>{
                            return <MenuItem key={e.id} value={e.name}>{e.name}</MenuItem>
                          }) : <MenuItem value='No hay Obras'>No hay Obras</MenuItem>
                      }
                      </Select>
                      <div>
                        <input className="submit" type="submit" value='Enviar'/>
                      </div>
                    </form>
                  </Grid> 
                </Grid>
            </Grid>
        </>
    )
}
