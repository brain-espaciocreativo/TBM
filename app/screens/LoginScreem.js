import React, { useEffect, useState } from 'react';
import { StyleSheet,View, Text,TextInput, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getOneUser } from '../redux/slices/userSlice';
import Button from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import toast from '../helpers/toast';

export default function LoginScreen () {

    const navigation = useNavigation();
    const dispatch  = useDispatch();
    const userSelect = useSelector((state) => state.users.user);

    const [ email, setEmail ] = useState("");
    const [ password , setPassword ] = useState("");
    const [ show, setShow ] = useState(true);
    const [ loading , setLoading ] = useState(false);

    const loggedSubmit =  () =>{
        if( (email === '') || (password === '')){
            return toast.danger({message:"Los campos no pueden estar vacios"})
        }
        setLoading(true);
        setTimeout(() => {
            dispatch(getOneUser({email, password}));
            navigation.navigate('Home');
            setLoading(false);
        }, 3000);
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
            <TouchableOpacity>
                <Button style={style.box} name="email-outline" />
            </TouchableOpacity>
            <TextInput
            style={style.input}
            value={password}
            onChangeText={text => setPassword(text)}
            placeholderTextColor={'gray'}
            placeholder="Password"
            secureTextEntry={show}
            keyboardType="default"
            />
            <TouchableOpacity>
                <Button style={style.box} name="lock" />
            </TouchableOpacity>
            <TouchableOpacity>
                <Button style={style.eye} name={show ? "eye-off" : "eye"} onPress={ () => setShow(!show)} />
            </TouchableOpacity>
            <TouchableOpacity style={style.containerButton}  onPress={loggedSubmit} > 
            {!loading ? 
                    <Text style={style.buttonText}>
                    Inicia Sesión
                    </Text>  
                :
                <ActivityIndicator size="small" color="white" animating={loading} style={style.loader}/>
            }
            </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
        backgroundColor: "#fff"
    },  
    title:{
        marginBottom: 200,
        fontSize: 70
    },
    input:{
        borderWidth: 1,
        width: "90%",
        height:50,
        marginTop: 20,
        borderRadius: 30,
        border: "none",
        paddingTop:2,
        backgroundColor: "#f5f5f5",
        paddingLeft: 40,
        borderWidth:1,
        borderColor: "#e3e2de",
    },
    containerButton:{
        backgroundColor: "rgb(160, 7, 7)",
        width: "90%",
        padding: 15,
        marginVertical: 5,
        alignItems: "center",
        borderRadius: 30,
        marginTop: 20,
        position: "relative"
    },
    buttonText:{
        fontWeight: "bold",
        color:"white"
    },
    box:{
        position:"absolute",
        fontSize: 20,
        color: "gray",
        right: 140,
        bottom: 13,
    },
    eye:{
        position:"absolute",
        fontSize: 20,
        color: "gray",
        left: 140,
        bottom: 13,
    },
    imgLogo:{
        width: 300,
        height: 70,
    },
    loader:{
        zIndex:3
    }
})