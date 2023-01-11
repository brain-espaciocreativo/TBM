import { useContext, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Image, Button } from "react-native"
import { Avatar, Caption, Title } from "react-native-paper"
import { AuthContext } from '../../context/AuthContext' 
import moment from 'moment';
import 'moment/locale/es';

export default function Profile() {

    const { userInfo , logout} = useContext(AuthContext);

    const today = new Date();
    const day = moment(today).format("LLLL");
    const date = moment(today).format("MMMM D, YYYY");


    return (
        <SafeAreaView style={style.container}>
            <View style={style.userInfoSection}>
            <View style={style.containerImage}>
                <Image 
                    style={style.image}
                    source={require('../../assets/logoOficial.png')}
                />
            </View>
                <View style={{flexDirection: 'row', justifyContent:'flex-end', alignItems:'center'}}>
                <View style={{marginLeft: 20}}>
                {
                    userInfo[0] ?
                        <Title style={[style.title, {letterSpacing:1}]}>¡Hola {userInfo[0].name}!</Title>
                    : "User"
                }
                <Caption style={style.caption}>{date}</Caption>
                <Button title="Cerrar Sesión" color='red' onPress={logout}></Button>
                </View>
                <Avatar.Image 
                source={{
                    uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
                }}
                size={60}
                />
                </View> 
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container:{
        marginTop:50,
        display:'flex',
    },
    userInfoSection:{
        paddingHorizontal:10
    },
    title:{
        fontSize:18,
        marginBottom:-6,
        fontWeight:'bold',
        color:'#db0007',
        textTransform:'capitalize'
    },
    caption: {
    fontSize: 9,
    lineHeight: 15,
    fontWeight: 'normal',
    color:'#12100b',
    },
    infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
    },
    containerImage:{
        marginBottom:-50
    },
    image:{
        width:150,
        height:33,
    }
})