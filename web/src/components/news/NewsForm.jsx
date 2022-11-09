import { Grid, TextareaAutosize, TextField, Typography, useTheme,useMediaQuery, Button } from "@mui/material";
import { Box } from "@mui/system";
import NavDashboard2 from "../navDachboard2/NavDashboard2";
import NavDashboard from "../navDashboard/NavDashboard";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import UploadFiles from "../uploadFiles/UploadFiles";
import { createOneNews } from "../../redux/slices/newSlice";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";



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
    const [selectedFile, setSelectedFile] = useState(null);

    const handleSubmit = async(event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("video", selectedFile);


        try {
          const response = await axios({
            method: "post",
            url: `http://localhost:3000/news?name=${data.name}&description=${data.description}`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          });
        } catch(error) {
          console.log(error)
        }
      }
    
    const handleChange = (e) =>{
        const { name, value} = e.target;
        setData(state => ({...state, [name]: value}));
    }

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
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
                    <form onSubmit={handleSubmit} id='formulario' encType="multipart/form-data">
                        <input 
                        type="text" 
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        />
                        <textarea
                        type="text" 
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        />
                        <input type="file" name="video" accept="video/mp4" onChange={handleFileSelect}></input>
                        <input type="submit" value='enviar'/>
                    </form>
                  </Grid> 
                </Grid>
            </Grid>
        </>
    )
}