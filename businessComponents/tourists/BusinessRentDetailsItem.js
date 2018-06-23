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
import {styles} from '../../styles/tourists/BusinessRentDetails';
var moment = require('moment');
export default class BusinessRentDetailsItem extends Component {
  constructor(props){
      super(props);
      this.state={
        flowType:this.props.flowType ? this.props.flowType : '',
        flowStatus:this.props.flowStatus ? this.props.flowStatus : '',
        failedType:this.props.failedType ? this.props.failedType : '',
        mark:this.props.flowMark ? this.props.flowMark : null,
        operatorType:this.props.operatorType ? this.props.operatorType : '',
        createTime:this.props.createTime ? moment(this.props.createTime).format('YYYY-MM-DD HH:mm:ss') : '',
        updateTime:this.props.updateTime ? moment(this.props.updateTime).format('YYYY-MM-DD HH:mm:ss') : '',
      };
  }

  getRenderText(){
    if (this.state.flowStatus.indexOf('成功完结')>=0){
      return '平台：该签约已结佣'
    }
    else if (this.state.flowStatus.indexOf('成功')>=0) {
      return '项目经理：'+this.state.flowStatus
    }
    else if (this.state.flowStatus.indexOf('失败')>=0) {
      let msg='项目经理：'+this.state.flowStatus+'【'+this.state.failedType+'】';
      return this.state.mark ? (msg+'\r\n'+this.state.mark) : msg;
    }
    else if (this.state.flowStatus.indexOf('已设置')>=0) {
      return '平台：此签约单可申请结佣'
    }
    else if (this.state.flowStatus.indexOf('待审核')>=0) {
      return '平台：申请结佣中'
    }

  }

  render(){
    if (this.state.flowStatus == '') {
      return null;
    }
    else if (this.state.flowStatus == '报备提交') {
      return (
        <View style={styles.viewList}>
            <Text style={[styles.viewListText,fonts.bodyText_Black]}>经纪人：提交报备</Text>
            <Text style={[styles.viewListDate,fonts.hintText_Gray2]}>{this.state.createTime}</Text>
        </View>
      );
    }
    else if (this.state.flowType == '报备' && this.state.flowStatus != '报备提交') {
      return(
        <View>
          <View style={styles.viewList}>
              <Text style={[styles.viewListText,fonts.bodyText_Black]}>经纪人：提交报备</Text>
              <Text style={[styles.viewListDate,fonts.hintText_Gray2]}>{this.state.createTime}</Text>
          </View>
          <View style={styles.viewList}>
              <Text style={[styles.viewListText,fonts.bodyText_Black]}>{this.getRenderText()}</Text>
              <Text style={[styles.viewListDate,fonts.hintText_Gray2]}>{this.state.updateTime}</Text>
          </View>

        </View>
      );
    } else {
      return(
          <View style={styles.viewList}>
              <Text style={[styles.viewListText,fonts.bodyText_Black]}>{this.getRenderText()}</Text>
              <Text style={[styles.viewListDate,fonts.hintText_Gray2]}>{this.state.updateTime}</Text>
          </View>
        );
      }
    }

  }
