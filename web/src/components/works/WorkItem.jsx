import { useEffect } from "react";
import { Button, Card, CardActions, CardContent, Chip, Grid, Typography, Paper } from '@mui/material/';
import { useDispatch, useSelector } from 'react-redux';
import { Delete, Edit, Visibility } from '@mui/icons-material';
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
        Swal.fire('Eliminado!', '', 'success')
      }
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
              border: '1px solid rgb(160, 7, 7) ',
              transition: '.5s',
              marginLeft: '2rem'
            }}

            onClick={(e, i) => navigate("/work/create")}
          >Crear Obra</Button>
        </Grid>
        <Grid item xs={12} columns={2} sx={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {works && works.length ? works.map((e, i) =>
          (
            <Card key={i} sx={{ borderRadius: 10, border: '4px solid rgb(160, 7, 7)', minWidth: 250, margin: '20px 30px', width: '10%', height: 350 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Nombre de la Obra
                </Typography>
                <Typography variant="h5" component="div" sx={{ color: '#000000', fontWeight: 'bold' }}>
                  {e.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Descripcion
                </Typography>
                <Typography variant="body2" sx={{ color: '#000000', fontWeight: 'bold' }}>
                  {e.description}
                </Typography>
                <Paper style={{ maxHeight: 70, overflow: 'auto' }}>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">Categorias</Typography>
                  {
                    e.progresses.map((element, i) => {
                      return <Chip sx={{ background: '#f0b8ba' }} key={i} label={`${element.category.name} ${element.value}% ${element.weight}%`} />
                    })
                  }
                </Paper>



                <Paper style={{ maxHeight: 70, overflow: 'auto' }}>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">Usuarios</Typography>
                  {
                    e.users.map((e, i) => {
                      return <Chip sx={{ background: '#f0b8ba' }} key={i} label={`${e.email}`} />
                    })
                  }

                </Paper>


              </CardContent>
              <CardActions>
                <Edit sx={{ cursor: 'pointer', margin: '0 10px', color: '#000000', fontWeight: 'bold' }} onClick={() => navigate('/work/edit/' + e.id)} />
                <Visibility sx={{ cursor: 'pointer', margin: '0 10px', color: '#000000', fontWeight: 'bold' }} onClick={() => navigate('/work/' + e.id)} />
                <Delete sx={{ cursor: 'pointer', margin: '0 10px', color: '#000000', fontWeight: 'bold' }} onClick={() => deleteWork(e.id)} />
              </CardActions>
            </Card>
          ))
            : <WorkUI />
          }
        </Grid>
      </Grid>
    </div>
  )
}