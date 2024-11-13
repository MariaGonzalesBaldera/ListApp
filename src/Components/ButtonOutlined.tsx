import React, {useContext} from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import fonts from '../Utils/fonts';
import {SvgUri} from 'react-native-svg';

import Arrow from '../assets/svg/arrow.svg';
import colors from '../Utils/colors';
import {ThemeContext} from '../Components/themeContext';

const ButtonOutline = ({
  onPress,
  text,
  colors,
  padd,
  showSvg,
  showSvgBack,
}: any) => {
  const {theme} = useContext(ThemeContext);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonContainer, {borderColor: theme.primary}]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {showSvgBack && <View style={{paddingRight: 6}}>{showSvgBack}</View>}
        <Text style={[fonts.Btn, {color: theme.primary}]}>{text}</Text>
        {showSvg && <View style={{paddingLeft: 6}}>{showSvg}</View>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 47,
  },
});

export default ButtonOutline;
