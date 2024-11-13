import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Close,
  Current,
  Filter,
  Incognite,
  Incogniteactive,
  IncogniteBlack,
  Lupa,
  Ticket,
} from '../../../Assets/svg';
import {useNavigation} from '@react-navigation/native';

import Card from '../../../Components/Events/Cards/CardMap'; // Import the Card component
import colors from '../../../Utils/colors';

import MapView, {
  Marker,
  Callout,
  Heatmap,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from 'react-native-maps';
import {GetEvents} from '../../../Services/Events/Events';
import Geolocation from '@react-native-community/geolocation';
import {ThemeContext} from '../../../Components/themeContext';
import { GetHotspots, GetNearbyHotspots, UpdatePosition } from '../../../Services/IrlServices/IrlServices';
import { MeUser } from '../../../Services/User/UserServices';


import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';



export default function Irl() {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [hotspots, setHotspots] = useState([]);
  const [nearbyHotspots, setNearbyHotspots] = useState([]);

  const [isViewVisible, setViewVisible] = useState(false);
  const [isIncogniteActive, setIncogniteActive] = useState(false);
  const {theme,isDarkMode} = useContext(ThemeContext);

  const [region, setRegion] = useState({
    latitude: 0,   // Valor inicial para la latitud
    longitude: 0,  // Valor inicial para la longitud
    latitudeDelta: 0.0922,  // Delta para el zoom (ajusta según sea necesario)
    longitudeDelta: 0.0421,  // Delta para el zoom (ajusta según sea necesario)
  });
  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchUser = async () => {
      const userData = await MeUser();
      setUser(userData);
    };
    fetchUser();

}, []);

  const fetchNearbyHotspots = async (latitude: any, longitude: any) => {
    try {
      const data = await GetNearbyHotspots(latitude, longitude);
      if (Array.isArray(data)) {
        setNearbyHotspots(data);
        console.log('Nearby Hotspots:', data);
      } else {
        console.error('Data fetched is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching nearby hotspots:', error);
    }
  };

  const updateRegionToCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
  
        // Set the region to the user's current location
        const newRegion = {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.1, // Adjust as necessary
          longitudeDelta: 0.1,
        };
        setRegion(newRegion);
  
        try {
          // Update position on the backend or some other service
          //const data = await UpdatePosition(latitude, longitude);
          //console.log('Position updated successfully222:', data);
  
          // Fetch nearby hotspots
          await fetchNearbyHotspots(latitude, longitude);
  
          // Animate the map to the user's current location
          if (mapViewRef.current) {
            mapViewRef.current.animateToRegion(newRegion, 1000); // Animate to the new region in 1 second
          }
        } catch (error) {
          console.error('Error updating position or fetching hotspots:', error);
        }
      },
      error => console.error('Error getting location:', error),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  };
  

  useEffect(() => {
    console.log("Componente montado, ejecutando useEffect...");
  
    const fetchEvents = async () => {
      try {
        const data = await GetEvents();
        if (Array.isArray(data)) {
          const filteredEvents = data.filter(event => event.distance < 35000);
          console.log(filteredEvents)
          setEvents(filteredEvents);
        } else {
          console.error('Data fetched is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
  
    const fetchNearbyHotspots = async (latitude, longitude) => {
      try {
        const data = await GetNearbyHotspots(latitude, longitude);
        if (Array.isArray(data)) {
          setNearbyHotspots(data);
          console.log('Nearby Hotspots:', data);
        } else {
          console.error('Data fetched is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching nearby hotspots:', error);
      }
    };
  
    const fetchLocationAndHotspots = async () => {
      Geolocation.getCurrentPosition(
        async position => {
          const { latitude, longitude } = position.coords;
          setRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          });
          try {
            console.log("Latitude:", latitude, "Longitude:", longitude);
            await fetchNearbyHotspots(latitude, longitude);
          } catch (error) {
            console.error('Error updating position or fetching hotspots:', error);
          }
        },
        error => console.error('Error getting location:', error),
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
      );
    };
  
    const checkLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
        const result = await check(permission);
        if (result === RESULTS.GRANTED) {
          return true;
        } else if (result === RESULTS.DENIED || result === RESULTS.LIMITED) {
          const requestResult = await request(permission);
          return requestResult === RESULTS.GRANTED;
        } else {
          console.error('Location permission denied permanently or unavailable');
          return false;
        }
      }
      // En iOS, simplemente retornar true ya que no se requiere pedir permiso explícitamente aquí
      return true;
    };
  
    const fetchData = async () => {
      const hasPermission = await checkLocationPermission();
      if (hasPermission) {
        await Promise.all([fetchEvents(), fetchLocationAndHotspots()]);
      } else {
        console.log('Ubicación denegada o no disponible');
        fetchEvents();
      }
    };
  
    fetchData();
  
    const unsubscribeFocus = navigation.addListener('focus', () => {
      console.log('Pantalla enfocada, actualizando ubicación y eventos...');
      fetchData();
    });
  
    return () => {
      unsubscribeFocus();
    };
  }, [navigation]);

  const [filteredData, setFilteredData] = useState([]); // Estado para los resultados filtrados
  //const [selectedMenu, setSelectedMenu] = useState('all');
  const [searchText, setSearchText] = useState('');

  
  useEffect(() => {
    const searchInData = () => {
      const filtered = events.filter(
        event =>
          event?.title?.toLowerCase().includes(searchText.toLowerCase()) ||
          event?.location?.toLowerCase().includes(searchText.toLowerCase()),
      );

      setFilteredData(filtered);
    };

    searchInData();
  }, [searchText, events]);

  const handleClearSearch = () => {
    setSearchText(''); // Limpia el texto de búsqueda
    setFilteredData([]); // Opcional: Si deseas limpiar los resultados filtrados
  };

  const mapViewRef = useRef(null);

  const handleCardPress = (latitude: any, longitude: any) => {
    mapViewRef.current.animateToRegion(
      {
        latitude: latitude - 0.004,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000,
    ); // 1000 ms animation duration
  };

  const CustomMarker = ({ coordinate, imageUri }: any) => {
    return (
      <Marker coordinate={coordinate}>
        <View style={styles.markerContainer}>
          {/* Imagen de perfil circular */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: imageUri }}
              style={styles.profileImage}
            />
          </View>
          {/* Punto debajo */}
          <View style={styles.dot} />
        </View>
      </Marker>
    );
  };

  const CustomHotspot = ({ coordinate, users}: any) => {
    return (
      <Marker coordinate={coordinate}>
        <View style={styles.markerContainer}>
          <Text style={{fontSize: 16, fontWeight:'bold', color:'white'}}>{users}</Text>
        </View>
      </Marker>
    );
  };

  const renderContent = () => {
    return (
      <>
        <View style={styles.containermap}>
        
           {/* <MapView
            ref={mapViewRef}
            provider={Platform.OS === 'ios' ? PROVIDER_GOOGLE : PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={region}
            region={region}>
             {Platform.OS === 'ios' ? (
                <>
                  {filteredData.map(spot => (
                    <Marker
                      key={spot.id}
                      coordinate={{
                        latitude: spot.latitude,
                        longitude: spot.longitude,
                      }}
                      title={spot.title}
                      description={spot.description}>
                      <Callout tooltip>
                        <View
                          style={[
                            styles.callout,
                            {
                              borderRadius: 8,
                              backgroundColor: colors.neutral.white,
                              paddingVertical: 4,
                              paddingHorizontal: '2%',
                            },
                          ]}>
                          <Text
                            style={[
                              styles.calloutTitle,
                              {textAlign: 'center'},
                            ]}>
                            {spot.title}
                          </Text>
                          { spot.is_exclusive === true ? (
                            <Text
                            style={{
                              color: colors.secondary.dark,
                              marginTop: 2,
                              marginBottom: 2,
                              textAlign: 'center'
                            }}>
                            The list exclusive event
                          </Text>
                          ): <></>
                          }
                          
                        </View>
                      </Callout>
                    </Marker>
                  ))}
                  {filteredData && filteredData.length > 0 && (
                      <Heatmap
                        points={filteredData.map(spot => ({
                          latitude: spot.latitude,
                          longitude: spot.longitude,
                          weight: 5, // Aumentar el peso para mayor visibilidad al hacer zoom
                        }))}
                        radius={250} // Reducir el radio en niveles altos de zoom
                        opacity={0.7} // Controla la opacidad del heatmap
                        gradient={{
                          colors: [
                            'rgba(249, 192, 46, 0.20)',
                            'rgba(249, 192, 46, 0.90)', // Amarillo semitransparente
                            '#E4261A', // Rojo
                          ],
                          startPoints: [0.4, 0.6, 0.9], // Ajustar la transición entre colores
                          colorMapSize: 1024, // Reducir ligeramente el tamaño para optimizar transiciones
                        }}
                      />
                    )}
                  {hotspots && hotspots.length > 0 && (
                      <>
        
                      {hotspots && hotspots.length > 0 && (
                        <Heatmap
                          points={hotspots.map(spot => ({
                            latitude: spot.latitude,
                            longitude: spot.longitude,
                            weight: 5, // Aumentar el peso para mayor visibilidad al hacer zoom
                          }))}
                          radius={150} // Reducir el radio en niveles altos de zoom
                          opacity={0.7} // Controla la opacidad del heatmap
                          gradient={{
                            colors: [
                              colors.primary.lighest, // Color más claro
                              colors.primary.light,    // Color claro
                              colors.primary.medium,   // Color medio
                            ],
                            startPoints: [0.4, 0.6, 0.9], // Ajustar la transición entre colores
                            colorMapSize: 1024, // Reducir ligeramente el tamaño para optimizar transiciones
                          }}
                        />
                      )}
                    
                   
                     
                    </>
                    
                    )}
                  {nearbyHotspots && nearbyHotspots?.length > 0 && (
                        <Heatmap
                          points={nearbyHotspots?.map(spot => ({
                            latitude: spot.latitude,
                            longitude: spot.longitude,
                            weight: 5, // Aumentar el peso para mayor visibilidad al hacer zoom
                          }))}
                          radius={150} // Reducir el radio en niveles altos de zoom
                          opacity={0.7} // Controla la opacidad del heatmap
                          gradient={{
                            colors: [
                              colors.primary.lighest, // Color más claro
                              colors.primary.light,    // Color claro
                              colors.primary.medium,   // Color medio
                            ],
                            startPoints: [0.4, 0.6, 0.9], // Ajustar la transición entre colores
                            colorMapSize: 1024, // Reducir ligeramente el tamaño para optimizar transiciones
                          }}
                        />
                    )}
                     <CustomMarker
                      coordinate={region}
                      imageUri={ user?.profile_image }
                    />
                     {nearbyHotspots?.map((spot, index) => (
                      <View key={index}>
                        <CustomHotspot
                        coordinate={{ latitude: spot.latitude - 0.00001, longitude: spot.longitude, latitudeDelta: 0.1, longitudeDelta: 0.1}}
                        users={spot?.user_count}
                      />

                      </View>
                        
                      ))}
                </>
              ) : (
                <>
                   {filteredData.map(spot => (
                    <Marker
                      key={spot.id}
                      coordinate={{
                        latitude: spot.latitude,
                        longitude: spot.longitude,
                      }}
                      title={spot.title}
                      description={spot.description}>
                      <Callout tooltip>
                        <View
                          style={[
                            styles.callout,
                            {
                              backgroundColor: colors.neutral.white,
 
                            },
                          ]}>
                          <Text
                            style={[
                              styles.calloutTitle,
                              {textAlign: 'center'},
                            ]}>
                            {spot.title}
                          </Text>
                          { spot.is_exclusive === true ? (
                            <Text
                            style={{
                              color: colors.secondary.dark,
                              marginTop: 2,
                              marginBottom: 2,
                              textAlign: 'center'
                            }}>
                            The list exclusive event
                          </Text>
                          ): <></>
                          }
                          
                        </View>
                      </Callout>
                    </Marker>
                  ))}
                  {filteredData && filteredData.length > 0 && (
                      <Heatmap
                        points={filteredData.map(spot => ({
                          latitude: spot.latitude,
                          longitude: spot.longitude,
                          weight: 5, // Aumentar el peso para mayor visibilidad al hacer zoom
                        }))}
                        radius={40} // Reducir el radio en niveles altos de zoom
                        opacity={0.7} // Controla la opacidad del heatmap
                        gradient={{
                          colors: [
                            'rgba(249, 192, 46, 0.20)',
                            'rgba(249, 192, 46, 0.90)', // Amarillo semitransparente
                            '#E4261A', // Rojo
                          ],
                          startPoints: [0.4, 0.6, 0.9], // Ajustar la transición entre colores
                          colorMapSize: 1024, // Reducir ligeramente el tamaño para optimizar transiciones
                        }}
                      />
                    )}
                  {hotspots && hotspots.length > 0 && (
                      <>
        
                      {hotspots && hotspots.length > 0 && (
                        <Heatmap
                          points={hotspots.map(spot => ({
                            latitude: spot.latitude,
                            longitude: spot.longitude,
                            weight: 5, // Aumentar el peso para mayor visibilidad al hacer zoom
                          }))}
                          radius={40} // Reducir el radio en niveles altos de zoom
                          opacity={0.7} // Controla la opacidad del heatmap
                          gradient={{
                            colors: [
                              colors.primary.lighest, // Color más claro
                              colors.primary.light,    // Color claro
                              colors.primary.medium,   // Color medio
                            ],
                            startPoints: [0.4, 0.6, 0.9], // Ajustar la transición entre colores
                            colorMapSize: 1024, // Reducir ligeramente el tamaño para optimizar transiciones
                          }}
                        />
                      )}
                    
                   
                     
                    </>
                    
                    )}
                  {nearbyHotspots && nearbyHotspots?.length > 0 && (
                        <Heatmap
                          points={nearbyHotspots?.map(spot => ({
                            latitude: spot.latitude,
                            longitude: spot.longitude,
                            weight: 5, // Aumentar el peso para mayor visibilidad al hacer zoom
                          }))}
                          radius={40} // Reducir el radio en niveles altos de zoom
                          opacity={0.7} // Controla la opacidad del heatmap
                          gradient={{
                            colors: [
                              colors.primary.lighest, // Color más claro
                              colors.primary.light,    // Color claro
                              colors.primary.medium,   // Color medio
                            ],
                            startPoints: [0.4, 0.6, 0.9], // Ajustar la transición entre colores
                            colorMapSize: 1024, // Reducir ligeramente el tamaño para optimizar transiciones
                          }}
                        />
                    )}

                    <CustomMarker
                      coordinate={region}
                      imageUri={ user?.profile_image }
                    />
                     
                     {nearbyHotspots?.map((spot, index) => (
                      <View key={index}>
                        <CustomHotspot
                        coordinate={{ latitude: spot.latitude - 0.00001, longitude: spot.longitude, latitudeDelta: 0.1, longitudeDelta: 0.1}}
                        users={spot?.user_count}
                      />

                      </View>
                        
                      ))}
                
                </>
              )}
            </MapView> */}
        
            <View style={{position: 'absolute', bottom: 2}}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.menuContainerc}>
                {filteredData.map((spot: any) => (
                  <TouchableOpacity
                    key={spot.id}
                    style={styles.cardc}
                    onLongPress={() => {
                      navigation.navigate('EventsStack', {
                      screen: 'detailevent',
                      params: { event: spot, isExclusive: false },
                    });}}
                    onPress={() =>
                      handleCardPress(spot.latitude, spot.longitude)
                    }>
                    <Card
                      key={spot.id}
                      title={spot.title}
                      date={spot.date}
                      subtitle={spot.is_exclusive}
                      location={spot.location.substring(0, 26)}
                      imageSrc={spot.image}
                      hour={spot.start_time}
                      price={spot.price}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: '27%',
              right: '5%',
              backgroundColor:theme.background,
             borderRadius:30
            }}
            onPress={() => updateRegionToCurrentLocation()}
            >
            <Current style={{borderRadius:30}} color={theme.text}/>
          </TouchableOpacity>
          <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: '25.6%',
          left: '5%',
        }}
        onLongPress={() => setViewVisible(true)} // Muestra el View al hacer long press
        onPress={() => setIncogniteActive(!isIncogniteActive)} // Cambia el estado de Incognite
        onPressOut={() => setViewVisible(false)} // Oculta el View al soltar el botón
      >
        {isIncogniteActive ? 
        <Incogniteactive color={"white"}/>:  isDarkMode?<IncogniteBlack color={theme.text}/>:<Incognite color={theme.text}/> }
      </TouchableOpacity>

        {isViewVisible && (
          <View
            style={{
              padding: 12,
              borderRadius: 20,
              backgroundColor: colors.secondary.lighest,
              position: 'absolute',
              bottom: '33%',
              left: '5%',
            }}>
            <Text style={{color: colors.secondary.dark, fontSize: 14}}>
              Click to active
            </Text>
            <Text
              style={{
                color: colors.secondary.dark,
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              "out and about"
            </Text>
            <Text
              style={{
                color: colors.secondary.darkest,
                fontSize: 10,
                paddingTop: 2,
              }}>
              to be invisible for 2 hours
            </Text>
          </View>
        )}
        {isIncogniteActive && (
          <View
            style={{
              padding: 12,
              borderRadius: 20,
              backgroundColor: colors.secondary.lighest,
              position: 'absolute',
              top: '2%',
              left: '31.5%',
              alignItems: 'center', // Centra el contenido horizontalmente
              alignContent: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: colors.secondary.dark,
                fontSize: 10,
                fontWeight: 'bold',
              }}>
              Out and about - (Active)
            </Text>
          </View>
        )}
      </>
    );
  };

  return (
    <>
      <View style={{flex: 1, backgroundColor: theme.background}}>
      <SafeAreaView />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 12,
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EventsStack', {screen: 'myevents'})
            }>
            <Ticket color={theme.tertiary} />
          </TouchableOpacity>
          <View
            style={[styles.container2, {backgroundColor: theme.placeholder}]}>
            <TextInput
              style={[styles.input,{color:theme.text}]}
              placeholder="Search..."
              placeholderTextColor="#A8A8A8"
              value={searchText}
              onChangeText={setSearchText}
            />

            {searchText.length === 0 && (
              <TouchableOpacity style={styles.iconContainer2}>
                <Lupa color={"#A8A8A8"} />
              </TouchableOpacity>
            )}
            {searchText.length > 0 && (
              <TouchableOpacity
                onPress={handleClearSearch}
                style={styles.iconContainer2}>
                <Close color={theme.text}/>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('filtersirl')}>
            <Filter color={theme.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>{renderContent()}</View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.white,
    backgroundColor: colors.neutral.white,
  },
  menuItem: {
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

  //

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    height: 80,
  },
  iconContainer: {
    marginRight: 'auto',
  },

  divider: {
    borderBottomColor: '#E5E6E8',
    borderBottomWidth: 1,
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 5,
    marginLeft: 10,
    marginRight: 7,
    width: '82%',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  iconContainer2: {
    padding: 10,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  containermap: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  callout: {
    width: 180,
    borderRadius: 12,
  },
  calloutTitle: {
    fontWeight: 'bold',
  },
  card: {
    position: 'absolute',
    bottom: 50,
    left: 50,
    width: 150,
    height: 100,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: 'white',
    fontWeight: 'bold',
  },
  menuContainerc: {
    paddingHorizontal: 16,
  },
  cardc: {
    marginRight: 16,
  },
  markerContainer: {
    alignItems: 'center',
    marginTop: 4,
    zIndex:40,
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50,
    overflow: 'hidden',
    width: 36,
    height: 36,
    zIndex:30
  },
  profileImage: {
    width: '100%',
    height: '100%',
    zIndex:30
  },
  dot: {
    width: 18,
    height: 18,
    backgroundColor: '#e3008c',
    borderRadius: 18,
    borderWidth: 3,
    borderColor: 'white',
    marginTop: 2, // Para superponer ligeramente el punto
  },
});

{
  /* <View
          style={styles.menuContainer} // Aplica el estilo para la vista horizontal
        >
          <TouchableOpacity
            style={[
              styles.menuItem,
              selectedMenu === 'all' && styles.selectedMenuItem,
            ]}
            onPress={() => setSelectedMenu('all')}>
            <Text
              style={[
                styles.menuText,
                selectedMenu === 'all' && styles.selectedMenuText,
              ]}>
              {'           '}
              All
              {'           '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.menuItem,
              selectedMenu === 'list' && styles.selectedMenuItem,
            ]}
            onPress={() => setSelectedMenu('list')}>
            <Text
              style={[
                styles.menuText,
                selectedMenu === 'list' && styles.selectedMenuText,
              ]}>
              {' '}
              List events{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.menuItem,
              selectedMenu === 'local' && styles.selectedMenuItem,
            ]}
            onPress={() => setSelectedMenu('local')}>
            <Text
              style={[
                styles.menuText,
                selectedMenu === 'local' && styles.selectedMenuText,
              ]}>
              {' '}
              Local events{' '}
            </Text>
          </TouchableOpacity>
        </View> */
}
