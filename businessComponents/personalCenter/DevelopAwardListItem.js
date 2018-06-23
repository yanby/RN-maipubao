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
import {styles} from '../../styles/personalCenter/DevelopAwardList';
export default class DevelopAwardListItem extends Component {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      name: this.props.item.user.name ? this.props.item.user.name : '暂无',
      amount: this.props.item.amount ? this.props.item.amount : '0.00',
      dateText: this.props.item.dateText ? this.props.item.dateText : null
    };
  }

  render(){
    return(
            <View style={styles.memberView}>
                  <TouchableHighlight underlayColor="transparent">
                  <View style={styles.textView}>
                        <View style={styles.textLeft}>
                              <Text style={[fonts.bodyText_Black,styles.textLeftText]}>成员: {this.state.name}</Text>
                              <Text style={[fonts.bodyText_Black,styles.textLeftText]}>发展奖励佣金：{this.state.amount}元</Text>
                        </View>
                        <View style={styles.textRight}>
                              <Text style={[fonts.hintText_Gray,styles.textRightText]}>{this.state.dateText}</Text>
                        </View>
                  </View>
                  </TouchableHighlight>
            </View>
      )
    }
  }
