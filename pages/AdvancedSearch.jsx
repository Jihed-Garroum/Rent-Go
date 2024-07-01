import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useNavigation } from '@react-navigation/native';
import { useDispatch,useSelector } from 'react-redux';
import { getAllCarByDate,startDate,finishDate } from '../store/bookingSlice';

const { width, height } = Dimensions.get('window');

const AdvancedSearch = ({
  handleCloseModal,
  selectedFuelType,
  setSelectedFuelType,
  selectedCarClass,
  setSelectedCarClass,
  selectedTransmission,
  setSelectedTransmission
}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const dispatch = useDispatch();
  const selectedStartDate = useSelector(startDate);
  const selectedFinishDate = useSelector(finishDate);
  const fuelTypes = ['Diesel', 'Electric', 'Gasoline'];
  const carClasses = ['Economy', 'Compact', 'Premium', 'SUV'];
  const transmissions = ['Automatic', 'Manual'];

  const fetchAvailableCars = async () => {
    try {
      setLoading(true);
      const body = {
        startDate: selectedStartDate,
        endDate: selectedFinishDate,
        typeOfFuel: selectedFuelType,
        Category: selectedCarClass,
        Type: selectedTransmission,
        price:priceRange,
      };
      const advancedSearchCars = await dispatch(getAllCarByDate(body));
      handleCloseModal();
      navigation.navigate('CarsList', { filteredCars: advancedSearchCars.payload });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.Title}>Advanced Search</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsText}>Use the filters below to narrow down your car rental search.</Text>
        </View>
        <View style={styles.filterContainer}>
          <Text style={styles.filterTitle}>Fuel Type</Text>
          <View style={styles.buttonRow}>
            {fuelTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[styles.button, selectedFuelType === type && styles.selectedButton]}
                onPress={() => setSelectedFuelType(selectedFuelType === type ? '' : type)}
              >
                <Text style={[styles.buttonText, selectedFuelType === type && styles.selectedButtonText]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.filterContainer}>
          <Text style={styles.filterTitle}>Car Class</Text>
          <View style={styles.buttonRow}>
            {carClasses.map((carClass) => (
              <TouchableOpacity
                key={carClass}
                style={[styles.button, selectedCarClass === carClass && styles.selectedButton]}
                onPress={() => setSelectedCarClass(selectedCarClass === carClass ? '' : carClass)}
              >
                <Text style={[styles.buttonText, selectedCarClass === carClass && styles.selectedButtonText]}>
                  {carClass}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.filterContainer}>
          <Text style={styles.filterTitle}>Transmission</Text>
          <View style={styles.buttonRow}>
            {transmissions.map((type) => (
              <TouchableOpacity
                key={type}
                style={[styles.button, selectedTransmission === type && styles.selectedButton]}
                onPress={() => setSelectedTransmission(selectedTransmission === type ? '' : type)}
              >
                <Text style={[styles.buttonText, selectedTransmission === type && styles.selectedButtonText]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.filterContainer}>
          <Text style={styles.filterTitle}>Price Range</Text>
          <View style={styles.sliderContainer}>
            <MultiSlider
              values={priceRange}
              onValuesChange={(values) => setPriceRange(values)}
              min={0}
              max={1000} // Adjust the max value as needed
              step={10}
              sliderLength={width * 0.8}
              selectedStyle={{ backgroundColor: '#8c52ff' }}
            />
            <Text style={styles.priceRangeText}>{priceRange[0]}DT - {priceRange[1]}DT</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.searchButton} onPress={fetchAvailableCars}>
        {loading ? <ActivityIndicator size="small" color="#ffffff" /> : <Text style={styles.searchButtonText}>Search</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', alignItems: 'center' },
  titleContainer: {   alignSelf: 'flex-start' },
  Title: { fontSize: 22, color: 'black', fontWeight: '900' },
  scrollView: { width: width * 0.9 },
  instructionsContainer: { paddingVertical:height*0.02
  },
  instructionsText: { color: 'black', fontSize: 16, textAlign: 'left' },
  filterContainer: { marginBottom: 20 },
  filterTitle: { color: 'black', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  buttonRow: { flexDirection: 'row', flexWrap: 'wrap' },
  button: { backgroundColor: '#ECECEC', padding: 10, borderRadius: 10, margin: 5 },
  buttonText: { color: 'black' },
  selectedButton: { backgroundColor: '#8c52ff' },
  selectedButtonText: { color: 'white' },
  sliderContainer: { alignItems: 'center' },
  priceRangeText: { marginTop: 10, color: 'black', fontSize: 16 },
  searchButton: { width: width * 0.93, backgroundColor: 'black', padding: 15, borderRadius: 10, alignItems: 'center', marginVertical: height * 0.02 },
  searchButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});

export default AdvancedSearch;
