import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image as RNImage,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Text,
  Alert,
  Linking
} from "react-native";
import React,{useState,useRef, useEffect} from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import SignUpFirstScreen from "../components/SignUpFirstScreen";
import SignUpSecondScreen from "../components/SignUpSecondScreen";
import { AntDesign } from '@expo/vector-icons';
import { useCameraPermissions } from "expo-camera";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useSelector, useDispatch } from "react-redux";
import { SignUpClick } from "../store/userSlice";
import { useNavigation } from "@react-navigation/native";
import { saveEmailForgot, savePasswordUser } from "../store/userSlice";

const { width, height } = Dimensions.get("screen");

const SignUp = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch();
  console.log("reloaded");
  const [changeView,setChangeView]=useState("inputsView")
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
  });
  console.log("zezeze",userDetails);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [isCameraVisible, setIsCameraVisible] = useState(false);

  const [countryCode, setCountryCode] = useState("TN");
  const [callingCode, setCallingCode] = useState("+216");
  const [phoneNumber, setPhoneNumber] = useState("");
const [allErrors,setAllErrors]=useState(true)
const [picsDetail, setPicsDetails] = useState({
  selfie: "",
  license: "",
  backLicense: "",
  passport: "",
  frontCardId: "",
  backCardId: "",
});
const [permission, requestPermission] = useCameraPermissions();

const [capturedImage, setCapturedImage] = useState("")
const [showImageModal, setShowImageModal] = useState(false)
const [portrait, setPortrait] = useState("")
  const [facing, setFacing] = useState("back")
  const cameraRef = useRef(null)
  const [loadingSignUp, setLoadingSignUp] = useState(false)
  const [showButton, setShowButton] = useState(true)
  const permissionAlertShown = useRef(false)
  const permissionLogicExecuted = useRef(false)


  useEffect(()=>{
    if(picsDetail.selfie && picsDetail.license && picsDetail.backLicense && picsDetail.frontCardId && picsDetail.backCardId && userDetails.name && userDetails.phone && userDetails.email && userDetails.password && userDetails.confirmPassword && userDetails.dateOfBirth && allErrors){
setShowButton(true)
    }else{
      setShowButton(false)
    }
  },[picsDetail.selfie , picsDetail.license , picsDetail.backLicense , picsDetail.passport , picsDetail.frontCardId , picsDetail.backCardId , userDetails.name , userDetails.phone , userDetails.email , userDetails.password , userDetails.confirmPassword , userDetails.dateOfBirth , allErrors])
///////////////////////////////////////////////////////

  useEffect(() => {
    if (!permissionLogicExecuted.current && permission) {
      permissionLogicExecuted.current = true;

      if (!permission.granted) {
        if (permission.canAskAgain) {
          requestPermission();
        } else if (!permissionAlertShown.current) {
          openAppSettings();
          permissionAlertShown.current = true;
        }
      }
    }
  }, [permission]);

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

  if (permission === null) {
    return null; // Or any fallback UI you want to display
  }

  if (permission.status === 'denied' && !permission.canAskAgain && !permissionAlertShown.current) {
    openAppSettings();
    permissionAlertShown.current = true;
  }
  
  ////////////////////////////////////////////////////

const takePicture = async () => {
  try {
    const { status } = await requestPermission();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setCapturedImage(data.uri);
      setShowImageModal(true);
    }
  } catch (error) {
    console.error("Error taking picture:", error);
  }
};
const handleRetakePicture = () => {
  setShowImageModal(false);
  setIsCameraVisible(true);
  setCapturedImage("");
};
/////////////////////////////////////////////////////////////////
const handleConfirmImage = async () => {
  await setPicsDetails({ ...picsDetail, [portrait]: capturedImage });
  console.log("Image confirmed:", capturedImage);
  await setShowImageModal(false);
  await setIsCameraVisible(false);
  await setCapturedImage("");
};
///////////////////////INPUTSVIEW////////////////////////////////
const handleAllErrors = (e)=>{
  setAllErrors(e)
}
  const handleUserChange = (field, value) => {
    setUserDetails({ ...userDetails, [field]: value });
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(false);
    if (currentDate) {
      const formattedDate = currentDate.toISOString().split("T")[0];
      setUserDetails({ ...userDetails, dateOfBirth: formattedDate });
    }
  };

  const showMode = () => {
    setShow(true);
  };
  const onDismiss = () => {
    setShow(false);
  };

  const handleCountryCodeChange = (c) => {
    setCountryCode(c.cca2);
    setCallingCode(`+${c.callingCode[0]}`);
  };
  
  const handleSetPhoneNumber = (e) => {
    setPhoneNumber(e);
  };

  
  const userEmail = (value) => {
    dispatch(saveEmailForgot(value));
  };
  const userPassword = (value) => {
    dispatch(savePasswordUser(value));
  };
  const cloudinaryUpload = async (imageUri, folderName, field) => {
    const cloudName = "dl9cp8cwq"; // Ensure this is your actual Cloudinary cloud name
    const myUploadPreset = "aqwa_cars"; // Ensure this is your actual upload preset
  
    try {
      const formData = new FormData();
      // Remove 'file://' from the URI if on iOS
      const uri = Platform.OS === 'android' ? imageUri : imageUri.replace('file://', '');
  
      formData.append("file", {
        uri: uri,
        type: "image/jpeg",
        name: "my_image.jpg",
      });
      formData.append("upload_preset", myUploadPreset);
      if (folderName) {
        formData.append("folder", folderName);
      }
  
      console.log("Uploading to Cloudinary with the following data:", formData);
  
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Cloudinary response error:", errorResponse);
        throw new Error(`Cloudinary upload failed: ${errorResponse.error.message}`);
      }
  
      const responseData = await response.json();
      console.log("Cloudinary upload successful, response data:", responseData);
      return { field, url: responseData.secure_url };
    } catch (error) {
      console.error("Detailed Cloudinary upload error:", error.message || error);
      throw new Error(`Cloudinary upload error: ${error.message || JSON.stringify(error)}`);
    }
  };
  const handleSendEmail = async () => {
    try {
        const response = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_IP}/api/users/sendWelcomEmail`, { email:userDetails.email });
        if (response.status === 200) {
            console.log('Email sent successfully');
        } else {
            console.log('Failed to send email');
        }
    } catch (error) {
        console.log(error.response?.data?.error || 'Failed to send email');
    }
  };
  
  const otpVerifSend = async () => {
    if (userDetails.email) {
      try {
        setLoadingSignUp(true);
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_SERVER_IP}/api/users/sendVerificationEmail`,
          { email: userDetails.email }
        );

        if (response.status === 200) {
          console.log("Successfully OTP Verified");

          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Code sent successfully",
          });
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            console.log("User not found");
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "User not found",
            });
          } else if (error.response.status === 500) {
            console.log("Failed to send email");
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to send email",
            });
          } else {
            console.log("Other error:", error);
          }
        } else {
          console.error("Network error:", error);
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Network error",
          });
        }
      } finally {
        setLoadingSignUp(false);
      }
    } else {
      console.log("Please enter a valid email");
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter a valid email",
      });
    }
  };

  const SignUpHandle = async () => {
    setLoadingSignUp(true);
  
    try {
      const imagesToUpload = [
        { uri: picsDetail.selfie, field: "selfie" },
        { uri: picsDetail.license, field: "license" },
        { uri: picsDetail.backLicense, field: "backLicense" },
        { uri: picsDetail.frontCardId, field: "frontCardId" },
        { uri: picsDetail.backCardId, field: "backCardId" },
        ...(picsDetail.passport ? [{ uri: picsDetail.passport, field: "passport" }] : []),
      ];
  
      const uploadPromises = imagesToUpload.map(image =>
        cloudinaryUpload(image.uri, "user_images", image.field)
      );
  
      const uploadResults = await Promise.all(uploadPromises);
  
      const updatedPicsDetails = uploadResults.reduce((acc, { field, url }) => {
        acc[field] = url;
        return acc;
      }, {});
  
      setPicsDetails(updatedPicsDetails);
  
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_SERVER_IP}/api/users/SignUpUser`,
        {
          userName: userDetails.name,
          phoneNumber: userDetails.phone,
          password: userDetails.password,
          confirmPassword: userDetails.confirmPassword,
          email: userDetails.email,
          dateOfBirth: userDetails.dateOfBirth,
          selfie: updatedPicsDetails.selfie,
          drivingLicenseFront: updatedPicsDetails.license,
          drivingLicenseBack: updatedPicsDetails.backLicense,
          passport: updatedPicsDetails.passport,
          cardIdFront: updatedPicsDetails.frontCardId,
          cardIdBack: updatedPicsDetails.backCardId
        }
      );
  
      if (response.status === 201) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Registration Successfully done 😃!",
        });
        console.log("Successfully registered");
        await handleSendEmail()
        await otpVerifSend();
        await userEmail(userDetails.email);
        await userPassword(userDetails.password);
        await navigation.navigate("OtpVerification");
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 409) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error.response.data.error || "Conflict occurred. Please try again.",
          });
        } else if (status === 422) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error.response.data.error || "Validation error. Please check your input.",
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "An unexpected error occurred. Please try again.",
          });
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: JSON.stringify(error.message),
        });
      }
    } finally {
      setLoadingSignUp(false);
    }
  };
  
////////////////////////////////////////////////////////////////
  const handleChangeView= (e)=>{
setChangeView(e)
  }
  return (
    <View>
      <LinearGradient
        locations={[0.2, 1]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={["#321947", "#000000"]}
        // style={styles.formContainer}
      >
      {changeView ===  "inputsView" ? <ScrollView
          contentContainerStyle={styles.ScrollContainer}
          keyboardShouldPersistTaps="always"
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-evenly",
              // backgroundColor:"red",
              height,
            }}
          >
            <View
              style={{
                height: height * 0.2,
                // backgroundColor:"green"
              }}
            >
              <Image
                style={styles.img}
                source={require("../assets/aqwaWhite.png")}
              />
            </View>
            <SignUpFirstScreen 
            handleChangeView={handleChangeView}
            handleUserChange={handleUserChange}
            onChange={onChange}
            phoneNumber={phoneNumber}
            callingCode={callingCode}
            countryCode={countryCode}
            userDetails={userDetails}
            handleCountryCodeChange={handleCountryCodeChange}
            handleSetPhoneNumber={handleSetPhoneNumber}
            handleAllErrors={handleAllErrors}
            setUserDetails={setUserDetails}
            showMode={showMode}
            onDismiss={onDismiss}
            show={show}
            loadingSignUp={loadingSignUp}
            date={date}
            SignUpHandle={SignUpHandle}
            showButton={showButton}
            />
        
          </View>
        </ScrollView>:null}
      {changeView ===  "cameraView" ? <View
          contentContainerStyle={styles.ScrollContainer}
          keyboardShouldPersistTaps="always"
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-evenly",
              // backgroundColor:"red",
              height,
            }}
          >
            <View
              style={{
                height: height * 0.2,
                // backgroundColor:"green"
              }}
            >
              <Image
                style={styles.img}
                source={require("../assets/aqwaWhite.png")}
              />
            </View>
            <View>
            <SignUpSecondScreen 
            handleChangeView={handleChangeView}
            handleConfirmImage={handleConfirmImage}
            picsDetail={picsDetail}
            takePicture={takePicture}
            handleRetakePicture={handleRetakePicture}
            facing={facing}
            showImageModal={showImageModal}
            capturedImage={capturedImage}
            setPortrait={setPortrait}
            setFacing={setFacing}
            isCameraVisible={isCameraVisible}
            setIsCameraVisible={setIsCameraVisible}
            cameraRef={cameraRef}
            showButton={showButton}
            SignUpHandle={SignUpHandle}
            loadingSignUp={loadingSignUp}
            portrait={portrait}
            />
            {/* <View style={styles.buttonNextPrevious}>
          <Pressable ><Text style={styles.nextPrevText}>Next</Text></Pressable>
          <AntDesign name="arrowright" size={20} color="white" />
          </View> */}
          </View>
          </View>
        </View>:null}
      </LinearGradient>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  img: {
    height: height * 0.2,
    width: width,
  },
  ScrollContainer: {
    height,
    alignItems: "center",
    // justifyContent: "space-evenly",
    // flexGrow: 1,
  },
  buttonNextPrevious:{
    justifyContent:"flex-end",
    alignItems:"center",
    flexDirection:"row",
    gap:5,
  },
  nextPrevText:{
    color:"white",
    fontWeight:"bold",
    fontSize:15
  },
  permissionContainer:{
    justifyContent:"center",
    alignItems:"center",
    paddingTop:100
  }
});
