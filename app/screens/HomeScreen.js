import React, { useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import {StyleSheet,Text,FlatList, SafeAreaView, View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Cards from '../components/card/Cards';
import { getAllNews } from '../redux/slices/newSlice';
import Profile from '../components/profile/Profile'
import Progreso from '../components/progress/Progreso';
import ProgresItem from '../components/progresItem/ProgresItems';

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
    
    <FlatList ListHeaderComponent={
      <SafeAreaView>
        <Profile />
      <Progreso/>
      <View style={style.grid}>
        <View>
            <ProgresItem/>
        </View>
        <View>
            <ProgresItem/>
        </View>
        <View>
            <ProgresItem/>
        </View>
        <View>
            <ProgresItem/>
        </View>
        
      </View>
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
    } 
    
    />
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
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      flexWrap:'wrap',
    }
})

