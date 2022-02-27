import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from "react-native";
import { OFFERS_IMAGES_API_URL } from '../../constants';
import { useTheme } from '@react-navigation/native';
const API = require('../../redux/offers/api')
const Details = ({ navigation, route }) => {
  const [offer, setOffer] = useState()
  const { colors } = useTheme();
  const [settings,] = useState({ language: 'en' })//useSelector(state => state.Settings)
  const [waiting, setWaiting] = useState(true)
  useEffect(() => {
    let promise;
    promise = API.getById(route.params.id);
    promise.then(res => {
      setWaiting(false)
      setOffer(res.data.result);
    }).catch(
      err => {
      })
  }, [])
  return (
    <View>
      {waiting ?
        <Text style={{ ...settings.language === 'en' ? styles.textLeft : styles.textRight, color: colors.text }}>
          {settings.language === 'en' ? "Please wait" : "انتظر من فضلك"}
        </Text>
        : offer ?
          <>
            <Image
              style={styles.image}
              source={{ uri: OFFERS_IMAGES_API_URL + offer.photo }} />
            <Text style={{
              fontSize: 26,
              margin: 10,
              marginLeft: 25,
              textAlign: 'left',
              color: colors.text
            }}>
              {settings.language === "en" ?
                <>
                  {offer.type}{"\n"}
                  {offer.city}{"\n"}
                  {offer.price}{"\n"}
                  Description:{"\n"}
                  {offer.description}{"\n"}
                  Details:{"\n"}
                  {offer.details}{"\n"}
                </>
                :
                <></>
              }
            </Text>
          </> : <></>
      }
    </View >
  );
}
export default Details;

const styles = StyleSheet.create({
  textRight: {
    fontSize: 26,
    margin: 10,
    marginRight: 20,
    textAlign: 'right'
  },
  image: {
    width: '100%',
    height: 200,
  },
  textLeft: {
    fontSize: 26,
    margin: 10,
    marginLeft: 20,
    textAlign: 'left',
    // color: colors.text
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderRadius: 4,
    elevation: 3,
    margin: 10
  },
  buttonText: {
    fontSize: 26
  }
});