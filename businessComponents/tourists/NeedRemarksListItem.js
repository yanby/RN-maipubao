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
import {styles} from '../../styles/tourists/NeedRemarksList';
export default class NeedRemarksListItem extends Component {
  render(){
    console.log(this.props);
    let mark=this.props.mark;
    let date=this.props.updateTime;
    return(
          <View style={styles.viewList}>
                <Text style={[styles.viewListText,fonts.bodyText_Gray]}>{mark}</Text>
                <Text style={[styles.viewListDate,fonts.hintText_Gray]}>{date}</Text>
          </View>
      )
    }
  }
