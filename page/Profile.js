import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Profile({ route }) {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const obtenerNombreCompleto = async () => {
      try {
        const nombre = await AsyncStorage.getItem('nombre_completo');
        setNombreCompleto(nombre);
      } catch (error) {
        console.error('Error al obtener el nombre completo:', error);
      }
    };

    obtenerNombreCompleto();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('nombre_completo');
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
        <Text style={styles.welcomeText}>¡Bienvenido!</Text>
        <View style={styles.nombreCompletoContainer}>
          <Text style={styles.nombreCompleto}>{nombreCompleto}</Text>
          <Ionicons name="school" size={50} color="#cf152d" style={styles.icon} />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
        <Text style={styles.sectionText}>Sección de Certificados</Text>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  nombreCompletoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  nombreCompleto: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    marginBottom: 5,
    marginTop: 30,
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
  sectionText: {
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 20,
  },
});
