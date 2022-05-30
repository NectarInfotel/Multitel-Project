import React from 'react'
import { View, StyleSheet, Image, Text, ImageBackground, Dimensions } from 'react-native'
import { Card } from 'react-native-paper';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const HomeNetworkCart = () => {
  return (
    <View style={{ flex: 1, marginTop: 20 }}>

      <Card onPress={() => { }} style={styles.wrap}>
        <View style={{ backgroundColor: "#fff", borderRadius: 8, paddingHorizontal: 10 }}>

          <View style={{ width: "100%", justifyContent: "space-between", flexDirection: "row" }}>

            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 10 }}>Plan</Text>
              <Text style={{ color: "#1D3557", fontWeight: "bold", fontSize: 12 }}>$120</Text>
            </View>

            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 10 }}>Validity</Text>
              <Text style={{ color: "#1D3557", fontWeight: "bold", fontSize: 12 }}>60 Days</Text>
            </View>

            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 10 }}>Data</Text>
              <Text style={{ color: "#1D3557", fontWeight: "bold", fontSize: 12 }}>2GB/Day</Text>
            </View>

          </View>

          <Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 12, marginTop: 30 }}>Subscription</Text>
          <View style={{ flexDirection: "row",alignItems:"center",justifyContent:"space-between",marginTop:5 }}>
          <View style={{flexDirection:"row"}}>
          <Image
            source={require('../assest/song.png')}
            style={{ margin: 1 }}
          />
          <Image
              source={require('../assest/instragam.png')}
              style={{ margin: 1 }}
            /><Image
              source={require('../assest/facebook_ic.png')}
              style={{ margin: 1 }}
            /><Image
              source={require('../assest/energy.png')}
              style={{ margin: 1 }}
            />
            <Image
              source={require('../assest/whatsup.png')}
              style={{ margin: 1 }}
            /></View>
            <View style={styles.rectangleShapeView}>

              <Text style={{ color: "#fff", fontWeight: "normal", fontSize: 8 }}>Know More</Text>

            </View>
          </View>









        </View>
      </Card>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrap: {
    width: WIDTH / 1.5,
    marginEnd: 15,
    borderRadius: 8,
    height: HEIGHT * 0.20
  }, 
  rectangleShapeView: {
    width: 30 * 2,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf:"flex-end",
    backgroundColor: "#098DD4",
    borderRadius: 5

  }




});

export default HomeNetworkCart
