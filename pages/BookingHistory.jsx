import { StyleSheet, Text, View, Pressable, Dimensions, ScrollView, Image, LayoutAnimation, Platform, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons, FontAwesome6 } from '@expo/vector-icons';
const { height, width } = Dimensions.get("screen");
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import NavTab from '../components/NavBar';

const BookingHistory = () => {
  const [showDetails, setShowDetails] = useState({});
  const [bookingHistory, setBookingHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [filter, setFilter] = useState('All');
  const navigation = useNavigation();

  const handlePress = (id) => {
    setShowDetails(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const getAllBookingById = async () => {
    try {
      const Id = await AsyncStorage.getItem("userId");
      if (!Id) {
        console.log("User ID not found");
      }

      const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_IP}/api/booking/getAllByUserId/${Id}`);
      
      if (!response.ok) {
        console.log('Network response was not ok');
      }

      const bookings = await response.json();
      setBookingHistory(Array.isArray(bookings) ? bookings : []);
      setFilteredHistory(Array.isArray(bookings) ? bookings : []);
      console.log('Bookings:', bookings);

      return bookings;
    } catch (error) {
      console.error('Error fetching bookings:', JSON.stringify(error));
      setBookingHistory([]);
      return null;
    }
  };

  useEffect(() => {
    getAllBookingById();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [filter, bookingHistory]);

  const filterBookings = () => {
    if (filter === 'All') {
      setFilteredHistory(bookingHistory);
    } else {
      setFilteredHistory(bookingHistory.filter(booking => booking.acceptation === filter.toLowerCase()));
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending':
        return { backgroundColor: 'orange', color: 'black', padding: 6 };
      case 'accepted':
        return { backgroundColor: '#57B84B', color: 'white', padding: 6 };
      case 'rejected':
        return { backgroundColor: '#FF340C', color: 'white', padding: 6 };
      default:
        return {};
    }
  };

  return (
    <View style={{  paddingTop:Platform.OS==="android"?height*.04:height*.02,flex: 1, backgroundColor: 'white' }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.arrowContainer} onPress={() => setTimeout(()=>{
          navigation.goBack()
        },200)}>
          <Ionicons name="arrow-back-circle" size={45} color="black" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.title1}>Booking History</Text>
      <View style={styles.tabsContainer}>
        {['All', 'Accepted', 'Pending', 'Rejected'].map((status) => (
          <Pressable
            key={status}
            style={[styles.tab, filter === status && styles.activeTab]}
            onPress={() => setFilter(status)}
          >
            <Text style={[styles.tabText, filter === status && styles.activeTabText]}>
              {status}
            </Text>
          </Pressable>
        ))}
        <View
          style={[
            styles.glider,
            { transform: [{ translateX: ['All', 'Accepted', 'Pending', 'Rejected'].indexOf(filter) * (width / 4) }] }
          ]}
        />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {filteredHistory.length > 0 ? (
          filteredHistory.map((booking) => (
            <Pressable key={booking.id} onPress={() => handlePress(booking.id)} style={styles.viewMore}>
              <View style={styles.carContainer}>
                <Image source={{ uri: booking?.Car?.media }} style={styles.carImage} />
                <View style={styles.carDetails}>
                  <Text style={styles.title}>{booking?.Car?.brand} {booking?.Car?.model}</Text>
                  <Text style={styles.description}>or similar | convertible</Text>
                  <View style={[styles.statusContainer, getStatusStyle(booking?.acceptation)]}>
                    <Text style={styles.duration}>{capitalizeFirstLetter(booking?.acceptation)}</Text>
                  </View>
                </View>
                <Ionicons name={showDetails[booking.id] ? 'chevron-up-circle-outline' : 'chevron-down-circle-outline'} size={24} color="black" style={styles.arrowIcon} />
              </View>
              {showDetails[booking.id] && (
                <View style={styles.additionalDetails}>
                  <View style={styles.detailsSection}>
                    <Ionicons name="location-outline" size={24} color="black" style={styles.icon} />
                    <View style={styles.detailsText}>
                      <Text style={styles.detailsTitle}>Pickup Station</Text>
                      <Text style={styles.detailsInfo}>{booking?.from}</Text>
                      <Text style={styles.detailsInfo}>Date: {booking?.startDate}</Text>
                      <Text style={styles.detailsInfo}>Time: {booking?.time}</Text>
                    </View>
                  </View>
                  <View style={styles.detailsSection}>
                    <Ionicons name="return-down-back-outline" size={24} color="black" style={styles.icon} />
                    <View style={styles.detailsText}>
                      <Text style={styles.detailsTitle}>Return Station</Text>
                      <Text style={styles.detailsInfo}>{booking?.to ? booking.to : 'Same as Pickup station'}</Text>
                      <Text style={styles.detailsInfo}>Date: {booking?.endDate}</Text>
                      <Text style={styles.detailsInfo}>Time: {booking?.time}</Text>
                    </View>
                  </View>
                  <View style={styles.bookingOverview}>
                    <Text style={styles.detailsTitle}>Booking Overview</Text>
                    <View style={styles.options}>
                      <View style={styles.option}>
                        <FontAwesome6 name="check" size={24} color="green" />
                        <Text>Additional driver: Yes</Text>
                      </View>
                      <View style={styles.option}>
                        <FontAwesome6 name="check" size={24} color="green" />
                        <Text>Unlimited Kms: Yes</Text>
                      </View>
                      <View style={styles.option}>
                        <FontAwesome6 name="money-check-dollar" size={24} color="black" />
                        <Text>Amount Paid: {booking?.amount} DT</Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </Pressable>
          ))
        ) : (
          <Text style={styles.noBookings}>No bookings found</Text>
        )}
      </ScrollView>
      <NavTab />
    </View>
  );
};

export default BookingHistory;

const styles = StyleSheet.create({
  arrowContainer: {
    paddingHorizontal: 5,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  header: {
    height: Platform.OS === 'ios' ? height * 0.12 : height * 0.08,
    alignItems: 'center',
    width: '100%',
    // backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: width * 0.04,
    gap: 10,
  },
  viewMore: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  carContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  carImage: {
    width: width * 0.28,
    height: height * 0.12,
    marginRight: 10,
    borderRadius: 5,
  },
  carDetails: {
    flex: 1,
  },
  title1: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 5,
    paddingHorizontal:20,
    paddingVertical:15
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 3,
  },
  duration: {
    fontSize: 14,
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
  },
  additionalDetails: {
    marginTop: height * 0.025,
    paddingHorizontal: width * 0.06,
  },
  arrowIcon: {
    marginLeft: 'auto',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  options: {
    paddingVertical: height * 0.017,
    gap: 5,
  },
  detailsText: {
    fontSize: 12,
  },
  detailsTitle: {
    paddingTop: height * 0.01,
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  statusContainer: {
    textAlign: 'center',
    borderRadius: 20,
    width: width * 0.30,
  },
  noBookings: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'grey',
  },
  tabsContainer: {
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: '#f8f8f8',
    padding:height*.015,
    // backgroundColor: '#fff',
    // padding: 10,
    borderRadius: 99,
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
    borderRadius: 99,
    cursor: 'pointer',
    transition: 'color 0.15s ease-in',
  },
  activeTab: {
    backgroundColor: '#8c52ff',
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  activeTabText: {
    color: '#fff',
  },
  glider: {
    position: 'absolute',
    height: 30,
    width: width / 4 - 20,
    backgroundColor: '#C9AEFF',
    borderRadius: 99,
    zIndex: -1,
    transition: 'transform 0.25s ease-out',
  },
});
