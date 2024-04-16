import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const usuario = await AsyncStorage.getItem('usuario');
      if (usuario) {
        navigation.navigate('Drawer', { screen: 'Profile', params: { usuario } });
      }
    } catch (error) {
      console.error('Error al verificar la sesión:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://10.40.0.218/estudio/backend/login.php', {
        usuario,
        contrasena,
      });

      if (response.data.success) {
        await AsyncStorage.setItem('usuario', usuario);
        navigation.navigate('Drawer', { screen: 'Profile', params: { usuario } });
      } else {
        Alert.alert('Error', 'Datos incorrectos');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'Hubo un error al intentar iniciar sesión');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={contrasena}
        onChangeText={setContrasena}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF', // Color de fondo blanco
  },
  input: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    borderRadius: 5,
    color: '#000000', // Color de texto negro
  },
  button: {
    backgroundColor: '#007bff', // Color azul
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // Color de texto blanco
    fontSize: 18,
  },
});
