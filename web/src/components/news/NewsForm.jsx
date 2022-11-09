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

    useEffect(()=>{
        dispatch(getAllWorks);
    },[dispatch]);


    const createNews = async (e) => {
        e.preventDefault()
        // dispatch(createOneNews());
       await axios.post('http://localhost:3000/news',data)
        .then((res) => {
            console.log(res.data.data);
        })
        // Swal.fire({
        //   title: 'novedad creada!',
        // })
        // navigate('/admin');
      }
    
    const handleChange = (e) =>{
        const { name, value} = e.target;
        setData(state => ({...state, [name]: value}));
    }

    const handleselectWork = (e)=>{
        setSelectWork(e.target.value);
        console.log('Esto es work',selectWork);
    };

    const query =  `http://localhost:3000/news?name=${data.name}&description=${data.description}&workId=${selectWork}`
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
                    <form action={query} encType="multipart/form-data" method="post">
                        <input 
                        type="text" 
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        />
                        <input 
                        type="text" 
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        />
                        <input type="file" name="video" accept="video/mp4"></input>
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
                      <br />
                        <input type="submit" value='enviar'/>
                    </form>
                  </Grid> 
                </Grid>
            </Grid>
        </>
    )
}