import React, { useEffect, useState } from 'react';
import { View, Modal, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get("screen");

const ConnectionStatus = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });


    return () => unsubscribe();
  }, []);

  return (
    <Modal
      visible={!isConnected}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <LottieView
            source={require('../assets/done.json')}
            autoPlay
            loop={true}
            style={styles.lottie}
          />
          <Text style={styles.modalText}>Please check your internet connection</Text>
          <TouchableOpacity style={styles.button} onPress={() => NetInfo.fetch().then(state => setIsConnected(state.isConnected))}>
            <Text style={styles.buttonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: width * 0.8,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    textAlign:'center'
  },
  lottie: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ConnectionStatus;
