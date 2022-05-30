import React, { Component } from 'react';
import {
    KeyboardAvoidingView,SafeAreaView, Button, View, Image, StatusBar, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, TextInput
} from "react-native";
import { Checkbox } from 'react-native-paper';

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

export default class Category extends Component {

    constructor(props) {
        super(props);
        // helper = new Helper()

        //  backgroundStyle = {
        //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        // };

        this.state = ({
            full_name: '',
            country_code: '',
            phone: '',
            email: '',
            password: '',
            confirm_password: '',
            isIAgree: true,
            checked: false,

            languages: [
                {
                    'name': 'English',
                    'lang': 'English',
                    'code': 'en'
                },
                {
                    'name': 'עִברִית',
                    'lang': 'Hebrew',
                    'code': 'he'
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
        return (
            <SafeAreaView style={styles.container}>
            <View style={styles.parentView}>
                <ScrollView>
                    <View style={styles.scrollView}>


                        <Text style={styles.headerText}>Sign UP</Text>

                        <Text style={styles.subHeaderText}>Name</Text>


                        <View style={styles.textBackground}>
                            <TextInput style={styles.text} >Mark Johan</TextInput>

                            <Image style={styles.image}
                                source={require('../assest/user.png')}
                            />

                        </View>

                        <Text style={styles.subHeaderText}>Email Address</Text>


                        <View style={styles.textBackground}>
                            <TextInput style={styles.text} >multitel@gmail.com</TextInput>

                            <Image style={styles.image}
                                source={require('../assest/email_ic.png')}
                            />

                        </View>

                        <Text style={styles.subHeaderText}>Password</Text>


                        <View style={styles.textBackground}>
                            <TextInput secureTextEntry={true} style={styles.text} >multitel@gmail.com</TextInput>

                            <Image style={styles.image}
                                source={require('../assest/lock_icon.png')}
                            />

                        </View>

                        <Text style={styles.subHeaderText}>Confirm Password</Text>


                        <View style={styles.textBackground}>
                            <TextInput secureTextEntry={true} style={styles.text} >multitel@gmail.com</TextInput>

                            <Image style={styles.image}
                                source={require('../assest/lock_icon.png')}
                            />

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Checkbox 
                                uncheckedColor="blue"
                                color="blue"
                                status={this.state.checked ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    this.setState({checked :!this.state.checked})
                                  }}

                            />
                            <Text style={styles.paragraph}>
                                I Agree with{" "}
                                <Text style={styles.highlight}>Privacy{" "}<Text style={styles.paragraph}>and{" "}<Text style={styles.highlight}>Policy</Text></Text></Text>
                            </Text>
                        </View>

                        <Text style={styles.button}>Confirm</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <View style={{ flex: 1, height: 1, backgroundColor: '#707070', marginTop: 30, marginEnd: 10 }} />
                            <View>
                                <Text style={{ textAlign: 'center', flex: 1, color: "#707070", fontSize: 14, fontWeight: "normal", marginTop: 25 }}>Or continue with</Text>
                            </View>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#707070', marginTop: 30, marginStart: 10 }} />

                        </View>


                        <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", width: "100%", marginTop: 20 }}>


                            <Image style={{ height: 60, width: 60, marginEnd: 20 }}

                                source={require('../assest/facebook.png')}
                            />

                            <Image style={styles.socialImage}
                                source={require('../assest/twitter.png')}
                            />

                            <Image style={{ height: 60, width: 60, marginStart: 20 }}
                                source={require('../assest/google.png')}
                            />

                        </View>
                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            <Text style={styles.paragraph}>
                                Already have an account?{" "}
                                <Text style={styles.highlight}>Sing In{" "}</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>


                </ScrollView>
            </View>
            </SafeAreaView>
        )
    }


}

const styles = StyleSheet.create({
    parentView: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 40
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
      },
    textBackground: {

        backgroundColor: '#FFFFFF',
        width: "100%",
        marginTop: 10,
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
    box2: {
        justifyContent: 'space-evenly',
        height: '50%',
        paddingHorizontal: 30
    }
});