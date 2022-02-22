import React from "react";
import { } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { AuthProvider } from './providers/AuthProvider';
import CreateAccountScreen from './screens/CreateAccountScreen';


export default function App() {
    const [loaded] = useFonts({
                    'poppins': require('./assets/fonts/Poppins-Regular.ttf'),
                    'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
                    'poppins-light': require('./assets/fonts/Poppins-Light.ttf'),
                    'poppins-medium': require('./assets/fonts/Poppins-Medium.ttf'),
                    'poppins-semi-bold': require('./assets/fonts/Poppins-SemiBold.ttf'),
                    'poppins-extra-bold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
                });
     if (!loaded) {
          return null;
      }
  return (
    <AuthProvider>
      <CreateAccountScreen/>
    </AuthProvider>
  );
}


