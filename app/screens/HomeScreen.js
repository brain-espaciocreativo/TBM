import React, { useContext, useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import {StyleSheet,Text,FlatList, SafeAreaView, View } from 'react-native';
import Cards from '../components/card/Cards';
import Profile from '../components/profile/Profile'
import Progreso from '../components/progress/Progreso';
import ProgresItem from '../components/progresItem/ProgresItems';
import { AuthContext } from '../context/AuthContext';

export default function HomeScreen() {

  const { userInfo} = useContext(AuthContext);
  const news = userInfo[2];
  const progresses = userInfo[3];


  
const  numColumns = 2
  return (
    <>
        <FlatList ListHeaderComponent={
          <SafeAreaView>
            <Profile />
            {
              progresses && progresses.length > 0 ? 
              <Progreso progreso={progresses}/>
              :
              <Text>no hay progreso de obra general</Text>
            }
            {
              progresses && progresses.length > 0 ? 
              <View >
                <FlatList 
                numColumns={numColumns}
                data={progresses}
                renderItem={(item) =>{
                  return <ProgresItem items={item}/>
                }}
                listKey={(progresses, index) => index.toString()}
                />
              </View> 
              :
              <Text>No hay obras asociadas</Text>
          }
          {
            news && news.length > 0 ? 
            <>
            <Text style={style.novedades}>Novedades</Text>
            <Searchbar
            placeholder='Buscar'
            fontSize='2'
            style={style.search}
            />
            </>
            :
            <Text>no hay novedades para buscar</Text>
          }
          {
            news && news.length > 0 ? 
          <FlatList 
          data={news}
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