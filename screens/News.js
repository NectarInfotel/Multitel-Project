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
import RecruitmentCart from './RecruitmentCart';
import NewsCart from './NewsCart';
import { color } from 'react-native-reanimated';
import { teal500 } from 'react-native-paper/lib/typescript/styles/colors';

import FilePicker, { types } from 'react-native-document-picker'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height
const numColumns = 2

const News = ({ navigation }) => {

    const [netInfo, setNetInfo] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const [emptyList, setEmptyList] = useState(false)
    const [imageUrl, setImageUrl] = useState('');
    const [name, setName] = useState('')
    const [emails, setEmail] = useState('')
    const [listRecruitment, setListRecruitment] = useState([])
    const [newsList, setNewsList] = useState([])
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
    const [uploadImage, setUploadImage] = useState('')
    const [fileName, setFileName] = useState('')
    const [fileType, setFileType] = useState('')

    const [subHeading, setSubHeading] = useState('')
    const [subHeadingTwo, setSubHeadingTwo] = useState('')
    const [subHeadingThree, setSubHeadingThree] = useState('')
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [descriptionTwo, setDescriptionTwo] = useState('');
    const [descriptionThree, setDescriptionThree] = useState('');
    const [messageTag, setMessageTag] = useState("");
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

    const formatData = (dataList, numColumns) => {
        if (dataList != null) {

            const totalRows = Math.floor(dataList.length / numColumns)
            let totalLastRow = dataList.length - (totalRows * numColumns)

            while (totalLastRow !== 0 && totalLastRow !== numColumns) {
                dataList.push({
                    id: "blank",
                    name: "Zahan",
                    empty: true,
                    image: 'https://www.apple.com/newsroom/images/product/os/ios/standard/Apple_ios14-app-library-screen_06222020_inline.jpg.large.jpg'
                })
                totalLastRow++
            }

        }
        return dataList
    }

    if (isLoading) {
        return (
            <ActivityLoader />
        )


    }

    const pdfPicker = async () => {
        try {
            const response = await FilePicker.pick({
                presentationStyle: 'fullScreen',
                type: [types.pdf]
            })
            const res = response[0]
            setUploadImage(res.uri)
            setFileType(res.type)
            setFileName(res.name)



        } catch (e) {

        }

    }

    const checkInternet = () => {
        Alert.alert("Alert", "Please check internet", [
            { text: 'Okay' }
        ])

    }

    const success = (msg) => {
        Alert.alert("Success", msg, [
            {
                text: 'Okay'
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

                fetch("http://50.28.104.48:3003/api/news/getAllNews", {
                    method: 'get',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': accessToken
                    },

                }).then((result) => {

                    result.json().then((res) => {
                        // setIsLoading(false)
                        if (res.code == 200) {

                            console.log(JSON.stringify(res.data))
                            setNewsList(res.data)
                            setEmptyList(true)
                            getRecruitmentList()

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



    const getRecruitmentList = async () => {

        const accessToken = await AsyncStorage.getItem("access_token");

        const id = await AsyncStorage.getItem("userId")


        NetInfo.fetch().then((state) => {

            if (state.isConnected) {
                fetch("http://50.28.104.48:3003/api/news/getAllNewsCategory", {
                    method: 'get',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': accessToken
                    },

                }).then((result) => {

                    result.json().then((res) => {
                        setIsLoading(false)
                        if (res.code == 200) {
                            setListRecruitment(res.data)
                            console.log(JSON.stringify(res.data))
                        } else {

                            // failure(res.massage)
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
                                <View>
                                    <FlatList style={{ marginTop: 10, marginEnd: 10, marginStart: 10 }}
                                        data={formatData(listRecruitment, numColumns)}
                                        numColumns={2}
                                        renderItem={({ item }) => RecruitmentCart(item, navigation, t)}
                                        keyExtractor={(item) => item.uid}
                                    />
                                    

                                        <Text style={{ fontWeight: "bold", color: "#1D3557", fontSize: 15, marginTop: 10, marginStart: 20 }}>{t('News')}</Text>

                                        <FlatList style={{ marginTop: 10,marginStart: 15,marginEnd:15 }}
                                            data={formatData(newsList, numColumns)}
                                            numColumns={2}
                                            renderItem={({ item }) => NewsCart(item,t)}
                                            keyExtractor={(item) => item.uid}
                                        />


                                    
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

export default News