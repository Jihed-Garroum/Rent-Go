import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Platform, Dimensions, ScrollView, Image, Modal, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { height, width } = Dimensions.get("screen");

const Legal = ({ navigation }) => {
  const [isPrivacyModalVisible, setPrivacyModalVisible] = useState(false);
  const [isImprintModalVisible, setImprintModalVisible] = useState(false);
  const [isAnalyticsModalVisible, setAnalyticsModalVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [modalTitle, setModalTitle] = useState('');

  const handlePrivacyPolicy = () => {
    setImages([
      'https://res.cloudinary.com/dl9cp8cwq/image/upload/v1718098014/couverture_ke3trh.png',
      'https://res.cloudinary.com/dl9cp8cwq/image/upload/v1718098000/p1_es3mlw.png',
      'https://res.cloudinary.com/dl9cp8cwq/image/upload/v1718118222/1.1_kur1jq.png',
      'https://res.cloudinary.com/dl9cp8cwq/image/upload/v1718118226/1_b3qbkh.png',
      'https://res.cloudinary.com/dl9cp8cwq/image/upload/v1718118222/2_uz66ij.png',
      'https://res.cloudinary.com/dl9cp8cwq/image/upload/v1718118223/2.2_ogvhw7.png',
      'https://res.cloudinary.com/dl9cp8cwq/image/upload/v1718118222/3_fnmbsu.png',
      'https://res.cloudinary.com/dl9cp8cwq/image/upload/v1718118222/3.3_obfwls.png',
      'https://res.cloudinary.com/dl9cp8cwq/image/upload/v1718118225/4.4_gzfvbl.png',
      'https://res.cloudinary.com/dl9cp8cwq/image/upload/v1718118222/4_fotqgr.png',
      'https://res.cloudinary.com/dl9cp8cwq/image/upload/v1718098010/p6_ypjiil.png',
    ]);
    setModalTitle('Privacy Policy');
    setPrivacyModalVisible(true);
  };

  const handleImprint = () => {
    setImprintModalVisible(true);
  };

  const handleAnalyticsPolicy = () => {
    setImages([
      ''

    ]);
    setModalTitle('Analytics Policy');
    setAnalyticsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.arrowContainer} onPress={() => setTimeout(()=>{
          navigation.goBack()
        },200)}>
          <Ionicons name="arrow-back-circle" size={45} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        <Pressable style={[styles.pressable, styles.separator]} onPress={handleImprint}>
          <Ionicons name="document-outline" size={24} color="black" />
          <Text style={styles.text}>Imprint</Text>
        </Pressable>
        <Pressable style={[styles.pressable, styles.separator]} onPress={handlePrivacyPolicy}>
          <Ionicons name="lock-closed-outline" size={24} color="black" />
          <Text style={styles.text}>Privacy Policy</Text>
        </Pressable>
        {/* <Pressable style={[styles.pressable]} onPress={handleAnalyticsPolicy}>
          <Ionicons name="analytics-outline" size={24} color="black" />
          <Text style={styles.text}>Analytics Policy</Text>
        </Pressable> */}
      </View>

      {/* Privacy Policy Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isPrivacyModalVisible}
        onRequestClose={() => setPrivacyModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Privacy Policy</Text>
              <Pressable onPress={() => setPrivacyModalVisible(false)}>
                <Ionicons name="close" size={30} color="black" />
              </Pressable>
            </View>
            <ScrollView contentContainerStyle={styles.imageContainer} showsVerticalScrollIndicator={false}>
              {images.map((imageUri, index) => (
                <Image
                  key={index}
                  source={{ uri: imageUri }}
                  style={styles.image}
                  resizeMode="contain"
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Imprint Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isImprintModalVisible}
        onRequestClose={() => setImprintModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Imprint</Text>
              <Pressable onPress={() => setImprintModalVisible(false)}>
                <Ionicons name="close" size={30} color="black" />
              </Pressable>
            </View>
            <ScrollView contentContainerStyle={styles.infoContainer}>
              <Text style={styles.infoText}>Company Name: Aqwa Cars S.A.R.L.</Text>
              <Text style={styles.infoText}>Address: Immeuble El Fawz, Av du Dirham, Les Berges du Lac 2, Tunis</Text>
              <Text style={styles.infoText}>Phone: (+216) 99 199 019</Text>
              <Text style={styles.infoText}>Email: info@aqwacars.com</Text>
              <Text style={styles.infoText}>Version: 1.0.0</Text>
              <Text style={styles.infoText}>
                This application is developed and maintained by Aqwa Cars Ltd. All information provided in this app is for general informational purposes only. For more details, please contact us.
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Analytics Policy Modal */}
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={isAnalyticsModalVisible}
        onRequestClose={() => setAnalyticsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Analytics Policy</Text>
              <Pressable onPress={() => setAnalyticsModalVisible(false)}>
                <Ionicons name="close" size={30} color="black" />
              </Pressable>
            </View>
            <ScrollView contentContainerStyle={styles.imageContainer} showsVerticalScrollIndicator={false}>
              {images.map((imageUri, index) => (
                <Image
                  key={index}
                  source={{ uri: imageUri }}
                  style={styles.image}
                  resizeMode="contain"
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal> */}
    </View>
  );
};

export default Legal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  arrowContainer: {
    paddingHorizontal: 5,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  header: {
    height: Platform.OS === 'ios' ? height * 0.12 : height * 0.12,
    alignItems: 'center',
    paddingTop:height*.04,
    width: '100%',
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
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
    paddingVertical: height * 0.02,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomSheet: {
    width: '100%',
    height: height * 0.8,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  image: {
    width: width * 0.8,
    height: height * 0.5,
    marginVertical: 10,
  },
  infoContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  infoText: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'left',
  },
});
