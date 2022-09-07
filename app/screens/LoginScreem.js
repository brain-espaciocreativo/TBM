import React from 'react';
import { StyleSheet,View, Text,TextInput, TouchableOpacity, Image} from 'react-native';
import Button from 'react-native-vector-icons/MaterialCommunityIcons'
// import { TextInput } from 'react-native-paper';

export default function LoginScreen () {
  return (
    <View style={style.container}>
        <Text style={style.title}>
            <Image
                style={style.imgLogo}
                source={require('../assets/logo4.jpg')}
            />
        </Text>
            <TextInput
                placeholderTextColor={'gray'}
                style={style.input}
                underlineColorAndroid='transparet'
                placeholder="Email"
            />
            <Button style={style.box} name="email-outline" />
            <TextInput
            style={style.input}
            placeholderTextColor={'gray'}
            placeholder="Password"
            secureTextEntry={true}
            />
            <Button style={style.lock} name="lock" />
            <TouchableOpacity style={style.containerButton}> 
                <Text style={style.buttonText}>
                    Inicia Sesión
                </Text>
            </TouchableOpacity>
    </View>
  )
}





const style = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#fff'
    },  
    title:{
        marginBottom: '15rem',
        fontSize:'40px'
    },
    input:{
        borderWidth: 1,
        width: '90%',
        height:50,
        marginTop: 20,
        borderRadius: 30,
        border:'none',
        paddingTop:2,
        backgroundColor: '#f5f5f5',
        marginHorizontal: 20,
        paddingLeft: 40,
        borderWidth:1,
        borderColor: "blue",
        position:'relative'
    },
    containerButton:{
        backgroundColor: 'rgb(160, 7, 7)',
        width: '90%',
        padding: 15,
        marginVertical: 5,
        alignItems:'center',
        borderRadius: 30,
        marginTop: 20,
    },
    buttonText:{
        fontWeight: 'bold',
        color:'white'
    },
    box:{
        position:'absolute',
        fontSize: 20,
        color: 'gray',
        left: 30,
        top: 520,
    },
    lock:{
        position:'absolute',
        fontSize: 20,
        color: 'gray',
        left: 30,
        top: 588,
    },
    imgLogo:{
        width: 300,
        height: 66,
    }
})