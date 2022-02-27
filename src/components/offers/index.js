import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import ListOffers from './list';
import { getOffers } from '../../redux/offers/actions';
import { useTheme } from '@react-navigation/native';
import { OFFER_ADD_ROUTE } from '../../constants';
const api = require('../../redux/auth/api')
const Offers = ({ navigation }) => {
  const { colors } = useTheme();
  const [classes,] = useState({});
  const dispatch = useDispatch();
  const offers = useSelector(state => state.Offers);
  // const settings = useSelector(state => state.Settings)
  const [settings, ] = useState({language:"en"})
  useEffect(() => {
    dispatch(getOffers({}))
  }, [])
  const refresh = () => {
    dispatch(getOffers({}))
  }
  const goToAddOffer = () => {
    navigation.navigate(OFFER_ADD_ROUTE)
  }
  return (
    <View >
      <View style={styles.view}>
        <Button
          labelStyle={{color:colors.text}}
          style={styles.button}
          onPress={refresh}>
          {settings.language === "en" ? "Refresh" : "تحديث"}
        </Button>
        <Button
          labelStyle={{color:colors.text}}
          style={styles.button}
          onPress={goToAddOffer}>
          {settings.language === "en" ? "Add offer" : "اضافة عرض"}
        </Button>
      </View>
      {offers.loading || offers.length <= 0 ?
        <View className={classes.CircularProgress}>
          <Text style={{...settings.language==='en'?styles.textLeft:styles.textRight,color: colors.text}}>{settings.language === 'en' ? "Please wait" : "انتظر من فضلك"}</Text>
        </View>
        : offers.offers.length <= 0 ? <View><Text style={{...settings.language==='en'?styles.textLeft:styles.textRight,color: colors.text}}>{settings.language === 'en' ? "There is not offers" : "لا يوجد اشعارات"}</Text></View>
          :
          <ListOffers navigation={navigation} />
      }
    </View>
  );
}
export default Offers;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 26
  },
  view: {
    flexDirection: "row",
    margin: 10,
    justifyContent: 'space-evenly'
  },
  textRight: {
    fontSize:26,
    margin:5,
    textAlign: 'right'
  },
  textLeft: {
    fontSize:26,
    margin:5,
    textAlign: 'left'
  },
});