import React , { useState,createContext, useEffect} from "react";
import axios from 'axios';
import * as RootNavigation from '../RootNavigation'

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
            setTimeout(() => {
            setLoading(false)
            RootNavigation.navigate('Home')
            }, 3000);
        }).catch( e =>{
            console.log(e);
            setLoading(false)
        })
    }
    


    return (
        <AuthContext.Provider
         value={{
            userInfo,
            login,
            loading
         }}
         >
         {children}
        </AuthContext.Provider>
        )
}