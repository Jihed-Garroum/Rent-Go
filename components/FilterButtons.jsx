import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Pressable, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import AdvancedSearch from '../pages/AdvancedSearch';

const { height, width } = Dimensions.get('screen');

const FilterButtons = ({
  selectedFuelType,
  setSelectedFuelType,
  selectedCarClass,
  setSelectedCarClass,
  selectedTransmission,
  setSelectedTransmission,
  applyFilters,
}) => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterTrigger, setFilterTrigger] = useState(false);

  const buttonsData = [
    { id: '1', title: 'Filter & Sort', icon: 'options' },
    { id: '2', title: 'Automatic Transmission', icon: 'car', filter: { type: 'Automatic' } },
    { id: '3', title: 'Economy Class', icon: 'cash', filter: { category: 'Economy' } },
    { id: '4', title: 'Premium', icon: 'star', filter: { category: 'Premium' } },
  ];

  useEffect(() => {
    if (filterTrigger) {
      applyFilters();
      setFilterTrigger(false);
    }
  }, [filterTrigger]);

  const handleButtonPress = (item) => {
    setSelectedButton(item.id);

    if (item.id === '1') {
      setIsModalVisible(true);
    } else {
      // Update the selected filter states
      if (item.filter.type) setSelectedTransmission(item.filter.type);
      if (item.filter.category) setSelectedCarClass(item.filter.category);
      setFilterTrigger(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const renderButton = ({ item }) => (
    <Pressable
      style={[
        styles.button,
        selectedButton === item.id && { backgroundColor: '#8c52ff' }
      ]}
      onPress={() => handleButtonPress(item)}
    >
      <Ionicons name={item.icon} size={20} color={selectedButton === item.id ? 'white' : 'black'} style={styles.icon} />
      <Text style={[styles.buttonText, selectedButton === item.id && { color: 'white' }]}>
        {item.title}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={buttonsData}
        renderItem={renderButton}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={handleCloseModal}
        onSwipeComplete={handleCloseModal}
        swipeDirection="down"
        style={styles.bottomModal}
      >
        <View style={styles.modalContent}>
          <AdvancedSearch
            handleCloseModal={handleCloseModal}
            selectedFuelType={selectedFuelType}
            setSelectedFuelType={setSelectedFuelType}
            selectedCarClass={selectedCarClass}
            setSelectedCarClass={setSelectedCarClass}
            selectedTransmission={selectedTransmission}
            setSelectedTransmission={setSelectedTransmission}
            applyFilters={applyFilters}
          />
        </View>
      </Modal>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#ECECEC',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    height: height * 0.05,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    marginLeft: 5,
  },
  icon: {
    marginRight: 5,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    height: height * 0.85,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default FilterButtons;
