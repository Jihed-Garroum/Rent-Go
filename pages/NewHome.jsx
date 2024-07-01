import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { Alert, BackHandler, StyleSheet, Text, View, Dimensions, Image, Platform, TextInput, TouchableOpacity, ImageBackground, FlatList, Pressable, ActivityIndicator, Animated } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import ToggleSwitch from '../components/ToggleSwitch.jsx';
import NavBar from '../components/NavBar.jsx';
import { Calendar } from 'react-native-calendars';
import ModalFooter from '../components/ModalFooter.jsx';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import * as Location from 'expo-location';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginContext } from '../context/AuthContext.jsx';
import {
  CurrentTime, LocationModalVisible, LocationRedux, MarkedDates, ModalVisible, Predictions, ReturnLocation, ReturnModalVisible, ReturnPredictions, ShowAdditionalRow, finishDate, setIsFocused, setLocation, setLocationModalVisible, setMarkedDates, setModalVisible, setPredictions, setReturnLocation, setReturnModalVisible, setReturnPrediction, setSelectedFinishDate, setSelectedStartDate, setShowAdditionalRow, startDate, getAllCarByDate,
  IsFocused
} from '../store/bookingSlice.js';
import Toast from 'react-native-toast-message';
import ReviewSheet from '../components/ReviewSheet.jsx';
import ModalFirstLaunch from '../components/ModalFirstLaunch.jsx';
const { width, height } = Dimensions.get("window");
const backgroundHeight = Platform.OS === 'android' ? height * 0.68 : height * 0.6;

const NewHome = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const modalVisible = useSelector(ModalVisible);
  const returnModalVisible = useSelector(ReturnModalVisible);
  const location = useSelector(LocationRedux);
  const returnLocation = useSelector(ReturnLocation);
  const predictions = useSelector(Predictions);
  const returnPredictions = useSelector(ReturnPredictions);
  const selectedStartDate = useSelector(startDate);
  const selectedFinishDate = useSelector(finishDate);
  const currentTime = useSelector(CurrentTime);
  const showAdditionalRow = useSelector(ShowAdditionalRow);
  const markedDates = useSelector(MarkedDates);
  const locationModalVisible = useSelector(LocationModalVisible);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState('');
  const [locationExists, setLocationExists] = useState(true);
  const [disabledDates, setDisabledDates] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [loadingValidate, setLoadingValidate] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bookingReview, setBookingReview] = useState([]);
  const [refreshReview, setRefreshReview] = useState(false)
  const [loadingAll, setLoadingAll] = useState(false);
  const refRBSheet = useRef()
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  ///////////////////MODAL FIRST LAUNCH //////////////////
  const [modalFirstLaunchVisible, setModalFirstLaunchVisible] = useState(false);
  const closeFirstLaunchModal = async () => {
    try {
      await AsyncStorage.setItem('isFirstLaunch', "false"); // Update to false
      setModalFirstLaunchVisible(false);
      console.log('isFirstLaunch updated to false');
    } catch (error) {
      console.log('Error updating isFirstLaunch:', error);
    }
  };

  const openFirstLaunchModal = () => {
    setModalFirstLaunchVisible(true)
  };
  ////////////////////////////////////////////////////////
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, 10000)

    return () => clearInterval(interval)
  }, []);


  const images = [
    // require('../assets/Karhba.png'),
    require('../assets/bmw.jpg'),
    require('../assets/bmw1.jpg'),
    require('../assets/buggati.jpg'),
    // require('../assets/cardCover.png'),
    require('../assets/dodgecharger.jpg'),
    require('../assets/mustang.jpg'),


    // Add more images as needed
  ];

  useEffect(() => {

    const verifyUser = async () => {
      setLoadingValidate(true);

      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log('No token found');
        const tok = await AsyncStorage.removeItem("token");
        const id = await AsyncStorage.removeItem("userId");
        await setLoginData(false);
        console.log('prrrrr', id, tok)
        // await navigation.navigate("Welcome");
      } else {
        try {
          const response = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_IP}/api/users/VerifyUser`, { token });
          if (response.status === 200) {
            setLoginData(true);
          }
        } catch (error) {
          if (error.response) {
            const { status, data } = error.response;
            if (status === 404) {
              await AsyncStorage.removeItem("token");
              await AsyncStorage.removeItem("userId");
              await setLoginData(false);
              //   await navigation.navigate("Welcome");
            }
          } else {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: 'Internal server error',
            });

            setLoadingValidate(false);
          }
        }
      }

      setLoadingValidate(false);
    };

    verifyUser();
  }, []);

  useEffect(() => {
    setDisabledDates(disablePastDates());
    initializeDates();
  }, []);



  //   const handlerPressBack = ()=>{
  //     Alert.alert("Exit app","Are you sure you want to exit?",[
  //       {
  //         text:"Cancel",
  //         onPress:()=>navigation.navigate('NewHome'),
  //         style:"cancel"
  //       },
  //     {
  //       text:"Exit",
  //       onPress:()=>BackHandler.exitApp()
  //     }
  //     ])
  //     return true
  //   }

  //   useFocusEffect(
  //     useCallback(()=>{
  //       BackHandler.addEventListener("hardwareBackPress",handlerPressBack);
  //       navigation.addListener("gestureEnd",handlerPressBack);
  //       return ()=>{
  //         BackHandler.removeEventListener("hardwareBackPress",handlerPressBack);
  //         navigation.removeListener("gestureEnd",handlerPressBack);
  //   }
  // })
  // )

  const initializeDates = () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const todayString = today.toISOString().split('T')[0];
    const tomorrowString = tomorrow.toISOString().split('T')[0];

    dispatch(setSelectedStartDate(todayString));
    dispatch(setSelectedFinishDate(tomorrowString));

    const initialMarkedDates = {
      [todayString]: { startingDay: true, selected: true, color: '#8c52ff', textColor: 'white' },
      [tomorrowString]: { endingDay: true, selected: true, color: '#8c52ff', textColor: 'white' }
    };

    dispatch(setMarkedDates(initialMarkedDates));
  };

  const calendarTheme = {
    backgroundColor: '#ffffff',
    calendarBackground: '#ffffff',
    textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: '#8c52ff',
    todayTextColor: '#8c52ff',
    arrowColor: '#8c52ff',
  };

  const disablePastDates = () => {
    const today = new Date();
    const disabledDates = {};
    const dateString = today.toISOString().split('T')[0];
    for (let i = 1; i < today.getDate(); i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const disabledDateString = date.toISOString().split('T')[0];
      disabledDates[disabledDateString] = { disabled: true, disableTouchEvent: true };
    }
    return disabledDates;
  };

  const onDayPress = (day) => {
    const selectedDate = new Date(day.dateString);
    const today = new Date();

    if (selectedDate < today) {
      return;
    }

    if (!selectedStartDate || selectedDate < new Date(selectedStartDate)) {
      dispatch(setSelectedStartDate(day.dateString));
      dispatch(setSelectedFinishDate(null));
      dispatch(setMarkedDates({
        [day.dateString]: { startingDay: true, selected: true, color: '#8c52ff', textColor: 'white' },
      }));
    } else if (!selectedFinishDate || selectedDate > new Date(selectedFinishDate)) {
      const startDate = new Date(selectedStartDate);
      const finishDate = new Date(day.dateString);
      const datesToMark = {};
      let currentDate = new Date(startDate);

      while (currentDate <= finishDate) {
        const dateString = currentDate.toISOString().split('T')[0];
        if (dateString === selectedStartDate) {
          datesToMark[dateString] = { startingDay: true, selected: true, color: '#8c52ff', textColor: 'white' };
        } else if (dateString === day.dateString) {
          datesToMark[dateString] = { endingDay: true, selected: true, color: '#8c52ff', textColor: 'white' };
        } else {
          datesToMark[dateString] = { selected: true, color: 'rgba(140, 82, 255, 0.5)', textColor: 'white' };
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      dispatch(setSelectedFinishDate(day.dateString));
      dispatch(setMarkedDates(datesToMark));
    } else {
      dispatch(setSelectedStartDate(null));
      dispatch(setSelectedFinishDate(null));
      dispatch(setMarkedDates({}));
    }
  };



  useEffect(() => {
    if (selectedStartDate && selectedFinishDate) {
      const startDate = new Date(selectedStartDate);
      const endDate = new Date(selectedFinishDate);
      const marked = {};
      let currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        const dateString = currentDate.toISOString().split('T')[0];
        if (dateString === selectedStartDate) {
          marked[dateString] = { startingDay: true, selected: true, color: '#8c52ff', textColor: 'white' };
        } else if (dateString === selectedFinishDate) {
          marked[dateString] = { endingDay: true, selected: true, color: '#8c52ff', textColor: 'white' };
        } else {
          marked[dateString] = { selected: true, color: 'rgba(140, 82, 255, 0.5)', textColor: 'white' };
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      dispatch(setMarkedDates(marked));
    }
  }, [selectedStartDate, selectedFinishDate, dispatch]);

  const openModal = () => {
    dispatch(setModalVisible(true));
  };

  const fetchAvailableCars = async () => {
    try {
      setLoading(true);
      const body = {
        startDate: selectedStartDate,
        endDate: selectedFinishDate,
      };
      const filteredCars = await dispatch(getAllCarByDate(body));
      console.log('Filtered Cars:', filteredCars.payload);
      navigation.navigate('CarsList', {
        filteredCars: filteredCars.payload
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFindCars = () => {
    if (!location) {
      Toast.show({ text2: "You should specify a pickup location", type: "error" })
      return;
    }

    if (!selectedFinishDate) {
      Toast.show({
        type: 'info',
        text1: 'Select Return Date',
        text2: 'Please select a return date to continue.',
      });
      return;
    }
    fetchAvailableCars();
  };

  const fetchLocations = async (searchText) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchText}&components=country:tn&key=${process.env.EXPO_PUBLIC_SERVER_IP_2}`
      );
      dispatch(setPredictions(response.data.predictions));
      dispatch(setReturnPrediction(response.data.predictions));

    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeText = async (text) => {
    dispatch(setLocation(text));
    if (text) {
      await fetchLocations(text);
    } else {
      dispatch(setPredictions([]));
    }
  };

  const handlePredictionPress = (item) => {
    console.log('Selected Location:', item);

    dispatch(setLocation(item.description));
    setLocationExists(true);
    dispatch(setPredictions([]));
    dispatch(setLocationModalVisible(false));
  };

  const handleReturnChangeText = async (text) => {
    dispatch(setReturnLocation(String(text)));
    if (text) {
      await fetchLocations(text);
    } else {
      dispatch(setReturnPrediction([]));
    }
  };

  const handleReturnPredictionPress = (item) => {
    console.log('Selected Return Location:', item);
    dispatch(setReturnLocation(item.description));
    dispatch(setReturnPrediction([]));
    dispatch(setReturnModalVisible(false));
  };

  const getLocation = async () => {


    try {
      setLoading(true);
      setErrorMsg(null);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${process.env.EXPO_PUBLIC_SERVER_IP_2}`);
      const json = response.data;
      if (json.results.length > 0) {
        const addressComponent1 = json.results[0].address_components[1].short_name;
        const addressComponent2 = json.results[0].address_components[2].short_name;
        const concatenatedAddress = addressComponent1 + ', ' + addressComponent2;
        dispatch(setLocation(concatenatedAddress));
        dispatch(setLocationModalVisible(false));
      } else {
        dispatch(setLocation('Location not found'));
      }
    } catch (error) {
      console.error('Error getting location:', error);
      setErrorMsg('Error getting location. Please try again later.');
    } finally {
      setLoading(false);
    }
  };


  const refreshTheReview = () => {
    setRefreshReview(!refreshReview)
  }

  const closeSheet = () => {
    refRBSheet.current.open()
  }

  const shiftReview = () => {
    bookingReview.shift()
  }

  useEffect(() => {
    const getFinishedBookings = async () => {
      const UserId = await AsyncStorage.getItem("userId");
      if (!UserId) {
        return
      }
      try {
        setLoadingAll(true);
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_SERVER_IP}/api/booking/getFinishedBookings`,
          { UserId }
        );
        await setBookingReview(response.data);
        if (response.status === 200) {
          if (response.data.length > 0) {
            await refreshTheReview()
          }
        }
      } catch (error) {
        console.log('Error fetching finished bookings:', error);
      } finally {
        setLoadingAll(false);
      }
    };

    getFinishedBookings();
  }, []);

  useEffect(() => {
    if (bookingReview.length > 0) {
      setTimeout(() => {
        refRBSheet.current.open()
      }, 1000)
    }
  }, [refreshReview])
  useEffect(() => {
    const getFinishedBookings = async () => {
      const UserId = await AsyncStorage.getItem("userId");
      if (!UserId) {
        return
      }
      try {
        setLoadingAll(true);
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_SERVER_IP}/api/booking/getFinishedBookings`,
          { UserId }
        );
        await setBookingReview(response.data);
        if (response.status === 200) {
          if (response.data.length > 0) {
            await refreshTheReview()
          }
        }
      } catch (error) {
        console.log('Error fetching finished bookings:', error);
      } finally {
        setLoadingAll(false);
      }
    };

    getFinishedBookings();
  }, []);

  useEffect(() => {
    if (bookingReview.length > 0) {
      setTimeout(() => {
        refRBSheet.current.open()
      }, 1000)
    }
  }, [refreshReview])



  const value = AsyncStorage.getItem('isFirstLaunch');
  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const value = await AsyncStorage.getItem('isFirstLaunch');
        console.log('Retrieved isFirstLaunch value:', value);
        if (value === "true") { // Check if value is the string "true"
          openFirstLaunchModal();
          console.log("First launch detected, opening modal.");
        }
        console.log("isFirstLaunch current value:", value);
      } catch (error) {
        console.log('Error reading isFirstLaunch:', error);
      }
    }

    if (Platform.OS === 'ios') {
      setTimeout(() => {
        checkFirstLaunch();
      }, 1000)
    }
  }, [value])
  return (
    <View style={styles.container}>
      <View style={styles.content}>

        <FlatList
          ref={flatListRef}
          showsHorizontalScrollIndicator={false}
          data={images}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.background}>
              <ImageBackground style={styles.background} source={item} resizeMode="cover">
                <Image style={styles.logo} source={require('../assets/aqwaWhite.png')} />
              </ImageBackground>
            </View>
          )}
        />
        <View style={styles.filterCardWrapper}>
          <View style={styles.filterCard}>
            <View style={styles.firstRow}>
              <View style={{
                flexDirection: "row"
              }}>
                <Ionicons style={{
                  paddingRight: width * .035
                }} name="car-outline" size={25} color="grey" />
                <Text style={[styles.firstText]}>{!showAdditionalRow ? "Expand Return Station Choices" : "Keep Same Return Station"}</Text>
              </View>
              <ToggleSwitch isEnabled={showAdditionalRow} onToggle={() => dispatch(setShowAdditionalRow(!showAdditionalRow))} />
            </View>
            <View style={styles.separator}></View>
            <View style={styles.space}>
              <Pressable
                style={styles.secondRow}
                onPress={() => {
                  dispatch(setLocationModalVisible(true));
                  dispatch(setPredictions([]));
                }}
              >
                <Ionicons style={{
                  paddingRight: width * .04
                }} name="car-outline" size={25} color="grey" />
                {location ? (
                  <Text style={[styles.firstText,{
                    fontWeight:"600"
                  }]}>{location}</Text>
                ) : (
                  <TextInput
                    style={[styles.additionalText, { color: 'grey',fontWeight:"400" }]}
                    editable={false}
                    placeholder="Choose Pick-up Station"
                  />
                )}

              </Pressable>
            </View>
            <View style={styles.separator}></View>
            <View>
              {showAdditionalRow && (
                <>
                  <Pressable style={styles.additionalRow} onPress={() => dispatch(setReturnModalVisible(true))}>
                    <Ionicons style={{
                      paddingRight: width * .05
                    }} name="add" size={20} color="grey" />
                    <TextInput
                      style={[styles.additionalText, { color: 'black',fontWeight:returnLocation?"600":"normal" }]}
                      editable={false}
                      value={returnLocation}
                      placeholder="Another Return Station"
                    />
                  </Pressable>
                  <View style={styles.separator}></View>
                </>
              )}
            </View>

            <TouchableOpacity style={styles.thirdRow} onPress={openModal}>
              <View style={styles.date}>
                <View style={styles.column}>
                  <View style={{
                    width: "100%", flexDirection: "row",
                    paddingBottom: height * .01
                  }}>
                    <Ionicons name="calendar-outline" size={20} color="grey" style={{
                      paddingRight: width * .05
                    }} />
                    <Text style={styles.dateText}>
                      {selectedFinishDate ? `From  ` : ''}
                      {selectedStartDate && (
                        <Text style={[styles.dateText, { fontWeight: '600', textDecorationLine: "underline",textDecorationColor:"white" }]}>
                          {selectedStartDate}
                        </Text>
                      )}

                      {selectedFinishDate ? `  Until  ` : 'Pick a finish date'}
                      {selectedFinishDate && (
                        <Text style={[styles.dateText, { fontWeight: '600', textDecorationLine: "underline" }]}>
                          {selectedFinishDate}
                        </Text>
                      )}
                    </Text>

                  </View>
                  <View style={{
                    alignSelf: "flex-end", flexDirection: "row"
                  }}>
                    <Ionicons name="time-outline" size={20} color="grey" />
                    <Text style={styles.timeText}>{`${currentTime}`}</Text>
                  </View>
                </View>
              </View>
              {/* <View style={styles.time}>
                <Ionicons name="time-outline" size={25} color="grey" />
                <Text style={styles.timeText}>{`${currentTime}`}</Text>
              </View> */}
            </TouchableOpacity>
            <View style={styles.BtnContainer}>
              <TouchableOpacity style={styles.find} onPress={handleFindCars}>
                {loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Text style={styles.textButton}>Book a Car</Text>
                )}
              </TouchableOpacity>
              {!logindata ? <Pressable onPress={() => navigation.navigate('Welcome')}>
                <Text style={styles.secondText}>Sign in or create account</Text>
              </Pressable> : <View style={{
                height: height * 0.01
              }}></View>}
            </View>
          </View>
        </View>
      </View>
      <NavBar />
      <Modal
        isVisible={modalVisible}
        swipeDirection={['down']}
        style={styles.modal}
        onSwipeComplete={() => dispatch(setModalVisible(false))}
        onBackdropPress={() => dispatch(setModalVisible(false))}>
        <View style={styles.modalContent}>
          <Text style={{
            fontSize: 21,
            fontWeight: '500',
            paddingTop: 10,
          }}>Select a Date</Text>
          <Calendar
            style={styles.calendar}
            enableSwipeMonths={true}
            onDayPress={onDayPress}
            markedDates={{
              ...disabledDates,
              ...markedDates,
            }}
            theme={calendarTheme}
            markingType='period'
          />
          <ModalFooter fetchAvailableCars={handleFindCars} />
        </View>
      </Modal>
      <Modal
        isVisible={locationModalVisible}
        swipeDirection={['down']}
        style={styles.modal}
        onSwipeComplete={() => dispatch(setLocationModalVisible(false))}
        onBackdropPress={() => dispatch(setLocationModalVisible(false))}
      >
        <View style={styles.modalContent2}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              onChangeText={handleChangeText}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoFocus={true}
            />
            {location !== '' && (
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => {
                  dispatch(setLocation(''));
                  dispatch(setPredictions([]));
                }}
              >
                <Ionicons name="close" size={20} color="black" style={styles.clearIcon} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => {/* Handle search action */ }}
            >
              <Ionicons name="search" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.useLocationButton}
            onPress={() => { getLocation(); }}
          >
            {loading ? (
              <ActivityIndicator size="small" color="black" style={{ marginRight: 10 }} />
            ) : (
              <Ionicons name="location-outline" size={20} color="black" />
            )}
            <Text style={styles.useLocationButtonText}>
              {loading ? 'This may take some time' : 'Use My Current Location'}
            </Text>
          </TouchableOpacity>
          <FlatList
            data={predictions}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handlePredictionPress(item)}
                style={styles.predictionContainer}
              >
                <Text style={styles.predictionText}>{item.description}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.place_id}
          />
        </View>
      </Modal>
      <Modal
        isVisible={returnModalVisible}
        swipeDirection={['down']}
        style={styles.modal}
        onSwipeComplete={() => {
          dispatch(setReturnModalVisible(false));
        }}
        onBackdropPress={() => {
          dispatch(setReturnModalVisible(false));
        }}
      >
        <View style={styles.modalContent2}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              onChangeText={handleReturnChangeText}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoFocus={true}
            />
            {returnLocation !== '' && (
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => {
                  dispatch(setReturnLocation(''));
                  dispatch(setReturnPrediction([]));
                }}
              >
                <Ionicons name="close" size={20} color="black" style={styles.clearIcon} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => {/* Handle search action */ }}
            >
              <Ionicons name="search" size={20} color="black" />
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <FlatList
              data={returnPredictions}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleReturnPredictionPress(item)}
                  style={styles.predictionContainer}
                >
                  <Text style={styles.predictionText}>{item.description}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.place_id}
            />
          )}
        </View>
      </Modal>
      {loadingValidate && (
        <View style={styles.loaderValidate}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
      <ReviewSheet refRBSheet={refRBSheet} bookingReview={bookingReview} refreshTheReview={refreshTheReview} closeSheet={closeSheet} shiftReview={shiftReview} />
      <ModalFirstLaunch modalFirstLaunchVisible={modalFirstLaunchVisible} closeFirstLaunchModal={closeFirstLaunchModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    overflow: 'hidden', // Ensure the animation stays within the bounds

  },
  background: {
    width: width * 1,
    height: backgroundHeight,
    alignItems: 'center',
  },
  logo: {
    width: width * 0.7,
    height: height * 0.2,
    position: 'absolute',
    top: 25
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: width * 1,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    width: width * .9,
    paddingTop: height * .03,
    // backgroeundColor: '#f9f9f9',
    // borderRadius: 10,
    // shadowColor: "#000",
    alignSelf: "center",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    // backgroundColor:"red",
    fontWeight: '400',
  },
  filterCardWrapper: {
    flex: 1,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 10 : 11,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  filterCard: {
    borderRadius: 20,
    width: width * 1,
    backgroundColor: 'white',
    // justifyContent:'space-between',
    // alignItems:'stretch',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  firstRow: {
    height: height * 0.1,
    paddingHorizontal: width * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: "grey",
  },
  secondRow: {
    height: height * 0.1,
    paddingHorizontal: width * 0.05,
    flexDirection: 'row',
    gap: 0,
    borderBottomColor: "grey",
    // backgroundColor:'red',
    alignItems: "center",
    width: width * 1
  },
  thirdRow: {
    height: height * 0.1,
    // paddingHorizontal: width * 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: "grey",
    paddingRight: width * 0.12
  },
  date: {
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.65,
    height: height * 0.078,
    paddingLeft: 20,
  },
  time: {
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: width * 0.06
  },
  find: {
    width: width * 0.93,
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.065,
    backgroundColor: 'black',
    borderRadius: 15,

  },
  textButton: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    // height: height * 0.7,
    height: Platform === 'ios' ? height * 0.7 : height * 0.8
  },
  calendar: {
    width: width * 1
  },
  markedDay: {
    backgroundColor: 'rgba(140, 82, 255, 0.5)',
    borderRadius: 10
  },
  markedDayText: {
    color: 'white'
  },
  firstText: {
    fontSize: 15,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '600',
    // textDecorationLine:
  },
  BtnContainer: {
    alignItems: 'center',
    marginTop: height * 0.01,
    marginBottom: height * 0.01,
    gap: Platform.OS === "android" ? 17 : 7
  },
  secondText: {
    fontSize: 12,
    fontWeight: '500',
    textDecorationLine: 'underline'
  },
  additionalRow: {
    height: height * 0.1,
    paddingHorizontal: width * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: "grey",
  },
  additionalText: {
    fontSize: 15,
    fontWeight: '400',
    width: width * 1
  },
  loadingIndicator: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: height * 0.1,
  },
  prediction: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 5,
  },
  predictionList: {
    maxHeight: 200,
  },
  modalContent2: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: Platform.OS === 'ios' ? height * 0.7 : height * 0.5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: height * 0.06,
    borderColor: IsFocused ? '#8c52ff' : 'gray',
    borderWidth: IsFocused ? 1.5 : 0.6,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingRight: 40,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  clearIcon: {
    marginRight: width * 0.08
  },
  predictionContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  predictionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  useLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderRadius: 5,
    paddingVertical: height * 0.02,
    marginBottom: 10,
  },
  useLocationButtonText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    // paddingHorizontal: width * 0.065,
    // paddingBottom:height*0.04
  },
  // space:{
  //   marginVertical:height*0.02
  // },
  loaderValidate: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  separator: {
    width: width * 0.9,
    // borderWidth: 0.3,
    backgroundColor: "lightgrey",
    height: height * .0015,
    alignSelf: 'center',
    borderColor: 'lightgrey',
    opacity: 0.5
  }
});

export default NewHome;
