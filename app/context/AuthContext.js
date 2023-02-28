import React, { useState, createContext, useEffect } from "react";
import axios from 'axios';
import * as RootNavigation from '../RootNavigation'
import { Alert } from "react-native";
import toast from "../helpers/toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from '../config';
import { Platform } from "react-native";

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [worksData, setWorksData] = useState({
        name: null,
        description: null,
        progresses: null,
        news: null
    })
    const [search, setSearchFilter] = useState([])
    const [home, setHome] = useState(true)


    const login = (email, password) => {
        setLoading(true);
        axios.post(`${config.URL}/auth/login`, {
            email, password
        }).then(res => {
            let userInfo = res.data.data;
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
            RootNavigation.navigate('Home')
            setLoading(false)
            if (email && password == null) {
                console.log('llene los datos por favor');
                setLoading(false)
            }
        }).catch(e => {
            console.log(e);
            setLoading(false)
            if (e.response.status === 401) {
                toast.danger({ message: "Datos incorrectos, verifique informacion" })
                setLoading(false)
                return
            }
            setLoading(false)
            setTimeout(() => {
                RootNavigation.navigate('Home')
                setLoading(false)
            }, 3000);
            setLoading(false)
        }).catch(e => {
            console.log(e);
            setLoading(false)
        })
    }

    const logout = () => {
        if (Platform.OS === "web") {
            AsyncStorage.removeItem('userInfo');
            RootNavigation.navigate('Login');
        } else {
            Alert.alert(
                "Atención",
                "¿Desea cerrar sesíon?",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "OK", onPress: () => {
                            AsyncStorage.removeItem('userInfo')
                            RootNavigation.navigate('Login')
                        }
                    }
                ])
        }
    }

    const getDataWork = (id) => {
        axios.get(`${config.URL}/work/` + id)
            .then((res) => {
                setWorksData({ name: res.data.data.name, description: res.data.data.description, progresses: res.data.data.progresses, news: res.data.data.news })
                setSearchFilter({ progresses: res.data.data.progresses, news: res.data.data.news })
            })
    }
    const getDataWorkByName = (name) => {
        axios.get(`${config.URL}/work/name/` + name)
            .then((res) => {
                setWorksData({ name: res.data.data.name, description: res.data.data.description, progresses: res.data.data.progresses, news: res.data.data.news })
            })
    }

    const searchFilter = (text) => {
        if (text) {
            const newData = worksData.news.filter((item) => {
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setWorksData({ ...worksData, news: newData })
            if (!newData.length) {
                return toast.danger({ message: "NO SE ENCONTRÓ NOVEDAD" })
            }
        }
        else {
            setWorksData(search)
        }
    }

    const setHomePage = (value) =>{
        setHome(value);
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
                search,
                home,
                setHomePage
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}