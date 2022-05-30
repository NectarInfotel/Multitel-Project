/* eslint-disable no-unused-vars */
/* eslint-disable space-infix-ops */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React,{useState} from 'react';

import {View, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ActionBar = ({navigation}) => {
  return (
    <View style={{flexDirection: 'row',flex:1,alignItems:"center"}}>

    <Ionicons  style={{marginLeft:5}} name="arrow-back" size={20} color="green" onPress={()=>navigation.goBack()}/>
   
    </View>
  );
};

export default ActionBar;
