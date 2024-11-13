import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const PaymentButton = ({ icon, text, isSelected, onPress }:any) => {
  return (
    <TouchableOpacity
      style={[styles.paymentButton, isSelected && styles.selectedButton]}
      onPress={onPress}
    >
      <Image style={styles.iconCard} source={icon} resizeMode="contain"  />
      <Text style={styles.paymentText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  paymentButton: {
    paddingTop:5,
    borderRadius: 5,
    flex: 1,
    paddingHorizontal: 8,
    width: 100,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'flex-start',
    height: 50,
  },
  selectedButton: {
    borderColor: 'black',
    borderWidth: 1.5,
  },
  iconCard: {
    marginLeft:-8,
    height:18,
    borderWidth:1,
  },
  
  paymentText: {
    marginTop: 0,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default PaymentButton;
