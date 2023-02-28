import { SafeAreaView, StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import { Text } from "react-native-paper";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProgressItem from "../progressItem/ProgressItems";


export default function Progress({ title, description, progress }) {
    const [result, setResult] = useState(0);

    useEffect(() => {
        sumas();
    }, [result])

    const sumas = () => {
        let porcentajeTotal = 0;
        progress.forEach(e => {
            porcentajeTotal += parseFloat(e.value);
        });
        porcentajeTotal = parseFloat((porcentajeTotal) / progress.length);
        setResult(porcentajeTotal);
    }

    return (
        <SafeAreaView>
            <View style={{ marginBottom: 20 }}>
                <Text style={style.title}>{title}</Text>
                <Text style={style.description}>{description}</Text>
                <Text style={style.subtitle}>Progreso</Text>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                        <ProgressItem size={"main"} category={"General"} result={result}/>
                    </AccordionSummary>
                    <AccordionDetails >
                        <ProgressItem size={"secondary"} category={progress[0].category.name} result={result}/>
                    </AccordionDetails>
                </Accordion>
            </View>
        </SafeAreaView>
    )
}



const style = StyleSheet.create({
    text: {
        color: '#000000',
        fontWeight: "bold",
        textTransform: 'capitalize',
    },
    title: {
        marginBottom: 10,
        fontSize: 20,
        fontWeight: "bold",
        textTransform: 'capitalize',
        color: '#000000',
    },
    description: {
        marginBottom: 20,
        fontSize: 16,
        color: '#000000',
    },
    cardText: {
        display: "flex",
        justifyContent: "space-between",
    },
    cardProgress: {
        marginTop: 10
    },
    textAccordion: {
        fontSize: 18,
        fontWeight: '400',
        marginTop: 0,
        marginBottom: 20,
        margin: 20,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '400',
        marginTop: 0,
        marginBottom: 16,
        fontWeight: 'bold',
        color: '#000000',
    }
})