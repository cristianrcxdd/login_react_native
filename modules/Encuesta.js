import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Encuesta = ({ evento, onClose }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.eventTitle}>{evento.descripcion}</Text>
      <Text style={styles.question}>¿Qué te pareció el evento? Califica del 1 al 5</Text>
      <TouchableOpacity style={styles.button} onPress={onClose}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  question: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#cf152d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Encuesta;
