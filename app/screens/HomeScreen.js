import React, { useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import {StyleSheet,Text,FlatList, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Cards from '../components/card/Cards';
import { useState } from 'react';
import { getAllNews } from '../redux/slices/newSlice';


export default function HomeScreen() {

  const dispatch  = useDispatch();
  const news = useSelector((state) => state.news.newList);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getAllNews())
    return() =>{

    }
  }, [dispatch])

  return (
    <SafeAreaView>
      {/* <Cards/> */}
      <Text style={style.novedades}>Novedades</Text>
          <Searchbar
          placeholder='Buscar'
          fontSize='2'
          style={style.search}
          />
      <FlatList 
      data={news}
      renderItem={({item}) =>{
        return <Cards info={item}/>;
      }}
      keyExtractor={(news) => news.id.toString()}
      />
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
    novedades:{
      color:"#333",
      fontSize:18,
      fontWeight:'400',
      marginTop:120,
      marginBottom:20
    },
    search:{
      backgroundColor:'#EAEAEA',
      borderRadius:55
    }
})

