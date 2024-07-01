import { StyleSheet, Text, View, Dimensions, Pressable,Linking,Platform, TouchableOpacity } from 'react-native';
import React from 'react';
// import ArrowBack from '../assets/Svg/blackArrow.svg';
import { Ionicons } from '@expo/vector-icons';
// import * as Cellular from 'expo-cellular';
import { useNavigation } from '@react-navigation/native';
const { height, width } = Dimensions.get("screen");

const FAQS = () => {

    const navigation = useNavigation()

    const handleCallCustomerSupport = () => {
        const phoneNumber=99199019
        Linking.openURL(`tel:${phoneNumber}`);
    };

    const handleCustomerSupportMail = (initialBody = '') => {
        const emailAddress = 'contact@aqwa-cars.com';
        const subject = 'Customer Support Request';
        const encodedBody = encodeURIComponent(initialBody);
        const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodedBody}`;
        Linking.openURL(mailtoUrl);
      };

    const handleReportDamage = () => {
        const phoneNumber=99199019
        Linking.openURL(`tel:${phoneNumber}`);
    };

    const handleRentalSupportMail = () => {
        const emailAddress = 'contact@aqwa-cars.com';
        const subject = 'Rental Support Request';
        const encodedBody = encodeURIComponent(initialBody);
        const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodedBody}`;
        Linking.openURL(mailtoUrl);
    };

    return (
        <View style={{ flex: 1,backgroundColor: 'white' }}>
           <View style={styles.header}>
      <TouchableOpacity style={styles.arrowContainer} onPress={() => setTimeout(()=>{
          navigation.goBack()
        },200)}>
            <Ionicons name="arrow-back-circle" size={45} color="black" />
          </TouchableOpacity>
      </View>
            <View style={styles.list}>
                <Pressable style={[styles.pressable, styles.separator]} onPress={handleCallCustomerSupport}>
                    <Ionicons name="call-outline" size={24} color="black" />
                    <Text style={[styles.text,{paddingTop:height*.01}]}>Call Customer Support</Text>
                </Pressable>
                <Pressable style={[styles.pressable, styles.separator]} onPress={handleCustomerSupportMail}>
                    <Ionicons name="mail-outline" size={24} color="black" />
                    <Text style={styles.text}>Customer Support (Mail)</Text>
                </Pressable>
                <Pressable style={[styles.pressable, styles.separator]} onPress={handleReportDamage}>
                    <Ionicons name="warning-outline" size={24} color="black" />
                    <Text style={styles.text}>Report Damage</Text>
                </Pressable>
                <Pressable style={[styles.pressable]} onPress={handleRentalSupportMail}>
                    <Ionicons name="mail-outline" size={24} color="black" />
                    <Text style={styles.text}>Rental Support (Mail)</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default FAQS

const styles = StyleSheet.create({
    arrowContainer: {
        paddingHorizontal: 5,
        paddingTop: Platform.OS ==='ios'?20:0,
        // height:height*0.1
      },
      header: {
        height: Platform.OS ==='ios'?height * 0.12:height*0.12,
        alignItems:'center',
        // justifyContent:'center',
        // marginTop:20,
        width: '100%',
        backgroundColor: '#f8f8f8',
        flexDirection: 'row',
        paddingTop:height*.04,
        alignItems: 'center',
        paddingHorizontal: width * 0.04,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },
    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1', 
        paddingBottom: 10, 
    },
    text: {
        marginLeft: 15, 
        fontSize: 16,
        fontWeight: '700',
    },
    list: {
        paddingHorizontal: width * 0.06,
        // paddingVertical: height * 0.03
    }
})
