import React from 'react'
import {
   View,ActivityIndicator,StyleSheet,StatusBar
} from "react-native";

const ActivityLoader = () => {
  return (
    <>
     <StatusBar hidden={false} barStyle= 'light-content' backgroundColor="#0076B5" />
    <View style={styles.container}>
     <ActivityIndicator size="large" color="#00ff00" />  
    </View>
    </>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
        justifyContent: 'center',
        backgroundColor: 'white',
      }
});
export default ActivityLoader
