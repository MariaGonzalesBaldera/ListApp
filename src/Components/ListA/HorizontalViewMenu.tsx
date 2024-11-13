import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import colors from '../../Utils/colors';
import fonts from '../../Utils/fonts';
import {AllSelected, Check, Checked, Closeb} from '../../Assets/svg';
import {ThemeContext} from '../themeContext';

const HorizontalViewMenu = ({menus, options, onMenuSelect}: any) => {
  const [selectedMenu, setSelectedMenu] = useState(menus[0]);
  const {theme, isDarkMode} = useContext(ThemeContext);
  const [checked4, setChecked4] = useState(false);
  const handleToggle4 = () => setChecked4(!checked4);

  console.log(menus[0])

  const handleMenuSelect = (menu: any) => {
    setSelectedMenu(menu);
    onMenuSelect(menu);
  };
  // Al cargarse el componente o cuando cambien los menús
  useEffect(() => {
    if (menus.length > 0) {
      setSelectedMenu(menus[0]); // Asignar el primer menú cuando haya datos
    }
  }, [menus]);
  
  const [checkedState, setCheckedState] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    const newCheckedState = Array(checkedState.length).fill(!selectAll);
    setCheckedState(newCheckedState);
    setSelectAll(!selectAll);
  };
  const handleToggle = index => {
    const updatedCheckedState = checkedState.map((item, idx) =>
      idx === index ? !item : item,
    );
    setCheckedState(updatedCheckedState);
  };

  return (
    <View style={{flex: 0.98}}>
      {/* ScrollView horizontal para mostrar los menús */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.menuContainer}>
        {menus.map((menu: any, index: any) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuButton,
              {backgroundColor: theme.background},
              selectedMenu === menu ? styles.selectedMenu : null,
            ]}
            onPress={() => handleMenuSelect(menu)}>
            <Text
              style={[
                styles.menuText,
                {color: theme.text},
                selectedMenu === menu ? styles.selectedText : null,
              ]}>
              {menu}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={[
          styles.optionsContainer,
          {backgroundColor: theme.backgroundChat},
        ]}>
        {selectedMenu && (
          <View>
            <View style={{paddingHorizontal: 24, marginTop: 8}}>
              <Text
                style={[
                  fonts.H3,
                  {
                    justifyContent: 'center',
                    alignSelf: 'center',
                    color: theme.text,
                  },
                ]}>
                {options[selectedMenu][0]}
              </Text>
              <Text
                style={[
                  fonts.B1,
                  {
                    justifyContent: 'center',
                    alignSelf: 'center',
                    textAlign: 'center',
                    marginVertical: 16,
                    color: theme.text,
                  },
                ]}>
                {options[selectedMenu][1]}
              </Text>
            </View>

            {options[selectedMenu][0] === 'A la Carte' ? (
              <ScrollView
                style={{
                  backgroundColor: isDarkMode
                    ? colors.secondary.medium
                    : colors.secondary.light,
                  width: '90%',
                  alignSelf: 'center',
                  borderRadius: 20,
                  marginBottom:20,
                  paddingHorizontal:10,
                }}>
                <View
                  style={{
                    paddingTop:10,
                    flexDirection: 'row',
                    paddingBottom: 10,
                    marginTop: 12,
                  }}>
                  <View style={{flex: 1, paddingLeft: 12}}>
                    <Text
                      style={[
                        fonts.Btn,
                        {color: colors.neutral.darkest, textAlign: 'left'},
                      ]}>
                      Feature
                    </Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Text
                      style={[
                        fonts.Btn,
                        {color: colors.neutral.darkest, textAlign: 'center'},
                      ]}>
                      {options[selectedMenu][2]}
                    </Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'center',paddingHorizontal:8}}>
                  <TouchableOpacity onPress={handleSelectAll}>
                      <AllSelected
                        name={selectAll ? 'minus-icon' : 'plus-icon'}
                        size={24}
                        color={colors.primary.medium}
                      />
                    </TouchableOpacity>
                    </View>
                </View>
                {[
                  'Exclusive A*List only events',
                  'Pre-sale event tickets',
                  'Access to event guest Lists',
                  'See The List at local events',
                ].map((feature, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      paddingVertical: 12,
                      paddingHorizontal: 12,
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flex: 0.36}}>
                      <View style={{width: 150}}>
                        <Text
                          style={[fonts.B3, {color: colors.neutral.darkest}]}>
                          {feature}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 0.3,
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        style={styles.checkboxContainer}
                        onPress={() => handleToggle(index)}>
                        <View style={{flex: 0.3, alignItems: 'center'}}>
                          <View
                            style={[
                              styles.checkbox,
                              {
                                borderColor: checkedState[index]
                                  ? colors.primary.medium
                                  : colors.neutral.darkest,
                                borderWidth: 1,
                                backgroundColor: checkedState[index]
                                  ? colors.primary.medium
                                  : colors.neutral.white,
                              },
                            ]}>
                            {checkedState[index] && (
                              <Checked color={colors.neutral.white} />
                            )}
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </ScrollView>
            ) : (
              <ScrollView
                style={{
                  backgroundColor: isDarkMode
                    ? colors.secondary.medium
                    : colors.secondary.light,
                  width: '90%',
                  alignSelf: 'center',
                  borderRadius: 20,
                  marginBottom:20
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingBottom: 5,
                    marginTop: 12,
                  }}>
                  <View style={{flex: 1, paddingLeft: 12}}>
                    <Text
                      style={[
                        fonts.Btn,
                        {color: colors.neutral.darkest, textAlign: 'left'},
                      ]}>
                      Feature
                    </Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Text
                      style={[
                        fonts.Btn,
                        {color: colors.neutral.darkest, textAlign: 'center'},
                      ]}>
                      {options[selectedMenu][2]}
                    </Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Text
                      style={[
                        fonts.Btn,
                        {color: colors.neutral.darkest, textAlign: 'center'},
                      ]}>
                      {options[selectedMenu][2]}
                    </Text>
                  </View>
                </View>
                {[
                  'Exclusive A*List only events',
                  'Pre-sale event tickets',
                  'Access to event guest Lists',
                  'See The List at local events',
                ].map((feature, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      paddingVertical: 12,
                      paddingLeft: 12
                    }}>
                    <View style={{flex: 0.36}}>
                      <Text style={[fonts.B3, {color: colors.neutral.darkest}]}>
                        {feature}
                      </Text>
                    </View>
                    <View style={{flex: 0.3, alignItems: 'center'}}>
                      {options[selectedMenu][0]==='A-Lister' || options[selectedMenu][0]==='IRL only plan'?
                      <Check color={colors.primary.medium} />:
                      <Closeb
                        color={
                          isDarkMode ? colors.secondary.lighest : '#A8A8A8'
                        }
                      />}
                      
                    </View>
                    <View style={{flex: 0.3, alignItems: 'center'}}>
                      {/* Aquí puedes mostrar los iconos de check o X dependiendo del tipo seleccionado */}
                      {options[selectedMenu][0]==='A-Lister' || options[selectedMenu][0]==='Digital only plan'?
                      <Check color={colors.primary.medium} />:
                      <Closeb
                        color={
                          isDarkMode ? colors.secondary.lighest : '#A8A8A8'
                        }
                      />}
                    </View>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuButton: {
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  selectedMenu: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary.medium,
    marginBottom: -6,
  },
  menuText: {
    fontSize: 16,
    fontWeight:"500"
  },
  selectedText: {
    fontWeight: '600',
    color: colors.primary.medium,
  },
  optionsContainer: {
    height: '90%',
  },
  optionButton: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 14,
    color: colors.neutral.darkest,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: colors.primary.medium,
    borderColor: colors.primary.medium,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'space-between',
  },
});

export default HorizontalViewMenu;
