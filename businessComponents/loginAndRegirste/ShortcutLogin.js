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
import {cityData} from '../data/CityData'
import CitySelect from '../../commonComponents/city/CitySelect';
import CountDown from '../basic/CountDown';
import {GeTuiPush} from '../../commonComponents/getui/GeTuiPush';
import {NetworkInfo} from 'react-native-network-info';
import {Title} from '../../commonComponents/CommentTitle/Title';
var Platform = require('Platform');

export default class ShortcutLogin extends BasicComponent {
  constructor(props){
     super(props);
     this.state={
      modalObject:{},
      loadingObject:{},
      account:' ',
      captcha:' ',
      text:cityData,
      status:[true,false],
      modalVisible: false,
      selectedCity:"",
      cityIsVisible:false,
      selectIndex:0,
      city:cityData,
      countDownStart: false
     }
   }
   componentWillMount(){
     this.initCitySelectIndex();
   }
   initCitySelectIndex(){
     storage.load({
       key:keys.currentRemoteSite
     }).then(sites=>{
       for (var i = 0; i < this.state.city.length; i++) {
         if (this.state.city[i].value === sites) {
           this.setState({selectIndex:i,selectedCity:this.state.city[i].text});
           break;
         }
       }
     }).catch((error)=>{
       this.setState({selectIndex:0});
     })
   }
   closeCity(){
     this.setState({cityIsVisible:false});
   }
   changeCity(index){
     let tempCity = this.state.city[index];
     this.setState({selectIndex:index,selectedCity:tempCity.text,cityIsVisible:false});
     storage.save({key: keys.currentRemoteSite,data: tempCity.value,expires: null});
   }
  // 选择城市
  addClass(index) {
    let showState = this.state.status;
    showState[this.state.currentIndex] = false;
    showState[index] = !showState[index];
     this.setState({
       status:showState,
       currentIndex:index,
       modalVisible:false,
       selectedCity:this.state.text[this.state.currentIndex].text
     });
     this.closeModal();
    storage.save({
     key: keys.currentRemoteSite,
     data: this.state.text[this.state.currentIndex].value,
     expires: null
   });
  }

  _captcha(){
    let phone = this.state.account
    if (!/(^[1][0-9]{10}$)/.test(phone)) {
      this.msgShort('手机号格式错误');
      return
    }

    storage.load({
      key: keys.accountVer,
      syncInBackground: false,
      syncParams: {
	       url: apis.accountVer +'?account='+this.state.account
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
          key: keys.captchaVer,
          syncInBackground: false,
          syncParams: {
    	       url: apis.captchaVer +'?phone=' + this.state.account
          }
        }).then(res=>{
          if (res.status==200) {
            this.setState({
              countDownStart: true
            })
            this.setState({
              countDownStart: false
            })
            this.msgShort('验证码发送成功');
          }else {
            this.msgShort('验证码发送失败');
          }
        })
      }else {
        this.msgShort('用户不存在');
      }
   }).catch(err=>{
     this.msgShort('验证码发送失败');
   })
  }

  login(){
    let phone = this.state.account
    if (!/(^[1][0-9]{10}$)/.test(phone)) {
      this.msgShort('手机号格式错误')
      return
    }
    let captcha = this.state.captcha
    if (!/(^[0-9]{4,6}$)/.test(captcha)) {
      this.msgShort('验证码格式错误')
      return
    }

    storage.load({
      key: keys.shortcutLoginForTelphone,
      syncInBackground: false,
      syncParams: {
	       url: apis.shortcutLoginForTelphone +'?phone='+this.state.account + '&code='+this.state.captcha
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json();
      }else{
        this.msgShort("登录失败");
      };
    }).then(res=>{
      if(res.user){
        let retJson = res.user;
        if(retJson.projectManager && retJson.status=="锁定"){
          this.msgShort("登录失败，您的账号已锁定！");
        }else{
          this.msgShort('登录成功');
          this._addUserLog(retJson.id);
          let currentUser ={}
          currentUser.account = retJson.account
          currentUser.id = retJson.id
          currentUser.roleType = retJson.roleType
          currentUser.projectManager = retJson.projectManager
          currentUser.spreadQrCode = retJson.spreadQrCode
          currentUser.developQrCode = retJson.developQrCode
          storage.save({
            key: keys.currentUser,
            data: currentUser,
            expires: null
          })
          GeTuiPush.recordDeviceInfo(retJson.id);
          if (this.props.onLogin) {
            this.props.onLogin()
          }
          Actions.Index({});
        }

      }else{
        this.msgShort(res.msg);
      }
   }).catch(err=>{
     this.msgShort('登录异常');
   })
  }
  // 添加用户登陆日志
  _addUserLog(userId){
      let platform = 1;
      if (Platform.OS === 'android') {
          platform=2;
      }
      let contentInfo = '?userId='+userId+'&loginStatus=2&platform='+platform;
      storage.load({
        key: keys.saveLoginLog,
        syncInBackground: false,
        syncParams: {
           url: apis.saveLoginLog+contentInfo,
        }

      }).catch(err => {

      })
  }

  shortcutLoginContent(){
    this.content(
      {
        isWholeCustom:true,
        customText:()=>{
          return (<View style={styles.Fullscreen}><View style={styles.cityNav}>
                <TouchableHighlight style={styles.closeBtn} underlayColor="transparent" onPress={() => {this.closeModal()}}>
                   <Image source={require('../../images/back.png')}/>
                </TouchableHighlight>
                <Text style={[styles.cityNavText,fonts.t2_Black]}>选择城市</Text>
          </View>
          <View style={styles.hotCity}>
                <Text style={[styles.hotCityTitle,fonts.t3_Black]}>热门城市</Text>
                <View style={styles.hotCityList}>
                      <TouchableHighlight style={this.state.status[0]?[styles.hotCityTouchRest]:[styles.hotCityTouch]}  underlayColor="transparent" onPress={()=>this.addClass(0)}>
                         <Text style={[styles.hotCityText,fonts.bodyText_Gray]}>{this.state.text[0].text}</Text>
                      </TouchableHighlight>
                      <TouchableHighlight style={this.state.status[1]?[styles.hotCityTouchRest]:[styles.hotCityTouch]} underlayColor="transparent" onPress={()=>this.addClass(1)}>
                         <Text style={[styles.hotCityText,fonts.bodyText_Gray]}>{this.state.text[1].text}</Text>
                      </TouchableHighlight>
                 </View>
          </View></View>);
        }
      })
  }
  render() {
    return (
      <View style={[styles.mainList]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <Title isLeftShow={true} backColor={true} isRightBtnShow={true} rightChoose={true} title={'登录'} btnText={'注册'} urlTitle={'Register'}>
        </Title>
        <View style={[styles.listView]}>
          <Text style={[styles.listIcon]}>*</Text>
          <TextInput
            style={[styles.listInput,fonts.bodyText_Gray]}
            underlineColorAndroid="transparent"
            clearButtonMode="always" returnKeyType='done'
            placeholder="请输入手机号"
            placeholderTextColor="#ccc"
            onChangeText={(text) => this.setState({account: text})}
          />
          <CountDown
            onPress={() => {this._captcha()}}
            time={60}
            countDownStart={this.state.countDownStart}
            text='获取验证码'/>
        </View>
        <View style={[styles.listView]}>
          <Text style={[styles.listIcon]}>*</Text>
          <TextInput
            style={[styles.listInput,fonts.bodyText_Gray]}
            underlineColorAndroid="transparent"
            clearButtonMode="always" returnKeyType='done'
            placeholder="请输入验证码"
            placeholderTextColor="#ccc"
            onChangeText={(text) => this.setState({captcha: text})}
          />
        </View>
        <TouchableHighlight style={[styles.city]} underlayColor="transparent" onPress={() => {this.setState({cityIsVisible:true})}}>
          <Text style={[fonts.bodyText_Black]}>{this.state.selectedCity}<Text style={[fonts.bodyText_Blue]}>（更改城市）</Text></Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.listBtn,styles.marginTop180]} underlayColor="#3a8ff3" onPress={() => this.login()}>
          <Text style={[fonts.btnText_white]}>登录</Text>
        </TouchableHighlight>
        <CitySelect cityClick={(index)=>{this.changeCity(index)}} isVisible={this.state.cityIsVisible} onClose={()=>{this.closeCity()}} cityData={this.state.city} selectIndex={this.state.selectIndex} />

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
AppRegistry.registerComponent('shortcutLogin', () => shortcutLogin);
