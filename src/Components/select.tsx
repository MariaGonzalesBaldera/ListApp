import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import colors from '../Utils/colors';
import {ChevDown} from '../Assets/svg';
import {ThemeContext} from './themeContext';

const SelectComponent = ({
  options,
  onSelect,
  selectedValue,
  textOption,
}: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [modalPosition, setModalPosition] = useState(0);

  const {theme, isDarkMode} = useContext(ThemeContext);

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option.label);
    onSelect(option.value);
    setModalVisible(false);
  };

  const toggleModal = (event: any) => {
    setModalPosition(event.nativeEvent.pageY);
    setModalVisible(!modalVisible);
  };

  return (
    <View style={{marginBottom: 10}}>
      <TouchableOpacity
        style={[styles.input, {backgroundColor: theme.placeholder,borderColor:theme.disable}]}
        onPress={toggleModal}>
        <Text style={{color: theme.text}}>{selectedOption || textOption}</Text>
        <ChevDown color={theme.text} />
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}>
          <View
            style={[
              styles.modalView,{backgroundColor:theme.background},
              {left: modalPosition.x, top: modalPosition.y},
            ]}>
            <FlatList
            style={{backgroundColor:theme.background}}
              data={options}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,{borderColor:theme.disable},
                    selectedValue === item.label && {backgroundColor:theme.background},
                  ]}
                  onPress={() => handleOptionSelect(item)}>
                  <Text style={{color: selectedValue?theme.text:theme.text}}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    fontSize: 14,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 2,
    width: '100%', // Ensure the input takes full width
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    borderRadius: 20,
    padding: 10,
    elevation: 1,
    maxHeight: height * 0.4,
    width: '90%', // Ensure the modal takes 90% width of the screen
    overflow: 'hidden',
    position: 'absolute',
    top: '40%', // Adjust the vertical position as needed
  },
  optionItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  selected: {
    backgroundColor: '#ddd',
  },
});

export default SelectComponent;
