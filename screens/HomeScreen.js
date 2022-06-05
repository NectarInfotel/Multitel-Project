import React, { useState, useRef, useEffect } from 'react';
import {
    TouchableOpacity,
    StyleSheet, Pressable,
    View, FlatList, Alert,
    Text, ScrollView, Animated, ImageBackground,
    SafeAreaView, Image, Dimensions,StatusBar
} from 'react-native';
import HomeNetworkCart from './HomeNetworkCart';
import HomeEquipmentCart from './HomeEquipmentCart';
import HomeCPECart from './HomeCPECart';
import HomeServicesCart from './HomeServicesCart';
import ActivityLoader from './ActivityLoader'
import NetInfo from '@react-native-community/netinfo'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import './langauge/i18n';

import Paginator from './Paginator';




const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height



const HomeScreen = ({ navigation }) => {


    const [imgActive, setImgActive] = useState(0);
    const [netInfo, setNetInfo] = useState('');
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [listCPE, setListCPE] = useState([])
    const [listCategory, setListCategory] = useState([])
    const [listCms, setListCms] = useState([])
    const [listProduct, setListProduct] = useState([])
    const [listEquipment, setListEquipment] = useState([])
    const [currentLanguage, setLanguage] = useState('po');
    const { t, i18n } = useTranslation();
    let viewableItemChanged = 0;

    const slidesRef = useRef(null)
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current
    const scrollx = useRef(new Animated.Value(0)).current


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
            selectedLangauge()
            return () => {
            };
        }, [])
    );

    const selectedLangauge=async()=>{

        const token=  await AsyncStorage.getItem("access_token")
        const langauge = await AsyncStorage.getItem("langauge");
          
        if(langauge!=null)
        {
            changeLanguage(langauge)
        }else{
            changeLanguage("en") 
        }

    }


    useFocusEffect(
        React.useCallback(() => {

            getCms()



            setImages(['https://th.bing.com/th/id/R.10e45df92f7f63c83d8168d4cde3b634?rik=PXrvDO8FJ2uJyg&riu=http%3a%2f%2fwww.wallpapers13.com%2fwp-content%2fuploads%2f2016%2f01%2fSunset-Background-Images-Hd-Sunset-background-images-hd-07329-1920x1200.jpg&ehk=4ra5RZwmXytaGIl8f4o3aMq2gjJS14dJp1PsbjysjjA%3d&risl=&pid=ImgRaw&r=0',
                'https://th.bing.com/th/id/R.5b363881406235d4848b5f94b163726b?rik=a%2fw8sd7qAhGSKQ&riu=http%3a%2f%2fwallup.net%2fwp-content%2fuploads%2f2016%2f01%2f228364-nature-sunset-landscape.jpg&ehk=%2fFUG91L3wUlELEqB45OcI8utn8LI%2fo%2bk6XXSMPpbHDk%3d&risl=&pid=ImgRaw&r=0',
                'https://th.bing.com/th/id/R.2045535245e06e0de2867009d4f16bc4?rik=uWheX1HTPs7mPQ&riu=http%3a%2f%2fwonderfulengineering.com%2fwp-content%2fuploads%2f2014%2f01%2fhighway-wallpaper.jpg&ehk=SqDOWxuC5Ji%2bjqg7%2birB%2bCCKFphLjfeSBzIjqplFTxg%3d&risl=&pid=ImgRaw&r=0',
            ])
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

    const getProductService = async () => {
        const token = await AsyncStorage.getItem("access_token")
        NetInfo.fetch().then((state) => {

            if (state.isConnected) {


                // setIsLoading(true)
                // let data={userName:'kindal@getnada.com',password:'Shubh@1992'}
                let data = { slug: "other-productsservices-1" }
                fetch("http://50.28.104.48:3003/api/product/getProductsByCategory", {
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

                            let count = 0
                            let dataArr = []


                            for (let userObject of res.data.products) {
                                count++
                                if (count <= 3) {
                                    dataArr.push(userObject)
                                } else {
                                    break
                                }

                            }



                            setListProduct(dataArr)
                            console.log(dataArr)
                            // success(res.massage,res)
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


    const getNetworkEquipment = async () => {
        const token = await AsyncStorage.getItem("access_token")
        NetInfo.fetch().then((state) => {

            if (state.isConnected) {


                setIsLoading(true)
                // let data={userName:'kindal@getnada.com',password:'Shubh@1992'}
                let data = { slug: "network-equipments" }
                fetch("http://50.28.104.48:3003/api/product/getProductsByCategory", {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify(data)
                }).then((result) => {

                    result.json().then((res) => {
                        // setIsLoading(false)
                        let count = 0
                        let dataArr = []
                        if (res.code == 200) {

                            for (let userObject of res.data.products) {
                                count++
                                if (count <= 3) {
                                    dataArr.push(userObject)
                                } else {
                                    break
                                }

                            }

                            setListEquipment(dataArr)
                            console.log(JSON.stringify(listEquipment))
                            getCpe()

                            // success(res.massage,res)
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

    if (isLoading) {
        return (
            <ActivityLoader />
        )


    }

    const getCpe = async () => {


        const token = await AsyncStorage.getItem("access_token")
        console.log("token===" + token)
        NetInfo.fetch().then((state) => {

            if (state.isConnected) {

                // setIsLoading(true)
                // let data={userName:'kindal@getnada.com',password:'Shubh@1992'}
                let data = { slug: "cpe-2" }
                fetch("http://50.28.104.48:3003/api/product/getProductsByCategory", {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify(data)
                }).then((result) => {

                    result.json().then((res) => {
                        // setIsLoading(false)

                        let count = 0
                        let dataArr = []

                        if (res.code == 200) {

                            for (let userObject of res.data.products) {
                                count++
                                if (count <= 3) {
                                    dataArr.push(userObject)
                                } else {
                                    break
                                }

                            }

                            setListCPE(dataArr)
                            console.log(JSON.stringify(listCPE))

                            getProductService()

                            // success(res.massage,res)
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
    const failure = (msg) => {
        setIsLoading(false)
        Alert.alert("Failure", msg, [
            { text: 'Okay' }
        ])

    }

    const getCategory = async () => {


        const token = await AsyncStorage.getItem("access_token")
        console.log("token===" + token)
        NetInfo.fetch().then((state) => {

            if (state.isConnected) {

                setIsLoading(true)
                // let data={userName:'kindal@getnada.com',password:'Shubh@1992'}

                fetch("http://50.28.104.48:3003/api/product/getAllCategory", {
                    method: 'get',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }).then((result) => {

                    result.json().then((res) => {
                        // setIsLoading(false)

                        let count = 0
                        let dataArr = []

                        if (res.code == 200) {

                            for (let userObject of res.data) {
                                count++
                                if (count <= 4) {
                                    dataArr.push(userObject)
                                } else {
                                    break
                                }

                            }

                            setListCategory(dataArr)
                            console.log(JSON.stringify(listCategory))

                            getNetworkEquipment()

                            // success(res.massage,res)
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


    const getCms = async () => {


        const token = await AsyncStorage.getItem("access_token")
        console.log("token===" + token)
        NetInfo.fetch().then((state) => {

            if (state.isConnected) {

                setIsLoading(true)
                // let data={userName:'kindal@getnada.com',password:'Shubh@1992'}

                fetch("http://50.28.104.48:3003/api/cms/getAllCms", {
                    method: 'get',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }).then((result) => {

                    result.json().then((res) => {
                        // setIsLoading(false)

                        let count = 0
                        let dataArr = []

                        if (res.code == 200) {

                            for (let userObject of res.data) {
                                count++
                                if (count <= 4) {
                                    dataArr.push(userObject)
                                } else {
                                    break
                                }

                            }

                            setListCms(dataArr)
                            console.log(JSON.stringify(listCms))

                            getCategory()

                            // success(res.massage,res)
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


    const checkInternet = () => {
        Alert.alert("Alert", "Please check internet", [
            { text: 'Okay' }
        ])

    }









    const onChange = (nativeEvent) => {

        if (nativeEvent) {

            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)

            if (slide != imgActive) {
                setImgActive(slide)
            }
        }

    }

    // const onChangePager = (nativeEvent) => {

    //     if (nativeEvent) {

    //         // Animated.event([{ nativeEvent: { contentOffset: { x: scrollx } } }], {
    //         //     useNativeDriver: false,
    //         // })

    //          const  slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)

    //           if (slide != imgActive) {
    //               setImgActive(slide)
    //           }
    //     }

    // }






    const imageView = (item) => {

        return (
            <ImageBackground imageStyle={{ borderRadius: 5}} style={styles.wrap} source={{ uri: `http://50.28.104.48:3003/images/${item.image}` }}>

                <View style={[styles.wrap,{paddingHorizontal:15,flex:1}]}>
                    <Text style={{ color: "white", fontWeight: "normal", fontSize: 16, marginTop: 20 }}>{item.name}</Text>
                    <Text style={{ color: "white", fontWeight: "normal", fontSize: 14, marginTop: 10 }}>{item.description}</Text>

                    <View style={[styles.rectangleShapeView,{marginTop:10,paddingHorizontal:3}]}>

                        <Text style={{ color: "black", fontWeight: "normal", fontSize: 8 }}>{t('Know More')}</Text>

                    </View>
                </View>

            </ImageBackground>

        )
    }

    const showCategory = (item) => {

        return (
            <View style={{ alignItems: "center", marginEnd: 20, marginTop: 15 }}>

                <Image
                    source={{ uri: `http://50.28.104.48:3003/images/${item.image}` }}
                    style={{ height: 70, width: 70, borderRadius: 140 / 2 }}
                />


                <Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 14, marginTop: 10 }}>{item.name}</Text>
            </View>
        )
    }

    return (
        <>
        <StatusBar hidden={false} barStyle= 'light-content' backgroundColor="#0076B5" />
        <SafeAreaView style={styles.container}>
            <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
                <View style={{ flexDirection: "row", width: "100%", backgroundColor: "#FAFAFA", height: 60, alignItems: "center" }}>
                    <TouchableOpacity onPress={() => { navigation.openDrawer() }}><Image
                        source={require('../assest/menu.png')}
                        style={{ height: 15, width: 15, marginStart: 20 }}
                    /></TouchableOpacity>


                    <Image
                        source={require('../assest/header_ic.png')}
                        style={{ height: 30, width: 100, marginStart: 20 }}
                    />
                    <View style={{ flex: 1 }}></View>
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
                    /></TouchableOpacity>
                </View>
                <ScrollView style={{ backgroundColor: "#FFFFFF" }}>
                    <View style={{ height: HEIGHT * 0.30 }}>
                        <FlatList
                            data={listCms}
                            renderItem={({ item }) => imageView(item)}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled
                            bounces={false}
                            keyExtractor={(item) => item.id}
                            onScroll={
                                Animated.event([{ nativeEvent: { contentOffset: { x: scrollx } } }], {
                                    useNativeDriver: false,

                                })

                            }
                            scrollEventThrottle={32}

                            onViewableItemsChanged={viewableItemChanged}
                            viewabilityConfig={viewConfig}
                            ref={slidesRef}

                        />

                        <Paginator data={images} scrollx={scrollx} />
                    </View>


                    <View style={{ paddingHorizontal: 15 }}>

                        <View style={{ flexDirection: "row", width: "100%", marginTop: 15, justifyContent: "space-between" }}>
                            <Text style={{ alignItems: "flex-start", color: "#1D3557", fontWeight: "bold", fontSize: 14, }}>{t('Browse by Category')}</Text>
                            <Pressable onPress={() => { navigation.navigate("CategoryStack", { screen: "Category" }) }}><Text style={{ alignItems: "flex-start", color: "#098DD4", fontWeight: "normal", fontSize: 12, }}>{t('See More')}</Text></Pressable>
                        </View>

                        {/*
                    <View style={{ flexDirection: "row", justifyContent: "space-between",marginTop:20 }}>

                        <View style={{ alignItems: "center" }}>
                          
                                <Image
                                    source={{uri :'https://th.bing.com/th?q=Samsung+Dual+Sim+Android+Phone&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.56&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247'}}
                                    style={{ height: 70, width: 70,borderRadius:140/2 }}
                                />

                         
                            <Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 14, marginTop: 10 }}>Cell Phone</Text>
                        </View>

                        <View style={{ alignItems: "center" }}>
                           
                                <Image
                                   source={{uri :'https://th.bing.com/th?q=Samsung+Dual+Sim+Android+Phone&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.56&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247'}}
                                   style={{ height: 70, width: 70,borderRadius:140/2 }}
                                />

                          
                            <Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 14, marginTop: 10 }}>Cell Phone</Text>
                        </View>

                        <View style={{ alignItems: "center" }}>
                           
                                <Image
                                   source={{uri :'https://th.bing.com/th?q=Samsung+Dual+Sim+Android+Phone&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.56&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247'}}
                                   style={{ height: 70, width: 70,borderRadius:140/2 }}
                                />

                          
                            <Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 14, marginTop: 10 }}>Cell Phone</Text>
                        </View>

                        <View style={{ alignItems: "center" }}>
                           
                                <Image
                                  source={{uri :'https://th.bing.com/th?q=Samsung+Dual+Sim+Android+Phone&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.56&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247'}}
                                  style={{ height: 70, width: 70,borderRadius:140/2 }}
                                />

                            
                            <Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 14, marginTop: 10 }}>Cell Phone</Text>
                        </View>


                    </View> */}


                        <View>
                            <ScrollView
                                onScroll={({ nativeEvent }) => { onChange(nativeEvent) }}
                                showsHorizontalScrollIndicator={false}
                                pagingEnabled
                                horizontal

                            >
                                {
                                    listCategory.map((e, index) =>
                                        showCategory(e)
                                    )
                                }


                            </ScrollView>
                        </View>

                        <View>
                            <ScrollView
                                onScroll={({ nativeEvent }) => { onChange(nativeEvent) }}
                                showsHorizontalScrollIndicator={false}
                                pagingEnabled
                                horizontal

                            >
                                {
                                    images.map((e, index) =>
                                        <HomeNetworkCart />
                                    )
                                }


                            </ScrollView>
                        </View>

                        <View style={{ flexDirection: "row", width: "100%", marginTop: 30, justifyContent: "space-between" }}> 
                            <Text style={{ alignItems: "flex-start", color: "#1D3557", fontWeight: "bold", fontSize: 14, }}>{t('Internet Services')}</Text>
                            <Text style={{ alignItems: "flex-start", color: "#098DD4", fontWeight: "normal", fontSize: 12, }}>{t('See More')}</Text>
                        </View>

                        <View>
                            <ScrollView
                                onScroll={({ nativeEvent }) => { onChange(nativeEvent) }}
                                showsHorizontalScrollIndicator={false}
                                pagingEnabled
                                horizontal

                            >
                                {
                                    images.map((e, index) =>
                                        <HomeNetworkCart />
                                    )
                                }


                            </ScrollView>
                        </View>

                        <View style={{ flexDirection: "row", width: "100%", marginTop: 30, justifyContent: "space-between" }}>
                            <Text style={{ alignItems: "flex-start", color: "#1D3557", fontWeight: "bold", fontSize: 14, }}>{t('Network Equipment')}</Text>
                            <Pressable onPress={() => { navigation.navigate("NetworkEquipment") }}><Text style={{ alignItems: "flex-start", color: "#098DD4", fontWeight: "normal", fontSize: 12, }}>{t('See More')}</Text></Pressable>
                        </View>


                        <View>
                            <ScrollView

                                showsHorizontalScrollIndicator={false}
                                pagingEnabled
                                horizontal

                            >
                                {
                                    listEquipment.map((e, index) =>
                                        <HomeEquipmentCart item={e} />
                                    )
                                }


                            </ScrollView>
                        </View>


                        <View style={{ flexDirection: "row", width: "100%", marginTop: 30, justifyContent: "space-between" }}>
                            <Text style={{ alignItems: "flex-start", color: "#1D3557", fontWeight: "bold", fontSize: 14, }}>{t('CPE')}</Text>
                            <Pressable onPress={() => { navigation.navigate("CPE") }}><Text style={{ alignItems: "flex-start", color: "#098DD4", fontWeight: "normal", fontSize: 12, }}>{t('See More')}</Text></Pressable>
                        </View>

                        <View>
                            <ScrollView

                                showsHorizontalScrollIndicator={false}
                                pagingEnabled
                                horizontal

                            >
                                {
                                    listCPE.map((e, index) =>
                                        <HomeCPECart item={e} />
                                    )
                                }


                            </ScrollView>
                        </View>

                        <View style={{ flexDirection: "row", width: "100%", marginTop: 30, justifyContent: "space-between" }}>
                            <Text style={{ alignItems: "flex-start", color: "#1D3557", fontWeight: "bold", fontSize: 14, }}>{t('other product')}</Text>
                            <Pressable onPress={() => { navigation.navigate("ProductService") }}><Text style={{ alignItems: "flex-start", color: "#098DD4", fontWeight: "normal", fontSize: 12, }}>{t('See More')}</Text></Pressable>
                        </View>


                        <View style={{ marginBottom: 20 }}>
                            <ScrollView

                                showsHorizontalScrollIndicator={false}
                                pagingEnabled
                                horizontal

                            >
                                {
                                    listProduct.map((e, index) =>
                                        <HomeServicesCart item={e} t={t} />
                                    )
                                }


                            </ScrollView>
                        </View>

                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
        </>
    )



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA"
    },
    wrap: {
        width: Dimensions.get('window').width,
        borderRadius: 10,
        marginHorizontal: 10,
        height: Dimensions.get('window').height * 0.25
    },
    wrapDot: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        alignSelf: "center"
    },
    dotActive: {
        margin: 1,
        fontSize: 25,
        color: "#098DD4"
    },
    dot: {
        margin: 1,
        fontSize: 25,
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
    },
    rectangleShapeView: {
        width: 30 * 2,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 5

    }




});
export default HomeScreen;