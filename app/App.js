import React, { useEffect } from "react";
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Navigation from "./Navigation";
import Toast from "./components/Toast";
import { AuthProvider } from "./context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef, isReadyRef } from './RootNavigation';
import { registerRootComponent } from 'expo';
import messaging from '@react-native-firebase/messaging';
import { Alert } from "react-native";

export default function App() {
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  useEffect(() => {
    isReadyRef.current = false;


    /* if (requestUserPermission) {
      messaging().getToken().then(token => {
        console.log(token);
      })
    } else {
      console.log("fail token");
    }

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe; */


  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
    >
      <Provider store={store}>
        <AuthProvider>
          <PaperProvider>
            <Toast />
            <Navigation />
          </PaperProvider>
        </AuthProvider>
      </Provider>
    </NavigationContainer>
  );
}

registerRootComponent(App);