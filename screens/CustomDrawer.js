import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity, Pressable, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import ImagePicker from 'react-native-image-crop-picker';
import ActivityLoader from './ActivityLoader'
import NetInfo from '@react-native-community/netinfo'
import { useDrawerStatus, useDrawerProgress, createDrawerNavigator } from '@react-navigation/drawer';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import './langauge/i18n';
import { AuthContext } from './component/context';


const CustomDrawer = (props) => {
    const { navigation } = props
    const { signOut } = React.useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false)
    const [netInfo, setNetInfo] = useState('');
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [imageUrl, setImageUrl] = useState('')
    const [imageType, setImageType] = useState('')
    const [isWhoWe, setIsWhoWe] = useState(false)
    const [isTelecomunication, setIsTelecomunication] = useState(false)
    const [currentLanguage, setLanguage] = useState('en');
    const { t, i18n } = useTranslation();
    const isDrawerVisible = useDrawerStatus();



    useEffect(() => {
        console.log(currentLanguage)
        selectedLangauge()
        getUserDetail()

    }, [isDrawerVisible]);


    const selectedLangauge = async () => {

        const token = await AsyncStorage.getItem("access_token")
        const langauge = await AsyncStorage.getItem("langauge");

        if (langauge != null) {
            changeLanguage(langauge)
        } else {
            changeLanguage("en")
        }

    }

    const changeLanguage = value => {
        i18n
            .changeLanguage(value)
            .then(() => setLanguage(value))
            .catch(err => console.log(err));
    };

    const clearAppData = async function () {
        try {

            await AsyncStorage.removeItem("first_name");
            await AsyncStorage.removeItem("profile_img");
            await AsyncStorage.removeItem("access_token");
            await AsyncStorage.removeItem("email");
            await AsyncStorage.removeItem("userId");
            await AsyncStorage.removeItem("password");
            await AsyncStorage.removeItem("product");

            // const keys = await AsyncStorage.getAllKeys();
            // await AsyncStorage.multiRemove(keys);


            navigation.closeDrawer()
            signOut()
        } catch (error) {
            console.error('Error clearing app data.');
        }
    }

    const openGallary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            setImageUrl(image.path)
            setImageType(image.mime)
            console.log("path===" + image.path);
            console.log("path===" + image.mime);


            next(image)
        });
    }

    const openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            setImageUrl(image.path)
            setImageType(image.mime)
            console.log("path===" + image.path);
            console.log("path===" + image.path);
            console.log("path===" + image.mime);
            next(image)
        });
    }

    const openDialog = () => {
        Alert.alert("Photo!", "Please select profile image", [
            { text: 'Camera', onPress: () => { openCamera() } },
            { text: 'Gallery', onPress: () => { openGallary() } }
        ])

    }


    const next = (image) => {

        NetInfo.fetch().then((state) => {

            if (state.isConnected) {

                getAccessToken(image)
                // uploadImages()


            } else {
                checkInternet()
            }



        });


    }

    const success = (res, msg) => {
        // setImage(res.data.profile_img)
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

    const getAccessToken = async function (image) {
        try {
            let imgArr = image.path.split('/')
            let imageName = imgArr[imgArr.length - 1]
            console
            const accessToken = await AsyncStorage.getItem("access_token");

            const userId = await AsyncStorage.getItem("userId");

            console.log("ImageUrl===", image.path + "  type==" + image.mime + " name==" + imageName)


            setIsLoading(true)


            const data = new FormData();

            data.append("image", { uri: image.path, type: image.mime, name: imageName });

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


    // const uploadImages = async function () {
    //     try {
    //         let imgArr = imageUrl.split('/')
    //         let imageName = imgArr[imgArr.length - 1]
    //         console
    //         const accessToken = await AsyncStorage.getItem("access_token");

    //         const userId = await AsyncStorage.getItem("userId");

    //         setIsLoading(true)


    //         const data = new FormData();

    //         data.append("image", { uri: imageUrl, type: imageType, name: imageName });

    //         fetch("http://50.28.104.48:3003/api/user/updateProfile", {
    //             method: 'put',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'multipart/form-data',
    //                 'Authorization': accessToken
    //             },
    //             body: data
    //         }).then((result) => {

    //             result.json().then((res) => {
    //                 setIsLoading(false)
    //                 if (res.code == 200) {

    //                     success(res,res.massage)
    //                 } else {

    //                     failure(res.massage)
    //                 }
    //                 console.log(res)
    //             })

    //         })

    //     } catch (error) {
    //         setIsLoading(false)
    //         console.log(error);
    //     }
    // }


    const getUserDetail = async () => {
        const firstName = await AsyncStorage.getItem("first_name");
        const profileImg = await AsyncStorage.getItem("profile_img");
        setName(firstName)
        setImage(profileImg)
        console.log("====" + profileImg)
        // setIsLoading(false)

    }


    if (isLoading) {
        return (
            <ActivityLoader />
        )
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: "#098DD4" }}>
                <ImageBackground style={{ paddingVertical: 20 }} source={require('../assest/background.png')}>

                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Image
                            source={image == null ? require('../assest/drawer_user.png') : { uri: `http://50.28.104.48:3003/images/${image}` }}
                            //borderRadius will help to make Round Shape
                            style={{
                                width: 80,
                                height: 80,
                                borderWidth: 1,
                                borderColor: "#098DD4",
                                borderRadius: 160 / 2
                            }}
                        />
                        <View style={{
                            position: 'absolute',
                            top: 10,
                            right: 95
                        }}><TouchableOpacity onPress={() => openDialog()}><Image
                            source={require('../assest/edit.png')}
                            style={styles.icon}
                        /></TouchableOpacity></View>

                        <Text style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            marginTop: 15,
                            color: 'white'
                        }} >{name}</Text>

                        <View style={{
                            position: 'absolute',
                            right: 10,
                            bottom: 115
                        }}><TouchableOpacity onPress={() => { navigation.closeDrawer() }}><Image
                            source={require('../assest/cross.png')}
                            style={styles.iconCross}
                        /></TouchableOpacity></View>

                    </View>

                </ImageBackground>
            </View>


            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: "#098DD4" }}>

                <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>

                    <TouchableOpacity onPress={() => { navigation.navigate("Home", { screen: "Home" }) }}><View style={{ flexDirection: "row", marginStart: 20, paddingVertical: 15, alignItems: "center" }}>
                        <Image style={styles.image}
                            source={require('../assest/home.png')}
                        />
                        <Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 16, marginStart: 20 }}>{t('Multitel Home')}</Text>
                    </View></TouchableOpacity>


                    <TouchableOpacity onPress={() => { navigation.navigate("CategoryStack", { screen: "Category" }) }}><View style={{ flexDirection: "row", marginStart: 20, paddingVertical: 15, alignItems: "center" }}>
                        <Image style={styles.image}
                            source={require('../assest/category.png')}
                        />
                        <Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 16, marginStart: 20 }}>{t('Category')}</Text>
                    </View></TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate("Home", { screen: "InternetService" }) }}><View style={{ flexDirection: "row", marginStart: 20, paddingVertical: 15, alignItems: "center" }}>
                        <Image style={styles.image}
                            source={require('../assest/internet.png')}
                        />
                        <Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 16, marginStart: 20 }}>{t('Internet Services')}</Text>
                    </View></TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate("Home", { screen: "NetworkEquipment" }) }}><View style={{ flexDirection: "row", marginStart: 20, paddingVertical: 15, alignItems: "center" }}>
                        <Image style={styles.image}
                            source={require('../assest/network.png')}
                        />
                        <Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 16, marginStart: 20 }}>{t('Network Equipment')}</Text>
                    </View></TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate("Home", { screen: "CPE" }) }}><View style={{ flexDirection: "row", marginStart: 20, paddingVertical: 15, alignItems: "center" }}>
                        <Image style={styles.image}
                            source={require('../assest/cpe.png')}
                        />
                        <Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 16, marginStart: 20 }}>{t('CPE')}</Text>
                    </View></TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate("CategoryStack", { screen: "Category" }) }}><View style={{ flexDirection: "row", marginStart: 20, paddingVertical: 15, alignItems: "center" }}>
                        <Image style={styles.image}
                            source={require('../assest/order.png')}
                        />
                        <Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 16, marginStart: 20 }}>{t('Order')}</Text>
                    </View></TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate("NotificationScreen") }}><View style={{ flexDirection: "row", marginStart: 20, paddingVertical: 15, alignItems: "center" }}>
                        <Image style={styles.image}
                            source={require('../assest/notification.png')}
                        />
                        <Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 16, marginStart: 20 }}>{t('Notification')}</Text>
                    </View></TouchableOpacity>

                    <View style={{ height: 1, backgroundColor: "#EEF3F7", marginTop: 5 }}></View>
                    <View style={{ flexDirection: "row", marginStart: 20, paddingVertical: 15, alignItems: "center" }}>
                        {isWhoWe ? <Image style={styles.image}
                            source={require('../assest/question.png')}
                        /> : <Image style={styles.image}
                            source={require('../assest/digitotal.png')} />}
                        <TouchableOpacity onPress={() => { navigation.navigate("WhoWeAre") }}><Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 16, marginStart: 20 }}>{t('Who We Are')}</Text></TouchableOpacity><TouchableOpacity onPress={() => { setIsWhoWe(!isWhoWe) }}><View style={{ marginStart: 10 }}>
                            {isWhoWe ? <Image style={{ width: 10, height: 10 }}
                                source={require('../assest/arrow-up.png')}
                            /> : <Image style={{ width: 10, height: 10 }}
                                source={require('../assest/arrow_down.png')} />}
                        </View></TouchableOpacity>
                    </View>
                    {
                        isWhoWe && (<View style={{ marginStart: 50 }}>
                            <TouchableOpacity onPress={() => { navigation.navigate("ManagementMessage") }}><Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 15, marginStart: 20, paddingVertical: 5 }}>{t('Management Message')}</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate("MissionValues") }}><Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 15, marginStart: 20, paddingVertical: 5 }}>{t('Mission and Values')}</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate("News") }}><Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 15, marginStart: 20, paddingVertical: 5 }}>{t('News')}</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate("Recruitment") }}><Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 15, marginStart: 20, paddingVertical: 5 }}>{t('Recruitment')}</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate("Sustainability") }}><Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 15, marginStart: 20, paddingVertical: 5 }}>{t('Sustainability')}</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate("MultitelPride") }}><Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 15, marginStart: 20, paddingVertical: 5 }}>{t('Multitel Pride')}</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate("SocialResponsibility") }}><Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 15, marginStart: 20, paddingVertical: 5 }}>{t('Companys Social Bodies')}</Text></TouchableOpacity>

                        </View>)
                    }

                    <View style={{ flexDirection: "row", marginStart: 20, paddingVertical: 15, alignItems: "center" }}>
                       <Image style={styles.image}
                            source={require('../assest/smartphone.png')}
                        /> 
                        <TouchableOpacity onPress={() => { navigation.navigate("Telecomunication") }}><Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 16, marginStart: 20 }}>{t('Telecommunications')}</Text></TouchableOpacity><TouchableOpacity onPress={() => { 
                            setIsWhoWe(false)
                            setIsTelecomunication(!isTelecomunication) }}><View style={{ marginStart: 10 }}>
                            {isTelecomunication ? <Image style={{ width: 10, height: 10 }}
                                source={require('../assest/arrow-up.png')}
                            /> : <Image style={{ width: 10, height: 10 }}
                                source={require('../assest/arrow_down.png')} />}
                        </View></TouchableOpacity>
                    </View>
                    {
                        isTelecomunication && (<View style={{ marginStart: 50 }}>
                            <TouchableOpacity onPress={() => { navigation.navigate("PrivateNetwork") }}><Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 15, marginStart: 20, paddingVertical: 5 }}>{t('Private Networks')}</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate("Internet") }}><Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 15, marginStart: 20, paddingVertical: 5 }}>{t('Internet')}</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate("News") }}><Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 15, marginStart: 20, paddingVertical: 5 }}>{t('VSAT')}</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate("Recruitment") }}><Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 15, marginStart: 20, paddingVertical: 5 }}>{t('Video Conferencing')}</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate("Sustainability") }}><Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 15, marginStart: 20, paddingVertical: 5 }}>{t('CPEs')}</Text></TouchableOpacity>
                        </View>)
                    }

                </View>


            </DrawerContentScrollView >
            <View style={{ backgroundColor: "white", marginTop: 20 }}>
                <TouchableOpacity onPress={() => {
                    clearAppData()
                }}><View style={{ flexDirection: "row", marginStart: 20, paddingVertical: 15, alignItems: "center" }}>
                        <Image style={styles.image}
                            source={require('../assest/logout.png')}
                        />
                        <Text style={{ color: "#1D3557", fontWeight: "normal", fontSize: 16, marginStart: 20 }}>{t('Logout')}</Text>
                    </View></TouchableOpacity>

            </View>

        </View>
    )


}

const styles = StyleSheet.create({
    icon: {
        width: 25,
        height: 25
    },
    image: {
        width: 20,
        height: 20,
    },
    iconCross: {
        width: 12,
        height: 12
    },


});

export default CustomDrawer;