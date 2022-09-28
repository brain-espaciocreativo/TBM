import { SafeAreaView, StyleSheet, View } from "react-native";
import { ProgressBar, Text } from "react-native-paper";



export default function ProgresItem() {

    return(
        <SafeAreaView style={style.cont}>
            <View  style={style.progreso}>
                <Text style={style.titles}>Redes Cloacales </Text>
                <Text style={style.texto}>Progreso </Text>
                <View style={style.bar}>
                    <ProgressBar progress={0.9} color='red' />
                    <Text style={{marginLeft:'65%', marginTop:7, fontSize:12}}>80%</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    progreso:{
        width:150,
        margin:20,
        backgroundColor:'#fff'
    },
    cont:{
        width:'100%'
    },
    texto:{
        marginLeft: 10
    },
    titles:{
        marginLeft: 10,
        fontSize:14,
        fontWeight:"bold"
    },
    bar:{
        margin: 5,
        padding:5
    }
})