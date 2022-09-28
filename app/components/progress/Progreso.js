import { SafeAreaView, StyleSheet, View } from "react-native";
import { ProgressBar, Text, Title } from "react-native-paper";



export default function Progreso() {

    return(
        <SafeAreaView style={style.progreso}>
            <View >
                <Text style={style.titles}>Obra </Text>
                <Text style={style.texto}>Progreso </Text>
                <View style={style.bar}>
                    <ProgressBar progress={0.9} color='red' />
                    <Text style={{marginLeft:'90%', marginTop:7}}>80%</Text>
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
        fontWeight:"bold"
    },
    bar:{
        margin: 5,
        padding:5
    }
})