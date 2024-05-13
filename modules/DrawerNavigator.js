import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaView, StyleSheet } from 'react-native';
import Home from '../page/Home';
import Profile from '../page/Profile';

const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#cf152d', 
  },
  drawerContent: {
    flex: 1,
    backgroundColor: '#cf152d',
  },
  drawerItemActive: {
    backgroundColor: '#555555',
  },
});

export default function DrawerNavigator() {
  return (
    <SafeAreaView style={styles.drawerContainer}>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: styles.drawerContent,
          drawerActiveTintColor: '#fff', 
          drawerInactiveTintColor: '#ccc', 
          drawerActiveBackgroundColor: styles.drawerItemActive.backgroundColor, 
        }}
      >
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
    </SafeAreaView>
  );
}
