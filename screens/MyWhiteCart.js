import React from 'react'
import { View, StyleSheet, Image, Text, Pressable } from 'react-native'

import { Card } from 'react-native-paper';

const MyWhiteCart = (item,deleteCart,t) => {

  let price="$"+item.product.price
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <Card style={{ marginTop: 20, backgroundColor: "#FFFFFF", paddingHorizontal: 10, paddingVertical: 5 }}>
        <View style={{ flex: 1, flexDirection: "row" }}>

          
          <Image
            source={{
              uri:
              `http://50.28.104.48:3003/images/${item.product.cover_img}`,
            }}
            resizeMode="stretch"
            style={styles.rectangleShapeImage}></Image>
          <View style={{ flex: 1, marginStart: 10 }}>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <Text numberOfLines={1} style={{ alignItems: "flex-start", flex: 1, color: "#1D3557", fontWeight: "bold", fontSize: 14, }}>{item.product.name}</Text>

              <Pressable onPress={()=>deleteCart(item)}><Image style={{ height: 25, width: 25, marginEnd: 5 }}
                source={require('../assest/delete.png')}
              /></Pressable>

            </View>
            <Text numberOfLines={1} style={{ color: "#707070", fontWeight: "normal", fontSize: 11, }}>{item.product.description}</Text>

            <View style={{ flexDirection: "row", width: "100%", alignItems: "center", marginTop: 5, justifyContent: "space-between" }}>

              <View style={{ flexDirection: "row" }}><Text style={{ color: "#098DD4", fontWeight: "normal", fontSize: 12 }}>{price}</Text><Text style={{ color: "#707070", fontWeight: "normal", fontSize: 12, marginStart: 2, textDecorationLine: 'line-through' }}>$1000</Text></View>
              <View style={styles.rectangleShapeView}>

                <Text style={{ color: "#fff", fontWeight: "normal", fontSize: 8 }}>{t('Know More')}</Text>

              </View>

            </View>


          </View>
          <Image
            source={require('../assest/heart_ic.png')}
            style={styles.icon}
          />
        </View>
      </Card>
    </View>

  )
}

const styles = StyleSheet.create({

  rectangleShapeImage: {
    width: 80,
    height: 80,
    justifyContent: "flex-end",
    borderRadius: 5,
  },
  icon: {
    position: 'absolute',
    right: 275,
    bottom: 50,
    width: 25,
    height: 25
  },
  rectangleShapeView: {
    width: 30 * 2,
    height: 20,
    marginStart: 2,
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

  }

});

export default MyWhiteCart
