import React, { useState, useEffect } from 'react';
import { Checkbox } from 'react-native-paper';
import {
    KeyboardAvoidingView, SafeAreaView,Platform, Button, View, Image, StatusBar, StyleSheet, Alert, Text, ActivityIndicator, TouchableOpacity, ScrollView, FlatList, TextInput
} from "react-native";
import CheckBox from '@react-native-community/checkbox';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ActivityLoader from './ActivityLoader'
import NetInfo from '@react-native-community/netinfo'
import { useFocusEffect } from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import './langauge/i18n';


const SignUpScreen = ({ navigation }) => {


    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [netInfo, setNetInfo] = useState('');
    const [error, setError] = useState({
        errorFirstName: 'Please enter full name',
        errorLastName: 'Please enter full name',
        errorEmail: 'Please enter email',
        errorCorrectEmail: 'Please enter correct email',
        errorPass: 'Please enter Password',
        errorCorrectPass: 'Please enter Confirm Password',
        errorpassMatch: 'Password and Confirm Password do not match',

    })

    const [name, setName] = useState('')
    const [emails, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [passCon, setPassCon] = useState('')
    const [checked, setChecked] = React.useState(false);

    const [isFirstName, setIsFirstName] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [isLastName, setIsLastName] = useState(false)

    const [isEmailEmty, setIsEmailEmty] = useState(false)

    const [isEmailCorrect, setIsEmailCorrect] = useState(false)

    const [isPassword, setIsPassword] = useState(false)

    const [isConfirmPassword, setIsConfirmPassword] = useState(false)
    const [isChecked, setIsChecked] = useState(false)

    const [isConfirmPassCorrect, setIsConfirmPassCorrect] = useState(false)


    const {t, i18n} = useTranslation();
  
    const [currentLanguage,setLanguage] =useState('en');
    
    useFocusEffect(
        React.useCallback(() => {
        changeLanguage(currentLanguage)
    
          return () => {
          };
        }, [])
      );

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

    const changeLanguage = value => {
        i18n
          .changeLanguage(value)
          .then(() => setLanguage(value))
          .catch(err => console.log(err));
      };


    if (isLoading) {
        return (
            <ActivityLoader />
        )


    }

    const submit = () => {

        NetInfo.fetch().then((state) => {

            if (state.isConnected) {
                const isName = handleValidUser(name)
                const isEmail = handleValidEmail(emails)
                const isPass = handleValidPassword(pass)
                const isConfrim = handleValidConfirmPass(passCon)

                if (isName || isEmail || isPass || isConfrim) {

                    return
                }
                setIsLoading(true)
                let data = { first_name: name, last_name: name, email: emails, password: pass }
                fetch("http://50.28.104.48:3003/api/user/userRegistration", {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then((result) => {

                    result.json().then((res) => {
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

    const success = (msg) => {
        Alert.alert("Success", msg, [
            { text: 'Okay', onPress: () => { navigation.goBack() } }
        ])
    }

    const failure = (msg) => {
        Alert.alert("Failure", msg, [
            { text: 'Okay' }
        ])

    }

    const checkInternet = () => {
        Alert.alert("Alert", "Please check internet", [
            { text: 'Okay' }
        ])

    }

    const handleValidUser = (val) => {

        if (val.trim().length > 0) {
            console.log("name=" + val)
            setIsFirstName(false)
            setIsLastName(false)
            return false
        } else {
            setIsFirstName(true)
            setIsLastName(true)
            return true
        }

    }

    const handleValidEmail = (val) => {
        if (val.trim().length > 0) {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            if (reg.test(val) === true) {
                console.log("email=" + val)
                setIsEmailCorrect(false)
                setIsEmailEmty(false)
                return false
            } else {
                setIsEmailCorrect(true)
                setIsEmailEmty(false)
                return true
            }

            setIsEmailEmty(false)
            return false
        } else {
            setIsEmailEmty(true)
            return true
        }

    }

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
            if (val == pass) {
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
    return (
        <>
        <StatusBar hidden={false} barStyle= 'light-content' backgroundColor="#0076B5" />
                <View style={styles.parentView}>
                    <ScrollView>
                        <View style={styles.scrollView}>


                            <Text style={styles.headerText}>{t('Sign Up')}</Text>

                            <Text style={styles.subHeaderText}>{t('Name')}</Text>


                            <View style={styles.textBackground}>
                                <TextInput style={styles.text}
                                    placeholder="Please enter full name"
                                    value={name}
                                    onChangeText={text => setName(text)}
                                ></TextInput>

                                <Image style={styles.image}
                                    source={require('../assest/user.png')}
                                />

                            </View>

                            {isFirstName && <Text style={styles.errorText}>{t('Please enter full name')}</Text>}

                            <Text style={styles.subHeaderText}>{t('Email Address')}</Text>


                            <View style={styles.textBackground}>
                                <TextInput style={styles.text} placeholder="Please enter email"
                                    value={emails}
                                    autoCapitalize='none'
                                    onChangeText={text => setEmail(text)}></TextInput>

                                <Image style={styles.image}
                                    source={require('../assest/email_ic.png')}
                                />

                            </View>
                            {isEmailEmty && <Text style={styles.errorText}>{t('Please enter email')}</Text>}
                            {isEmailCorrect && <Text style={styles.errorText}>{t('Please enter correct email')}</Text>}

                            <Text style={styles.subHeaderText} >{t('Password')}</Text>


                            <View style={styles.textBackground}>
                                <TextInput secureTextEntry={true} style={styles.text} placeholder="Please enter password"
                                    value={pass}
                                    onChangeText={text => setPass(text)}></TextInput>

                                <Image style={styles.image}
                                    source={require('../assest/lock_icon.png')}
                                />

                            </View>
                            {isPassword && <Text style={styles.errorText}>{t('Please enter Password')}</Text>}

                            <Text style={styles.subHeaderText}>{t('Confirm Password')}</Text>



                            <View style={styles.textBackground}>
                                <TextInput secureTextEntry={true} style={styles.text} placeholder="Please enter confirm password"
                                    value={passCon}
                                    onChangeText={text => setPassCon(text)}></TextInput>

                                <Image style={styles.image}
                                    source={require('../assest/lock_icon.png')}
                                />

                            </View>
                            {isConfirmPassword && <Text style={styles.errorText}>{t('Please enter Confirm Password')}</Text>}
                            {isConfirmPassCorrect && <Text style={styles.errorText}>{t('Password and Confirm')}</Text>}

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
                                <CheckBox
                                    disabled={false}
                                    value={toggleCheckBox}
                                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                />
                                <Text style={styles.paragraph}>
                                {t('I Agree with')}{" "}
                                    <Text style={styles.highlight}>{t('Privacy')}{" "}<Text style={styles.paragraph}>{t('and')}{" "}<Text style={styles.highlight}>{t('Policy')}</Text></Text></Text>
                                </Text>
                            </View>

                            <TouchableOpacity onPress={() => { submit() }}><Text style={styles.button}>{t('Confirm')}</Text></TouchableOpacity>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                <View style={{ flex: 1, height: 1, backgroundColor: '#707070', marginTop: 30, marginEnd: 10 }} />
                                <View>
                                    <Text style={{ textAlign: 'center', flex: 1, color: "#707070", fontSize: 14, fontWeight: "normal", marginTop: 25 }}>{t('Or continue with')}</Text>
                                </View>
                                <View style={{ flex: 1, height: 1, backgroundColor: '#707070', marginTop: 30, marginStart: 10 }} />

                            </View>


                            <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", width: "100%", marginTop: 20 }}>


                                <Image style={{ height: 60, width: 60, marginEnd: 20 }}

                                    source={require('../assest/facebook.png')}
                                />

                                <Image style={styles.socialImage}
                                    source={require('../assest/twitter.png')}
                                />

                                <Image style={{ height: 60, width: 60, marginStart: 20 }}
                                    source={require('../assest/google.png')}
                                />

                            </View>
                            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                <Text style={[styles.paragraph, { marginTop: 20 }]}>
                                {t('Already have')}{" "}
                                    <Text style={styles.highlight}>{t('Sing In')}{" "}</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>


                    </ScrollView>
                </View>
                </>
        
    )



}

const styles = StyleSheet.create({
    parentView: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 40
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    docker: {
        flex: 1,
        alignItems: 'center'
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
    errorText: {
        fontSize: 11,
        fontWeight: "bold",
        marginTop: 2,
        color: 'red'
    },
    box2: {
        justifyContent: 'space-evenly',
        height: '50%',
        paddingHorizontal: 30
    }
});

export default SignUpScreen
