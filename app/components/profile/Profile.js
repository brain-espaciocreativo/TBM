import { useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Image } from "react-native"
import { Avatar, Caption, Title } from "react-native-paper"
import { useDispatch, useSelector } from "react-redux";
import { getOneUser } from '../../redux/slices/userSlice';

export default function Profile() {
    const dispatch =  useDispatch();
    const user = useSelector((state) => state.users.user);

    console.log(user);

    useEffect( () =>{
        dispatch(getOneUser())
    }, [])


    return (
        <SafeAreaView style={style.container}>
            <View style={style.userInfoSection}>
            <View style={style.containerImage}>
                <Image 
                    style={style.image}
                    source={require('../../assets/logoApp.jpg')}
                />
            </View>
                <View style={{flexDirection: 'row', justifyContent:'flex-end', alignItems:'center'}}>
                <View style={{marginLeft: 20}}>
                    <Title style={[style.title, {
                        marginTop:0
                    }]}>!Hola {user.name}¡</Title>
                    <Caption style={style.caption}>22 de noviembre de 2022</Caption>
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
        // flex: 1,
        marginTop:100,
        display:'flex',
    },
    userInfoSection:{
        paddingHorizontal:10
    },
    title:{
        fontSize:18,
        marginBottom:-6,
        fontWeight:'bold',
        color:'#db0007'
    },
    caption: {
    fontSize: 9,
    lineHeight: 15,
    fontWeight: 'normal',
    color:'#12100b'
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
        backgroundColor:'red',
    }
})