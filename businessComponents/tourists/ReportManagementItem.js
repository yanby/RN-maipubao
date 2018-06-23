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
import {Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/tourists/ReportManagement';

export default class ReportManagementItem extends Component {
  constructor(props){
    super(props);

    this.state={
      modalObject:{},
      loadingObject:{},
      needAudit:this.props.needAudit,
      failed:this.props.failed,
      businessId:this.props.item.id,
      reportTime:this.props.item.createTime,
      user:this.props.item.user.name ? this.props.item.user.name : this.props.item.user.account,
      project:this.props.item.project.name,
      customer:this.props.item.customer.name,
      visitTime:this.props.item.businessFlows[0].expectedVisitTime,
      flowStatus:this.props.item.lastStatus,
    };
  }
  render(){
    return(
          <View style={styles.mainView}>
                <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.ReportDetails({businessId:this.state.businessId,needAudit:this.state.needAudit,failed:this.state.failed})}>
                <View>
                      <View style={styles.reportTop}>
                            <Text style={[fonts.hintText_Black,styles.flex]}>报备时间<Text style={styles.flagRed}>{moment(this.state.reportTime).format('YYYY.MM.DD HH:mm:ss')}</Text></Text>
                            <Text style={fonts.hintText_Black}>报备人：{this.state.user}</Text>
                      </View>
                      <View style={styles.reportMiddle}>
                            <Text style={[fonts.hintText_Gray,styles.middleBottom]}>报备项目：{this.state.project}</Text>
                            <Text style={[fonts.hintText_Gray,styles.middleBottom]}>客户姓名：{this.state.customer}</Text>
                            <Text style={[fonts.hintText_Gray,styles.middleBottom]}>预计到访时间：{this.state.visitTime ? moment(this.state.visitTime).format('YYYY.MM.DD HH:mm') : '暂无'}</Text>
                      </View>
                      <View style={styles.reportBottom}>
                            <Text style={[fonts.hintText_Black,styles.speailColor]}>{this.state.flowStatus}</Text>
                      </View>
                </View>
                </TouchableHighlight>
          </View>
      )
    }
  }
