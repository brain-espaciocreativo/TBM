import { useState } from "react";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { ProgressBar, Text, Title } from "react-native-paper";



export default function Progreso({progreso}) {

        const [result, setResult] = useState(0)


    useEffect( () =>{
        sumas()
    },[result])

    let pross = progreso
    const sumas = async () =>{ 
        let porcentajeTotal = 0;
        pross.forEach(e => {
            porcentajeTotal += parseFloat(e.value);
        });
        porcentajeTotal = parseFloat((porcentajeTotal)/progreso.length);
        setResult(porcentajeTotal);
    }
    return(
        <SafeAreaView style={style.progreso}>
            <View >
                <Text style={style.titles}>obra</Text>
                <Text style={style.texto}>Progreso </Text>
                <View style={style.bar}>
                    <ProgressBar progress={result} color='red' />
                    <Text style={{marginLeft:'90%', marginTop:7}}>{result}%</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}



const style = StyleSheet.create({
    progreso:{
        width:'80%',
        margin:20,
    },
    texto:{
        marginLeft: 10
    },
    titles:{
        marginLeft: 10,
        fontSize:20,
        fontWeight:"bold",
        textTransform:'capitalize'
    },
    bar:{
        margin: 5,
        padding:5
    }
})