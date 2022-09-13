import React from "react";
import { View, Text } from "react-native";
import { Provider as PaperProvider } from 'react-native-paper';
import Navigation from "./Navigation";

export default function App() {
  return (
    <PaperProvider>
       <Navigation/>
     </PaperProvider>
    // <View>
    //   <Text style={{backgroundColor: 'black', fontSize: 100, color: 'white'}}>Hola</Text>
    // </View>
  );
}

