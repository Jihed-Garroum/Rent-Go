import React from 'react';
import { StyleSheet, Text, View, Pressable, ImageBackground, Dimensions, Image, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { MarkedDates, setCarId } from '../store/bookingSlice';

const { height, width } = Dimensions.get("screen");

const CarCard = ({ car }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const markedDates = useSelector(MarkedDates);

  const markedDatesArray = Object.entries(markedDates).map(([date, properties]) => ({
    date,
    ...properties
  }));

  const calculateTotalPrice = () => {
    if (markedDatesArray.length === 0) {
      return 0; // Handle case where the array is empty
    }
    console.log(markedDatesArray);
    const lastIndex = markedDatesArray.length - 1; // Get the last index of the array
    console.log('i fly like a butterfly', lastIndex);
    return (lastIndex) * car.price; // Multiply the length by car.price to get the total price
  };

  const totalPrice = calculateTotalPrice();

  const handlePress = async () => {
    try {
      if (car.id) {
        const getCarId = await dispatch(setCarId(car.id));
        console.log('karhba id', getCarId.payload);
        navigation.navigate('NewCarDetails', { car, totalPrice });
      }
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <Pressable style={styles.cardContainer} onPress={handlePress}>
      <ImageBackground style={styles.bg} resizeMode='stretch' source={{ uri: car?.media }}>
        <View style={styles.content}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{car?.brand} {car?.model}</Text>
            <Text style={styles.titleDetails}>or similar | convertible</Text>
          </View>
          <View style={styles.iconsRow}>
            <View style={styles.firstRow}>
              <Ionicons name="person" size={15} color="white" style={styles.icon} />
              <Text style={styles.details}>{car?.peopleCount}</Text>
            </View>
            <View style={styles.firstRow}>
              <Image style={{ width:Platform.OS==='ios'? width * 0.042:width*0.038, height:Platform.OS==='ios'? height * 0.02:height*0.017 }} source={require('../assets/gear.png')} />
              <Text style={styles.details}>{car?.Type}</Text>
            </View>
            <View style={styles.firstRow}>
              <MaterialCommunityIcons name="car-door" size={17} color="white" />
              <Text style={styles.details}>{car?.DoorNumber}</Text>
            </View>
            <View style={styles.firstRow}>
              <MaterialCommunityIcons name="star" size={17} color="white" />
              <Text style={styles.details}>{car?.Rating}</Text>
            </View>
          </View>
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.secondRow}>
            <Image style={{
              height:height*.025,
              width:height*.025,
              borderRadius:8
              // marginRight:width*.01
            }} source={{uri:car?.User?.selfie}}/>
            <Text style={styles.footerDetails}>{car?.User?.userName}</Text>
          </View>
          <View style={styles.thirdRow}>
            <Text style={styles.price}>TND {car?.price}/Day</Text>
            <Text style={styles.totalPrice}>{totalPrice} DT Total</Text>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default CarCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: width * 0.9,
    height: height * 0.45,
    borderRadius: width * 0.05,
    // objectFit:"contain",::
    overflow: 'hidden',
  },
  bg: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  titleWrapper: {
    gap: 8,
  },
  title: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
  details: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '300',
  },
  content: {
    padding: width * 0.05,
    gap: 10,
  },
  firstRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'grey',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: "center",
    height: height * 0.04,
    paddingHorizontal: width * 0.04,
  },
  iconsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  cardFooter: {
    padding: width * 0.05,
  },
  footerDetails: {
    fontSize: 12,
    color: 'white',
    fontWeight: "300",
  },
  secondRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap:width*.01
  },
  price: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  totalPrice: {
    color: 'white',
    fontWeight: '100',
    fontSize: 12,
  },
  thirdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleDetails: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '100',
  },
});
