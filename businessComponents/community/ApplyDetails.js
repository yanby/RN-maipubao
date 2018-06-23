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
import {styles} from '../../styles/community/ApplyDetails';
export default class ApplyDetails extends Component {
  render() {
    return (
      <View style={[styles.mainView]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <View style={[styles.titleView]}>
          <Text style={[styles.titleViewText,fonts.t2_Black]}>求合租求合租求合租求合租</Text>
        </View>
        <View style={[styles.authorTime]}>
          <Text style={[styles.marginLeft5,fonts.bodyText_Gray]}>优铺科技</Text>
          <Text style={[styles.marginLeft5,styles.viewFlex,fonts.bodyText_Gray]}>参与99</Text>
          <Text style={[fonts.bodyText_Gray]}>2017-2-2</Text>
        </View>
        <View style={[styles.imgView]}>
          <Image style={[styles.img]} source={require('../../images/img1.png')}></Image>
          <Text style={[styles.imgViewText,fonts.bodyText_Black]}>求合租求合租求合租求合租求合租求合租求合租求合租求合租求合租求合租求合租求合租求合租求合租求合租求合租求合租求合租求合租</Text>
        </View>
        <View style={[styles.listView]}>
          <View style={[styles.listText]}>
            <Text style={[styles.viewFlex,styles.lineHeight30,fonts.bodyText_Gray]}>活动：下午茶</Text>
            <Text style={[styles.viewFlex,styles.lineHeight30,fonts.bodyText_Gray]}>类型：交流</Text>
          </View>
          <View style={[styles.listText]}>
            <Text style={[styles.viewFlex,styles.lineHeight30,fonts.bodyText_Gray]}>地点：建外</Text>
            <Text style={[styles.viewFlex,styles.lineHeight30,fonts.bodyText_Gray]}>时间：当前时间</Text>
          </View>
        </View>
        <View style={[styles.input]}>
          <Image style={[styles.inputImg]} source={require('../../images/input-pen.png')}></Image>
          <TextInput
            style={[styles.viewFlex]}
            underlineColorAndroid="transparent"
            clearButtonMode="always" returnKeyType='done'
            placeholderTextColor="#fff"
          />
        </View>
        <TouchableHighlight style={[styles.applyBtn]}>
          <Text style={[styles.applyBtnText,fonts.btnText_white]}>立即报名</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
AppRegistry.registerComponent('ApplyDetails', () => ApplyDetails);
