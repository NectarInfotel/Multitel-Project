import React, { useState, useEffect } from 'react';
import {
    KeyboardAvoidingView, Button, View, Image, StatusBar,Alert, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, TextInput
} from "react-native";

// import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NetInfo from '@react-native-community/netinfo'
import ActivityLoader from './ActivityLoader'


const CreatePassword = ({ navigation, route }) => {

    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [password, setPassword] = useState('');
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

    const { email } = route.params

    const { otp } = route.params


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
            console.log("password=" + val)
            setIsPassword(false)
            return false
        } else {
            console.log("password=" + val)
            setIsPassword(true)
            return true
        }

    }

    const handleValidConfirmPass = (val) => {
        if (val.trim().length > 0) {
            if (val == password) {
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


    const resetPassword = () => {

           
        const isPass = handleValidPassword(password)
        const isConfrim = handleValidConfirmPass(confirmPass)

        if (isPass || isConfrim) {

            return
        }
        NetInfo.fetch().then((state) => {

            if (state.isConnected) {

                setIsLoading(true)
                const data = {email: email, otp: otp, password: password }
                console.log(data)
                fetch("http://50.28.104.48:3003/api/user/resetPassword", {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then((result) => {

                    result.json().then((res) => {
                        setPassword("")
                        setConfirmPass("")
                        setIsLoading(false)
                        if (res.code == 200) {

                            success(res.message)
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


    const showMessage = () => {
        Alert.alert("Alert", "Please insert opt", [
            { text: 'Okay' }
        ])

    }

    const checkInternet = () => {
        Alert.alert("Alert", "Please check internet", [
            { text: 'Okay' }
        ])

    }

    const success = (msg) => {
        Alert.alert("Success", msg, [
            { text: 'Okay', onPress: () => { navigation.navigate('SignIn') } }
        ])
    }

    const failure = (msg) => {
        Alert.alert("Failure", msg, [
            { text: 'Okay' }
        ])

    }

    return (
        <>
        <StatusBar hidden={false} barStyle= 'light-content' backgroundColor="#0076B5" />
        <View style={styles.parentView}>
            <ScrollView>
                <View style={styles.scrollView}>

                    <View style={{ alignItems: "center", justifyContent: "center", paddingVertical: 60,paddingHorizontal:20, backgroundColor: "#FAFAFA" }}>
                        <Image style={{ height: 80, width: "100%", }}
                            source={require('../assest/splash.png')}
                        />

                    </View>

                    <View style={{
                            paddingHorizontal: 20,
                            paddingVertical: 40
                        }}>


                    <Text style={styles.headerText}>Create New Password</Text>

                    <Text style={styles.paragraph}>
                        Your New Password Must be Different from Previously Used Password.
                    </Text>



                    <Text style={styles.subHeaderText}>New Password</Text>


                    <View style={styles.textBackground}>
                        <TextInput secureTextEntry={!passwordVisibility} style={styles.text}
                            placeholder="Please enter password"
                            value={password}
                            onChangeText={(text) => { setPassword(text) }}
                        ></TextInput>

                        <TouchableOpacity onPress={() => { setPasswordVisibility(!passwordVisibility) }}>
                            {
                                passwordVisibility ? <Image style={styles.image}
                                    source={require('../assest/eye_icon.png')}
                                /> : <Image style={styles.image}
                                    source={require('../assest/eye_icon.png')}
                                />
                            }



                        </TouchableOpacity>
                    </View>
                    {isPassword && <Text style={styles.errorText}>{error.errorPass}</Text>}

                    <Text style={styles.subHeaderText}>Confirm Password</Text>


                    <View style={styles.textBackground}>
                        <TextInput secureTextEntry={true} style={styles.text}
                            placeholder="Please enter confirm password"
                            value={confirmPass}
                            onChangeText={(text) => { setConfirmPass(text) }}
                        ></TextInput>



                    </View>
                    {isConfirmPassword && <Text style={styles.errorText}>{error.errorCorrectPass}</Text>}
                    {isConfirmPassCorrect && <Text style={styles.errorText}>{error.errorpassMatch}</Text>}

                    <TouchableOpacity onPress={() => resetPassword()}><Text style={styles.button}>Reset Password</Text></TouchableOpacity>

                    </View>
                </View>


            </ScrollView>
        </View>
        </>
    )
}




const styles = StyleSheet.create({
    parentView: {
        flex:1,
        backgroundColor: 'white'
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
        marginTop: 25,
        borderRadius: 5,
        alignItems: "center",
        textAlign: "center",
        textAlignVertical: "center"
    },
    buttonText: {
        color: "white"
    },
    errorText: {
        fontSize: 11,
        fontWeight: "bold",
        marginTop: 2,
        color: 'red'
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
        fontWeight: "Regular",
        marginTop: 20,
        color: '#707070'
    },
    box2: {
        justifyContent: 'space-evenly',
        height: '50%',
        paddingHorizontal: 30
    }
});

export default CreatePassword