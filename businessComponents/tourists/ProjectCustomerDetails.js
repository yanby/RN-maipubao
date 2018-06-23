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
  ScrollView,
  Linking
} from 'react-native';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/tourists/ProjectCustomerDetails';
import {flow} from '../../styles/tourists/BusinessFlow';
import {apis} from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import BusinessHorizonLine from './BusinessHorizonLine';
import {Actions,ActionConst } from 'react-native-router-flux';
var moment = require('moment');
import BasicComponent from '../basic/BasicComponent.js'
import { UMengAnalytics } from '../../commonComponents/umeng/UMAnalytics';

export default class ProjectCustomerDetails extends BasicComponent {
  constructor (props) {
   super(props);
   this.state = {
     modalObject:{},
     loadingObject:{},
     businessId:this.props.id,
     businessFlowId:null,
     business:null,
     flows:null,
   }
 }
 componentWillReceiveProps(nextProps){
   this._loadData();
 }
 componentWillMount(){
   this._loadData();
 }

 _loadData(){
   this.openLoading();
   storage.load({
     key: keys.getBusinessDetail,
     syncInBackground: false,
     syncParams: {
        url: apis.getBusinessDetail + '?id=' + this.state.businessId
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
       this.setState({
         business:retJson,
         flows:this.getFlowText(retJson.businessFlows),
       });
     }
     else {
       this.closeLoading();
       this.msgShort('获取交易数据异常');
     }
   }).catch(err => {
     this.closeLoading();
     this.msgShort('获取交易请求异常');
   });
 }

 getFlowText(flows){
   let flowText=[];
   for (var i in flows) {
     flowText.push({
       type:flows[i].flowType,
       status:flows[i].flowStatus,
       date:flows[i].updateTime ? moment(flows[i].updateTime).format('YYYY-MM-DD HH:mm:ss') : null,
     });
   }
   return flowText;
 }

 renderFlowImg(index){
   if (this.state.flows[index].status==null) {
     return (
       <Image source={require('../../images/businessFlow1.png')}>
         <Text style={[flow.colorGray,flow.verticalListText]}>{this.state.flows[index].type}</Text>
       </Image>
     );
   }else if (this.state.flows[index].status.indexOf('成功')>=0 || this.state.flows[index].status.indexOf('待审核')>=0) {
     return (
       <Image source={require('../../images/businessFlow3.png')}>
         <Text style={[flow.colorGreen,flow.verticalListText]}>{this.state.flows[index].type}</Text>
       </Image>
     );
   } else if(this.state.flows[index].status.indexOf('失败')>=0) {
     return (
       <Image source={require('../../images/businessFlow4.png')}>
         <Text style={[flow.colorRed,flow.verticalListText]}>{this.state.flows[index].type}</Text>
       </Image>
     );
   } else {
     return (
       <Image source={require('../../images/businessFlow2.png')}>
         <Text style={[flow.colorYellow,flow.verticalListText]}>{this.state.flows[index].type}</Text>
       </Image>
     );
   }

 }

 // addBusinessFlowBtnPress(btnName){
 //   let type=this.state.business.lastStatus;
 //   let flowType=this.state.business.businessType=='销售' ? '认购' : '意向';
 //   if (type=='报备成功' && btnName=='到访' ) {
 //     return Actions.RecordVisit({businessId:this.state.businessId,projectId:this.props.projectId})
 //   }
 //   else if (type=='到访成功' && btnName=='认购') {
 //     return Actions.RecordSubscription({businessId:this.state.businessId,flowType:flowType,projectId:this.props.projectId})
 //   }
 //   else if ((type=='意向成功' || type=='认购成功') && btnName=='签约') {
 //     return Actions.SignedForm({businessId:this.state.businessId,customer:this.state.business.customer,projectId:this.props.projectId})
 //   }
 //   return null
 // }

 renderBusinessFlowBtn(){
   let type=this.state.business.lastStatus;
   let flowType=this.state.business.businessType=='销售' ? '认购' : '意向';
   if (type=='报备成功' ) {
     return (
       <TouchableHighlight style={[styles.listBtn]} underlayColor="#3a8ff3" onPress={()=>Actions.RecordVisit({businessId:this.state.businessId,projectId:this.props.projectId})}>
         <Text style={[fonts.btnText_white]}>录到访</Text>
       </TouchableHighlight>
       )
   }
   else if (type=='到访成功' ) {
     return (
       <TouchableHighlight style={[styles.listBtn]} underlayColor="#3a8ff3" onPress={()=>Actions.RecordSubscription({businessId:this.state.businessId,flowType:flowType,projectId:this.props.projectId})}>
         <Text style={[fonts.btnText_white]}>录{flowType}</Text>
       </TouchableHighlight>
       )
   }
   else if (type=='意向成功' || type=='认购成功') {
     return (
       <TouchableHighlight style={[styles.listBtn]} underlayColor="#3a8ff3" onPress={()=>Actions.SignedForm({businessId:this.state.businessId,customer:this.state.business.customer,projectId:this.props.projectId})}>
         <Text style={[fonts.btnText_white]}>录签约</Text>
       </TouchableHighlight>
       )
   }
   return null
 }


  render() {
    return (
      <View style={[styles.mainView]}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
            <View style={[styles.navC]}>
                  <TouchableHighlight style={styles.navLeftC} underlayColor="transparent" onPress={()=>Actions.pop({refresh:{selectTabIndex:1}})}>
                        <Image source={require('../../images/back.png')}></Image>
                  </TouchableHighlight>
                  <View style={[styles.navCenterC]}>
                        <Text style={[fonts.t2_Black]}>客户详情</Text>
                  </View>
                  {/* <TouchableHighlight style={[styles.navRight]} underlayColor="transparent" onPress={()=>Actions.ProjectCustomerDetailsNo({})}>
                        <Text style={[fonts.hintText_Orange]}>无效</Text>
                  </TouchableHighlight> */}
            </View>
            {(this.state.business)?
            <ScrollView>
                  <View style={[styles.view]}>
                        <View style={[styles.titleView]}>
                              <Text style={[styles.titleViewText,fonts.t3_Black]}>客户信息：</Text>
                        </View>
                        <View style={[styles.bodyView]}>
                              <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>客户姓名：{this.state.business.customer.name}</Text>
                              <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>联系方式：{this.state.business.customer.tel}</Text>
                              <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>客户性别：{this.state.business.customer.gender}</Text>
                        </View>
                  </View>
                  <View style={[styles.view]}>
                        <View style={[styles.titleView]}>
                              <Text style={[styles.titleViewText,fonts.t3_Black]}>经纪人信息：</Text>
                        </View>
                        <View style={[styles.bodyView]}>
                              <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>经纪人姓名：{this.state.business.user.name}</Text>
                              <View style={[styles.row]}>
                                    <Text style={[styles.flex,styles.bodyViewText,fonts.hintText_Gray]}>联系方式：{this.state.business.user.account}</Text>
                                    <TouchableHighlight style={[styles.numBtn]} underlayColor="transparent" onPress={()=>{UMengAnalytics.onEvent('project_customer_customer_details_connect_show');Linking.openURL('tel:'+this.state.business.user.account)}}>
                                          <Text style={[fonts.hintText_Blue]}>去联系</Text>
                                    </TouchableHighlight>
                              </View>
                              <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>经纪人类型：{this.state.business.user.roleType}</Text>
                        </View>
                  </View>
                  <View style={[styles.view]}>
                        <View style={[styles.titleView]}>
                              <Text style={[styles.titleViewText,fonts.t3_Black]}>交易信息</Text>
                              <View style={styles.rightTitle}>
                              <Image source={require('../../images/businessFlow7.png')}></Image>
                              <Text style={[styles.rightTitleText,fonts.bodyText_Black]}>进展成功</Text>
                              <Image  source={require('../../images/businessFlow5.png')}></Image>
                              <Text style={[styles.rightTitleText,fonts.bodyText_Black]}>进展失败</Text>
                              </View>
                        </View>
                    <View style={[styles.ListTextNum]}>
                          <View style={[styles.project]}>
                                <View style={[styles.row,styles.marginBottom5]}>
                                      <Text style={[styles.flex,styles.bodyViewText,fonts.hintText_Black]}>项目名称：{this.state.business.project.name}</Text>
                                      {this.state.business.lastStatus.match(/报备成功$|到访成功$|认购成功$|意向成功$/)  ?
                                      <TouchableHighlight style={[styles.numBtnNo]} underlayColor="transparent"
                                        onPress={()=>Actions.RecordProgress({businessId:this.state.businessId,lastFlowType:this.state.business.lastFlowType,businessType:this.state.business.businessType})}>
                                            <Text style={[fonts.hintText_Gray]}>结束进展</Text>
                                      </TouchableHighlight>
                                      :null}
                                </View>

                                <Text style={[styles.projectText,fonts.hintText_Black]}>项目经理：{this.state.business.project.projectManager ? this.state.business.project.projectManager.name : '暂无'}</Text>
                                <Text style={[styles.projectText,fonts.hintText_Black]}>需求类型：{this.state.business.customer.demandType}</Text>
                          </View>
                    </View>
                    <BusinessHorizonLine flows={this.state.flows} />

                    {/* <View style={[flow.verticalFlow]}>
                          <Image style={[flow.verticalLine]} source={require('../../images/verticalLine.png')}></Image>
                              <View style={[flow.verticalList]}>
                                <View style={[flow.verticalListView]}>
                                  <TouchableHighlight underlayColor="transparent" >
                                    {this.renderFlowImg(0)}
                                  </TouchableHighlight>
                                  <Text style={[fonts.hintText_Gray,flow.verticalDate]}>{this.state.flows[0].date}</Text>
                                </View>
                                <View style={[flow.verticalListView]}>
                                  <TouchableHighlight underlayColor="transparent" onPress={()=>this.addBusinessFlowBtnPress('到访')}>
                                    {this.renderFlowImg(1)}
                                  </TouchableHighlight>
                                  <Text style={[fonts.hintText_Gray,flow.verticalDate]}>{this.state.flows[1].date}</Text>
                                </View>
                                <View style={[flow.verticalListView]}>
                                  <TouchableHighlight underlayColor="transparent" onPress={()=>this.addBusinessFlowBtnPress('认购')}>
                                    {this.renderFlowImg(2)}
                                  </TouchableHighlight>
                                  <Text style={[fonts.hintText_Gray,flow.verticalDate]}>{this.state.flows[2].date}</Text>
                                </View>
                                <View style={[flow.verticalListView]}>
                                  <TouchableHighlight underlayColor="transparent" onPress={()=>this.addBusinessFlowBtnPress('签约')}>
                                    {this.renderFlowImg(3)}
                                  </TouchableHighlight>
                                  <Text style={[fonts.hintText_Gray,flow.verticalDate]}>{this.state.flows[3].date}</Text>
                                </View>
                                <View style={[flow.verticalListView]}>
                                  <TouchableHighlight underlayColor="transparent" >
                                    {this.renderFlowImg(4)}
                                  </TouchableHighlight>
                                  <Text style={[fonts.hintText_Gray,flow.verticalDate]}>{this.state.flows[4].status ? this.state.flows[4].date : null}</Text>
                                </View>
                                <View style={[flow.verticalListView]}>
                                  <TouchableHighlight underlayColor="transparent" >
                                    {this.renderFlowImg(5)}
                                  </TouchableHighlight>
                                  <Text style={[fonts.hintText_Gray,flow.verticalDate]}>{this.state.flows[5].date}</Text>
                                </View>
                              </View>
                    </View> */}

                    <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.BusinessRentDetails({businessId:this.state.businessId,fromProject:true})}>
                      <View style={[styles.viewMore]}>
                        <Text style={[styles.viewTextMore,fonts.hintText_Gray]}>查看详情</Text>
                        <Image source={require('../../images/more.png')}></Image>
                      </View>
                    </TouchableHighlight>
                    {this.renderBusinessFlowBtn()}
                  </View>
            </ScrollView>
            :null}
            {this.renderModal()}{this.renderLoading()}
      </View>
    );
  }
}
AppRegistry.registerComponent('ProjectCustomerDetails', () => ProjectCustomerDetails);
