import React, { Component } from 'react';
import {
    View,Image,StyleSheet
} from "react-native";

export default class Splash extends Component {

    constructor(props) {
        super(props);
        // setTimeOut(()=>{
        //     this.props.navigation.navigate("SignIn")
        // },5000)

        const a = setTimeout(() => {

            this.props.navigation.navigate('SignIn')
      
          }, 1000);
    
    }


    render() {
        return (
            <View style={styles.parentView}>
                 <Image style={styles.image}
                   source={require('../assest/splash.png')}
                   />
   
            </View>
        )
    }

 
}

const styles = StyleSheet.create({
    parentView:{
        backgroundColor:'white',
        height:"100%",
        alignItems:"center",
        justifyContent:"center",
        paddingVertical:40
    },
    
    image:{
        height:100,
        width:"100%",
        marginHorizontal:20


    },
    
  });