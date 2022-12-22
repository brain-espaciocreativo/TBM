import { SafeAreaView, StyleSheet, View } from "react-native";
import { ProgressBar, Text } from "react-native-paper";



export default function ProgresItem(props) {


    return(
        <SafeAreaView style={style.cont}>
            <View  style={style.progreso}>
                <Text style={style.titles} >{props.items.item.category.name}</Text>
                <Text style={style.texto} >Progreso </Text>
                <View style={style.bar}>
                    <ProgressBar progress={parseInt(props.items.item.value)/100 } color='red' />
                    <Text style={{marginLeft:'65%', marginTop:7, fontSize:12}}>{props.items.item.value}%</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    progreso:{
        width:'80%',
        margin:20,
        backgroundColor:'#fff'
    },
    cont:{
        width:'50%'
    },
    texto:{
        marginLeft: 10,
        color:'#000000'
    },
    titles:{
        marginLeft: 10,
        fontSize:14,
        fontWeight:"bold",
        textTransform:'capitalize',
        color:'#000000'
    },
    bar:{
        margin: 5,
        padding:5
    }
})