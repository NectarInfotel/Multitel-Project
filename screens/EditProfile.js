import React, { useState, useEffect } from 'react';
import RadioGroup from 'react-native-radio-buttons-group';
import {
    KeyboardAvoidingView, SafeAreaView, Platform, Button, Alert, View, Image, StatusBar, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, TextInput
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useIsFocused,useFocusEffect } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import ActivityLoader from './ActivityLoader'
import NetInfo from '@react-native-community/netinfo'
import AsyncStorage  from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import './langauge/i18n';


const EditProfile = ({ navigation }) => {

   
    const [isPickerShow, setIsPickerShow] = useState(false);
    const [date, setDate] = useState(new Date(Date.now()));
    const [netInfo, setNetInfo] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [imageUrl, setImageUrl] = useState('')
    const [imageType, setImageType] = useState('')
    const [name, setName] = useState('')
    const [emails, setEmail] = useState('')
    const [updateRes, setUpdateRes] = useState(false)
    

    const [isFirstName, setIsFirstName] = useState(false)
    const [isEmailEmty, setIsEmailEmty] = useState(false)
    const [isEmailCorrect, setIsEmailCorrect] = useState(false)
    const [isDob, setIsDob] = useState(false)
    const [isGender, setIsGender] = useState(false)
    const [isProfileImg, setIsProfileImg] = useState(false)
    const [currentLanguage,setLanguage] =useState('po');
    const {t, i18n} = useTranslation();
  
  


      const changeLanguage = value => {
        i18n
          .changeLanguage(value)
          .then(() => setLanguage(value))
          .catch(err => console.log(err));
      };
    
    const [error, setError] = useState({
        errorFirstName: 'Please enter full name',
        errorEmail: 'Please enter email',
        errorCorrectEmail: 'Please enter correct email',
        errorDob: 'Please enter DOB',
        errorGender: 'Please select gender',
        errorProfileImage: 'Please select profile image',

    })

    const showPicker = () => {
        setIsPickerShow(true);
        console.log(isPickerShow)
    };

    const onChange = (event, value) => {
        setIsPickerShow(false);
        setDate(value);
        let tempDate=new Date(value)
        let fDate=tempDate.getDate()+"/"+(tempDate.getMonth()+1)+"/"+tempDate.getFullYear()
     
        setDob(fDate)
    };


    const [radioButtonsData, setRadioButtonsData] = useState([{
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Male',
        value: 'Male',
        labelStyle: styles.radioLabel
    }, {
        id: '2',
        label: 'Female',
        value: 'Female',
        labelStyle: styles.radioLabel
    },
    {
        id: '3',
        label: 'Other',
        value: 'Other',
        labelStyle: styles.radioLabel
    }
    ])

    const updateForm=(res)=>{

    const data=res.data
    setName(data.first_name)
    const dateOfBirth=data.dob_date
    const gender=data.gendar
    let tempDate=new Date(dateOfBirth)
    let fDate=tempDate.getDate()+"/"+(tempDate.getMonth()+1)+"/"+tempDate.getFullYear()
    setDob(fDate)
    
    if(data.profile_img!=null)
    {
        const url= `http://50.28.104.48:3003/images/${data.profile_img}`
   
        setImageUrl(url)
    }
    
    console.log("===="+imageUrl)
    if(gender=="Male")
    {
    
        const arr = [...radioButtonsData]

        arr[0] = { id: '1',
        label: 'Male',
        selected:true,
        value: 'Male',
        labelStyle: styles.radioLabel}

        arr[1] = {  id: '2',
        label: 'Female',
        selected:false,
        value: 'Female',
        labelStyle: styles.radioLabel}


        arr[2] = {
            id: '3',
        label: 'Other',
        selected:false,
        value: 'Other',
        labelStyle: styles.radioLabel
    }




    setRadioButtonsData(arr);
    setGender("Male")
    console.log("===="+"Male")
    }else if(gender=="Female"){

        const arr = [...radioButtonsData]

     
      arr[0] = { id: '1',
        label: 'Male',
        selected:false,
        value: 'Male',
        labelStyle: styles.radioLabel}

        arr[1] = {  id: '2',
        label: 'Female',
        selected:true,
        value: 'Female',
        labelStyle: styles.radioLabel}

        
        arr[2] = {
            id: '3',
        label: 'Other',
        selected:false,
        value: 'Other',
        labelStyle: styles.radioLabel
        }

    setRadioButtonsData(arr);
    setGender("Female")
    console.log("===="+"Female")
    }else if(gender=="Other")
    {
        const arr = [...radioButtonsData]

        arr[0] = { id: '1',
        label: 'Male',
        selected:false,
        value: 'Male',
        labelStyle: styles.radioLabel}

        arr[1] = {  id: '2',
        label: 'Female',
        selected:false,
        value: 'Female',
        labelStyle: styles.radioLabel}

        arr[2] = {
            id: '3',
        label: 'Other',
        selected:true,
        value: 'Other',
        labelStyle: styles.radioLabel
    }
    setRadioButtonsData(arr);
    setGender("Other")
    console.log("===="+"Other")
    }
    
    

    }


    const getUserEmail = async function() {
        try {
            const email = await AsyncStorage.getItem("email");
            const access_token = await AsyncStorage.getItem("access_token");
            const langauge = await AsyncStorage.getItem("langauge");
          
            if(langauge!=null)
            {
                changeLanguage(langauge)
            }else{
                changeLanguage("en") 
            }
            
            setEmail(email)
            NetInfo.fetch().then((state) => {

                if (state.isConnected) {
    
                    setIsLoading(true)
                    fetch("http://50.28.104.48:3003/api/user/getUserByToken", {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization' :access_token
                        },
                    }).then((result) => {
    
                        result.json().then((res) => {
                            setIsLoading(false)
                            if (res.code == 200) {
                                setUpdateRes(true)
                                AsyncStorage.setItem("userDetail", JSON.stringify(res.data))
                                updateForm(res)
                           
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


        }catch(error)
        {

        }

            
    
}

const success = (res,msg) => {

    Alert.alert("Success", msg, [
        { text: 'Okay' }
    ])
}

const failure = (msg) => {
    Alert.alert("Failure", msg, [
        { text: 'Okay' }
    ])

}

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


    useFocusEffect(
        React.useCallback(() => {
           
            getSelectedLangauge()
            setGender('')
            setImageUrl('')
            setRadioButtonsData([{
                id: '1', // acts as primary key, should be unique and non-empty string
                label: 'Male',
                selected:false,
                value: 'Male',
                labelStyle: styles.radioLabel
            }, {
                id: '2',
                label: 'Female',
                selected:false,
                value: 'Female',
                labelStyle: styles.radioLabel
            },
            {
                id: '3',
                label: 'Other',
                selected:false,
                value: 'Other',
                labelStyle: styles.radioLabel
            }
            ])


         
            getUserEmail()
         
          return () => {
          };
        }, [])
      );

         

    const handleValidUser = (val) => {

        if (val.trim().length > 0) {
           
            setIsFirstName(false)
          
            return false
        } else {
            setIsFirstName(true)
           
            return true
        }

    }

    const handleValidDob = (val) => {

        if (val.trim().length > 0) {
           
            setIsDob(false)
          
            return false
        } else {
            setIsDob(true)
       
            return true
        }

    }


    const handleValidProfileImg = (val) => {

        if (val.trim().length > 0) {
            setIsProfileImg(false)
         
            return false
        } else {
            setIsProfileImg(true)
     
            return true
        }

    }


    const handleValidGender = (val) => {

        if (val.trim().length > 0) {
            console.log("gender="+val)
            setIsGender(false)
         
            return false
        } else {
            setIsGender(true)
            console.log("gender="+val)
            return true
        }

    }

    const handleValidEmail = (val) => {
        if (val.trim().length > 0) {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            if (reg.test(val) === true) {
                console.log("email="+val)
                setIsEmailCorrect(false)
                setIsEmailEmty(false)
                return false
            } else {
                setIsEmailCorrect(true)
                setIsEmailEmty(false)
                return true
            }

            setIsEmailEmty(false)
            return false
        } else {
            setIsEmailEmty(true)
            return true
        }

    }

    


    const submit =() => {

        NetInfo.fetch().then((state) => {

            if (state.isConnected) {

        
              const isName=  handleValidUser(name)
              const isEmail=handleValidEmail(emails)
              const isDob=handleValidDob(dob)
              const isGender=handleValidGender(gender)
              const isUrl=handleValidProfileImg(imageUrl)

                if (isName || isEmail || isDob || isGender || isUrl) {
                   
                    return
                }

                navigation.navigate('EditProfileTwo',{name:name,emailss:emails,dob:dob,gender:gender,imageUrl:imageUrl,imageType:imageType,userRes:updateRes})

              
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

    const openGallary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            setUpdateRes(false)
            console.log(image);
            setImageUrl(image.path)
            setImageType(image.mime)
            console.log(image.path);
        });
    }

    const openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            setUpdateRes(false)
            console.log(image.path);
            setImageUrl(image.path)
            setImageType(image.mime)
        });
    }

    const openDialog = () => {
        Alert.alert("Photo!", "Please select profile image", [
            { text: 'Camera', onPress: () => { openCamera() } },
            { text: 'Gallery', onPress: () => { openGallary() } }
        ])

    }

    if (isLoading) {
        return (
            <ActivityLoader />
        )


    }

    function onPressRadioButton(radioButtonsArray) {

        // let selected = radioButtonsArray.find(r => r.selected == true);
        // selected = selected ? selected.value : radioButtonsArray[0].value;
        //  console.log(JSON.stringify(radioButtonsArray))
        //  console.log(selected)
        //  alert(selected)
               let selected = radioButtonsData.find(r => r.selected == true);
                selected = selected ? selected.value : radioButtonsData[0].value;
                setGender(selected)
               setRadioButtonsData(radioButtonsArray);
      }

    return (
          <>
          <StatusBar hidden={false} barStyle= 'light-content' backgroundColor="#0076B5" />
        <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'position'}
        style={styles.container}>
         <SafeAreaView>  
        <View >
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
                }} >{t('Edit Profile')}</Text>
                <TouchableOpacity onPress={() => { navigation.navigate("Settings") }}><Image
                    source={require('../assest/setting_icon.png')}
                    style={{ height: 15, width: 15, marginStart: 20, marginEnd: 25 }}
                /></TouchableOpacity>
            </View>
            <View style={styles.parentView}>
                <ScrollView>
                    <View style={styles.scrollView}>
                        <View style={styles.childView}>
                            <View style={{ alignItems: "center", justifyContent: "center", marginTop: 30 }}>
                                <Image
                                    source={{ uri: imageUrl }}
                                    //borderRadius will help to make Round Shape
                                    style={{
                                        width: 100,
                                        height: 100,
                                        borderWidth: 1,
                                        borderColor: "#098DD4",
                                        borderRadius: 200 / 2
                                    }}
                                />

                                <TouchableOpacity style={{ left: 160}} onPress={() => openDialog()}><Image
                                    source={require('../assest/edit.png')}
                                    style={styles.icon}
                                />
                                </TouchableOpacity>
                            </View>
                            
                            {isProfileImg && <Text style={styles.errorText}>{t('Please select profile image')}</Text>}

                            <Text style={styles.subHeaderText}>{t('Name')}</Text>


                            <View style={styles.textBackground}>
                                <TextInput style={styles.text} placeholder={t('Please enter full name')}
                                value={name}  onChangeText={text => setName(text)}></TextInput>

                                <Image style={styles.image}
                                    source={require('../assest/user.png')}
                                />

                            </View>
                            {isFirstName && <Text style={styles.errorText}>{t('Please enter full name')}</Text>}

                            <Text style={styles.subHeaderText}>{t('Email Address')}</Text>

                            
                            <View style={styles.textBackground}>
                                <TextInput style={styles.text} placeholder={t('Please enter email')}
                                value={emails}
                                editable={false}
                                selectTextOnFocus={false}
                                autoCapitalize='none'
                                onChangeText={text =>setEmail(text)}></TextInput>

                                <Image style={styles.image}
                                    source={require('../assest/email_ic.png')}
                                />

                            </View>
                            {isEmailEmty && <Text style={styles.errorText}>{t('Please enter email')}</Text>}
                            {isEmailCorrect && <Text style={styles.errorText}>{t('Please enter correct email')}</Text>}

                            <Text style={styles.subHeaderText}>{t('Birthday')}</Text>


                            <View style={styles.textBackground}>
                                <TextInput style={styles.text} value={dob}
                                 editable={false}
                                 selectTextOnFocus={false}
                                onChangeText={text => setDob(text)}
                                    placeholder={t('Please select date of birth')}
                                ></TextInput>

                                <TouchableOpacity onPress={()=>showPicker()}><Image style={styles.image}
                                    source={require('../assest/calender_ic.png')}
                                /></TouchableOpacity>

                            </View>
                            {isDob && <Text style={styles.errorText}>{t('Please enter DOB')}</Text>}

                            {isPickerShow && (
                                <DateTimePicker
                                    value={date}
                                    mode={'date'}
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    is24Hour={true}
                                    onChange={onChange}
                                />
                            )}

                            <Text style={styles.subHeaderText}>{t('Gender')}</Text>
                        </View>

                        <View style={{ marginTop: 10, marginStart: 8 }}>
                            <RadioGroup
                                radioButtons={radioButtonsData}
                                onPress={onPressRadioButton}
                                layout='row'
                            />
                        </View>
                        
                        {isGender && <Text style={[styles.errorText,{marginStart:20}]}>{t('Please select gender')}</Text>}
                        <View></View>
                        <View style={{marginBottom:250,paddingStart:20,paddingEnd:30,backgroundColor: "#FFFFFF"} }>
                            <View style={{ flexDirection: "row", marginTop: 20 }}>
                                <TouchableOpacity style={{ flex: 1 }} ><Text style={styles.cancelButton}>{t('Cancel')}</Text></TouchableOpacity>
                                <TouchableOpacity style={{ flex: 1 }} onPress={() => submit()}><Text style={styles.button}>{t('Next')}</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>


                </ScrollView>
            </View>
         

        </View>
        </SafeAreaView> 
        </KeyboardAvoidingView>
        </>
    
    )
}




const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    parentView: {
        backgroundColor: '#FFFFFF'
    },
    childView: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,

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
        borderColor: '#EEF3F7',
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
        flex: 1,
        marginStart: 10,
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
    docker: {
        flex: 1,
        alignItems: 'center'
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
        margin: 24,
        fontSize: 14,
        fontWeight: "normal",
        textAlign: "center",
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
    errorText: {
        fontSize: 11,
        fontWeight: "bold",
        marginTop: 2,
        color: 'red'
    },
    box2: {
        justifyContent: 'space-evenly',
        height: '50%',
        paddingHorizontal: 30
    }
});

export default EditProfile