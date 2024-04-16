import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaView, StyleSheet } from 'react-native';
import Home from '../page/Home';
import Profile from '../page/Profile';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <SafeAreaView style={styles.container}>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Profile" component={Profile} />
      </Drawer.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
