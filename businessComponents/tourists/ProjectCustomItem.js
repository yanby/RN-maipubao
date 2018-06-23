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
import {styles} from '../../styles/tourists/ReportManagement';
var moment = require('moment');

export default class ProjectCustomItem extends Component {
  constructor(props){
    super(props);
    this.state={
      name: this.props.item.name ? this.props.item.name : '暂无',
      level: this.props.item.customerLevel ? this.props.item.customerLevel : '',
      customerType: this.props.item.customerType ? this.props.item.customerType : '',
      brandName: this.props.item.brandName ? this.props.item.brandName : null,
      demandType: this.props.item.demandType ? this.props.item.demandType : '',
      createTime: this.props.item.createTime ? moment(this.props.item.createTime).format('YYYY.MM.DD') : '暂无'
    };
  }

  render(){
    return(
          <View style={styles.mainView}>
                <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.CustomerDetails({id:this.props.item.id})}>
                <View style={styles.reportTopC}>

                      <View style={[styles.reportTop,styles.reportTopRest]}>
                            <Text style={[fonts.bodyText_Black,styles.flex]}>{this.state.name}</Text>
                            {
                                this.state.demandType != '' ?
                            <TouchableHighlight style={styles.topBtn}>
                                  <Text style={[fonts.tinyText_Black,styles.flagRed]}>{this.state.demandType}</Text>
                            </TouchableHighlight>
                            :null}
                      </View>
                      <View style={styles.reportTop}>
                            <View style={[styles.flex,styles.topView]}>
                            {
                                this.state.level != '' ?
                                <View style={[styles.reportTopText,styles.reportTopText1]}>
                                      <Text style={[fonts.tinyText_Gray]}>{this.state.level}</Text>
                                </View>

                            :null}
                            {
                                this.state.customerType != '' ?
                                <View style={[styles.reportTopText,styles.reportTopText2]} ellipsizeMode={'clip'}>
                                      <Text style={[fonts.tinyText_Gray]} numberOfLines={1}>{this.state.customerType}</Text>
                                </View>
                            :null}
                            {
                                this.state.brandName && this.state.customerType == '品牌客户' ?
                                <View style={[styles.reportTopText,styles.reportTopText3]} ellipsizeMode={'clip'}>
                                      <Text style={[fonts.tinyText_Gray]} numberOfLines={1}>{this.state.brandName}</Text>
                                </View>
                            : null}
                            </View>
                            <Text style={[fonts.tinyText_Gray,styles.topRight]}>{this.state.createTime}</Text>
                      </View>
                </View>
                </TouchableHighlight>
          </View>
      )
    }
  }
