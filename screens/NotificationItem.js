/* eslint-disable no-unused-vars */
/* eslint-disable space-infix-ops */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';

import { View, Image,TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NotificationItem = ({ navigation }) => {

  return (
    <TouchableOpacity onPress={() => {()=>navigation.navigate('MyCartScreen')}}><View style={{ flexDirection: 'row', flex: 1, alignItems: "center" }}>
      <View>
        <Image
          source={require('../assest/user.png')}
          //borderRadius will help to make Round Shape
          style={{
            width: 50,
            height: 50,
            borderRadius: 200 / 2
          }}
        />
        <View>
          <Text style={styles.paragraph}>
            Jorge Rau{" "}
            <Text style={styles.highlight}>Liked your Product{" "}</Text>
          </Text>
        </View>
      </View>


    </View></TouchableOpacity>
  );
};

export default NotificationItem;
