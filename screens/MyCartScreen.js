import React, { useState, useEffect } from 'react';
import RadioGroup from 'react-native-radio-buttons-group';
import ActionBar from './ActionBar';
import MyCard from './MyCard';
import ActivityLoader from './ActivityLoader'
import NetInfo from '@react-native-community/netinfo'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    KeyboardAvoidingView, SafeAreaView, Modal, Alert, View, Image, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, TextInput
} from "react-native";
import {useTranslation} from 'react-i18next';
import './langauge/i18n';



const DATA = [
    {
        id: 1,
        name: "Jorge Rau",
        image: 'https://www.apple.com/newsroom/images/product/os/ios/standard/Apple_ios14-app-library-screen_06222020_inline.jpg.large.jpg'
    },
    {
        id: 2,
        name: "Rohan",
        image: 'https://www.apple.com/newsroom/images/product/os/ios/standard/Apple_ios14-app-library-screen_06222020_inline.jpg.large.jpg'
    },
    {
        id: 3,
        name: "Zahan",
        image: 'https://www.apple.com/newsroom/images/product/os/ios/standard/Apple_ios14-app-library-screen_06222020_inline.jpg.large.jpg'
    },
    {
        id: 4,
        name: "Zahan",
        image: 'https://www.apple.com/newsroom/images/product/os/ios/standard/Apple_ios14-app-library-screen_06222020_inline.jpg.large.jpg'
    },
    {
        id: 5,
        name: "Zahan",
        image: 'https://www.apple.com/newsroom/images/product/os/ios/standard/Apple_ios14-app-library-screen_06222020_inline.jpg.large.jpg'
    },
    {
        id: 6,
        name: "Zahan",
        image: 'https://www.apple.com/newsroom/images/product/os/ios/standard/Apple_ios14-app-library-screen_06222020_inline.jpg.large.jpg'
    },
];



const MyCartScreen = ({ navigation }) => {


    const [netInfo, setNetInfo] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [listCart, setListCart] = useState([])
    const [emptyList, setEmptyList] = useState(false)
    const [totalPrice, setTotalPrice] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [isItem, setIstem] = useState({});
    const [currentLanguage, setLanguage] = useState('en');
    const { t, i18n } = useTranslation();


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

    useEffect(() => {
        changeLanguage(currentLanguage)
    }, [])

    useEffect(() => {
        setListCart([])
        getCartScreen()
    }, []);



    if (isLoading) {
        return (
            <ActivityLoader />
        )


    }

    const changeLanguage = value => {
        i18n
            .changeLanguage(value)
            .then(() => setLanguage(value))
            .catch(err => console.log(err));
    };

    const success = (msg) => {
        Alert.alert("Success", msg, [
            {
                text: 'Okay', onPress: () => {
                    setListCart([])
                    getCartScreen()
                }
            }
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

    const ListEmptyView = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: "center" }}>

                <Text style={{ textAlign: 'center', color: "black" }}>{t('Sorry, No Data Present')}</Text>

            </View>

        );
    }

    const deleteItem = (item) => {
        setIstem(item)
        setModalVisible(!modalVisible)
    }


    const deleteCart = async (item) => {
        const token = await AsyncStorage.getItem("access_token")
        const userId = await AsyncStorage.getItem("userId")
        NetInfo.fetch().then((state) => {

            if (state.isConnected) {


                console.log("token===" + userId + " id=" + item.product.id)
                setIsLoading(true)
                let data = { userId: userId, id: item.product.id }
                fetch("http://50.28.104.48:3003/api/cart/cartDataDelete", {
                    method: 'delete',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify(data)
                }).then((result) => {

                    result.json().then((res) => {
                        setIsLoading(false)
                        if (res.code == 200) {
                            // setListCPE(res.data.products)
                            // console.log(JSON.stringify(listCPE))
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


    const getCartScreen = async () => {

        const accessToken = await AsyncStorage.getItem("access_token");
        const id = await AsyncStorage.getItem("userId")

        console.log("token===" + accessToken)
        NetInfo.fetch().then((state) => {

            if (state.isConnected) {

                setIsLoading(true)
                let data = { userId: id }
                fetch("http://50.28.104.48:3003/api/cart/getCartData", {
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

                            setListCart(res.data)
                            let priceValue = 0
                            for (let cartValue of res.data) {
                                let x = Number(cartValue.product.price)

                                priceValue += x
                                console.log(priceValue)
                            }

                            setTotalPrice(priceValue)
                            console.log(JSON.stringify(res.data))
                            if (res.data.length > 0) {
                                setEmptyList(true)
                            } else {
                                setEmptyList(false)
                            }


                        } else {

                            failure(res.massage)
                        }
                        // console.log(res)
                    })

                })
            } else {
                checkInternet()
            }



        });


    }

    return (
        <>
        <StatusBar hidden={false} barStyle= 'light-content' backgroundColor="#0076B5" />
        <SafeAreaView style={styles.container}>
            <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
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
                    }} >{t('My Cart')}</Text>

                    <View style={styles.rectangleShapeView}>

                        <Image style={{ height: 24, width: 24 }}
                            source={require('../assest/add_cart.png')}
                        />
                        <Text numberOfLines={1} style={{ color: "#098DD4", fontWeight: "normal", fontSize: 14, marginStart: 5 }}>{t('Add Items')}</Text>
                    </View>

                    <Image style={{ height: 40, width: 40, marginEnd: 15 }}
                        source={require('../assest/buged.png')}
                    />

                </View>
                {
                    emptyList ?
                        <>
                            <FlatList style={{ marginTop: 10, backgroundColor: "#FFFFFF" }}
                                data={listCart}
                                renderItem={({ item }) => MyCard(item, deleteItem)}
                                keyExtractor={(item) => item.uid}

                            />

                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginStart: 20, marginEnd: 20, marginBottom: 15 }}>
                                <Text style={{ color: "#1D3557", fontWeight: "bold", fontSize: 20 }}>{t('Total Price')}</Text>

                                <Text style={{ color: "#1D3557", fontWeight: "bold", fontSize: 24, marginStart: 30 }}>{totalPrice}</Text>

                            </View>
                            <View style={{marginStart:20,marginEnd:20,marginBottom:20}}>
                            <Text style={styles.button}>{t('Continue')}</Text>
                            </View>
                        </>
                        :
                        <ListEmptyView />

                }

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {

                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View >


                                <View style={{ padding: 25, alignItems: "center", justifyContent: "center" }}>

                                    <Image
                                        source={require('../assest/ic_delete.png')}
                                        style={{ width: 60, height: 60 }}
                                    />
                                    <Text style={[styles.modalText, { color: "#707070", fontSize: 15, fontWeight: "bold", marginTop: 10 }]}>
                                        {t('WANT TO DELETE')}
                                    </Text>

                                    <Text style={[styles.modalText, { color: "#707070", fontSize: 12, fontWeight: "normal", marginTop: 10 }]}>
                                    {t('delete this item')}
                                    </Text>
                                    <View style={{ flexDirection: "row",alignItems:"center",marginTop:20 }}>
                                       <TouchableOpacity style={{flex:1,backgroundColor:"#707070",padding:10,borderRadius:5,marginEnd:10}} onPress={()=>{ setModalVisible(!modalVisible)}}><Text style={{color:'#fff',textAlign:'center'}}>{t('Cancel')}</Text></TouchableOpacity>
                                       <TouchableOpacity style={{flex:1,backgroundColor:"#0076B5",padding:10,borderRadius:5,marginStart:10}} 
                                       onPress={()=>{
                                           setModalVisible(!modalVisible)
                                           deleteCart(isItem)}}><Text style={{color:'#fff',textAlign:'center'}}>{t('Delete')}</Text></TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

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
    icon: {
        position: 'absolute',
        right: 110,
        bottom: 70,
        width: 30,
        height: 30
    },
    buttonCancel: {
        backgroundColor: "#0076B5",
        color: "white",
        borderRadius: 50,
        justifyContent: "center",
        height: 50,
        marginEnd: 20,
        marginStart: 20,
        borderRadius: 5,
        alignItems: "center",
        textAlign: "center",
        textAlignVertical: "center"
    },

    button: {
        backgroundColor: "#0076B5",
        color: "white",
        borderRadius: 50,
        justifyContent: "center",
        height: 50,
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
        marginEnd: 20,
        marginStart: 20,
        borderRadius: 50,
        justifyContent: "center",
        height: 50,
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
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    iconCross: {
        position: 'absolute',
        left: 140,
        bottom: 1,
        width: 12,
        height: 12
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
    }
});

export default MyCartScreen