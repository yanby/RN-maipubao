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
import {styles} from '../../styles/personalCenter/FundDetailsList';
export default class FundDetailsListItem extends Component {
  constructor(props){
    super(props);
    let amoutFmt = Math.abs(this.props.item.amount)
    this.state={
      modalObject:{},
      loadingObject:{},
      fundType: this.props.item.type ? this.props.item.type : '暂无',
      fundTime: this.props.item.createTimeText ? this.props.item.createTimeText : '暂无',
      amount: amoutFmt.toFixed(2)
    };
  }

  render(){
    return(
            <View style={styles.memberView}>
                  <TouchableHighlight underlayColor="transparent">
                  <View style={styles.textView}>
                        <View style={styles.textLeft}>
                              <Text style={[fonts.bodyText_Black,styles.textLeftText]}>{this.state.fundType}</Text>
                              <Text style={[fonts.hintText_Gray,styles.textLeftText]}>{this.state.fundTime}</Text>
                        </View>
                        <View style={styles.textRight}>
                              <Text style={[fonts.t3_Red,styles.textRightText]}>{this.state.amount}</Text>
                        </View>
                  </View>
                  </TouchableHighlight>
            </View>
      )
    }
  }
