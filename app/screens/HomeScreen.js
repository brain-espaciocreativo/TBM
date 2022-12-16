import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import {StyleSheet,Text,FlatList, SafeAreaView, View } from 'react-native';
import Cards from '../components/card/Cards';
import Profile from '../components/profile/Profile'
import Progreso from '../components/progress/Progreso';
import ProgresItem from '../components/progresItem/ProgresItems';
import { AuthContext } from '../context/AuthContext';
import { useDispatch , useSelector } from 'react-redux';
import ListWorks from '../components/acordion/ListWorks';
import axios from 'axios';

export default function HomeScreen() {

  const { userInfo, getDataWork, worksData} = useContext(AuthContext);

  const [ newsData, setNewsData ] = useState([])
  const [ currentPage , setCurrentPage ] = useState(0)



  const getNewsPage = () =>{
    axios.get(`http://10.0.2.2:3000/news?page=${currentPage}&size=10`)
    .then( (res) =>{
      setNewsData(res.data.result)
    })
    .catch( (err) =>{
      console.log(err)
    })
  }

  useEffect( () =>{
    getNewsPage()
  },[currentPage]) 

  const renderLoader = () =>{
    return(
      <View>
          <ActivityIndicator size='small' color='red' />
      </View>
    )
  }

  const loadMoreItems = () =>{
    setCurrentPage(currentPage + 1)
  }

//  shouldComponentUpdate = (nextProps, nextState) => {
//     if(nextState.currentPage === currentPage) return false
//     return true
//   }

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
          {
            worksData.news && worksData.news.length > 0 ? 
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
            newsData && newsData.length > 0 ? 
          <FlatList 
          data={newsData}
          renderItem={({item, i}) =>{
            return  <Cards key={i} info={item}/>;
          }}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItems}
          onEndReachedThreshold={0.5}
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