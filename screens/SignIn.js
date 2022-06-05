import React, { useState, useEffect } from 'react';

import {
    KeyboardAvoidingView, Button, View, Image, StatusBar, Alert, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, TextInput,ActivityIndicator
} from "react-native";

// import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ActivityLoader from './ActivityLoader'
import { AuthContext } from './component/context';
import NetInfo from '@react-native-community/netinfo'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import './langauge/i18n';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from 'react-native-google-signin';


const SignIn = ({ navigation }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [gettingLoginStatus, setGettingLoginStatus] = useState(true);
  
    const { signIn } = React.useContext(AuthContext);
    const [netInfo, setNetInfo] = useState('');
    const [error, setError] = useState({
        errorEmail: 'Please enter email',
        errorCorrectEmail: 'Please enter correct email',
        errorPass: 'Please enter Password',

    })

    const [emails, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isEmailEmty, setIsEmailEmty] = useState(false)
    const [isEmailCorrect, setIsEmailCorrect] = useState(false)
    const [isPassword, setIsPassword] = useState(false)

    const {t, i18n} = useTranslation();
  
    const [currentLanguage,setLanguage] =useState('en');
    
    useFocusEffect(
        React.useCallback(() => {
            getSelectedLangauge()
    
          return () => {
          };
        }, [])
      );

    useEffect(() => {
        GoogleSignin.configure({
            // Mandatory method to call before calling signIn()
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            // Repleace with your webClientId generated from Firebase console
            webClientId: '1083533213607-j7hhjqiscm5r8lco6rme3rl7p16tq4p9.apps.googleusercontent.com',
          });
          // Check if user is already signed in
          _isSignedIn();
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


    const _isSignedIn = async () => { console.log("hi")
       const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
          alert('User is already signed in');
          // Set User Info if user is already signed in
          _getCurrentUserInfo();
        } else {
          console.log('Please Login');
        }
        setGettingLoginStatus(false);

      };
    
      const _getCurrentUserInfo = async () => {
        try {
          let info = await GoogleSignin.signInSilently();
          console.log('User Info --> ', info);
          setUserInfo(info);
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_REQUIRED) {
            alert('User has not signed in yet');
            console.log('User has not signed in yet');
          } else {
            alert("Something went wrong. Unable to get user's info");
            console.log("Something went wrong. Unable to get user's info");
          }
        }
      };
      const _signIn = async () => {
        // It will prompt google Signin Widget
        try {
          await GoogleSignin.hasPlayServices({
            // Check if device has Google Play Services installed
            // Always resolves to true on iOS
            showPlayServicesUpdateDialog: true,
          });
          const userInfo = await GoogleSignin.signIn();
          console.log('User Info --> ', userInfo);
          setUserInfo(userInfo);
        } catch (error) {
          console.log('Message', JSON.stringify(error));
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            alert('User Cancelled the Login Flow');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            alert('Signing In');
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            alert('Play Services Not Available or Outdated');
          } else {
            alert(error.message);
          }
        }
      };

  const _signOut = async () => {
    setGettingLoginStatus(true);
    // Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // Removing user Info
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
    setGettingLoginStatus(false);
  };


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




    const login = () => {
        NetInfo.fetch().then((state) => {

            if (state.isConnected) {

                const isEmail = handleValidEmail(emails)
                const isPass = handleValidPassword(pass)

                if (isEmail || isPass) {

                    return
                }
                setIsLoading(true)
                // let data={userName:'kindal@getnada.com',password:'Shubh@1992'}
                let data = { userName: emails, password: pass }
                fetch("http://50.28.104.48:3003/api/user/userlogin", {
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

                            success(res.massage, res)
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

    const success = (msg, res) => {
        console.log("user====" + res.data.userId)
        AsyncStorage.setItem("first_name", res.data.first_name)
        AsyncStorage.setItem("profile_img", res.data.profile_img)
        AsyncStorage.setItem("access_token", res.data.jwtToken)
        AsyncStorage.setItem("email", res.data.email)
        AsyncStorage.setItem("userId", res.data.userId + "")
        AsyncStorage.setItem("password", pass)
        Alert.alert("Success", msg, [
            { text: 'Okay', onPress: () => { signIn("hiii", "12345") } }
        ])
    }

    const failure = (msg) => {
        Alert.alert("Failure", msg, [
            { text: 'Okay' }
        ])

    }



    return (
        <>
            <StatusBar hidden={false} barStyle='light-content' backgroundColor="#0076B5" />
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
                            paddingVertical: 20
                        }}>
                            <Text style={styles.headerText}>{t('Login')}</Text>

                            <View style={styles.textBackground}>
                                <TextInput style={styles.text}
                                    placeholder={t('Please enter email')}
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


                            <View style={styles.textBackground}>
                                <TextInput secureTextEntry={true} style={styles.text} placeholder={t('Please enter Password')}
                                    value={pass}
                                    onChangeText={text => setPass(text)}></TextInput>

                                <Image style={styles.image}
                                    source={require('../assest/lock_icon.png')}
                                />

                            </View>
                            {isPassword && <Text style={styles.errorText}>{t('Please enter Password')}</Text>}

                            <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}><Text style={{ textAlign: "right", marginTop: 20, fontWeight: "normal", color: "#098DD4" }}>{t('Forgot Password')}</Text></TouchableOpacity>

                            <TouchableOpacity onPress={() => login()}><Text style={styles.button}>{t('Sign In')}</Text></TouchableOpacity>
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
                                 
                                 <TouchableOpacity onPress={()=>_signIn()}>
                                <Image style={{ height: 60, width: 60, marginStart: 20 }}
                                    source={require('../assest/google.png')}
                                />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}><Text style={styles.paragraph}>
                            {t('New User Join Now')}{" "}
                                <Text style={styles.highlight}>{t('Sing up')}{" "}<Text style={styles.paragraph}>{t('here')}</Text></Text>
                            </Text></TouchableOpacity>

                        </View>





                    </View>


                </ScrollView>
            </View>
        </>
    )
    // }


}

const styles = StyleSheet.create({
    parentView: {
        backgroundColor: 'white',

    },
    textBackground: {

        backgroundColor: '#FFFFFF',
        width: "100%",
        marginTop: 20,
        flexDirection: "row",
        height: 50,
        borderColor: '#EEF3F7',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center"

    },
    errorText: {
        fontSize: 11,
        fontWeight: "bold",
        marginTop: 2,
        color: 'red'
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
export default SignIn