import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, Button, TouchableOpacity, Touchable } from 'react-native';
import CircularProgress from '../../Components/CircularProgress'; // Importar componente si es necesario
import fonts from '../../Utils/fonts'; // Importar fuentes si es necesario
import colors from '../../Utils/colors'; // Importar colores si es necesario
import { BtnCheck, BtnX, Close, Closeb, Verify } from '../../Assets/svg'; // Importar iconos SVG si es necesario
import Header from '../../Components/Header'; // Importar componente de encabezado si es necesario
import LinearGradient from 'react-native-linear-gradient'; // Importar LinearGradient si es necesario
import { Mapmg, Tall, Baby, People, Study, Job, Politic, Religion } from '../../Assets/svg'; // Importar iconos SVG específicos si es necesario
import Juan from './../../Assets/img/juan.png'; // Importar imágenes si es necesario
import { useNavigation } from '@react-navigation/native'; // Importar hook de navegación si es necesario
import Svg, { Circle } from 'react-native-svg'; // Importar SVG si es necesario
import HeaderUser from '../../Components/HeaderUser';


const icons = [
  Mapmg,
  Tall,
  Baby,
  People,
  Study,
  Job,
  Politic,
  Religion,
];

const RowItem = ({ text, Icon }) => (
  <View style={styles.row}>
    <Icon height="24" width="24" style={styles.svg} />
    <Text style={styles.text}>{text}</Text>
  </View>
);

const profiles = Array.from({ length: 12 }, (_, index) => ({
  name: `Person ${index + 1}`,
  age: 20 + index,
  about: `This is a brief about Person ${index + 1}.`,
  sundayActivity: `On Sundays, Person ${index + 1} likes to ...`,
  loveLanguage: `Person ${index + 1}'s love language is ...`,
  firstDate: `Person ${index + 1}'s ideal first date is ...`,
  image: Juan,
}));

export default function DetailProfilemsg() {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProfile = profiles[currentIndex];

  const handleNextProfile = () => {
    if (currentIndex === profiles.length - 1) {
      // Si es el último perfil, mostrar mensaje y difuminar fondo
      setShowEndMessage(true);
    } else {
      // Si no es el último perfil, pasar al siguiente perfil
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const [showEndMessage, setShowEndMessage] = useState(false);



  const items = Array.from({ length: 8 }, (_, index) => ({
    text: `Item ${index + 1}`,
    Icon: icons[index],
  }));

  return (
    <>
      <View style={{ flex: 1, backgroundColor: colors.neutral.white }}>
        <SafeAreaView />
        <HeaderUser text='The Daily List' svg2={<Close/>} onPress2={() => navigation.navigate('irl')} />
        <ScrollView style={{ paddingHorizontal: 20 }}>
          <View style={{ marginVertical: 10 }}>
            <LinearGradient
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.2)']}
              style={{ borderRadius: 20, width: '100%', height: 500, zIndex: 1 }}
            />
            <Image
              source={currentProfile.image}
              style={{
                borderRadius: 20,
                width: '100%',
                height: 500,
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 0,
                
              }}
            />
            <View
              style={{
                position: 'absolute',
                bottom: 50,
                left:'7%',
                right: 0,
                paddingBottom: 20,
                zIndex: 2,
                flexDirection: 'row',
              }}>
              
              <TouchableOpacity style={{ marginTop: 8 }} onPress={() => { handleNextProfile()}}>
                <BtnX />
              </TouchableOpacity>
            </View>

            <View
              style={{
                position: 'absolute',
                bottom: 50,
                left: '77%',
                right: 20,
                paddingBottom: 20,
                zIndex: 2,
                flexDirection: 'row',
              }}>
              
              <TouchableOpacity style={{ marginTop: 8 }} onPress={() => {navigation.navigate('match');handleNextProfile()}}>
                <BtnCheck />
              </TouchableOpacity>
            </View>


            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                paddingBottom: 20,
                zIndex: 2,
                flexDirection: 'row',
              }}>
              <Text
                style={[
                  { color: colors.neutral.white, paddingHorizontal: 12, marginRight: 0 },
                  fonts.H3,
                ]}>
                {currentProfile.name}, {currentProfile.age}
              </Text>
            </View>
          </View>

          <View style={styles.container}>
            {items.map((item, index) => (
              <RowItem key={index} text={item.text} Icon={item.Icon} />
            ))}
          </View>

          <View style={{ flex: 1, marginVertical: 30 }}>
            <Text style={[fonts.H4, { color: colors.neutral.darkest }]}>
              About me
            </Text>

            <Text style={[fonts.B1, { color: colors.neutral.darkest, marginVertical: 16 }]}>
              {currentProfile.about}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: colors.secondary.lighest,
              paddingHorizontal: 20,
              paddingVertical: 20,
              borderRadius: 20,
              flexDirection: 'row',
            }}>

            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={[fonts.H4, { color: colors.neutral.darkest }]}>
                Our Sundays you can find me ...{' '}
              </Text>

              <Text style={[fonts.B1, { color: colors.neutral.darkest }]}>
                {currentProfile.sundayActivity}
              </Text>
            </View>
          </View>

          <View style={{ marginVertical: 10 }}>
            <LinearGradient
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.2)']}
              style={{ borderRadius: 20, width: '100%', height: 350, zIndex: 1 }}
            />
            <Image
              source={currentProfile.image}
              style={{
                borderRadius: 20,
                width: '100%',
                height: 350,
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 0,
              }}
            />
          </View>

          <View
            style={{
              backgroundColor: colors.primary.lighest,
              paddingHorizontal: 20,
              paddingVertical: 20,
              borderRadius: 20,
              flexDirection: 'row',
            }}>

            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={[fonts.H4, { color: colors.neutral.darkest }]}>
                My love language is ...
              </Text>

              <Text style={[fonts.B1, { color: colors.neutral.darkest }]}>
                {currentProfile.loveLanguage}
              </Text>
            </View>
          </View>

          <View style={{ marginVertical: 10 }}>
            <LinearGradient
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.2)']}
              style={{ borderRadius: 20, width: '100%', height: 350, zIndex: 1 }}
            />
            <Image
              source={currentProfile.image}
              style={{
                borderRadius: 20,
                width: '100%',
                height: 350,
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 0,
              }}
            />
          </View>

          <View
            style={{
              backgroundColor: colors.secondary.lighest,
              paddingHorizontal: 20,
              paddingVertical: 20,
              borderRadius: 20,
              marginBottom: '20%',
              flexDirection: 'row',
            }}>

            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={[fonts.H4, { color: colors.neutral.darkest }]}>
                What my ideal first date looks like ...
              </Text>

              <Text style={[fonts.B1, { color: colors.neutral.darkest }]}>
                {currentProfile.firstDate}
              </Text>
            </View>
          </View>

          <Button title="Next Profile" onPress={handleNextProfile} />

        </ScrollView>
        
      </View>
      {showEndMessage && (
          <>
        
        <View style={styles.overlay}>
          <View style={{height:'8%', backgroundColor:colors.neutral.white}}/>
        <HeaderUser text='The Daily List' svg2={<Close/>} onPress2={() => navigation.navigate('irl')} />
          <View style={styles.centeredView}>
            <Text style={[styles.mainText, fonts.H2]}>Set more matches</Text>
            <Text style={[styles.subtitle, fonts.B1]}>You haven’t more chances to match for today</Text>
            <TouchableOpacity style={styles.upgradeButton} onPress={() => navigation.navigate('UpgradePlan')}>
              <Text style={[styles.upgradeText, fonts.Btn]}>Upgrade my plan</Text>
            </TouchableOpacity>
          </View>
        </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    shadowColor: colors.neutral.darkest,
  },
  svg: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    color: colors.neutral.darkest,
  },
  container: {
    padding: 16,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
   
    padding: 20,
    borderRadius: 20,
  },
  mainText: {
    color: colors.neutral.white,
    marginBottom: 10,
  },
  subtitle: {
    color: colors.neutral.white,
    marginBottom: 20,
    paddingHorizontal:50,
    textAlign:'center'
  },
  upgradeButton: {
    backgroundColor: colors.primary.medium,
    paddingVertical: 10,
    paddingHorizontal: 90,
    borderRadius: 20,
  },
  upgradeText: {
    color: colors.neutral.white,
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    height:'100%',
    zIndex: 10,
  },


});
