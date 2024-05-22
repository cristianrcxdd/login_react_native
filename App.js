import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './modules/DrawerNavigator';
import Login from './page/Login';
import Event from './page/Event';
import Support from './page/Support'; 
import Inscription from './page/Inscription';
import Exhibitors from './page/Exhibitors';

import { BackHandler, Alert } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Cerrar aplicación', '¿Desea salir de la aplicación?', [
        {
          text: 'No',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Sí',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="Login"
          component={Login} 
          options={{ 
            gestureEnabled: false, 
          }} 
        />
        <Stack.Screen 
          name="Drawer" 
          component={DrawerNavigator} 
          options={{ 
            gestureEnabled: false, 
            headerLeft: null 
          }} 
        />
        <Stack.Screen 
          name="Event" 
          component={Event} 
        />
        <Stack.Screen 
          name="Support" 
          component={Support}
        />
        <Stack.Screen
          name="Inscription"
          component={Inscription}
        />
        <Stack.Screen
          name="Exhibitors"
          component={Exhibitors}
        />    
      </Stack.Navigator>
    </NavigationContainer>
  );
}
