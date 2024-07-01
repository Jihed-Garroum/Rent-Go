import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from "react-native";

export default function Options2({ totalPrice, markedDates, onMileagePackageChange }) {
  const [selectedOption, setSelectedOption] = useState("bestPrice");

  useEffect(() => {
    if (selectedOption === "+250km") {
      const days = markedDates.length ? markedDates.length - 1 : 0;
      onMileagePackageChange("+250km");
    } else {
      onMileagePackageChange("bestPrice");
    }
  }, [selectedOption, markedDates]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => handleOptionSelect("bestPrice")}>
          <View style={[styles.radio, selectedOption === "bestPrice" && styles.radioActive]}>
            <Text style={styles.radioLabel}>stay flexible</Text>
            <Text style={styles.radioDescription}>250 kilometers are included in the price. Additional kilometers are charged at 0.8 DT per kilometer.</Text>            
            {selectedOption === "bestPrice" && <View style={[styles.radioInput, styles.radioInputActive]} />}
          </View>
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  radio: {
    backgroundColor: "#fff",
    marginBottom: 12,
    padding: 16,
    borderRadius: 25,
    alignItems: "flex-start",
    borderWidth: 2,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  radioActive: {
    borderColor: "#8c52ff",
  },
  radioLabel: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1.2,
    color: "black",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  radioDescription: {
    fontSize: 15,
    fontWeight: "500",
    color: "#848a96",
  },
  radioInput: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 24,
    height: 24,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: "transparent",
  },
  radioInputActive: {
    backgroundColor: "#8c52ff",
  },
});
