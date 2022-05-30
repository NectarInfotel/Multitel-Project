import React from 'react'
import { View, StyleSheet, Image, Text, ImageBackground } from 'react-native'

import { Card } from 'react-native-paper';

const MyServiceCart = (item) => {
  return (
    <View style={{ paddingHorizontal: 10 ,marginBottom:15}}>


      <View style={styles.innerView}>

        <View style={{ paddingVertical: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

          <Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 14 }}>Truly Unlimited Plan</Text>

          <Text style={{ color: "#1D3557", fontWeight: "bold", fontSize: 20 }}>$148</Text>

        </View>
        <View style={{ backgroundColor: "#EAEAEA", height: 1, width: "100%" }}/>

        <View style={{ flexDirection: "row", alignItems: "center",marginTop:5,paddingVertical:10}}>

          <Image
            source={require('../assest/calender.png')}
            style={{ height: 20, width: 20, marginEnd: 20 }}
          />

             <Text style={{ color: "#707070", fontWeight: "normal", fontSize: 14,flex:1 }}>Active Period</Text>

             <Text style={{ color: "#1D3557", fontWeight: "bold", fontSize: 12 }}>30 Days</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center",marginTop:5,paddingVertical:10}}>

          <Image
            source={require('../assest/internet.png')}
            style={{ height: 20, width: 20, marginEnd: 20 }}
          />

             <Text style={{ color: "#707070", fontWeight: "normal", fontSize: 14,flex:1 }}>Internet</Text>

             <Text style={{ color: "#1D3557", fontWeight: "bold", fontSize: 12 }}>2 GB/Day</Text>
        </View>


        <View style={{ flexDirection: "row", alignItems: "center",marginTop:5,paddingVertical:10}}>

          <Image
            source={require('../assest/game.png')}
            style={{ height: 20, width: 20, marginEnd: 20 }}
          />

             <Text style={{ color: "#707070", fontWeight: "normal", fontSize: 14,flex:1 }}>Game</Text>

             <Text style={{ color: "#1D3557", fontWeight: "bold", fontSize: 12 }}>Unlimited</Text>
        </View>

        <View style={styles.button}>

        <Image
            source={require('../assest/cart.png')}
            style={{ height: 15, width: 15, marginEnd: 10 }}
          />

        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 12 }}>Buy Now</Text>

        </View>


      </View>


    </View>

  )
}

const styles = StyleSheet.create({

  innerView: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  button: {
    backgroundColor: "#0076B5",
    color: "white",
    borderRadius: 50,
    marginTop:15,
    marginBottom:15,
    flexDirection:"row",
    width: "100%",
    justifyContent: "center",
    paddingVertical:13,
    borderRadius: 5,
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center"
}

});

export default MyServiceCart
