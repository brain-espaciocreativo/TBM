import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Chip, Card, Button, Title, Paragraph,ProgressBar } from 'react-native-paper';


export default function Cards(props) {
  return (
    <>
        <View style={style.container}>
        </View>
        <Card>
          <Card.Content>
            <Title style={style.fecha}>{props.info.date.substr(0,10)}</Title>
            <Title style={style.nombre}>{props.info.name}</Title>
            <Paragraph style={style.texto}>{props.info.description}</Paragraph>
          </Card.Content>
              <Card.Cover style={style.video} source={{ uri: 'https://picsum.photos/700' }} />
              {/* <View>
                <Text>Construción: </Text>
                  <View style={{ margin: 5, padding:5}}>
                <ProgressBar progress={0.3} color='red' />
                </View>
              </View>
              <Chip icon="information">Barrio privado</Chip>
              <Chip icon="information">Construcción en seco</Chip>
            <Card.Actions>
                <Button>Detalles</Button>
            </Card.Actions> */}
        </Card>
    </>
  )
}

const style = StyleSheet.create({
  container:{
      flex: 1,
      backgroundColor: '#fff',
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
    color:'black'
  },
  texto:{
    marginTop: 22,
    lineHeight:25
  },
  video:{
    marginTop:20
  }
})

