import React from 'react';
import store from './src/store';
import { Provider } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import BaseApp from './BaseApp';
store.subscribe(() => console.log(store.getState()));
const Stack = createStackNavigator();
export default function App (){
  return (<Provider store = { store }>
    <BaseApp />
  </Provider>)
}