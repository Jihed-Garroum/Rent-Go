import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import TimeCarousel from '../components/TimeCaroussel';
import { CurrentTime, ModalVisible, finishDate, setModalVisible, startDate, setCurrentTime } from '../store/bookingSlice';

const { width, height } = Dimensions.get('window');

const ModalFooter = ({ fetchAvailableCars }) => {
  const dispatch = useDispatch();
  const [modalFooterVisible, setModalFooterVisible] = useState(false);
  const modalVisible = useSelector(ModalVisible);
  const selectedStartDate = useSelector(startDate);
  const selectedFinishDate = useSelector(finishDate);
  const currentTime = useSelector(CurrentTime);



  const handleConfirmPress = () => {
    fetchAvailableCars();
    dispatch(setModalVisible(false));
  };

  return (
    <View style={styles.filterCardWrapper}>
      <View style={styles.filterCard}>
        <View style={styles.row}>
          <View style={styles.date}>
         <Text style={{
          fontSize:15
         }}>From  </Text>
         {selectedStartDate ? <Text style={{
            fontWeight:"600",
            fontSize:16
          }}>{selectedStartDate}</Text> : 'Select start date'}
          </View>
          <View style={styles.date}>
         <Text style={{
          fontSize:15
         }}>To  </Text>
          {selectedFinishDate ? <Text style={{
            fontWeight:"600",
            fontSize:16
          }}>{selectedFinishDate}</Text> : 'Select Finish date'}
          </View>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => setModalFooterVisible(true)} style={styles.timeTouchable}>
            <View style={styles.time}>
              <Ionicons name="time-outline" size={25} color="grey" />
              <Text style={styles.timeText}>{`${currentTime}`}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.find} onPress={handleConfirmPress}>
        <Text style={styles.textButton}>Book a Car</Text>
      </TouchableOpacity>
      <Modal
        isVisible={modalFooterVisible}
        swipeDirection={['down']}
        style={styles.modal}
        onSwipeComplete={() => setModalFooterVisible(false)}
        onBackdropPress={() => setModalFooterVisible(false)}
      >
        <View style={styles.modalContent}>
          <TimeCarousel setModalFooterVisible={setModalFooterVisible}/>
        </View>
      </Modal>
    </View>
  );
};

export default ModalFooter;

const styles = StyleSheet.create({
  filterCardWrapper: {
    flex:0.99,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    // borderTopRightRadius: 25,
    // borderTopLeftRadius: 25,
    // paddingBottom:10
  },
  filterCard: {
    borderRadius: 20,
    width: width * 1,
    paddingHorizontal: 20,
    // paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: Platform.OS==='ios'?'space-around' : 'space-evenly',
    gap:Platform.OS==='android'?60:0,
    alignItems: 'center',
    marginBottom: 10,
  },
  date: {
    flexDirection: 'row',
    marginLeft: width * 0.004,
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    fontWeight:'900'
  },
  timeText: {
    marginLeft: 10,
    fontSize: 18,
  },
  find: {
    width: width * 0.84,
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.08,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  textButton: {
    color: 'white',
    fontSize: 19,
    fontWeight: '700',
  },
  timeTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: width * 0.84,
    height: height * 0.08,
    borderRadius: 10,
    overflow: 'hidden',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    flex: 0.35,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: height * 0.85,
  },
  carouselContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
