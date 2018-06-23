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
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/tourists/CustomerDetails';
import {flow} from '../../styles/tourists/BusinessFlow';
import {apis} from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import BusinessHorizonLine from '../newTourists/BusinessHorizonLine';
import {Title} from '../../commonComponents/CommentTitle/Title';

var moment = require('moment');

import BasicComponent from '../basic/BasicComponent.js'
export default class CustomerDetails extends BasicComponent {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      customerId:this.props.id,
      customer:null,
      flowList:null,
      customerMarks:null,
      mark:'',
    }
  }

  componentWillMount(){
    this.openLoading();
    storage.load({
      key: keys.getCustomerBusinessDetail,
      syncInBackground: false,
      syncParams: {
         url: apis.getCustomerBusinessDetail + '?customerId=' + this.state.customerId
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json();
      }else{
        this.closeLoading();
        this.msgShort('请求异常');
        return Promise.reject('error');
      }
    }).then(retJson=>{
      if (retJson!=null) {
        this.closeLoading();
        this.setState({
          customer:retJson,
          flowsList:this.getFlowText(retJson.businesses),
          customerMarks:retJson.customerMarks ? retJson.customerMarks : [],
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

  getFlowText(businessList){
    let flowsList=[];
    for (var i in businessList) {
      let flows=businessList[i].businessFlows;
      let flowText=[];
      for (var j in flows) {
        flowText.push({
          type:flows[j].flowType,
          status:flows[j].flowStatus,
          date:flows[j].updateTime ? moment(flows[j].date).format('YYYY-MM-DD HH:mm:ss') : null,
        });
      }
      flowsList.push(flowText);
    }
    return flowsList;
  }

  renderCustomerMark(){
    if (this.state.customerMarks.length>0) {
      let lastMark=this.state.customerMarks[this.state.customerMarks.length-1];
      return (
        <View style={[styles.article]}>
              <Text style={[styles.articleText,fonts.bodyText_Gray]}>{lastMark.mark}</Text>
              <Text style={[styles.articleNum,fonts.hintText_Gray2]}>{moment(lastMark.createTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
        </View>
      )
    }
    else {
      return (
        <View style={[styles.article]}>
              <Text style={[styles.articleText,fonts.bodyText_Gray]}></Text>
              <Text style={[styles.articleNum,fonts.hintText_Gray2]}></Text>
        </View>
      )
    }
  }

  renderBusinessFlow(index){
    let business=this.state.customer.businesses[index];
    let flow=this.state.flowsList[index];
    return(
      <View key={index}>
        <View style={[styles.ListTextNum]}>
              <View style={[styles.ListNum]}>
                    <Text style={[fonts.bodyText_Black]}>{index+1}.</Text>
              </View>
              <View style={[styles.project]}>
                    <Text style={[styles.projectText,fonts.hintText_Black]}>项目名称：{business.project.name}</Text>
                    <Text style={[styles.projectText,fonts.hintText_Black]}>项目经理：{business.project.projectManager == null ? '暂无' : business.project.projectManager.name}</Text>
                    <Text style={[styles.projectText,fonts.hintText_Black]}>需求类型：{business.businessType}</Text>
              </View>
        </View>
        <BusinessHorizonLine flows={flow} />
        <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.BusinessRentDetails({businessId:business.id,fromProject:false})}>
              <View style={[styles.viewMore]}>
                    <Text style={[styles.viewTextMore,fonts.hintText_Gray]}>查看详情</Text>
                    <Image source={require('../../images/more.png')}></Image>
              </View>
        </TouchableHighlight>
      </View>
    );
  }
  _saveCustomerMark(){
    this.openLoading('正在保存...');
    let mark = this.state.mark
    if (!mark) {
      this.msgShort('需求备注不能为空')
      return
    }
    let remarks={
        "mark": this.state.mark,
        "customer":'/customers/'+this.props.id,
    }
    console.log(remarks);
    storage.load({
      key: keys.saveCustomerMark,
      syncInBackground: false,
      syncParams: {
         url: apis.saveCustomerMark,
         body:remarks,
      }
    }).then(ret => {
      console.log(ret);
      if(ret.status == 201){
        return ret.json()
      } else {
        this.msgShort('请求异常')
      }
    }).then(retJson=>{
      console.log(retJson);
      this.closeLoading();
      this.msgShort('提交成功');
      this.state.customerMarks.push(retJson);
      this.setState({customerMarks:this.state.customerMarks,mark:''})
    }).catch(err => {
      this.msgShort("异常");
      this.closeLoading();
    })
  }
  // 更多弹框
  moreContent(){
    this.content(
      {
        isWholeCustom:true,
        customText:()=>{
          return (
            <View style={[styles.mask]}>
                <View style={styles.centerView}>
                      <View style={[styles.remarksTitle]}><Text style={[fonts.t2_Black]}>备注</Text></View>
                      <TextInput
                        style={[fonts.bodyText_Gray,styles.moreInput]}
                        underlineColorAndroid="transparent"
                        clearButtonMode="always" returnKeyType='done'
                        placeholder="亲，可以在这输入您更多的需求哦"
                        placeholderTextColor="#ccc"
                        multiline={true} blurOnSubmit={true}
                        value={this.state.mark}
                        onChangeText={(text) => this.setState({mark:text})}
                      />
                      <View style={[styles.viewBtn]}>
                            <TouchableHighlight style={[styles.listNoBtn2]} underlayColor="transparent" onPress={()=>{this.closeModal()}}>
                                  <Text style={[fonts.btnText_Gray]}>取消</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={[styles.listBtn2]} underlayColor="transparent" onPress={()=>{this.closeModal();this._saveCustomerMark()}}>
                                  <Text style={[styles.textAlignRight,fonts.btnText_Gray]}>保存</Text>
                            </TouchableHighlight>
                      </View>
                </View>

          </View>
        );
        }
      })
  }

  render() {
    if (this.state.customer) {
      return (
        <View style={[styles.mainView]}>
              <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
              <View style={[styles.nav]}>
                    <TouchableHighlight style={[styles.navLeftIcon]} underlayColor="transparent" onPress={()=>Actions.pop({})}>
                          <Image source={require('../../images/back.png')}></Image>
                    </TouchableHighlight>
                    <View style={[styles.navTitle]}>
                          <Text style={[fonts.t2_Black]}>客户详情</Text>
                    </View>
                    <TouchableHighlight style={[styles.navRightText]} underlayColor="transparent" onPress={() =>Actions.EditCustomerDetails({customerId:this.state.customerId})}>
                          <Text style={[fonts.bodyText_Black]}>编辑</Text>
                    </TouchableHighlight>
              </View>
              <ScrollView style={[styles.scrollView]}>
                    <View style={[styles.view]}>
                          <View style={styles.titleView}>
                                <Text style={fonts.t3_Black}>基本信息</Text>
                          </View>
                          <View style={[styles.ListView]}>
                                <Image style={[styles.ListViewIcon]} source={require('../../images/touristsIcon4.png')}></Image>
                                <Text style={[styles.textCenter,fonts.bodyText_Black]}>客户姓名：</Text>
                                <Text style={[styles.textLeft,fonts.bodyText_Gray]}>{this.state.customer.name}</Text>
                          </View>
                          <View style={[styles.ListView]}>
                                <Image style={[styles.ListViewIcon]} source={require('../../images/touristsIcon5.png')}></Image>
                                <Text style={[styles.textCenter,fonts.bodyText_Black]}>联系方式：</Text>
                                <Text style={[styles.textLeft,fonts.bodyText_Gray]}>{this.state.customer.tel}</Text>
                          </View>
                          <View style={[styles.ListView]}>
                                <Image style={[styles.ListViewIcon]} source={require('../../images/touristsIcon6.png')}></Image>
                                <Text style={[styles.textCenter,fonts.bodyText_Black]}>录入时间：</Text>
                                <Text style={[styles.textLeft,fonts.bodyText_Gray]}>{moment(this.state.customer.createTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
                          </View>
                    </View>
                    <View style={[styles.view]}>
                          <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.NeedRemarksList({marks:this.state.customerMarks,customerId:this.state.customerId})}>
                                <View style={[styles.titleViewMore]}>
                                      <Text style={[fonts.t3_Black]}>客户跟进</Text>
                                      <Text style={[styles.titleText,fonts.hintText_Gray]}>共{this.state.customerMarks.length}条</Text>
                                      <Image style={[styles.ListViewIcon]} source={require('../../images/more.png')}></Image>
                                </View>
                          </TouchableHighlight>
                          {this.renderCustomerMark()}
                          <TouchableHighlight style={[styles.subMore]} underlayColor="transparent" onPress={()=>{this.moreContent()}}>
                                <View style={[styles.viewMoreBtn]}>
                                      <Text style={[fonts.hintText_Blue]}>填写客户跟进</Text>
                                </View>
                          </TouchableHighlight>
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
                          {
                            this.state.customer.businesses.map((item,index)=>{
                              return this.renderBusinessFlow(index);
                            })
                          }
                    </View>
              </ScrollView>
              <TouchableHighlight style={[styles.listBtn]} underlayColor="#3a8ff3" onPress={()=>{
                this.checkIsLogin('ReportProject').then(flag=>{
                  if (flag) {
                    Actions.ReportProject({source: 2, customerId: this.state.customerId})
                  }
                })
              }}>
                <Text style={[fonts.btnText_white]}>客户报备</Text>
              </TouchableHighlight>
              {this.renderModal()}{this.renderLoading()}
        </View>
      );
    }
    else {
      return <View>{this.renderModal()}{this.renderLoading()}</View>
    }
  }
}
AppRegistry.registerComponent('CustomerDetails', () => CustomerDetails);
