import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Rating } from 'react-native-ratings';
import RBSheet from 'react-native-raw-bottom-sheet';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';


const { height, width } = Dimensions.get('window');

const ReviewSheet = ({ refRBSheet,bookingReview,refreshTheReview ,closeSheet,shiftReview }) => {
  const [starCount, setStarCount] = useState(null);
  const [starCountAgency, setStarCountAgency] = useState(null);

  const handleLater = async () => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_SERVER_IP}/api/booking/handleLater`,
        { bookingId:bookingReview[0].id }
      );
      if (response.status === 200) {
        await shiftReview()
        await refreshTheReview()
        await setStarCount(null)
        await setStarCountAgency(null)
        await refRBSheet.current.close()
      }
    } catch (error) {
      console.log('Error handle later:', error);
    } 
  };
  
  const handleDontShowAgain = async () => {
    try {
      const response = await axios.put(
        `${process.env.EXPO_PUBLIC_SERVER_IP}/api/booking/handleDontShowAgain`,
        { bookingId:bookingReview[0].id }
      );
      if (response.status === 200) {
        await shiftReview()
        await refreshTheReview()
        await setStarCount(null)
        await setStarCountAgency(null)
        await refRBSheet.current.close()
      }
    } catch (error) {
      console.log('Error show again:', error);
    } 
  };

  const handleSubmit = async () => {
    const adjustedStarCount = starCount === 0 ? null : starCount
  const adjustedStarCountAgency = starCountAgency === 0 ? null : starCountAgency

  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_SERVER_IP}/api/booking/handleConfirmRating`,
      { 
        bookingId: bookingReview[0].id,
        ratingCar: adjustedStarCount,
        ratingAgency: adjustedStarCountAgency 
      }
    );
      if (response.status === 200) {
        await shiftReview()
        await refreshTheReview()
        await setStarCount(null)
        await setStarCountAgency(null)
        await refRBSheet.current.close()
        Toast.show({
          type: 'success',
          text2: 'Thanks for rating us',
        });
      }
      console.log("cccccc",bookingReview[0].id);
    } catch (error) {
      console.log('Error show again:', error);
    } 
  };
  return (
    <RBSheet
      ref={refRBSheet}
      height={370} 
      openDuration={250}
      closeDuration={250}
      closeOnDragDown={false}
      closeOnPressBack={false}
      closeOnPressMask={false}
      customStyles={{
        wrapper: {
          backgroundColor: "rgba(0,0,0,0.5)",
        },
        draggableIcon: {
          backgroundColor: "#d5d5d5",
          width: 60,
        },
        container: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          overflow: 'visible', 
        },
      }}
    >
      <View style={styles.modalView}>
        <View style={styles.titleContStyle}>
        <Text style={styles.titleSeconde}>Rate your experience with {bookingReview[0]?.Car.model} of {bookingReview[0]?.Car.User.userName} agency</Text>

        </View>
        <View style={styles.containerTitleRate}>
          <View style={styles.rateRow}>
            <Text style={styles.title}>Rate Agency</Text>
            <Rating
              ratingCount={5}
              fractions={1}
              jumpValue={0.1}
              startingValue={0}
              onStartRating={rating => console.log(`Initial: ${rating}`)}
              onFinishRating={rating => {
                console.log(`Rating finished: ${rating}`);
                setStarCountAgency(rating);
              }}
              onSwipeRating={rating => console.log(`Swiping: ${rating}`)}
              style={styles.rating}
            />
          </View>
          <View style={styles.rateRow}>
            <Text style={styles.title}>Rate Car</Text>
            <Rating
              ratingCount={5}
              fractions={1}
              jumpValue={0.1}
              startingValue={0}
              onStartRating={rating => console.log(`Initial: ${rating}`)}
              onFinishRating={rating => {
                console.log(`Rating finished: ${rating}`);
                setStarCount(rating);
              }}
              onSwipeRating={rating => console.log(`Swiping: ${rating}`)}
              style={styles.rating}
            />
          </View>
        </View>
        {(starCount || starCountAgency) ? (
  <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.submitButton} onPress={()=>{handleSubmit()}}>
      <Text style={styles.submitButtonText}>Rate Us</Text>
    </TouchableOpacity>
  </View>
) : (
  <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.cancelButton} onPress={() => handleDontShowAgain()}>
      <Text style={styles.cancelButtonText}>Don't show again</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.submitButton} onPress={() => handleLater()}>
      <Text style={styles.submitButtonText}>Later</Text>
    </TouchableOpacity>
  </View>
)}

      </View>
      
      <View style={styles.lottieContainer}>
        <LottieView
          source={require('../assets/rateUs.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 10,
    textAlign: 'center',
    width: '40%', // Set the width of the title to 40%
  },
  titleSeconde: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  lottieContainer: {
    position: 'absolute',
    top: -height / 2.7,
    width: '100%',
    alignItems: 'center',
    zIndex: 2,
  },
  lottie: {
    width: width * 0.8, 
    height: height / 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  submitButton: {
    flex: 1,
    marginLeft: 10,
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cancelButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  containerTitleRate: {
    width: '100%',
    justifyContent: 'space-around',
    // paddingHorizontal:20
  },
  rateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rating: {
    flex: 1,
    width: '60%', // Set the width of the rating to 60%
  },
  titleContStyle:{
    justifyContent:"center",
    alignItems:"center",
    width: '100%',
    // paddingBottom:5,
    height:"35%"
  }
});

export default ReviewSheet;
