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
export default class GoldPartnerInformation extends Component {
  render() {
    return (
      <View>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <TouchableHighlight>
          <View style={[styles.listView,styles.listViewLeft]}>
            <Text style={[styles.listInput,fonts.bodyText_Black]}>头像</Text>
            <Image style={[styles.headImg]} source={require('../../images/head-img1.png')}></Image>
            <Image source={require('../../images/more.png')}></Image>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={[styles.listView,styles.listViewLeft]}>
            <Text style={[styles.listInput,fonts.bodyText_Black]}>姓名</Text>
            <Text style={[fonts.bodyText_Gray]}>布丁</Text>
            <Image source={require('../../images/more.png')}></Image>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={[styles.listView,styles.listViewLeft]}>
            <Text style={[styles.listInput,fonts.bodyText_Black]}>性别</Text>
            <Text style={[fonts.bodyText_Gray]}>女</Text>
            <Image source={require('../../images/more.png')}></Image>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={[styles.listView,styles.listViewLeft]}>
            <Text style={[styles.listInput,fonts.bodyText_Black]}>手机号</Text>
            <Text style={[fonts.bodyText_Gray]}>132****7336</Text>
            <Image source={require('../../images/more.png')}></Image>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={[styles.listView,styles.marginTop10,styles.borderTop,styles.listViewLeft]}>
            <Text style={[styles.listInput,fonts.bodyText_Black]}>当前角色：金伙伴</Text>
            <Text style={[fonts.bodyText_Black]}>去变更</Text>
            <Image source={require('../../images/more.png')}></Image>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={[styles.listView,styles.listViewLeft]}>
            <Text style={[styles.listInput,fonts.bodyText_Black]}>银行卡</Text>
            <Text style={[fonts.bodyText_Black]}>已绑定</Text>
            <Image source={require('../../images/more.png')}></Image>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={[styles.listView,styles.listViewLeft]}>
            <Text style={[styles.listInput,fonts.bodyText_Black]}>身份证</Text>
            <Text style={[fonts.bodyText_Black]}>已上传</Text>
            <Image source={require('../../images/more.png')}></Image>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
AppRegistry.registerComponent('personalInformation', () => personalInformation);
