import React, { Component } from 'react';
import {
    KeyboardAvoidingView, Button, View, Image, StatusBar, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, TextInput
} from "react-native";

export default class WelcomeScreen extends Component {

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
            <View style={styles.parentView}>
                <ScrollView>
                    <View style={styles.scrollView}>

                        <View style={{ alignItems: "center", justifyContent: "center", paddingVertical: 70 }}>
                            <Image style={{ height: 300, width: "100%" }}
                                source={require('../assest/welcome.png')}
                            />

                        </View>


                        <Text style={styles.superFastText}>Private. Secure. Super Fast</Text>

                        <Text style={styles.headerText}>The Internet you Deserve</Text>

                        <View style={{ height: 100, width: "100%", marginBottom: 10, marginTop: 30, justifyContent: "center", alignItems: "center" }}>
                            <Image style={{ height: 65, width: "100%" }}
                                source={require('../assest/device.png')}
                            />

                        </View>


                        
                        <TouchableOpacity onPress={()=>navigation.navigate('SignIn')}><Text style={styles.button}>Let's Started</Text></TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}><Text style={styles.paragraph}>
                            By continuing, I agree to the{" "}
                            <Text style={styles.highlight}>terms and conditions</Text>
                        </Text></TouchableOpacity> 

                         

                    </View>


                </ScrollView>
            </View>
            </>
        )
    }


}

const styles = StyleSheet.create({
    parentView: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 40
    },
    textBackground: {

        backgroundColor: '#FFFFFF',
        width: "100%",
        marginTop: 25,
        flexDirection: "row",
        height: 50,
        borderColor: '#EEF3F7',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center"

    },
    button: {
        backgroundColor: "#0076B5",
        color: "white",
        borderRadius: 50,
        width: "100%",
        justifyContent: "center",
        height: 50,
        marginTop: 40,
        borderRadius: 5,
        alignItems: "center",
        textAlign: "center",
        textAlignVertical: "center"
    },
    buttonText: {
        color: "white"
    },
    headerText: {
        color: '#1D3557',
        marginTop: 10,
        fontWeight: "bold",
        fontSize: 20
    },
    superFastText: {
        color: '#707070',
        marginTop: 30,
        fontWeight: "regular",
        fontSize: 14
    },
    image: {
        height: 20,
        width: 20,
        marginEnd: 15,
        justifyContent: "flex-end"
    },
    socialImage: {
        height: 60,
        width: 60,
    },
    scrollView: {
        backgroundColor: 'white'
    },
    text: {
        fontSize: 12,
        marginStart: 10,
        fontWeight: "bold",
        marginEnd: 20,
        flex: 1,
        justifyContent: "flex-start",
        color: '#707070'
    },
    paragraph: {
        marginTop: 20,
        fontSize: 14,
        textAlign:'center',
        fontWeight: "normal",
        color: "#707070",
    },
    highlight: {
        color: "#0076B5",
    },
    password: {
        fontSize: 12,
        marginStart: 10,
        marginEnd: 20,
        flex: 1,
        justifyContent: "flex-start",
        color: '#707070'
    },
    subHeaderText: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 20,
        color: '#707070'
    },
    box2: {
        justifyContent: 'space-evenly',
        height: '50%',
        paddingHorizontal: 30
    }
});