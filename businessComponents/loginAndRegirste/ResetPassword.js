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
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/commonStyle/ListForm';
import BasicComponent from '../basic/BasicComponent';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import {apis,sites} from '../../systemComponents/Remote/ApiStorage';
import CountDown from '../basic/CountDown';
import {md5HashX} from '../../commonComponents/encrypt/PasswordHelper';
import { Actions } from 'react-native-router-flux';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class ResetPassword extends BasicComponent {

  constructor () {
    super()
    this.state = {
     modalObject:{},
     loadingObject:{},
     countDownStart: false
    }
  }

  sendCode(){
    let phone = this.state.tel
    if (!/(^[1][0-9]{10}$)/.test(phone)) {
      this.msgShort('手机号格式错误');
      return
    }

    storage.load({
      key: keys.accountVer,
      syncInBackground: false,
      syncParams: {
	       url: apis.accountVer +'?account='+phone
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json();
      }else{
        this.msgShort('验证码发送失败');
      };
    }).then(retJson=>{
      if(retJson){
        storage.load({
          key: keys.resetPasswordCode,
          syncInBackground: false,
          syncParams: {
             url: apis.resetPasswordCode + '?phone=' + phone
          }
        }).then(ret => {
          if(ret.status == 200){
            this.setState({
              countDownStart: true
            })
            this.setState({
              countDownStart: false
            })
            this.msgShort('发送成功');
          }else{
            this.msgShort('发送失败');
          }
        }).catch(err => {
          this.msgShort('注册码发送异常');
        });
      }else {
        this.msgShort('用户不存在');
      }
   }).catch(err=>{
     this.msgShort('验证码发送失败');
   })


  }

  resetPassword(){
    let tel = this.state.tel
    if (!/(^[1][0-9]{10}$)/.test(tel)) {
      this.msgShort('手机号格式错误')
      return
    }
    let captcha = this.state.captcha;
    if (!/(^[0-9]{4,6}$)/.test(captcha)) {
      this.msgShort('验证码格式错误');
      return
    }
    let password = this.state.password;
    let password2=this.state.password2;
    if (!password || !password2 || password.length < 6 || password2.length < 6) {
      this.msgShort('密码格式错误');
      return
    }
    if(password != password2){
      this.msgShort('两次密码输入不一致');
      return
    }
    storage.load({
      key: keys.resetPassword,
      syncInBackground: false,
      syncParams: {
         url: apis.resetPassword+'?phone='+tel+ '&captcha=' + captcha + '&password=' + md5HashX(password)
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.text()
      } else {
        this.msgShort('重置失败')
        return
      }
    }).then(content => {
      if (content=='true') {
        this.msgShort('重置成功')
        Actions.Login()
      }
      else {
        this.msgShort('重置失败')
      }
    }).catch(err => {
      this.msgShort('重置异常')
    })

  }

  render() {
    return (
      <View style={[styles.mainList]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <Title isLeftShow={true} backColor={true} title={'忘记密码'}>
        </Title>
        <View style={[styles.listView]}>
          <View style={[styles.listViewText]}><Text style={[fonts.bodyText_Black]}>注册账号：</Text></View>
          <TextInput
            style={[styles.listInput,fonts.bodyText_Gray]}
            underlineColorAndroid="transparent"
            clearButtonMode="always" returnKeyType='done'
            placeholder="请输入手机号"
            placeholderTextColor="#ccc"
            onChangeText={(text) => this.setState({tel: text})}
          />
        </View>
        <View style={[styles.listView,styles.positionR]}>
          <View style={[styles.listViewText1]}><Text style={[fonts.bodyText_Black]}>验  证  码：</Text></View>
          <TextInput
            style={[styles.listInput,fonts.bodyText_Gray]}
            underlineColorAndroid="transparent"
            clearButtonMode="always" returnKeyType='done'
            placeholder="请输入验证码"
            placeholderTextColor="#ccc"
            onChangeText={(text) => this.setState({captcha: text})}
          />
          <CountDown
            onPress={() => {this.sendCode()}}
            time={60}
            countDownStart={this.state.countDownStart}
            text='获取验证码'/>
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
            placeholder="请重复输入新密码"
            placeholderTextColor="#ccc"
            secureTextEntry={true}
            maxLength={12}
            onChangeText={(text) => this.setState({password2: text})}
          />
        </View>
        <TouchableHighlight style={[styles.listBtn,styles.marginTop50]} underlayColor="transparent" onPress={() => this.resetPassword()}>
          <Text style={[fonts.btnText_white]}>确认</Text>
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
AppRegistry.registerComponent('resetPassword', () => resetPassword);
