import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native'; // Importa StatusBar
import AppStack from './src/Routes/AppStack.tsx';

import 'react-native-gesture-handler';
import { AuthProvider } from './src/Context/AuthContext.js';
import SplashScreen from 'react-native-splash-screen';
import { ThemeProvider, ThemeContext } from './src/Components/themeContext.tsx';

const AppStatusBar = () => {
  const { isDarkMode } = useContext(ThemeContext);
  
  useEffect(() => {
    StatusBar.setBarStyle( 'light-content');
    
  }, [isDarkMode]);

  return null;
};

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <NavigationContainer>
          <AppStatusBar />
          <AppStack />
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
}
