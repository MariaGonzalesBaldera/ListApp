import React, {useState, useCallback, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Platform,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import ImagePicker, {
  MediaType,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {
  ArrowLeft,
  CameraChat,
  Dots,
  GifChat,
  Mic,
  Inamsg,
  Other,
  Spam,
  Phomsg,
  Close,
  Random,
  Closeb,
  Attend,
  Attendb,
  Alertb,
  BtnSend,
  Trashmsg,
  Lupa,
  Question,
} from '../../../Assets/svg';
import {useNavigation} from '@react-navigation/native';
import colors from '../../../Utils/colors';
import fonts from '../../../Utils/fonts';
import BottomUpModal from '../../../Components/BottomPopup';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Slider from '@react-native-community/slider';

import FastImage from 'react-native-fast-image';
import axios from 'axios';
import {ThemeContext} from '../../../Components/themeContext';
import io from 'socket.io-client';
import { MeUser } from '../../../Services/User/UserServices';
import { CancelMatch, GetChatbyUser, GetInfobyUser, GetNotificationChat, GetQuestion } from '../../../Services/Messaging/MessagingServices';
import { CommonActions } from '@react-navigation/native';
import NotificationCard from '../../../Components/Notification/Notification';

const ChatScreen = ({route}) => {
  const { id } = route.params;
  const {theme, isDarkMode} = useContext(ThemeContext);
  const [messages2, setMessages2] = useState([]); // Estado para almacenar mensajes
  const [message, setMessage] = useState(''); // Estado para el mensaje actual
  const [user, setUser] = useState(null)
   const [userProfile, setUserProfile] = useState(null)
  const [options, setOptions] = useState(null)
  const [usertwo, setUsertwo] = useState(null)
  const [isConnected, setIsConnected] = useState(false); // Estado de conexión
  const [noti, setNoti] = useState([])

  useEffect(() => {
    // Función asíncrona para obtener las preguntas
    const fetchOptions = async () => {
      try {
        const getrandomQuestion = await GetQuestion();
        const optionsMapped = getrandomQuestion.map(item => ({ text: item.name }));
        setOptions(optionsMapped); // Actualiza el estado con las opciones
      } catch (error) {
        console.log('Error:', error);
      }
    };

    const fetchGetNotification = async () => {
      try {
        const notificacion = await GetNotificationChat(id); // Aquí asumes que `MeUser` es una función que obtiene datos del usuario
        setNoti(notificacion);
        console.log('notificacion', notificacion);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchGetNotification();
    fetchOptions(); // Llama a la función para obtener las preguntas cuando se monta el componente
  }, []);


  const GenericModal = ({visible, onClose, children}: any) => (
  
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[styles.modalBackground2]}>
          <View style={[styles.modalView2,{backgroundColor:theme.backgroundChat}]}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Close color={theme.text}/>
            </TouchableOpacity>
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
  

  const handleCancelMatch = async (id:string) => {
    console.log("ID "+ id);
    try {
      const data = await CancelMatch(id);
      console.log('Info cancel match:', data);

    } catch (error) {
      console.error('Error in cancel match:', error);
    }finally{
      navigation.goBack()
    }
  };

  const CancelMatchModal = ({id,nameUser, visible, onClose}: any) => (
    <GenericModal visible={visible} onClose={onClose}>
      <Text style={[styles.modalTitle, fonts.H4,{color:theme.text}]}>
        Do you want to cancel match with {nameUser}?
      </Text>
      <View style={styles.horizontalButtonContainer}>
        <TouchableOpacity style={[styles.cancelButton,{backgroundColor:theme.text}]} onPress={onClose}>
          <Text style={[styles.buttonText, fonts.Btn,{color:theme.background}]}>Don't cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton} onPress={()=>handleCancelMatch(id)}>
          <Text style={[styles.buttonText, fonts.Btn]}>Cancel match</Text>
        </TouchableOpacity>
      </View>
    </GenericModal>
  );
  
  const ReportUserModal = ({visible, onClose}: any) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [showTextInput, setShowTextInput] = useState(false);
    const [reportText, setReportText] = useState('');
  
    const options = [
      {icon: <Inamsg />, text: 'Inappropiate messages'},
      {icon: <Phomsg />, text: 'Inappropiate photos'},
      {icon: <Spam />, text: 'Feel like spam'},
      {icon: <Other />, text: 'Other'},
    ];
  
    const handleOptionPress = index => {
      setSelectedOption(index);
    };
  
    const handleSendReport = () => {
      setShowTextInput(true);
    };
  
    const handleSubmitReport = () => {
      // Lógica para enviar el reporte
      console.log('Report submitted:', reportText);
      // Cerrar el modal después de enviar el reporte
      onClose();
    };
  
    return (
      <GenericModal visible={visible} onClose={onClose}>
        <Text style={[styles.modalTitle, fonts.H4]}>Report this user</Text>
        <Text
          style={[
            fonts.B1,
            {
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              alignSelf: 'center',
            },
          ]}>
          We won’t tell to {usertwo?.name}
        </Text>
        {!showTextInput ? (
          <View style={styles.verticalButtonContainer}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedOption === index && styles.selectedOptionButton,
                ]}
                onPress={() => handleOptionPress(index)}>
                {option.icon}
                <Text style={[styles.buttonText2, fonts.Btn, {marginLeft: 4}]}>
                  {option.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={{marginTop: 30}}>
            <TextInput
              style={styles.textReport}
              placeholder="a"
              placeholderTextColor={colors.neutral.medium}
              value={reportText}
              onChangeText={setReportText}
              multiline
            />
            <TouchableOpacity
              style={[styles.button, {marginTop: 30}]}
              onPress={handleSubmitReport}>
              <Text style={[fonts.Btn, {color: colors.neutral.white}]}>
                Submit Report
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {!showTextInput && <View style={{paddingVertical: 9}} />}
        {!showTextInput && (
          <TouchableOpacity style={styles.button} onPress={handleSendReport}>
            <Text style={[fonts.Btn, {color: colors.neutral.white}]}>
              Send Report
            </Text>
          </TouchableOpacity>
        )}
      </GenericModal>
    );
  };

const ReportQuestion = ({ visible, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showTextInput, setShowTextInput] = useState(false);
  const [reportText, setReportText] = useState('');


  const handleOptionPress = (text) => {
    setText(text);
    onClose();
  };

  const handleSubmitReport = () => {
    // Lógica para enviar el reporte
    console.log('Report submitted:', reportText);
    // Cerrar el modal después de enviar el reporte
    onClose();
  };

  const handleRefreshOptions = async() => {
    // Vuelve a obtener las opciones cuando el usuario hace clic en "Refresh options"
      try {
        const getrandomQuestion = await GetQuestion();
        const optionsMapped = getrandomQuestion.map(item => ({ text: item.name }));
        setOptions(optionsMapped); // Actualiza el estado con las opciones
      } catch (error) {
        console.log('Error:', error);
      }
  };

  return (
    <GenericModal visible={visible} onClose={onClose}>
      <Text style={[styles.modalTitle, fonts.H4]}>Select an option</Text>
      <View style={styles.verticalButtonContainer}>
        {options?.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton
            ]}
            onPress={() => handleOptionPress(option.text)}
          >
            <Text style={[styles.buttonText2, fonts.Btn, { marginLeft: 4 }]}>
              {option.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={[styles.button, { marginTop: 8 }]} onPress={handleRefreshOptions}>
        <Text style={[fonts.Btn, { color: colors.neutral.white }]}>
          Refresh options
        </Text>
      </TouchableOpacity>
    </GenericModal>
  );
};


  useEffect(() => {  
    const fetchUser = async () => {
      try {
        const userData = await MeUser(); // Aquí asumes que `MeUser` es una función que obtiene datos del usuario
        setUser(userData.id);
        setUserProfile(userData.profile);
        console.log('userData', userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    const fetchChat = async () => {
      try {
        // Obtiene el chat del usuario
        const userChat = await GetChatbyUser(id);
        console.log("USERCHAT: ",userChat)
        // Si necesitas funciones async dentro del map, usa Promise.all
        const formattedMessages = await Promise.all(
          userChat.map(async (msg) => {
            // Define el avatar según el remitente
            const avatar =
              msg.from_user_uuid === user
                ? (user || 'https://dummyimage.com/300x500/000/fff&text=Default+Avatar')
                : (usertwo?.profile_image || 'https://dummyimage.com/300x500/000/fff&text=Default+Avatar');
    
            return {
              _id: msg.id, // ID único del mensaje
              text: msg.message, // Texto del mensaje
              createdAt: new Date(msg.created_at), // Fecha del mensaje
              user: {
                _id: msg.from_user_uuid === user ? 1 : 2, // 1 si es el usuario actual, 2 si es otro usuario
                avatar: avatar, // Avatar
                hour: new Date(msg.created_at).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                }), // Hora formateada
              },
            };
          })
        );
    
        // Asignar los mensajes formateados
        setMessages(formattedMessages);
        console.log('FM', formattedMessages);
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    const fetchGetInfo = async () => {
      try {
        const userInfo = await GetInfobyUser(id); // Aquí asumes que `MeUser` es una función que obtiene datos del usuario
        setUsertwo(userInfo);
        console.log('userInfo', userInfo);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchGetInfo()
    fetchChat()
    fetchUser()
}, [isConnected])

  
   const socket = io('https://the-list-api.whiz.pe', {
    path: '/api/socket.io',
    transports: ['websocket'],
    });

  useEffect(() => {
    socket.emit('user_uuid', user)// ID DEL USUARIO personal? o troa persona?);
 
    // Escuchar nuevos mensajes
    socket.on('message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Limpiar al desmontar el componente
    return () => {
      socket.off('message');
      socket.disconnect();
    };
  }, []);



  const sendMessage = () => {
    if (text.trim()) {
      socket.emit('sendmessage', {
        message: text,
        from_user_uuid: user, // personal
        to_user_uuid: usertwo?.id, // Otra persona
      }); // Enviar mensaje al servidor
      setText(''); // Limpiar campo de entrada
      setIsConnected(true)
    }
  }; 


  const [messages, setMessages] = useState<
    {
      _id: number;
      text: string;
      createdAt: Date;
      user: {_id: number; avatar: string; hour: string};
    }[]
  >([]);
  const [text, setText] = useState('');
  const navigation = useNavigation();
  const [cancelMatchVisible, setCancelMatchVisible] = useState(false);
  const [reportUserVisible, setReportUserVisible] = useState(false);
  const [reportQuestion, setreportQuestion] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleProfile, setModalVisibleProfile] = useState(false);

  const [block, setblock] = useState(false);

  const openModalProfile = () => {
    setModalVisibleProfile(true);
  };

  const closeModalProfile = () => {
    setModalVisibleProfile(false);
  };

  const handlePress2 = () => {
    setModalVisible(true);
  };



  const renderItem = ({item}: any) => {
    console.log(item.user)
    const isCurrentUser = item.user._id === 1;
    return (
      <View
        style={[
          styles.messageRow,
          isCurrentUser ? styles.currentUserRow : styles.otherUserRow,
        ]}>
        {!isCurrentUser && <Image source={{ uri: item.user.avatar }} style={styles.avatar} />}
        <View
          style={[
            styles.messageContainer,
            isCurrentUser
              ? [
                  styles.currentUser,
                  {
                    backgroundColor: isDarkMode
                      ? colors.neutral.darkest
                      : colors.neutral.white,
                  },
                ]
              : [
                  styles.otherUser,
                  {
                    backgroundColor: isDarkMode
                      ? colors.secondary.dark
                      : colors.secondary.light,
                  },
                ],
          ]}>
          <Text style={[fonts.B1, {color: theme.text}]}>{item.text}</Text>
          <Text
            style={[
              fonts.CXB,
              {
                justifyContent: 'flex-end',
                flex: 1,
                alignSelf: 'flex-end',
                marginTop: 3,
                color: colors.neutral.dark,
              },
            ]}>
            {item.user.hour}
          </Text>
        </View>
        {/*isCurrentUser && <Image source={{ uri: item.user.avatar }} style={styles.avatar} />*/}
      </View>
    );
  };

  const handleCameraLaunch = () => {
    const options: {
      mediaType: MediaType;
      includeBase64: boolean;
      maxHeight: number;
      maxWidth: number;
    } = {
      mediaType: 'photo', // or 'video' depending on your requirements
      includeBase64: false,
      maxHeight: 800,
      maxWidth: 800,
    };

    launchCamera(options, async response => {
      try {
        if (response.didCancel) {
          console.log('User cancelled image picker');
          return;
        }

        if (!response.assets || response.assets.length === 0) {
          console.log('No image selected');
          return;
        }

        const imageUri = response.assets[0].uri;
        const type = response.assets[0].type;
        const name = response.assets[0].fileName;
        console.log('IMGUR', imageUri);
        console.log('IMGUR', type);
        console.log('IMGUR', name);

        setModalVisible(false);
        //await handleUploadPhoto(imageUri, type, name);
      } catch (error) {
        console.log('Error selecting image:', error);
      }
    });
  };

  // IMAGENES
  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 800,
      maxWidth: 800,
      quality: 1,
      storageOptions: {
        skipBackup: true,
        path: 'images', // Ruta donde se almacenará el archivo
      },
    };

    launchImageLibrary(options, async response => {
      try {
        if (response.didCancel) {
          console.log('User cancelled image picker');
          return;
        }

        if (!response.assets || response.assets.length === 0) {
          console.log('No image selected');
          return;
        }

        const imageUri = response.assets[0].uri;
        const type = response.assets[0].type;
        const name = response.assets[0].fileName;
        console.log('IMGUR', imageUri);
        console.log('IMGUR', type);
        console.log('IMGUR', name);

        setModalVisible(false);
        //await handleUploadPhoto(imageUri, type, name);
      } catch (error) {
        console.log('Error selecting image:', error);
      }
    });
  };

  const handleUploadPhoto = async (imageUri: string, type: any, name: any) => {
    try {
      const formDataImg = new FormData();

      formDataImg.append('file', {
        uri: imageUri,
        type: type, // Tipo MIME del archivo
        name: name, // Nombre del archivo
      });

      // Llamar a la función Upload con el objeto FormData
      //const status = await Upload(formDataImg);
      //const url = status.data;

      //setFormProfile({...formProfile, profile_image_url: url});
    } catch (error: any) {
      // Si ocurre un error, imprime la información detallada
      console.error('Error uploading photo:', error);

      // Verifica si el error es debido a un problema de red
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  const renderButtons = () => {
    const options = [
      {icon: <Random />, text: 'Say Hello'},
      {icon: <Random />, text: 'Random Question'},
      {icon: <Spam />, text: 'Idk'},
    ];

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.buttonContainer}>
        {options.map((option, index) => (
          <TouchableOpacity key={index} style={styles.optionButton2}>
            {option.icon}
            <Text style={[styles.buttonText2, fonts.B1, {marginLeft: 4}]}>
              {option.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const [modalVisibleGIF, setModalVisibleGIF] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);

  const openModalGIF = () => {
    setModalVisibleGIF(true);
  };

  const closeModalGIF = () => {
    setModalVisibleGIF(false);
  };

  const fetchGifs = async () => {
    if (!searchQuery) return;

    setLoading(true);
    try {
      const response = await axios.get('https://api.giphy.com/v1/gifs/search', {
        params: {
          api_key: 'hKjljc44NVehAXMregwPWaQYJfIYdwyX', // Reemplaza con tu API Key
          q: searchQuery,
          limit: 25,
        },
      });
      setGifs(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchGifs();
    }
  }, [searchQuery]);

  // AUDIO Y GRABACION

  const [recording, setRecording] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [durationSec, setDurationSec] = useState(0);
  const audioRecorderPlayer = React.useRef(new AudioRecorderPlayer()).current;

  const {width, height} = Dimensions.get('window');

  useEffect(() => {
    return () => {
      // Clean up listeners on unmount
      if (audioRecorderPlayer) {
        audioRecorderPlayer.removeRecordBackListener();
        audioRecorderPlayer.removePlayBackListener();
      }
    };
  }, [audioRecorderPlayer]);

  const onStartRecord = async () => {
    setRecording(true);
    setRecorded(false);
    setCurrentPositionSec(0); // Reset time to 0 on start

    await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener(e => {
      setCurrentPositionSec(e.currentPosition);
    });
  };

  const onStopRecord = async () => {
    if (recording) {
      await audioRecorderPlayer.stopRecorder();
      setRecording(false);
      setRecorded(true);
      setCurrentPositionSec(0); // Reset time to 0 on stop
      setDurationSec(0); // Reset duration
    }
  };

  const onStartPlay = async () => {
    if (recorded) {
      await audioRecorderPlayer.startPlayer();
      setPlaying(true);
      audioRecorderPlayer.addPlayBackListener(e => {
        setCurrentPositionSec(e.currentPosition);
        setDurationSec(e.duration);
      });
    }
  };

  const onPausePlay = async () => {
    if (playing) {
      await audioRecorderPlayer.pausePlayer();
      setPlaying(false);
    }
  };

  const onResumePlay = async () => {
    if (!playing && recorded) {
      await audioRecorderPlayer.resumePlayer();
      setPlaying(true);
    }
  };

  const onStopPlay = async () => {
    if (playing) {
      await audioRecorderPlayer.stopPlayer();
      setPlaying(false);
      setCurrentPositionSec(0);
      setDurationSec(0);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleGifPress = (selectedGif: any) => {
    console.log('GIF seleccionado:', selectedGif);
    closeModalGIF();
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.backgroundChat}}>
      <SafeAreaView style={[styles.header]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 25,
            paddingVertical: 12,
            backgroundColor:theme.background
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() =>  navigation.navigate('chatindex')}>
              <ArrowLeft color={theme.text} />
            </TouchableOpacity>
            {messages.length > 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',
                  alignItems: 'center',
                  marginLeft: 20,
                }}>
                <Image
                  source={{ uri: usertwo?.profile_image ? usertwo?.profile_image : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}}
                  style={styles.profileImage}
                />
                <Text
                  style={[
                    styles.name,
                    fonts.B2,
                    {color: theme.text},
                  ]}>
                  {usertwo?.name}
                </Text>
                <Text style={[styles.name, {marginLeft: 4}]}>
                  {/*
                  {chat.verify === true ? (
                    <View
                      style={{
                        backgroundColor: colors.secondary.lighest,
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        borderRadius: 10,
                        marginTop: -1,
                      }}>
                      <Text
                        style={[
                          {
                            color: colors.secondary.dark,
                            fontSize: 8,
                            fontWeight: '700',
                          },
                        ]}>
                        New Match
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                  */}
                  
                </Text>
              </View>
            )}
          </View>
          <TouchableOpacity onPress={() => handlePress2()}>
            <Dots color={theme.text} />
          </TouchableOpacity>
        </View>

        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          animationType="fade">
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}>
            <View style={[styles.modalView,{backgroundColor:theme.backgroundChat}]}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('detailmsg',{id});
                }}>
                <Text
                  style={[styles.modalText, {color: theme.text}]}>
                  View profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setCancelMatchVisible(true);
                }}>
                <Text
                  style={[styles.modalText, {color: theme.text}]}>
                  Unmatch
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setReportUserVisible(true);
                }}>
                <Text
                  style={[styles.modalText, {color: theme.text}]}>
                  Report
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        <CancelMatchModal
          id={id}
          nameUser={usertwo?.name}
          visible={cancelMatchVisible}
          onClose={() => setCancelMatchVisible(false)}
        />
        <ReportUserModal
          visible={reportUserVisible}
          onClose={() => setReportUserVisible(false)}
        />
      </SafeAreaView>
      {messages.length === 0 && (
        <View style={styles.noMessagesContainer}>
          <Image
            source={{
              uri: usertwo?.profile_image ? usertwo?.profile_image : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
            }}
            style={styles.largeAvatar}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[styles.userName, fonts.H4, {color: theme.text}]}>
            {usertwo?.name}, {usertwo?.age}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 12,
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <Attend />
            <Text style={[fonts.B4, {marginLeft: 6, color: '#A8A8A8'}]}>
              You’ll attend the same event
            </Text>
          </View>
        </View>
      )}

      {/*messages.length === 0 && (
        <View style={{backgroundColor: colors.neutral.darkest}}>
          <View style={{padding: 20}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <Text style={[styles.cardone, fonts.H5]}>
                  She{' '}
                  <Text style={{color: colors.secondary.medium}}>
                    is attending Disco
                  </Text>
                </Text>
                <Text style={[styles.cardtwo, fonts.B5]}>
                  Know more about the event
                </Text>
              </View>
              <TouchableOpacity>
                <Closeb />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.upgradeButton}
              onPress={() => navigation.navigate('UpgradePlan')}>
              <Text style={[styles.upgradeText, fonts.Btn]}>View</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
        */}

<View
      style={{
        position: 'relative',
        //height: 200, // Limita la altura visible de la pila
        zIndex: 1
      }}
    >
      {noti?.map((item, index) => (
        <NotificationCard
          key={index}
          colors={colors.primary.medium}
          buttonType={item.type === 'event' ? 'simple' : 'double'}
          titlewhite={item.title}
          subititle={item.description}
          style={{
            position: 'absolute',
            width: '100%',
            top: index * 5, // Ajuste de superposición
            zIndex: noti.length - index, // Orden inverso para que el primero quede al frente
          }}
          ticketId={item.ticket_invitation_id}
          event={item.event}
        />
      ))}
    </View>

      <FlatList
        data={messages}
        renderItem={renderItem}
        
        style={{ zIndex: 0 }} // Asegúrate de que FlatList tenga un zIndex más bajo
        contentContainerStyle={styles.messageList}
      />

      

      {block ? (
        <>
          {messages.length === 0 && (
            <View style={{paddingLeft: 10}}>{renderButtons()}</View>
          )}
          <View
            style={{
              backgroundColor: colors.neutral.medium,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              flexDirection: 'row',
              paddingHorizontal: '22%',
              paddingVertical: '2%',
              borderRadius: 10,
              marginBottom: 12,
            }}>
            <Alertb color={"red"}/>
            <Text style={{marginLeft: 6}}>You blocked this user</Text>
          </View>
        </>
      ) : (
        <>
          {/* <View style={{}}>
            <View
              style={{
                backgroundColor:theme.background,
                borderRadius:10,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <View
                style={{
                  backgroundColor: theme.tertiary,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  flexDirection: 'row',
                  paddingHorizontal: '18%',
                  paddingVertical: '3%',
                  borderRadius: 10,
                }}>
                <Attendb color={theme.background} />
                <Text style={{marginLeft: 6, color: theme.background}}>
                  You are in the same event
                </Text>
              </View>

              <View style={{marginVertical: '2%'}}>
                <Text
                  style={[
                    {
                      textAlign: 'center',
                      fontWeight: '600',
                      color: theme.text,
                    },
                  ]}>
                  Do you want to chat with her?
                </Text>
                <Text style={{textAlign: 'center', color: theme.text}}>
                  If you answer is yes, write a message.
                </Text>
              </View>

              <View style={styles.doubleButtonContainer}>
                <TouchableOpacity
                  style={[styles.doubleButton, styles.goToEventButton]}
                  onPress={() => setblock(true)}>
                  <Text style={[styles.doubleButtonText, fonts.Btn]}>
                    Block
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.doubleButton, styles.getTicketButton]}
                  onPress={() => setblock(false)}>
                  <Text style={[styles.doubleButtonText, fonts.Btn]}>
                    Dismiss
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>*/}

            <ReportQuestion
              visible={reportQuestion}
              onClose={() => setreportQuestion(false)}
            />
          {recording ? (
            <>
              <View style={styles.inputContainer}>
                <View style={styles.audioContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      onStopRecord();
                      setRecording(false);
                    }}>
                    <Trashmsg />
                  </TouchableOpacity>

                  <Text style={styles.times}>{`${(
                    currentPositionSec / 1000
                  ).toFixed(2)}`}</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={durationSec}
                    value={currentPositionSec}
                    minimumTrackTintColor="#f31277"
                    maximumTrackTintColor="#ccc"
                    thumbTintColor="#f31277"
                    disabled={!recorded && !playing}
                  />
                  <TouchableOpacity onPress={() => {sendMessage()}} style={styles.sendButton}>
                    <BtnSend />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            <>
            
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                  {messages.length > 0 && (
              <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false} // Oculta el indicador de scroll
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            <TouchableOpacity style={styles.buttonx} onPress={() => setText('Hello!')} >
              <Text style={styles.emoji}>👋</Text>
              <Text style={[ fonts.B1]}>Say hello</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonx} onPress={() => setreportQuestion(true)}>
              <Question/>
              <Text style={[ fonts.B1, {marginLeft:4}]}>Random Question</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonx} onPress={() => setText('How are you?')}>
              <Text style={styles.emoji}>😊</Text>
              <Text style={[ fonts.B1]}>How are you</Text>
            </TouchableOpacity>
          </ScrollView>
      )
    }
                <View
                  style={[
                    styles.inputContainer,
                    {backgroundColor: theme.background},
                  ]}>
                  <TouchableOpacity
                    onPress={openModalProfile}
                    style={styles.actionButton}>
                    <CameraChat />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      openModalGIF();
                    }}
                    style={styles.actionButton}>
                    <GifChat />
                  </TouchableOpacity>
                  <TextInput
                    style={[
                      styles.textInput,
                      {
                        backgroundColor: theme.placeholder,
                        color: theme.text,
                      },
                    ]}
                    placeholder="Message"
                    value={text}
                    onChangeText={setText}
                    placeholderTextColor={theme.tertiary}
                  />
                  {text.length > 0 ? (
                    <>
                      <TouchableOpacity
                        onPress={() => {sendMessage()}}
                        style={styles.sendButton}>
                        <BtnSend />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <TouchableOpacity
                        onPress={() => onStartRecord()}
                        style={styles.sendButton}>
                        <Mic />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </KeyboardAvoidingView>
            </>
          )}
        </>
      )}

      <BottomUpModal
        isVisible={modalVisibleProfile}
        onClose={closeModalProfile}
        contentComponent={
          <Text
            style={[
              fonts.H4,
              {
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                color: colors.neutral.darkest,
              },
            ]}>
            Send a Image
          </Text>
        }
        cancelButtonText="Open camera"
        confirmButtonText="From your gallery"
        onPressA={() => handleCameraLaunch()}
        onPressB={() => openImagePicker()}
        onRrequestClose={closeModalProfile}
      />

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisibleGIF}
        onRequestClose={closeModalGIF}>
        <TouchableWithoutFeedback onPress={closeModalGIF}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                maxWidth: width * 0.9,
                maxHeight: height * 0.7,
                borderRadius: 10,
                padding: 20,
              }}>
              <ScrollView contentContainerStyle={{flexGrow: 1}}>
               
                <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center',
            marginVertical:12
          }}>
          
          <View style={styles.container2}>
            <TextInput
              style={[styles.input, {color: theme.text}]}
               placeholder="Buscar GIFs..."
              placeholderTextColor="#A8A8A8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length === 0 && (
              <TouchableOpacity style={styles.iconContainer2}>
                <Lupa />
              </TouchableOpacity>
            )}
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={handleClearSearch}
                style={styles.iconContainer2}>
                <Close />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity onPress={() => closeModalGIF()}>
            <Text style={{color: colors.primary.medium}}>Done</Text>
          </TouchableOpacity>
        </View>
                {loading ? (
                  <ActivityIndicator size="large" color={colors.primary.medium} />
                ) : (
                  <FlatList
                    data={gifs}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                      <TouchableOpacity onPress={() => handleGifPress(item)}>
                        <FastImage
                          source={{uri: item.images.fixed_height.url}}
                          style={{width: '100%', height: 60, marginBottom: 10}}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      </TouchableOpacity>
                    )}
                  />
                )}
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  header: {
  },
  messageList: {
    paddingVertical: 20,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    maxWidth: '70%',
  },
  noti: {
    position: 'relative',
    
    overflow: 'hidden', // Oculta las tarjetas adicionales fuera del contenedor
  },
  notificationCard: {
    position: 'absolute',
    width: '100%',
  },
  currentUser: {
    alignSelf: 'flex-end',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderBottomLeftRadius: 20,
  },
  otherUser: {
    alignSelf: 'flex-start',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderBottomRightRadius: 20,
  },
  messageText: {
    // color: colors.neutral.darkest,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: '#e5e5ea',
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? '8%' : '1%',
    paddingHorizontal: 12,
  },
  textInput: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 8,
  },
  textReport: {
    flex: 1,
    height: 100,
    paddingBottom: 140,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e5ea',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 8,
    backgroundColor: colors.neutral.light,
  },
  actionButton: {
    marginHorizontal: 5,
  },
  sendButton: {
    justifyContent: 'center',
  },
  currentUserRow: {
    justifyContent: 'flex-end',
  },
  otherUserRow: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  messageRow: {
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  noMessagesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20%',
  },
  largeAvatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardone: {
    color: colors.neutral.white,
  },
  cardtwo: {
    color: colors.neutral.medium,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  roundButton: {
    backgroundColor: colors.neutral.white,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginHorizontal: 5,
  },
  buttonText: {
    color: colors.neutral.white,
  },
  buttonText2: {
    color: colors.neutral.darkest,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    position: 'absolute',
    top: '12%', // Adjust this value to position the modal correctly
    right: '10%', // Adjust this value to position the modal correctly
    paddingHorizontal: 16,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    elevation: 5,
  },
  modalText: {
    paddingVertical: 10,
    fontSize: 16,
    ...fonts.C2B,
  },
  modalBackground2: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView2: {
    backgroundColor: colors.neutral.white,
    borderRadius: 8,
    padding: 20,
    width: '90%',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginTop:15,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  horizontalButtonContainer: {
    gap:10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  verticalButtonContainer: {
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: colors.neutral.darkest,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  confirmButton: {
    backgroundColor: colors.primary.medium,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  optionButton: {
    backgroundColor: colors.neutral.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 5,
    borderWidth: 1.5,
    borderColor: colors.neutral.medium,
    flexDirection: 'row',
    alignItems: 'center',
  },

  optionButton2: {
    backgroundColor: colors.neutral.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 8,
    borderRadius: 20,
    marginVertical: 5,
    borderWidth: 1.5,
    borderColor: colors.neutral.medium,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.primary.medium,
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 16,
  },

  //

  chatContent: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  name: {
    marginBottom: 5,
  },
  message: {
    color: 'gray',
  },
  metaData: {
    alignItems: 'flex-end',
  },
  time: {
    color: 'gray',
  },
  unreadCount: {
    backgroundColor: colors.secondary.medium,
    color: 'black',
    paddingHorizontal: 5,
    paddingVertical: 2,
    fontSize: 12,
    marginTop: 5,
    borderRadius: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 2,
  },
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },

  upgradeButton: {
    backgroundColor: colors.primary.medium,
    paddingVertical: 10,
    paddingHorizontal: 90,
    borderRadius: 20,
    marginTop: 20,
  },
  upgradeText: {
    color: colors.neutral.white,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  selectedOptionButton: {
    backgroundColor: colors.primary.light,
  },

  content: {
    padding: 20,
  },
  header2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  singleButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#4CAF50', // Ajusta el color según tu diseño
    alignItems: 'center',
    borderRadius: 5,
  },
  upgradeText2: {
    color: colors.neutral.white, // Ajusta el color según tu diseño
  },
  doubleButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  doubleButton: {
    flex: 0.4,
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  goToEventButton: {
    backgroundColor: colors.neutral.darkest, // Ajusta el color según tu diseño
    marginRight: 10,
  },
  getTicketButton: {
    marginLeft: 10,
    backgroundColor: colors.primary.medium, // Ajusta el color según tu diseño
  },
  doubleButtonText: {
    color: colors.neutral.white, // Ajusta el color según tu diseño
  },

  container: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.neutral.white,
    borderRadius: 25,
    padding: 10,
    shadowColor: colors.neutral.darkest,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    margin: 10,
    marginTop: '20%',
  },
  audioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  slider: {
    flex: 1,
    marginHorizontal: 5,
  },
  times: {
    color: colors.neutral.darkest,
    fontWeight: 'bold',
    marginHorizontal: 6,
  },
  playbackControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',

    marginTop: 10,
  },

  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 16,
    marginHorizontal: 10,
    width: '82%',
    height: 36
  },
  input: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 6,
    fontSize: 16,
    fontWeight: '600',
    // color: colors.neutral.darkest
  },
  iconContainer2: {
    padding: 10,
  },

  scrollContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    maxHeight: 60,
  },
  buttonx: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
  },
  emoji: {
    fontSize: 20,
    marginRight: 8,
  },
  buttonTextx: {
    fontSize: 16,
    fontWeight: '500',
  },

});
