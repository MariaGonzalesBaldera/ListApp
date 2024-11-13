import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import fonts from '../../../Utils/fonts';
import colors from '../../../Utils/colors';
import Header from '../../../Components/Header';
import LinearGradient from 'react-native-linear-gradient';
import {
  Target,
  Mapmg,
  Tall,
  Baby,
  People,
  Study,
  Job,
  Politic,
  Religion,
} from '../../../Assets/svg';
import {useNavigation} from '@react-navigation/native';
import {GetInfobyUser} from '../../../Services/Messaging/MessagingServices';
import {ThemeContext} from '../../../Components/themeContext';

const icons = [Mapmg, Tall, Baby, People, Study, Job, Politic, Religion];

export default function DetailProfilemsg({route}) {
  const {id} = route.params;
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const {theme} = useContext(ThemeContext);

  const items = Array.from({length: 8}, (_, index) => ({
    text: ` ${index + 1}`,
    Icon: icons[index],
  }));
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
  const images = user?.photos?.map(photo => ({uri: photo.image_url}));
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.background,
          paddingHorizontal: 20,
        }}>
        <SafeAreaView />
        <Header onPress={() => navigation.goBack()} />
        <ScrollView>
          <View style={{marginVertical: 10}}>
            <LinearGradient
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.2)']}
              style={{borderRadius: 20, width: '100%', height: 350, zIndex: 1}}
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
              paddingHorizontal: 8,
              paddingVertical: 20,
              borderRadius: 20,
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 1,
                marginLeft: 8,
                flexDirection: 'row',
                alignSelf: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <Target color={colors.neutral.darkest} />
              <Text
                style={[
                  fonts.B1,
                  {color: colors.neutral.darkest, marginLeft: 4},
                ]}>
                {"You’ll attend the same events."}
              </Text>
            </View>
          </View>

          <View style={styles.container}>
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
          </View>

          <View style={{flex: 1, marginVertical: 30}}>
            <Text style={[fonts.H4, {color: theme.text}]}>
              About me
            </Text>

            <Text
              style={[
                fonts.B1,
                {color: theme.text, marginVertical: 16},
              ]}>
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
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 1,
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
    paddingVertical: 16,
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
