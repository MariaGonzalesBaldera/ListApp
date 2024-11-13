import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import fonts from '../../../Utils/fonts';
import colors from '../../../Utils/colors';
import {BackR, BtnCheck, BtnX, List} from '../../../Assets/svg';
import LinearGradient from 'react-native-linear-gradient';
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
import Juan from './../../../Assets/img/juan.png';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import HeaderUser from '../../../Components/HeaderUser';
import {
  PanGestureHandler,
  GestureHandlerRootView,
  FlatList,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated';
import {ThemeContext} from '../../../Components/themeContext';
import {Swipe, UserSwipe} from '../../../Services/meet/MeetServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataItemsCardType } from '../Profile/Edit/EditOrder';
import NotificationCard from '../../../Components/Notification/Notification';
import { MeUser } from '../../../Services/User/UserServices';

export default function DetailProfilemsg() {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const {theme} = useContext(ThemeContext);
  const [user, setUser] = useState(null);

  const [swipe, setSwipe] = useState([]);

  const profiles = swipe.map((user, index) => ({
    id: user.id,
    name: user.name,
    age: user.age,
    about: user.description,
    lifestyle: user.lifestyle_active_id,
    relationship: user.relationship,
    meet: user.want_to_meet,
    image: user.profile_image,
    job: user.job_name,
    height: user.height,
    iconsWithData: [
      {Icon: Tall, data: user?.height},
      {Icon: Mapmg, data: user?.neighborhood},
      {Icon: Baby, data: user?.family_plans?.name},
      {Icon: Religion, data: user?.religions?.name},
      {Icon: People, data: user?.religions?.name},
      {Icon: Study, data: user?.school},
      {Icon: Job, data: user?.work},
      {Icon: Politic, data: user?.politicals?.name},
    ],
    prompts: user?.prompts || [],
    photos: user?.photos?.map(photo => photo.image_url) || [],
    percentage_profile: user?.percentage_profile || 0,
  }));

  const currentProfile = profiles[currentIndex];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await UserSwipe(); // Aquí asumes que `MeUser` es una función que obtiene datos del usuario
        setSwipe(userData);
        console.log(userData);
      } catch (error) {
        console.error('Error fetching user Swipe:', error);
      }
    };

    const fetchUser2 = async () => {
      try {
        const userData = await MeUser(); // Aquí asumes que `MeUser` es una función que obtiene datos del usuario
        setUser(userData);
        console.log('userData', userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Listener para cuando la pantalla se enfoca
    const unsubscribeFocus = navigation.addListener('focus', () => {
      console.log('Pantalla enfocada, actualizando usuario...');
      fetchUser(); // Se ejecuta cuando la pantalla recibe el enfoque
      
    });

    // Ejecuta la función `fetchUser` directamente cuando el componente se monta
    fetchUser();
    fetchUser2()

    // Cleanup function para desuscribir el listener
    return () => {
      unsubscribeFocus();
    };
  }, [navigation]); // Solo depende de navigation

  const RowItem = ({text, Icon}: any) => (
    <View style={styles.row}>
      <Icon color={theme.text} height="24" width="24" style={styles.svg} />
      <Text style={[styles.text, {color: theme.text}]}>{text}</Text>
    </View>
  );

  const handleNextProfile = () => {
    if (currentIndex === profiles.length - 1) {
      navigation.navigate('meetindex');
    } else {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleNavigation = () => {
    navigation.navigate('match');
  };

  const handleSwipe = async (userId, isLike) => {
    const swipeResult = await Swipe(userId, isLike);
    console.log('Resultado del Swipe:', swipeResult);
    
    if (swipeResult.is_match === true) {
      navigation.navigate('match');
    } else {
      handleNextProfile(); // Mueve al siguiente perfil
    }

  };

  // SWIPE

  const translateX = useSharedValue(0);
  const rotateZ = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value; // Guardar la posición inicial
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX; // Actualizar la posición
      rotateZ.value = event.translationX / 20; // Rotación ligera durante el arrastre
    },
    onEnd: event => {
      if (Math.abs(event.translationX) > 100) {
        if (event.translationX > 0) {
          // Si el movimiento es hacia la derecha, navega a la pantalla 'match'
          console.log('Tarjeta movida a la derecha');
          translateX.value = withSpring(
            500,
            {stiffness: 200, damping: 200},
             async () => {
              // Restablecer las posiciones inmediatamente después de la animación
              translateX.value = 0;
              rotateZ.value = 0;
          
              // Ejecutar la lógica del swipe fuera de la animación
              runOnJS(handleSwipe)(currentProfile?.id, true); // Procesa el swipe fuera del ciclo de la animación
            }
          );
        }else {
          // Si el movimiento es hacia la izquierda, pasa al siguiente perfil
          console.log('Tarjeta movida a la izquierda');
        
          // Realizar la animación de la tarjeta primero
          translateX.value = withSpring(
            -500,
            { stiffness: 200, damping: 200 },
            () =>{
              // Restablecer las posiciones inmediatamente después de la animación
              translateX.value = 0;
              rotateZ.value = 0;
          
              // Ejecutar la lógica del swipe fuera de la animación
              runOnJS(handleSwipe)(currentProfile?.id, false); // Procesa el swipe fuera del ciclo de la animación
            }
          );
        }} else {
        // Si no se mueve lo suficiente, vuelve a la posición original
        translateX.value = withSpring(0);
        rotateZ.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        {translateX: translateX.value},
        {rotateZ: `${rotateZ.value}deg`}, // Rotación en grados
      ],
    }),
    [],
  );

  console.log('CURRENT PROFILE:', currentProfile);
  console.log('AAAAAAA', currentProfile?.photos);

  //****************** */
  //get data in storage
  const [savedItemsCard, setSavedItemsCard] = useState([]);

  const loadSavedOrder = async () => {
    try {
      const storedOrder = await AsyncStorage.getItem('itemsCardOrder');
      if (storedOrder !== null) {
        setSavedItemsCard(JSON.parse(storedOrder));
      }
    } catch (error) {
      console.error('Error loading order:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      loadSavedOrder(); // Cargar los datos cuando la pantalla esté en foco
    }, []),
  );
  const renderItemCard = ({item}: { item: DataItemsCardType }) => {
    return (
      <View>
        {item.image ? (
          <View style={{marginVertical: 10}}>
            <LinearGradient
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.2)']}
              style={{borderRadius: 20, width: '100%', height: 350, zIndex: 1}}
            />
            <Image
              source={item.image}
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
        ) : (
          <View
            style={{
              backgroundColor: item.background,
              paddingHorizontal: 20,
              paddingVertical: 20,
              borderRadius: 20,
              flexDirection: 'row',
              marginVertical: 10,
            }}>
            <View style={{flex: 1, marginLeft: 8}}>
              {item.title && (
                <Text style={[fonts.H4, {color: colors.neutral.darkest}]}>
                  {item.title}
                </Text>
              )}
              {item.description && (
                <Text style={[fonts.B1, {color: colors.neutral.darkest}]}>
                  {item.description}
                </Text>
              )}
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: theme.background}}>
        <SafeAreaView />
        <HeaderUser
          svg={<BackR color={theme.text} />}
          onPress={() => navigation.navigate('rematch')}
          svg2={<List color={theme.text} />}
          onPress2={() => navigation.navigate('meetindex')}
        />
        {
          user?.is_subcribed === true && (
            <NotificationCard colors={colors.primary.medium} buttonType={'single'} titlewhite={'You’ve missed'} titleblue={'a potential match!'} subititle={'Backtrack missed matches'} /> 
          )
        }
       
        <ScrollView style={{paddingHorizontal: 20}}>
          {/* Perfil con gestos */}
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[{marginVertical: 10}, animatedStyle]}>
              <LinearGradient
                colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.2)']}
                style={{
                  borderRadius: 20,
                  width: '100%',
                  height: 500,
                  zIndex: 1,
                }} 
              />
              <Image
                source={{uri: currentProfile?.image}}
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
              {/* Botón de rechazo */}
              <View
                style={{
                  position: 'absolute',
                  bottom: 60,
                  left: '7%',
                  zIndex: 2,
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{marginTop: 8}}
                  onPress={() => handleSwipe(currentProfile?.id, false)}>
                  <BtnX color={colors.neutral.dark} />
                </TouchableOpacity>
              </View>
              {/* Botón de aceptación */}
              <View
                style={{
                  position: 'absolute',
                  bottom: 60,
                  left: '77%',
                  zIndex: 2,
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{marginTop: 8}}
                  onPress={() => {
                    handleSwipe(currentProfile?.id, true);
                  }}>
                  <BtnCheck />
                </TouchableOpacity>
              </View>
              {/* Nombre y edad del perfil */}
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
                  {currentProfile?.name}, {currentProfile?.age}
                </Text>
              </View>
            </Animated.View>
          </PanGestureHandler>

          {/* Íconos horizontales */}
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {currentProfile?.iconsWithData.slice(0, 4).map((item, index) => (
              <View
                key={index}
                style={{marginRight: 12, flexDirection: 'row', marginTop: 8}}>
                <RowItem Icon={item.Icon} text={item.data} />
              </View>
            ))}
          </ScrollView>

          {/* Resto de ítems en columna */}
          <View style={[styles.verticalContainer, {marginTop: 12}]}>
            {currentProfile?.iconsWithData.slice(4).map((item, index) => (
              <View key={index + 4} style={{marginBottom: 10}}>
                <RowItem Icon={item.Icon} text={item.data} />
              </View>
            ))}
          </View>

          {/* Sección de "About me" */}
          <View style={{flex: 1, marginVertical: 30}}>
            <Text style={[fonts.H4, {color: theme.text}]}>About me</Text>
            <Text style={[fonts.B1, {color: theme.text, marginVertical: 16}]}>
              {currentProfile?.about}
            </Text>
          </View>

          {/* Prompts */}
          {currentProfile?.prompts?.slice(0, 3).map((prompt, index) => (
            <View key={prompt.id}>
              <View
                style={{
                  backgroundColor:
                    index % 2 === 0
                      ? colors.secondary.lighest
                      : colors.primary.lighest,
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                  borderRadius: 20,
                  marginBottom: 10,
                }}>
                <Text style={[fonts.H4, {color: colors.neutral.darkest}]}>
                  {prompt.name}
                </Text>
                <Text style={[fonts.B1, {color: colors.neutral.darkest}]}>
                  {prompt.user_prompts_entity?.reply}
                </Text>
              </View>

              {/* Imagen del prompt */}
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
                  source={
                    currentProfile?.photos[index]
                      ? {uri: currentProfile?.photos[index]}
                      : null
                  }
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
          {/* Sección de "About me"   <FlatList
            data={savedItemsCard}
            renderItem={renderItemCard}
            keyExtractor={item => item.key}
          /> */}
        
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  svg: {
    marginRight: 10,
  },
  text: {
    fontSize: 16,
  },
  divider: {
    width: 1,
    height: '100%',
    // backgroundColor: colors.neutral.light,
    marginLeft: 16,
  },
  verticalContainer: {
    flexDirection: 'column',
  },
  verticalItem: {
    marginBottom: 12,
    flexDirection: 'row',
  },
});
