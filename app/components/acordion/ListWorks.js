import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { List } from 'react-native-paper';
import { AuthContext } from '../../context/AuthContext';

const ListWorks = () => {
    const { userInfo} = useContext(AuthContext);

    console.log(userInfo[1])

    return(
        <>
            <List.AccordionGroup>
                <List.Accordion title="Obras" id="1">
                    {
                        userInfo[1] && userInfo[1].length ? userInfo[1].map( (e) =>{
                            return <List.Item title="Item 1" /> 
                        }): <List.Item title='no hay trabajos'/>
                    }
                </List.Accordion>
            </List.AccordionGroup>
        </>
    )
};

export default ListWorks;