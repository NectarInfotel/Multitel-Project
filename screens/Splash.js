import React, { useEffect } from 'react';
import {
    View, Image, StyleSheet, StatusBar
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './component/context';

// export default class Splash extends Component {
const Splash = ({ navigation }) => {
    const { signIn } = React.useContext(AuthContext);


    const getAccessToken = async function () {
        try {
            const accessToken = await AsyncStorage.getItem("access_token");
            {
                accessToken ? signIn("hiii", "12345") : navigation.navigate('WelcomeScreen')
            }
        } catch (error) {
            console.error('Error clearing app data.');
        }
    }

    useEffect(() => {
        const a = setTimeout(() => {
            getAccessToken()

        }, 3000);
    }, [])

    // constructor(props) {
    //     super(props);
    //     // setTimeOut(()=>{
    //     //     this.props.navigation.navigate("SignIn")
    //     // },5000)

    //     // const a = setTimeout(() => {

    //     //     const token=   AsyncStorage.getItem("access_token")
    //     //     {
    //     //         token ?   
    //     //     }
    //     //     this.props.navigation.navigate('WelcomeScreen')

    //     //   }, 3000);

    // }



    return (
        <>
          <StatusBar hidden={false} barStyle= 'light-content' backgroundColor="#fff" />
            <View style={styles.parentView}>
                <Image style={styles.image}
                    source={require('../assest/splash.png')}
                />

            </View>
        </>
    )



}

const styles = StyleSheet.create({
    parentView: {
        backgroundColor: 'white',
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 40
    },

    image: {
        height: 100,
        width: "100%",
        marginHorizontal: 20


    },

});

export default Splash