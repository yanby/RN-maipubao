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
import {styles} from '../../styles/commonStyle/ListForm';
export default class PersonalCompany extends Component {
  render() {
    return (
      <View style={[styles.mainList]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <View style={[styles.listView]}>
          <View style={[styles.listViewText]}><Text style={[fonts.bodyText_Black]}>公司名称：</Text></View>
          <Text style={[styles.listInput,styles.lineHeight42,fonts.bodyText_Gray]}>北京优铺网络科技有限公司</Text>
        </View>
        <View style={[styles.listView]}>
          <View style={[styles.listViewText]}><Text style={[fonts.bodyText_Black]}>联系人：</Text></View>
          <Text style={[styles.listInput,styles.lineHeight42,fonts.bodyText_Gray]}>布丁</Text>
        </View>
        <View style={[styles.listView]}>
          <View style={[styles.listViewText]}><Text style={[fonts.bodyText_Black]}>状态：</Text></View>
          <Text style={[styles.listInput,styles.lineHeight42,fonts.bodyText_Gray]}>正常</Text>
        </View>
        <TouchableHighlight style={[styles.listBtn,styles.positionBottom20]} onPress={this._onPressButton}>
          <Text style={[fonts.btnText_white]}>保存</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
AppRegistry.registerComponent('personalCompany', () => cpersonalCompany);
