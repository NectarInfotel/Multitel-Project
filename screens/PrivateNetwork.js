import React, { useState, useEffect } from 'react';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import RadioGroup from 'react-native-radio-buttons-group';
import ActionBar from './ActionBar';
import MyWhiteCart from './MyWhiteCart';
import {
    KeyboardAvoidingView,useWindowDimensions , SafeAreaView, Dimensions, Button, Alert, View, Image, StatusBar, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, TextInput
} from "react-native";
import RenderHtml from 'react-native-render-html';
import ActivityLoader from './ActivityLoader'
import NetInfo from '@react-native-community/netinfo'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import './langauge/i18n';
import NewsBulletCart from './NewsBulletCart';
import NewsCart from './NewsCart';
import { color } from 'react-native-reanimated';
import { teal500 } from 'react-native-paper/lib/typescript/styles/colors';
import FilePicker, { types } from 'react-native-document-picker'
const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height
const numColumns = 2

const PrivateNetwork = ({ navigation }) => {

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
    const [isPrivateNetwork, setIsPrivateNetwork] = useState(false);
    const [isPrimeDate, setIsPrimeDate] = useState(false);
    const [isSecuredAccess, setIsSecuredAccess] = useState(false);
    const [isSatDate, setIsSatDate] = useState(false);
    const [isLantoLan, setIsLantoLan] = useState(false);
    const [isP2PLink, setIsP2PLink] = useState(false);
    const [isLinkEN, setIsLinkEN] = useState(false);

    const { width } = useWindowDimensions();

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
            
           
            getManagementList("private-network")

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



    const getManagementList = async (slug) => {
        setIsLoading(true)
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
                let data = { slug: slug }
                fetch("http://50.28.104.48:3003/api/telecommunication/getTelecommunicationBySlug", {
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

                            console.log("all News" + JSON.stringify(res.data))
                            setName(res.data.name)
                            setDescription(res.data.description)
                            setEmptyList(true)
                            // getRecruitmentList()

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

    const clickPrivateNetworks=()=>{
        setIsPrivateNetwork(true)
        setIsPrimeDate(false)
        setIsSecuredAccess(false);
        setIsSatDate(false);
        setIsLantoLan(false);
        setIsP2PLink(false);
        setIsLinkEN(false)
        getManagementList("private-network")
    }
    const clickPrimeDate=()=>{
        setIsPrivateNetwork(false)
        setIsPrimeDate(true)
        setIsSecuredAccess(false);
        setIsSatDate(false);
        setIsLantoLan(false);
        setIsP2PLink(false);
        setIsLinkEN(false)
        getManagementList("prime-date-heading")
    }
    const clickSecuredAccess=()=>{
        setIsPrivateNetwork(false)
        setIsPrimeDate(false)
        setIsSecuredAccess(true);
        setIsSatDate(false);
        setIsLantoLan(false);
        setIsP2PLink(false);  
        setIsLinkEN(false)
        getManagementList("secured-access")
    }
    const clickSatDate=()=>{
        setIsPrivateNetwork(false)
        setIsPrimeDate(false)
        setIsSecuredAccess(false);
        setIsSatDate(true);
        setIsLantoLan(false);
        setIsP2PLink(false);  
        setIsLinkEN(false)
        getManagementList("sat-date")
    }
    const clickLantoLan=()=>{
        setIsPrivateNetwork(false)
        setIsPrimeDate(false)
        setIsSecuredAccess(false);
        setIsSatDate(false);
        setIsLantoLan(true);
        setIsP2PLink(false);  
        setIsLinkEN(false)
        getManagementList("lan-to-lan")
    }
    const p2pLink=()=>{
        setIsPrivateNetwork(false)
        setIsPrimeDate(false)
        setIsSecuredAccess(false);
        setIsSatDate(false);
        setIsLantoLan(false);
        setIsP2PLink(true); 
        setIsLinkEN(false)
        getManagementList("p2p-link")
    }
    const LinkEN=()=>{
        setIsPrivateNetwork(false)
        setIsPrimeDate(false)
        setIsSecuredAccess(false);
        setIsSatDate(false);
        setIsLantoLan(false);
        setIsP2PLink(false);   
        setIsLinkEN(true)
        getManagementList("link-en")
    }

    const source = {
        html: `${description}`
      };

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
                        console.log("News detail==" + JSON.stringify(res.data))
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
                                <View style={{marginHorizontal:5}}>
                                    {/* <FlatList style={{ marginTop: 10, marginEnd: 10, marginStart: 10 }}
                                        data={formatData(listRecruitment, numColumns)}
                                        numColumns={2}
                                        renderItem={({ item }) => NewsBulletCart(item, navigation, t)}
                                        keyExtractor={(item) => item.uid}
                                    /> */}

                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{ flex: 1, marginStart: 10, marginEnd: 10, marginBottom: 10 }}>
                                            <TouchableOpacity style={isPrivateNetwork? styles.selectedButton:styles.unSelectedButton} onPress={() => {
                                               clickPrivateNetworks()
                                            }}><Text style={isPrivateNetwork?styles.selectedText :styles.unSelectedText}>{t('PrivateNetwork')}</Text></TouchableOpacity>
                                        </View>
                                        <View style={{ flex: 1, marginStart: 10, marginEnd: 10, marginBottom: 10 }}>
                                            <TouchableOpacity style={isPrimeDate? styles.selectedButton:styles.unSelectedButton} onPress={() => {
                                               clickPrimeDate()
                                            }}><Text style={isPrimeDate?styles.selectedText :styles.unSelectedText}>{t('Prime Date')}</Text></TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{ flex: 1, marginStart: 10, marginEnd: 10, marginBottom: 10 }}>
                                            <TouchableOpacity style={isSecuredAccess? styles.selectedButton:styles.unSelectedButton} onPress={() => {
                                                clickSecuredAccess()
                                            }}><Text style={isSecuredAccess ?styles.selectedText :styles.unSelectedText}>{t('Secured Access')}</Text></TouchableOpacity>
                                        </View>
                                        <View style={{ flex: 1, marginStart: 10, marginEnd: 10, marginBottom: 10 }}>
                                            <TouchableOpacity style={isSatDate? styles.selectedButton:styles.unSelectedButton} onPress={() => {
                                               clickSatDate()
                                            }}><Text style={isSatDate ?styles.selectedText :styles.unSelectedText}>{t('Sat Date')}</Text></TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{ flex: 1, marginStart: 10, marginEnd: 10, marginBottom: 10 }}>
                                            <TouchableOpacity style={isLantoLan? styles.selectedButton:styles.unSelectedButton} onPress={() => {
                                                clickLantoLan()
                                            }}><Text style={isLantoLan?styles.selectedText :styles.unSelectedText}>{t('Lan-to-Lan')}</Text></TouchableOpacity>
                                        </View>
                                        <View style={{ flex: 1, marginStart: 10, marginEnd: 10, marginBottom: 10 }}>
                                            <TouchableOpacity style={isP2PLink? styles.selectedButton:styles.unSelectedButton} onPress={() => {
                                                p2pLink()
                                            }}><Text style={isP2PLink?styles.selectedText :styles.unSelectedText}>{t('P2P link')}</Text></TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{ flex: 1, marginStart: 10, marginEnd: 10, marginBottom: 10 }}>
                                            <TouchableOpacity style={isLinkEN? styles.selectedButton:styles.unSelectedButton} onPress={() => {
                                               LinkEN()
                                            }}><Text style={isLinkEN?styles.selectedText :styles.unSelectedText}>{t('Link EN')}</Text></TouchableOpacity>
                                        </View>
                                        <View style={{ flex: 1, marginStart: 10, marginEnd: 10, marginBottom: 10 }}>

                                        </View>
                                    </View>
                                    <Text style={{ fontWeight: "bold", color: "#1D3557", fontSize: 15, marginTop: 10,marginStart:10}}>{name}</Text>
                                    <View style={{marginHorizontal:10}}>
                                    <RenderHtml
                                        style={styles.htmlView}
                                        contentWidth={width}
                                        source={source}
                                    />
                                 </View>


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
    htmlView: {
        border:1,
        backgroundColor: 'red',
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

export default PrivateNetwork