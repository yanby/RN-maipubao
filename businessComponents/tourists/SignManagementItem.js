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
import {styles} from '../../styles/tourists/SignManagement';
import {staticSite} from '../../systemComponents/Remote/ApiStorage';

var moment = require('moment');

export default class SignManagementItem extends Component {
  constructor(props){
    super(props);
    this.state={
      id: this.props.item.id,
      previewImg: this.props.item.previewImg,
      projectName: this.props.item.projectName ? this.props.item.projectName : '暂无',
      customerName: this.props.item.customerName ? this.props.item.customerName : '暂无',
      signType: this.props.item.signType ? this.props.item.signType : '暂无',
      signTime: this.props.item.signTime ? moment(this.props.item.signTime).format('YYYY-MM-DD') : '暂无',
      preCommission: this.props.item.preCommission ? this.props.item.preCommission.toFixed(2) : null,
      commission: this.props.item.commission ? this.props.item.commission.toFixed(2) : null
    }
  }

  render(){
    return(
          <View style={styles.mainView}>
                <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.SignedDetails({id: this.state.id})}>
                <View>
                <View style={[styles.signTop]}>
                  {this.state.previewImg ?
                      <View style={{backgroundColor:"rgba(0,0,0,0.4)"}}>
                      <Image style={{alignItems:"center",justifyContent:"center",width:150,height:100}} source={{uri: staticSite + this.state.previewImg}}>
                             <Text style={[fonts.bodyText_white,styles.imgText]}>{this.state.commission ? '已结佣' : '待结佣'}</Text>
                      </Image>
                      </View>
                  :
                      <View style={{backgroundColor:"rgba(0,0,0,0.4)"}}>
                      <Image style={{alignItems:"center",justifyContent:"center"}} source={require('../../images/projectList.png')}>
                             <Text style={[fonts.bodyText_white,styles.imgText]}>{this.state.commission ? '已结佣' : '待结佣'}</Text>
                      </Image>
                      </View>
                  }
                      <View style={styles.signTopRight}>
                            <Text style={[fonts.hintText_Black,styles.flex]}>项目名称：{this.state.projectName}</Text>
                            <Text style={[fonts.hintText_Black,styles.flex]}>客户姓名：{this.state.customerName}</Text>
                            <Text style={[fonts.hintText_Black,styles.flex]}>签约时间：{this.state.signTime}</Text>
                            <Text style={[fonts.hintText_Black,styles.flex]}>签约类型：{this.state.signType}</Text>
                      </View>
                </View>
                <View style={styles.signBottom}>
                      <Text style={[fonts.hintText_Black,styles.topRight]}>{this.state.commission ? '实发佣金：' : '预计佣金：'}{this.state.commission ? this.state.commission : (this.state.preCommission ? this.state.preCommission : '待结算')}</Text>
                </View>
                </View>
                </TouchableHighlight>
          </View>
      )
    }
  }
