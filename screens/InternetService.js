import React, { Component } from 'react';
import MyServiceCart from './MyServiceCart';
import {
    KeyboardAvoidingView, SafeAreaView, Button, View, Image, StatusBar, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, TextInput
} from "react-native";

const DATA = [
    {
        id: 1,
        name: "Jorge Rau",
        empty:false,
        image:'https://www.apple.com/newsroom/images/product/os/ios/standard/Apple_ios14-app-library-screen_06222020_inline.jpg.large.jpg'
    },
    {
        id: 2,
        name: "Rohan",
        empty:false,
        image:'https://www.apple.com/newsroom/images/product/os/ios/standard/Apple_ios14-app-library-screen_06222020_inline.jpg.large.jpg'
    },
    {
        id: 3,
        name: "Zahan",
        empty:false,
        image:'https://www.apple.com/newsroom/images/product/os/ios/standard/Apple_ios14-app-library-screen_06222020_inline.jpg.large.jpg'
    },
];

export default class InternetService extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount = async () => {
    }

    render() {
        const { navigation } = this.props;
        return (
            <>
            <StatusBar hidden={false} barStyle= 'light-content' backgroundColor="#0076B5" />
            <SafeAreaView style={styles.container}>
                <View style={styles.parentView}>
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
                            source={require('../assest/sreach.png')}
                            style={{ height: 35, width: 35,marginEnd:15 }}
                        />
                         <TouchableOpacity onPress={() => { navigation.navigate("Wishlist",{screen:"EditProfile"})}}><Image
                            source={require('../assest/user_header.png')}
                            style={{ height: 35, width: 35,marginEnd:15 }}
                        /></TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => { navigation.navigate("MyCartScreen")}}><Image
                            source={require('../assest/buged.png')}
                            style={{ height: 35, width: 35,marginEnd:15 }}
                        /></TouchableOpacity>
                    </View>
                    <View style={styles.innerView}>
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>

                        <View style={{alignItems:"center"}}>
                            <View style={styles.selectRoundedShap}>
                                <Image
                                    source={require('../assest/unselected_home.png')}
                                    style={{ height: 20, width: 20}}
                                />
                                
                            </View>
                            <Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 14,marginTop:10 }}>Phone</Text>
                        </View>

                        <View style={{alignItems:"center"}}>
                            <View style={styles.unselectRoundedShap}>
                                <Image
                                    source={require('../assest/selectedboardband.png')}
                                    style={{ height: 20, width: 20}}
                                />
                                
                            </View>
                            <Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 14,marginTop:10 }}>Broadband</Text>
                        </View>

                        <View style={{alignItems:"center"}}>
                            <View style={styles.unselectRoundedShap}>
                                <Image
                                    source={require('../assest/select_fiber.png')}
                                    style={{ height: 20, width: 20}}
                                />
                                
                            </View>
                            <Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 14,marginTop:10 }}>Fiber</Text>
                        </View>

                        <View style={{alignItems:"center"}}>
                            <View style={styles.unselectRoundedShap}>
                                <Image
                                    source={require('../assest/selected_monitor.png')}
                                    style={{ height: 20, width: 20}}
                                />
                                
                            </View>
                            <Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 14,marginTop:10 }}>Television</Text>
                        </View>


                    </View>
                    
                    </View>

                    <FlatList style={{marginTop:10}}
                    data={DATA}
                    renderItem={({ item }) =>MyServiceCart(item)}
                    keyExtractor={(item) => item.uid}
                />
                </View>
            </SafeAreaView>
            </>
        )
    }


}

const styles = StyleSheet.create({
    parentView: {
        flex: 1,
        backgroundColor: 'white'
    },
    innerView: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 40
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    selectRoundedShap: {
        width: 50,
        height: 50,
        borderRadius: 100 / 2,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: '#098DD4'
    },
    unselectRoundedShap: {
        width: 50,
        height: 50,
        borderRadius: 100/ 2,
        borderWidth:1,
        borderColor:"#0000001A",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: '#fff'
    }




});