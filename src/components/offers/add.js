import React, { useState } from "react";
import {
  TextInput,
  Button
} from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { View, ScrollView, StyleSheet, Platform, Image } from "react-native";
import { useTheme } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import { OFFERS_IMAGES_API_URL, OFFERS_ROUTE, OFFERS_UPLOAD_IMAGES_API_URL } from "../../constants";
import { addOffer } from "../../redux/offers/actions";
import * as ImagePicker from 'expo-image-picker';
const APIClient = require('../../redux/apiClient');

// function BaseAlert(props) {
//   return <View>{Alert.alert("Alert Title", "My Alert Msg", [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }, { text: "OK", onPress: () => console.log("OK Pressed") }])}</View>
// }
function AddOffer({ navigation }) {
  const { colors } = useTheme();
  const offers = useSelector(state => state.Offers);
  const [offersLength,] = useState(offers.offers.length)
  const [FormState, setFormState] = useState({
    type: "",
    city: "",
    description: "",
    details: "",
    price: "",
    photo: ""
  });
  const [SnackbarState, setSnackbarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    severity: "error",
    message: "",
  });
  const dispatch = useDispatch()
  const maxSize = 1 * 1024 * 1024;
  const [imageError, setImageError] = useState("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true,
    });
    if (!result.cancelled) {
      postPicture(result.uri)
    }
  };
  const postPicture = (uri) => {
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];
    const formData = new FormData();
    formData.append('image', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
    const options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
    fetch(OFFERS_UPLOAD_IMAGES_API_URL, options).then((response) => response.json()).then(res => {
      setFormState({ ...FormState, photo: res.result })
    })
  }

  // const SnackbarClose = () => {
  //   setSnackbarState({ ...SnackbarState, open: false })
  // }

  const handleChange = (text, name) => {
    setFormState({ ...FormState, [name]: text });
  };
  const handleSubmit = () => {
    //setSnackbarState({ ...SnackbarState, open: true, message: "" })
    dispatch(addOffer(FormState))
  };
  const moveToList = () => {
    navigation.goBack()
  }
  return (
    <ScrollView style={styles.view}>
      {offersLength !== offers.offers.length ? moveToList() : <></>}
      {offers.loading ?
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
        :
        <View style={styles.container}>
          <TextInput
            label="Type"
            activeUnderlineColor="#000"
            style={styles.input}
            id="type"
            required
            value={FormState.type}
            name="type"
            required
            onChangeText={(text) => handleChange(text, "type")}
          />
          <TextInput
            label="City"
            activeUnderlineColor="#000"
            style={styles.input}
            id="city"
            required
            value={FormState.city}
            name="city"
            required
            onChangeText={(text) => handleChange(text, "city")}
          />
          <TextInput
            label="Price"
            activeUnderlineColor="#000"
            style={styles.input}
            id="price"
            required
            value={FormState.price}
            name="price"
            required
            onChangeText={(text) => handleChange(text, "price")}
          />
          <TextInput
            label="Description"
            activeUnderlineColor="#000"
            style={styles.input}
            id="description"
            required
            value={FormState.description}
            name="description"
            required
            onChangeText={(text) => handleChange(text, "description")}
          />
          <TextInput
            label="Details"
            activeUnderlineColor="#000"
            style={styles.input}
            id="details"
            required
            value={FormState.details}
            name="details"
            required
            onChangeText={(text) => handleChange(text, "details")}
          />
          {FormState.photo ?
            <Image source={{uri:OFFERS_IMAGES_API_URL + FormState.photo}} style={styles.image} />
            : <></>}
          <Button 
          labelStyle={{ textTransform: 'none', color: colors.text }}
            style={styles.buttonImage}
            onPress={pickImage} >
            {FormState.photo ?
              "Change image"
              : "Choose image"}
          </Button>
          {/* <Button onPress={handleChangeImage} >gggg</Button> */}
          {/* {FormState.photo && <Image source={OFFERS_IMAGES_API_URL + '1.png'} style={{ width: 200, height: 200 }} />} */}
          <Button
            variant="contained"
            labelStyle={{ textTransform: 'none', color: colors.text }}
            style={styles.button}
            type="submit"
            onPress={handleSubmit}
          >Add offer</Button>
        </View>}
    </ScrollView>
  );
}
export default AddOffer;

const styles = StyleSheet.create({
  container: {
    margin: '5%',
    marginTop: '1%'
  },
  input: {
    backgroundColor: "white",
    borderColor: "gray",
  },
  view: {
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
    backgroundColor: '#24ade3',
    elevation: 3,
    margin: '3%'
  },
  buttonImage: {
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderRadius: 4,
    backgroundColor: '#24ade3',
    elevation: 3,
    marginTop: '3%',
    marginBottom: '3%',
    marginLeft: '20%',
    marginRight: '20%',
  },
  buttonText: {
    fontSize: 16,
    textTransform: 'none'
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    padding: 10
  },
  image:{ 
    width: "80%",
    marginBottom:"2%", 
    margin:"10%", 
    height: 200,
    resizeMode: "contain"
  }
});