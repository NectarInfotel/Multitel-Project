import React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity,ImageBackground,Dimensions,Pressable} from 'react-native'
import AsyncStorage  from '@react-native-async-storage/async-storage';


import { Card } from 'react-native-paper';

const FullViewCart = (item,navigation,t) => {



  if(item.empty )
  {
   return <View style={{ flex: 1,backgroundColor:"transparent" }}>
  
  </View> 
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: "#FFFFFF",marginStart:5,marginEnd:5 ,marginBottom:10}}>
        <View>

          <View>
            <Image
              source={{
                uri:
                `http://50.28.104.48:3003/images/${item}`,
              }}
              resizeMode="stretch"
              style={styles.rectangleShapeImage}>

            </Image>
          </View>
    

        </View>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({

  rectangleShapeImage: {
    flex:1,
    height: 100
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: 10,
    width: 25,
    height: 25
  },
  rectangleShapeView: {
    width: 30 * 2,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop:5,
    backgroundColor: "#098DD4",
    borderRadius: 3

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
  itemInvisible:{
    backgroundColor:"transparent"
  }

});

export default FullViewCart
