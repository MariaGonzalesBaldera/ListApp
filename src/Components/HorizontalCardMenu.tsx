import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../Utils/colors';
import fonts from '../Utils/fonts';
import { Check, Closeb } from '../Assets/svg';
import Card from '../Components/Events/Cards/CardMap'; // Import the Card component

const HorizontalCard = ({ menus, options, onPress }: any) => {




  return (
    <View>
      {/* ScrollView horizontal para mostrar los menús */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.menuContainer}>
        {menus.map((menu: any, index: any) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuButton]}
            onPress={() => onPress()}
          >
          
            <Card key={menu.id} title={menu.title} date={menu.date} subtitle={menu.subtitle} location={menu.location} imageSrc={menu.imageSrc}/>
 
           
          </TouchableOpacity>
        ))}
      </ScrollView>



    </View>
  );
};

const styles = StyleSheet.create({

  menuContainer: {

    paddingHorizontal:16,
   
  },
  menuButton: {
    marginRight: 16,

  },
  selectedMenu: {
    backgroundColor: colors.neutral.white,
  },
  menuText: {
    fontSize: 16,
    color: colors.neutral.dark,
  },
  selectedText: {
    fontWeight: '600',
    color: colors.primary.medium
  },
  optionsContainer: {
    height:'90%',
  },
  optionButton: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.dark,
  },
  optionText: {
    fontSize: 14,
    color: colors.neutral.dark,
  },
});

export default HorizontalCard;