import React from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';

export default function Home() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text>Bienvenido a la pantalla Home</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Color de fondo blanco
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF', // Color de fondo blanco
  },
});
