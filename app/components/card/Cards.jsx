import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import moment from 'moment';

export default function Cards(props) {
  moment.updateLocale('es', {
    months : 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort : 'Ene._Feb._Mar_Abr._May_Jun_Jul._Agos_Sept._Oct._Nov._Dic.'.split('_'),
    monthsParseExact : true,
    weekdays : 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
    weekdaysShort : 'Dom._Lun._Mar._Mie._Jue._Vie._Sáb.'.split('_'),
    weekdaysMin : 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY'
    }
});

  moment.locale('es')
   const newDate = moment(props.info.date).format('LLLL');
  
  console.log(newDate);

  return (
    <>
        <View style={style.container}>
        </View>
        <Card style={{margin:5}}>
          <Card.Content>
            <Title style={style.fecha}>{newDate}</Title>
            <Title style={style.nombre}>{props.info.name}</Title>
            <Paragraph style={style.texto}>{props.info.description}</Paragraph>
          </Card.Content>
            <Title style={style.textVideo}>Video</Title>
              <Card.Cover style={style.video} source={{ uri: 'https://picsum.photos/200' }} />
        </Card>
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
    lineHeight:25,
  },
  video:{
    marginTop:20,
    margin:20,
    borderBottomEndRadius:60,
    borderBottomLeftRadius:60,
    borderTopEndRadius:60,
    borderTopLeftRadius:60
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

