import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Touchable,
} from 'react-native';
import fonts from '../../../Utils/fonts'; // Importar fuentes si es necesario
import colors from '../../../Utils/colors'; // Importar colores si es necesario
import {BtnCheck, BtnX, Close} from '../../../Assets/svg'; // Importar iconos SVG si es necesario
import LinearGradient from 'react-native-linear-gradient'; // Importar LinearGradient si es necesario
import {
  Mapmg,
  Tall,
  Baby,
  People,
  Study,
  Job,
  Politic,
  Religion,
} from '../../../Assets/svg'; // Importar iconos SVG específicos si es necesario
import Juan from './../../../Assets/img/juan.png'; // Importar imágenes si es necesario
import {useNavigation} from '@react-navigation/native'; // Importar hook de navegación si es necesario
import HeaderUser from '../../../Components/HeaderUser';
import {ThemeContext} from '../../../Components/themeContext';
import {GetInfobyUser} from '../../../Services/Messaging/MessagingServices';

const icons = [Mapmg, Tall, Baby, People, Study, Job, Politic, Religion];

const profiles = Array.from({length: 12}, (_, index) => ({
  name: `Person ${index + 1}`,
  age: 20 + index,
  about: `This is a brief about Person ${index + 1}.`,
  sundayActivity: `On Sundays, Person ${index + 1} likes to ...`,
  loveLanguage: `Person ${index + 1}'s love language is ...`,
  firstDate: `Person ${index + 1}'s ideal first date is ...`,
  image: Juan,
}));

export default function DetailProfilemsg({route}) {
  const {id} = route.params;
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProfile = profiles[currentIndex];
  const {theme} = useContext(ThemeContext);

  useEffect(() => {
    const fetchGetInfo = async () => {
      try {
        const userInfo = await GetInfobyUser(id); // Aquí asumes que `MeUser` es una función que obtiene datos del usuario
        console.log('USERE INFO', userInfo);
        setUser(userInfo);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchGetInfo();
  }, []);

  const iconsWithData = [
    {Icon: Mapmg, data: user?.neighborhood},
    {Icon: Tall, data: user?.height},
    {Icon: Baby, data: user?.family_plans?.name},
    {Icon: People, data: user?.religions?.name},
    {Icon: Study, data: user?.school},
    {Icon: Job, data: user?.work},
    {Icon: Politic, data: user?.politicals?.name},
    {Icon: Religion, data: user?.religions?.name},
  ];

  const RowItem = ({text, Icon, data}: any) => (
    <View style={styles.row}>
      <Icon color={theme.text} height="24" width="24" style={styles.svg} />
      <Text style={[styles.text, {color: theme.text}]}>
        {text} {data}
      </Text>
    </View>
  );

  const handleNextProfile = () => {
    if (currentIndex === profiles.length - 1) {
      // Si es el último perfil, mostrar mensaje y difuminar fondo
      setShowEndMessage(true);
    } else {
      // Si no es el último perfil, pasar al siguiente perfil
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const [showEndMessage, setShowEndMessage] = useState(false);

  const items = Array.from({length: 8}, (_, index) => ({
    text: ` ${index + 1}`,
    Icon: icons[index],
  }));
  const images = user?.photos?.map(photo => ({uri: photo.image_url}));

  return (
    <>
      <View style={{flex: 1, backgroundColor: theme.background}}>
        <SafeAreaView />
        <HeaderUser
          text="The Daily List"
          svg2={<Close color={theme.text} />}
          onPress2={() => navigation.goBack()}
        />
        <ScrollView
          showsVerticalScrollIndicator={false} // Oculta el scroll vertical
          showsHorizontalScrollIndicator={false} // Oculta el scroll horizontal
          style={{paddingHorizontal: 20}}>
          <View style={{marginVertical: 10}}>
            <LinearGradient
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.2)']}
              style={{borderRadius: 20, width: '100%', height: 500, zIndex: 1}}
            />
            <Image
              source={{
                uri: user?.profile_image
                  ? user?.profile_image
                  : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
              }}
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
                left: '7%',
                right: 0,
                paddingBottom: 20,
                zIndex: 2,
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{marginTop: 8}}
                onPress={() => {
                  handleNextProfile();
                }}>
                <BtnX color={'#000'} />
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
              <TouchableOpacity
                style={{marginTop: 8}}
                onPress={() => {
                  navigation.navigate('match');
                  handleNextProfile();
                }}>
                <BtnCheck color={'#fff'} />
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
                  {color: theme.text, paddingHorizontal: 12, marginRight: 0},
                  fonts.H3,
                ]}>
                {user?.name}, {user?.age}
              </Text>
            </View>
          </View>

          <ScrollView showsHorizontalScrollIndicator={false}>
            {iconsWithData.map(
              (item, index) =>
                item.data ? ( // Verifica si item.data no está vacío
                  <View
                    key={index}
                    style={{
                      marginRight: 10,
                      flexDirection: 'row',
                      marginTop: 12,
                    }}>
                    <RowItem text={``} Icon={item.Icon} data={item.data} />
                  </View>
                ) : null, // No renderiza nada si item.data está vacío
            )}
          </ScrollView>

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
                    marginBottom: 10,
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
          <View style={{marginBottom:20}}>
            <Button title="Next Profile" onPress={handleNextProfile} />
          </View>
        </ScrollView>
      </View>
      {showEndMessage && (
        <>
          <View style={styles.overlay}>
            <View
              style={{height: '8%', backgroundColor: colors.neutral.white}}
            />
            <HeaderUser
              text="The Daily List"
              svg2={<Close color={theme.background} />}
              onPress2={() => navigation.navigate('irl')}
            />
            <View style={styles.centeredView}>
              <Text style={[styles.mainText, fonts.H2]}>Set more matches</Text>
              <Text style={[styles.subtitle, fonts.B1]}>
                You haven’t more chances to match for today
              </Text>
              <TouchableOpacity
                style={styles.upgradeButton}
                onPress={() => navigation.navigate('UpgradePlan')}>
                <Text style={[styles.upgradeText, fonts.Btn]}>
                  Upgrade my plan
                </Text>
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
  },
  container: {
    padding: 6,
  },
  container2: {
    paddingHorizontal: 16,
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
    paddingHorizontal: 50,
    textAlign: 'center',
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
    height: '100%',
    zIndex: 10,
  },
  divider: {
    width: 1, // Ancho del divisor
    height: '100%', // Altura completa del contenedor
    backgroundColor: '#ccc', // Color del divisor (puedes cambiarlo)
    marginLeft: 8, // Espacio entre el texto y el divisor
  },

  verticalItem: {
    paddingVertical: 8, // Espacio entre los ítems en la lista vertical
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  verticalContainer: {
    marginTop: 4, // Espacio entre el ScrollView y la lista vertical
  },
});
