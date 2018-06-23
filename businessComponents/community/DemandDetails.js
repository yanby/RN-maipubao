import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableHighlight,
  Image,
  Dimensions,
  Modal
} from 'react-native';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/community/DemandDetails';
export default class DemandDetails extends Component {
  render() {
    return (
      <View style={[styles.main]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <View style={[styles.mainView]}>
          <View style={[styles.titleView]}>
            <Text style={[styles.titleViewText,fonts.t2_Black]}>优铺下午茶</Text>
          </View>
          <View style={[styles.authorTime]}>
            <Image source={require('../../images/look-icon.png')}></Image>
            <Text style={[styles.viewLeftText,fonts.bodyText_Gray]}>8.1万</Text>
            <Text style={[fonts.bodyText_Gray]}>2017-2-2</Text>
          </View>
          <View style={[styles.bodyText]}>
            <Text style={[styles.bodyTextTxt,fonts.bodyText_Black]}>
            推荐人成交奖励说明推荐人成交推荐人成交奖励说明推荐人成交推荐人成交奖励说明推荐人成交推荐人成交奖励说明推荐人成交
            奖励说明推荐人成交奖励说明推荐人成交奖励说明推荐人成交奖励说明推荐人成交奖励说明推荐人成交奖励说明推荐人成交推荐
            人成交奖励说明推荐人成交推荐人成交奖励说明推荐人成交
            </Text>
          </View>
        </View>
        <TouchableHighlight style={[styles.listBtn,styles.positionBottom20]} onPress={this._onPressButton}>
          <Text style={[fonts.btnText_white]}>立即报名</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
AppRegistry.registerComponent('demandDetails', () => demandDetails);
