import React, { useState, useEffect } from 'react';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import RadioGroup from 'react-native-radio-buttons-group';
import ActionBar from './ActionBar';
import MyWhiteCart from './MyWhiteCart';
import {
    KeyboardAvoidingView, SafeAreaView, Dimensions, Button, Alert, View, Image, StatusBar, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, TextInput
} from "react-native";

import ActivityLoader from './ActivityLoader'
import NetInfo from '@react-native-community/netinfo'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import './langauge/i18n';
import { color } from 'react-native-reanimated';
import { teal500 } from 'react-native-paper/lib/typescript/styles/colors';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const Marketing = ({ navigation }) => {

    const [netInfo, setNetInfo] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const [emptyList, setEmptyList] = useState(false)
    const [imageUrl, setImageUrl] = useState('');
    const [name, setName] = useState('')
    const [emails, setEmail] = useState('')
    const [isFirstName, setIsFirstName] = useState(false)
    const [isEmailEmty, setIsEmailEmty] = useState(false)
    const [isHousehold, setIsHousehold] = useState(false)
    const [isTelephone, setIsTelephone] = useState(false)
    const [isChooseFile, setIsChooseFile] = useState(false)
    const [isMessage, setIsMessage] = useState(false)

    const [isEmailCorrect, setIsEmailCorrect] = useState(false)
    const [household, setHousehold] = useState('')
    const [telephone, setTelephone] = useState('')
    const [file, setFile] = useState('')
    const [message, setMessage] = useState('')
    const [subHeading, setSubHeading] = useState('')
    const [subHeadingTwo, setSubHeadingTwo] = useState('')
    const [subHeadingThree, setSubHeadingThree] = useState('')
    const [description, setDescription] = useState('');
    const [descriptionTwo, setDescriptionTwo] = useState('');
    const [descriptionThree, setDescriptionThree] = useState('');
    const [messageTag, setMessageTag] = useState([]);
    const [messageTagTwo, setMessageTagTwo] = useState([]);
    const [isCommercial, setIscommercial] = useState(false);
    const [isGraphic, setIsGraphic] = useState(false);
    const [isMarketing, setIsMarketing] = useState(false);

    const { t, i18n } = useTranslation();

    useFocusEffect(
        React.useCallback(() => {

            const unsubscribe = NetInfo.addEventListener((state) => {
                setNetInfo(
                    `Connection type: ${state.type}
        Is connected?: ${state.isConnected}
        IP Address: ${state.details.ipAddress}`,
                );
            });

            return () => {

                unsubscribe();

            };
        }, [])
    );


    useFocusEffect(
        React.useCallback(() => {
            setIsLoading(true)
            setIscommercial(false)
            setIsMarketing(false)
            setIsGraphic(false)
            getManagementList()

            return () => {
            };
        }, [])
    );



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



    const checkInternet = () => {
        Alert.alert("Alert", "Please check internet", [
            { text: 'Okay' }
        ])

    }

    const success = (msg) => {
        Alert.alert("Success", msg, [
            {
                text: 'Okay', onPress: () => {
                    setListFav([])
                    getFavList()
                }
            }
        ])
    }

    const failure = (msg) => {
        Alert.alert("Failure", msg, [
            { text: 'Okay' }
        ])

    }

    const ListEmptyView = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: "center" }}>

                <Text style={{ textAlign: 'center', color: "black" }}>{t('Sorry, No Data Present')}</Text>

            </View>

        );
    }



    const getManagementList = async () => {

        const accessToken = await AsyncStorage.getItem("access_token");
        const langauge = await AsyncStorage.getItem("langauge");

        if (langauge != null) {
            changeLanguage(langauge)
        } else {
            changeLanguage("en")
        }
        const id = await AsyncStorage.getItem("userId")


        NetInfo.fetch().then((state) => {

            if (state.isConnected) {


                let data = { slug: "marketing" }
                fetch("http://50.28.104.48:3003/api/recruitment/getRecruitmentByCategory", {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': accessToken
                    },
                    body: JSON.stringify(data)
                }).then((result) => {

                    result.json().then((res) => {
                        setIsLoading(false)
                        if (res.code == 200) {

                            console.log(JSON.stringify(res.data))
                            const value = res.data.recruitments[0]

                            // const url = `http://50.28.104.48:3003/images/${res.data.image}`
                            const url = "https://th.bing.com/th/id/R.456cd7d0abd66d2553f54752207a915f?rik=LAEtA8ZFMph4rQ&riu=http%3a%2f%2fwww.myink.in%2fwp-content%2fuploads%2f2016%2f08%2fAsus-Zenfone-Go-ZC451TG.jpg&ehk=PEn2Ch%2bMDybW054J8QsygPMadHKgXP0fgf33jIR3Kc0%3d&risl=&pid=ImgRaw&r=0"

                            setImageUrl(url)
                            // setName(res.data.name)
                            setDescription(value.description)
                            setName(value.name)
                            setEmail(value.email)
                            setMessage(value.message)
                            setHousehold(value.household)
                            const phone = value.phone + ""
                            setTelephone(phone)
                            setSubHeading(value.recruitment_heading)
                            setSubHeadingTwo(value.description_heading)
                            setDescriptionTwo(value.sub_description)
                            // setName(res.data.name)
                            // setDescription(res.data.description)
                            // setSubHeading(res.data.sub_heading)
                            // setSubHeadingTwo(res.data.sub_heading_2)
                            // setSubHeadingThree(res.data.sub_heading_3)
                            // setDescriptionTwo(res.data.description_2)
                            // setDescriptionThree(res.data.description_3)
                            setMessageTag(value.recruitment_requirement_tags)
                            setMessageTagTwo(value.recruitment_description_tags)

                            setEmptyList(true)

                        } else {
                            setEmptyList(false)
                            failure(res.massage)
                        }
                        console.log(res)
                    })

                })
            } else {
                setIsLoading(false)
                checkInternet()
            }



        });


    }

    const handleValidUser = (val) => {

        if (val.trim().length > 0) {
            console.log("name=" + val)
            setIsFirstName(false)

            return false
        } else {
            setIsFirstName(true)

            return true
        }

    }

    const handleValidHouseHold = (val) => {

        if (val.trim().length > 0) {
            setIsHousehold(false)

            return false
        } else {
            setIsHousehold(true)

            return true
        }

    }

    const handleValidHouseTelephone = (val) => {

        if (val.trim().length > 0) {
            setIsTelephone(false)

            return false
        } else {
            setIsTelephone(true)

            return true
        }

    }

    const handleValidChooseFile = (val) => {

        if (val.trim().length > 0) {
            setIsChooseFile(false)

            return false
        } else {
            setIsChooseFile(true)

            return true
        }

    }

    const handleValidMessage = (val) => {

        if (val.trim().length > 0) {
            setIsMessage(false)

            return false
        } else {
            setIsMessage(true)

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


    const submit = () => {

        NetInfo.fetch().then((state) => {

            if (state.isConnected) {
                const isName = handleValidUser(name)
                const isEmail = handleValidEmail(emails)
                const isHold = handleValidHouseHold(household)
                const isPhone = handleValidHouseTelephone(telephone)
                const isDocument = handleValidChooseFile(file)
                const isMesaages = handleValidMessage(message)


                if (isName || isEmail || isHold || isPhone || isDocument || isMesaages) {

                    return
                }
                // setIsLoading(true)
                // let data = { first_name: name, last_name: name, email: emails, password: pass }
                // fetch("http://50.28.104.48:3003/api/user/userRegistration", {
                //     method: 'post',
                //     headers: {
                //         'Accept': 'application/json',
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify(data)
                // }).then((result) => {

                //     result.json().then((res) => {
                //         setIsLoading(false)
                //         if (res.code == 200) {

                //             success(res.massage)
                //         } else {

                //             failure(res.massage)
                //         }
                //         console.log(res)
                //     })

                // })
            } else {
                checkInternet()
            }



        });


    }


    return (
        <>
            <StatusBar hidden={false} barStyle='light-content' backgroundColor="#0076B5" />
            <SafeAreaView style={styles.container}>
                <View style={{ backgroundColor: "#fff", flex: 1 }}>
                    <View style={{ flexDirection: "row", width: "100%", backgroundColor: "#FAFAFA", height: 60, alignItems: "center" }}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }}><Image
                            source={require('../assest/left_arrow.png')}
                            style={{ height: 15, width: 15, marginStart: 20 }}
                        /></TouchableOpacity>


                        <Image
                            source={require('../assest/header_ic.png')}
                            style={{ height: 30, width: 100, marginStart: 20 }}
                        />
                        {/* <View style={{ flex: 1 }}></View>
                        <Image
                            source={require('../assest/sreach.png')}
                            style={{ height: 35, width: 35, marginEnd: 15 }}
                        />
                        <TouchableOpacity onPress={() => { navigation.navigate("Wishlist", { screen: "EditProfile" }) }}><Image
                            source={require('../assest/user_header.png')}
                            style={{ height: 35, width: 35, marginEnd: 15 }}
                        /></TouchableOpacity>

                        <TouchableOpacity onPress={() => { navigation.navigate("MyCartScreen") }}><Image
                            source={require('../assest/buged.png')}
                            style={{ height: 35, width: 35, marginEnd: 15 }}
                        /></TouchableOpacity> */}
                    </View>
                    {emptyList ?
                        <>
                            <ScrollView>
                                <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>


                                    {/* <TouchableOpacity style={[isCommercial ? styles.selectedButton : styles.unSelectedButton, { width: "50%", marginEnd: 10, marginTop: 15 }]} onPress={() => {
                                        setIscommercial(true)

                                    }}><Text style={isMarketing ? styles.selectedText : styles.unSelectedText}>{t('Commercial')}</Text></TouchableOpacity> */}
                                    <Text style={{ fontWeight: "bold", color: "#1D3557", fontSize: 15, marginTop: 10 }}>{t('Marketing And Communication Technique')}</Text>
                                    <Image

                                        resizeMode='stretch'
                                        style={[styles.wrap, { marginTop: 10 }]}
                                        source={{ uri: imageUrl }}
                                    />

                                    <Text style={{ color: "#707070", fontSize: 12, marginTop: 12, fontWeight: "bold" }}>{description}</Text>

                                    <Text style={{ fontWeight: "bold", color: "#1D3557", fontSize: 15, marginTop: 10 }}>{subHeading}</Text>

                                    {
                                        messageTag.map((e, index) =>
                                            <View style={{ flexDirection: 'row', paddingVertical: 1, marginTop: 10, alignItems: "center" }}>

                                                <View style={{
                                                    width: 5,
                                                    height: 5,
                                                    borderRadius: 10 / 2,
                                                    backgroundColor: '#098DD4'
                                                }} />
                                                <Text style={{ color: "#707070", fontSize: 12, marginStart: 10 }}>{e.name}</Text>

                                            </View>
                                        )
                                    }

                                    <Text style={{ fontWeight: "bold", color: "#1D3557", fontSize: 15, marginTop: 12 }}>{subHeadingTwo}</Text>

                                    {
                                        messageTagTwo.map((e, index) =>
                                            <View style={{ flexDirection: 'row', paddingVertical: 1, marginTop: 10, alignItems: "center" }}>

                                                <View style={{
                                                    width: 5,
                                                    height: 5,
                                                    borderRadius: 10 / 2,
                                                    backgroundColor: '#098DD4'
                                                }} />
                                                <Text style={{ color: "#707070", fontSize: 12, marginStart: 10 }}>{e.name}</Text>

                                            </View>
                                        )
                                    }

                                    <Text style={{ color: "#707070", fontSize: 12, marginTop: 12 }}>{descriptionTwo}</Text>


                                    <View style={{ flexDirection: "row", marginTop: 20 }}><Text style={styles.subHeaderText}>{t('Name')}</Text>

                                        <Image style={{ height: 5, width: 5, marginTop: 3, marginStart: 3 }}

                                            source={require('../assest/star.png')}
                                        />
                                    </View>

                                    <View style={styles.textBackground}>
                                        <TextInput style={styles.text}
                                            value={name}
                                            onChangeText={text => setName(text)}
                                        ></TextInput>


                                    </View>
                                    {isFirstName && <Text style={styles.errorText}>{t('Please enter full name')}</Text>}

                                    <View style={{ flexDirection: "row", marginTop: 20 }}><Text style={styles.subHeaderText}>{t('Email')}</Text>
                                        <Image style={{ height: 5, width: 5, marginTop: 3, marginStart: 3 }}

                                            source={require('../assest/star.png')}
                                        />
                                    </View>

                                    <View style={styles.textBackground}>
                                        <TextInput style={styles.text}
                                            value={emails}
                                            autoCapitalize='none'
                                            onChangeText={text => setEmail(text)}></TextInput>

                                    </View>
                                    {isEmailEmty && <Text style={styles.errorText}>{t('Please enter email')}</Text>}
                                    {isEmailCorrect && <Text style={styles.errorText}>{t('Please enter correct email')}</Text>}

                                    <View style={{ flexDirection: "row", marginTop: 20 }}><Text style={styles.subHeaderText}>{t('Household')}</Text>
                                        <Image style={{ height: 5, width: 5, marginTop: 3, marginStart: 3 }}

                                            source={require('../assest/star.png')}
                                        />
                                    </View>

                                    <View style={styles.textBackground}>
                                        <TextInput style={styles.text}
                                            value={household}
                                            onChangeText={text => setHousehold(text)}></TextInput>

                                    </View>

                                    {isHousehold && <Text style={styles.errorText}>{t('Please enter household')}</Text>}

                                    <View style={{ flexDirection: "row", marginTop: 20 }}><Text style={styles.subHeaderText}>{t('Telephone')}</Text>
                                        <Image style={{ height: 5, width: 5, marginTop: 3, marginStart: 3 }}

                                            source={require('../assest/star.png')}
                                        />
                                    </View>

                                    <View style={styles.textBackground}>
                                        <TextInput style={styles.text}
                                            value={telephone}
                                            keyboardType={'numeric'}
                                            onChangeText={text => setTelephone(text)}></TextInput>

                                    </View>
                                    {isTelephone && <Text style={styles.errorText}>{t('Please enter telephone')}</Text>}

                                    <View style={{ flexDirection: "row", marginTop: 20 }}><Text style={styles.subHeaderText}>{t('Choose File')}</Text>
                                        <Image style={{ height: 5, width: 5, marginTop: 3, marginStart: 3 }}

                                            source={require('../assest/star.png')}
                                        />
                                    </View>

                                    <View style={styles.textBackground}>
                                        <TextInput style={styles.text}
                                            value={file}
                                            onChangeText={text => setFile(text)}></TextInput>

                                    </View>

                                    {isChooseFile && <Text style={styles.errorText}>{t('Please select file')}</Text>}

                                    <View style={{ flexDirection: "row", marginTop: 20 }}><Text style={styles.subHeaderText}>{t('Message')}</Text>
                                        <Image style={{ height: 5, width: 5, marginTop: 3, marginStart: 3 }}

                                            source={require('../assest/star.png')}
                                        />
                                    </View>

                                    <View style={styles.textBackground}>
                                        <TextInput style={styles.text}
                                            value={message}
                                            onChangeText={text => setMessageFile(text)}></TextInput>

                                    </View>
                                    {isMessage && <Text style={styles.errorText}>{t('Please enter message')}</Text>}

                                    <View><TouchableOpacity onPress={() => { submit() }}><Text style={styles.button}>{t('Submit Application')}</Text></TouchableOpacity></View>


                                </View>
                            </ScrollView>


                        </>
                        :
                        <ListEmptyView />
                    }

                </View>
            </SafeAreaView>
        </>
    )



}

const styles = StyleSheet.create({

    parentView: {
        backgroundColor: '#FFFFFF'
    },
    childView: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    radioLabel: {
        fontWeight: "bold",
        color: "#707070",


    },
    selectedButton: {
        flex: 1,
        padding: 5,
        borderRadius: 5,
        borderColor: "#098DD4",
        backgroundColor: '#098DD4',
        color: "#fff",
        borderWidth: 1,
        textAlign: "center",
        fontSize: 12


    },
    unSelectedButton: {
        flex: 1,
        padding: 5,
        borderRadius: 5,
        borderColor: "#00000073",
        backgroundColor: '#fff',
        color: "#676767",
        borderWidth: 1,
        textAlign: "center",
        fontSize: 12
    },
    selectedText: {
        color: "#fff",
        fontSize: 12,
        textAlign: "center"
    },
    unSelectedText: {
        color: "#676767",
        fontSize: 12,
        textAlign: "center"
    },


    textBackground: {

        backgroundColor: '#FFFFFF',
        width: "100%",
        marginTop: 15,
        flexDirection: "row",
        height: 45,
        borderColor: "#DDDBDB",
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center"

    },
    wrap: {
        width: "100%",
        borderRadius: 5,
        height: HEIGHT * 0.30
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
        borderRadius: 50,
        justifyContent: "center",
        height: 50,
        marginTop: 30,
        marginBottom: 30,
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
    errorText: {
        fontSize: 11,
        fontWeight: "bold",
        marginTop: 2,
        color: 'red'
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
        marginBottom: 3
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
        color: '#707070'
    },
    rectangleShapeView: {
        width: 58 * 2,
        height: 35,
        marginEnd: 8,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderColor: "#098DD4",
        borderWidth: 1,
        borderRadius: 20

    },
    box2: {
        justifyContent: 'space-evenly',
        height: '50%',
        paddingHorizontal: 30
    }
});

export default Marketing