import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { useEffect } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, View } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

export default function Loading() {
  const navigation = useNavigation();
  let ScreenHeight = Dimensions.get("window").height;

    useEffect(()=>{
      setTimeout(()=>{
        navigation.navigate('Login');        
      },3000)
    },[]);

  return (
    <View style={{
      backgroundColor: 'white',
      width: '100%', 
      height: '100%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
        <Image
                source={require('../assets/logo4.jpg')}
                imageStyle={{resizeMode: 'stretch'}}
                style={{
                  width: 300,
                  height: 66
                }}
            />
            <ActivityIndicator animating={true} color={'red'} />
    </View>
  )
}

// const style = StyleSheet.create({
//     container:{
//         flex: 1,
//         justifyContent:'center',
//         alignItems:'center',
//         backgroundColor: 'black',
//         height: ScreenHeight
//     },
//     imgLogo:{
//         width: 300,
//         height: 66,
//     }
//   })