import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';

export default function Profile({ route }) {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [certificados, setCertificados] = useState([]);
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
    obtenerCertificados();
  }, []);

  const obtenerCertificados = async () => {
    try {
      const usuario = await AsyncStorage.getItem('usuario');
      const response = await fetch('http://192.168.0.7/estudio/backend/get_certificado.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario }),
      });
      const data = await response.json();
      if (data.success) {
        setCertificados(data.certificados);
      } else {
        console.error('Error al obtener los certificados:', data.message);
      }
    } catch (error) {
      console.error('Error al obtener los certificados:', error);
    }
  };

  const handleCertificadoClick = async (nro_certificado) => {
    try {
      const usuario = await AsyncStorage.getItem('usuario');
      const url = `http://192.168.0.7/estudio/backend/download_certificado.php?usuario=${usuario}&nro_certificado=${nro_certificado}`;
      await WebBrowser.openBrowserAsync(url);
    } catch (error) {
      console.error('Error al descargar el certificado:', error);
    }
  };

  const renderCertificados = () => {
    if (!certificados || certificados.length === 0) {
      return <Text style={styles.noCertificadosText}>Sin certificados registrados</Text>;
    }

    return certificados.map((certificado, index) => (
      <TouchableOpacity key={index} onPress={() => handleCertificadoClick(certificado.nro_certificado)}>
        <View style={styles.certificadoContainer}>
          <Image source={require('../images/pdf_download.png')} style={styles.certificadoImage} />
          <Text style={styles.gestionText}>{certificado.gestion}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

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
        <View style={styles.certificadosContainer}>
          {renderCertificados()}
        </View>
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
  certificadosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  certificadoContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 20,
  },
  certificadoImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  gestionText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noCertificadosText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});