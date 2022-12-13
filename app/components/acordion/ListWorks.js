import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { AuthContext } from '../../context/AuthContext';

export default function ListWorks() {
    const { userInfo , getDataWork, getDataWorkByName} = useContext(AuthContext);
    const [ selectWork , setSelectWork] =  useState(null)

    const handleOnPress = (data) =>{
        const { id , name } = data
        getDataWork(id)
        setSelectWork(name)
        console.log(selectWork)
    }
    // useEffect(() => {
    //     setInterval(() => {
    //         // getDataWork(selectWork)
    //         getDataWorkByName('parque chacabuco')
    //     console.log('ejecuto')
    //         return clearInterval()
    //     }, 5000);

    // }, [])
    

    return(
        <>
            <List.AccordionGroup>
                <List.Accordion title="Obras" id="1">
                    {
                        userInfo[1] && userInfo[1].length ? userInfo[1].map( (e,i) =>{
                            return <List.Item value={selectWork} titleStyle={style.title} onPress={() => handleOnPress({id:e.id, name: e.name})} title={e.name} key={i}/> 
                        }): <List.Item title='no hay trabajos'/>
                    }
                </List.Accordion>
            </List.AccordionGroup>
        </>
    )
};


const style = StyleSheet.create({
    title:{
      color:'#000000'
    }
})
