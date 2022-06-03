import React from 'react'
import { View, StyleSheet, Image, Text,Pressable } from 'react-native'
import AsyncStorage  from '@react-native-async-storage/async-storage';


import { Card } from 'react-native-paper';

const ProductCart = (item,navigation,addFavorite,t) => {

 
  if(item.empty)
  {
   return <View style={{ flex: 1,backgroundColor:"transparent" }}>
    
  </View> 
  }

  return (
    <View style={{ flex: 1 }}>
      <Card onPress={()=>{
        AsyncStorage.setItem("product",JSON.stringify(item))
        navigation.navigate('ProductDetail')
        }}
      
      style={{ marginTop: 20, backgroundColor: "#FFFFFF", marginHorizontal: 20, paddingVertical: 10,elevation:1 }}>
        <View>

          <View>
            <Image
              source={{
                uri:
                `http://50.28.104.48:3003/images/${item.cover_img}`,
              }}
              resizeMode="stretch"
              style={styles.rectangleShapeImage}>

            </Image>

            <Pressable style={{ bottom:100}} onPress={()=>addFavorite(item)}><Image
              source={require('../assest/heart_ic.png')}
              style={styles.icon}
            /></Pressable>
          </View>
          <View style={{ flex: 1, marginStart: 10,marginTop:10 }}>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <Text numberOfLines={1} style={{ alignItems: "flex-start", flex: 1, color: "#1D3557", fontWeight: "bold", fontSize: 14, }}>{item.name}</Text>
            </View>
            <Text numberOfLines={1} style={{ color: "#707070", fontWeight: "normal", fontSize: 11, }}>{item.description}</Text>

            <View style={{ flexDirection: "row", width: "100%", alignItems: "center", marginTop: 5, justifyContent: "space-between" }}>

              <View style={{ flexDirection: "row" }}><Text style={{ color: "#098DD4", fontWeight: "normal", fontSize: 12 }}>{item.price}</Text><Text style={{ color: "#707070", fontWeight: "normal", fontSize: 12, marginStart: 2, textDecorationLine: 'line-through' }}>$1000</Text></View>


            </View>
            <View style={{alignItems:"center",justifyContent:"space-between",flexDirection:"row",marginTop:10}}>
            <View style={styles.rectangleShapeView}>

              <Text style={{ color: "#fff", fontWeight: "normal", fontSize: 8 }}>{t('Know More')}</Text>

            </View>

            <Image
              source={require('../assest/shopping.png')}
              style={{height:20,width:20,marginEnd:10}}
            />
            </View>
          </View>

        </View>
      </Card>
    </View>

  )
}

const styles = StyleSheet.create({

  rectangleShapeImage: {
    flex:1,
    height: 100,
    marginEnd:8,
    marginStart:8,
    borderRadius: 5,
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
  itemInvisible:{
    backgroundColor:"transparent"
  }

});

export default ProductCart
