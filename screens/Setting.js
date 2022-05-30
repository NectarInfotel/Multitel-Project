import React, { useState,useEffect } from 'react';
import {
    KeyboardAvoidingView, Button, View, Switch,Alert, SafeAreaView, Image, StatusBar, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, TextInput
} from "react-native";

import NetInfo from '@react-native-community/netinfo'
import ActivityLoader from './ActivityLoader'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Setting = ({ navigation }) => {
    const [isFirstView, setIsFirstView] = useState(false)
    const [isSecondView, setIsSecondView] = useState(false)
    const [isThirdView, setIsThirdView] = useState(false)

    const [isEnabled, setIsEnabled] = useState(false);

    const [newPassword, setNewPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const [isPassword, setIsPassword] = useState(false)

    const [isConfirmPassword, setIsConfirmPassword] = useState(false)
    const [isConfirmPassCorrect, setIsConfirmPassCorrect] = useState(false)

    const [error, setError] = useState({
        errorPass: 'Please enter Password',
        errorCorrectPass: 'Please enter Confirm Password',
        errorpassMatch: 'Password and Confirm Password do not match',

    })

    const [isLoading, setIsLoading] = useState(false)
    const [netInfo, setNetInfo] = useState('');

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);



    useEffect(() => {
        // Subscribe to network state updates
        const unsubscribe = NetInfo.addEventListener((state) => {
            setNetInfo(
                `Connection type: ${state.type}
            Is connected?: ${state.isConnected}
            IP Address: ${state.details.ipAddress}`,
            );
        });

        return () => {
            // Unsubscribe to network state updates
            unsubscribe();
        };
    }, []);


    const handleValidPassword = (val) => {
        if (val.trim().length > 0) {
            setIsPassword(false)
            return false
        } else {
            setIsPassword(true)
            return true
        }

    }

    const handleValidConfirmPass = (val) => {
        if (val.trim().length > 0) {
            if (val == newPassword) {
                setIsConfirmPassCorrect(false)
                setIsConfirmPassword(false)
                console.log("ConfirmPass=" + val)
                return false
            } else {
                console.log("ConfirmPass=" + val)
                setIsConfirmPassCorrect(true)
                setIsConfirmPassword(false)
                return true
            }

            setIsConfirmPassword(false)
            return false
        } else {
            setIsConfirmPassword(true)
            return true
        }

    }


    if (isLoading) {
        return (
            <ActivityLoader />
        )


    }

    const changePassword = async() => {


        const isPass = handleValidPassword(newPassword)
        const isConfrim = handleValidConfirmPass(confirmPass)

        if (isPass || isConfrim) {

            return
        }
        const token = await AsyncStorage.getItem("access_token")
        const email =await AsyncStorage.getItem("email")
        const password =await AsyncStorage.getItem("password")
        NetInfo.fetch().then((state) => {

            if (state.isConnected) {

               
                setIsLoading(true)
                const data = { email: email, oldPassword: password, password: newPassword }
                console.log(data)
                fetch("http://50.28.104.48:3003/api/user/changePassword", {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify(data)
                }).then((result) => {

                    result.json().then((res) => {
                        setConfirmPass("")
                        setIsLoading(false)
                        if (res.code == 200) {

                            success(res.massage)
                        } else {

                            failure(res.massage)
                        }
                        console.log(res)
                    })

                })
            } else {
                checkInternet()
            }



        });


    }

    const checkInternet = () => {
        Alert.alert("Alert", "Please check internet", [
            { text: 'Okay' }
        ])

    }

    const success = (msg) => {
        AsyncStorage.setItem("password",newPassword)
        setNewPassword('')
        setConfirmPass('')
        Alert.alert("Success", msg, [
            { text: 'Okay', onPress: () => { navigation.goBack() } }
        ])
    }

    const failure = (msg) => {
        setNewPassword('')
        setConfirmPass('')
        Alert.alert("Failure", msg, [
            { text: 'Okay' }
        ])

    }

    return (
        <>
        <StatusBar hidden={false} barStyle= 'light-content' backgroundColor="#0076B5" />
        <SafeAreaView style={styles.container}>
            <View style={styles.parentView}>
                <View style={{ flexDirection: "row", width: "100%", backgroundColor: "#FAFAFA", height: 60, alignItems: "center" }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}><Image
                        source={require('../assest/left_arrow.png')}
                        style={{ height: 15, width: 15, marginStart: 20 }}
                    /></TouchableOpacity>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: '#1D3557',
                        marginStart: 10,
                        flex: 1
                    }} >Settings</Text>


                </View>

                {/* <ScrollView> */}
                    <View style={styles.scrollView}>

                        <View style={{height:"80%"}}>
                        
                        <TouchableOpacity onPress={() => { 
                            setIsSecondView(false)
                            setIsFirstView(!isFirstView) }}>
                            <View>
                                <View style={{ width: "100%", backgroundColor: "#EEF3F7", height: 1, marginTop: 10 }}></View>
                                <View style={styles.subHeaderView} >

                                    <Text style={{ color: "#707070", fontSize: 12, fontWeight: "normal", flex: 1 }}>Change Password</Text>
                                    {!isFirstView ? <Image style={{ width: 10, height: 10, marginRight: 10 }}
                                        source={require('../assest/right_arrow.png')}
                                    /> : <Image style={{ width: 10, height: 10, marginRight: 10 }}
                                        source={require('../assest/down_arrow.png')} />}


                                </View>
                                {!isFirstView ?
                                    <View style={{ width: "100%", backgroundColor: "#EEF3F7", height: 1, marginTop: 10 }}></View>
                                    : null}

                            </View>
                        </TouchableOpacity>


                        {isFirstView ? <View>
                            <View>
                                <Text style={{ color: "#707070", fontSize: 12, fontWeight: "normal", flex: 1, marginTop: 20 }}>Password</Text></View>

                            <View style={styles.textBackground}>
                                <TextInput secureTextEntry={true} style={styles.text}
                                    placeholder="Please enter password"
                                    value={newPassword}
                                    onChangeText={(text) => { setNewPassword(text) }}
                                ></TextInput>

                                <Image style={styles.image}
                                    source={require('../assest/lock_icon.png')}
                                />

                            </View>
                            {isPassword && <Text style={styles.errorText}>{error.errorPass}</Text>}

                            <Text style={{ color: "#707070", fontSize: 12, fontWeight: "normal", flex: 1, marginTop: 20 }}>Confirm Password</Text>


                            <View style={styles.textBackground}>
                                <TextInput secureTextEntry={true} style={styles.text}
                                    placeholder="Please enter confirm password"
                                    value={confirmPass}
                                    onChangeText={(text) => { setConfirmPass(text) }}
                                ></TextInput>

                                <Image style={styles.image}
                                    source={require('../assest/lock_icon.png')}
                                />

                            </View>
                            {isConfirmPassword && <Text style={styles.errorText}>{error.errorCorrectPass}</Text>}
                            {isConfirmPassCorrect && <Text style={styles.errorText}>{error.errorpassMatch}</Text>}
                        </View> : null}

                        <TouchableOpacity onPress={() => {
                            setIsFirstView(false)
                            setIsSecondView(!isSecondView) }}>
                            <View>
                                <View style={{ width: "100%", backgroundColor: "#EEF3F7", height: 1, marginTop: 10 }}></View>
                                <View style={styles.subHeaderView} >

                                    <Text style={{ color: "#707070", fontSize: 12, fontWeight: "normal", flex: 1 }}>Account Activity</Text>
                                    {!isSecondView ? <Image style={{ width: 10, height: 10, marginRight: 10 }}
                                        source={require('../assest/right_arrow.png')}
                                    /> : <Image style={{ width: 10, height: 10, marginRight: 10 }}
                                        source={require('../assest/down_arrow.png')} />}


                                </View>
                                {!isSecondView ?
                                    <View style={{ width: "100%", backgroundColor: "#EEF3F7", height: 1, marginTop: 10 }}></View>
                                    : null}

                            </View>
                        </TouchableOpacity>


                        {isSecondView ? <View>
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>

                                <Text style={{ color: "#707070", fontSize: 12, fontWeight: "normal", flex: 1 }}>Push Notification</Text>

                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                />

                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>

                                <Text style={{ color: "#707070", fontSize: 12, fontWeight: "normal", flex: 1 }}>Delete Account</Text>

                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                />

                            </View>
                        </View> : null}
                        </View>

                        <TouchableOpacity onPress={() => changePassword()}><Text style={styles.button}>Save</Text></TouchableOpacity>
                    </View>


                {/* </ScrollView> */}
            </View>
        </SafeAreaView>
        </>
    )



}

const styles = StyleSheet.create({
    parentView: {
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    subHeaderView: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15

    },
    errorText: {
        fontSize: 11,
        fontWeight: "bold",
        marginTop: 2,
        color: 'red'
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
    button: {
        backgroundColor: "#0076B5",
        color: "white",
        borderRadius: 50,
        width: "100%",
        justifyContent: "center",
        height: 50,
        marginTop: 20,
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
        fontWeight: "bold",
        fontSize: 20
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
        backgroundColor: 'white',
        paddingHorizontal: 20

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
        margin: 24,
        fontSize: 14,
        fontWeight: "normal",
        textAlign: "center",
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

export default Setting