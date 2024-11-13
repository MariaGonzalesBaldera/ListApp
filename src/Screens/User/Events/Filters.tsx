import React, {useContext, useRef, useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import fonts from '../../../Utils/fonts';
import colors from '../../../Utils/colors';
import {
  Calendar,
  Checked,
  ChevDown,
  ChevUp,
  Close,
  Dolar,
} from '../../../Assets/svg';
import HeaderUser from '../../../Components/HeaderUser';
import {ThemeContext} from '../../../Components/themeContext';
import {EventType, GetEventTypes} from '../../../Services/Events/EventTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

import dayjs from 'dayjs';

export default function Filters() {
  const navigation = useNavigation();
  const {theme, isDarkMode} = useContext(ThemeContext);

  const [code, setCode] = useState(['', '', '', '', '', '']); // Arreglo para almacenar el código

  const refs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleChange = (text: any, index: any) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < refs.length - 1) {
      refs[index + 1].current.focus();
    }

    console.log(code);
    console.log(code.length);
  };

  const handleCheckEventMusic = (itemName: string) => {
    setMusics(
      musics.map(music => {
        if (music.name === itemName) {
          music.checked = !music.checked;
        }
        return music;
      }),
    );
  };
  const handleCheckEventSeasonal = (itemName: string) => {
    setSeasonals(
      seasonals.map(seasonal => {
        if (seasonal.name === itemName) {
          seasonal.checked = !seasonal.checked;
        }
        return seasonal;
      }),
    );
  };
  const handleCheckEventHealth = (itemName: string) => {
    setHealths(
      healths.map(health => {
        if (health.name === itemName) {
          health.checked = !health.checked;
        }
        return health;
      }),
    );
  };

  const handleCheckEventCommunity = (itemName: string) => {
    setCommunitys(
      communitys.map(community => {
        if (community.name === itemName) {
          community.checked = !community.checked;
        }
        return community;
      }),
    );
  };
  const handleCheckEventSport = (itemName: string) => {
    setSports(
      sports.map(sport => {
        if (sport.name === itemName) {
          sport.checked = !sport.checked;
        }
        return sport;
      }),
    );
  };
  const handleCheckEventSocial = (itemName: string) => {
    setSocials(
      socials.map(social => {
        if (social.name === itemName) {
          social.checked = !social.checked;
        }
        return social;
      }),
    );
  };

  const [formProfile, setFormProfile] = useState({
    rangeStart: 15,
    rangeEnd: 70,
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    fromPrice: '',
    upPrice: '',
    proximity: '',
  });

  const handleChangeLogin = (field, value) => {
    setFormProfile(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const [range, setRange] = useState([formProfile.rangeStart, formProfile.rangeEnd]);
  const sliderWidth = Dimensions.get('window').width - 40; // Ajusta esto según el padding/margin

  const handleDateChange = (event, selectedDate, field) => {
    setShowCalendar(false); // Cerrar el calendario después de seleccionar
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      handleChangeLogin(field, formattedDate); // Actualizar el campo del formulario con la fecha
    }
  };
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleTimeChange = (event, selectedTime, field) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    const formattedTime = dayjs(currentTime).format('HH:mm');
    handleChangeLogin(field, formattedTime); // Establecer la hora formateada en el campo de texto
  };
  //expande icon
  const [dataLoaded, setDataLoaded] = useState(false);  
  const [isExpanded, setIsExpanded] = useState(true);
  const [isConcertsChecked, setIsConcertsChecked] = useState(false);
  const [isFestivalsChecked, setIsFestivalsChecked] = useState(false);
  const [musics, setMusics] = useState<EventType[]>([]);
  const [sports, setSports] = useState<EventType[]>([]);
  const [socials, setSocials] = useState<EventType[]>([]);
  const [communitys, setCommunitys] = useState<EventType[]>([]);
  const [healths, setHealths] = useState<EventType[]>([]);
  const [seasonals, setSeasonals] = useState<EventType[]>([]);
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const fetchMusic = async () => {
    const musicResults = await GetEventTypes('musics');
    setMusics(
      musicResults.map((music: EventType) => ({
        id: music.id,
        name: music.name,
        checked: false,
      })),
    );
  };

  const fetchSports = async () => {
    const sporttResults = await GetEventTypes('sports');
    setSports(
      sporttResults.map((sport: EventType) => ({
        id: sport.id,
        name: sport.name,
        checked: false,
      })),
    );
  };

  const fetchSocial = async () => {
    const socialResults = await GetEventTypes('socials');
    setSocials(
      socialResults.map((social: EventType) => ({
        id: social.id,
        name: social.name,
        checked: false,
      })),
    );
  };

  const fetchCommunity = async () => {
    const communityResults = await GetEventTypes('communities');
    setCommunitys(
      communityResults.map((community: EventType) => ({
        id: community.id,
        name: community.name,
        checked: false,
      })),
    );
  };

  const fetchHealth = async () => {
    const healthResults = await GetEventTypes('healths');
    console.log(healthResults);
    setHealths(
      healthResults.map((health: EventType) => ({
        id: health.id,
        name: health.name,
        checked: false,
      })),
    );
  };

  const fetchSeasonals = async () => {
    const seasonalResults = await GetEventTypes('seasonals');
    setSeasonals(
      seasonalResults.map((seasonal: EventType) => ({
        id: seasonal.id,
        name: seasonal.name,
        checked: false,
      })),
    );
  };
  const [notRepeat, setNotRepeat] = useState(false)
  useEffect(() => {
      fetchMusic();
      fetchHealth();
      fetchSocial();
      fetchSports(); 
      fetchSeasonals();
      fetchCommunity();
      setNotRepeat(true)
  }, []); 

  useEffect(()=>{
    if (notRepeat){
      loadCheckboxValues()
      setNotRepeat(false)
    }
  },[musics, healths,socials,sports, seasonals, communitys])

  const loadCheckboxValues = async () => {
    try {
      const storedValues = await AsyncStorage.getItem('@eventFilter');
      if (storedValues !== null) {
        const parsedValues = JSON.parse(storedValues);
        setChecked(parsedValues.list_events || false);
        setChecked2(parsedValues.is_exclusive || false); 
        setChecked3(parsedValues.most_popular || false);
        setChecked4(parsedValues.is_event_with_alcohol || false);
        if (parsedValues.musics)
          setMusics(prevMusics =>
            prevMusics.map(music => ({
              ...music,
              checked: parsedValues.musics.includes(music.id),  
            }))
          );
        if (parsedValues.sports)
          setSports(prevSports =>
            prevSports.map(sport => ({
              ...sport,
              checked: parsedValues.sports.includes(sport.id),
            }))
          );
        if (parsedValues.socials)
          setSocials(prevSocials =>
            prevSocials.map(social => ({
              ...social,
              checked: parsedValues.socials.includes(social.id),
            }))
          );
        if (parsedValues.communities)
          setCommunitys(prevCommunities =>
            prevCommunities.map(community => ({
              ...community,
              checked: parsedValues.communities.includes(community.id),
            }))
          );
        if (parsedValues.healths)
          setHealths(prevHealths =>
            prevHealths.map(health => ({
              ...health,
              checked: parsedValues.healths.includes(health.id),
            }))
          );
        if (parsedValues.seasonals)
          setSeasonals(prevSeasonals =>
            prevSeasonals.map(seasonal => ({
              ...seasonal,
              checked: parsedValues.seasonals.includes(seasonal.id),
            }))
          );  
        formProfile.proximity = parsedValues.range || '';
        formProfile.rangeStart = parsedValues.from_radius || 15;
        formProfile.rangeEnd = parsedValues.to_radius || 70;
        formProfile.startDate = parsedValues.from_date || '';
        formProfile.endDate = parsedValues.to_date || '';
        formProfile.startTime = parsedValues.from_time || '';
        formProfile.endTime = parsedValues.to_time || '';
        formProfile.fromPrice = parsedValues.from_price || '';
        formProfile.upPrice = parsedValues.to_price || '';
      }
    } catch (error) {
      console.error('Error al cargar los valores:', error);
    } 
  };
  

  const handleToggle = () => setChecked(!checked);
  const handleToggle2 = () => setChecked2(!checked2);
  const handleToggle3 = () => setChecked3(!checked3);
  const handleToggle4 = () => setChecked4(!checked4);

  const clearForm = async () => {
    const onlyFirstElements = {
      list_events: false,
      is_exclusive: false,
      most_popular: false,
      is_event_with_alcohol: false,
    };
    await AsyncStorage.setItem('@eventFilter', JSON.stringify(onlyFirstElements));
  };
  const saveCheckboxValues = async () => {
    try {
      const selectedValues = {
        list_events: checked,
        is_exclusive: checked2,
        most_popular: checked3,
        is_event_with_alcohol: checked4,
        from_radius: formProfile.rangeStart,
        to_radius: formProfile.rangeEnd,
        from_date: formProfile.startDate,
        to_date: formProfile.endDate,
        from_time: formProfile.startTime,
        to_time: formProfile.endTime,
        from_price: formProfile.fromPrice,
        to_price: formProfile.upPrice,
        range: formProfile.proximity,
        musics: musics?.reduce((acc, music) => {
          if (music.checked) {
            acc.push(music.id);
          }
          return acc;
        }, []),

        sports: sports?.reduce((acc, sport) => {
          if (sport.checked) {
            acc.push(sport.id);
          }
          return acc;
        }, []),
        socials: socials?.reduce((acc, social) => {
          if (social.checked) {
            acc.push(social.id);
          }
          return acc;
        }, []),
        communities: communitys?.reduce((acc, community) => {
          if (community.checked) {
            acc.push(community.id);
          }
          return acc;
        }, []),
        healths: healths?.reduce((acc, health) => {
          if (health.checked) {
            acc.push(health.id);
          }
          return acc;
        }, []),
        seasonals: seasonals?.reduce((acc, seasonal) => {
          if (seasonal.checked) {
            acc.push(seasonal.id);
          }
          return acc;
        }, []),
      };

      const storedValues = await AsyncStorage.getItem('@eventFilter');
      if (storedValues !== null) {
        const parsedValues = JSON.parse(storedValues);
        const updatedValues = {...parsedValues, ...selectedValues};
        await AsyncStorage.setItem(
          '@eventFilter',
          JSON.stringify(updatedValues),
        );
      } else {
        await AsyncStorage.setItem(
          '@eventFilter',
          JSON.stringify(selectedValues),
        );
      }
      console.log('Valores guardados/actualizados correctamente');
      navigation.goBack();
    } catch (error) {
      console.error('Error al guardar los valores:', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <SafeAreaView />
      <HeaderUser
        text="Filters"
        svg2={<Close color={theme.text} />}
        onPress2={() => navigation.goBack()}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1, paddingHorizontal: 16}}>
        <ScrollView
          showsVerticalScrollIndicator={false} // Oculta la barra de desplazamiento vertical
          showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento horizontal, si es necesario
          style={{marginTop: 20}}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={handleToggle}>
            <Text style={[styles.checkboxText, fonts.B1, {color: theme.text}]}>
              List events vs. non-List events
            </Text>
            <View
              style={[
                styles.checkbox,
                {borderColor: theme.text},
                checked && styles.checked,
              ]}>
              {checked && <Checked color={theme.text} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={handleToggle2}>
            <Text style={[styles.checkboxText, fonts.B1, {color: theme.text}]}>
              A*List exclusive events
            </Text>

            <View
              style={[
                styles.checkbox,
                {borderColor: theme.text},
                checked2 && styles.checked,
              ]}>
              {checked2 && <Checked color={theme.text} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={handleToggle3}>
            <Text style={[styles.checkboxText, fonts.B1, {color: theme.text}]}>
              Most popular (trending events)
            </Text>
            <View
              style={[
                styles.checkbox,
                {borderColor: theme.text},
                checked3 && styles.checked,
              ]}>
              {checked3 && <Checked color={theme.text} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={handleToggle4}>
            <Text style={[styles.checkboxText, fonts.B1, {color: theme.text}]}>
              Non-alcoholic
            </Text>
            <View
              style={[
                styles.checkbox,
                {borderColor: theme.text},
                checked4 && styles.checked,
              ]}>
              {checked4 && <Checked color={theme.text} />}
            </View>
          </TouchableOpacity>

          <View>
            <Text style={[fonts.B2, {marginBottom: 10, color: theme.text}]}>
              Proximity
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={[
                  fonts.B1,
                  {
                    marginBottom: 10,
                    color: theme.text,
                  },
                ]}>
                Range (Miles){' '}
              </Text>
              <Text
                style={[
                  {marginBottom: 10, color: colors.secondary.dark, fontSize: 8},
                ]}>
                (Between 0-100)
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 10,
              }}>
              <Text style={{color: theme.text}}>{range[0]}</Text>
              <Text style={{color: theme.text}}>{range[1]}</Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <MultiSlider
                values={range}
                min={0}
                max={100}
                onValuesChange={values => setRange(values)}
                selectedStyle={{backgroundColor: theme.text}}
                unselectedStyle={{
                  backgroundColor: isDarkMode ? '#515151' : '#E6E6E6',
                }}
                trackStyle={{height: 5}}
                markerStyle={{
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  backgroundColor: theme.text,
                }}
              />
            </View>
          </View>

          <View style={{marginBottom: 10}}>
            <Text style={[fonts.H5, {marginBottom: 10, color: theme.text}]}>
              Date
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <View style={{width: '45%'}}>
                <Text style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                  From to
                </Text>
                <TouchableOpacity
                  style={[styles.inputContainer, {flex: 1}]}
                  onPress={() => setShowCalendar('startDate')}>
                  <TextInput
                    style={[
                      styles.inputSelect,
                      {
                        flex: 1,
                        left: 6,
                        backgroundColor: theme.placeholder,
                        color: theme.text,
                      },
                    ]}
                    placeholder="Select"
                    placeholderTextColor="#A9A9A9"
                    value={formProfile.startDate} // Mostrar la fecha seleccionada
                    editable={false}
                  />
                  <Calendar
                    width={30}
                    height={30}
                    color="#A9A9A9"
                    style={{right: 10}}
                  />
                </TouchableOpacity>
              </View>

              <View style={{width: '45%'}}>
                <Text style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                  Up to
                </Text>
                <TouchableOpacity
                  style={[styles.inputContainer, {flex: 1}]}
                  onPress={() => setShowCalendar('endDate')}>
                  <TextInput
                    style={[
                      styles.inputSelect,
                      {
                        flex: 1,
                        left: 6,
                        backgroundColor: theme.placeholder,
                        color: theme.text,
                      },
                    ]}
                    placeholder="Select"
                    placeholderTextColor="#A9A9A9"
                    value={formProfile.endDate} // Mostrar la fecha seleccionada
                    editable={false}
                  />
                  <Calendar
                    width={30}
                    height={30}
                    color="#A9A9A9"
                    style={{right: 10}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {showCalendar && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) =>
                  handleDateChange(event, selectedDate, showCalendar)
                }
              />
            )}
            {showTimePicker && (
              <DateTimePicker
                value={time}
                mode="time"
                display="default"
                onChange={(event, selectedDate) =>
                  handleTimeChange(event, selectedDate, showTimePicker)
                }
              />
            )}
            {/* Hora */}
            <Text style={[fonts.H5, {marginBottom: 10, color: theme.text}]}>
              Time
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{width: '45%'}}>
                <Text style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                  From to
                </Text>
                <TouchableOpacity
                  onPress={() => setShowTimePicker('startTime')}>
                  <TextInput
                    style={[
                      styles.input,
                      {backgroundColor: theme.placeholder, color: theme.text},
                    ]}
                    placeholder="00:00"
                    editable={false}
                    placeholderTextColor="#A9A9A9"
                    value={formProfile.startTime}
                  />
                </TouchableOpacity>
              </View>

              <View style={{width: '45%'}}>
                <Text style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                  Up to
                </Text>
                <TouchableOpacity onPress={() => setShowTimePicker('endTime')}>
                  <TextInput
                    style={[
                      styles.input,
                      {backgroundColor: theme.placeholder, color: theme.text},
                    ]}
                    placeholder="24:00"
                    editable={false}
                    placeholderTextColor="#A9A9A9"
                    value={formProfile.endTime}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Precio */}
            <Text style={[fonts.H5, {marginBottom: 10, color: theme.text}]}>
              Ticket price
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{width: '45%'}}>
                <Text style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                  From to
                </Text>
                <View
                  style={[
                    styles.inputContainer,
                    {justifyContent: 'flex-start'},
                  ]}>
                  <Dolar
                    width={22}
                    height={22}
                    color="#A9A9A9"
                    style={{left: 10}}
                  />
                  <TextInput
                    style={[
                      styles.inputSelect,
                      {
                        left: 4,
                        backgroundColor: theme.placeholder,
                        color: theme.text,
                      },
                    ]}
                    keyboardType="numeric"
                    maxLength={5}
                    placeholder="00.00"
                    placeholderTextColor="#A9A9A9"
                    value={formProfile.fromPrice}
                    onChangeText={text => handleChangeLogin('fromPrice', text)}
                  />
                </View>
              </View>

              <View style={{width: '45%'}}>
                <Text style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                  Up to
                </Text>
                <View
                  style={[
                    styles.inputContainer,
                    {justifyContent: 'flex-start'},
                  ]}>
                  <Dolar
                    width={22}
                    height={22}
                    color="#A9A9A9"
                    style={{left: 10}}
                  />
                  <TextInput
                    keyboardType="numeric"
                    maxLength={5}
                    style={[
                      styles.inputSelect,
                      {
                        left: 4,
                        backgroundColor: theme.placeholder,
                        color: theme.text,
                      },
                    ]}
                    placeholder="00.00"
                    placeholderTextColor="#A9A9A9"
                    value={formProfile.upPrice}
                    onChangeText={text => handleChangeLogin('upPrice', text)}
                  />
                </View>
              </View>
            </View>

            {/* Proximidad */}
            <View>
              <Text style={[fonts.H5, {marginBottom: 10, color: theme.text}]}>
                Proximity
              </Text>
              <Text style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                Range (Km)
              </Text>
              <TextInput
                style={[
                  styles.input,
                  formProfile.proximity !== ''
                    ? styles.codeInputWithDigit
                    : styles.codeInputWithoutDigit,
                ]}
                placeholder="15"
                keyboardType="numeric"
                maxLength={6}
                placeholderTextColor={theme.tertiary}
                value={formProfile.proximity} // Aquí el valor de proximidad
                onChangeText={text => handleChangeLogin('proximity', text)}
              />
            </View>
          </View>

          <TouchableOpacity onPress={toggleExpand} style={styles.headerExpa}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: theme.text}}>
              Event types
            </Text>
            {isExpanded ? (
              <ChevUp color={theme.text} />
            ) : (
              <ChevDown color={theme.text} />
            )}
          </TouchableOpacity>

          <View style={{marginBottom: '5%'}} />
          {isExpanded && (
            <>
              <Text style={[fonts.H5, {marginBottom: 10, color: theme.text}]}>
                Music:
              </Text>

              {musics.map((music: EventType, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.checkboxContainer}
                  onPress={() => handleCheckEventMusic(music.name)}>
                  <Text
                    style={[
                      styles.checkboxText,
                      fonts.B1,
                      {color: theme.text},
                    ]}>
                    {music.name}
                  </Text>

                  <View
                    style={[
                      styles.checkbox,
                      {borderColor: theme.text},
                      music.checked && styles.checked,
                    ]}>
                    {music.checked && <Checked color={theme.text} />}
                  </View>
                </TouchableOpacity>
              ))}

              <Text style={[fonts.H5, {marginBottom: 10, color: theme.text}]}>
                Sports:
              </Text>

              {sports.map((sport: EventType, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.checkboxContainer}
                  onPress={() => handleCheckEventSport(sport.name)}>
                  <Text
                    style={[
                      styles.checkboxText,
                      fonts.B1,
                      {color: theme.text},
                    ]}>
                    {sport.name}
                  </Text>

                  <View
                    style={[
                      styles.checkbox,
                      {borderColor: theme.text},
                      sport.checked && styles.checked,
                    ]}>
                    {sport.checked && <Checked color={theme.text} />}
                  </View>
                </TouchableOpacity>
              ))}

              <Text style={[fonts.H5, {marginBottom: 10, color: theme.text}]}>
                Social:
              </Text>
              {socials.map((social: EventType,index) => (
                <TouchableOpacity
                key={index}

                  style={styles.checkboxContainer}
                  onPress={() => handleCheckEventSocial(social.name)}>
                  <Text
                    style={[
                      styles.checkboxText,
                      fonts.B1,
                      {color: theme.text},
                    ]}>
                    {social.name}
                  </Text>

                  <View
                    style={[
                      styles.checkbox,
                      {borderColor: theme.text},
                      social.checked && styles.checked,
                    ]}>
                    {social.checked && <Checked color={theme.text} />}
                  </View>
                </TouchableOpacity>
              ))}

              <Text style={[fonts.H5, {marginBottom: 10, color: theme.text}]}>
                Community and Charity
              </Text>
              {communitys.map((community: EventType,index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.checkboxContainer}
                  onPress={() => handleCheckEventCommunity(community.name)}>
                  <Text
                    style={[
                      styles.checkboxText,
                      fonts.B1,
                      {color: theme.text},
                    ]}>
                    {community.name}
                  </Text>

                  <View
                    style={[
                      styles.checkbox,
                      {borderColor: theme.text},
                      community.checked && styles.checked,
                    ]}>
                    {community.checked && <Checked color={theme.text} />}
                  </View>
                </TouchableOpacity>
              ))}

              <Text style={[fonts.H5, {marginBottom: 10, color: theme.text}]}>
                Health and Wellness
              </Text>
              {healths.map((health: EventType,index) => (
                <TouchableOpacity
                key={index}

                  style={styles.checkboxContainer}
                  onPress={() => handleCheckEventHealth(health.name)}>
                  <Text
                    style={[
                      styles.checkboxText,
                      fonts.B1,
                      {color: theme.text},
                    ]}>
                    {health.name}
                  </Text>

                  <View
                    style={[
                      styles.checkbox,
                      {borderColor: theme.text},
                      health.checked && styles.checked,
                    ]}>
                    {health.checked && <Checked color={theme.text} />}
                  </View>
                </TouchableOpacity>
              ))}

              <Text style={[fonts.H5, {marginBottom: 10, color: theme.text}]}>
                Seasonal and Holiday
              </Text>
              {seasonals.map((seasonal: EventType,index) => (
                <TouchableOpacity
                key={index}

                  style={styles.checkboxContainer}
                  onPress={() => handleCheckEventSeasonal(seasonal.name)}>
                  <Text
                    style={[
                      styles.checkboxText,
                      fonts.B1,
                      {color: theme.text},
                    ]}>
                    {seasonal.name}
                  </Text>

                  <View
                    style={[
                      styles.checkbox,
                      {borderColor: theme.text},
                      seasonal.checked && styles.checked,
                    ]}>
                    {seasonal.checked && <Checked color={theme.text} />}
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}
          <View style={{marginBottom: '20%'}} />
        </ScrollView>
      </KeyboardAvoidingView>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 16,
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: theme.background,
        }}>
        <TouchableOpacity
          onPress={clearForm}
          style={{
            backgroundColor: theme.text,
            paddingVertical: 12,
            borderRadius: 20,
            paddingHorizontal: 20,
          }}>
          <Text style={[fonts.Btn, {color: colors.primary.medium}]}>Clear</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={saveCheckboxValues}
          style={{
            backgroundColor: colors.primary.medium,
            alignItems: 'center',
            paddingVertical: 12,
            borderRadius: 20,
            paddingHorizontal: '25%',
          }}>
          <Text style={[fonts.Btn, {color: colors.neutral.white}]}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 14,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 24,
  },
  input2: {
    fontSize: 14,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.neutral.lighest,
    marginBottom: 24,
  },
  button: {
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
    fontSize: 20,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '15%',
    textAlign: 'center',
    backgroundColor: colors.neutral.light,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  checkbox: {
    borderColor: '#ccc',
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
    maxWidth: '80%',
  },
  disabledButton: {
    opacity: 0.5, // Opacidad reducida cuando el botón está deshabilitado
    backgroundColor: colors.neutral.medium,
  },
  errorText: {
    color: 'red',
    marginTop: -8,
    marginBottom: 10,
  },
  codeInputWithDigit: {
    borderColor: colors.neutral.dark,
  },
  codeInputWithoutDigit: {
    borderColor: colors.neutral.medium,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 5,
  },
  headerExpa: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  inputSelect: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
