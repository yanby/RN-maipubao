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
import { Actions,ActionConst } from 'react-native-router-flux';
import FormBasicComponent from '../basic/FormBasicComponent';
var TextBox = require('../../commonComponents/forms/TextBox');
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/commonStyle/ListForm';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CheckBox from 'react-native-check-box';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { apis,sites } from '../../systemComponents/Remote/ApiStorage';
import CountDown from '../basic/CountDown';
import {md5HashX} from '../../commonComponents/encrypt/PasswordHelper';
import {cityData} from '../data/CityData'
import CitySelect from '../../commonComponents/city/CitySelect';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class Register extends FormBasicComponent {
  constructor () {
   super()
   this.state = {
     modalObject:{},
     loadingObject:{},
     types1: [{label: '个人类', value: 0}, {label: '公司类', value: 1}],
     roleType: 0,
     value1Index: 0,
     checked:true,
     text:cityData,
     status:[false,false],
     tel:null,
     captcha:null,
     password:null,
     recommenderTel:null,
     countDownStart: false,
     tcpName:'优铺用户注册协议',

     selectedCity:"",
     cityIsVisible:false,
     selectIndex:0,
     city:cityData,
   }
 }
 componentDidMount(){
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
 changeCity(index){
   let tempCity = this.state.city[index];
   this.setState({selectIndex:index,selectedCity:tempCity.text,cityIsVisible:false});
   storage.save({key: keys.currentRemoteSite,data: tempCity.value,expires: null});
 }
 closeCity(){
   this.setState({cityIsVisible:false});
 }
 renderSatus(item,i){
   let checkStatus = this.state.checked;
   return <CheckBox
     style={styles.checkBoxView}
     onClick={()=>this._onChange()}
     isChecked={checkStatus}
     checkedImage={<Image source={require('../../images/checked.png')} />}
     unCheckedImage={<Image source={require('../../images/noCheck.png')} />}
     />
     ;
 }
_onChange(){
  if(this.state.checked){
    this.setState({checked:false});
  }else{
    this.setState({checked:true});
  }
 }

 _sendRegistryCode() {
   let phone = this.state.tel
   if (!/(^[1][0-9]{10}$)/.test(phone)) {
     this.msgShort('手机号格式错误')
     return
   }
   this.openLoading('正在发送...');
   storage.load({
     key: keys.sendRegistryCode,
     syncInBackground: false,
     syncParams: {
        url: apis.sendRegistryCode + '?phone=' + phone
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
     this.closeLoading();
   })
 }

 _register(){
   let roleType = this.state.roleType
   let tel = this.state.tel
   if (!/(^[1][0-9]{10}$)/.test(tel)) {
     this.msgShort('手机号格式错误')
     return
   }
   let selectedCity = this.state.selectedCity
   let captcha = this.state.captcha
   if (!/(^[0-9]{4,6}$)/.test(captcha)) {
     this.msgShort('验证码格式错误')
     return
   }
   let password = this.state.password
   if (!password || password.length < 6) {
     this.msgShort('密码格式错误')
     return
   }
   let recommenderTel = this.state.recommenderTel
   if (recommenderTel && !/(^[1][0-9]{10}$)/.test(recommenderTel)) {
     this.msgShort('推荐人手机号格式错误')
     return
   }
   let checked = this.state.checked
   if(!checked) {
     this.msgShort('请阅读优铺用户协议')
     return
   }
   this.openLoading('正在注册，请稍候...');
   storage.load({
     key: keys.register,
     syncInBackground: false,
     syncParams: {
        url: apis.register + '?roleType=' + roleType + '&tel=' + tel + '&selectedCity=' + selectedCity
         + '&captcha=' + captcha + '&password=' + md5HashX(password) + (recommenderTel == null ? '' : ('&recommenderTel=' + recommenderTel))
     }
   }).then(ret => {
     return ret.json()
   }).then(res => {
     this.closeLoading()
     if(res.id){
       this.msgShort('注册成功')
       Actions.Login({})
     } else {
       this.msgShort(res.msg)
     }

   }).catch(err => {
     this.msgShort('注册异常')
     this.closeLoading()
   })
 }
  render() {
    return (
      <View style={[styles.mainList]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <Title isLeftShow={true} backColor={true} isRightBtnShow={true} rightChoose={true} title={'注册'} btnText={'登录'} urlTitle={'Login'}>
        </Title>
        <View style={styles.radioView} >
              <RadioForm formHorizontal={true} animation={true} >
              {this.state.types1.map((obj, i) => {
                var onPress = (value, index) => {
                    this.setState({
                      roleType: value,
                      value1Index: index
                    })
                  }
                  return (
                    <RadioButton labelHorizontal={true} key={i} style={styles.radioBtn}>
                                 <RadioButtonInput
                                    obj={obj}
                                    index={i}
                                    isSelected={this.state.value1Index === i}
                                    onPress={onPress}
                                    buttonInnerColor={'#3a8ff3'}
                                    buttonOuterColor={this.state.value1Index === i ? '#eaeaea' : '#eaeaea'}
                                    buttonSize={10}
                                    buttonOuterSize={18}
                                    buttonWrapStyle={{marginLeft: 10}}
                                  />
                                  <RadioButtonLabel
                                    obj={obj}
                                    index={i}
                                    onPress={onPress}
                                    labelStyle={{color: '#333'}}
                                    labelWrapStyle={{marginLeft:10,}}
                                  />
                    </RadioButton>
                  )
             })}
            </RadioForm>
        </View>
        <View>
              <View style={[styles.listView]}>
                <Text style={[styles.listIcon]}>*</Text>
                <TextInput
                  style={[styles.listInput,fonts.bodyText_Gray]}
                  underlineColorAndroid="transparent"
                  clearButtonMode="always" returnKeyType='done'
                  placeholder="请输入手机号"
                  placeholderTextColor="#ccc"
                  keyboardType="numeric"
                  maxLength={11}
                  onChangeText={(text) => this.setState({tel: text})}
                />
              </View>
              <View style={[styles.listView,styles.positionR]}>
                <Text style={[styles.listIcon]}>*</Text>
                <TextInput
                  style={[styles.listInput,fonts.bodyText_Gray]}
                  underlineColorAndroid="transparent"
                  returnKeyType='done'
                  placeholder="请输入验证码"
                  placeholderTextColor="#ccc"
                  keyboardType="numeric"
                  maxLength={6}
                  onChangeText={(text) => this.setState({captcha: text})}
                />
                <CountDown
                  onPress={() => {this._sendRegistryCode()}}
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
                  placeholder="密码"
                  placeholderTextColor="#ccc"
                  maxLength={12}
                  secureTextEntry={true}
                  onChangeText={(text) => this.setState({password: text})}
                />
              </View>
              <View style={[styles.listView]}>
                <TextInput
                  style={[styles.listInput,fonts.bodyText_Gray]}
                  underlineColorAndroid="transparent"
                  clearButtonMode="always" returnKeyType='done'
                  placeholder="请输入推荐人手机号（选填）"
                  placeholderTextColor="#ccc"
                  keyboardType="numeric"
                  maxLength={11}
                  onChangeText={(text) => this.setState({recommenderTel: text})}
                />
              </View>
        </View>
        <View style={[styles.listText,styles.listTextRow]}>
          <TouchableHighlight   underlayColor="transparent" onPress={() => {this.setState({cityIsVisible:true})}}>
            <Text style={[fonts.bodyText_Black]}>{this.state.selectedCity}<Text style={[fonts.bodyText_Blue]}>（更改城市）</Text></Text>
          </TouchableHighlight>
        </View>
        <View style={[styles.listText,styles.listTextRow]}>
          {this.renderSatus()}
          <Text style={[fonts.bodyText_Black]}>我已阅读并同意《</Text>
          <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.Protocol({protocolName:this.state.tcpName})}>
              <Text style={[fonts.bodyText_Blue]}>优铺用户协议</Text>
          </TouchableHighlight>
          <Text style={[fonts.bodyText_Black]}>》</Text>
        </View>
        <TouchableHighlight style={[styles.listBtn,styles.marginTop50]} underlayColor="#3a8ff3" onPress={() => this._register()}>
          <Text style={[fonts.btnText_white]}>注册</Text>
        </TouchableHighlight>
      {
        this.renderModal()
      }
      {
        this.renderLoading()
      }
      <CitySelect cityClick={(index)=>{this.changeCity(index)}} isVisible={this.state.cityIsVisible} onClose={()=>{this.closeCity()}} cityData={this.state.city} selectIndex={this.state.selectIndex} />

      </View>

    );
  }
}
AppRegistry.registerComponent('Register', () => Register);
