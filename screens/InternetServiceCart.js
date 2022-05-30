import React from 'react'
import {
    View,
} from 'react-native';

import { Card } from 'react-native-paper';

const InternetServiceCart = () => {
    return (
        <View style={{ flex: 1 }}>
          <Card onPress={()=>{navigation.navigate('ProductDetail')}} style={{ marginTop: 20, backgroundColor: "#FFFFFF", marginHorizontal: 20, paddingVertical: 10,elevation:1 }}>
            <View>
    
             
            </View>
          </Card>
        </View>
    
      )
}

export default InternetServiceCart
