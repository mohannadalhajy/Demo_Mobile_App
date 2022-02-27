import React, { useEffect } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import {
  LOGIN_ROUTE,
  OFFER_ADD_ROUTE,
  OFFER_DETAILS_ROUTE,
  PREFIX_ROUTE,
  REGISTER_ROUTE,
} from './src/constants';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/components/profile/login'
import Register from './src/components/profile/register'
import Offers from './src/components/offers'
import OfferDetails from './src/components/offers/details'
import { profileMe } from './src/redux/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-paper'
import { logout } from './src/redux/auth/actions';
import AddOffer from './src/components/offers/add';
const Stack = createStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 0, 0)',
    background: 'transparent',
    text: 'rgb(0, 0, 0)',
  },
};
export default function BaseApp() {
  const image = require('./images/background.jpg')
  const dispatch = useDispatch()
  const user = useSelector(state => state.User)
  const settings = useSelector(state => state.Settings)
  useEffect(() => {
    dispatch(profileMe);
  }, [])
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          cardStyle: {
          },
          headerStyle: {
            backgroundColor: '#fff',
            borderBottomWidth: 0,
            elevation: 0
          },
          headerTitleStyle: {
            color: '#000'
          },
          headerRight: () => (
            !user.isLoggedIn ? <></> : 
            <Button
            color="#000"
              onPress={() => { dispatch(logout()) }}
            >Logout</Button>
          )
        })}
      >
        {!user.isLoggedIn ? <>
          <Stack.Screen
            name={LOGIN_ROUTE}
            component={Login}
            options={{ title: 'Login' }} />
          <Stack.Screen
            name={REGISTER_ROUTE}
            component={Register}
            options={{ title: 'Register' }} />

        </>
          :
          <>
            <Stack.Screen
              name={PREFIX_ROUTE}
              component={Offers}
            />
            <Stack.Screen
              name={OFFER_ADD_ROUTE}
              component={AddOffer} 
              options={{ title: 'Add offer' }}/>
            <Stack.Screen
              name={OFFER_DETAILS_ROUTE}
              component={OfferDetails} 
              options={{ title: 'Offer details' }}/>
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// <ImageBackground source={image} resizeMode="cover" style={styles.image}>
{/* </ImageBackground> */ }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  logoutButton: {
    textTransform: 'none',
    color:"#000"
  }
});
