import React, { useState } from 'react';
import { StyleSheet,View, Text,TextInput, TouchableOpacity, Image} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getOneUser } from '../redux/slices/userSlice';
import Button from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';




export default function LoginScreen () {

    const navigation = useNavigation();
    const dispatch  = useDispatch();

    const [ email, setEmail ] = useState("");
    const [ password , setPassword ] = useState("");
    const [ show, setShow ] = useState(true);

    const loggedSubmit =  () =>{
        dispatch(getOneUser({email, password}));
        navigation.navigate('Profile');
    }
    
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
                value={email}
                onChangeText={text => setEmail(text)}
                underlineColorAndroid='transparet'
                placeholder="Email"
                keyboardType='email-address'
            />
            <Button style={style.box} name="email-outline" />
            <TextInput
            style={style.input}
            value={password}
            onChangeText={text => setPassword(text)}
            placeholderTextColor={'gray'}
            placeholder="Password"
            secureTextEntry={show}
            />
            <Button style={style.lock} name="lock" />
            <Button style={style.eye} name={show ? "eye-off" : "eye"} onPress={ () => setShow(!show)} />
            <TouchableOpacity style={style.containerButton}  onPress={loggedSubmit} > 
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
        top: 545,
    },
    lock:{
        position:'absolute',
        fontSize: 20,
        color: 'gray',
        left: 30,
        top: 613,
    },
    eye:{
        position:'absolute',
        fontSize: 20,
        color: 'gray',
        left: 310,
        top: 616,
    },
    imgLogo:{
        width: 300,
        height: 66,
    }
})