import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import colors from '../Utils/colors';
import fonts from '../Utils/fonts';

const CircularProgress = ({ percentage, radius, strokeWidth, color, showText}: any) => {
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <View>
      <Svg height={radius * 2} width={radius * 2}>
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill={colors.neutral.white}
          stroke={colors.neutral.lighest} 
          strokeWidth={strokeWidth}
        />
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90, ${radius}, ${radius})`}
        />
        { showText === true ?  
        <View style={styles.container}>
          <Text style={styles.text}>{percentage}%</Text>
        </View>
        : null}
       
          
      </Svg>
    </View>
  );
};

export default CircularProgress;

const styles = StyleSheet.create({
  container: {
    height:50,
    textAlign:"center",
    justifyContent:"center",
    alignContent:"center",
    alignItems:"center",
    alignSelf:"center",
  },
  text: {
    color: colors.primary.medium,
    fontWeight: 'bold',
    fontSize: 14, 
    paddingLeft:2
  },
});
