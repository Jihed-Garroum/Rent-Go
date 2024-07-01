import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import store from "./store/store";
import React from "react";
import { Provider } from "react-redux";
// import { StripeProvider } from "@stripe/stripe-react-native";
import Welcome from "./pages/Welcome.jsx";
import NewHome from "./pages/NewHome.jsx";
import NewCarDetails from "./pages/NewCarDetails.jsx";
import NewLogIn from "./pages/NewLogIn.jsx";
import NewProfile from "./pages/NewProfile.jsx";
import TermsAndConditions from './pages/TermsAndConditions.jsx'
import ReviewAndBook from "./pages/ReviewAndBook.jsx";
import BookingHistory from "./pages/BookingHistory.jsx";
import MyInformation from "./pages/MyInformation.jsx";
import FAQS from "./pages/FAQS.jsx";
import CarsList from "./pages/CarsList.jsx";
import OtpVerificationEmail from "./pages/OtpVerificationEmail.jsx";
import Emailaccount from "./pages/Emailaccount.jsx";
import OtpForgotEmail from "./pages/OtpForgotEmail.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import Toast from 'react-native-toast-message';
import Context from "./context/AuthContext.jsx";
import AdvancedSearch from "./pages/AdvancedSearch.jsx";
import ConnectionStatus from "./components/ConnectionStatus.jsx";
import SignUp from "./pages/SignUp.jsx";
import Camera from "./components/Camera.jsx"
import Legal from "./pages/Legal.jsx";

const Stack = createStackNavigator();

function App() {
  // const {expoPushToken,notification}= usePushNotifications()
  // const data=JSON.stringify(notification,undefined,2);
  // console.log(expoPushToken);
  return (
    <Context>
      {/* <Text>Notification: {data}</Text> */}
      <Provider store={store}>
        {/* <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHBLE_KEY}> */}
          <NavigationContainer>
            <Stack.Navigator initialRouteName="NewHome">
              <Stack.Screen
                name="CarsList"
                component={CarsList}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AdvancedSearch"
                component={AdvancedSearch}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="MyInformation"
                component={MyInformation}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Legal"
                component={Legal}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ReviewAndBook"
                component={ReviewAndBook}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="FAQS"
                component={FAQS}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="NewCarDetails"
                component={NewCarDetails}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TermsAndConditions"
                component={TermsAndConditions}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="NewProfile"
                component={NewProfile}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="BookingHistory"
                component={BookingHistory}
                options={{ headerShown: false }}
              />
           
              <Stack.Screen
                name="newLogIn"
                component={NewLogIn}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="NewHome"
                component={NewHome}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="OtpVerification"
                component={OtpVerificationEmail}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EmailAccount"
                component={Emailaccount}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="OtpForgotEmail"
                component={OtpForgotEmail}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Camera"
                component={Camera}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
            <ConnectionStatus />
            <Toast />
          </NavigationContainer>
        {/* </StripeProvider> */}
      </Provider>
    </Context>
  );
}

export default App;
