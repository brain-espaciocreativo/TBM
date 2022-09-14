import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Chip, Card, Button, Title, Paragraph, Avatar, IconButton, ProgressBar } from 'react-native-paper';

export default function Cards() {
  return (
    <>
        <Card>
          <Card.Content>
            <Title>Club San Diego</Title>
              <Paragraph>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, porro?</Paragraph>
              </Card.Content>
              <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
              <View>
                <Text>Construción: </Text>
                  <View style={{ margin: 5, padding:5}}>
                <ProgressBar progress={0.3} color='red' />
                </View>
              </View>
              <Chip icon="information">Barrio privado</Chip>
              <Chip icon="information">Construcción en seco</Chip>
            <Card.Actions>
                <Button>Detalles</Button>
            </Card.Actions>
        </Card>
    </>
  )
};

const style = StyleSheet.create({
  container:{
      flex: 1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: '#fff'
  }
})

