
import { StyleSheet } from "react-native";
import { ProgressBar, Text } from "react-native-paper";
import { Box } from "@mui/material";

export default function ProgressItem({ size, category, result }) {

    return (
        <Box style={{ width: size = "main" ? "100%" : "90%" }}>
            <Box style={style.cardText}>
                <Text style={style.text}>{category}</Text>
                <Text style={style.text}>{result}%</Text>
            </Box>
            <Box style={style.cardProgress}>
                <ProgressBar progress={result / 100} color='red' />
            </Box>
        </Box>
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