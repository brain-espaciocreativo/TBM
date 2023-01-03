import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Video } from 'expo-av'


export default function Cards(props) {

   const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
   

  return (
    <>
        <View style={style.container}>
          <Card style={{margin:5}}>
            <Card.Content>
              <Title style={style.fecha}>{}</Title>
              <Title style={style.nombre}>{props.info.name}</Title>
              <Paragraph style={style.texto}>{props.info.description}</Paragraph>
            </Card.Content>
              <Title style={style.textVideo}>Video</Title>
                <Video 
                  ref={video}
                  source={{uri:`http://10.0.2.2:3000/${props.info.video}`}}
                  style={style.video} 
                  isLooping
                  useNativeControls
                  resizeMode="contain"
                  onPlaybackStatusUpdate={status => setStatus(() => status)}
                />
          </Card>
        </View>
    </>
  )
}

const style = StyleSheet.create({
  container:{
      flex: 1,
      backgroundColor: '#fff',
      // margin:20
    },
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
  },
  fecha:{
    color:'red',
    fontSize:16,
    fontWeight:'bold'
  },
  nombre:{
    marginLeft:'55%',
    fontSize:15,
    width: 200,
    fontWeight:'bold',
    color:'black',
    textTransform:'capitalize'
  },
  texto:{
    marginTop: 22,
    lineHeight:25
  },
  video:{
    marginTop:-60,
    margin:20,
    // borderBottomEndRadius:60,
    // borderBottomLeftRadius:60,
    // borderTopEndRadius:60,
    // borderTopLeftRadius:60,
    width:350,
    height:370
  },
  textVideo:{
    marginLeft:'77%',
    fontSize:17,
    width: 200,
    fontWeight:'bold',
    color:'black',
    borderRadius:80
  }
})

