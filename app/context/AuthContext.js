import React , { useState,createContext } from "react";
import axios from 'axios';
import * as RootNavigation from '../RootNavigation'
import { Alert, View } from "react-native";
import toast from "../helpers/toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native-paper";
// import config from '../config';

export const AuthContext = createContext();


export const AuthProvider = ({children}) =>{

    const navigation = useNavigation();
    
    const [ userInfo , setUserInfo] = useState(null);
    const [ loading , setLoading ] = useState(false);
    const [ worksData, setWorksData ] = useState({
        progresses: null,
        news: null
    })

    const [search , setSearchFilter] = useState([])

    const login = ( email , password) =>{
        setLoading(true)
        axios.post(`http://ec2-18-228-222-33.sa-east-1.compute.amazonaws.com:3000/auth/login`,{
            email, password
        }).then( res =>{
            let userInfo = res.data.data;
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            navigation.navigate('Home');  
            setLoading(false);
            if(email && password == null){
                console.log('llene los datos por favor');
                setLoading(false)
            }
        }).catch( e =>{
            setLoading(false)
            if(e.response.status === 401){
                toast.danger({message:"Datos incorrectos, verifique informacion"}) 
                setLoading(false)
                return
            }
            setLoading(false)
            setTimeout(() => {
            RootNavigation.navigate('Home')
            setLoading(false)
            }, 3000);
            setLoading(false)
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
        axios.get(`http://ec2-18-228-222-33.sa-east-1.compute.amazonaws.com:3000/work/` + id)
        .then( (res) =>{
            setWorksData({progresses: res.data.data.progresses, news:res.data.data.news })
            setSearchFilter({progresses: res.data.data.progresses, news:res.data.data.news })
        })
    }
    const getDataWorkByName = (name) =>{
        axios.get(`http://ec2-18-228-222-33.sa-east-1.compute.amazonaws.com:3000/work/name/` + name)
        .then( (res) =>{
            setWorksData({progresses: res.data.data.progresses, news:res.data.data.news })
        })
    }

    const searchFilter = (text) =>{
        if(text){
            const newData =  worksData.news.filter((item) =>{
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1
            });
            setWorksData({...worksData, news :newData})
            if(!newData.length){
                return toast.danger({message:"NO SE ENCONTRÓ NOVEDAD"})
            }
        }
        else{
            setWorksData(search)
        }
    }


    return (
        <AuthContext.Provider
         value={{
            userInfo,
            login,
            loading,
            logout,
            getDataWork,
            worksData,
            getDataWorkByName,
            searchFilter,
            search
         }}
         >
         {children}
        </AuthContext.Provider>
        )
}