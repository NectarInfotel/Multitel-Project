import React, { useState,useEffect } from 'react';
import { useIsFocused,useFocusEffect } from '@react-navigation/native';
import RadioGroup from 'react-native-radio-buttons-group';
import ActionBar from './ActionBar';
import MyWhiteCart from './MyWhiteCart';
import {
    KeyboardAvoidingView, SafeAreaView, Button,Alert, View, Image, StatusBar, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, TextInput
} from "react-native";

import ActivityLoader from './ActivityLoader'
import NetInfo from '@react-native-community/netinfo'
import AsyncStorage  from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import './langauge/i18n';



const DATA = [
    {
        id: 1,
        name: "Jorge Rau",
        image:'https://www.apple.com/newsroom/images/product/os/ios/standard/Apple_ios14-app-library-screen_06222020_inline.jpg.large.jpg'
    },
    {
        id: 2,
        name: "Rohan",
        image:'https://www.apple.com/newsroom/images/product/os/ios/standard/Apple_ios14-app-library-screen_06222020_inline.jpg.large.jpg'
    },
    {
        id: 3,
        name: "Zahan",
        image:'https://www.apple.com/newsroom/images/product/os/ios/standard/Apple_ios14-app-library-screen_06222020_inline.jpg.large.jpg'
    },
];

const MyWhiteList = ({ navigation }) =>{

    const [netInfo, setNetInfo] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [listFav, setListFav] = useState([])
    const [emptyList, setEmptyList] = useState(false)
    const [currentLanguage, setLanguage] = useState('po');
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

//   useFocusEffect(
//     React.useCallback(() => {
//         changeLanguage(currentLanguage)
     
//       return () => {
//       };
//     }, [])
//   );

  useFocusEffect(
    React.useCallback(() => {
        setListFav([])
        getFavList()
     
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

    const deleteCart =async(item) => {
        const token=  await AsyncStorage.getItem("access_token")
        const userId = await AsyncStorage.getItem("userId")
        NetInfo.fetch().then((state) => {

            if (state.isConnected) {
           
                
                console.log("token==="+userId+" id="+item.product.id)
                setIsLoading(true)
                let data={userId:userId,id:item.product.id}
                fetch("http://50.28.104.48:3003/api/cart/favCartDataDelete", {
                    method: 'delete',
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

    const checkInternet = () => {
        Alert.alert("Alert", "Please check internet", [
            { text: 'Okay' }
        ])

    }

    const success = (msg) => {
        Alert.alert("Success", msg, [
            { text: 'Okay',onPress: () => {
                setListFav([])
                getFavList()
             } }
        ])
    }

    const failure = (msg) => {
        Alert.alert("Failure", msg, [
            { text: 'Okay' }
        ])

    }

    const ListEmptyView = () => {
        return (
          <View style={{flex:1,justifyContent:'center',alignContent:"center"}}>
     
            <Text style={{textAlign: 'center',color:"black"}}>{t('Sorry, No Data Present')}</Text>
     
          </View>
     
        );
      }



    const getFavList =async() => {

        const accessToken = await AsyncStorage.getItem("access_token");
        const langauge = await AsyncStorage.getItem("langauge");
          
        if(langauge!=null)
        {
            changeLanguage(langauge)
        }else{
            changeLanguage("en") 
        }
        const id = await AsyncStorage.getItem("userId")
         
          
   NetInfo.fetch().then((state) => {

       if (state.isConnected) {
      
           setIsLoading(true)
           let data={userId:id}
           fetch("http://50.28.104.48:3003/api/cart/getFavCartData", {
               method: 'post',
               headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                   'Authorization':accessToken
               },
               body: JSON.stringify(data)
           }).then((result) => {

               result.json().then((res) => {
                   setIsLoading(false)
                   if (res.code == 200) {
                    setListFav(res.data)
                       // console.log(JSON.stringify(res.data))
                    //    success(res.massage,res)

                    if(res.data.length>0)
                    {
                       setEmptyList(true)
                    }else{
                        setEmptyList(false)  
                    }
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
                    {emptyList?
                        <>
                          <Text style={{fontWeight:"bold" ,color:"#1D3557",fontSize:15,marginStart:20,marginTop:10}}>{t('My Wishlist')}</Text>
                   <FlatList style={{marginTop:10}}
                    data={listFav}
                    renderItem={({ item }) =>MyWhiteCart(item,deleteCart,t)}
                    keyExtractor={(item) => item.uid}
                />
                        
                        </>
                        :
                        <ListEmptyView/>
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

export default MyWhiteList