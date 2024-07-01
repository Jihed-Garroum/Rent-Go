import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet, Text, View, Pressable, Dimensions, KeyboardAvoidingView, ScrollView, Image, LayoutAnimation, TextInput,
  TouchableOpacity, Modal, Platform
} from 'react-native';
import { Ionicons, Entypo,MaterialIcons } from '@expo/vector-icons';
import PhoneInput from '../components/PhoneInput';
import { useSelector, useDispatch } from 'react-redux';
import {
  CarId, CreateBooking, CurrentTime, LocationRedux, MarkedDates, ReturnLocation, finishDate, startDate,
} from '../store/bookingSlice';
import { getOnecarById } from '../store/carFetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getOneById } from '../store/userSlice';
import ValidationSheet from '../components/ValidationSheet';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('screen');

const ReviewAndBook = ({ route }) => {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);
  const [carData, setCarData] = useState({});
  const [data, setData] = useState({});
  const [paymentUrl, setPaymentUrl] = useState(null);
  const navigation = useNavigation();
  const [errors, setErrors] = useState({}); // Validation errors

  const [additionalDetails, setAdditionalDetails] = useState({
    companyName: '',
    streetAddress: '',
    postalCode: '',
    city: '',
    flightNumber: '',
  });
  const additionalDriver=route.params.additionalDriver
  console.log('hello',additionalDriver)
  const total = route.params.total;
  const carId = useSelector(CarId);
  const location = useSelector(LocationRedux);
  const returnLocation = useSelector(ReturnLocation);
  const currentTime = useSelector(CurrentTime);
  const start = useSelector(startDate);
  const finish = useSelector(finishDate);
  const refRBSheet = useRef(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formattedStartDate = `Date: ${formatDate(start)}`;
  const formattedFinishDate = `Date: ${formatDate(finish)}`;

  const markedDates = useSelector(MarkedDates);

  const markedDatesArray = Object.entries(markedDates).map(([dateString, dateInfo]) => ({
    date: dateString,
    ...dateInfo,
  }));

  const getUser = async () => {
    try {
      const Id = await AsyncStorage.getItem('userId');
      const getData = await dispatch(getOneById(Id));
      setData(getData.payload);
    } catch (error) {
      console.error('Error retrieving user ID:', error);
    }
  };

  const fetchCarDetails = async () => {
    const carData = await dispatch(getOnecarById(carId));
    setCarData(carData.payload);
  };

  const Payment = async () => {
    try {
      const response = await fetch(
        "https://api.konnect.network/api/v2/payments/init-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": `66560befc88e628f019489dd:XuYXHIelSFbSWxM2nZaUvaHtrrMOtxlg`
          },
          body: JSON.stringify({
            receiverWalletId: '66560befc88e628f019489eb',
            token: "TND",
            amount: total * 1000,
            type: "immediate",
            acceptedPaymentMethods: [
              "wallet",
              "bank_card",
              "e-DINAR"
            ],
            lifespan: 10,
            checkoutForm: true,
            addPaymentFeesToAmount: true,
            successUrl: "https://dev.konnect.network/gateway/payment-success",
            failUrl: "https://dev.konnect.network/gateway/payment-failure",
            theme: "light"
          })
        }
      );

      return response;
    } catch (error) {
      console.error('Error initiating payment:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchCarDetails();
    getUser();
  }, []);

  const handlePress = () => {
    setShowDetails(!showDetails);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const handleTextChange = (fieldName, text) => {
    setAdditionalDetails((prevState) => ({
      ...prevState,
      [fieldName]: text,
    }));
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!additionalDetails.streetAddress) newErrors.streetAddress = 'Street address is required';
    if (!additionalDetails.postalCode) newErrors.postalCode = 'Postal code is required';
    if (!additionalDetails.city) newErrors.city = 'City is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleCreateBooking = async () => {
    if (validateInputs()) {
      try {
        const paymentResponse = await Payment();

        if (paymentResponse.ok) {
          console.log('hhhhhh',paymentResponse.ok)
          const paymentResult = await paymentResponse.json();

          setPaymentUrl(paymentResult.payUrl);

          await dispatch(CreateBooking({
            from: location,
            to: returnLocation,
            startDate: start,
            endDate: finish,
            time: currentTime,
            companyName: additionalDetails.companyName,
            address: additionalDetails.streetAddress,
            postalCode: additionalDetails.postalCode,
            flightNumber: additionalDetails.flightNumber,
            city: additionalDetails.city,
            name: data.userName,
            Email: data.email,
            rentalTime: currentTime,
            returnTime: currentTime,
            phoneNumber: data.phoneNumber,
            amount: total,
            UserId: data.id,
            CarId: carData.id,
            companyName: additionalDetails.companyName,
          }));
        console.log('tnaket',refRBSheet)
          // navigation.navigate('NewHome')
        } else {
          const paymentResult = await paymentResponse.json();
          console.error('Payment initialization failed:', paymentResult);
        }
      } catch (error) {
        if (error.response) {
          console.log('Error response:', error.response.data);
        } else if (error.request) {
          console.log('Error request:', error.request);
        } else {
          console.log('Error message:', error.message);
        }
      }
    }
  };

  const handleNavigationStateChange =async (navState) => {
    if (navState.url.includes("https://dev.konnect.network/gateway/payment-success")) {
      setPaymentUrl(null);
      await refRBSheet.current.open();
      console.log('zab w kh',refRBSheet)

    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }} behavior="padding">
      <Modal
        animationType="slide"
        transparent={true}
        visible={!!paymentUrl}
        
        onRequestClose={() => setPaymentUrl(null)}
      >
        <View style={styles.modalView}>
          <WebView
            source={{ uri: paymentUrl }}
            onNavigationStateChange={handleNavigationStateChange}
            style={{ flex: 1, width: width * 0.9 }}
          />
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setPaymentUrl(null)}
          >
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
        </View>
      </Modal>
      <View style={styles.header}>
        <Pressable style={styles.arrowContainer} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle" size={45} color="black" />
        </Pressable>
      </View>
      <ScrollView style={styles.info}>
        <Text style={styles.title}>Review and book</Text>
        <Pressable onPress={handlePress} style={styles.viewMore}>
          <View style={styles.carContainer}>
            <Image source={{ uri: carData?.media }} style={styles.carImage} />
            <View style={styles.carDetails}>
              <Text style={styles.title}>{carData?.brand} {carData?.model}</Text>
              <Text style={styles.description}>or similar | convertible</Text>
              <Text style={styles.duration}>{markedDatesArray?.length - 1} Rental day(s)</Text>
            </View>
            <Ionicons name={showDetails ? 'chevron-up-circle-outline' : 'chevron-down-circle-outline'} size={24} color="black" style={styles.arrowIcon} />
          </View>
          {showDetails && (
            <View style={styles.additionalDetails}>
              <View style={styles.detailsSection}>
                <Ionicons name="location-outline" size={24} color="black" style={styles.icon} />
                <View style={styles.detailsText}>
                  <Text style={styles.detailsTitle}>Pickup Station</Text>
                  <Text style={styles.detailsInfo}>{location}</Text>
                  <Text style={styles.detailsInfo}>{formattedStartDate}</Text>
                  <Text style={styles.detailsInfo}>Time: {currentTime}</Text>
                </View>
              </View>
              <View style={styles.detailsSection}>
                <Ionicons name="return-down-back-outline" size={24} color="black" style={styles.icon} />
                <View style={styles.detailsText}>
                  <Text style={styles.detailsTitle}>Return Station</Text>
                  <Text style={styles.detailsInfo}>{returnLocation ? returnLocation : 'Same as Pickup station'}</Text>
                  <Text style={styles.detailsInfo}>{formattedFinishDate}</Text>
                  <Text style={styles.detailsInfo}>Time: {currentTime}</Text>
                </View>
              </View>
              <View style={styles.bookingOverview}>
                <Text style={styles.detailsTitle}>Booking Overview</Text>
                <View style={styles.options}>
                {additionalDriver ? (
        <View style={styles.option}>
          <Entypo name="check" size={24} color="green" />
          <Text>Additional driver : Yes</Text>
        </View>
      ) : (
        <View style={styles.option}>
          <MaterialIcons name="cancel" size={24} color="red" />
          <Text>Additional driver : No</Text>
        </View>
      )}
                  <View style={styles.option}>
                    <Entypo name="check" size={24} color="green" />
                    <Text>Best price : Yes</Text>
                  </View>
                  <View style={styles.option}>
                    <Entypo name="check" size={24} color="green" />
                    <Text>Stay flexible : Yes</Text>
                  </View>
                  <View style={styles.option}>
                    <Ionicons name="card-outline" size={24} color="black" />
                    <Text>Amount paid : {total.toFixed(2)} DT</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </Pressable>
        <Text style={styles.title}>Driver Details</Text>
        <View style={styles.driverInfo}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputTitle}>Company Name (optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Company Name"
              value={additionalDetails?.companyName}
              onChangeText={(text) => handleTextChange('companyName', text)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputTitle}>Full name</Text>
            <TextInput
              style={styles.disabledInput}
              placeholder="Full name"
              value={data.userName}
              editable={false}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput
              editable={false}
              value={data.email}
              style={styles.disabledInput}
              placeholder="Email"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputTitle}>Phone Number</Text>
            <PhoneInput phoneNumber={data.phoneNumber} />
          </View>
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.title}>Invoicing address</Text>
          <View style={styles.driverInfo}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputTitle}>Street address</Text>
              <TextInput
                style={[styles.input, errors.streetAddress && { borderColor: 'red' }]} 
                placeholder="Example: Street 123C"
                value={additionalDetails.streetAddress}
                onChangeText={(text) => handleTextChange('streetAddress', text)}
              />
              {errors.streetAddress && <Text style={styles.errorText}>{errors.streetAddress}</Text>} 
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputTitle}>Postal code</Text>
              <TextInput
                style={[styles.input, errors.postalCode && { borderColor: 'red' }]} 
                placeholder="Postal code"
                value={additionalDetails.postalCode}
                onChangeText={(text) => handleTextChange('postalCode', text)}
              />
              {errors.postalCode && <Text style={styles.errorText}>{errors.postalCode}</Text>} 
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputTitle}>City</Text>
              <TextInput
                style={[styles.input, errors.city && { borderColor: 'red' }]} // Show error
                placeholder="City"
                value={additionalDetails.city}
                onChangeText={(text) => handleTextChange('city', text)}
              />
              {errors.city && <Text style={styles.errorText}>{errors.city}</Text>} 
            </View>
          </View>
        </View>
        <View style={styles.flight}>
          <View style={styles.flightContainer}>
            <Ionicons name="warning-outline" size={24} color="black" />
            <View style={styles.text}>
              <Text style={styles.flightTitle}>Recommended for travelers</Text>
              <Text style={styles.detailsText}>For Airport rental, we highly recommend adding a flight Number
                in case of delay or flight cancellation.
              </Text>
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputTitle}>Flight number</Text>
            <TextInput
              value={additionalDetails.flightNumber}
              onChangeText={(text) => handleTextChange('flightNumber', text)}
              style={styles.input}
              placeholder="Flight number"
            />
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.optionWrapper}>
            <Text style={styles.optionsTitle}>Total</Text>
            <Text style={styles.optionsTitle}>{total.toFixed(2)} DT</Text>
          </View>
          <Text style={styles.important}>
            IMPORTANT INFORMATION about your PREPAID reservation:
            prepaid rates are subject to the following cancellation and no-show fees.
            Please note that the cancellation fees listed below will never exceed the total
            prepaid amount:
          </Text>
          <Text style={styles.important}>
            <Text style={styles.bullet}>•</Text> When booking is cancelled, a fee of TND {total.toFixed(2)} will be charged. The remaining prepaid amount in excess of {total.toFixed(2)} will be refunded.
          </Text>
          <Text style={styles.important}>
            <Text style={styles.bullet}>•</Text> No refund for No-Show: No refund will be issued in case of failure to pick up your vehicle (no-show) or cancellation after the scheduled pick-up time.
          </Text>
          <Text style={styles.important}>
            <Text style={styles.bullet}>•</Text> No refund for unused rental days: No refund or credits will be issued for unused rental days (late pick-up or early return) once the vehicle is rented.
          </Text>
          <Text style={styles.important}>
            I have read and accept the rental information, the terms and conditions
            and the privacy policy, and I acknowledge that I'm booking a prepaid rate,
            where the total rental price is immediately charged to the credit or debit card
            I provided.
          </Text>
          <Pressable style={styles.find} onPress={handleCreateBooking}>
            <Text style={styles.textButton}>Pay and book</Text>
          </Pressable>
        </View>
      </ScrollView>
      <ValidationSheet refRBSheet={refRBSheet} />
    </KeyboardAvoidingView>
  );
};

export default ReviewAndBook;

const styles = StyleSheet.create({
  arrowContainer: {
    paddingHorizontal: 5,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  title: {
    fontSize: 22,
    color: 'black',
    fontWeight: '900',
  },
  info: {
    paddingTop: 0.2,
    paddingBottom: 0.5,
    paddingHorizontal: width * 0.06,
  },
  viewMore: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  carContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  carImage: {
    width: width * 0.28,
    height: height * 0.12,
    marginRight: 10,
    borderRadius: 5,
  },
  carDetails: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    marginBottom: 3,
  },
  duration: {
    fontSize: 14,
    color: 'grey',
  },
  additionalDetails: {
    marginTop: height * 0.025,
    paddingHorizontal: width * 0.06,
  },
  arrowIcon: {
    marginLeft: 'auto',
  },
  detailsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  detailsText: {
    flex: 1,
  },
  detailsTitle: {
    paddingTop: height * 0.01,
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsInfo: {
    fontSize: 14,
    color: 'grey',
  },
  bookingOverview: {
    borderTopWidth: 0.2,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  options: {
    paddingVertical: height * 0.017,
    gap: 5,
  },
  driverInfo: {
    marginVertical: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: height * 0.06,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  disabledInput: {
    height: height * 0.06,
    borderColor: '#ccc',
    backgroundColor: '#EAECF0',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  addCreditCardButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  cardIcon: {
    marginRight: 10,
  },
  addCreditCardText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  creditCard: {
    paddingVertical: height * 0.03,
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
  },
  addressContainer: {
    marginVertical: height * 0.03,
    borderBottomWidth: 0.2,
  },
  flightContainer: {
    paddingHorizontal: width * 0.06,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    justifyContent: 'flex-start',
    gap: 20,
  },
  iconStyle: {
    marginRight: 10,
  },
  flightTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  detailsText: {
    fontSize: 12,
  },
  text: {
    paddingVertical: height * 0.02,
    gap: 7,
    marginLeft: 10,
    flex: 1,
  },
  flight: {
    borderBottomWidth: 0.2,
    paddingBottom: height * 0.035,
    gap: 15,
  },
  optionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  optionsTitle: {
    fontWeight: '800',
    fontSize: 16,
  },
  textButton: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
  find: {
    width: width * 0.93,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 50,
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: 'black',
  },
  important: {
    color: 'grey',
    marginVertical: height * 0.01,
    fontSize: 12,
  },
  bullet: {
    marginRight: 5,
    fontWeight: 'bold',
    color: 'grey',
  },
  header: {
    height: Platform.OS === 'ios' ? height * 0.12 : height * 0.08,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonClose: {
    backgroundColor: 'black',
    width: width * 0.93,
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.065,
    backgroundColor: 'black',
    borderRadius: 15,
  },
  textStyle: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
  },
});
