import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createOneUser } from '../redux/slices/userSlice';
import Swal from 'sweetalert2'


export const useForm = (initialForm, validationsForm) =>{
    const [ user, setUser] = useState(initialForm);
    const [ err, setErr] = useState({});

    const navigate = useNavigate();

    const dispatch = useDispatch();


    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUser({
            ...user,[name]:value
        })
    }
    const handleBlur = (e) =>{
        handleChange(e);
        setErr(validationsForm(user));
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(createOneUser(user));
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'USUARIO CREADO',
            showConfirmButton: false,
            timer: 1500
          }).then( () => navigate('/home'))
    }
     const loggedSubmit = (e) =>{
         e.preventDefault();
         
     }
return {
    user,
    err,
    handleBlur,
    handleChange,
    handleSubmit,
    loggedSubmit
    
}}
