import React, { useEffect, useRef, useState } from "react";
import * as Font from "expo-font";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  Alert,
  Linking,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Feather, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import ImagePreviewModal from "./ImagePreviewModal";
import { AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get("screen");

const Add = () => <Feather name="camera" size={21} color="white" />;
const Change = () => <Feather name="edit" size={21} color="white" />;

const SignUpSecondScreen = ({
  handleChangeView,
  handleConfirmImage,
  picsDetail,
  facing,
  showImageModal,
  capturedImage,
  handleRetakePicture,
  portrait,
  setPortrait,
  setFacing,
  takePicture,
  cameraRef,
  isCameraVisible,
  setIsCameraVisible,
  showButton,
  SignUpHandle,
  loadingSignUp,
}) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const permissionAlertShown = useRef(false);
  const [permission, requestPermission] = useCameraPermissions();

  const openAppSettings = () => {
    Alert.alert(
      "Permission Needed",
      "Camera access is required to take pictures. Please enable it in the app settings.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Open Settings",
          onPress: () => Linking.openSettings(),
        },
      ],
      { cancelable: false }
    );
  };

  const handleOpenCamera = async (facing, portraitType) => {
    const { status } = await requestPermission();
    if (status === 'granted') {
      setFacing(facing);
      setPortrait(portraitType);
      setIsCameraVisible(true);
    } else {
      showAlertBasedOnStatus(status);
    }
  };

  const showAlertBasedOnStatus = (status) => {
    if (status === 'denied' && !permissionAlertShown.current) {
      permissionAlertShown.current = true;
      Alert.alert(
        "Permission Needed",
        "Camera access is required to take pictures. Please enable it in the app settings.",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => {
              permissionAlertShown.current = false; // Reset the flag
            }
          },
          {
            text: "Open Settings",
            onPress: () => {
              Linking.openSettings();
              permissionAlertShown.current = false; // Reset the flag
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "League-Spartan": require("../assets/fonts/LeagueSpartan-ExtraBold.ttf"),
      });
      setFontLoaded(true);
    };
    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <View >
      {!isCameraVisible && (
          <View style={styles.inputSection}>
            <Pressable
              delayPressIn={0}
              style={styles.FirstInputCont}
             
            >
              <TouchableOpacity  onPress={() => {
                setTimeout(()=>{
                  handleOpenCamera("front", "selfie")
                },200)
              }} style={styles.eyeIconContainer}>
                {picsDetail.selfie ? <Change /> : <Add />}
              </TouchableOpacity>
              <TouchableOpacity 
               onPress={() => {
                setTimeout(()=>{
                  handleOpenCamera("front", "selfie")
                },200)
              }}
              delayPressIn={0}
              >
              <TextInput
                style={[
                  styles.FirstInput,
                  { opacity: picsDetail.selfie ? 0.5 : 1 },
                ]}
                placeholder={picsDetail.selfie ? "Tap here to change Selfie  ☑️" : "Take a Selfie!"}
                placeholderTextColor={"#cccccc"}
                editable={false}
              />
              </TouchableOpacity>
              {!picsDetail.selfie && <Text style={styles.requiredText}></Text>}
            </Pressable>
            <Pressable
              style={styles.FirstInputCont}
              onPress={() => {
                setTimeout(()=>{
                  handleOpenCamera("back", "license")
                },200)
              }}
            >
              <TouchableOpacity  onPress={() => {
                setTimeout(()=>{
                  handleOpenCamera("back", "license")
                },200)
              }} style={styles.eyeIconContainer}>
                {picsDetail.license ? <Change /> : <Add />}
              </TouchableOpacity>
              <TouchableOpacity 
               onPress={() => {
                setTimeout(()=>{
                  handleOpenCamera("back", "license")
                },200)
              }}
              delayPressIn={0}
              >
              <TextInput
                style={[
                  styles.FirstInput,
                  { opacity: picsDetail.license ? 0.5 : 1 },
                ]}
                placeholder={
                  picsDetail.license
                    ? "Tap here to change Driving License front  ☑️"
                    : "Capture Image of Driving License Front!"
                }
                placeholderTextColor={"#cccccc"}
                editable={false}
              />
              </TouchableOpacity>
              {!picsDetail.license && <Text style={styles.requiredText}></Text>}
            </Pressable>
            <Pressable
              style={styles.FirstInputCont}
              onPress={() => {
                setTimeout(()=>{
                  handleOpenCamera("back", "backLicense")
                },200)
              }}
            >
              <TouchableOpacity  onPress={() => {
                setTimeout(()=>{
                  handleOpenCamera("back", "backLicense")
                },200)
              }} style={styles.eyeIconContainer}>
                {picsDetail.backLicense ? <Change /> : <Add />}
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => {
                setTimeout(()=>{
                  handleOpenCamera("back", "backLicense")
                },200)
              }}>
              <TextInput
                style={[
                  styles.FirstInput,
                  { opacity: picsDetail.backLicense ? 0.5 : 1 },
                ]}
                placeholder={
                  picsDetail.backLicense
                    ? "Tap here to change Driving License back  ☑️"
                    : "Capture Image of Driving License Backside"
                }
                placeholderTextColor={"#cccccc"}
                editable={false}
              />
              </TouchableOpacity>
              {!picsDetail.backLicense && <Text style={styles.requiredText}></Text>}
            </Pressable>
            <Pressable
              style={styles.FirstInputCont}
              onPress={() => {
                setTimeout(()=>{
                handleOpenCamera("back", "frontCardId")
                },200)
              }}
            >
              <TouchableOpacity  onPress={() => {
                setTimeout(()=>{
                handleOpenCamera("back", "frontCardId")
                },200)
              }} style={styles.eyeIconContainer}>
                {picsDetail.frontCardId ? <Change /> : <Add />}
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => {
                setTimeout(()=>{
                handleOpenCamera("back", "frontCardId")
                },200)
              }}>
              <TextInput
                style={[
                  styles.FirstInput,
                  { opacity: picsDetail.frontCardId ? 0.5 : 1 },
                ]}
                placeholder={
                  picsDetail.frontCardId
                    ? "Tap here to change Id Card front  ☑️"
                    : " Capture Front View of Your ID Card!"
                }
                placeholderTextColor={"#cccccc"}
                editable={false}
              />
              </TouchableOpacity>
              {!picsDetail.frontCardId && <Text style={styles.requiredText}></Text>}
            </Pressable>
            <Pressable
              style={styles.FirstInputCont}
              onPress={() => {
                setTimeout(()=>{
                handleOpenCamera("back", "backCardId")
                },200)
              }}
            >
              <TouchableOpacity onPress={() => {
                setTimeout(()=>{
                handleOpenCamera("back", "backCardId")
                },200)
              }} style={styles.eyeIconContainer}>
                {picsDetail.backCardId ? <Change /> : <Add />}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setTimeout(()=>{
                handleOpenCamera("back", "backCardId")
                },200)
              }}>
              <TextInput
                style={[
                  styles.FirstInput,
                  { opacity: picsDetail.backCardId ? 0.5 : 1 },
                ]}
                placeholder={
                  picsDetail.backCardId
                    ? "Tap here to change Id Card back  ☑️"
                    : "Capture Backside of Your ID Card!"
                }
                placeholderTextColor={"#cccccc"}
                editable={false}
              />
              </TouchableOpacity>
              {!picsDetail.backCardId && <Text style={styles.requiredText}></Text>}
            </Pressable>
            <Pressable
              style={styles.FirstInputCont}
              onPress={() => {
                setTimeout(()=>{
                handleOpenCamera("back", "passport")
                },200)
              }}
            >
              <TouchableOpacity onPress={() => {
                setTimeout(()=>{
                handleOpenCamera("back", "passport")
                },200)
              }} style={styles.eyeIconContainer}>
                {picsDetail.passport ? <Change /> : <Add />}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setTimeout(()=>{
                handleOpenCamera("back", "passport")
                },200)
              }}>
              <TextInput
                style={[
                  styles.FirstInput,
                  { opacity: picsDetail.passport ? 0.5 : 1 },
                ]}
                placeholder={
                  picsDetail.passport
                    ? "Tap here to change Passport  ☑️"
                    : "Capture Image of Your Passport ! (Optional)"
                }
                placeholderTextColor={"#cccccc"}
                editable={false}
              />
              </TouchableOpacity>
               {!picsDetail.passport && <Text style={styles.requiredText}> </Text>}
            </Pressable>
            {loading && (
              <View style={styles.loader}>
                <ActivityIndicator size="large" color="white" />
              </View>
            )}
              <View style={styles.buttonNextPrevious}>
            <TouchableOpacity 
             onPress={() => {
              setTimeout(()=>{
              handleChangeView("inputsView")
              },100)
            }}
               style={{
              flexDirection:"row",
              // paddingTop:height*.007,
              height: Dimensions.get("window").height * 0.052,
              width: width * 0.26,
              backgroundColor: "rgba(173, 216, 230, 0.1)", // Light desaturated blue with 10% opacity
              alignItems:"center",
              padding: 10,
              borderRadius: 5,
              borderColor: "gray",
              marginTop:height*.01,
              borderTopWidth: .5,
              borderBottomWidth: .5,
              borderTopWidth: .5,
              color:"grey",
              borderLeftWidth: .5,
              borderRightWidth: .5,
            }}>
                  <AntDesign name="arrowleft" size={17} color="white" />
                  <Text style={styles.nextPrevText}>Previous</Text>
            </TouchableOpacity>
          </View>
          { showButton ?  <Pressable
        style={styles.btnSignIn}
        onPress={SignUpHandle}
        disabled={loadingSignUp}
      >
        {loadingSignUp ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.textSignIn}>Register</Text>
        )}
      </Pressable> : null}
       
        </View>
      )}

      {isCameraVisible && (
        <View style={styles.containerCCamera}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing={facing}
          >
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsCameraVisible(false)}
            >
              <MaterialIcons name="cancel" size={24} color="white" />
            </TouchableOpacity>
          </CameraView>
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
          </View>
        </View>
      )}
      <ImagePreviewModal
        visible={showImageModal}
        imageUri={capturedImage}
        onConfirm={handleConfirmImage}
        onRetake={handleRetakePicture}
        portrait={portrait}
      />
    </View>
  );
};

export default SignUpSecondScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.8,
    borderColor: "gray",
    borderWidth: 1,
    height: height * 0.03,
    marginBottom: height * 0.03,
    
  },
  FlatBtn: {
    height: height * 0.08,
    width: width,
    alignItems: "center",
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
    // color: "white",
    backgroundColor: "rgba(245, 245, 245, 0.1)", // Very light gray/white with 10% opacity

    marginLeft:width*.03,
    marginBottom: 10,
    fontSize:13,
    padding: 5,
    borderRadius: 5,
    borderColor: "gray",
    borderBottomWidth: .5,
    borderTopWidth: .5,
    // color:"red",
    borderLeftWidth: .5,
    borderRightWidth: .5,
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
    borderWidth: 1,
  },
  birthText: {
    color: "white",
  },
  containerCCamera: {
    height: height * 0.8,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "space-between",
  },
  camera: {
    width: width,
    height: height * 0.8,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    height: height * 0.2,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(34, 34, 34, 0.9)",
    paddingBottom: 40,
  },
  cancelButton: {
    color: "#fff",
    fontSize: 18,
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1,
  },
  captureButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    height: 90,
    width: 90,
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
    // borderWidth: 1,
  },
  FirstInputCont: {
    height: Dimensions.get("window").height * 0.07,
    // backgroundColor:"yellow",
    width: width * 0.75,
    color: "white",
    // marginBottom: 10,
    padding: 5,
    marginLeft:Dimensions.get("window").width*.05,
    borderRadius: 5,
    borderColor: "gray",
    // borderWidth: 1,
    flexDirection: "row",
    justifyContent:"center",
    // elevation: 5,
    alignItems:"center",
    gap:5
  },
  callingCodeText: {
    color: "white",
  },
  callingCodeTextCont: {
    height: Dimensions.get("window").height * 0.05,
    width: width * 0.13,
    justifyContent: "center",
    alignItems: "center",
  },
  eyeIconContainer: {
    position: "absolute",
    top: "50%",
    // backgroundColor:"green",
    height:height*.05,
    backgroundColor: "rgba(245, 245, 245, 0.1)", // Very light gray/white with 10% opacity
    width:width*.1,
    marginRight:width*.1,
    alignItems:"center",
    paddingHorizontal:width*.01,
    justifyContent:"center",
    borderRadius: 5,
    borderColor: "gray",
    borderBottomWidth: .5,
    borderTopWidth: .5,
    color:"grey",
    borderLeftWidth: .5,
    // borderTopWidth: .5,
    borderRightWidth: .5,
    left: -50,
    transform: [{ translateY: -24 }],
  },
  FirstInputPassword: {
    height: Dimensions.get("window").height * 0.05,
    width: width * 0.75,
    color: "white",
    marginBottom: 10,
    padding: 5,
    borderRadius: 5,
    borderColor: "gray",
    borderWidth: 1,
    position:"relative"
  },
  errorText: {
    color: "red",
    paddingBottom: 5,
    fontSize: 11,
  },
  contInpError: {
    flexDirection: "column",
  },
  buttonNextPrevious:{
    justifyContent:"flex-end",
    alignItems:"center",
    flexDirection:"row",
    gap:5,
    
    paddingBottom:30
  },
  nextPrevText:{
    color:"white",
    
    fontWeight:"300",
    fontSize:15
  },
  btnSignIn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "white",
    width: width * 0.8,
    height: height * 0.065,
  },
  textSignIn: {
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontWeight: "700",
    fontSize: 20,
  },
});
