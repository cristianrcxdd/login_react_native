import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaView, StyleSheet } from 'react-native';
import Home from '../page/Home';
import Profile from '../page/Profile';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen 
        name="Home" 
        component={Home} 
        options={{ title: 'Inicio' }} 
      />
      <Drawer.Screen 
        name="Profile" 
        component={Profile} 
        options={{ title: 'Perfil' }} 
      />
    </Drawer.Navigator>
  );
}
