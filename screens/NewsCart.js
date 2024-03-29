import React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity,ImageBackground,Dimensions,Pressable} from 'react-native'
import AsyncStorage  from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { Card } from 'react-native-paper';

const NewsCart = (item,navigation,t) => {

  const dateOfBirth = item.news_date
  let tempDate = new Date(dateOfBirth)
    
  let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear()
  let convertDate=moment(tempDate).format('DD MMM yyyy') 
  console.log("dateTime="+convertDate)

  if(item.empty )
  {
   return <View style={{ flex: 1,backgroundColor:"transparent" }}>
  
  </View> 
  }

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={()=>{
        AsyncStorage.setItem("News",JSON.stringify(item))
        navigation.navigate('NewsFullView')
        }} ><View style={{ marginTop: 2, backgroundColor: "#FFFFFF",marginHorizontal:5,paddingHorizontal:5, paddingVertical: 5,borderColor:"#098DD4",borderWidth:1,marginBottom:5}}>
        <View>

          <View>
          {item.image!=null&&<Image
              source={{
                uri:
                `http://50.28.104.48:3003/images/${item.image[0]}`,
              }}
              resizeMode="stretch"
              style={styles.rectangleShapeImage}>

            </Image>}
            
          </View>
          <View style={{alignItems:"center",marginTop:10 }}>
          
              <Text numberOfLines={1} style={{textAlign:"center", color: "#1D3557", fontWeight: "bold", fontSize: 14, }}>{convertDate}</Text>
          
            <Text  numberOfLines={1}style={{textAlign:"center",color: "#707070", fontWeight: "normal", fontSize: 11,marginTop:1 }}>{item.description}</Text>

            <View style={styles.rectangleShapeView}>

              <Text style={{ color: "#fff", fontWeight: "normal", fontSize: 8 }}>{t('Know More')}</Text>

            </View>

      
            
          </View>

        </View>
      </View></TouchableOpacity>
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

export default NewsCart
