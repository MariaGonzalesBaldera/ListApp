import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {ArrowLeft, Glasses} from '../../../../Assets/svg';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Juan from '../../../../Assets/img/juan.png';
import fonts from '../../../../Utils/fonts';
import colors from '../../../../Utils/colors';

import Mapmg from '../../../../Assets/svg/Chat/messages/map.svg';
import Tall from '../../../../Assets/svg/Chat/messages/tall.svg';
import Baby from '../../../../Assets/svg/Chat/messages/baby.svg';
import People from '../../../../Assets/svg/Chat/messages/people.svg';
import Study from '../../../../Assets/svg/Chat/messages/study.svg';
import Job from '../../../../Assets/svg/Chat/messages/job.svg';
import Politic from '../../../../Assets/svg/Chat/messages/politic.svg';
import Religion from '../../../../Assets/svg/Chat/messages/religion.svg';
import HeaderUser from '../../../../Components/HeaderUser';
import {ThemeContext} from '../../../../Components/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {MeUser} from '../../../../Services/User/UserServices';

const itemsData = [
  {text: 'Item 1', Icon: Mapmg},
  {text: 'Item 2', Icon: Tall},
  {text: 'Item 3', Icon: Baby},
  {text: 'Item 4', Icon: People},
  {text: 'Item 5', Icon: Study},
  {text: 'Item 6', Icon: Job},
  {text: 'Item 7', Icon: Politic},
  {text: 'Item 8', Icon: Religion},
];
export interface DataItemsCardType {
  key: string;
  title?: string;
  description?: string;
  background?: string;
  image?: any;
}
const dataItemsCard = [
  {
    key: '1',
    title: 'Our Sundays you can find me ...',
    description: 'your answer',
    background: colors.primary.lighest,
  },
  {
    key: '2',
    image: Juan,
  },
  {
    key: '3',
    title: 'My love language is ...',
    description: "I don't know, hahaha",
    background: colors.secondary.lighest,
  },
  {
    key: '4',
    image: Juan,
  },
  {
    key: '5',
    title: 'What my ideal first date looks like ...',
    description: 'In a cafe',
    background: colors.primary.lighest,
  },
];
export default function DetailProfilemsg() {
  const navigation = useNavigation();
  const {theme} = useContext(ThemeContext);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchGetInfo = async () => {
      try {
        const userInfo = await MeUser();
        setUser(userInfo);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchGetInfo();
  }, []);
  const [items, setItems] = useState();
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

  const renderItem = () => <></>;

  //
  // Render card
  //

  const [itemsCard, setItemsCard] = useState<DataItemsCardType[]>([]);

  const loadSavedOrder = async () => {
    try {
      const storedOrder = await AsyncStorage.getItem('itemsCardOrder');
      if (storedOrder !== null) {
        setItemsCard(JSON.parse(storedOrder));
      } else {
        setItemsCard(dataItemsCard);
      }
    } catch (error) {
      console.error('Error loading order:', error);
      setItemsCard(dataItemsCard);
    }
  };

  useEffect(() => {
    loadSavedOrder();
  }, []);
  const renderItemCard = ({item, drag, isActive}) => {
    return (
      <TouchableOpacity key={item}
      style={{opacity: isActive ? 0.8 : 1}}
      onLongPress={drag}>
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
      </TouchableOpacity>
    );
  };

  const saveOrder = async (newOrder: DataItemsCardType[]) => {
    try {
      await AsyncStorage.setItem('itemsCardOrder', JSON.stringify(newOrder));
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  const onDragEndHandler = ({data}: {data: DataItemsCardType[]}) => {
    setItemsCard(data);
    saveOrder(data);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.background}}>
      <HeaderUser
        text="Edit my profile"
        svg={<ArrowLeft color={theme.text} />}
        svg2={<Glasses color={theme.text} />}
        onPress={() => navigation.goBack()}
        onPress2={() => console.log('Glasses')}
      />
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        ListHeaderComponent={
          <>
            <View>
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
                  source={{
                    uri:
                      user?.profile_image ||
                      'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
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
                    {user?.name} {user?.age ? ', ' + user?.age : ''}
                  </Text>
                </View>
              </View>

              <View style={{flex: 1, marginVertical: 15}}>
                <Text style={[fonts.H4, {color: theme.text}]}>About me</Text>
                <Text
                  style={[fonts.B1, {color: theme.text, marginVertical: 10}]}>
                  {user?.description}
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
                          marginTop: 0,
                        }}>
                        <RowItem text={``} Icon={item.Icon} data={item.data} />
                      </View>
                    ) : null, // No renderiza nada si item.data está vacío
                )}
              </ScrollView>
            </View>
          </>
        }
        ListFooterComponent={
          <DraggableFlatList
            data={itemsCard}
            renderItem={renderItemCard}
            keyExtractor={item => item.key}
            onDragEnd={onDragEndHandler}
            containerStyle={{marginBottom: 20}}
          />
        }
        contentContainerStyle={{paddingHorizontal: 20}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  svg: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
  },
  rowItem: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  activeItem: {
    backgroundColor: colors.primary.lighest,
  },
});
