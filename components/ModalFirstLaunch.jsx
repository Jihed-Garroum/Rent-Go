import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import LottieView from "lottie-react-native";

const ModalFirstLaunch = ({
  modalFirstLaunchVisible,
  closeFirstLaunchModal,
}) => {
  return (
    <Modal
      isVisible={modalFirstLaunchVisible}
      style={styles.modal}
      animationType="fade"
      transparent={true}
      onRequestClose={() => {}}
      onDismiss={() => {}}
      hardwareAccelerated={true}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Swipe Gesture</Text>
        <Text style={styles.description}>
          You can swipe from left to right to go back.
        </Text>
        {/* <LottieView
                    source={require('../assets/animations/swipeback.json')}
                    autoPlay
                    loop
                    style={styles.lottie}
                /> */}
        <TouchableOpacity style={styles.button} onPress={closeFirstLaunchModal}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalFirstLaunch;

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    // backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
  lottie: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  button: {
    // backgroundColor: '#8c52ff',.
    padding: 10,
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: "white",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});