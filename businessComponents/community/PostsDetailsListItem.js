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
var moment = require('moment');
import { Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/community/PostsDetailsList';
export default class PostsDetailsListItem extends Component {
  render(){
    return(
            <View>
                  <TouchableHighlight underlayColor="transparent">
                        <View style={styles.ViewList}>
                              <Image style={styles.headImg} source={require('../../images/memberImg.png')}></Image>
                              <View style={styles.ViewListText}>
                                    <Text style={[styles.lineHeight20,fonts.hintText_Gray1]}>张健豪</Text>
                                    <Text style={[styles.lineHeight20,fonts.hintText_Gray]}>34分钟前</Text>
                                    <Text style={[styles.lineHeight20,fonts.bodyText_Black]}>是长期投资，不是做住宅销售。这种性质</Text>
                              </View>
                        </View>
                  </TouchableHighlight>
            </View>
      )
    }
  }
