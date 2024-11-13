import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../Utils/colors';

const RadioButton = ({ selected, onPress, label }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.radioCircle, selected && styles.selectedRadioCircle]}>
        {selected && <View style={styles.selectedRb} />}
      </View>
      <Text style={styles.radioText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2e2e2e',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRadioCircle: {
    borderColor: colors.neutral.darkest,
  },
  selectedRb: {
    width: 12,
    height: 12,
    borderRadius: 7,
    backgroundColor: '#CC007A',
  },
  radioText: {
    fontSize: 16,
    color: '#2e2e2e',
  },
});

export default RadioButton;
