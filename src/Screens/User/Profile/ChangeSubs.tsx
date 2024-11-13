import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../Components/ListA/headerA'
import HorizontalVerticalMenu from '../../../Components/HorizontalVerticalMenu'
import colors from '../../../Utils/colors';
import HorizontalViewMenu from '../../../Components/ListA/HorizontalViewMenu';
import fonts from '../../../Utils/fonts';
import { useNavigation } from '@react-navigation/native';
import HeaderUser from '../../../Components/HeaderUser';
import { Close } from '../../../Assets/svg';
import { ThemeContext } from '../../../Components/themeContext';
import { GetPlans, GetPrices } from '../../../Services/Subscriptions/SubscriptionsServices';

export default function ListA() {
  const {theme, isDarkMode} = useContext(ThemeContext);
  const navigation = useNavigation()
   {/*     const menus = [
    'A-Lister',
    'IRL only plan',
    'Digital only plan',
    'A la Carte',
  ]; //,'Digital + IRL plan'
  const options = {
    'A-Lister': [
      'A-Lister',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer congue nulla et.',
      'A-Lister',
      'IRL Only Plan',
      '29.99',
      '15.00',
      '10.00'
    ],
    'IRL only plan': [
      'IRL only plan',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer congue nulla et.',
      'IRL Only Plan',
      'Digital Only Plan',
      '24.99',
      '14.99',
      '9.99',
    ],
    'Digital only plan': [
      'Digital only plan',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer congue nulla et.',
      'Digital Only Plan',
      'A carte',
      '15.99',
      '12.99',
      '9.99',
    ],
    // 'Digital + IRL plan': ['Digital + IRL Plan', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer congue nulla et.','','','','',''],
    'A la Carte': [
      'A la Carte',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer congue nulla et.',
      '',
      '',
      '7.99',
      '15.98',
      '',
    ],
  }; */}
   
    

  const [mergedData, setMergedData] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [menus, setMenus] = useState([]);
  const [options, setOptions] = useState({});
  
  // Función para fusionar planes y precios
  const mergePlansWithPrices = (plans, prices) => {
    return plans.map((plan) => {
      const planPrices = prices.filter((price) => price.planId === plan.id);
      return { ...plan, pricingOptions: planPrices };
    });
  };
  

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPlans = await GetPlans(); // Supón que esta es la función que obtiene los planes
        const fetchedPrices = await GetPrices(); // Supón que esta es la función que obtiene los precios
  
        console.log('Fetched Plans:', fetchedPlans); // Log de los planes obtenidos
        console.log('Fetched Prices:', fetchedPrices); // Log de los precios obtenidos
  
        // Fusionar planes y precios después de obtener ambos
        const mergedData = mergePlansWithPrices(fetchedPlans, fetchedPrices);
        setMergedData(mergedData);
        console.log('Merged Data:', mergedData); // Log de los datos fusionados
  
        // Generar los menus y options una vez que los datos estén fusionados
        //generateMenusAndOptions(mergedData);
          // Función para generar los menus y options basados en mergedData
        const generateMenusAndOptions = (mergedData) => {
          const menus = mergedData.map(plan => plan.name);
          const options = mergedData.reduce((acc, plan) => {
            const pricingOptions = plan.pricingOptions.map(price => price.price);
        
            // Crear el array en el formato deseado
            acc[plan.name] = [
              plan.name,
              plan.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer congue nulla et.',
              plan.name,
              ...pricingOptions, // Agregar los precios
              ...new Array(3 - pricingOptions.length).fill(''), // Rellenar hasta 3 precios vacíos si es necesario
            ];
            return acc;
          }, {});
        
          console.log(menus)
          console.log(options)

          setMenus(menus);
          setOptions(options);
          if (menus.length > 0) {
            setSelectedMenu([menus[0]]);
          }
        };

        generateMenusAndOptions(mergedData);

        

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []); // Solo se ejecuta una vez al montar el componente

  

  return (
    <>
      <View style={{flex: 1, backgroundColor: theme.background}}>
      <HeaderUser text='Change your subscription' svg2={<Close color={theme.text}/>} onPress2={() => navigation.goBack()} />
        <View style={{marginTop: 12}} />
        <HorizontalViewMenu
          menus={menus}
          options={options}
          onMenuSelect={menu => setSelectedMenu(options[menu])}
        />

{selectedMenu.length > 0 && options[selectedMenu[0]] ? (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 10,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderTopRightRadius: 20,
      marginBottom: 6,
    }}>
    <TouchableOpacity
      onPress={() => setSelectedPlan('1 month')}
      style={{
        width: 140,
        height: 110,
        borderWidth: 1,
        borderColor:
          selectedPlan === '1 month'
            ? colors.primary.medium
            : colors.neutral.light,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          position: 'absolute',
          top: -7,
          backgroundColor:
            selectedPlan === '1 month' ? colors.primary.lighest : theme.disable,
          paddingHorizontal: 6,
          paddingVertical: 1,
          borderRadius: 8,
        }}>
        <Text
          style={{
            fontSize: 9,
            fontWeight: selectedPlan === '1 month' ? 'bold' : '300',
            color: selectedPlan === '1 month' ? colors.primary.medium : theme.text,
          }}>
          Single price
        </Text>
      </View>
      <Text style={[fonts.S1, {color: theme.text}]}>
        ${options[selectedMenu[0]] && options[selectedMenu[0]][3] ? options[selectedMenu[0]][3] : ''}
      </Text>
      <Text style={[fonts.C2B, {color: theme.text}]}>per upgrade</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => setSelectedPlan('1 year')}
      style={{
        borderWidth: 1,
        borderColor:
          selectedPlan === '1 year'
            ? colors.primary.medium
            : colors.neutral.light,
        width: 140,
        paddingHorizontal: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          position: 'absolute',
          top: -7,
          backgroundColor: colors.primary.lighest,
          paddingHorizontal: 6,
          paddingVertical: 1,
          borderRadius: 8,
        }}>
        <Text
          style={{
            fontSize: 9,
            fontWeight: 'bold',
            color: colors.primary.medium,
          }}>
          Total price
        </Text>
      </View>
      <Text style={[fonts.S1, {color: theme.text}]}>
        ${options[selectedMenu[0]] && options[selectedMenu[0]][4] ? options[selectedMenu[0]][4] : ''}
      </Text>
      <View
        style={{
          backgroundColor: colors.secondary.lighest,
          paddingHorizontal: 12,
          paddingVertical: 0,
          borderRadius: 20,
          marginVertical: 2,
        }}>
        <Text
          style={[
            fonts.C2B,
            {color: colors.secondary.dark, fontSize: 10},
          ]}>
          {options[selectedMenu[0]] && options[selectedMenu[0]][5] ? options[selectedMenu[0]][5] : ''}
        </Text>
      </View>
      <Text
        style={[fonts.C2B, {textAlign: 'center', color: theme.text}]}>
        Your choices to pay per month
      </Text>
    </TouchableOpacity>
  </View>
) : null}





        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              // navigation.navigate('Alist')
              //navigation.navigate('typemethod')
              console.log('upgrade')
            }>
            <Text style={[fonts.Btn, {color: colors.neutral.white}]}>
              Upgrade now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
  
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary.medium,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
     marginTop: 'auto', marginBottom: 16,
    marginHorizontal: 16
  },
  button2: {
    backgroundColor: colors.secondary.dark,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
     marginTop: 'auto', marginBottom: 16,
  },
})