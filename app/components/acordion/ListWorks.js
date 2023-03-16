import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { AuthContext } from '../../context/AuthContext';
import { View } from 'react-native';
import { Divider } from 'react-native-paper';

export default function ListWorks() {
    const { userInfo, getDataWork, getDataWorkByName, setHomePage } = useContext(AuthContext);
    const [selectWork, setSelectWork] = useState(null)

    const handleOnPress = (data) => {
        const { id, name } = data
        getDataWork(id);
        setSelectWork(name);
        setHomePage(false);
    }


    return (
        <>
            <List.AccordionGroup>
                <List.Accordion title="Obras" titleStyle={style.title} id="1" theme={{colors: { primary: '#4169e1' }}}>
                    {
                        userInfo[1] && userInfo[1].length ? userInfo[1].map((e, i) => {
                            return <View style={style.item} key={i}>
                                <List.Item value={selectWork}
                                    titleStyle={style.titleItem}
                                    onPress={() => handleOnPress({ id: e.id, name: e.name })}
                                    title={e.name}
                                />
                                <Divider />
                            </View>
                        }) : <List.Item title='no hay trabajos' />
                    }
                </List.Accordion>
            </List.AccordionGroup>
        </>
    )
};


const style = StyleSheet.create({
    title: {
        color: '#FFFFFF'
    },
    titleItem: {
        color: "#000000"
    },
    item: {
        backgroundColor: "white"
    }
})
