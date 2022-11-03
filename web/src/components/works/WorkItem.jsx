import {useEffect} from "react";
import { Button, Card, CardActions, CardContent, Chip, Grid, Typography} from '@mui/material/';
import { useDispatch, useSelector } from 'react-redux';
import { Delete, Edit ,Visibility} from '@mui/icons-material';
import { deleteOneWork, getAllWorks } from "../../redux/slices/workSlice";
import WorkUI from "./WorkUI";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export default function WorkItem() {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const works = useSelector(state => state.works.workList);

    useEffect(() => {
        dispatch(getAllWorks());
    }, [dispatch])

     const deleteWork = (id) => {
         Swal.fire({
           title: 'Desea eliminar este obra?',
           showCancelButton: true,
           confirmButtonText: 'Aceptar',
         }).then((result) => {
           if (result.isConfirmed) {
             dispatch(deleteOneWork(id));
             Swal.fire('Eliminado!', '', 'success')}
             dispatch(getAllWorks())
         })
       }
      
    return (
        <div>
            <Grid container>
              <Grid item >
              <Button 
                    sx={{
                      backgroundColor: 'rgb(160, 7, 7) ',
                      color: 'white',
                      padding: '13px',
                      border:'1px solid rgb(160, 7, 7) ',
                      transition: '.5s'
                    }}

                    onClick={(e, i) =>navigate("/work/create")}
                    >Crear Obra</Button>
              </Grid>
              <Grid item xs={12} columns={2} sx={{display:'flex', gap:'2rem', flexWrap:'wrap'}}>
                  {works && works.length ? works.map((e, i) =>
                  ( 
                    <Card key={i} sx={{ minWidth: 275,boxShadow: '5px 5px 13px 2px rgba(0,0,0,0.39)', margin:'20px 0', width:'20%' }}>
                      <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          Nombre de la Obra
                        </Typography>
                        <Typography variant="h5" component="div">
                        {e.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          Descripcion
                        </Typography>
                        <Typography variant="body2">
                        {e.description}
                        </Typography>
                        {
                          e.progresses.map((element, i)=>{
                            return <Chip key={i} label={`${element.category.name} ${element.value}% ${element.height_value}%`}/>
                          })
                        }
                      </CardContent>
                      <CardActions>
                        <Edit sx={{cursor:'pointer', margin:'0 10px'}}  onClick={() => navigate('/work/edit/'+ e.id)}/>
                        <Visibility sx={{cursor:'pointer', margin:'0 10px'}}  onClick={()=> navigate('/work/'+ e.id)}/>
                        <Delete sx={{cursor:'pointer', margin:'0 10px'}}  onClick={() => deleteWork(e.id)} />
                      </CardActions>
                </Card>
                  )) 
                  : <WorkUI/>
                } 
                </Grid>
            </Grid>
        </div>
    )
}