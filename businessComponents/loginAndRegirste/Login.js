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
import {styles} from '../../styles/loginAndRegirste/Login';
import BasicComponent from '../basic/BasicComponent';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { apis,sites } from '../../systemComponents/Remote/ApiStorage';
import {cityData} from '../data/CityData'
import CitySelect from '../../commonComponents/city/CitySelect';
import PositionSelect from '../../commonComponents/BtnCommon/PositionSelect';
import {md5HashX} from '../../commonComponents/encrypt/PasswordHelper';
import {GeTuiPush} from '../../commonComponents/getui/GeTuiPush';
import {NetworkInfo} from 'react-native-network-info';
var Platform = require('Platform');
export default class Login extends BasicComponent {

  constructor(props){
     super(props);
     this.state={
      modalObject:{},
      loadingObject:{},
      account:'',
      password:'',
      text:cityData,
      status:[true,false],
      modalVisible: false,
      selectedCity:"",
      cityIsVisible:false,
      selectIndex:0,
      city:cityData,
      sourceFlag:this.props.sourceFlag
     }
   }
   componentWillReceiveProps(nextProps){
     this.initCitySelectIndex();
   }
   componentWillMount(){

     // APP启动的时候获取地理位置
     PositionSelect._onPosition(() => {
      this.initCitySelectIndex();
     });



     if (this.state.sourceFlag!=undefined&&this.state.sourceFlag!=null&&this.state.sourceFlag.length>0) {
       if (this.state.sourceFlag==='exit') {
         this.setState({sourceFlag:null})
         return ;
       }
       this.msgShort('您还没有登录哦，请先登录');
       this.setState({sourceFlag:null})
     }
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
       //this._initMenuData();
       console.log(this.state.selectedCity)
     }).catch((error)=>{
       this.setState({selectIndex:0});
     })
   }
   _initMenuData(){
     storage.remove({key: keys.projectListConditions});
     storage.load({
       key: keys.projectListConditions,
       syncInBackground: false,
       syncParams: {
          url: apis.projectListConditions
       }
     }).then(ret => {
       return ret.json()
     }).then(kv => {
       this.saveToStorage(keys.projectListConditions,kv)
     })
   }
   saveToStorage(key,value){
     storage.save({
       key:key,
       data:value,
       expires: 1000 * 3600
     })
   }
  loginAction(){
    this.openLoading('正在登录...');
    let account = this.state.account;
    let password = md5HashX(this.state.password);
    //dosomething
    storage.load({
      key: keys.login,
      syncInBackground: false,
      syncParams: {
	       url: apis.login +'?account='+account+'&password='+password
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json();
      }else{
        if (ret.status == 404) {
          return Promise.reject('404')
        }else {
          return Promise.reject('500')
        }
      };
    }).then(retJson=>{
      if(retJson.projectManager && retJson.status=="锁定"){
        this.closeLoading();
        this.msgShort("登录失败，您的账号已锁定！");
      }else if (retJson&&retJson.account) {
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
       });
       GeTuiPush.recordDeviceInfo(retJson.id);
       this.closeLoading();
       Actions.reset('Index',{});
      }else if (retJson == '404') {
        this.closeLoading();
        this.msgShort("账号密码不正确，请确定城市是否选择正确");
      }
    }).catch(err => {
      if (err == '404') {
        this.closeLoading();
        this.msgShort("账号密码不正确，请确定城市是否选择正确");
      }else {
        this.closeLoading();
        this.msgShort("登录失败,请稍后再次尝试");
      }


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

  changeCity(index){
    let tempCity = this.state.city[index];
    this.setState({selectIndex:index,selectedCity:tempCity.text,cityIsVisible:false});
    storage.save({key: keys.currentRemoteSite,data: tempCity.value,expires: null});
  }
  closeCity(){
    this.setState({cityIsVisible:false});
  }
  render() {
    return (
      <View style={[styles.loginView]}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true}/>
        <Image
          style={[styles.loginImage]}
          source={require('../../images/bg.png')} >
          <View>
            <View style={[styles.loginViewNav]}>
              <TouchableHighlight style={[styles.loginViewNavL]} underlayColor="transparent" onPress={()=>Actions.reset('Index',{})}>
                <Text style={[styles.loginViewNavLText,fonts.bodyText_white]}>取消</Text>
              </TouchableHighlight>
              <View style={[styles.loginViewNavC]}>
                <Text style={[fonts.t2_white,styles.loginViewNavCText]}>登录</Text>
              </View>
              <TouchableHighlight style={[styles.loginViewNavR]} underlayColor="transparent" onPress={()=>Actions.Register({})}>
                <Text style={[styles.loginViewNavRText,fonts.bodyText_white]}>注册</Text>
              </TouchableHighlight>
            </View>
            <View style={[styles.loginViewInput,styles.loginMarginTop120]}>
              <TextInput
                style={[styles.loginTextInput,fonts.bodyText_white]}
                underlineColorAndroid="transparent"
                clearButtonMode="always" returnKeyType='done'
                placeholder="请输入登录账号"
                placeholderTextColor="#fff"
                keyboardType='numeric'
                maxLength={11}
                value={this.state.account}
                onChangeText={(value)=>{this.setState({account:value})}}
              />
            </View>
            <View style={[styles.loginViewInput,styles.loginMarginTop15]}>
              <TextInput
                style={[styles.loginTextInput,fonts.bodyText_white]}
                underlineColorAndroid="transparent"
                clearButtonMode="always" returnKeyType='done'
                placeholder="请输入密码"
                placeholderTextColor="#fff"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(value)=>{this.setState({password:value})}}
              />
            </View>
            <TouchableHighlight style={[styles.city]} underlayColor="transparent" onPress={() => {this.setState({cityIsVisible:true})}}>
              <Text style={[fonts.bodyText_white]}>{this.state.selectedCity}<Text style={[fonts.bodyText_Blue]}>（更改城市）</Text></Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.loginBtn]} underlayColor="#3a8ff3" onPress={()=>this.loginAction({})}>
              <Text style={[fonts.btnText_white]}>登录</Text>
            </TouchableHighlight>
            <View style={[styles.loginText]}>
              <TouchableHighlight style={[styles.loginTextTab]} underlayColor="transparent" onPress={()=>Actions.ResetPassword({})}><Text style={[fonts.bodyText_white,styles.loginText1]}>忘记密码?</Text></TouchableHighlight>
              <TouchableHighlight style={[styles.loginTextTab]} underlayColor="transparent" onPress={()=>Actions.ShortcutLogin({})}><Text style={[fonts.bodyText_white,styles.loginText2]}>快捷登录</Text></TouchableHighlight>
            </View>
          </View>
        </Image>
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
AppRegistry.registerComponent('Login', () => Login);
