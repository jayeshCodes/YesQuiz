import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
export const HeaderComp = ({ onPress, name }) => (
    <View
    style={{
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom:20,
      marginBottom:15,
      backgroundColor: 'white',
      borderBottomLeftRadius: 10, 
      borderBottomRightRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    }}
  >
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <Ionicons name="chevron-back-outline" size={24} color={'#000000'} />
      </TouchableOpacity>
  </View>
);
