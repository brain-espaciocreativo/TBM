import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import LoginScreen from "./screens/LoginScreem";
import HomeScreen from "./screens/HomeScreen";
import Loading from "./screens/Loading";

const Stack = createNativeStackNavigator();
const Navigation = () =>{

    return(
            <Stack.Navigator initialRouteName="Loading">
                    <Stack.Screen name="Home" options={{headerShown:false}} component={HomeScreen}/>
                    <Stack.Screen name="Login" options={{headerShown:false}} component={LoginScreen} />
                <Stack.Screen name="Loading" component={Loading} options={{headerShown:false}} />
            </Stack.Navigator>
    )
}
export default Navigation;