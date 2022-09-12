import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import LoginScreen from "./screens/LoginScreem";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createNativeStackNavigator();

const Navigator = () =>{

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
                initialRouteName="Login"
            >
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

































//SEGUNDO NAVIGATOR
// function Navigation () {
//     return (
//         <NavigationContainer>
//             <Stack.Navigator>
//                 <Stack.Screen 
//                 name="Login" 
//                 component={LoginScreen}
//                 options={{
//                     headerShown: false,
//                 }}
//                 />
//                  <Stack.Screen 
//                 name="Home" 
//                 component={HomeScreen}
//                 />
//             </Stack.Navigator>
//         </NavigationContainer>
//     )
// }

// export default Navigation;





//ANTIGUO NAVIDATOR


//  function MyStack() {
//      return (
//          <HomeStack.Navigator
//              initialRouteName="Login"
//          >
//              {/* <HomeStack.Screen
//                  name="HomeScreen"
//                  component={HomeScreen}
//                  options={{
//                      headerShown: false,
//                  }}
//                  />
//              <HomeStack.Screen
//                  name="Login"
//                  component={LoginScreen}
//                  options={{
//                      headerBackTitleVisible: false,
//                      navigationBarHidden:true,
//                  }}
//              /> */}
//          </HomeStack.Navigator>
//      )
//  }

// const Tab = createBottomTabNavigator();

//  function MyTabs() {
//      return (
//          <Tab.Navigator
//              initialRouteName="Login"
//              screenOptions={{
//                  tabBarActiveTintColor: 'red',
//              }}
//          >
//              {/* <Tab.Screen 
//                  name="Home" 
//                  component={MyStack} 
//                  options={{
//                      tabBarIcon: ({ color, size}) => (
//                          <Entypo name="home" size={30} color={color} />
//                      ),
//                      headerShown: false
//                  }}
//              /> */}
//              <Tab.Screen 
//                  name="Login" 
//                  component={LoginScreen} 
//                  options={{
//                      headerShown: false,
//                  }}
//              />
//          </Tab.Navigator>
//      )
//  }

//  export default function Navigation() {
//      return (
//          <NavigationContainer>
//              <MyTabs />
//          </NavigationContainer>
//      )
//  }