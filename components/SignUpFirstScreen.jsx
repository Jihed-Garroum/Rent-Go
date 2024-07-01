import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Pressable,
  ActivityIndicator,
  Image as RNImage,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";
import CountryPicker from "react-native-country-picker-modal";
import libphonenumber from "libphonenumber-js";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");

const SignUpFirstScreen = ({
  // handleChangeView,
  // onChange,
  // phoneNumber,
  // callingCode,
  // countryCode,
  // userDetails,
  // handleCountryCodeChange,
  // handleSetPhoneNumber,
  // handleAllErrors,
  // setUserDetails,
  // handleUserChange,
  // showMode,
  // onDismiss,
  // show,
  // date,
  // loadingSignUp,
  // SignUpHandle,
  // showButton
  handleChangeView = () => {},
  onChange = () => {},
  phoneNumber = "",
  callingCode = "+216",
  countryCode = "TN",
  userDetails = {},
  handleCountryCodeChange = () => {},
  handleSetPhoneNumber = () => {},
  handleAllErrors = () => {},
  setUserDetails = () => {},
  handleUserChange = () => {},
  showMode = () => {},
  onDismiss = () => {},
  show = false,
  date = new Date(),
  loadingSignUp = false,
  SignUpHandle = () => {},
  showButton = true,
}) => {
  const parsePhoneNumberFromString = libphonenumber.parsePhoneNumberFromString;
  // const [userDetails, setUserDetails] = useState({
  //   name: "",
  //   phone: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  //   dateOfBirth: "",
  // });
  // const [date, setDate] = useState(new Date());
  // const [show, setShow] = useState(false);
  // const [countryCode, setCountryCode] = useState("TN");
  // const [callingCode, setCallingCode] = useState("+216");
  // const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  console.log(userDetails);
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 14);

  const validatePassword = () => {
    let error = "";
    if (userDetails.password.length > 0) {
      if (userDetails.password.length < 8) {
        error = "Password must be at least 8 characters long";
      } else if (!/[a-z]/.test(userDetails.password)) {
        error = "Password must contain at least one lowercase letter";
      } else if (!/[A-Z]/.test(userDetails.password)) {
        error = "Password must contain at least one uppercase letter";
      } else if (!/\d/.test(userDetails.password)) {
        error = "Password must contain at least one digit";
      } else if (!/[@$!%*?&]/.test(userDetails.password)) {
        error = "Password must contain at least one special character";
      }
    }
    setPasswordError(error);
  };

  const validateConfirmPassword = () => {
    let error = "";
    if (userDetails.confirmPassword.length > 0) {
      if (userDetails.confirmPassword !== userDetails.password) {
        error = "Passwords do not match";
      }
    }
    setConfirmPasswordError(error);
  };

  useEffect(() => {
    validatePassword();
    validateConfirmPassword();
  }, [userDetails.password, userDetails.confirmPassword]);

  const validateEmail = () => {
    const trimmedEmail = userDetails.email.trim();
    const re = /^\S+@\S+\.\S+$/;
    const isValid = re.test(trimmedEmail);
    setUserDetails({ ...userDetails, email: trimmedEmail });
    setEmailError(isValid ? "" : trimmedEmail ? "Invalid email format" : "");
  };

  useEffect(() => {
    validateEmail();
  }, [userDetails.email]);

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validatePhoneNumber = (number, country) => {
    if (number.trim() === "") {
      setIsValid(true);
      return;
    }
    try {
      const phoneNumberObj = parsePhoneNumberFromString(number, country);
      if (phoneNumberObj && phoneNumberObj.isValid()) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } catch (error) {
      setIsValid(false);
    }
  };

  const formatPhoneNumber = (text) => {
    try {
      const phoneNumberObj = parsePhoneNumberFromString(text, countryCode);
      if (phoneNumberObj) {
        handleSetPhoneNumber(phoneNumberObj.formatNational());
      }
    } catch (error) {
      setIsValid(false);
    }
  };

  const handlePhoneNumberChange = (text) => {
    formatPhoneNumber(text);
  };

  // const handleCountryCodeChange = (c) => {
  //   setCountryCode(c.cca2);
  //   setCallingCode(`+${c.callingCode[0]}`);
  // };

  useEffect(() => {
    validatePhoneNumber(phoneNumber, countryCode);
    if (callingCode && phoneNumber && isValid) {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        phone: `${callingCode} ${phoneNumber}`,
      }));
    } else {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        phone: "",
      }));
    }
  }, [phoneNumber, countryCode, isValid]);

  // const handleUserChange = (field, value) => {
  //   setUserDetails({ ...userDetails, [field]: value });
  // };

  // const showMode = () => {
  //   setShow(true);
  // };

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setDate(currentDate);
  //   setShow(false);
  //   if (currentDate) {
  //     const formattedDate = currentDate.toISOString().split("T")[0];
  //     setUserDetails({ ...userDetails, dateOfBirth: formattedDate });
  //   }
  // };

  // const onDismiss = () => {
  //   setShow(false);
  // };
  useEffect(() => {
    if (
      userDetails.name &&
      userDetails.phone &&
      userDetails.email &&
      userDetails.password &&
      userDetails.confirmPassword &&
      userDetails.dateOfBirth &&
      !isValid &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError
    ) {
      handleAllErrors(false);
    } else {
      handleAllErrors(true);
    }
  }, [
    userDetails.name ||
      userDetails.phone ||
      userDetails.email ||
      userDetails.password ||
      userDetails.confirmPassword ||
      userDetails.dateOfBirth,
  ]);

  const CountryPickerComponent = ({
    withCallingCode = true,
    withFilter = true,
    withFlag = true,
    withAlphaFilter = true,
    countryCode = "US",
    handleCountryCodeChange = () => {},
    containerButtonStyle = {},
  }) => {
    return (
      <CountryPicker
        withCallingCode={withCallingCode}
        withFilter={withFilter}
        withFlag={withFlag}
        withAlphaFilter={withAlphaFilter}
        countryCode={countryCode}
        onSelect={handleCountryCodeChange}
        containerButtonStyle={styles.FirstInputPhonePicker}
      />
    );
  };
  

  return (
    <View>
      <View style={styles.inputSection}>
        <TextInput
          style={styles.FirstInput}
          placeholder="Enter your name here..."
          placeholderTextColor={"#cccccc"}
          onChangeText={(text) => handleUserChange("name", text)}
          value={userDetails.name}
        />
        <View style={styles.contInpError}>
          <TextInput
            style={styles.FirstInput}
            placeholder="Enter your email here..."
            placeholderTextColor={"#cccccc"}
            onChangeText={(text) => handleUserChange("email", text)}
            value={userDetails.email}
            keyboardType="email-address"
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
        </View>
        <View style={styles.contInpError}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.FirstInputCont}>
              <CountryPicker
                withCallingCode
                withFilter
                withFlag
                withAlphaFilter
                countryCode={countryCode}
                onSelect={handleCountryCodeChange}
                containerButtonStyle={styles.FirstInputPhonePicker}
              />
              <View style={styles.callingCodeTextCont}>
                {!phoneNumber ? (
                  <Text style={{ color: "#cccccc" }}>{callingCode}</Text>
                ) : (
                  <Text style={{ color: "white" }}>{callingCode}</Text>
                )}
              </View>
              <TextInput
                // style={styles.FirstInputPhone}
                style={{
                    fontSize:13,
                    color:"white"
                }}
                onChangeText={(text) => {
                  handleSetPhoneNumber(text);
                  handlePhoneNumberChange(text);
                }}
                value={phoneNumber}
                placeholder="Enter your phone number..."
                placeholderTextColor={"#cccccc"}
                keyboardType="number-pad"
                // blurOnSubmit={false}
              />
            </View>
          </View>
          {!isValid && phoneNumber.trim() !== "" && (
            <Text style={styles.errorText}>Invalid phone number</Text>
          )}
        </View>
        <TouchableOpacity onPress={showMode} style={styles.birthBtn}>
          {!userDetails.dateOfBirth ? (
   
    <Text style={{ color: "#cccccc",fontWeight:"bold",fontSize:13,}}>Press here to select your birth date *</Text>
          ) : (
            <Text style={{ color: "white" }}>{userDetails.dateOfBirth}</Text>
          )}
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              if (event.type === "set") {
                onChange(event, selectedDate);
              } else {
                onDismiss();
              }
            }}
            maximumDate={maxDate}
          />
        )}
        <View style={styles.contInpError}>
          <View>
            <TextInput
              style={styles.FirstInputPassword}
              placeholder="Type your password here..."
              placeholderTextColor={"#cccccc"}
              onChangeText={(text) => handleUserChange("password", text)}
              value={userDetails.password}
              keyboardType="default"
              secureTextEntry={!showNewPassword}
            />
            <Pressable
              style={styles.eyeIconContainer}
              onPress={toggleNewPasswordVisibility}
            >
              <Feather
                name={showNewPassword ? "eye" : "eye-off"}
                size={18}
                color="#cccccc"
              />
            </Pressable>
          </View>
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>
        <View style={styles.contInpError}>
          <View>
            <TextInput
              style={styles.FirstInputPassword}
              placeholder="Re-enter Your Password..."
              placeholderTextColor={"#cccccc"}
              onChangeText={(text) => handleUserChange("confirmPassword", text)}
              value={userDetails.confirmPassword}
              keyboardType="default"
              secureTextEntry={!showConfirmPassword}
            />
            <Pressable
              style={styles.eyeIconContainer}
              onPress={toggleConfirmPasswordVisibility}
            >
              <Feather
                name={showConfirmPassword ? "eye" : "eye-off"}
                size={18}
                color="#cccccc"
              />
            </Pressable>
          </View>
          {confirmPasswordError ? (
            <Text style={styles.errorText}>{confirmPasswordError}</Text>
          ) : null}
        </View>
        <View style={styles.buttonNextPrevious}>
            <TouchableOpacity 
             onPress={() => {
              setTimeout(()=>{
              handleChangeView("cameraView")
              },100)
            }}
               style={{
              flexDirection:"row",
              // paddingTop:height*.007,
              height: Dimensions.get("window").height * 0.052,
              width: width * 0.2,
              alignItems:"center",
              padding: 10,
              borderRadius: 5,
              borderColor: "gray",
              marginTop:height*.01,
              borderTopWidth: .5,
              justifyContent:"center",
              borderBottomWidth: .5,
              borderLeftWidth: .5,
              backgroundColor: "rgba(173, 216, 230, 0.1)", // Light desaturated blue with 10% opacity
              borderRightWidth: .5,
            }}>
                  <Text style={styles.nextPrevText}>Next</Text>
                  <AntDesign name="arrowright" size={17} color="white" />
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
    </View>
  );
};

export default SignUpFirstScreen;

const styles = StyleSheet.create({
  inputSection: {
    height: height * 0.4,
    justifyContent: "center",
  },
  FirstInput: {
    height: height * 0.06,
    width: width * 0.78,
    paddingLeft:width*.02,
    color: "white",
    marginBottom: height*.02,
    paddingHorizontal: 5,
    fontSize:13,
    borderRadius: 5,
    borderColor: "gray",
    borderTopWidth: .5,
    borderBottomWidth: .5,
    borderLeftWidth: .5,
    borderRightWidth: .5,
  },
  FirstInputPassword: {
    height: height * 0.06,
    fontSize:13,
    width: width * 0.78,
    color: "white",
    marginBottom: height*.02,
    // paddingHorizontal: 5,
    paddingLeft:width*.02,
    borderRadius: 5,
    borderColor: "gray",
    borderBottomWidth: .5,
    borderTopWidth: .5,
    borderLeftWidth: .5,
    borderRightWidth: .5,
  },
  FirstInputPhone: {
    height: height * 0.05,
    fontSize:13,
    
    width: width * 0.5,
    color: "white",
    borderColor: "gray",
    borderBottomWidth: 1,
  },
  FirstInputPhonePicker: {
    height: height * 0.05,
    fontSize:13,
    width: width * 0.08,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 7,
  },
  FirstInputCont: {
    height: height * 0.06,
    width: width * 0.78,
    // justifyContent:"flex-start",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    paddingLeft:width*.02,
    borderRadius:5,
    borderBottomWidth: .5,
    borderLeftWidth: .5,
    borderRightWidth: .5,
    borderTopWidth: .5,
    marginBottom: height*.02,
  },
  callingCodeTextCont: {
    height: height * 0.05,
    width: width * 0.13,
    justifyContent: "center",
    alignItems: "center",
  },
  birthBtn: {
    height: height * 0.06,
    width: width * 0.78,
    paddingLeft:width*.02,
    color: "white",
    
    marginBottom: height*.02,
    padding: 5,
    borderRadius: 5,
    borderColor: "gray",
    borderTopWidth: .5,
    borderBottomWidth: .5,
    borderLeftWidth: .5,
    borderRightWidth: .5,
    justifyContent: "center",
  },
  eyeIconContainer: {
    position: "absolute",
    top: "45%",
    right: 10,
    transform: [{ translateY: -12 }],
  },
  errorText: {
    color: "red",
    fontSize: 11,
    paddingBottom: height*.01,
  },
  contInpError: {
    flexDirection: "column",
    width: width * 0.75,
    
    // marginBottom: height*.02,
  },
  buttonNextPrevious: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    paddingBottom:30
  },
  nextPrevText: {
    color: "white",
    fontWeight: "300",
    paddingRight:width*.01,
    // paddingBottom:width*.02,
    fontSize: 15,
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
