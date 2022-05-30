import React from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    View, FlatList,
    Text, ScrollView, Animated,
    SafeAreaView, Image, Dimensions, useWindowDimensions
} from 'react-native';
import { Card } from 'react-native-paper';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const HomeServicesCart = ({item}) => {
  return (
    <View style={{ flex: 1 }}>
    <Card onPress={() => { }} style={styles.wrap}>
        <View>

            <View>
                <Image
                    source={{
                        uri:
                        `http://50.28.104.48:3003/images/${item.cover_img}`,
                    }}
                    resizeMode="stretch"
                    style={styles.rectangleShapeImage}>

                </Image>

                <Image
                    source={require('../assest/heart_ic.png')}
                    style={styles.icon}
                />
            </View>
            <View style={{ flex: 1, marginStart: 10, marginTop: 10 }}>
                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                    <Text numberOfLines={1} style={{ alignItems: "flex-start", flex: 1, color: "#1D3557", fontWeight: "bold", fontSize: 14, }}>{item.name}</Text>

                    <Image
                        source={require('../assest/shopping.png')}
                        style={{ height: 20, width: 20, marginEnd: 10 }}
                    />
                </View>


                <View style={{ flexDirection: "row", width: "100%", alignItems: "center", marginTop: 5, justifyContent: "space-between" }}>

                    <View style={{ flexDirection: "row" }}><Text style={{ color: "#098DD4", fontWeight: "normal", fontSize: 12 }}>View More</Text></View>


                </View>

            </View>

        </View>
    </Card>
</View>
  )
}


const styles = StyleSheet.create({

    rectangleShapeImage: {
        flex: 1,
        height: 100,
        marginEnd: 8,
        marginStart: 8,
        borderRadius: 5,
    },
    wrap: {
        width: WIDTH / 1.5,
        marginEnd: 15,
        borderRadius: 8,
        marginTop: 20, 
        backgroundColor: "#FFFFFF", 
        paddingVertical: 10, 
        elevation: 1
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 10,
        width: 25,
        height: 25
    },
    rectangleShapeView: {
        width: 30 * 2,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#098DD4",
        borderRadius: 5

    },


    parentText: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
        color: "#1D3557",
        marginBottom: 3
    },
    image: {
        height: 20,
        width: 20,
        justifyContent: "flex-end"
    },
    paragraph: {
        fontSize: 14,
        fontWeight: "normal",
        textAlign: "center",
        color: "#707070",
        marginBottom: 3
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
    itemInvisible: {
        backgroundColor: "transparent"
    }

});

export default HomeServicesCart
