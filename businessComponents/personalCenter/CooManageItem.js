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
import {styles} from '../../styles/personalCenter/CNManage';
import {staticSite} from '../../systemComponents/Remote/ApiStorage';
import BasicComponent from '../basic/BasicComponent';

export default class CooManageItem extends BasicComponent {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      source: this.props.source,
      id: this.props.item.id,
      createTime: this.props.item.createTime ? this.props.item.createTime : '暂无',
      cooperationType: this.props.item.cooperationType ? this.props.item.cooperationType : '暂无',
    };
  }

  _onPress(){
    Actions.CooManageDetails({dataInfo: this.props.item})
  }

  render(){
    return(
      <View style={styles.mian}>
            <TouchableHighlight underlayColor="transparent" onPress={()=>this._onPress()}>
                  <View style={styles.viewList}>
                        <View style={styles.flex1}><Text style={fonts.bodyText_Black}>意向：{this.state.cooperationType}类合作</Text></View>
                        <View style={[styles.row,styles.flex1]}>
                              <Text style={[styles.date,fonts.bodyText_Gray]}>{moment(this.state.createTime).format('YYYY-MM-DD')}</Text>
                              <Image style={styles.icon}  source={require('../../images/more.png')}/>
                        </View>
                  </View>
            </TouchableHighlight>
      </View>
    )
  }
}
