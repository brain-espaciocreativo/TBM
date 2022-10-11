import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";


const Error = () => {

    const navigate = useNavigation();

     const login = () =>{
         navigate.navigate('Login')
     }

    return (
        <View style={style.container}>
            <Text style={style.error}>Error al ingresar</Text>
            <Text style={style.credenciales}>Las credenciales son incorrectas</Text>
            <Button style={style.btn}  onPress={login} title="Iniciar Sesión"/>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems:"center"
    },
    error:{
        textTransform:'uppercase'
    },
    credenciales:{
        lineHeight:50,
        textTransform:'uppercase'
    },
    btn:{
        color:'#db0007'
    }
})

export default Error;