import React from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleSheet, Text, FlatList, SafeAreaView, View } from 'react-native';
import { useSelector } from 'react-redux';
import Cards from '../components/card/Cards';
import Profile from '../components/profile/Profile'
import Progreso from '../components/progress/Progreso';
import ProgresItem from '../components/progresItem/ProgresItems';
import Error from '../components/error/Error';

export default function HomeScreen() {
  const news = useSelector((state) => state.users.news);
  const progresses = useSelector((state) => state.users.progresses);
  const user = useSelector((state) => state.users.user);

  // TODO: cuando ingresa con las credenciales incorrectas muestra el componente de error , pero cuando ingresa las credenciales correctas , primero se muestra el componente de error y luego el de HOMESCREEM , intente poner un useEffect pero nada.....
  const numColumns = 2
  return (
    <>
      {
        user ?
          <FlatList ListHeaderComponent={
            <SafeAreaView>
              <Profile />
              {
                progresses.length > 0 && <Progreso progreso={progresses} />
              }
              {
                progresses.length > 0 && <View >
                  <FlatList
                    numColumns={numColumns}
                    data={progresses}
                    renderItem={(item) => {
                      return <ProgresItem items={item} />
                    }}
                    listKey={(progresses, index) => index.toString()}
                  />
                </View>
              }
              <Text style={style.novedades}>Novedades</Text>
              <Searchbar
                placeholder='Buscar'
                fontSize='2'
                style={style.search}
              />
              {
                news.length > 0 && <FlatList
                  data={news}
                  renderItem={({ item }) => {
                    return <Cards info={item} />;
                  }}
                  listKey={(news, index) => index.toString()}
                />
              }
            </SafeAreaView>
          }
          />
          :
          <Error />
      }
    </>
  )
}

const style = StyleSheet.create({
  novedades: {
    fontSize: 18,
    fontWeight: '400',
    marginTop: 0,
    marginBottom: 20,
    margin: 20,
    fontWeight: 'bold'
  },
  search: {
    backgroundColor: '#EAEAEA',
    borderRadius: 55,
    margin: 20
  },
  grid: {
    width: '100%',
  }
})
