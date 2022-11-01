import { Grid, TextareaAutosize, TextField, Typography, useTheme,useMediaQuery, Button } from "@mui/material";
import { Box } from "@mui/system";
import NavDashboard2 from "../navDachboard2/NavDashboard2";
import NavDashboard from "../navDashboard/NavDashboard";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import UploadFiles from "../uploadFiles/UploadFiles";
import { createOneNews } from "../../redux/slices/newSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";



export default function NewsForm () {

    const dispatch = useDispatch();
    const news = useSelector(state => state.categories.news);

    const navigate = useNavigate();

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));

    const [ data , setData ] = useState({
        name:'',
        description:'',
        video:''
    })


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
                    <form onSubmit={(e) => createNews(e)} encType="multipart/form-data" method="post">
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
                        <input type="submit" value='enviar'/>
                    </form>
                  </Grid> 
                </Grid>
            </Grid>
        </>
    )
}