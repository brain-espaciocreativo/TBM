import React , { useState,createContext, useEffect} from "react";
import axios from 'axios';
// import { useNavigation } from "@react-navigation/native";
import * as RootNavigation from '../RootNavigation'

export const AuthContext = createContext();


export const AuthProvider = ({children}) =>{
    
    const [ userInfo , setUserInfo] = useState();
    const [ loading , setLoading ] = useState(false);
    // const navigation = useNavigation()

    const login = ( email , password) =>{
        axios.post('http://10.0.2.2:3000/auth/login',{
            email, password
        }).then( res =>{
            let userInfo = res.data.data[0];
            console.log('este es el user desde context',userInfo);
            setUserInfo(userInfo);
            if(userInfo === null){
                console.log('datos incorrectos');
            }else{
                // navigation.navigate('Home')
                RootNavigation.navigate('Home')
            }
        }).catch( e =>{
            console.log(e);
        })
    }
    


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