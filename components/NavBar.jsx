import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginContext } from '../context/AuthContext.jsx';

const { width, height } = Dimensions.get("window");

const NavTab = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [slideAnim] = useState(new Animated.Value(0));
  const position = {
    BookingHistory: 0,
    NewHome: width * 0.33333333333333,
    NewProfile: width * 0.66,
  };
  const { logindata, setLoginData } = useContext(LoginContext);

  const verifyUser = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.log('No token found');
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userId");
      setLoginData(false);
      // navigation.navigate("Welcome");
    } else {
      try {
        const response = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_IP}/api/users/VerifyUser`, { token });
        if (response.status === 200) {
          setLoginData(true);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("userId");
          setLoginData(false);
          // navigation.navigate("Welcome");
        } else {
          console.error('Internal server error');
        }
      }
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: position[route.name] || 0,
      useNativeDriver: false,
      bounciness: 10,
    }).start();
  }, [route.name]);

  const handlePress = (tabName) => {
    navigation.navigate(tabName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab} onPress={() => handlePress('BookingHistory')}>
        <Icon name="history" size={24} color={route.name === 'BookingHistory' ? '#8c52ff' : '#bdbdbd'} />
        <Text style={[styles.tabText, route.name === 'BookingHistory' && styles.activeTabText]}>History</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={() => handlePress('NewHome')}>
        <Icon name="home" size={24} color={route.name === 'NewHome' ? '#8c52ff' : '#bdbdbd'} />
        <Text style={[styles.tabText, route.name === 'NewHome' && styles.activeTabText]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={() => handlePress('NewProfile')}>
        <Icon name="person" size={24} color={route.name === 'NewProfile' ? '#8c52ff' : '#bdbdbd'} />
        <Text style={[styles.tabText, route.name === 'NewProfile' && styles.activeTabText]}>Profile</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.tabIndicator, { transform: [{ translateX: slideAnim }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: height * 0.08,
    width: width,
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.33,
    height: '100%',
  },
  tabText: {
    fontSize: 12,
    color: '#bdbdbd',
    marginTop: 2,
  },
  activeTabText: {
    color: '#8c52ff',
    fontWeight: 'bold',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#8c52ff',
    height: 4,
    width: width * 0.33,
  },
});

export default NavTab;
