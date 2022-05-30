import React, { useEffect, useReducer, useState } from 'react';
import {
    KeyboardAvoidingView, Dimensions, SafeAreaView, Pressable, Alert, Button, View, Image, StatusBar, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, TextInput
} from "react-native";
import ActivityLoader from './ActivityLoader'
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo'



const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const ProductDetail = ({ navigation }) => {

    const [netInfo, setNetInfo] = useState('');
    const [images, setImages] = useState([])
    const [imgActive, setImgActive] = useState(0);
    const [productItem, setProductItem] = useState({});
    const [quantity, setQuantity] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [token, setToken] = useState('')
    const [userId, setUserId] = useState('')

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
        getItem()
    }, [])

    const success = (msg, res) => {
        Alert.alert("Success", msg, [
            { text: 'Okay',onPress: () => { navigation.goBack() }}
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

    if (isLoading) {
        return (
            <ActivityLoader />
        )
    }

    const addToCart = () => {

        NetInfo.fetch().then((state) => {

            if (state.isConnected) {

                setIsLoading(true)
                let data = { userId: userId, quantity: quantity, id: productItem.id }
                fetch("http://50.28.104.48:3003/api/cart/addcartdata", {
                    method: 'post',
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

                            success(res.massage)
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


    const getItem = async()=> {
        try {
            const item = await AsyncStorage.getItem("product");
      
            const accessToken = await AsyncStorage.getItem("access_token");
            const id = await AsyncStorage.getItem("userId")

            

            const proItem = JSON.parse(item)
           
            setProductItem(proItem)
            const imageArr = [`http://50.28.104.48:3003/images/${proItem.cover_img}`,
            `http://50.28.104.48:3003/images/${proItem.cover_img}`,
            `http://50.28.104.48:3003/images/${proItem.cover_img}`
            ]
            setImages(imageArr)
            setUserId(id)
            setToken(accessToken)
        } catch (error) {
            console.error(error);
        }
    }

 

    const onChange = (nativeEvent) => {

        if (nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)

            if (slide != imgActive) {
                setImgActive(slide)
            }
        }

    }

    const add = () => {
        let count = quantity;
        count++
        setQuantity(count)
    }

    const sub = () => {
        let count = quantity;
        count--
        if (0 <= count) {

            setQuantity(count)
        }

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
                    }} >Product Details</Text>

                </View>
                <View>
                    <View style={styles.wrap}>
                        <ScrollView
                            onScroll={({ nativeEvent }) => { onChange(nativeEvent) }}
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled
                            horizontal
                            style={styles.wrap}
                        >
                            {
                                images.map((e, index) =>
                                    <Image
                                        key={e}
                                        resizeMode='stretch'
                                        style={styles.wrap}
                                        source={{ uri: e }}
                                    />
                                )
                            }


                        </ScrollView>
                    </View>
                    <View style={styles.wrapDot}>
                        {
                            images.map((e, index) =>
                                <Text
                                    key={e}
                                    style={imgActive == index ? styles.dotActive : styles.dot}>
                                    ●
                                </Text>
                            )
                        }
                    </View>
                </View>
                <ScrollView>
                    <View style={{ paddingHorizontal: 15 }}>
                        <Text style={{ alignItems: "flex-start", color: "#1D3557", fontWeight: "bold", fontSize: 25, marginTop: 10 }}>{productItem.name}</Text>
                        <Text style={{ lineHeight: 25, width: "100%", color: "#707070", fontWeight: "normal", fontSize: 14, marginTop: 10 }}>{productItem.description}</Text>
                        <Text style={{ alignItems: "flex-start", color: "#1D3557", fontWeight: "bold", fontSize: 15, marginTop: 25 }}>Quantity</Text>
                        <View style={{ flexDirection: "row", width: "100%", alignItems: "center", paddingVertical: 5, marginTop: 10, justifyContent: "space-between" }}>
                            <View style={styles.rectangleShapeView}>
                                <Pressable onPress={() => sub()}><Image style={{ height: 24, width: 24 }}
                                    source={require('../assest/sub.png')}
                                /></Pressable>
                                <Text style={{ color: "#707070", fontWeight: "normal", fontSize: 14 }}>{quantity}</Text>
                                <Pressable onPress={() => add()}><Image style={{ height: 24, width: 24 }}
                                    source={require('../assest/add.png')}
                                /></Pressable>
                            </View>


                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 5 }}>

                                <Image style={{ height: 15, width: 15, marginEnd: 2 }}
                                    source={require('../assest/share.png')}
                                />

                                <Text style={{ color: "#1D3557", fontWeight: "bold", fontSize: 14, marginStart: 3 }}>share</Text>

                            </View>
                            <Text style={{ color: "#1D3557", fontWeight: "bold", fontSize: 14, marginStart: 30 }}>${productItem.price}</Text>
                        </View>

                        <TouchableOpacity onPress={() =>addToCart()}><View style={styles.button}>

                            <Image
                                source={require('../assest/cart.png')}
                                style={{ height: 15, width: 15, marginEnd: 10 }}
                            />

                            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 12 }}>Add to Cart</Text>

                        </View></TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
        <StatusBar hidden={false} barStyle= 'light-content' backgroundColor="#0076B5" />
        </>
    )



}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrap: {
        width: WIDTH,
        borderRadius: 5,
        height: HEIGHT * 0.40
    },
    wrapDot: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        alignSelf: "center"
    },
    dotActive: {
        margin: 1,
        fontSize: 12,
        color: "#098DD4"
    },
    dot: {
        margin: 1,
        fontSize: 12,
        color: "#fff"
    },
    rectangleShapeView: {
        width: 45 * 2,
        height: 25,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        borderColor: "#098DD4",
        borderWidth: 0.5,
        borderRadius: 5

    },
    button: {
        backgroundColor: "#0076B5",
        color: "white",
        borderRadius: 50,
        marginTop: 20,
        marginBottom: 15,
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        paddingVertical: 13,
        borderRadius: 5,
        alignItems: "center",
        textAlign: "center",
        textAlignVertical: "center"
    }




});

export default ProductDetail