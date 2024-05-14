import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  SafeAreaView, 
  Dimensions, 
  TouchableOpacity, 
  Platform, 
  StatusBar,
  Linking,
  ActivityIndicator, // Importa ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const Event = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState('2024-06-01'); 
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);  

  useEffect(() => {
    fetchEvents('2024-06-01'); 
  }, []);

  const fetchEvents = (date) => {
    setIsLoading(true); 
    fetch(`https://urbacarsrl.org/yop/backend/get_events.php?fecha=${date}`)
      .then((response) => response.json())
      .then((responseJson) => {
        setIsLoading(false);  
        if (responseJson.success) {
          setEvents(responseJson.events);
        } else {
          console.error(responseJson.message);
        }
      })
      .catch((error) => {
        setIsLoading(false); 
        console.error(error);
      });
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>Hora: {item.hora}</Text>
      <Text style={styles.text}>Descripción: {item.descripcion}</Text>
      <Text style={styles.text}>Aula: {item.aula}</Text>
      <Text style={styles.text}>Expositor: {item.expositor}</Text>
    </View>
  );

  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: statusBarHeight }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Eventos</Text>
        </View>

        <TouchableOpacity 
          style={[styles.downloadButton, isLoading ? styles.disabledDateButton : null]}  
          onPress={() => {
            if (!isLoading) {  
              const url = 'https://urbacarsrl.org/yop/backend/pdfs/cronograma.pdf';
              Linking.openURL(url);
            }
          }}
          disabled={isLoading}  
        >
          <Text style={styles.dateButtonText}>Descargar Cronograma</Text>
        </TouchableOpacity>

        <View style={styles.dateButtons}>
          {['2024-06-01', '2024-06-02', '2024-06-03', '2024-06-04'].map((date) => (
            <TouchableOpacity 
              key={date}
              style={[styles.dateButton, isLoading ? styles.disabledDateButton : null]}  
              onPress={() => {
                if (!isLoading) {  
                  setSelectedDate(date);
                  fetchEvents(date);
                }
              }}
              disabled={isLoading}  
            >
              <Text style={styles.dateButtonText}>{`Día ${date.split('-')[2]}`}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedDate && (
          <Text style={styles.selectedDateText}>Eventos del {selectedDate}</Text>
        )}

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#cf152d" />
          </View>
        ) : (
          <FlatList
            data={events}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#cf152d',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#cf152d',
    paddingHorizontal: 20,
    marginBottom: 20,
    paddingBottom: 15,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 20,
  },
  item: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    width: screenWidth - 40,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  downloadButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    backgroundColor: '#cf152d',
    alignSelf: 'center',
    marginBottom: 20,
  },
  dateButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',  
    marginHorizontal: 20,  
    marginBottom: 20,  
  },
  dateButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    backgroundColor: '#cf152d',
    flex: 1, 
    marginHorizontal: 5,  
  },
  disabledDateButton: {
    backgroundColor: '#e0e0e0', 
  },
  dateButtonText: {
    textAlign: 'center',  
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
});

export default Event;
