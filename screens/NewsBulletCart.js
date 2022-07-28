import React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';


import { Card } from 'react-native-paper';

const NewsBulletCart = (item, navigation, t) => {

  if (item.empty) {
    return <View style={{ flex: 1, backgroundColor: "transparent",marginStart:10,marginEnd:10,marginBottom:10 }}>

    </View>
  }

  return (
    <View style={{ flex: 1,marginStart:10,marginEnd:10,marginBottom:10 }}>
      <TouchableOpacity style={styles.unSelectedButton} onPress={() => {
        navigation.navigate("EventGallary",{recruimentName:item.name,slug:item.slug})
      }}><Text style={styles.unSelectedText}>{item.name}</Text></TouchableOpacity>
    </View>

  )
}

const styles = StyleSheet.create({

  rectangleShapeImage: {
    flex: 1,
    height: 100,
    marginEnd: 8,
    marginStart: 8,
    borderRadius: 5,
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: 10,
    width: 25,
    height: 25
  },
  unSelectedText: {
    color: "#676767",
    fontSize: 12,
    textAlign: "center"
},
unSelectedButton: {
  flex: 1,
  padding: 5,
  borderRadius: 5,
  borderColor: "#00000073",
  backgroundColor: '#fff',
  color: "#676767",
  borderWidth: 1,
  textAlign: "center",
  fontSize: 12
},
  rectangleShapeView: {
    width: 30 * 2,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#098DD4",
    borderRadius: 5

  },


  parentText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1D3557",
    marginBottom: 3
  },
  image: {
    height: 20,
    width: 20,
    justifyContent: "flex-end"
  },
  paragraph: {
    fontSize: 14,
    fontWeight: "normal",
    textAlign: "center",
    color: "#707070",
    marginBottom: 3
  },
  textBackground: {

    backgroundColor: '#FFFFFF',
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    height: 50,
    borderColor: '#EEF3F7',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center"

  },
  itemInvisible: {
    backgroundColor: "transparent"
  }

});

export default NewsBulletCart
