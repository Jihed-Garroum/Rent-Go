import { StyleSheet, TouchableOpacity, View,Dimensions } from 'react-native'
import React from 'react'
import { CameraView } from "expo-camera";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");



const Camera = (cameraRef,facing,takePicture,setIsCameraVisible) => {
  return (
    <View>
        <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing={facing}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.captureButton}
                onPress={takePicture}
              >
                <MaterialCommunityIcons
                  name="camera-iris"
                  size={75}
                  color="white"
                />
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={styles.flipButton}
                onPress={toggleCameraFacing}
              >
                <MaterialIcons name="flip-camera-ios" size={24} color="white" />
              </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsCameraVisible(false)}
              >
                <MaterialIcons name="cancel" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </CameraView>
    </View>
  )
}

export default Camera

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.8,
    borderColor: "gray",
    borderBottomWidth: 1,
    height: height * 0.03,
    marginBottom: height * 0.03,
  },
  FlatBtn: {
    height: height * 0.08,
    width: width,
    // paddingRight:width*.15,
    // borderBottomEndRadius: 100,
    // backgroundColor:"red",
    // borderBottomLeftRadius: 100,
    // backgroundColor: "transparent",
    alignItems: "center",
    // justifyContent: "flex-end",
    // flexDirection: "row",
    // borderTopColor: "#000000",
    // justifyContent: "center",
    paddingBottom: height * 0.005,
    paddingLeft: width * 0.6,
  },
  formContainer: {
    width: Dimensions.get("window").width,
    height: height,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  FirstInput: {
    height: Dimensions.get("window").height * 0.05,
    width: width * 0.75,
    color: "white",
    marginBottom: 10,
    padding: 5,
    borderRadius: 5,
    borderColor: "gray",
    borderBottomWidth: 1,
  },
  input: {
    height: Dimensions.get("window").height * 0.05,
    width: width * 0.75,

    color: "white",
    marginBottom: 10,
    padding: 5,
    borderRadius: 5,
  },
  cameraButton: {
    alignItems: "center",
    width: width * 0.75,
    backgroundColor: "#fff",
    padding: height * 0.01,
    borderRadius: 100,
    // marginTop: 10,
    borderColor: "#000000",
    borderWidth: 0.5,
  },
  cameraButtonText: {
    fontSize: 16,
  },
  img: {
    height: height * 0.2,
    width: width,
  },
  ScrollContainer: {
    height,
    alignItems: "center",
    // justifyContent: "space-evenly",
    flexGrow: 1,
  },
  birthBtn: {
    height: Dimensions.get("window").height * 0.05,
    width: width * 0.75,
    color: "white",
    marginBottom: 10,
    padding: 5,
    borderRadius: 5,
    borderColor: "gray",
    borderBottomWidth: 1,
  },
  birthText: {
    color: "white",
  },
  containerCCamera: {
    // flex: 1,
    // height,
    // width
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "space-between",
  },
  camera: {
    // flex: 1,
    width: width,
    height: height * 0.8,
    justifyContent:"flex-end",
  },
  buttonContainer: {
    height: height * 0.2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    // paddingBottom: 20,
    backgroundColor: "rgba(34, 34, 34, 0.9)",
  },
  cancelButton: {
    color: "#fff",
    fontSize: 18
  },
  captureButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    // paddingHorizontal: 20,
    // paddingVertical: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    height: 90,
    width: 90,
  },
  cancelButtonContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  loader: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  FirstInputPhone: {
    height: Dimensions.get("window").height * 0.05,
    width: width * 0.5,
    color: "white",

  },
  FirstInputPhonePicker: {
    height: Dimensions.get("window").height * 0.05,
    width: width * 0.08,
    flexDirection: "column",
    alignItems:"center",
    justifyContent:"flex-end",
    paddingBottom:7
    // color: "white",
    // marginBottom: 10,
    // padding: 5,
    // borderRadius: 5,
    // borderColor: "gray",
    // borderBottomWidth: 1,
  },
  FirstInputCont: {
    height: Dimensions.get("window").height * 0.05,
    width: width * 0.75,
    color: "white",
    marginBottom: 10,
    padding: 5,
    borderRadius: 5,
    borderColor: "gray",
    // borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent:"center",
    alignItems:"center",
    gap:5
  },
  callingCodeText:{
    color: "white",
    
  },
  callingCodeTextCont:{
    height: Dimensions.get("window").height * 0.05,
    width: width * 0.13,
    justifyContent: "center",
    alignItems: "center",
  },
  eyeIconContainer: {
    position: "absolute",
    top: "50%",
    right: 10,
    transform: [{ translateY: -12 }],
  },
  FirstInputPassword: {
    height: Dimensions.get("window").height * 0.05,
    width: width * 0.75,
    color: "white",
    marginBottom: 10,
    padding: 5,
    borderRadius: 5,
    borderColor: "gray",
    borderBottomWidth: 1,
    position:"relative"
  },
  errorText: {
    color: "red",
    paddingBottom: 5,
    fontSize:11
  },
  contInpError:{
    flexDirection: "column",
  }
});