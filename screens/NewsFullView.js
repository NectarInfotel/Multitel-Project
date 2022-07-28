import React, { useState, useEffect } from 'react';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import RadioGroup from 'react-native-radio-buttons-group';
import ActionBar from './ActionBar';
import MyWhiteCart from './MyWhiteCart';
import {
    KeyboardAvoidingView, SafeAreaView, Dimensions, Button, Alert, View, Image, StatusBar, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, TextInput
} from "react-native";

import ActivityLoader from './ActivityLoader'
import FullViewCart from './FullViewCart';
import NetInfo from '@react-native-community/netinfo'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import './langauge/i18n';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height
const numColumns = 2

const NewsFullView = ({ navigation }) => {

    const [netInfo, setNetInfo] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const [emptyList, setEmptyList] = useState(false)
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState([]);

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
            getItem()

            return () => {
            };
        }, [])
    );

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



    const getItem = async () => {
        try {
            
            const item = await AsyncStorage.getItem("News");

            const accessToken = await AsyncStorage.getItem("access_token");
            const id = await AsyncStorage.getItem("userId")
            const proItem = JSON.parse(item)
            console.log("hii=" + proItem)
            setTitle(proItem.title)
            setDescription(proItem.description)
            setImage(proItem.image)
            setEmptyList(true)
            // setUserId(id)
            // setToken(accessToken)
            setIsLoading(false)
        } catch (error) {
            console.error(error);
            setIsLoading(false)
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
                                    <View style={{ paddingHorizontal: 20 }}>

                                        <Text style={{ fontWeight: "bold", color: "#1D3557", fontSize: 15, marginTop: 10 }}>{title}</Text>

                                        <Text style={{ color: "#707070", fontSize: 12, marginTop: 10 }}>{description}</Text>
                                    </View>
                                    <FlatList style={{ marginTop: 10,marginHorizontal:15 }}
                                        data={formatData(image, numColumns)}
                                        numColumns={2}
                                        renderItem={({ item }) => FullViewCart(item, navigation, t)}
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
        borderRadius: 15,
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
    }
});

export default NewsFullView