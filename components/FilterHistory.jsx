import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get("window");

const FilterHistory = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(true);
  const dropdownRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(""); // State to track the selected item

  const toggleDropdown = () => {
    setIsDropdownVisible(prevState => !prevState);
    if (!isDropdownVisible) {
      dropdownRef.current.transitionTo({ opacity: 1 });
      dropdownRef.current.slideInLeft(250);
    } else {
      dropdownRef.current.slideOutLeft(250).then(endState => {
        if (endState.finished) {
          dropdownRef.current.transitionTo({ opacity: 0 });
        }
      });
    }
  };

  const handleItemPress = (item) => {
    setSelectedItem(item); // Update selected item
    // Perform additional actions if needed
  };

  return (
    <View style={styles.container}>
      <Animatable.View
        ref={dropdownRef}
        style={styles.dropdown}
      >
        <TouchableOpacity onPress={() => handleItemPress("All")} style={[styles.item, selectedItem === "All" && styles.selectedItem]}>
          <Text style={[styles.itemText, selectedItem === "All" && styles.selectedItemText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleItemPress("Pending")} style={[styles.item, selectedItem === "Pending" && styles.selectedItem]}>
          <Text style={[styles.itemText, selectedItem === "Pending" && styles.selectedItemText]}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleItemPress("Accepted")} style={[styles.item, selectedItem === "Accepted" && styles.selectedItem]}>
          <Text style={[styles.itemText, selectedItem === "Accepted" && styles.selectedItemText]}>Accepted</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleItemPress("Rejected")} style={[styles.item, selectedItem === "Rejected" && styles.selectedItem]}>
          <Text style={[styles.itemText, selectedItem === "Rejected" && styles.selectedItemText]}>Rejected</Text>
        </TouchableOpacity>
      </Animatable.View>
      <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
        <Icon name="list" size={20} color="white" /> 
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: width * 0.95
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#386BF6',
    padding: 10,
    borderRadius: 5,
    // marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  dropdown: {
    width: width * 0.8,
    height: height * 0.07,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  item: {
    padding: 8,
    borderRadius: 20,
  },
  itemText: {
    fontSize: 14,
    color: 'black',
  },
  selectedItem: {
    backgroundColor: '#386BF6',
  },
  selectedItemText: {
    color: 'white',
  },
});

export default FilterHistory;
