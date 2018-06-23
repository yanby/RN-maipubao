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
import {styles} from '../../styles/tourists/ReportManagement1';
var moment = require('moment');

export default class BusinessProjectCustomItem extends Component {
  constructor(props){
    super(props);
    this.state={
      id: this.props.item.id,
      projectName: this.props.item.project.name ? this.props.item.project.name : '',
      customerName: this.props.item.customer.name ? this.props.item.customer.name : '',
      customerTel: this.props.item.customer.tel ? this.props.item.customer.tel : '',
      userName: this.props.item.user.name ? this.props.item.user.name : this.props.item.user.account,
      showFlowTypeText: this.props.item.showFlowTypeText ? this.props.item.showFlowTypeText : '',
      expectedVisitTimeText: this.props.item.expectedVisitTimeText ? moment(this.props.item.expectedVisitTimeText).format('YYYY.MM.DD') : '',
      createTime: this.props.item.customer.createTime ? moment(this.props.item.customer.createTime).format('YYYY.MM.DD') : ''
    };
  }

  _flowImg(){
    let showFlowTypeText = this.state.showFlowTypeText;
    if(this.state.showFlowTypeText=="待审核"){
      return (<View style={styles.topRight}>
            <Image style={styles.imgMr} source={require('../../images/dsh.png')} />
            <Text style={[fonts.bodyText_Black,styles.dsh]}>{this.state.showFlowTypeText}</Text>
      </View>)
    }else if(this.state.showFlowTypeText=="待到访"){
      return (<View style={styles.topRight}>
            <Image style={styles.imgMr} source={require('../../images/ddf.png')} />
            <Text style={[fonts.bodyText_Black,styles.ddf]}>{this.state.showFlowTypeText}</Text>
      </View>)
    }else if(this.state.showFlowTypeText=="待意向" || this.state.showFlowTypeText=="待认购"){
      return (<View style={styles.topRight}>
            <Image style={styles.imgMr} source={require('../../images/dyx.png')} />
            <Text style={[fonts.bodyText_Black,styles.dyx]}>{this.state.showFlowTypeText}</Text>
      </View>)
    }else if(this.state.showFlowTypeText=="待签约"){
      return (<View style={styles.topRight}>
            <Image style={styles.imgMr} source={require('../../images/dqy.png')} />
            <Text style={[fonts.bodyText_Black,styles.dqy]}>{this.state.showFlowTypeText}</Text>
      </View>)
    }else if(this.state.showFlowTypeText=="待结佣"){
      return (<View style={styles.topRight}>
            <Image style={styles.imgMr} source={require('../../images/djy.png')} />
            <Text style={[fonts.bodyText_Black,styles.djy]}>{this.state.showFlowTypeText}</Text>
      </View>)
    }else if(this.state.showFlowTypeText=="成功完结"){
      return (<View style={styles.topRight}>
            <Image style={styles.imgMr} source={require('../../images/ywj.png')} />
            <Text style={[fonts.bodyText_Black,styles.wj]}>{this.state.showFlowTypeText}</Text>
      </View>)
    }else if(this.state.showFlowTypeText.indexOf('失败')>-1){
      return (<View style={styles.topRight}>
            <Image style={styles.imgMr} source={require('../../images/faild.png')} />
            <Text style={[fonts.bodyText_Black,styles.faild]}>{this.state.showFlowTypeText}</Text>
      </View>)
    }
  }

  render(){
    return(
          <View style={styles.mainView}>
          <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.ProjectCustomerDetails({id: this.state.id,projectId:this.props.projectId})}>
             <View style={styles.listView}>
              <View style={styles.touchView}>
                    <View style={styles.topView}>
                          <Text style={[fonts.bodyText_Black,styles.flex]}>客户姓名:<Text style={fonts.bodyText_Gray}> {this.state.customerName}</Text></Text>
                          {this._flowImg()}

                    </View>
                    <Text style={[fonts.bodyText_Black,styles.mt10]}>联系方式:<Text style={fonts.bodyText_Gray}> {this.state.customerTel}</Text></Text>
                    <Text style={[fonts.bodyText_Black,styles.mt10]}>报  备  人:<Text style={fonts.bodyText_Gray}> {this.state.userName}</Text></Text>
                    <Text style={[fonts.bodyText_Black,styles.mt10]}>报备时间:<Text style={fonts.bodyText_Gray}> {this.state.createTime}</Text></Text>
              </View>
              { this.state.showFlowTypeText == '待审核' || this.state.showFlowTypeText == '待到访' ?
              <View style={styles.bottomView}>
                <Text style={[fonts.bodyText_Black,styles.textBold]}>预计到访时间: {this.state.expectedVisitTimeText}</Text>
              </View>
              :null
               }
              </View>
          </TouchableHighlight>
          </View>
      )
    }
  }
