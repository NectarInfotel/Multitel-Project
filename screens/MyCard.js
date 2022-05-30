import React from 'react'
import { View,StyleSheet,Image,Text,Pressable  } from 'react-native'

import { Card } from 'react-native-paper';

const MyCard = (item,deleteItem) => {
  let price="$"+item.product.price
    return(
      <View style={{paddingHorizontal:10}}>
        <Card style={{marginTop:15 ,paddingHorizontal:10,paddingVertical:5}}>
        <View style={{flex:1,flexDirection:"row"}}>
        <Image
        source={{
          uri: 
          `http://50.28.104.48:3003/images/${item.product.cover_img}`,
        }}
        resizeMode="stretch"
        style={styles.rectangleShapeImage}></Image>
        <View style={{flex:1,marginStart:10}}>
        <View style={{flexDirection:"row",width:"100%"}}>
                            <Text numberOfLines={1} style={{alignItems:"flex-start",flex:1,color:"#1D3557",fontWeight: "bold",fontSize: 14,}}>{item.product.name}</Text>

                            <Pressable onPress={()=>deleteItem(item)}><Image style={{height:25,width:25,marginEnd:5}}
                                source={require('../assest/delete.png')}
                            /></Pressable>

                        </View>
                        <Text numberOfLines={1} style={{color:"#707070",fontWeight: "normal",fontSize: 14,}}>{item.product.description}</Text>
                        
                        <View  style={{flexDirection:"row",width:"100%",alignItems:"center",marginTop:5}}>
                        <View style={styles.rectangleShapeView}>
                        <Image style={{height:24,width:24}}
                                source={require('../assest/sub.png')}
                            />
                        <Text  style={{color:"#707070",fontWeight: "normal",fontSize: 14}}>{item.quantity}</Text>
                           <Image style={{height:24,width:24}}
                                source={require('../assest/add.png')}
                            />
                        </View>
                        <Text  style={{color:"#1D3557",fontWeight: "bold",fontSize: 14,marginStart:30}}>{price}</Text>
                        </View>
          

        </View>
      </View>
      </Card>
      </View>

       )
}

const styles = StyleSheet.create({
  
  rectangleShapeImage: {
    width: 80,
    height: 80,
    justifyContent:"flex-end",
    borderRadius:5,
    }, 

    rectangleShapeView: {
      width: 45 * 2,
      height: 25,
      marginStart:2,
      justifyContent:"space-between",
      alignItems:"center",
      flexDirection:"row",
      borderColor:"#098DD4",
      borderWidth:1,
      borderRadius:5
     
      },


    parentText: {
      fontSize: 14,
      fontWeight: "bold",
      textAlign: "center",
      color: "#1D3557",
      marginBottom:3
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
      marginBottom:3
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

export default MyCard
