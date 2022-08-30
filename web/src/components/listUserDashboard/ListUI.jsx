import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    text:{
        color:'GrayText'
    }
  }));

export default function ListUI (){
    const styles= useStyles();
  return (
    <>
        <p className={styles.text}>No hay usuarios registrados</p>
    </>
  )
}
