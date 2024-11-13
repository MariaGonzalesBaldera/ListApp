import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import {  Animated } from 'react-native';

import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppleButton} from '../../Assets/svg';
import {Checked} from '../../Assets/svg';
import colors from '../../Utils/colors';

import RNCalendarEvents from 'react-native-calendar-events';
import HeaderBack from '../../Components/ListA/headerBack';
import fonts from '../../Utils/fonts';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import creditCard from '../../Assets/img/creditCard.png';
import ideaCard from '../../Assets/img/idealCard.png';
import sepaCard from '../../Assets/img/sepaCard.png';
import cardcvc from '../../Assets/img/cardcvc.png';

import cardInput from '../../Assets/img/cardInput.png';

import {Image} from 'react-native';
import PaymentButton from './checkCardPayment';

export default function Checkout({img, name, text}: any) {
  const navigation = useNavigation();
  const [stage, setStage] = useState(1);

  //check
  const [checked, setChecked] = useState(true);
  const handleToggle = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    // Solicitar permisos al iniciar la aplicación
    requestCalendarPermission();
  }, []);

  const requestCalendarPermission = async () => {
    const permission = await RNCalendarEvents.requestPermissions();
    if (permission !== 'authorized') {
      Alert.alert('Permiso denegado', 'No se puede acceder al calendario');
    }
  };
  const handleBack = () => {
    setStage(stage - 1); // Avanza a la siguiente etapa
  };

  //select card
  const [selectedMethod, setSelectedMethod] = useState(null);

  const paymentMethods = [
    {id: 'card', icon: creditCard, text: 'Card'},
    {id: 'ideal', icon: ideaCard, text: 'iDEAL'},
    {id: 'sepa', icon: sepaCard, text: 'SEPA Debit'},
  ];

  const handlePress = id => {
    setSelectedMethod(id);
  };


  //animation loading 
  const [visible, setVisible] = useState(false);
  const [animations] = useState(
    Array(6).fill(0).map(() => new Animated.Value(0))
  );

  const startLoadingAnimation = () => {
    setVisible(true);
    Animated.stagger(
      100,
      animations.map(anim =>
        Animated.loop(
          Animated.sequence([
            Animated.timing(anim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: false,
            }),
            Animated.timing(anim, {
              toValue: 0,
              duration: 500,
              useNativeDriver: false,
            }),
          ])
        )
      )
    ).start();
  };
  return (
    <>
      <View style={{flex: 1, backgroundColor: colors.neutral.white}}>
        <HeaderBack onPressA={() => handleBack()} />
        <View
          style={{
            marginTop: 25,
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <AppleButton />
          <View style={styles.textLine}>
            <View style={styles.line} />
            <Text style={styles.textA}> Or pay using </Text>
            <View style={styles.line} />
          </View>
          {/* Payment Methods */}
          <ScrollView horizontal={true} style={styles.paymentMethods}>
            {paymentMethods.map(method => (
              <PaymentButton
                key={method.id}
                icon={method.icon}
                text={method.text}
                isSelected={selectedMethod === method.id}
                onPress={() => handlePress(method.id)}
              />
            ))}
          </ScrollView>
          {/* Card Information */}

          <View style={styles.inputContainer}>
            <Text style={styles.subtitle}>Card Information</Text>

            <View style={styles.viewInfo}>
              <View>
                <View style={styles.viewInfoCard}>
                  <Image
                    style={styles.iconCard2}
                    source={cardInput}
                    resizeMode="contain"
                  />
                  <TextInput
                    style={[styles.input, styles.inputCard]}
                    placeholder="Card number"
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.lineLeft}>
                  <TextInput
                    style={[styles.input]}
                    placeholder="MM / YY"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.viewInfoCardcvc}>
                  <Image
                    style={styles.iconCard2}
                    source={cardcvc}
                    resizeMode="contain"
                  />
                  <TextInput
                    style={[styles.input, styles.cvcInput]}
                    placeholder="CVC"
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
            {/* Country/Region */}

            <Text style={styles.subtitle}>Country or region</Text>

            <View style={styles.viewInfo}>
              <Picker style={styles.picker}>
                <Picker.Item label="United States" value="us" />
                {/* Agrega más países según sea necesario */}
              </Picker>
              <View style={styles.row}>
                <TextInput style={[styles.input]} placeholder="ZIP" />
              </View>
            </View>
          </View>

          {/* Save Card Checkbox */}
          <View style={styles.checkboxContainer}>
            {/* <CheckBox /> */}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={handleToggle}>
              <View style={checked ? styles.checked : styles.checkbox}>
                {checked && <Checked />}
              </View>
              <Text style={styles.checkboxText}>
                Save this card for future powdur payments
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomView}>
          <TouchableOpacity
            style={styles.button}
            onPress={startLoadingAnimation}>
            <Text style={[fonts.Btn, {color: colors.neutral.white}]}>
              Pay $9.99
            </Text>
          </TouchableOpacity>
        </View>
        {visible && (
        <View style={styles.loadingContainer}>
          {animations.map((anim, index) => (
            <Animated.View
              key={index}
              style={[
                styles.rectangle,
                { opacity: anim, backgroundColor: `hsl(190, 100%, ${60 + index * 6}%)` },
              ]}
            />
          ))}
        </View>
      )}
      </View>
      
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary.medium,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  button2: {
    backgroundColor: colors.secondary.dark,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 35,
  },
  //text line
  textLine: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    margin: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc', // Color de la línea
  },
  textA: {
    fontSize: 14,
    color: '#999',
  },

  orText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  paymentMethods: {
    marginHorizontal: 20,
    flexDirection: 'row',
    marginBottom: 16,
  },
  paymentButton: {
    flex: 1,
    paddingHorizontal: 8,
    width: 100,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'flex-start',
    height: 50,
  },
  paymentText: {
    marginTop: -5,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },

  viewInfo: {
    marginTop: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
  },
  viewInfoCard: {
    flexDirection: 'row-reverse',
    borderRadius: 5,
    width: '100%',
    borderWidth: 1,
    paddingRight: 10,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  viewInfoCardcvc: {
    paddingRight: 10,
    alignItems: 'center',
    flexDirection: 'row-reverse',
    flex: 2,
  },
  input: {
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
    borderColor: 'transparent',
  },
  inputCard: {
    marginHorizontal: -20,
  },
  row: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  lineLeft: {
    flex: 2,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  cvcInput: {
    flex: 2,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 13.5,
    width: '100%',
    paddingHorizontal: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 2,
    marginRight: -2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#000',
    borderColor: colors.primary.medium,
    borderRadius: 2,
  },
  checkboxText: {
    marginLeft: 8,
    fontSize:12
  },
 
  iconCard2: {
    width: 30,
  },

  subtitle: {
    fontWeight: 'bold',
  },
  loadingContainer: {
    width:"100%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  rectangle: {
    width: 70,
    height: 20,
    marginVertical: 6,
  },
});
