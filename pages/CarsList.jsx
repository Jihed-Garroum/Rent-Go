import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, Pressable, ScrollView, Platform, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import CarCard from '../components/CarCard';
import moment from 'moment';
import BottomSheets from '../components/BottomSheets';
import { useDispatch, useSelector } from 'react-redux';
import { CurrentTime, LocationRedux, finishDate, startDate, getAllCarByDate } from '../store/bookingSlice';
import { Video } from 'expo-av';
import FilterButtons from '../components/FilterButtons';

const { height, width } = Dimensions.get('screen');

const CarsList = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { filteredCars: initialFilteredCars } = route.params || {};

  const location = useSelector(LocationRedux);
  const selectedStartDate = useSelector(startDate);
  const selectedFinishDate = useSelector(finishDate);
  const currentTime = useSelector(CurrentTime);

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const bottomSheetRef = useRef();
  const [loading, setLoading] = useState(false);
  const [filteredCars, setFilteredCars] = useState(initialFilteredCars || []);
  const [visibleCars, setVisibleCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [selectedFuelType, setSelectedFuelType] = useState('');
  const [selectedCarClass, setSelectedCarClass] = useState('');
  const [selectedTransmission, setSelectedTransmission] = useState('');

  const dispatch = useDispatch();
  const carsPerPage = 10;

  useEffect(() => {
    setFilteredCars(initialFilteredCars);
    setVisibleCars(initialFilteredCars.slice(0, carsPerPage));
  }, [initialFilteredCars]);

  const applyFilters = async () => {
    try {
      setLoading(true);
      const body = {
        typeOfFuel: selectedFuelType || undefined,
        Category: selectedCarClass || undefined,
        Type: selectedTransmission || undefined,
        startDate: selectedStartDate,
        endDate: selectedFinishDate,
      };
      console.log('Filter criteria:', body);
      const response = await dispatch(getAllCarByDate(body));
      console.log('Filtered cars:', response.payload);
      if (response.payload && response.payload.length > 0) {
        setFilteredCars(response.payload);
        setVisibleCars(response.payload.slice(0, carsPerPage));
      } else {
        setFilteredCars([]);
        setVisibleCars([]);
      }
      setCurrentPage(1); // Reset to first page after filtering
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreCars = () => {
    if (isFetchingMore || visibleCars.length >= filteredCars.length) return;
    setIsFetchingMore(true);
    const nextPage = currentPage + 1;
    const start = currentPage * carsPerPage;
    const end = start + carsPerPage;
    const newVisibleCars = filteredCars.slice(start, end);
    setVisibleCars((prevCars) => [...prevCars, ...newVisibleCars]);
    setCurrentPage(nextPage);
    setIsFetchingMore(false);
  };

  const formattedStartDate = moment(selectedStartDate).format('D MMM');
  const formattedEndDate = moment(selectedFinishDate).format('D MMM');

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current.open();
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20; // 20px offset to trigger early
    if (isBottom) {
      loadMoreCars();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={{
          alignContent:"center",alignItems:"center",justifyContent:"center",height:height*.034,borderColor:"grey",borderWidth:height*.0015,borderRadius:8,marginBottom:height*.02,padding:height*.001
        }} onPress={() => setTimeout(()=>{
          navigation.goBack()
        },200)}>
          <Ionicons name="close" size={25} color="black"  />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Pressable style={styles.update} onPress={handleOpenBottomSheet}>
          <View>
            <Text style={styles.location}>{location}</Text>
            <Text style={styles.date}>{`${formattedStartDate} | ${currentTime} - ${formattedEndDate} | ${currentTime}`}</Text>
          </View>
          <Ionicons name="create" size={24} color="black" style={styles.icon} />
        </Pressable>
        <FilterButtons
          selectedFuelType={selectedFuelType}
          setSelectedFuelType={setSelectedFuelType}
          selectedCarClass={selectedCarClass}
          setSelectedCarClass={setSelectedCarClass}
          selectedTransmission={selectedTransmission}
          setSelectedTransmission={setSelectedTransmission}
          applyFilters={applyFilters}
        />
      </View>
      {loading ? (
        <View style={styles.loaderContainer}>
          <Video
            source={require('../assets/placeholder.mp4')}
            style={styles.video}
            resizeMode="cover"
            isLooping
            shouldPlay
            isMuted={false}
          />
        </View>
      ) : visibleCars.length === 0 ? (
        <View style={styles.noCarsContainer}>
          <Text style={styles.noCarsText}>No cars found.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.list} onScroll={handleScroll} scrollEventThrottle={16}>
          {visibleCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
          {isFetchingMore && (
            <View style={styles.loadingMoreContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
        </ScrollView>
      )}
      <BottomSheets bottomSheetRef={bottomSheetRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {paddingTop:Platform.OS==="android"?height*.02:0,gap: 10, flex: 1, alignItems: 'center' },
  header: { marginTop: Platform.OS === 'ios' ? height * 0.06 : height * 0.0, alignItems: 'flex-start', width, paddingHorizontal: width * 0.05 },
  update: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: width * 0.05, paddingVertical: height * 0.015, alignItems: 'center', backgroundColor: '#ECECEC', width: width * 0.9, borderRadius: 15 },
  location: { fontSize: 13, fontWeight: '600' },
  date: { fontSize: 11 },
  list: { gap: 15, paddingBottom: height * 0.05 },
  icon: {  },
  video: {
    width: width * 0.9,
    height: height * 0.5,
    borderRadius: width * 0.05,
    overflow: 'hidden',
  },
  loaderContainer: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', height: height * 0.8, gap: 15 },
  noCarsContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  noCarsText: { fontSize: 18, fontWeight: 'bold', color: 'gray' },
  loadingMoreContainer: { paddingVertical: 20 },
});

export default CarsList;
