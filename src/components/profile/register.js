import React, { useState } from "react";
import {
  TextInput,
  Button,
} from 'react-native-paper';
import { register } from "../../redux/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, Text } from "react-native";
import { useTheme } from '@react-navigation/native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { REGISTER_ROUTE } from "../../constants";
// function BaseAlert(props) {
//   return <View>{Alert.alert("Alert Title", "My Alert Msg", [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }, { text: "OK", onPress: () => console.log("OK Pressed") }])}</View>
// }
function Register({ navigation }) {
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);
  const [FormState, setFormState] = useState({
    userName: "",
    password: "",
  });
  const [SnackbarState, setSnackbarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    severity: "error",
    message: "",
  });
  const user = useSelector(state => state.User)
  const dispatch = useDispatch()

  // const SnackbarClose = () => {
  //   setSnackbarState({ ...SnackbarState, open: false })
  // }

  const handleChange = (text, name) => {
    setFormState({ ...FormState, [name]: text });
  };


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

  const handleSubmit = () => {
    //setSnackbarState({ ...SnackbarState, open: true, message: "" })
    dispatch(register(FormState))
  };
  const moveToRegister = () => {
    navigation.navigate(REGISTER_ROUTE)
  }

  return (
    <View style={styles.view}>
      {user.loading?
      <View style={styles.loading}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
        :
      <View style={styles.container}>
        <TextInput
          label="Email"
          activeUnderlineColor="#000"
          style={styles.input}
          id="userName"
          required
          left={<TextInput.Icon name="account" />}
          value={FormState.userName}
          name="userName"
          required
          onChangeText={(text) => handleChange(text, "userName")}
        />
        <TextInput
          activeUnderlineColor="#000"
          style={styles.input}
          required
          secureTextEntry={!showPassword}
          left={<TextInput.Icon name="form-textbox-password" />}
          id="password"
          right={<TextInput.Icon onPress={handleClickShowPassword} name="eye" />}
          value={FormState.password}
          name="password"
          required
          onChangeText={(text) => handleChange(text, "password")}
        />
        <Button
          variant="contained"
          labelStyle={{textTransform: 'none',color:colors.text}}
          style={styles.button}
          type="submit"
          onPress={handleSubmit}
        >Register</Button>
      </View>}
    </View>
  );
}
export default Register;

const styles = StyleSheet.create({
  container: {
    margin:'5%'
  },
  input: {
    backgroundColor: "white",
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    margin:'3%'
  },
  view: {
    justifyContent: "center",
    flex: 1
  },
  textRight: {
    fontSize: 26,
    marginRight: 20,
    textAlign: 'right'
  },
  textLeft: {
    fontSize: 26,
    marginLeft: 20,
    textAlign: 'left'
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderRadius: 4,
    backgroundColor:'#24ade3',
    elevation: 3,
    margin:'3%'
  },
  buttonText: {
    fontSize: 16,
    textTransform: 'none'
  },
  buttonRegister: {
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderRadius: 4,
    margin:'3%'
  },
  buttonRegisterText: {
    fontSize: 13,
    color:'rgb(60, 60, 60)',
    textTransform: 'none'
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});