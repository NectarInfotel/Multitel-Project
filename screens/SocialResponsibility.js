import React, { useState, useEffect } from 'react';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import RadioGroup from 'react-native-radio-buttons-group';
import ActionBar from './ActionBar';
import ResponsibityCart from './ResponsibityCart';
import {
    KeyboardAvoidingView, SafeAreaView, LayoutAnimation, Dimensions, Button, Alert, View, Image, StatusBar, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, TextInput
} from "react-native";

import ActivityLoader from './ActivityLoader'
import NetInfo from '@react-native-community/netinfo'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import './langauge/i18n';


const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height


const ExpandableComponent = ({ item, onClickFunction }) => {
    const numColumns = 2
    const [layoutHeight, setLayoutHeight] = useState(null)


    // useEffect(() => {

    //     if (item.isExpanded) {
    //         console.log("hiiii=="+"open")
    //         setLayoutHeight(null)
    //     } else {
    //         console.log("hiiii=="+"close")
    //         setLayoutHeight(0)
    //     }

    // }, [item.isExpanded])

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

    return (
        <View>
            <View style={{
                marginTop:20, flexDirection: "row", alignItems: "center"
            }}>
                <Text style={styles.itemText}>
                    {item.name}
                </Text>

            </View>

            <View>
                <View style={{ backgroundColor: "#fff" }} >
                    <FlatList style={{ marginHorizontal: 20 }}
                        data={item.corporates}
                        renderItem={({ item }) => ResponsibityCart(item)}
                        keyExtractor={(item) => item.uid}
                    />
                </View>
            </View>

        </View>
    )
}

const SocialResponsibility = ({ navigation }) => {

    const [netInfo, setNetInfo] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const [emptyList, setEmptyList] = useState(false)
    const [imageUrl, setImageUrl] = useState('');
    const [name, setName] = useState('');
    const [subHeading, setSubHeading] = useState('')
    const [subHeadingTwo, setSubHeadingTwo] = useState('')
    const [subHeadingThree, setSubHeadingThree] = useState('')
    const [description, setDescription] = useState('');
    const [descriptionTwo, setDescriptionTwo] = useState('');
    const [descriptionThree, setDescriptionThree] = useState('');
    const [messageTag, setMessageTag] = useState("");
    const [isCultural, setIsCultural] = useState(false);
    const [isIndicator, setIsIndicator] = useState(false);
    const [listSource, setListSource] = useState([]);
    const [multiSelect, setMultiselect] = useState(false);

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

            getResponsibilities()

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



    const getResponsibilities = async () => {

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

                setIsLoading(true)
                let data = { slug: "social-and-cultural-investment" }
                fetch("http://50.28.104.48:3003/api/corporate/getAllCorporateCategory", {
                    method: 'get',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': accessToken
                    }
                }).then((result) => {

                    result.json().then((res) => {
                        setIsLoading(false)
                        if (res.code == 200) {
                            setEmptyList(true)
                            const arr = res.data
                            const newArr = arr.map(item => {
                                return { ...item, isExpanded: false }
                            })

                            setListSource(newArr)
                        } else {
                            setEmptyList(false)
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

    const updateLayout = (index) => {

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const array = [...listSource]

        if (multiSelect) {
            array[index]['isExpanded'] = !array[index]['isExpanded']
        } else {
            array.map((value, placeindex) =>
                placeindex === index
                    ? (array[placeindex]['isExpanded']) = !array[placeindex]['isExpanded']
                    : (array[placeindex]['isExpanded']) = false
            );
        }

        setListSource(array)
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

                            <ScrollView style={{ backgroundColor: "#fff", marginTop: 5 }}>
                                <Text style={{ fontWeight: "bold", color: "#1D3557", fontSize: 15, marginTop: 15, marginHorizontal: 20 }}>{t('Corporate Bodies and Corporate Composition')}</Text>
                                {
                                    listSource.map((item, key) => (
                                        <ExpandableComponent
                                            item={item}
                                            key={item.id}
                                            onClickFunction={() => {
                                                updateLayout(key)
                                            }}
                                        />
                                    ))
                                }
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
        marginTop: 20,
        flexDirection: "row",
        height: 50,
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
        marginBottom: 30,
        marginEnd: 20,
        marginStart: 20,
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
        marginTop: 20,
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
    },
    item: {
        backgroundColor: '#EEF3F7',
        marginTop: 10,
        marginHorizontal: 20
    },
    itemText: {
        fontSize: 15,
        flex: 1,
        marginHorizontal: 20,
        fontWeight: "bold",
        color: "#1D3557"
    },
    content: {
        paddingRight: 10,
        paddingEnd: 10,
        backgroundColor: '#fff'
    },
    text: {
        fontSize: 16,
        padding: 10
    },
    separator: {
        height: 0.5,
        backgroundColor: "#c8c8c8",
        width: "100%"
    }
});

export default SocialResponsibility