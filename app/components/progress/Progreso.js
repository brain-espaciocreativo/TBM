import { useContext, useState } from "react";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { ProgressBar, Text, Title } from "react-native-paper";
import { AuthContext } from "../../context/AuthContext";



export default function Progreso({progreso}) {

    const { userInfo, worksData} = useContext(AuthContext);



    const [result, setResult] = useState(0)
    const obra = userInfo[1]


    useEffect( () =>{
        sumas()
    },[result])

    let pross = worksData.progresses
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
                <Text style={style.titles}>{obra[0].name}</Text>
                <Text style={style.texto}>Progreso </Text>
                <View style={style.bar}>
                    <ProgressBar progress={result/100} color='red' />
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