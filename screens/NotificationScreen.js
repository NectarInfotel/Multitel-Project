import React, { Component } from 'react';
import RadioGroup from 'react-native-radio-buttons-group';
import ActionBar from './ActionBar';
import {
    KeyboardAvoidingView, SafeAreaView, Button, View, Image, StatusBar, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, TextInput
} from "react-native";

// import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
// import RBSheet from "react-native-raw-bottom-sheet";
// import { Neomorph } from 'react-native-neomorph-shadows';
// import LinearGradient from 'react-native-linear-gradient';
// import { NeuView } from 'react-native-neu-element';
const axios = require('axios');

// import Helper from '../../helper/helper';
// import colors from '../../config/colors';
// import config from '../../config/config';
// import styles from '../../config/styles';
// import Footer from '../../components/Footer';
// import { strings } from '../../helper/i18n';
// import CustomTextInput from '../../components/CustomTextInput';
// import CustomTextView from '../../components/CustomeTextView';

var helper;
let isDarkMode;
let backgroundStyle;

const DATA = [
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        name: "Jorge Rau",
    },
    {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        name: "Rohan",
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        name: "Zahan",
    },
];




export default class NotificationScreen extends Component {


    constructor(props) {
        super(props);
        // helper = new Helper()

        //  backgroundStyle = {
        //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        // };

        this.state = ({
            radioButtonsData: [{
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
            ]
        })
    }

    componentDidMount = async () => {
    }



    // initLogin = async () => {
    //     if (!this.state.full_name) {
    //         // helper.warningToast('Please enter the full name')
    //         return;
    //     }
    //     if (!this.state.phone) {
    //         helper.warningToast('Please enter the mobile number')
    //         return;
    //     }
    //     if (!this.state.email) {
    //         helper.warningToast('Please enter the email')
    //         return;
    //     }
    //     var mailFormat = config.emailPattern;
    //     if (!mailFormat.test(this.state.email)) {
    //         helper.warningToast('Please enter the valid email')
    //         return;
    //     }
    //     if (!this.state.password) {
    //         helper.warningToast('Please enter the valid password')
    //         return;
    //     }
    //     if (this.state.password != this.state.confirm_password) {
    //         helper.warningToast('Please make sure both passwords are same')
    //         return;
    //     }
    //     // if (!this.state.isIAgree) {
    //     //     helper.warningToast('Please agree the condition.')
    //     //     return;
    //     // }
    //             console.log('signup_ body ', {
    //             "email": this.state.email,
    //             "password": this.state.password,
    //             "full_name": this.state.full_name,
    //             "phone": this.state.country_code + this.state.phone
    //         });

    //     await axios({
    //         method: 'post',
    //         url: config.Base_Url + config.signup_url,
    //         data: {
    //             "email": this.state.email,
    //             "password": this.state.password,
    //             "full_name": this.state.full_name,
    //             "phone": this.state.country_code + this.state.phone
    //         }
    //     })
    //         .then(async (response) => {
    //             // handle success
    //             console.log('signup_url ', response.data);
    //             var status = response.data.statuscode;
    //             if (status == 1) {
    //                 // closeOverlay()
    //                 var token = response.data.token;
    //                 var user = response.data.data;
    //                 await helper.storeData('token', token)
    //                 await helper.storeData('user', JSON.stringify(user))
    //                 helper.successToast(response.data.message)
    //                 this.props.navigation.navigate('Home')
    //             } else {
    //             console.log('catch else ',response);
    //                 helper.errorToast(response.data.message)
    //             }
    //             // if (status == 1) {
    //             //     // closeOverlay()
    //             //     helper.successToast(response.data.message)
    //             //     this.props.navigation.navigate('OTP')
    //             // } else {
    //             //     helper.errorToast(response.data.message)
    //             // }
    //         })
    //         .catch((error) => {
    //             // handle error
    //             console.log('catch error ',error);
    //             helper.errorToast(config.catcherror)
    //         })
    // }

    _onIAgree = () => {
        this.setState({
            isIAgree: !this.state.isIAgree,
        });
    };



    _selectLanguage = async (item) => {
        this.RBSheet.close();
    }


    render() {

        const { navigation } = this.props;

       

        // navigation.setOptions({tabBarStyle: {display: 'none'}});
        // React.useLayoutEffect(() => {
            //  alert(index)
                
              
        //   }, [navigation,route]);

        const CardItem = ({ item }) => {

            return (
                <TouchableOpacity onPress={() => {()=>navigation.navigate('MyCartScreen')}}><View style={{paddingHorizontal:20,marginBottom:10}}>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center"}}>

                    <View>
                        <Image
                            source={require('../assest/default.png')}
                            //borderRadius will help to make Round Shape
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 100 / 2
                            }}
                        />
                    </View>
                    <View style={{justifyContent:"center",marginStart:20}}>
                        <Text style={styles.paragraph}>
                            {item.name}{" "}
                            <Text style={styles.highlight}>Liked your Product{" "}</Text>
                        </Text>
                        <View style={{ flexDirection: "row",alignItems:"center",marginTop:3,color:"#707070" }}><Text>Just Now</Text><Image
                            source={require('../assest/heart.png')}
                            //borderRadius will help to make Round Shape
                            style={{
                                width: 15,
                                height: 15,
                                marginStart:5
                            }}
                        /></View>
                    </View>
                    

                </View>
                <View style={{width:"100%",backgroundColor:"#EEF3F7",height:1,marginTop:10}}></View>
                </View></TouchableOpacity>
            )
        }



        return (
               <>
               <StatusBar hidden={false} barStyle= 'light-content' backgroundColor="#0076B5" />
                <View style={{backgroundColor:"#FFFFFF",flex:1}}>
                <View style={{ flexDirection: "row", width: "100%", backgroundColor: "#FAFAFA", height: 60, alignItems: "center" }}>
                <TouchableOpacity onPress={() => {navigation.goBack() }}><Image
                        source={require('../assest/left_arrow.png')}
                        style={{ height: 15, width: 15,marginStart:20 }}
                    /></TouchableOpacity>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: '#1D3557',
                        marginStart:10,
                        flex:1
                    }} >Notifications</Text>
                  
                </View>
                <FlatList style={{marginTop:10,backgroundColor:"#FFFFFF"}}
                    data={DATA}
                    renderItem={({ item }) => <CardItem item={item} />}
                    keyExtractor={(item) => item.uid}
                />
                </View>
                </>
            
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
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
    box2: {
        justifyContent: 'space-evenly',
        height: '50%',
        paddingHorizontal: 30
    }
});