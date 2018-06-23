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
  Modal,
  Linking,
  ScrollView,
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/tourists/ReportDetails';
import {apis} from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import BasicComponent from '../basic/BasicComponent';
import {Title} from '../../commonComponents/CommentTitle/Title';
var moment = require('moment');
export default class ReportDetails extends BasicComponent {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      businessId:this.props.businessId,
      business:null,
      needAudit:this.props.needAudit,
      failed:this.props.failed,
    };
  }
  _callPhone(tel){
    return Linking.openURL('tel:'+tel)
  }
  componentWillMount(){
    this.openLoading();
    storage.load({
      key: keys.reportDetail,
      syncInBackground: false,
      syncParams: {
         url: apis.reportDetail + '?id=' + this.state.businessId
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json();
      }else{
        this.closeLoading();
        this.msgShort('请求异常');
      }
    }).then(retJson=>{
      if (retJson!=null) {
        this.closeLoading();
        this.setState({business:retJson});
      }
      else {
        this.closeLoading();
        this.msgShort('报备数据异常');
      }
    }).catch(err => {
      this.closeLoading();
      this.msgShort('报备请求异常');
    });
  }

  render() {
    return (
      <View style={[styles.mainView]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <Title isLeftShow={true} backColor={true}  title={'报备详情'}  >
        </Title>
        {this.state.business ?
        <ScrollView style={{paddingBottom:50}}>
              <View style={[styles.view]}>
                    <View style={[styles.titleView]}>
                          <Text style={[styles.titleViewText,fonts.t3_Black]}>项目信息</Text>
                    </View>
                    <View style={[styles.bodyView]}>
                          <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>报备项目：{this.state.business.projectName}</Text>
                    </View>
              </View>
              <View style={[styles.view]}>
                    <View style={[styles.titleView]}>
                          <Text style={[styles.titleViewText,fonts.t3_Black]}>客户信息</Text>
                    </View>
                    <View style={[styles.bodyView]}>
                          <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>客户姓名：{this.state.business.customerName}</Text>
                          <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>联系方式：{this.state.business.customerTel}</Text>
                          <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>客户性别：{this.state.business.gender}</Text>
                    </View>
              </View>
              <View style={[styles.view]}>
                    <View style={[styles.titleView]}>
                          <Text style={[styles.titleViewText,fonts.t3_Black]}>报备信息</Text>
                    </View>
                    <View style={[styles.bodyView]}>
                          <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>需求类型：{this.state.business.businessType}</Text>
                          <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>预计到访时间：{moment(this.state.business.expectedVisitTime).format('YYYY-MM-DD HH:mm')}</Text>
                          <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>备注：{this.state.business.mark ? this.state.business.mark : ''}</Text>
                    </View>
              </View>
              <View style={[styles.view]}>
                    <View style={[styles.titleView]}>
                          <Text style={[styles.titleViewText,fonts.t3_Black]}>经纪人信息</Text>
                    </View>
                    <View style={[styles.bodyView]}>
                          <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>经纪人姓名：{this.state.business.agentName}</Text>
                          <View style={[styles.row]}>
                                <Text style={[styles.flex,styles.bodyViewText,fonts.hintText_Gray]}>联系方式：{this.state.business.agentTel}</Text>
                                <TouchableHighlight style={[styles.numBtn]} underlayColor="transparent" onPress={() => this._callPhone(this.state.business.agentTel)}>
                                      <Text style={[fonts.hintText_Blue]}>去联系</Text>
                                </TouchableHighlight>
                          </View>
                          <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>经纪人类型：{this.state.business.agentType}</Text>
                    </View>
              </View>

              {this.state.failed ?
                <View style={[styles.view]}>
                      <View style={[styles.titleView]}>
                            <Text style={[styles.titleViewText,fonts.t3_Black]}>报备失败：{this.state.business.failedType}</Text>
                      </View>
                      <View style={[styles.bodyView]}>
                            <Text style={[styles.bodyViewText,fonts.hintText_Gray,styles.lineheight18]}>{this.state.business.failedMark}
                            </Text>
                      </View>
                </View>
                :null
              }

              {this.state.needAudit?
              <TouchableHighlight style={[styles.listBtn]} underlayColor="#3a8ff3" onPress={()=>Actions.ReportAudit({businessId:this.state.businessId,businessFlowId:this.state.business.businessFlowId})}>
                <Text style={[fonts.btnText_white]}>报备审核</Text>
              </TouchableHighlight>
              :
              null}
        </ScrollView>
        :null}
        {this.renderModal()}{this.renderLoading()}
      </View>

    );
  }
}
AppRegistry.registerComponent('ReportDetails', () => ReportDetails);
