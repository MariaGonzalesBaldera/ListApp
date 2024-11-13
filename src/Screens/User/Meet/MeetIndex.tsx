import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {ArrowLeft} from '../../../Assets/svg';
import {useNavigation} from '@react-navigation/native';
import fonts from '../../../Utils/fonts';
import colors from '../../../Utils/colors';
import HeaderUser from '../../../Components/HeaderUser';
import {ThemeContext} from '../../../Components/themeContext';
import {BlurView} from '@react-native-community/blur';
import {UserSwipe} from '../../../Services/meet/MeetServices';

const ImageWithText = ({uri, name, age, blurred}: any) => (
  <View style={styles.imageContainer}>
    {/* Imagen de fondo */}
    <Image source={{uri}} style={styles.image} />

    {/* Si blurred es true, aplica el BlurView */}
    {blurred && (
      <>
      <BlurView
        style={styles.absolute} // Cubre toda la imagen
        blurType="light" // Tipo de desenfoque
        blurAmount={15} // Intensidad del blur
        reducedTransparencyFallbackColor="white"
      />
      {/* Icono de candado en el centro */}
      {/* <View style={styles.lockIconContainer}>
        <Lock color="white" />
      </View> */}
    </>
    )}

    {/* Texto que aparece cuando blurred es falso */}
    {!blurred && (
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {name}, {age}
        </Text>
      </View>
    )}
  </View>
);

export default function MeetIndex() {
  const [showAll, setShowAll] = useState(false);
  const navigation = useNavigation();
  const {theme} = useContext(ThemeContext);
  const [swipe, setSwipe] = useState([]);

  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleProfileMeet = id => {
    navigation.navigate('dailylist', {id});
  };

  // Datos de las imágenes y textos
  const data = [
    {
      uri: 'https://randomuser.me/api/portraits/women/1.jpg',
      text: 'Fiorella, 20',
    },
    {uri: 'https://randomuser.me/api/portraits/women/2.jpg', text: 'Gaby, 24 '},
    {
      uri: 'https://randomuser.me/api/portraits/women/3.jpg',
      text: 'Claudia, 42',
    },
    {
      uri: 'https://randomuser.me/api/portraits/women/6.jpg',
      text: 'Nicole, 23',
    },
    {
      uri: 'https://randomuser.me/api/portraits/women/7.jpg',
      text: 'Estefani, 25',
    },
    {
      uri: 'https://randomuser.me/api/portraits/women/6.jpg',
      text: 'Vanessa, 26',
    },
    {
      uri: 'https://randomuser.me/api/portraits/women/15.jpg',
      text: 'Raquel, 27',
    },
    {
      uri: 'https://randomuser.me/api/portraits/women/26.jpg',
      text: 'Alessandra, 28',
    },
    {
      uri: 'https://randomuser.me/api/portraits/women/17.jpg',
      text: 'Melissa, 29',
    },
    {
      uri: 'https://randomuser.me/api/portraits/women/18.jpg',
      text: 'Alejandra, 20',
    },
    {
      uri: 'https://randomuser.me/api/portraits/women/19.jpg',
      text: 'Valeria 21',
    },
    {
      uri: 'https://randomuser.me/api/portraits/women/20.jpg',
      text: 'Alisson 22',
    },
    {
      uri: 'https://randomuser.me/api/portraits/women/17.jpg',
      text: 'Jazmin 29',
    },
    {
      uri: 'https://randomuser.me/api/portraits/women/18.jpg',
      text: 'Silvana 20',
    },
    {
      uri: 'https://randomuser.me/api/portraits/women/19.jpg',
      text: 'Andrea 21',
    },
  ];
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await UserSwipe();
        setSwipe(userData);
      } catch (error) {
        console.error('Error fetching user Swipe:', error);
      }
    };
    fetchUser();
  }, []);

  // Renderización de los elementos en pares
  const renderItems = () => {
    const itemsToRender = showAll ? swipe : swipe.slice(0, 12); // Mostrar solo los primeros 4 elementos o todos si showAll es true

    return itemsToRender.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={styles.imageWrapper}
        onPress={() => handleProfileMeet(item.id)}>
        <ImageWithText
          uri={
            item.profile_image
              ? item.profile_image
              : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
          }
          name={item.name}
          age={item.age}
          blurred={!showAll && index >= 4}
        />
      </TouchableOpacity>
    ));
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.header}>
        <HeaderUser
          text="The Daily List"
          svg={<ArrowLeft color={theme.text} />}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{paddingHorizontal: 28}}>
        <ScrollView
          showsVerticalScrollIndicator={false} // Oculta la barra de desplazamiento vertical
          showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento horizontal, si es necesario
          contentContainerStyle={styles.scrollView}>
          <Text
            style={[
              fonts.C3B,
              styles.description,
              {marginBottom: 16, color: theme.text},
            ]}>
            Daily matches that check the boxes on your List.
          </Text>
          <View style={styles.scrollView}>{renderItems()}</View>
        </ScrollView>
      </View>

      {!showAll && (
        <TouchableOpacity style={styles.button} onPress={handleShowAll}>
          <Text style={[fonts.Btn, styles.buttonText]}>Get more Matches</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    marginBottom: 20,
  },
  description: {
    marginTop: 10,
  },
  scrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: '45%',
  },
  imageWrapper: {
    width: '47%',
    marginBottom: 20,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    //backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 10,
  },
  text: {
    color: colors.neutral.white,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: .3, height: .3},
    textShadowRadius: 3,
  },
  blurred: {
    opacity: 0.5,
  },
  button: {
    backgroundColor: colors.primary.medium,
    paddingVertical: 12,
    paddingHorizontal: '25%',
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20,
    position: 'absolute',
    bottom: 0,
  },
  lockIconContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }], // Centra el icono
  },
  buttonText: {
    color: colors.neutral.white,
    fontSize: 16,
    textAlign: 'center',
  },
  absolute: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
