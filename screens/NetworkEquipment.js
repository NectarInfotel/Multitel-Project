import React, { useState,useEffect } from 'react';
import {
    KeyboardAvoidingView,SafeAreaView, Button, View,Alert, Image, StatusBar, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, TextInput
} from "react-native";
import ActivityLoader from './ActivityLoader'
import NetInfo from '@react-native-community/netinfo'
import AsyncStorage  from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import './langauge/i18n';
import MyNetworkCart from './MyNetworkCart';

// import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';







// const DATA = [
//     {
//         id: 1,
//         name: "Jorge Rau",
//         image:'https://www.apple.com/newsroom/images/product/os/ios/standard/Apple_ios14-app-library-screen_06222020_inline.jpg.large.jpg'
//     },
//     {
//         id: 2,
//         name: "Rohan",
//         image:'https://www.apple.com/newsroom/images/product/os/ios/standard/Apple_ios14-app-library-screen_06222020_inline.jpg.large.jpg'
//     },
//     {
//         id: 3,
//         name: "Zahan",
//         image:'https://www.apple.com/newsroom/images/product/os/ios/standard/Apple_ios14-app-library-screen_06222020_inline.jpg.large.jpg'
//     },
// ];

const numColumns=2
// export default class NetworkEquipment extends Component {

const NetworkEquipment = ({ navigation }) =>{

    const [netInfo, setNetInfo] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [listEquipment, setListEquipment] = useState([])
    const [currentLanguage, setLanguage] = useState('po');
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

    // useEffect(() => {
    //     changeLanguage(currentLanguage)
    // }, []);


    useEffect(() => {
        setIsLoading(true)
        setListEquipment([])
        getNetworkEquipment()
    }, []);


    const changeLanguage = value => {
        i18n
            .changeLanguage(value)
            .then(() => setLanguage(value))
            .catch(err => console.log(err));
    };

  const formatData=(dataList,numColumns)=>{
        const totalRows=Math.floor(dataList.length/numColumns)
        let totalLastRow=dataList.length-(totalRows*numColumns)

        while(totalLastRow!==0 && totalLastRow!==numColumns)
        {
            dataList.push( {
                id: "blank",
                name: "Zahan",
                description:"",
                empty:true,
                cover_img:'https://www.apple.com/newsroom/images/product/os/ios/standard/Apple_ios14-app-library-screen_06222020_inline.jpg.large.jpg'
            }) 
            totalLastRow++ 
        }
           return dataList
    }

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

    const success = (msg,res) => {
        Alert.alert("Success", msg, [
            { text: 'Okay'}
        ])
    }

    const failure = (msg) => {
        Alert.alert("Failure", msg, [
            { text: 'Okay' }
        ])

    }

    const getNetworkEquipment =async() => {
        const token=  await AsyncStorage.getItem("access_token")
        const langauge = await AsyncStorage.getItem("langauge");
          
        if(langauge!=null)
        {
            changeLanguage(langauge)
        }else{
            changeLanguage("en") 
        }
        NetInfo.fetch().then((state) => {

            if (state.isConnected) {
           
              
                // setIsLoading(true)
                let data={slug:"network-equipments"}
                fetch("http://50.28.104.48:3003/api/product/getProductsByCategory", {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization':token
                    },
                    body: JSON.stringify(data)
                }).then((result) => {

                    result.json().then((res) => {
                        setIsLoading(false)
                        if (res.code == 200) {
                            setListEquipment(res.data.products)
                            console.log(JSON.stringify(listEquipment))
                            // success(res.massage,res)
                        } else {
                          
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


    const addFavorite =async(item) => {
        const token=  await AsyncStorage.getItem("access_token")
        const userId = await AsyncStorage.getItem("userId")
        NetInfo.fetch().then((state) => {

            if (state.isConnected) {
           
                
                console.log("token==="+token)
                setIsLoading(true)
                // let data={userName:'kindal@getnada.com',password:'Shubh@1992'}
                let data={userId:userId,id:item.id}
                fetch("http://50.28.104.48:3003/api/cart/addFavCart", {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization':token
                    },
                    body: JSON.stringify(data)
                }).then((result) => {

                    result.json().then((res) => {
                        setIsLoading(false)
                        if (res.code == 200) {
                            // setListCPE(res.data.products)
                            // console.log(JSON.stringify(listCPE))
                            success(res.massage,res)
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


        return (
            <>
            <StatusBar hidden={false} barStyle= 'light-content' backgroundColor="#0076B5" />
            <SafeAreaView style={styles.container}>
                <View style={{backgroundColor:"#fff",flex:1}}>
                <View style={{ flexDirection: "row", width: "100%", backgroundColor: "#FAFAFA", height: 60, alignItems: "center" }}>
                        <TouchableOpacity onPress={() => { navigation.openDrawer() }}><Image
                            source={require('../assest/menu.png')}
                            style={{ height: 15, width: 15, marginStart: 20 }}
                        /></TouchableOpacity>


                        <Image
                            source={require('../assest/header_ic.png')}
                            style={{ height: 30, width: 100, marginStart: 20 }}
                        />
                        <View style={{flex:1}}></View>
                        <Image
                            source={require('../assest/sreach.png')}
                            style={{ height: 35, width: 35,marginEnd:15 }}
                        />
                         <TouchableOpacity onPress={() => { navigation.navigate("Wishlist",{screen:"EditProfile"})}}><Image
                            source={require('../assest/user_header.png')}
                            style={{ height: 35, width: 35,marginEnd:15 }}
                        /></TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => { navigation.navigate("MyCartScreen")}}><Image
                            source={require('../assest/buged.png')}
                            style={{ height: 35, width: 35,marginEnd:15 }}
                        /></TouchableOpacity>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:10,alignItems:"center"}}>
                    <Text style={{fontWeight:"bold" ,color:"#1D3557",fontSize:15,marginStart:20}}>{t('Network Equipment')}</Text>
                    <Image
                            source={require('../assest/filter.png')}
                            style={{ height: 15, width: 15,marginEnd:20 }}
                        />
                    </View>
                    <FlatList style={{marginTop:10}}
                    data={formatData(listEquipment,numColumns)}
                    numColumns={2}
                    renderItem={({ item }) =>MyNetworkCart(item,navigation,addFavorite,t)}
                    keyExtractor={(item) => item.uid}
                />

              

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


    button: {
        backgroundColor: "#0076B5",
        color: "white",
        borderRadius: 50,
        justifyContent: "center",
        height: 50,
        marginBottom:30,
        marginEnd:20,
        marginStart:20,
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
        marginBottom:3
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
        marginEnd:8,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        borderColor:"#098DD4",
        borderWidth:1,
        borderRadius:20
       
        },
    box2: {
        justifyContent: 'space-evenly',
        height: '50%',
        paddingHorizontal: 30
    }
});

export default NetworkEquipment