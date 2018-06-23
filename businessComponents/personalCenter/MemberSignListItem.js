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
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/personalCenter/MemberInfo';
export default class MemberSignListItem extends Component {
  constructor(props){
    super(props);
    this.state={
      id: this.props.item.id,
      index: this.props.index + 1,
      previewImg: this.props.item.previewImg,
      projectName: this.props.item.projectName ? this.props.item.projectName : '暂无',
      signType: this.props.item.signType ? this.props.item.signType : '暂无',
      signTime: this.props.item.signTime ? moment(this.props.item.signTime).format('YYYY-MM-DD') : '暂无',
    }
  }

  render(){
    return(
            <View style={styles.SignView}>
                  <View style={styles.SignTop}>
                        <Text style={[styles.signTitle,fonts.t3_Black]}>{this.state.index}.</Text>
                        <Text style={[styles.signText,fonts.bodyText_black]}>项目名称：{this.state.projectName}</Text>
                  </View>
                  <Text style={[styles.signText,fonts.bodyText_black,styles.pl14]}>签约类型：{this.state.signType}</Text>
                  <Text style={[styles.signText,fonts.bodyText_black,styles.pl14]}>签约时间：{this.state.signTime}</Text>
            </View>
      )
    }
  }
