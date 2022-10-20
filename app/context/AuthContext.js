import React , { useState,createContext, useEffect} from "react";
import axios from 'axios';
// import { useNavigation } from "@react-navigation/native";
import * as RootNavigation from '../RootNavigation'
import { Alert } from "react-native";
import toast from "../helpers/toast";

export const AuthContext = createContext();


export const AuthProvider = ({children}) =>{
    
    const [ userInfo , setUserInfo] = useState();
    const [ loading , setLoading ] = useState(false);
    // const navigation = useNavigation()

    const login = ( email , password) =>{
        axios.post('http://10.0.2.2:3000/auth/login',{
            email, password
        }).then( res =>{
            let userInfo = res.data.data;
            setUserInfo(userInfo);
            RootNavigation.navigate('Home')
            if(email && password == null){
                console.log('llene los datos por favor');
            }
        }).catch( e =>{
            console.log(e);
            if(e.response.status === 401){
                console.log('datos incorrectos');
                return toast.danger({message:"Datos incorrectos, verifique informacion"})
            }
        })
    }
    
    // TODO : la validacion está, tanto si resonde datos incorrectos o si los campos estan vacios, pero no logro hacer que se ejecute ambos, o es uno o es otro.


    return (
        <AuthContext.Provider
         value={{
            userInfo,
            login
         }}
         >
         {children}
        </AuthContext.Provider>
        )
}