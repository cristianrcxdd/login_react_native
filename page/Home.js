import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function Home({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Inicio', 
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
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Eventos')}>
          <Icon name="calendar" size={50} color="#007bff" />
          <Text style={styles.boxText}>Eventos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Expositores')}>
          <Icon name="users" size={50} color="#007bff" />
          <Text style={styles.boxText}>Expositores</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
  },
  boxText: {
    marginTop: 10,
    fontSize: 18,
    color: '#007bff',
  },
});
