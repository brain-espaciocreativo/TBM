import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import LoginScreen from "./screens/LoginScreem";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Loading from "./screens/Loading";

const Navigator = () =>{

    const Stack = createNativeStackNavigator();

    return(
        <Stack.Navigator
                screenOptions={{
                    headerStyle:{
                        backgroundColor:"transparent"
                    },
                    headerTintColor: 'red',
                    headerTransparent: true,
                    headerTitle:'',
                    headerLeftContainerStyle:{
                        paddingLeft: 20
                    }
                }}
                initialRouteName="Loading"
            >
                <Stack.Screen name="Loading" component={Loading} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
    )
}

const Navigation = () => {
    return (
        <NavigationContainer>
            <Navigator/>
        </NavigationContainer>
    )
}

export default Navigation;