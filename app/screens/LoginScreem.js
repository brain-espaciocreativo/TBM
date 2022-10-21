import React, { useEffect, useState } from 'react';
import { StyleSheet,View, Text,TextInput, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { getOneUser } from '../redux/slices/userSlice';
import Button from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useNavigation } from '@react-navigation/native';
import toast from '../helpers/toast';
import { RadioButton } from 'react-native-paper';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen () {

    
    // const dispatch  = useDispatch();
    // const userSelect = useSelector((state) => state.users.user);

    const [ email, setEmail ] = useState(null);
    const [ password , setPassword ] = useState(null);
    const [ show, setShow ] = useState(true);

    const { login, loading } = useContext(AuthContext);

    // const loggedSubmit =  () =>{
    //     if( (email === '') || (password === '')){
    //         return toast.danger({message:"Los campos no pueden estar vacios"})
    //     }
    //     setLoading(true);
    //     setTimeout(() => {
    //         dispatch(getOneUser({email, password}));
    //         navigation.navigate('Home');
    //         setLoading(false);
    //     }, 3000);
    // }

  return (
    <View style={style.container}>
        <Text style={style.title}>
            <Image
                style={style.imgLogo}
                source={require('../assets/logo4.jpg')}
            />
        </Text>
            <TextInput
                placeholderTextColor={'#f19ea0'}
                style={style.input}
                value={email}
                onChangeText={text => setEmail(text)}
                underlineColorAndroid='transparet'
                placeholder="Email"
                keyboardType='email-address'
            />
            <TouchableOpacity>
                <Button style={style.box} name="account-circle-outline" />
            </TouchableOpacity>
            <TextInput
            style={style.input}
            value={password}
            onChangeText={text => setPassword(text)}
            placeholderTextColor={'#f19ea0'}
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
            <View style={{ display: 'flex', flexDirection: 'row',  alignItems: 'center'}}>
                <RadioButton.Item value="first" />
                <Text style={style.text}>Mantener sesion iniciada</Text>
            </View>
            <TouchableOpacity style={style.containerButton} onPress={ () => {login(email, password)}} > 
            {!loading ? 
                    <Text style={style.buttonText}>
                    Ingresar
                    </Text>  
                :
                <ActivityIndicator size="small" color="white" animating={loading} style={style.loader}/>
            }
            </TouchableOpacity>
            <Text style={style.text}>Olvidaste tu contraseña? <Text style={style.href}>Haz click Aqui</Text></Text>
            <View style={style.footer}>
                <Text style={{ color: "#f19ea0" }}>Términos de uso | Políca de privacidad</Text>
            </View>
            {/* <View style={{flex:1, backgroundColor:'red', width:'100%', marginTop: '10%',display:'flex'}}>
                <Text>footer</Text>
            </View> */}
    </View>
  )
}

const style = StyleSheet.create({
    text: {
        fontSize: 16
    },
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
        backgroundColor: "#fff"
    },  
    title:{
        marginTop: 100,
        marginBottom: 50,
        fontSize: 70
    },
    input:{
        borderWidth: 1,
        width: "90%",
        height:50,
        marginTop: 20,
        color: "white",
        borderRadius: 30,
        border: "none",
        paddingTop:2,
        backgroundColor: "#db0007",
        paddingLeft: 40,
        borderWidth:1,
        borderColor: "#e3e2de",
    },
    containerButton:{
        backgroundColor: "#db0007",
        width: "90%",
        padding: 9,
        marginVertical: 5,
        alignItems: "center",
        borderRadius: 30,
        marginTop: 20,
        position: "relative"
    },
    buttonText:{
        fontSize: 17,
        fontWeight: "bold",
        color:"white"
    },
    box:{
        position:"absolute",
        fontSize: 25,
        color: "white",
        right: 140,
        bottom: 13,
        marginRight: 10
    },
    eye:{
        position:"absolute",
        fontSize: 25,
        color: "white",
        left: 140,
        bottom: 13,
    },
    imgLogo:{
        width: 300,
        height: 70,
    },
    loader:{
        zIndex:3
    },
    href:{
        color: "#db0007",
        fontWeight: '900'
    },
    footer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        fontSize: 16,
        bottom: 0, 
        color: "#f19ea0",
        backgroundColor: "#db0007",
        width: '100%',
        height: 50
    }
})