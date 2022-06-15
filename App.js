import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SearchIcon, HeartIcon, UserIcon} from 'react-native-heroicons/outline';
import HomeScreen from './src/screens/HomeScreen';
import WishlistScreen from './src/screens/WishlistScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SearchScreen from './src/screens/SearchScreen';
import HotelScreen from './src/screens/HotelScreen';
import BookingScreen from './src/screens/BookingScreen';
import LoginScreen from './src/screens/LoginScreen';
import SettingScreen from './src/screens/SettingScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {store} from './src/stores/store';
import {Provider} from 'react-redux';
import {useSelector, useDispatch} from 'react-redux';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingTop: 8,
          paddingBottom: 12,
          backgroundColor: '#5096a6',
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        // component={Search}
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <SearchIcon
                size={20}
                color="#FFC947"
                opacity={focused ? 1 : 0.6}
              />
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 10,
                  lineHeight: 12,
                  letterSpacing: -0.2,
                  color: '#FFC947',
                  opacity: focused ? 1 : 0.6,
                }}>
                Search
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <HeartIcon
                size={20}
                color="#FFC947"
                opacity={focused ? 1 : 0.6}
              />
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 10,
                  lineHeight: 12,
                  letterSpacing: -0.2,
                  color: '#FFC947',
                  opacity: focused ? 1 : 0.6,
                }}>
                Wishlist
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <UserIcon size={20} color="#FFC947" opacity={focused ? 1 : 0.6} />
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 10,
                  lineHeight: 12,
                  letterSpacing: -0.2,
                  color: '#FFC947',
                  opacity: focused ? 1 : 0.6,
                }}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  // const {isAuth} = useSelector(state => state.user);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeTabs"
            component={HomeTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Hotel"
            component={HotelScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Booking"
            component={BookingScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Setting"
            component={SettingScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
