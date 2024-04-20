import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [loading, setLoading] = useState(false); 
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
    setLoading(true);

    try {
      const response = await axios.post('https://urbacarsrl.org/yop/backend/login.php', {
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
    } finally {
      setLoading(false);
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
      <TouchableOpacity 
        style={[styles.button, loading ? styles.buttonDisabled : null]} 
        onPress={handleLogin} 
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#007bff" /> 
        ) : (
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        )}
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
    backgroundColor: '#FFFFFF', 
  },
  input: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    borderRadius: 5,
    color: '#000000', 
  },
  button: {
    backgroundColor: '#007bff', 
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#a6c8ff', 
  },
  buttonText: {
    color: '#FFFFFF', 
    fontSize: 18,
  },
});
