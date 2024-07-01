import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const CustomCheckbox = ({ label, onChange }) => {
  const [checked, setChecked] = useState(false);

  const handlePress = () => {
    setChecked(!checked);
    onChange(!checked);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.checkbox, checked && styles.checkboxChecked]}
        onPress={handlePress}
      >
        {checked && <View style={styles.checkmark} />}
      </TouchableOpacity>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default CustomCheckbox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#8c52ff',
    borderColor: 'transparent',
  },
  checkmark: {
    width: 4,
    height: 7,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#fff',
    transform: [{ rotate: '45deg' }],
  },
  label: {
    fontSize: 16,
    color: 'black',
  },
});
