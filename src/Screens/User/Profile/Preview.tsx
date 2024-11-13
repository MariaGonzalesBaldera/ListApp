import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import Header from '../../../Components/Header';
import fonts from '../../../Utils/fonts';
import colors from '../../../Utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import CircularProgress from '../../../Components/CircularProgress';
import {
  Mapmg,
  Tall,
  Baby,
  People,
  Study,
  Job,
  Politic,
  Religion,
} from '../../../Assets/svg';

const {width, height} = Dimensions.get('window');

import {MeUser} from '../../../Services/User/UserServices';
import {ThemeContext} from '../../../Components/themeContext';

export default function Register() {
  const navigation = useNavigation();
  const {theme} = useContext(ThemeContext);
  const [user, setUser] = useState([]);

  useEffect(() => {
    console.log('Case 10 selected, running useEffect...');

    const fetchUser = async () => {
      const userData = await MeUser();
      setUser(userData);
      console.log('userData', userData);
    };
    fetchUser();
  }, []);

  const iconsWithData = [
    {Icon: Tall, data: user?.height},
    {Icon: Mapmg, data: user?.neighborhood},
    {Icon: Baby, data: user?.family_plans?.name},
    {Icon: Religion, data: user?.religions?.name},
    {Icon: People, data: user?.religions?.name},
    {Icon: Study, data: user?.school},
    {Icon: Job, data: user?.work},
    {Icon: Politic, data: user?.politicals?.name},
  ];

  const RowItem = ({text, Icon, data}: any) => (
    <View style={styles.row}>
      <Icon height="24" width="24" style={styles.svg} />
      <Text style={[styles.text, {color: theme.text}]}>{data}</Text>
    </View>
  );

  const images = user?.photos?.map(photo => ({uri: photo.image_url}));

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: theme.background, height: '100%'}}>
      <View style={styles.container}>
        <Header onPress={() => navigation.goBack()} />
        <ScrollView
          showsVerticalScrollIndicator={false} // Oculta la barra de desplazamiento vertical
          showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento horizontal, si es necesario
        >
          <View style={{marginVertical: 10}}>
            <LinearGradient
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.2)']}
              style={{
                borderRadius: 20,
                width: '100%',
                height: 350,
                zIndex: 1,
              }}
            />
            <Image
              source={{uri: user?.profile_image}}
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
                  {
                    color: colors.neutral.white,
                    paddingHorizontal: 12,
                    marginRight: 0,
                  },
                  fonts.H3,
                ]}>
                {user?.name}, {user?.age}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: colors.secondary.light,
              paddingHorizontal: 20,
              paddingVertical: 20,
              borderRadius: 20,
              flexDirection: 'row',
            }}>
            <CircularProgress
              percentage={Math.round(user?.percentage_profile)}
              radius={25}
              strokeWidth={2}
              showText={true}
              color={colors.primary.medium}
            />
            <View style={{flex: 1, marginLeft: 8}}>
              <Text style={[fonts.H4, {color: colors.neutral.darkest}]}>
                Your profile isn’t{' '}
              </Text>
              <Text
                style={[
                  fonts.H4,
                  {marginBottom: 8, color: colors.primary.medium},
                ]}>
                {' '}
                complete
              </Text>
              <Text style={[fonts.B1, {color: colors.neutral.darkest}]}>
                If you want to find your perfect match, complete it 100%.{' '}
              </Text>
            </View>
          </View>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {iconsWithData.slice(0, 4).map((item, index) => (
              <View
                key={index}
                style={{marginRight: 12, flexDirection: 'row', marginTop: 8}}>
                <RowItem
                  text={`Item ${index + 1}`}
                  Icon={item.Icon}
                  data={item.data}
                />
                <View style={styles.divider} />
              </View>
            ))}
          </ScrollView>

          {/* Contenedor vertical para los demás ítems */}
          <View style={[styles.verticalContainer, {marginTop: 12}]}>
            {iconsWithData.slice(4).map((item, index) => (
              <View key={index + 4} style={styles.verticalItem}>
                <RowItem
                  text={`Item ${index + 5}`}
                  Icon={item.Icon}
                  data={item.data}
                />
              </View>
            ))}
          </View>

          <View style={{flex: 1, marginVertical: 30}}>
            <Text style={[fonts.H4, {color: theme.text}]}>About me</Text>

            <Text style={[fonts.B1, {color: theme.text, marginVertical: 16}]}>
              {user?.description}
            </Text>
          </View>

          {user?.prompts?.slice(0, 3).map((prompt, index) => (
            <View key={prompt.id}>
              {/* Prompt Section */}
              <View
                style={{
                  backgroundColor:
                    index % 2 === 0
                      ? colors.secondary.lighest
                      : colors.primary.lighest,
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                  borderRadius: 20,
                  flexDirection: 'row',
                  marginBottom: 10,
                }}>
                <View style={{flex: 1, marginLeft: 8}}>
                  <Text style={[fonts.H4, {color: colors.neutral.darkest}]}>
                    {prompt.name} {/* Aquí solo uso prompt.name */}
                  </Text>

                  <Text style={[fonts.B1, {color: colors.neutral.darkest}]}>
                    {prompt.user_prompts_entity?.reply}
                  </Text>
                </View>
              </View>

              {/* Image Section */}
              <View style={{marginVertical: 10}}>
                <LinearGradient
                  colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.2)']}
                  style={{
                    borderRadius: 20,
                    width: '100%',
                    height: 350,
                    zIndex: 1,
                  }}
                />
                <Image
                  source={images[index]}
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
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.goBack();
          }}
          //onPress={ () => {ValidateForm()}}
          //onPress={() => {console.log(formDetails)}}
        >
          <Text style={[fonts.Btn, {color: colors.neutral.white}]}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.neutral.light,
    fontSize: 14,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.neutral.lighest,
    marginBottom: 24,
    color: colors.neutral.darkest,
  },
  inputprompt: {
    fontSize: 14,
    borderRadius: 20,
    paddingBottom: 12,
    backgroundColor: colors.neutral.light,
    color: colors.neutral.darkest,
  },
  input2: {
    borderWidth: 1,
    borderColor: colors.neutral.light,
    fontSize: 14,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingBottom: 80,
    paddingTop: 16,
    backgroundColor: colors.neutral.lighest,
    marginBottom: 24,
    color: colors.neutral.darkest,
  },
  input3: {
    borderWidth: 1,
    borderColor: colors.neutral.light,
    fontSize: 14,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.neutral.lighest,
    color: colors.neutral.darkest,
  },
  button: {
    backgroundColor: colors.primary.medium,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  button2: {
    backgroundColor: colors.neutral.darkest,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8, // Coloca el botón al final de la pantalla
    marginBottom: 16,
  },
  buttonL: {
    backgroundColor: colors.neutral.darkest,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8, // Coloca el botón al final de la pantalla
  },
  button3: {
    backgroundColor: colors.primary.medium,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 16,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  codeInput: {
    borderWidth: 1,
    borderColor: colors.neutral.light,
    fontSize: 20,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '15%',
    textAlign: 'center',
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: colors.primary.medium,
    borderColor: colors.primary.medium,
  },
  checkboxText: {
    fontSize: 14,
    color: colors.neutral.dark,
    maxWidth: '80%',
  },

  buttonContainer: {
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.neutral.light,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  optionButtonB: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.neutral.medium,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  selectedButtonsex: {
    backgroundColor: colors.primary.light,
  },
  selectedButton: {
    backgroundColor: colors.primary.light,
  },
  selectedButtonB: {
    borderColor: colors.primary.light,
  },
  optionText: {
    fontSize: 14,
    color: colors.neutral.dark,
    fontWeight: '600',
  },
  selectedText: {
    color: colors.neutral.darkest,
  },

  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },

  number: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.neutral.darkest,
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  section3: {
    color: colors.primary.medium,
    marginLeft: 12,
  },
  disabledButton: {
    backgroundColor: colors.neutral.medium,
  },
  questionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 16,
  },
  questionHeader: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  map: {
    marginVertical: 20,
    height: 240,
  },
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
  },
  codeInputWithDigit: {
    borderColor: colors.neutral.dark,
  },
  codeInputWithoutDigit: {
    borderColor: colors.neutral.medium,
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: colors.neutral.light,
    marginLeft: 16,
  },
  verticalContainer: {
    flexDirection: 'column',
  },
  verticalItem: {
    marginBottom: 12,
    flexDirection: 'row',
  },
  menuContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.white,
    backgroundColor: colors.neutral.white,
  },
  menuItem: {
    marginRight: 20,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  selectedMenuItem: {
    borderBottomColor: colors.primary.medium,
  },
  menuText: {
    fontSize: 16,
    color: colors.neutral.darkest,
  },
  selectedMenuText: {
    color: colors.primary.medium,
  },
  contentContainer: {
    backgroundColor: colors.neutral.lighest,
    flex: 1,
  },
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  chatContent: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  disabledButtonB: {
    backgroundColor: 'lightgray',
  },
  disabledText: {
    color: 'gray',
  },
});
