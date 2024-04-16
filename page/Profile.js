import React from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';

export default function Profile({ route }) {
  const { usuario } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text>Bienvenido {usuario} a tu perfil</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
