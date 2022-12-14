import React, { useContext, useEffect, useState } from 'react';
import { Searchbar, TextInput } from 'react-native-paper';
import {StyleSheet,Text,FlatList, SafeAreaView, View } from 'react-native';
import Cards from '../components/card/Cards';
import Profile from '../components/profile/Profile'
import Progreso from '../components/progress/Progreso';
import ProgresItem from '../components/progresItem/ProgresItems';
import { AuthContext } from '../context/AuthContext';
import { useDispatch , useSelector } from 'react-redux';
import ListWorks from '../components/acordion/ListWorks';

export default function HomeScreen() {

  const { userInfo, getDataWork, worksData, searchFilter, search} = useContext(AuthContext);


  const cargarApp = () =>{
    if(!userInfo[1] && userInfo.length){
      getDataWork(userInfo[1].id)
    }
  }

  useEffect(() =>{
    cargarApp()
    // setTimeout(() => {
 
    // }, 30000);
  },[])

  const getDataWorks = () =>{
    getDataWork(userInfo[1][1].id)
  }

const  numColumns = 2
  return (
    <>
        <FlatList ListHeaderComponent={
          <SafeAreaView>
            <Profile />
            <ListWorks/>
            {
              worksData.progresses && worksData.progresses.length > 0 ? 
              <Progreso progreso={worksData.progresses}/>
              :
              <Text>no hay progreso de obra general</Text>
            }
            {
              worksData.progresses && worksData.progresses.length > 0 ? 
              <View >
                <FlatList 
                numColumns={numColumns}
                data={worksData.progresses}
                renderItem={(item) =>{
                  return <ProgresItem items={item}/>
                }}
                listKey={(progresses, index) => index.toString()}
                />
              </View> 
              :
              <Text>No hay obras asociadas</Text>
          }
          
            <Text style={style.novedades}>Novedades</Text>
            {/* <Searchbar
            placeholder='Buscar'
            fontSize='2'
            style={style.search}
            /> */}
            <TextInput
              value={search}
              onChangeText={(text)=> searchFilter(text)}
            />
          {
            worksData.news && worksData.news.length > 0 ? 
          <FlatList 
          data={worksData.news}
          renderItem={({item}) =>{
            return <Cards info={item}/>;
          }}
          listKey={(news, index) => index.toString()}
          />: 
          <Text>no hay novedades</Text>
          }
        </SafeAreaView>
        } 
        />
    </>
  )
}

const style = StyleSheet.create({
    novedades:{
      fontSize:18,
      fontWeight:'400',
      marginTop:0,
      marginBottom:20,
      margin:20,
      fontWeight:'bold'
    },
    search:{
      backgroundColor:'#EAEAEA',
      borderRadius:55,
      margin:20
    },
    grid:{
        width:'100%',
    }
})