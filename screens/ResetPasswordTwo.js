import React, { useRef, useState, useEffect } from 'react';
import {
    KeyboardAvoidingView, SafeAreaView, Modal, Button, Pressable,View, Image, Alert, StatusBar, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, TextInput
} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo'
import ActivityLoader from './ActivityLoader'
import AsyncStorage  from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import './langauge/i18n';

const ResetPasswordTwo = ({ navigation, route }) => {

    const firstInput = useRef();
    let value = "";
    const secondInput = useRef();
    const thirdInput = useRef();
    const fourthInput = useRef();
    const [isLoading, setIsLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [netInfo, setNetInfo] = useState('');
    const [otp, setOtp] = useState({ 1: '', 2: '', 3: '', 4: '' })
    const {t, i18n} = useTranslation();
  
    const [currentLanguage,setLanguage] =useState('en');

    const { email } = route.params

    useFocusEffect(
        React.useCallback(() => {
            getSelectedLangauge()
    
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



    const getSelectedLangauge=async()=>{

        const langauge = await AsyncStorage.getItem("langauge");
          
        if(langauge!=null)
        {
            changeLanguage(langauge)
        }else{
            changeLanguage("en") 
        }

    }


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


    const checkOtp = () => {
        if (otp[1] == '' || otp[2] == '' || otp[3] == '' || otp[4] == '') {
            showMessage()
            return
        }
        NetInfo.fetch().then((state) => {

            if (state.isConnected) {

                setIsLoading(true)
                value = otp[1] + "" + otp[2] + "" + otp[3] + "" + otp[4]
                console.log(value)
                const data = { email: email, otp: value }
                console.log(JSON.stringify(data))
                fetch("http://50.28.104.48:3003/api/user/checkOtpisVailid", {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then((result) => {

                    result.json().then((res) => {
                        setOtp({ 1: '', 2: '', 3: '', 4: '' })
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





    const forgotPassword = () => {
        NetInfo.fetch().then((state) => {

            if (state.isConnected) {

                setIsLoading(true)
                const data = { email: email }
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
                        if (res.code == 200) {

                            setModalVisible(true)
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
        // setModalVisible(true)
         Alert.alert("Success", msg, [
        { text: 'Okay', onPress: () => {navigation.navigate('CreatePassword',{email:email,otp:value})} }
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
    <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
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

                        <Text style={styles.headerText}>{t('Verify Your Email Address')}</Text>

                        <Text style={styles.paragraph}>
                        {t('Please Enter Code')}{" "}
                            <Text style={styles.highlight}>{email}</Text>
                        </Text>


                       
                        <View style={styles.optContainer}>

                            <View style={styles.otpBox}>
                                <TextInput style={styles.otpText} keyboardType="number-pad" maxLength={1}
                                    ref={firstInput}
                                    onChangeText={(text) => {
                                        setOtp({ ...otp, 1: text })
                                        text && secondInput.current.focus()
                                    }}
                                />

                            </View>

                            <View style={styles.otpBox}>
                                <TextInput style={styles.otpText} keyboardType="number-pad" maxLength={1}
                                    ref={secondInput}
                                    onChangeText={(text) => {
                                        setOtp({ ...otp, 2: text })
                                        text ? thirdInput.current.focus() : firstInput.current.focus()
                                    }}
                                />

                            </View>

                            <View style={styles.otpBox}>
                                <TextInput style={styles.otpText} keyboardType="number-pad" maxLength={1}
                                    ref={thirdInput}
                                    onChangeText={(text) => {
                                        setOtp({ ...otp, 3: text })
                                        text ? fourthInput.current.focus() : secondInput.current.focus()
                                    }}
                                />

                            </View>

                            <View style={styles.otpBox}>
                                <TextInput style={styles.otpText} keyboardType="number-pad" maxLength={1}
                                    ref={fourthInput}
                                    onChangeText={(text) => {
                                        setOtp({ ...otp, 4: text })
                                        !text && thirdInput.current.focus()
                                    }} />

                            </View>


                        </View>


                        <TouchableOpacity onPress={() => { forgotPassword() }}><Text style={styles.resendTxt}>
                        {t('Don receive the code')}{" "}
                            <Text style={styles.highlight}>{t('RESEND')}</Text>
                        </Text></TouchableOpacity>




                        <TouchableOpacity onPress={() => checkOtp()}><Text style={styles.button}>{t('Confirm')}</Text></TouchableOpacity>

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

                                            <TouchableOpacity onPress={() => { setModalVisible(false)}}><Image
                                                source={require('../assest/cross.png')}
                                                style={styles.iconCross}
                                            /></TouchableOpacity>
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
                                                    // goToForword()
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
        </KeyboardAvoidingView>
    </SafeAreaView>
    </>

)



}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white'

    },
    parentView: {
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
    optContainer: {
        marginTop: 20,
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",

    },

    
    otpBox: {
        borderRadius: 5,
        borderColor: "#098DD4",
        borderWidth: 1,
    },
    otpText: {
        fontSize: 18,
        color: "black",
        padding: 0,
        textAlign: "center",
        paddingHorizontal: 18,
        paddingVertical: 10,
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
        left: 140,
        bottom: 1,
        width: 15,
        height: 15
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
        lineHeight: 25,
        fontSize: 14,
        fontWeight: "normal",
        color: "#707070",
    },

    resendTxt: {
        marginTop: 20,
        fontSize: 14,
        textAlign: "center",
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

export default ResetPasswordTwo