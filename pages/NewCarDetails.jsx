import React, { useContext, useRef, useState } from 'react';
import { StyleSheet, Text, View, ScrollView,Image, ImageBackground, Dimensions, Pressable, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { LoginContext } from '../context/AuthContext.jsx';
import SignInModal from '../components/SignInModal.jsx';
import CustomCheckbox from '../components/CustomCheckbox.jsx';
import Options from '../components/Options';
import Options2 from '../components/Options2';
import { MarkedDates } from '../store/bookingSlice';

const { height, width } = Dimensions.get("screen");

const NewCarDetails = ({ route }) => {
  const { logindata } = useContext(LoginContext);
  const navigation = useNavigation();
  const car = route.params.car;
  const bottomSheetRef = useRef();
  const [additionalDriver, setAdditionalDriver] = useState(false);
  const [mileagePackage, setMileagePackage] = useState("bestPrice");

  const markedDates = useSelector(MarkedDates);

  const markedDatesArray = Object.entries(markedDates).map(([date, properties]) => ({
    date,
    ...properties
  }));

  const calculateTotalPrice = () => {
    const days = markedDatesArray.length ? markedDatesArray.length - 1 : 0;
    let totalPrice = days * car.price;

    if (additionalDriver) {
      totalPrice += days * 15; // Add cost for additional driver
    }
    if (mileagePackage === "+250km") {
      totalPrice += days * 23.5; // Add cost for unlimited kilometers
    }

    return totalPrice;
  };

  const totalPrice = calculateTotalPrice();

  const openBottomSheet = () => {
    bottomSheetRef.current.open();
  };

  return (
    <View style={{ flexGrow: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <ImageBackground resizeMode='cover' style={styles.bg} source={{ uri: car?.media }}>
          <Pressable style={styles.arrowContainer} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-circle" size={45} color="white" />
          </Pressable>
          <View style={styles.secondRow}>
            <Text style={styles.footerDetails}>{car.typeOfFuel}</Text>
          </View>
        </ImageBackground>
        <View style={styles.info}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{car.brand} {car.model}</Text>
            <Text style={styles.titleDetails}>or similar | convertible</Text>
          </View>
          <View style={styles.contentWrapper}>
            <View style={styles.rowOne}>
              <View style={styles.section}>
                <Ionicons name="people" size={24} color="black" style={styles.icon} />
                <Text style={styles.text}>{car.peopleCount} People</Text>
              </View>
              <View style={styles.section}>
                <MaterialCommunityIcons name="car-door" size={22} color="black" />
                <Text style={styles.text}>{car.DoorNumber} Doors</Text>
              </View>
            </View>
            <View style={styles.rowOne}>
              <View style={styles.section}>
                <MaterialCommunityIcons name="bag-carry-on" size={24} color="black" />
                <Text style={styles.text}>{car.Capacity} Bags</Text>
              </View>
              <View style={styles.section}>
                <Image style={{ width: 22, height: 22 }} source={require('../assets/gearblack.png')} />
                <Text style={styles.text}>{car.Type}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.optionWrapper}>
          <Text style={styles.optionsTitle}>Payment option</Text>
        </View>
        <Options />
        <View style={styles.optionWrapper}>
          <Text style={styles.optionsTitle}>Mileage package</Text>
        </View>
        <Options2 totalPrice={totalPrice} markedDates={markedDatesArray} onMileagePackageChange={setMileagePackage} />
        <View style={styles.optionWrapper}>
          <Text style={styles.optionsTitle}>Additional Driver</Text>
          <CustomCheckbox
            label=""
            onChange={(checked) => setAdditionalDriver(checked)}
          />
        </View>
        <View style={styles.optionWrapper}>
          <Text style={styles.optionsTitle}>Total</Text>
          <Text style={styles.optionsTitle}>{totalPrice.toFixed(2)} DT</Text>
        </View>
        <View style={{ alignItems: 'center', paddingBottom: height * 0.025 }}>
          <TouchableOpacity style={styles.find}
            onPress={() => {
              if (logindata === false) {
                openBottomSheet();
              } else if (logindata === true) {
                navigation.navigate("ReviewAndBook", { total: totalPrice,additionalDriver:additionalDriver });
              }
            }}
          >
            <Text style={styles.textButton}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <SignInModal bottomSheetRef={bottomSheetRef} />
    </View>
  )
}

export default NewCarDetails

const styles = StyleSheet.create({
  container: {backgroundColor:'white'},
  bg: {
    height: height * 0.4,
    overflow: 'hidden',
    justifyContent: 'space-between'
  },
  arrowContainer: {
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.04
  },
  footerDetails: {
    fontSize: 12,
    color: 'white',
    fontWeight: "300",
  },
  secondRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: height * 0.01,
    paddingHorizontal: width * 0.06,
  },
  titleWrapper: {
    gap: 8,
    padding: 20
  },
  title: {
    fontSize: 22,
    color: 'black',
    fontWeight: '900'
  },
  titleDetails: {
    fontSize: 12,
    color: 'black',
    fontWeight: '100'
  },
  info: {
    backgroundColor: "#ECECEC",
    paddingBottom: height * 0.025
  },
  rowOne: {
    gap: 15,
    paddingHorizontal: width * 0.06
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    maxWidth: '80%'
  },
  contentWrapper: {
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  text: {
    fontSize: 11
  },
  optionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.06,
    backgroundColor: 'white'
  },
  optionsTitle: {
    fontWeight: '800',
    fontSize: 16
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
    fontSize: 15,
    fontWeight: '700',
  },
});
