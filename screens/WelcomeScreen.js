import React, { useState,useEffect } from 'react';
import {
    KeyboardAvoidingView, Button, View, Image, StatusBar, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, TextInput
} from "react-native";
import {useTranslation} from 'react-i18next';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import './langauge/i18n';

const WelcomeScreen = ({ navigation }) =>{  
    
    const {t, i18n} = useTranslation();
  
    const [currentLanguage,setLanguage] =useState('en');
    
    useEffect(()=>{
        getSelectedLangauge()
    },[])

    const getSelectedLangauge=async()=>{

        const langauge = await AsyncStorage.getItem("langauge");
          
        if(langauge!=null)
        {
            changeLanguage(langauge)
        }else{
            changeLanguage("en") 
        }

    }

    const changeLanguage = value => {
        i18n
          .changeLanguage(value)
          .then(() => setLanguage(value))
          .catch(err => console.log(err));
      };

        return (
            <>
            <StatusBar hidden={false} barStyle= 'light-content' backgroundColor="#0076B5" />
            <View style={styles.parentView}>
                <ScrollView>
                    <View style={styles.scrollView}>

                        <View style={{ alignItems: "center", justifyContent: "center", paddingVertical: 70 }}>
                            <Image style={{ height: 300, width: "100%" }}
                                source={require('../assest/welcome.png')}
                            />

                        </View>


                        <Text style={styles.superFastText}>{t('Private. Secure. Super Fast')}</Text>

                        <Text style={styles.headerText}>{t('The Internet you Deserve')}</Text>

                        <View style={{ height: 100, width: "100%", marginBottom: 10, marginTop: 30, justifyContent: "center", alignItems: "center" }}>
                            <Image style={{ height: 65, width: "100%" }}
                                source={require('../assest/device.png')}
                            />

                        </View>


                        
                        <TouchableOpacity onPress={()=>navigation.navigate('SignIn')}><Text style={styles.button}>{t('Let Started')}</Text></TouchableOpacity>

                        <TouchableOpacity onPress={() => {}}><Text style={styles.paragraph}>
                            {t('By continuing, I agree to the')}{" "}
                            <Text style={styles.highlight}>{t('terms and conditions')}</Text>
                        </Text></TouchableOpacity> 

                         

                    </View>


                </ScrollView>
            </View>
            </>
        )
    


}

export default WelcomeScreen

const styles = StyleSheet.create({
    parentView: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 40
    },
    textBackground: {

        backgroundColor: '#FFFFFF',
        width: "100%",
        marginTop: 25,
        flexDirection: "row",
        height: 50,
        borderColor: '#EEF3F7',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center"

    },
    button: {
        backgroundColor: "#0076B5",
        color: "white",
        borderRadius: 50,
        width: "100%",
        justifyContent: "center",
        height: 50,
        marginTop: 40,
        borderRadius: 5,
        alignItems: "center",
        textAlign: "center",
        textAlignVertical: "center"
    },
    buttonText: {
        color: "white"
    },
    headerText: {
        color: '#1D3557',
        marginTop: 10,
        fontWeight: "bold",
        fontSize: 20
    },
    superFastText: {
        color: '#707070',
        marginTop: 30,
        fontWeight: "regular",
        fontSize: 14
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
        marginTop: 20,
        fontSize: 14,
        textAlign:'center',
        fontWeight: "normal",
        color: "#707070",
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
    box2: {
        justifyContent: 'space-evenly',
        height: '50%',
        paddingHorizontal: 30
    }
});