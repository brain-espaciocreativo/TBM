import { useState } from "react";
import { useDispatch } from 'react-redux';
import { createOneUser } from '../redux/slices/userSlice';


export const useForm = (initialForm, validationsForm) =>{
    const [ user, setUser] = useState(initialForm);
    const [ err, setErr] = useState({});

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
    }
return {
    user,
    err,
    handleBlur,
    handleChange,
    handleSubmit
}}
