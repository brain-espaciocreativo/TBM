import React, { useContext, useEffect, useState } from 'react';
import { Searchbar, Text, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import Profile from '../components/profile/Profile';
import { AuthContext } from '../context/AuthContext';
import ListWorks from '../components/acordion/ListWorks';
import Appbar from '../components/appbar/appbar';
import Progress from '../components/progress/Progress';
import Novelty from '../components/novelty/novelty';
import LastWork from '../components/lastWork/lastWork';


export default function HomeScreen() {

  const { userInfo, getDataWork, worksData, logout, home } = useContext(AuthContext);


  const cargarApp = () => {
    if (!userInfo[1] && userInfo.length) {
      getDataWork(userInfo[1].id)
    }
  }

  useEffect(() => {
    cargarApp()
  }, [])

  const getDataWorks = () => {
    getDataWork(userInfo[1][1].id)
  }

  return (
    <View>
      {/* Componente Appbar */}
      <Appbar logout={logout} />
      {/* Componente perfil del usuario */}
      <Profile />
      {/* Componente Acordion */}
      <ListWorks />
      {/* Componente de contenidos */}
      <View style={style.contents}>
        {/* Componente titulo, descripcion y progreso general */}
        {home ?
          <View> 
            <LastWork worksData={userInfo[1]} />
          </View>
          :
          <View>
            <View>
              {
                (worksData.progresses && worksData.progresses.length > 0) &&
                <Progress title={worksData.name} description={worksData.description} progress={worksData.progresses} />
              }
            </View>
            {/* Componente novedades*/}
            <Novelty worksData={worksData} />
          </View>
        }
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  search: {
    backgroundColor: '#EAEAEA',
    borderRadius: 55,
    margin: 20
  },
  grid: {
    width: '100%',
  },
  contents: {
    margin: 20
  }
})