import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import toast from '../helpers/toast';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Hyperlink from 'react-native-hyperlink';
import { TextInput } from 'react-native-paper';

export default function LoginScreen() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(true);
    const [stayAlive, setStayAline] = useState(false);

    const { login, loading } = useContext(AuthContext);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const handleLogin = () => {
        if (email == null || email == "") {
            return toast.danger({ message: "El campo email no puede estar vacio" })
        } else if (password == null || password == "") {
            return toast.danger({ message: "El campo password no puede estar vacio" })
        } else {
            login(email, password);
        }

        setTimeout(() => {
            setEmail('')
            setPassword('')
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
                placeholder='Correo'
                value={email}
                onChangeText={text => setEmail(text)}
                style={style.input}
                mode='flat'
                underlineColor = '#db0007'
                left= {<TextInput.Icon name="account-circle" />}
            />
              <TextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={text => setPassword(text)}
                style={style.input}
                mode='flat'
                underlineColor = '#db0007'
                left= {<TextInput.Icon name="lock" />}
                right={<TextInput.Icon name="eye" />}
            />
            <TouchableOpacity style={style.containerButton} onPress={() => { handleLogin() }} >
                {!loading ?
                    <Text style={style.buttonText}>
                        Ingresar
                    </Text>
                    :
                    <ActivityIndicator size="small" color="white" animating={loading} style={style.loader} />
                }
            </TouchableOpacity>
            <Hyperlink linkDefault={true}
                linkText={(url) => url === 'http://localhost:5173/resset-password' ? 'Haz click Aqui' : url}
            >
                <Text style={style.text}>Olvidaste tu contraseña?
                    <Text style={style.href}> http://localhost:5173/resset-password</Text>
                </Text>
            </Hyperlink>
            <View style={style.footer}>
                <Text style={{ color: "#f19ea0" }}>Términos de uso | Políca de privacidad</Text>
            </View>
        </View >
    )
}

const style = StyleSheet.create({
    text: {
        fontSize: 16
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    title: {
        marginTop: 100,
        marginBottom: 50,
        fontSize: 70
    },
    input: {
        width: "90%",
        height: 56,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 26,
        border: "none",
        /* backgroundColor: "#db0007",
        color: "white" */
    },
    containerButton: {
        backgroundColor: "#db0007",
        width: "90%",
        padding: 9,
        marginVertical: 5,
        alignItems: "center",
        borderRadius: 30,
        marginTop: 20,
        position: "relative"
    },
    buttonText: {
        fontSize: 17,
        fontWeight: "bold",
        color: "white"
    },
    box: {
        position: "absolute",
        fontSize: 25,
        color: "white",
        right: 140,
        bottom: 13,
        marginRight: 10
    },
    eye: {
        position: "absolute",
        fontSize: 25,
        color: "white",
        left: 140,
        bottom: 13,
    },
    imgLogo: {
        width: 300,
        height: 70,
    },
    loader: {
        zIndex: 3
    },
    href: {
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