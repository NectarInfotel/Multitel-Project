import 'react-native-gesture-handler';

import React, { useState, getFocusedRouteNameFromRoute } from 'react';

import {
  StyleSheet, View, Image, StatusBar
} from "react-native";

import
MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  NavigationContainer
} from '@react-navigation/native';
import {
  createStackNavigator
} from '@react-navigation/stack';
import {
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingScreen';
import SignUpScreen from './screens/SignUpScreen';
import MultitelPride from './screens/MultitelPride';
import SignIn from './screens/SignIn';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { AuthContext } from './screens/component/context';
import Splash from './screens/Splash';
import ResetPassword from './screens/ResetPassword'
import ProductDetail from './screens/ProductDetail'
import CreatePassword from './screens/CreatePassword'
import ResetPasswordTwo from './screens/ResetPasswordTwo'
import WelcomeScreen from './screens/WelcomeScreen'
import EditProfile from './screens/EditProfile'
import ProductService from './screens/ProductService'
import EditProfileTwo from './screens/EditProfileTwo'
import GraphicDesigner from './screens/GraphicDesigner'
import Marketing from './screens/Marketing'
import NotificationScreen from './screens/NotificationScreen'
import Commercial from './screens/Commercial'
import MyCartScreen from './screens/MyCartScreen'
import Setting from './screens/Setting'
import MyWhiteList from './screens/MyWhiteList'
import ManagementMessage from './screens/ManagementMessage'
import Sustainability from './screens/Sustainability'
import SocialInvestments from './screens/SocialInvestments'
import MissionValues from './screens/MissionValues'
import ActionBar from './screens/ActionBar'
import Home from './screens/Home'
import Category from './screens/Category'
import Recruitment from './screens/Recruitment'
import InternetService from './screens/InternetService'
import CPE from './screens/CPE'
import NetworkEquipment from './screens/NetworkEquipment'
import Order from './screens/Order'
import CustomDrawer from './screens/CustomDrawer'
import SmartPhone from './screens/SmartPhone'
import Feather from 'react-native-vector-icons/Feather';




// const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

function HomeStack() {


  return (
    <Stack.Navigator
      initialRouteName="Home"
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="InternetService"
        component={InternetService}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="NetworkEquipment"
        component={NetworkEquipment}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="CPE"
        component={CPE}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="ProductService"
        component={ProductService}
        options={{
          headerShown: false
        }}
      />


    </Stack.Navigator>
  );
}

function NavigationDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Multitel Home" component={MainStack}
      />
      <Drawer.Screen name="Category" component={Category} />
      <Drawer.Screen name="Internet Service" component={InternetService}
      />
      <Drawer.Screen name="Network Equipment" component={NetworkEquipment} />
      <Drawer.Screen name="CPE's" component={CPE} />
      <Drawer.Screen name="Order" component={Order} />
      <Drawer.Screen name="Notification" component={NotificationScreen} />
    </Drawer.Navigator>
  )
}

function TabBottomNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#1D3557",
          borderRadius: 10,
          height: 50,
          marginHorizontal: 15,
          marginBottom: 10

        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (

            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {focused ? <Image
                resizeMode="contain"
                style={{ width: 35, height: 35 }}
                source={require('./assest/select_home.png')}
              /> : <Image
                resizeMode="contain"
                style={{ width: 25, height: 25 }}
                source={require('./assest/metro_home.png')}
              />}


            </View>

          )

        }} />
      <Tab.Screen
        name="CategoryStack"
        component={CategoryStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {focused ? <Image
                resizeMode="contain"
                style={{ width: 35, height: 35 }}
                source={require('./assest/select_category.png')}
              /> : <Image
                resizeMode="contain"
                style={{ width: 25, height: 25 }}
                source={require('./assest/Icon_shopping.png')}
              />

              }


            </View>

          )

        }}

      />
      <Tab.Screen
        name="Like"
        component={LikeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {focused ? <Image
                resizeMode="contain"
                style={{ width: 35, height: 35 }}
                source={require('./assest/select_like.png')}
              /> : <Image
                resizeMode="contain"
                style={{ width: 25, height: 25 }}
                source={require('./assest/heart_empty.png')}
              />

              }

            </View>
          )

        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={EditProfileStack}
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {focused ? <Image
                resizeMode="contain"
                style={{ width: 35, height: 35 }}
                source={require('./assest/select_user.png')}
              /> :
                <Image
                  resizeMode="contain"
                  style={{ width: 25, height: 25 }}
                  source={require('./assest/feather-user.png')}
                />

              }

            </View>

          )


        }}
      />
    </Tab.Navigator>
  )
}

// function LoginStack() {
//   return (
//     <Stack.Navigator

//       >
//       <Stack.Screen
//         name="Splash"
//         component={Splash}
//         options={{ headerShown: false }} />

//       <Stack.Screen
//         name="SignIn"
//         component={SignIn}
//         options={{ headerShown: false }} />

//       <Stack.Screen
//         name="ResetPassword"
//         component={ResetPassword}
//         options={{ headerShown: false }} />

//       <Stack.Screen
//         name="ResetPasswordTwo"
//         component={ResetPasswordTwo}
//         options={{ headerShown: false }} />

//       <Stack.Screen
//         name="CreatePassword"
//         component={CreatePassword}
//         options={{ headerShown: false }} />

//       <Stack.Screen
//         name="EditProfile"
//         component={EditProfile}
//         options={{ headerShown: false }} />

//       <Stack.Screen
//         name="WelcomeScreen"
//         component={WelcomeScreen}
//         options={{ headerShown: false }} />

//       <Stack.Screen
//         name="EditProfileTwo"
//         component={EditProfileTwo}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="NotificationScreen"
//         component={NotificationScreen}
//         options={{ headerShown: false }} />

//       <Stack.Screen
//         name="SignUpScreen"
//         component={SignUpScreen}
//         options={{ headerShown: false }} />

//       <Stack.Screen
//         name="MyCartScreen"
//         component={MyCartScreen}
//         options={{ headerShown: false }} />

//     </Stack.Navigator>
//   );
// }

function LoginStack({ state }) {
  return (
    <Stack.Navigator
    >

      {state.isLoading && (<Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }} />)}

      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }} />

      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ headerShown: false }} />

      <Stack.Screen
        name="ResetPasswordTwo"
        component={ResetPasswordTwo}
        options={{ headerShown: false }} />

      <Stack.Screen
        name="CreatePassword"
        component={CreatePassword}
        options={{ headerShown: false }} />

      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }} />

      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerShown: false }} />


      <Stack.Screen
        name="EditProfileTwo"
        component={EditProfileTwo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{ headerShown: false }} />

      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerShown: false }} />

      <Stack.Screen
        name="MyCartScreen"
        component={MyCartScreen}
        options={{ headerShown: false }} />

    </Stack.Navigator>
  );
}

function CategoryStack() {
  return (
    <Stack.Navigator
      initialRouteName="Category"
      screenOptions={{
        // headerStyle: { backgroundColor: '#42f44b' },
        //   headerTintColor: '#fff',
        //  headerTitleStyle: { fontWeight: 'bold' }
      }}>
      <Stack.Screen
        name="Category"
        component={SmartPhone}
        options={{ headerShown: false }}

      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile Page' }} />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        // headerStyle: { backgroundColor: '#42f44b' },
        //   headerTintColor: '#fff',
        //  headerTitleStyle: { fontWeight: 'bold' }
      }}>
      <Stack.Screen
        name="Settings"
        component={Setting}
        options={{ headerShown: false }}

      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile Page' }} />
    </Stack.Navigator>
  );
}

function LikeStack() {
  return (
    <Stack.Navigator
      initialRouteName="MyWhiteList"
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen
        name="MyWhiteList"
        component={MyWhiteList}
      />


    </Stack.Navigator>
  );
}

function WhislistStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
      }}>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile Page' }} />


    </Stack.Navigator>
  );
}


function MainStack() {
  return (
    <Stack.Navigator

      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen
        name="Tab"
        component={TabBottomNavigation}

      />

      <Stack.Screen
        name="MyCartScreen"
        component={MyCartScreen}
        options={{ headerShown: false }} />

      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen} />


      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail} />

      <Stack.Screen
        name="Settings"
        component={Setting}
        options={{ headerShown: false }}

      />

      <Stack.Screen
        name="ManagementMessage"
        component={ManagementMessage}
      />

      <Stack.Screen
        name="MissionValues"
        component={MissionValues}
      />

      <Stack.Screen
        name="Sustainability"
        component={Sustainability}
      />
      <Stack.Screen
        name="SocialInvestments"
        component={SocialInvestments}
      />

      <Stack.Screen
        name="MultitelPride"
        component={MultitelPride}
      />

      <Stack.Screen
        name="Recruitment"
        component={Recruitment}
      />

      <Stack.Screen
        name="Commercial"
        component={Commercial}
      />
      <Stack.Screen
        name="GraphicDesigner"
        component={GraphicDesigner}
      />

      <Stack.Screen
        name="Marketing"
        component={Marketing}
      />


    </Stack.Navigator>
  );
}


function EditProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="EditProfile"
      screenOptions={{

      }}>
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EditProfileTwo"
        component={EditProfileTwo}
        options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function NotificationStack() {
  return (
    <Stack.Navigator
      initialRouteName="NotificationScreen"
      screenOptions={{

      }}>
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0076B5',
    backgroundColor: '#fff',

  },
};

function App() {

  // const[userToken,setUserToken]= useState(false)

  // const sign = ()=>{
  //   console.log('hello====')
  //   setUserToken(true)
  // }

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            isLoading: true,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            isLoading: false,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );


  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );



  // });
  return (
    <>
      <AuthContext.Provider value={authContext}>

        <NavigationContainer>
          {state.userToken ?
            <NavigationDrawer />

            : <LoginStack state={state} />
          }
        </NavigationContainer>
      </AuthContext.Provider>

    </>
  );

}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },


});