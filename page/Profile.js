import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Profile({ route }) {
  const { usuario } = route.params;
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('usuario');
    navigation.navigate('Login');
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Perfil', 
      headerTitleAlign: 'right', 
      headerStyle: {
        backgroundColor: '#cf152d', 
      },
      headerTintColor: '#FFFFFF', 
      headerTitleStyle: {
        fontWeight: 'bold', 
      },
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text>Bienvenido {usuario} a tu perfil</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#cf152d', 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF', 
  },
  button: {
    backgroundColor: '#dc3545', 
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF', 
    fontSize: 18,
  },
});
