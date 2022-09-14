import React from 'react'
import { Dimensions, Image, ImageBackground, StyleSheet, View } from 'react-native'

export default function Loading() {

    let ScreenHeight = Dimensions.get("window").height;

  return (
    <View style={{
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