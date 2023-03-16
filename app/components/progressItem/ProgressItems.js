
import { StyleSheet, View } from "react-native";
import { ProgressBar, Text } from "react-native-paper";

export default function ProgressItem({ size, category, result }) {

    return (
        <View style={{ width: size = "main" ? "100%" : "90%" }}>
            <View style={style.cardText}>
                <Text style={style.text}>{category}</Text>
                <Text style={style.text}>{result}%</Text>
            </View>
            <View style={style.cardProgress}>
                <ProgressBar progress={result / 100} color='red' />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    cardText: {
        display: "flex",
        justifyContent: "space-between",
    },
    cardProgress: {
        marginTop: 10
    },
    text: {
        color: '#000000',
        fontWeight: "bold",
        textTransform: 'capitalize',
    },
})