import React from "react";
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Navigation from "./Navigation";
import Toast from "./components/Toast";
import { AuthProvider } from "./context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef,isReadyRef} from './RootNavigation';

export default function App() {
  React.useEffect(() => {
    return () => {
      isReadyRef.current = false
    };
  }, []);
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={()=>{
        isReadyRef.current = true;
      }}
    >
       <Provider store={store}>
      <AuthProvider>
        <PaperProvider>
          <Toast />
          <Navigation/>
        </PaperProvider>
        </AuthProvider>
      </Provider>
    </NavigationContainer>
  );
}

