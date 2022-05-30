import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  StatusBar,
  Text,
  SafeAreaView,Image
} from 'react-native';

const SettingsScreen = ({ route, navigation }) => {
  return (
    <>
    <StatusBar hidden={false} barStyle= 'light-content' backgroundColor="#0076B5" />
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1,backgroundColor:"#fff" }}>
      <View style={{ flexDirection: "row", width: "100%", backgroundColor: "#FAFAFA", height: 60, alignItems: "center" }}>
                        <TouchableOpacity onPress={() => { navigation.openDrawer() }}><Image
                            source={require('../assest/menu.png')}
                            style={{ height: 15, width: 15, marginStart: 20 }}
                        /></TouchableOpacity>


                        <Image
                            source={require('../assest/header_ic.png')}
                            style={{ height: 30, width: 100, marginStart: 20 }}
                        />
                        <View style={{flex:1}}></View>
                        <Image
                            source={require('../assest/user_header.png')}
                            style={{ height: 35, width: 35,marginEnd:15 }}
                        />
                         <Image
                            source={require('../assest/buged.png')}
                            style={{ height: 35, width: 35,marginEnd:15 }}
                        />

                        <Image
                            source={require('../assest/buged.png')}
                            style={{ height: 35, width: 35,marginEnd:15 }}
                        />
                    </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
        </View>
      </View>
    </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
export default SettingsScreen;