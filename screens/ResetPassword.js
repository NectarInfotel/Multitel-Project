import React, { useState,useEffect } from 'react';
import {
    KeyboardAvoidingView, Button, View,Modal, Image,Alert, StatusBar,Pressable, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, TextInput
} from "react-native";
import NetInfo from '@react-native-community/netinfo'
import ActivityLoader from './ActivityLoader'
import { useFocusEffect } from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import './langauge/i18n';

const ResetPassword = ({ navigation }) =>  {

    const [netInfo, setNetInfo] = useState('');
    let cloneEmail="";
    
    const [error, setError] = useState({
        errorEmail: 'Please enter email',
        errorCorrectEmail: 'Please enter correct email'

    })
    const [emails, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [isEmailEmty, setIsEmailEmty] = useState(false)
    const [isEmailCorrect, setIsEmailCorrect] = useState(false)

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

    if (isLoading) {
        return (
            <ActivityLoader />
        )


    }

    const checkInternet = () => {
        Alert.alert("Alert", "Please check internet", [
            { text: 'Okay' }
        ])

    }

    const forgotPassword =() => {
        NetInfo.fetch().then((state) => {

            if (state.isConnected) {
           
              const isEmail=handleValidEmail(emails)
             
           
                if (isEmail) {
                   
                    return
                }
                setIsLoading(true)
               const data={email:emails}
               console.log(data)
                fetch("http://50.28.104.48:3003/api/user/forgotPassword", {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then((result) => {

                    result.json().then((res) => {
                        setIsLoading(false)
                        cloneEmail=emails
                        // setEmail("")
                        if (res.code == 200) {
                         
                            success(res.message)
                        } else {
                          
                            failure(res.message)
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

        setModalVisible(true)
        // Alert.alert("Success", msg, [
        //     { text: 'Okay', onPress: () => {navigation.navigate('ResetPasswordTwo',{email:cloneEmail})} }
        // ])
    }

    const goToForword=()=>{
        console.log("Email=="+emails)
        navigation.navigate('ResetPasswordTwo',{email:emails})
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
                <ScrollView style={{backgroundColor:"white"}}>
                    <View style={styles.scrollView}>

                        <View style={{ alignItems: "center", justifyContent: "center", paddingVertical: 60,paddingHorizontal:20 }}>
                            <Image style={{ height: 80, width: "100%", }}
                                source={require('../assest/splash.png')}
                            />

                        </View>

                        <View style={{
                            paddingHorizontal: 20,
                            paddingVertical: 40
                        }}>


                        <Text style={styles.headerText}>{t('Reset Password')}</Text>

                        <Text style={[styles.paragraph,{lineHeight: 20}]}>
                        {t('We just need your registered')}{" "}
                            <Text style={styles.highlight}>{t('Email Address')}{" "}<Text style={styles.paragraph}>{t('to send verification code')}</Text></Text>
                        </Text>



                        <View style={styles.textBackground}>
                            <TextInput style={styles.text}
                             placeholder="Please enter email"
                             value={emails}
                             autoCapitalize='none'
                             onChangeText={text => setEmail(text)}
                            ></TextInput>

                            <Image style={styles.image}
                                source={require('../assest/email_ic.png')}
                            />

                        </View>
                        {isEmailEmty && <Text style={styles.errorText}>{t('Please enter email')}</Text>}
                        {isEmailCorrect && <Text style={styles.errorText}>{t('Please enter correct email')}</Text>}

                        <TouchableOpacity onPress={() => forgotPassword()}><Text style={styles.button}>{t('Send')}</Text></TouchableOpacity>

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(false);
                                
                            }}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={[styles.header]}>
                                        <View style={{ paddingVertical: 20, backgroundColor: "#0076B5", alignItems: "center" }} >

                                            <Pressable onPress={() => { setModalVisible(false)}}><Image
                                                source={require('../assest/cross.png')}
                                                style={styles.iconCross}
                                            /></Pressable>
                                            <Text style={[styles.modalText, { color: '#FFFFFF' }]}>
                                            {t('Resend Verification Code')}
                                            </Text>
                                        </View>

                                        <View style={{ padding: 25 }}>
                                            <Text style={[styles.modalText, { lineHeight: 20, color: "#707070" }]}>
                                            {t('We are sending verification')}{' '}
                                            </Text>
                                            <Pressable
                                                style={[styles.button, styles.buttonClose, { marginTop: 25, backgroundColor: '#0076B5' }]}
                                                onPress={() => {
                                                    goToForword()
                                                    setModalVisible(!modalVisible)
                                                   
                                                    
                                                }
                                                }>
                                                <Text style={styles.textStyle}>{t('Continue')}</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Modal>
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
        backgroundColor: '#fff'
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
    headerText: {
        color: '#1D3557',
        marginTop: 30,
        fontWeight: "bold",
        fontSize: 20
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    iconCross: {
        position: 'absolute',
        left: 125,
        bottom: 1,
        width: 15,
        height: 15,
        padding:5
    },
    buttonOpen: {
        backgroundColor: '"#0076B5"',
    },
    buttonClose: {
        backgroundColor: '"#0076B5"',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        textAlign: 'center',
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
        backgroundColor: '#fff'
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

export default ResetPassword