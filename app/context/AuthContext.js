import React , { useState,createContext, useEffect} from "react";
import axios from 'axios';
import * as RootNavigation from '../RootNavigation'
import { Alert } from "react-native";
import toast from "../helpers/toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();


export const AuthProvider = ({children}) =>{
    
    const [ userInfo , setUserInfo] = useState();
    const [ loading , setLoading ] = useState(false);

    const login = ( email , password) =>{
        setLoading(true)
        axios.post('http://10.0.2.2:3000/auth/login',{
            email, password
        }).then( res =>{
            let userInfo = res.data.data;
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
            RootNavigation.navigate('Home')
            setLoading(false)
            if(email && password == null){
                console.log('llene los datos por favor');
            }
        }).catch( e =>{
            console.log(e);
            if(e.response.status === 401){
                console.log('datos incorrectos');
                return toast.danger({message:"Datos incorrectos, verifique informacion"})
            }
            setTimeout(() => {
            setLoading(false)
            RootNavigation.navigate('Home')
            setLoading(false)
            }, 3000);

        }).catch( e =>{
            console.log(e);
            setLoading(false)
        })
    }
    
    const logout = () =>{
        AsyncStorage.removeItem('userInfo')
        setUserInfo(null)
        RootNavigation.navigate('Login')
    }

    return (
        <AuthContext.Provider
         value={{
            userInfo,
            login,
            loading,
            logout
         }}
         >
         {children}
        </AuthContext.Provider>
        )
}