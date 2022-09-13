import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreem";

const HomeStack = createNativeStackNavigator();

function MyStack() {
    return (
        <HomeStack.Navigator
            initialRouteName="HomeScreen"
        >
            <HomeStack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerShown: false,
                }}
                />
            <HomeStack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    headerBackTitleVisible: false,
                    navigationBarHidden:true,
                }}
            />
        </HomeStack.Navigator>
    )
}

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Login"
            screenOptions={{
                tabBarActiveTintColor: 'red',
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={MyStack} 
                options={{
                    tabBarIcon: ({ color, size}) => (
                        <Entypo name="home" size={30} color={color} />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen 
                name="Login" 
                component={MyStack} 
                options={{
                    tabBarIcon: ({ color, size}) => (
                        <AntDesign name="user" size={24} color={color} />
                    ),
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    )
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    )
}