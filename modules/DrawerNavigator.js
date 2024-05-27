import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { SafeAreaView, StyleSheet, View, Image } from 'react-native';
import Home from '../page/Home';
import Profile from '../page/Profile';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  drawerItem: {
    backgroundColor: '#cf152d',
  },
  drawerItemActive: {
    backgroundColor: '#555555',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 320, 
    height: 90, 
    resizeMode: 'contain',
  },
  drawerItemLabel: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    <View style={styles.logoContainer}>
      <Image source={{ uri: 'https://i.postimg.cc/5NMpp0rv/logo-jets.png' }} style={styles.logo} />
    </View>
    <DrawerItem 
      label="Inicio" 
      labelStyle={styles.drawerItemLabel} 
      onPress={() => props.navigation.navigate('Home')} 
      options={{ title: 'Inicio' }} 
      icon={({ color, size }) => (
        <Icon name="home" color={color} size={size} />
      )}
      style={[styles.drawerItem, props.state.routeNames[props.state.index] === 'Home' && styles.drawerItemActive]}
      activeBackgroundColor={'#555555'} 
    />
    <DrawerItem 
      label="Perfil" 
      labelStyle={styles.drawerItemLabel} 
      onPress={() => props.navigation.navigate('Profile')} 
      options={{ title: 'Perfil' }} 
      icon={({ color, size }) => (
        <Icon name="user" color={color} size={size} />
      )}
      style={[styles.drawerItem, props.state.routeNames[props.state.index] === 'Profile' && styles.drawerItemActive]}
      activeBackgroundColor={'#555555'} 
    />
  </DrawerContentScrollView>
);

export default function DrawerNavigator() {
  return (
    <SafeAreaView style={styles.drawerContainer}>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: styles.drawerContent,
          drawerActiveTintColor: '#fff', 
          drawerInactiveTintColor: '#ccc', 
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
