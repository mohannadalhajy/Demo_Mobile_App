import React from "react";
import { useSelector } from "react-redux";
import { LOGIN_ROUTE } from "../constants";
import BaseWaiting from "./Base/BaseWaiting";

export default function AuthScreen({ navigation, name, component }) {
  const user = useSelector(state => state.User);
  const isAuthenticated = user.user.userName !== undefined
  return (user.loading ?
    <BaseWaiting />
    : isAuthenticated ?
    <Stack.Screen name={name} exact component={component}/>
      :  navigation.navigate(LOGIN_ROUTE, { name: LOGIN_ROUTE })
  )
}
