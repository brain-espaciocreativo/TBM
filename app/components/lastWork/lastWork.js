import { useContext, useState } from "react";
import { useEffect } from "react";
import { StyleSheet, TouchableHighlight, View, Text } from "react-native";
import { AuthContext } from "../../context/AuthContext";

export default function LastWork({ worksData }) {

    const [lastWork, setLastWork] = useState(null);
    const { getDataWork, setHomePage } = useContext(AuthContext);

    useEffect(() => {
        getLastWork();
    }, [lastWork])

    const handleOnPress = (id) => {
        getDataWork(id);
        setHomePage(false);
    }

    function getLastWork() {
        let last = worksData.sort((a, b) => new Date(b.user_work.createdAt).getTime() - new Date(a.user_work.createdAt).getTime())[0];
        setLastWork(last);
    }

    return (
        <View>
            {lastWork != null ?
                <TouchableHighlight onPress={() => handleOnPress(lastWork.id)} underlayColor="white">
                     <View style={style.cardContainer}>
                        <Text>{lastWork.name}</Text>
                     </View>
                </TouchableHighlight>
                : <Text></Text>
            } 
        </View>
    )
}

const style = StyleSheet.create({
    cardContainer: {
        borderRadius: 10,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20
    },
    cardTitle: {
        fontSize: 16,
        color: "black",
        fontWeight: 600
    },
    cardDescription: {
        fontSize: 12,
        color: "black"
    },
    cardTexts: {
        display: "flex",
        flexDirection: "column",
    }
})

{/* <TouchableHighlight onPress={() => handleOnPress(lastWork.id)} underlayColor="white">
                    <View style={style.cardContainer}>
                        <View style={style.cardTexts}>
                            <Text style={style.cardTitle}>{lastWork.name}</Text>
                            <Text style={style.cardDescription}>{lastWork.description}</Text>
                        </View>
                    </View>
                </TouchableHighlight>*/}