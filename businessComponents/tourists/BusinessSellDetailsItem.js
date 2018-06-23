import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  PixelRatio,
  Platform,
  NativeModules,
  AsyncStorage,
  NativeAppEventEmitter,
  Dimensions,AppRegistry,TouchableHighlight,Modal
} from 'react-native';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/tourists/BusinessSellDetails';
export default class BusinessSellDetailsItem extends Component {
  render(){
    return(
          <View style={styles.viewList}>
                <Text style={[styles.viewListText,fonts.bodyText_Black]}>客户已认购</Text>
                <Text style={[styles.viewListDate,fonts.hintText_Gray2]}>2017.08.08 09:09:00</Text>
          </View>
      )
    }
  }
