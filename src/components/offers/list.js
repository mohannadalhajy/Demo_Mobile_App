import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import {
  Text
} from 'react-native-paper';
import { OFFERS_IMAGES_API_URL, OFFER_DETAILS_ROUTE } from '../../constants/index';
import { useTheme } from '@react-navigation/native';
function ListOffers({ navigation }) {
  const { colors } = useTheme();
  const Offers = useSelector(state => state.Offers);
  const [settings,] = useState({ language: 'en' })

  const getDetailsRoute = (id) => {
    navigation.navigate(OFFER_DETAILS_ROUTE, { id })
  }
  return (
    <ScrollView
      align={settings.language === 'en' ? "left" : "right"}
    >
      {Offers.offers.map((item) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => getDetailsRoute(item.id)}
          key={item.id}>
          <Image
            style={styles.image}
            source={{ uri: OFFERS_IMAGES_API_URL + item.photo }} />
          <Text style={styles.cardText}>
            {item.type},{'\t'}
            {item.city}{'\n'}
            {item.price},{'\t'}
            {item.description}
          </Text>
        </TouchableOpacity>
      ))}
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
    </ScrollView>);
}
export default ListOffers;

const styles = StyleSheet.create({
  textRight: {
    fontSize: 26,
    margin: 5,
    textAlign: 'right'
  },
  textLeft: {
    margin: 5
  },
  card: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  image: {
    width: '100%',
    height: 200,
  },
  cardText:{
    margin:'5%',
    fontSize:26
  }
});