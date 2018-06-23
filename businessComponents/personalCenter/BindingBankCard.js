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
  Modal
} from 'react-native';
var t = require('tcomb-form-native');
import FormBasicComponent from '../basic/FormBasicComponent';
import { Actions,ActionConst } from 'react-native-router-flux';
var TextBox = require('../../commonComponents/forms/TextBox');
import BasicComponent from '../basic/BasicComponent';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/commonStyle/ListForm';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { apis,sites } from '../../systemComponents/Remote/ApiStorage';
import SubmitBtn from '../../commonComponents/BtnCommon/SubmitBtn';
import CountDown from '../basic/CountDown';
import {Title} from '../../commonComponents/CommentTitle/Title';

export default class BindingBankCard extends BasicComponent {
  constructor(props){
     super(props);
     this.state={
      modalObject:{},
      loadingObject:{},
      bank:'',
      bankAccount:'',
      openBank:'',
      userId:'',
      captcha:'',
      phone:'',
      countDownStart: false,
      tcpName:'绑定银行卡说明',
     }
   }

   _loadData(){
     storage.load({key: keys.currentUser}).then(currentUser => {
       this.setState({
         userId: currentUser.id,
         phone:currentUser.account
       })
     })
   }

   _bankSendMessage(){
     this.openLoading('正在发送，请稍候...');
     storage.load({
       key: keys.bankSendMessage,
       syncInBackground: false,
       syncParams: {
          url: apis.bankSendMessage + '?phone=' + this.state.phone
       }
     }).then(ret => {
       if(ret.status == 200){
         this.setState({
           countDownStart: true
         })
         this.setState({
           countDownStart: false
         })
         this.msgShort('发送成功')
       }else{
         this.msgShort('发送失败');
       };
       this.closeLoading();
     }).catch(err => {
       this.msgShort('发送异常');
     })
   }
   _submit(obj){
     let userId = this.state.userId
     let phone = this.state.phone
     let bank = this.state.bank
     let bankAccount = this.state.bankAccount
     let openBank = this.state.openBank
     let captcha = this.state.captcha

     if(!bank) {
       this.msgShort('请输入账户名称！')
       return
     }
     if(!bankAccount || bankAccount.length != 19) {
       this.msgShort('请输入正确银行账号！')
       return
     }
     if(!openBank) {
       this.msgShort('请输入开户行名称！')
       return
     }
     if(!captcha) {
       this.msgShort('请输入验证码！')
       return
     }
     storage.load({
       key: keys.bindBank,
       syncInBackground: false,
       syncParams: {
          url: apis.bindBank + '?userId=' + userId + '&captcha=' + captcha + '&bank=' + bank + '&bankAccount=' + bankAccount
          +'&openBank=' + openBank
       }
     }).then(ret => {
       return ret.json()
     }).then(res => {
       obj.closeLoading();
       if(res.id){
         this.msgShort('绑定银行卡成功')
         Actions.pop({refresh:{random:Math.random()}});
       } else {
         this.msgShort(res.msg)
       }
     }).catch(err => {
       this.msgShort('绑定银行卡异常')
     })
   }

   componentWillMount(){
     this._loadData();
   }

  render() {
    return (
      <View style={[styles.mainList]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <Title isLeftShow={true} backColor={true} isRightBtnShow={false} title={'绑定银行卡'}/>
        <View style={[styles.listView]}>
          <View style={[styles.listViewText]}><Text style={[fonts.bodyText_Black]}>账户名称：</Text></View>
          <TextInput
            style={[styles.listInput,fonts.bodyText_Gray]}
            underlineColorAndroid="transparent"
            clearButtonMode="always" returnKeyType='done'
            placeholder="请输入公司／个人名称"
            placeholderTextColor="#ccc"
            onChangeText={(text) => this.setState({bank: text})}
          />
        </View>
        <View style={[styles.listView]}>
          <View style={[styles.listViewText]}><Text style={[fonts.bodyText_Black]}>银行账号：</Text></View>
          <TextInput
            style={[styles.listInput,fonts.bodyText_Gray]}
            underlineColorAndroid="transparent"
            clearButtonMode="always" returnKeyType='done'
            placeholder="请输入银行账号"
            placeholderTextColor="#ccc"
            maxLength={19}
            keyboardType='numeric'
            onChangeText={(text) => this.setState({bankAccount: text})}
          />
        </View>
        <View style={[styles.listView]}>
          <View style={[styles.listViewText,styles.cardView]}><Text style={[fonts.bodyText_Black]}>开户行名称：</Text></View>
          <TextInput
            style={[styles.listInput,fonts.bodyText_Gray]}
            underlineColorAndroid="transparent"
            clearButtonMode="always" returnKeyType='done'
            placeholder="例：北京银行西二旗支行"
            placeholderTextColor="#ccc"
            onChangeText={(text) => this.setState({openBank: text})}
          />
        </View>

        <View style={[styles.listView]}>
          <View style={[styles.listViewText]}><Text style={[fonts.bodyText_Black]}>手机号：</Text></View>
          <View style={styles.listInput}>
                <Text style={fonts.bodyText_Gray}>{this.state.phone}</Text>
          </View>
          <CountDown
            onPress={() => {this._bankSendMessage()}}
            time={60}
            countDownStart={this.state.countDownStart}
            text='获取验证码'/>
        </View>
        <View style={[styles.listView]}>
          <View style={[styles.listViewText]}><Text style={[fonts.bodyText_Black]}>验证码：</Text></View>
          <TextInput
            style={[styles.listInput,fonts.bodyText_Gray]}
            underlineColorAndroid="transparent"
            clearButtonMode="always" returnKeyType='done'
            placeholder="请输入您的验证码"
            placeholderTextColor="#ccc"
            maxLength={6}
            onChangeText={(text) => this.setState({captcha: text})}
          />
        </View>
        <Text style={[fonts.bodyText_Gray,styles.marginLeft15,styles.marginTop10,styles.listLeftText]}>温馨提示：亲，银行卡绑定不能超过5张哦！</Text>
        <View style={[styles.listText,styles.marginTop50]}>
          <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.Protocol({protocolName:this.state.tcpName})}>
            <Text style={[fonts.bodyText_Blue,styles.listLeftText]}>绑定银行卡说明？</Text>
          </TouchableHighlight>
        </View>
        <SubmitBtn btnText={'提交'} isNeedLoading={false} styles={[styles.listBtn,styles.marginTop10]} onPress={(obj)=>this._submit(obj)} />

        {
          this.renderModal()
        }
        {
          this.renderLoading()
        }
      </View>
    );
  }
}
AppRegistry.registerComponent('BindingBankCard', () => BindingBankCard);
