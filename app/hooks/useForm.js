import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getOneUser } from '../redux/slices/userSlice';


export const useForm = (initialForm, validationsForm) =>{
    const [ user, setUser] = useState(initialForm);
    const [ err, setErr] = useState({});


    const dispatch = useDispatch();
    const userSelect = useSelector((state) => state.users.user)


    // useEffect ( () =>{
    //     if(userSelect.role === 'usuario'){
    //         navigate('/home')
    //     }
    //     if(userSelect.role === 'admin'){
    //         navigate('/admin')
    //     }
    // },[userSelect])

    const handleChange = (text) =>{
        setUser(text)
    }
    // const handleBlur = (e) =>{
    //     handleChange(e);
    //     setErr(validationsForm(user));
    // }
     const loggedSubmit = async (e) =>{
        await dispatch(getOneUser(user))
        console.log(userSelect);
        console.log('entraste');
    }


return {
    user,
    err,
    handleChange,
    // handleBlur,
    loggedSubmit
    
}}
