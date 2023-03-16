import { View, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import { Searchbar, Text, TextInput } from 'react-native-paper';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Cards from "../card/Cards";


const Novelty = ({ worksData }) => {
    const {searchFilter, search} = useContext(AuthContext);
    
    return (
        <View>
            <Text style={style.novedades}>Novedades</Text>
            <Searchbar
            placeholder='Buscar'
            fontSize='2'
            style={style.search}
            onChangeText={(text) => searchFilter(text)}
            //value = {text}
            />
            {/* <TextInput
                value={search}
                onChangeText
            /> */}
            {
                worksData.news && worksData.news.length > 0 ?
                    <FlatList
                        data={worksData.news}
                        renderItem={({ item }) => {
                            return <Cards info={item} />;
                        }}
                        listKey={(news, index) => index.toString()}
                    /> :
                    <Text>no hay novedades</Text>
            }
        </View>
    );
}

const style = StyleSheet.create({
    novedades: {
        fontSize: 18,
        fontWeight: '400',
        marginTop: 0,
        marginBottom: 20,
        fontWeight: 'bold',
        color: 'black'
    }
})

export default Novelty;