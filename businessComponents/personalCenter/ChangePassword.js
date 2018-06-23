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
import { Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/commonStyle/ListForm';
import BasicComponent from '../basic/BasicComponent';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { apis,sites } from '../../systemComponents/Remote/ApiStorage';
import CountDown from '../basic/CountDown';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class ChangePassword extends BasicComponent {
  constructor(props){
     super(props);
     this.state={
      modalObject:{},
      loadingObject:{},
      oriPassword:'',
      password:'',
      authPassword:'',
      captcha:'',
      account:'',
      userId:'',
      countDownStart: false
     }
   }
   _loadData(){
     storage.load({key: keys.currentUser}).then(currentUser => {
         this.setState({
           userId:currentUser.id,
           account:currentUser.account
         })
     }).catch(err => {
      //  this.msgShort("用户失效，请重新登录3");
       Actions.replace('Login',{})
     })
   }

   _pwdChangeSendMessage(){
     this.openLoading('正在发送中...');
     storage.load({
       key: keys.pwdChangeSendMessage,
       syncInBackground: false,
       syncParams: {
          url: apis.pwdChangeSendMessage + '?phone=' + this.state.account
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

   _submit(){
     let userId = this.state.userId
     let oriPassword = this.state.oriPassword
     let password = this.state.password
     let authPassword = this.state.authPassword
     let captcha = this.state.captcha
     if(oriPassword.length < 6) {
       this.msgShort('请输入6-12位原始密码！')
       return
     }
     if(password.length < 6) {
       this.msgShort('请输入6-12位新密码！')
       return
     }
     if(authPassword.length < 6) {
       this.msgShort('请输入6-12位确认密码！')
       return
     }

     if(!captcha) {
       this.msgShort('请输入验证码！')
       return
     }
     if(authPassword != password){
       this.msgShort('两次密码输入不一致！')
       return
     }
     this.openLoading('正在修改密码，请稍候...');

     storage.load({
       key: keys.passwordChange,
       syncInBackground: false,
       syncParams: {
          url: apis.passwordChange + '?userId=' + userId + '&oriPassword=' + oriPassword + '&password=' + password + '&captcha=' + captcha
       }
     }).then(ret => {
       return ret.json()
     }).then(res => {
       this.closeLoading()
       if(res.id){
         this.msgShort('修改成功')
         storage.save({
           key:keys.currentUser,
           data:null,
           expires: null
         }).then(res=>{
           Actions.replace('Login',{});
         })
       } else {
         this.msgShort(res.msg)
       }
     }).catch(err => {
       this.msgShort('修改异常')
     })
   }

   componentWillMount(){
     this._loadData();
   }

  render() {
    return (
      <View style={[styles.mainList]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <Title isLeftShow={true} backColor={true} isRightBtnShow={false} title={'修改密码'}/>
        <View style={[styles.listView]}>
          <View style={[styles.listViewText]}><Text style={[fonts.bodyText_Black]}>原始密码：</Text></View>
          <TextInput
            style={[styles.listInput,fonts.bodyText_Gray]}
            underlineColorAndroid="transparent"
            clearButtonMode="always" returnKeyType='done'
            placeholder="请输入原始密码"
            placeholderTextColor="#ccc"
            secureTextEntry={true}
            maxLength={12}
            onChangeText={(text) => this.setState({oriPassword: text})}
          />
        </View>
        <View style={[styles.listView]}>
          <View style={[styles.listViewText]}><Text style={[fonts.bodyText_Black]}>新  密  码：</Text></View>
          <TextInput
            style={[styles.listInput,fonts.bodyText_Gray]}
            underlineColorAndroid="transparent"
            clearButtonMode="always" returnKeyType='done'
            placeholder="请输入新密码"
            placeholderTextColor="#ccc"
            secureTextEntry={true}
            maxLength={12}
            onChangeText={(text) => this.setState({password: text})}
          />
        </View>
        <View style={[styles.listView]}>
          <View style={[styles.listViewText]}><Text style={[fonts.bodyText_Black]}>确认密码：</Text></View>
          <TextInput
            style={[styles.listInput,fonts.bodyText_Gray]}
            underlineColorAndroid="transparent"
            clearButtonMode="always" returnKeyType='done'
            placeholder="请重新输入新密码"
            placeholderTextColor="#ccc"
            secureTextEntry={true}
            maxLength={12}
            onChangeText={(text) => this.setState({authPassword: text})}
          />
        </View>
        <View style={styles.listView}>
          <View style={styles.listViewText}><Text style={[fonts.bodyText_Black]}>手  机  号：</Text></View>
          <View style={styles.listInputView}><Text style={fonts.bodyText_Gray}>{this.state.account}</Text></View>
        </View>
        <View style={[styles.listView,styles.positionR]}>
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
          <CountDown
            onPress={() => {this._pwdChangeSendMessage()}}
            time={60}
            countDownStart={this.state.countDownStart}
            text='获取验证码'/>
        </View>
        <TouchableHighlight style={[styles.listBtn,styles.marginTop50]} underlayColor="#3a8ff3" onPress={() => this._submit()}>
          <Text style={[fonts.btnText_white]}>提交</Text>
        </TouchableHighlight>
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
AppRegistry.registerComponent('changePassword', () => changePassword);
