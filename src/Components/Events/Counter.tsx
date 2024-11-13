import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import colors from '../../Utils/colors';

const Counter = () => {
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(prevCount => prevCount - 1);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={decrement} style={styles.button}>
        <Svg width="24" height="24" viewBox="0 0 24 24">
          <Path d="M19 13H5v-2h14v2z" fill="#000" />
        </Svg>
      </TouchableOpacity>
      <Text style={[styles.countText, {color: colors.neutral.darkest}]}>{count}</Text>
      <TouchableOpacity onPress={increment} style={styles.button}>
        <Svg width="24" height="24" viewBox="0 0 24 24">
          <Path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="#000" />
        </Svg>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:colors.neutral.medium,
    borderRadius: 20,
  },
  button: {
    padding: 10,
  },
  countText: {
    fontSize: 24,
    marginHorizontal: 20,
  },
});

export default Counter;