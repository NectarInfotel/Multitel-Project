import React, { useState, useEffect, useRef } from 'react';
import RadioGroup from 'react-native-radio-buttons-group';
import ActionBar from './ActionBar';
import {
    KeyboardAvoidingView, Platform, SafeAreaView, Button, Alert, View, Image, StatusBar, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, TextInput
} from "react-native";
import CheckBox from '@react-native-community/checkbox';
import ActivityLoader from './ActivityLoader'
import NetInfo from '@react-native-community/netinfo'
import AsyncStorage from '@react-native-async-storage/async-storage';
import PhoneInput from 'react-native-phone-number-input';
import {useTranslation} from 'react-i18next';
import './langauge/i18n';

const EditProfileTwo = ({ navigation, route }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [clone, setClone] = useState('')
    const [netInfo, setNetInfo] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [profession, setProfession] = useState("");
    const [city, setCity] = useState('')
    const [zip, setZip] = useState('')
    const phone = useRef(null);
    let response;

    const [isNumber, setIsNumber] = useState(false)
    const [isProfession, setIsProfession] = useState(false)
    const [isCity, setIsCity] = useState(false)
    const [isZip, setIsZip] = useState(false)

    const [currentLanguage, setLanguage] = useState('en');
    const { t, i18n } = useTranslation();

    // const [isPhone,setIsPhone]=useState("")



    const [error, setError] = useState({
        errorNumber: 'Please enter phone number',
        errorProfession: 'Please enter profession',
        errorCity: 'Please enter city',
        errorCode: 'Please enter Zip Code',
    })



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

    // useEffect(() => {
    //     changeLanguage(currentLanguage)
    //     return () => {

    //     };
    // }, []);

    useEffect(() => {
        setIsLoading(true)
        getResponseUser()
        return () => {

        };
    }, []);




    const getResponseUser = async () => {
        const result = await AsyncStorage.getItem("userDetail");
        const langauge = await AsyncStorage.getItem("langauge");
          
        if(langauge!=null)
        {
            changeLanguage(langauge)
        }else{
            changeLanguage("en") 
        }
        const res = JSON.parse(result)
        if (res != null) {
            setUserRecord(res)
        } else {
            setIsLoading(false)
        }



    }


    const changeLanguage = value => {
        i18n
            .changeLanguage(value)
            .then(() => setLanguage(value))
            .catch(err => console.log(err));
    };

    const setUserRecord = (res) => {
        if (res.phone != null) {
            let phoneNumber = res.phone
            let userPhone = phoneNumber.toString()
            response = userPhone
            setClone(userPhone)
        }

        setProfession(res.proffesion)
        setCity(res.city)
        setZip(res.zipcode)
        setIsLoading(false)


    }



    const handleValidNumber = (val) => {
        if(val!=null)
        {
        if (val.toString().length > 0) {

            setIsNumber(false)

            return false
        } else {
            console.log(val)
            setIsNumber(true)

            return true
        }
    }else{
        setIsNumber(true)

            return true
    }

    }

    const handleValidProfession = (val) => {
        
        if(val!=null)
        {
            if (val.toString().length > 0) {

                setIsProfession(false)
    
                return false
            } else {
                setIsProfession(true)
    
                return true
            }
        }else{
            setIsProfession(true)
    
            return true
        }
      

    }

    const handleValidCity = (val) => {
        if(val!=null)
        {
        if (val.toString().length > 0) {

            setIsCity(false)

            return false
        } else {
            setIsCity(true)

            return true
        }
    }else{
        setIsCity(true)

        return true
    }

    }

    const handleValidZip = (val) => {
        if(val!=null)
        {
        if (val.toString().length > 0) {

            setIsZip(false)

            return false
        } else {
            setIsZip(true)

            return true
        }
    }else{
        setIsZip(true)

        return true
    }

    }
    const { name } = route.params
    const { emailss } = route.params
    const { dob } = route.params
    const { gender } = route.params
    const { imageUrl } = route.params
    const { imageType } = route.params
    const { userRes } = route.params

    if (isLoading) {
        return (
            <ActivityLoader />
        )


    }

    const success = (res, msg) => {

        AsyncStorage.setItem("first_name", res.data.first_name)
        AsyncStorage.setItem("profile_img", res.data.profile_img)
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

    const getAccessToken = async function () {
        try {

            let imgArr = imageUrl.split('/')
            let imageName = imgArr[imgArr.length - 1]
            console
            const accessToken = await AsyncStorage.getItem("access_token");

            const userId = await AsyncStorage.getItem("userId");

            setIsLoading(true)

            console.log("send===" + clone)
            const data = new FormData();

            if (userRes) {
                data.append("image", imageName);
            } else {
                data.append("image", { uri: imageUrl, type: imageType, name: imageName });
            }

            data.append('userId', userId);
            data.append('first_name', name);
            data.append('last_name', name);
            data.append('email', emailss);
            data.append('gendar', gender);
            data.append('city', city);
            data.append('phone', clone)
            data.append('dob_date', dob);
            data.append('proffesion', profession);
            data.append('zipcode', zip);
            data.append("Adress", city)

            fetch("http://50.28.104.48:3003/api/user/updateProfile", {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': accessToken
                },
                body: data
            }).then((result) => {

                result.json().then((res) => {
                    setIsLoading(false)
                    if (res.code == 200) {

                        success(res, res.massage)
                    } else {

                        failure(res.massage)
                    }
                    console.log(res)
                })

            })

        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
    }

    const next = () => {

        NetInfo.fetch().then((state) => {

            if (state.isConnected) {
                console.log("hh==" + clone + " city==" + city + " ==profession" + profession + " ==zip" + zip)
                const isNumber = handleValidNumber(clone)
                const isCity = handleValidCity(city)
                const isPro = handleValidProfession(profession)
                const isZip = handleValidZip(zip)


                if (isNumber || isCity || isPro || isZip) {

                    return
                }

                getAccessToken()


            } else {
                checkInternet()
            }



        });


    }

    return (
        <>
            <StatusBar hidden={false} barStyle='light-content' backgroundColor="#0076B5" />
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                style={styles.container}>
                <SafeAreaView>
                    <View >
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
                            }} >{t('Edit Profile')}</Text>
                            <Image
                                source={require('../assest/setting_icon.png')}
                                style={{ height: 15, width: 15, marginStart: 20, marginEnd: 25 }}
                            />
                        </View>
                        <View style={styles.parentView}>
                            <ScrollView>
                                <View style={styles.scrollView}>
                                    <View style={styles.childView}>

                                        <Text style={styles.subHeaderText}>{t('Mobile Number')}</Text>


                                        <View style={[styles.textBackground, { justifyContent: "space-between" }]}>

                                            <PhoneInput
                                                ref={phone}
                                                value={clone}
                                                defaultCode="IN"
                                                layout="first"
                                                placeholder={t('phone number')}
                                                textInputStyle={{ fontSize: 12, fontWeight: "bold", color: '#707070' }}
                                                codeTextStyle={{ fontSize: 12, fontWeight: "bold", color: '#707070' }}
                                                containerStyle={styles.phoneNumberView}
                                                style={{ flex: 1, fontSize: 12 }}
                                                textContainerStyle={{ paddingVertical: 0, backgroundColor: '#FFFFFF', fontSize: 12, fontWeight: "bold" }}
                                                onChangeCountry={text => {
                                                    console.log("countryCode==" + JSON.stringify(text))
                                                }}
                                                onChangeText={text => {

                                                    setClone(text)

                                                }}

                                            />

                                            <Image style={styles.image}
                                                source={require('../assest/smartphone.png')}
                                            />

                                        </View>
                                       
                                        {isNumber && <Text style={styles.errorText}>{t('Please enter phone number')}</Text>}

                                        <Text style={styles.subHeaderText}>{t('Select Your Profession')}</Text>


                                        <View style={styles.textBackground}>
                                            <TextInput style={styles.text} value={profession} placeholder={t('Please enter profession')}
                                                onChangeText={text => setProfession(text)}></TextInput>

                                            {/* <Image style={styles.image}
                                        source={require('../assest/arrowdown.png')}
                                    /> */}

                                        </View>
                                        {isProfession && <Text style={styles.errorText}>{t('Please enter profession')}</Text>}

                                        <Text style={styles.subHeaderText}>{t('City')}</Text>


                                        <View style={styles.textBackground}>
                                            <TextInput style={styles.text} placeholder={t('Please enter city')}
                                                value={city}
                                                onChangeText={text => setCity(text)}></TextInput>

                                            <Image style={styles.image}
                                                source={require('../assest/building.png')}
                                            />

                                        </View>
                                        {isCity && <Text style={styles.errorText}>{t('Please enter city')}</Text>}

                                        <Text style={styles.subHeaderText}>{t('Zip Code')}</Text>


                                        <View style={styles.textBackground}>
                                            <TextInput style={styles.text} placeholder={t('Please enter zip code')}
                                                keyboardType="number-pad"
                                                value={zip}
                                                onChangeText={text => setZip(text)}></TextInput>

                                            <Image style={styles.image}
                                                source={require('../assest/calender_ic.png')}
                                            />

                                        </View>
                                        {isZip && <Text style={styles.errorText}>{t('Please enter zip code')}</Text>}

                                        <View style={{ marginTop: 24, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
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

                                    </View>


                                    <View style={{ backgroundColor: "#FFFFFF", paddingStart: 20, paddingEnd: 30, marginBottom: 250 }}>
                                        <View style={{ flexDirection: "row", marginTop: 20 }}>  
                                            <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.goBack()}><Text style={styles.cancelButton}>{t('Cancel')}</Text></TouchableOpacity>
                                            <TouchableOpacity style={{ flex: 1 }} onPress={() => next()}><Text style={styles.button}>{t('Next')}</Text></TouchableOpacity>
                                        </View>
                                    </View>
                                </View>


                            </ScrollView>
                        </View>

                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </>
    )



}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    errorText: {
        fontSize: 11,
        fontWeight: "bold",
        marginTop: 2,
        color: 'red'
    },
    parentView: {
        backgroundColor: '#FFFFFF'
    },
    childView: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,

    },
    phoneNumberView: {
        width: '80%',
        height: 50,
        fontSize: 12,
        fontWeight: "bold",
        color: '#707070',
        backgroundColor: 'white'

    },
    radioLabel: {
        fontWeight: "bold",
        color: "#707070",


    },
    textBackground: {

        backgroundColor: '#FFFFFF',
        width: "100%",
        marginTop: 20,
        flexDirection: "row",
        borderColor: '#EEF3F7',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center"

    },
    icon: {
        position: 'absolute',
        right: 110,
        bottom: 70,
        width: 30,
        height: 30
    },


    button: {
        backgroundColor: "#0076B5",
        color: "white",
        flex: 1,
        marginStart: 10,
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
    cancelButton: {
        backgroundColor: "#707070",
        color: "white",
        flex: 1,
        marginEnd: 10,
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
    headerText: {
        color: '#1D3557',
        fontWeight: "bold",
        fontSize: 20
    },
    image: {
        height: 20,
        width: 20,
        marginEnd: 15
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
    docker: {
        flex: 1,
        alignItems: 'center'
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

export default EditProfileTwo