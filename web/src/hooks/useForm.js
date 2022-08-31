import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOneUser, getOneUser } from '../redux/slices/userSlice';
import Swal from 'sweetalert2'


export const useForm = (initialForm, validationsForm) =>{
    const [ user, setUser] = useState(initialForm);
    const [ err, setErr] = useState({});

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const userSelect = useSelector((state) => state.users.user)

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
     const loggedSubmit = async (e) =>{
        e.preventDefault();
        await dispatch(getOneUser(user))
            //  if(userSelect.role === undefined){
            //     return console.log('usuario no existe');
            //  }
            if(userSelect.role === 'usuario'){
                navigate('/home')
            }
            if(userSelect.role === 'admin'){
                navigate('/admin')
            }
    }
return {
    user,
    err,
    handleBlur,
    handleChange,
    handleSubmit,
    loggedSubmit
    
}}
