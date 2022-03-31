import 'react-native-gesture-handler';

import * as React from 'react';

import
 MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons';

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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
        //  headerStyle: { backgroundColor: '#42f44b' },
       //   headerTintColor: '#fff',
         // headerTitleStyle: { fontWeight: 'bold' }
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: 'Details Page' }} />
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
        component={SettingsScreen}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: 'Details Page' }}/>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile Page' }}/>
    </Stack.Navigator>
  );
}

function LikeStack() {
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
        component={SettingsScreen}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: 'Details Page' }}/>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile Page' }}/>
    </Stack.Navigator>
  );
}

function WhislistStack() {
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
        component={SettingsScreen}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: 'Details Page' }}/>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile Page' }}/>
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Feed"
        tabBarOptions={{
          activeTintColor: '#42f44b',
        }}>
        <Tab.Screen
         name="Home"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
          
          }}  />
        <Tab.Screen
          name="Setting"
          component={SettingsStack}
          options={{
            tabBarLabel: 'Settings',
             
          }} />
            <Tab.Screen
          name="Like"
          component={LikeStack}
         />
           <Tab.Screen
          name="Wishlist"
          component={WhislistStack}
         />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default App;