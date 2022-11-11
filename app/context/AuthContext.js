import React , { useState,createContext, useEffect} from "react";
import axios from 'axios';
import * as RootNavigation from '../RootNavigation'
import { Alert } from "react-native";
import toast from "../helpers/toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();


export const AuthProvider = ({children}) =>{
    
    const [ userInfo , setUserInfo] = useState(null);
    const [ loading , setLoading ] = useState(false);
    const [ worksData, setWorksData ] = useState({
        progresses: null,
        news: null
    })

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
            setLoading(false)
            if(e.response.status === 401){
                toast.danger({message:"Datos incorrectos, verifique informacion"}) 
                setLoading(false)
                return
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
        Alert.alert(
            "Atención",
            "¿Desea cerrar sesíon?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => {
                AsyncStorage.removeItem('userInfo')
                RootNavigation.navigate('Login')
              } }
            ])
    }

    const getDataWork = (id) =>{
        axios.get('http://10.0.2.2:3000/work/' + id)
        .then( (res) =>{
            console.log(res.data.data, 'ESTO ES LA RESPUESTA DEL AXIOS')
            // setWorksData(res.data.data)
        })
    }
    return (
        <AuthContext.Provider
         value={{
            userInfo,
            login,
            loading,
            logout,
            getDataWork,
            worksData
         }}
         >
         {children}
        </AuthContext.Provider>
        )
}