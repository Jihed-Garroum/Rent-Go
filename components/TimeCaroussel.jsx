import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CurrentTime, ModalVisible, finishDate, setModalVisible, startDate, setCurrentTime } from '../store/bookingSlice';

const { width,height } = Dimensions.get('window');

const TimeCarousel = ({setModalFooterVisible}) => {
  const dispatch = useDispatch();
  const currentTime = useSelector(CurrentTime);
    
  useEffect(() => {}, [dispatch, currentTime]);

  const handleTimeSelection = async (time) => {
    const timer = await dispatch(setCurrentTime(time));
    console.log('after dispatch', timer.payload);
    setModalFooterVisible(false)
  };

  const generateTimes = () => {
    const times = [];
    for (let hour = 0; hour <= 11; hour++) {
      for (let minute of ['00', '30']) {
        const hour12 = hour === 0 ? 12 : hour;
        const timeAM = `${hour12}:${minute} AM`;
        const timePM = `${hour12}:${minute} PM`;
        times.push(timeAM);
        times.push(timePM);
      }
    }
    return times;
  };

  const times = generateTimes();
  const [selectedTime, setSelectedTime] = useState('');

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleTimeSelection(item)} style={[styles.timeBox, item === selectedTime ? styles.selectedTimeBox : null]}>
      <Text style={[styles.timeText, item === selectedTime ? styles.selectedTimeText : null]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Pick up / Return time</Text>
      <FlatList
        data={times}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
      {/* <Text style={styles.selectedTime}>Selected Time: {selectedTime}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    padding: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContainer: {
    alignItems: 'center',
    justifyContent:'center',
    flexGrow:1,
    height:height*0.2
  },
  timeBox: {
    width: 100, // Increased width
    height: 100, // Increased height
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50, // Increased borderRadius
    backgroundColor: '#8c52ff',
    marginHorizontal: 10,
  },
  selectedTimeBox: {
    backgroundColor: '#8c52ff',
  },
  timeText: {
    color: 'white',
    fontSize: 16,
  },
  selectedTimeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedTime: {
    marginTop: 20,
    fontSize: 18,
    color: '#333',
  },
});

export default TimeCarousel;
