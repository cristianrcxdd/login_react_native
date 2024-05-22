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
  ActivityIndicator,
  RefreshControl, 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const Event = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState('2024-06-22'); 
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);  
  const [isRefreshing, setIsRefreshing] = useState(false); 

  useEffect(() => {
    fetchEvents('2024-06-22'); 
  }, []);

  const fetchEvents = (date) => {
    setIsLoading(true); 
    fetch(`https://urbacarsrl.org/yop/backend/get_events.php?fecha=${date}`)
      .then((response) => response.json())
      .then((responseJson) => {
        setIsLoading(false);  
        setIsRefreshing(false); 
        if (responseJson.success) {
          setEvents(responseJson.events);
        } else {
          console.error(responseJson.message);
        }
      })
      .catch((error) => {
        setIsLoading(false); 
        setIsRefreshing(false);
        console.error(error);
      });
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.descripcion}</Text>
      <Text style={styles.text}>Hora: {item.hora}</Text>
      <Text style={styles.text}>Lugar: {item.aula}</Text>
      <Text style={styles.text}>Expositor: {item.expositor}</Text>
    </View>
  );

  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

  const dateMapTop = {
    'Día 1': '2024-06-22',
    'Día 2': '2024-06-25',
    'Día 3': '2024-06-26',
  };

  const dateMapBottom = {
    'Día 4': '2024-06-27',
    'Día 5': '2024-06-28',
  };

  const formatDate = (date) => {
    const months = [
      'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 
      'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
    ];
    const [year, month, day] = date.split('-');
    return `${day} DE ${months[parseInt(month, 10) - 1]}`;
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchEvents(selectedDate);
  };

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
<<<<<<< HEAD
          <View style={styles.row}>
            {['Día 1', 'Día 2', 'Día 3'].map((day) => (
              <TouchableOpacity 
                key={day}
                style={[styles.dateButton, isLoading ? styles.disabledDateButton : null]}  
                onPress={() => {
                  if (!isLoading) {  
                    setSelectedDate(dateMap[day]);
                    fetchEvents(dateMap[day]);
                  }
                }}
                disabled={isLoading}  
              >
                <Text style={styles.dateButtonText}>{day}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.row}>
            {['Día 4', 'Día 5'].map((day) => (
              <TouchableOpacity 
                key={day}
                style={[styles.dateButton, isLoading ? styles.disabledDateButton : null]}  
                onPress={() => {
                  if (!isLoading) {  
                    setSelectedDate(dateMap[day]);
                    fetchEvents(dateMap[day]);
                  }
                }}
                disabled={isLoading}  
              >
                <Text style={styles.dateButtonText}>{day}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
=======
  {Object.entries(dateMapTop).map(([day, date]) => (
    <TouchableOpacity 
      key={day}
      style={[styles.dateButton, isLoading ? styles.disabledDateButton : null]}  
      onPress={() => {
        if (!isLoading) {  
          setSelectedDate(date);
          fetchEvents(date);
        }
      }}
      disabled={isLoading}  
    >
      <Text style={styles.dateButtonText}>{day}</Text>
    </TouchableOpacity>
  ))}
</View>

<View style={styles.dateButtons}>
  {Object.entries(dateMapBottom).map(([day, date]) => (
    <TouchableOpacity 
      key={day}
      style={[styles.dateButton, isLoading ? styles.disabledDateButton : null]}  
      onPress={() => {
        if (!isLoading) {  
          setSelectedDate(date);
          fetchEvents(date);
        }
      }}
      disabled={isLoading}  
    >
      <Text style={styles.dateButtonText}>{day}</Text>
    </TouchableOpacity>
  ))}
</View>
>>>>>>> ffefde11309e8dc209f7c17d32ac8656ec00d014

        {selectedDate && (
          <Text style={styles.selectedDateText}>Eventos del {formatDate(selectedDate)}</Text>
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
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
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
    marginHorizontal: 20,  
    marginBottom: 20,  
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dateButton: {
    paddingHorizontal: 10,  
    paddingVertical: 10,  
    borderRadius: 15,  
    backgroundColor: '#cf152d',
    flex: 1, 
    marginHorizontal: 5,  
  },
  disabledDateButton: {
    backgroundColor: '#e0e0e0', 
  },
  dateButtonText: {
    textAlign: 'center',  
    fontSize: 14,  
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
