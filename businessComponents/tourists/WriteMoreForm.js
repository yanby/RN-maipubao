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
var t = require('tcomb-form-native');
import FormBasicComponent from '../basic/FormBasicComponent';
var TextBox = require('../../commonComponents/forms/TextBox');
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/commonStyle/ListForm';
export default class WriteMoreForm extends FormBasicComponent {
  render() {
    return (
      <View style={[styles.mainList]}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
            <View style={[styles.listView]}>
                  <View style={[styles.listViewText]}><Text style={[fonts.bodyText_Black]}>价       格：</Text></View>
                  <TextInput
                    style={[styles.listInput,fonts.bodyText_Gray]}
                    underlineColorAndroid="transparent"
                    clearButtonMode="always" returnKeyType='done'
                    placeholder="请填写"
                    placeholderTextColor="#ccc"
                  />
            </View>
            <View style={[styles.listView]}>
                  <View style={[styles.listViewText]}><Text style={[fonts.bodyText_Black]}>面       积：</Text></View>
                  <TextInput
                    style={[styles.listInput,fonts.bodyText_Gray]}
                    underlineColorAndroid="transparent"
                    clearButtonMode="always" returnKeyType='done'
                    placeholder="请填写"
                    placeholderTextColor="#ccc"
                  />
            </View>
            <View style={[styles.listView]}>
                  <View style={[styles.listViewText]}><Text style={[fonts.bodyText_Black]}>开店计划：</Text></View>
                  <TextInput
                    style={[styles.listInput,fonts.bodyText_Gray]}
                    underlineColorAndroid="transparent"
                    clearButtonMode="always" returnKeyType='done'
                    placeholder="请填写"
                    placeholderTextColor="#ccc"
                  />
            </View>
            <View style={[styles.listView]}>
                  <View style={[styles.listViewText]}><Text style={[fonts.bodyText_Black]}>业务要求：</Text></View>
                  <TextInput
                    style={[styles.listInput,fonts.bodyText_Gray]}
                    underlineColorAndroid="transparent"
                    clearButtonMode="always" returnKeyType='done'
                    placeholder="请填写"
                    placeholderTextColor="#ccc"
                  />
            </View>
            <View style={[styles.listView]}>
                  <View style={[styles.listViewText]}><Text style={[fonts.bodyText_Black]}>特殊要求：</Text></View>
                  <TextInput
                    style={[styles.listInput,fonts.bodyText_Gray]}
                    underlineColorAndroid="transparent"
                    clearButtonMode="always" returnKeyType='done'
                    placeholder="请填写"
                    placeholderTextColor="#ccc"
                  />
            </View>
            <View style={[styles.viewBtn]}>
                  <TouchableHighlight style={[styles.listNoBtn2]}>
                        <Text style={[fonts.btnText_Gray]}>取消</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={[styles.listBtn2]}>
                        <Text style={[fonts.btnText_white]}>保存</Text>
                  </TouchableHighlight>
            </View>
      </View>
    );
  }
}
AppRegistry.registerComponent('WriteMoreForm', () => WriteMoreForm);
