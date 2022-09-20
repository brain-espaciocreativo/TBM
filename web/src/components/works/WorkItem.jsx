import {useEffect} from "react";
import { Button, Grid, Typography} from '@mui/material/';
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
              <Grid item>
              <Button 
                    sx={{
                      backgroundColor: 'rgb(160, 7, 7) ',
                      color: 'white',
                      padding: '13px',
                      border:'1px solid rgb(160, 7, 7) ',
                      transition: '.5s'
                    }}

                    onClick={(e) =>navigate("/work/create")}
                    >Crear Obra</Button>
              </Grid>
              <Grid item xs={12} columns={1}>
                  {works && works.length ? works.map((e) =>
                  ( 
                  <>
                      <Typography>{e.name}</Typography>
                      <Typography>{e.novedades}</Typography>
                      <Typography>{e.progress}</Typography>
                      <Edit onClick={() => navigate('/work/edit/'+ e.id)}/>
                      <Visibility onClick={()=> navigate('/work/'+ e.id)}/>
                      <Delete onClick={() => deleteWork(e.id)} />
                  </>
                  )) 
                  : <WorkUI/>
                  } 
                </Grid>
            </Grid>
        </div>
    )
}