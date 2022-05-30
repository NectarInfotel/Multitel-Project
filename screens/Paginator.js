import React,{useEffect} from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    View,
    Text,ScrollView,
    SafeAreaView,Image,Dimensions,Animated,useWindowDimensions
  } from 'react-native';

  const Paginator=({data,scrollx}) =>{

    const {width}= useWindowDimensions()

    useEffect(()=>{

      console.log("vvvv="+JSON.stringify(scrollx))
    },[scrollx])
  
  return (
    <View style={{flexDirection:"row",marginTop:3, height:20,justifyContent:"center"}}>
        {
            data.map((_,i)=>{
              

                const inputRange=[(i-1)*width,i*width,(i+1)*width];

                const dotWidth=scrollx.interpolate({inputRange,
                    outputRange:[10,25,10],
                    extrapolate: 'clamp'


                });
                const opacity=scrollx.interpolate({inputRange,
                    outputRange:[0.3,1,0.3],
                    extrapolate: 'clamp',
                  


                });
     

               



                // return <Animated.View  style={[styles.dotActive,{width:dotWidth,opacity}]} key={i.toString()}
                return <Animated.View  style={[true ? styles.dotActive : styles.dot,{width:dotWidth,opacity}]} key={i.toString()}
                />
            })
        }
      
    </View>
  )
}

const styles = StyleSheet.create({

dotActive: {
    height:10,
        borderRadius:5,
        backgroundColor:"#098DD4",
        marginHorizontal:8
},
    dot: {
        height:10,
        borderRadius:5,
        backgroundColor:"black",
        marginHorizontal:8
    }
    
  
  
  
  });

export default Paginator;
