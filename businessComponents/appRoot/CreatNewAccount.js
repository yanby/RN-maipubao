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
import {styles} from '../../styles/community/DemandInput';
import BasicComponent from '../basic/BasicComponent';
import { apis,sites } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import {NetworkInfo} from 'react-native-network-info';
import {GeTuiPush} from '../../commonComponents/getui/GeTuiPush';
var Platform = require('Platform');
export default class CreatNewAccount extends BasicComponent {
  constructor (props) {
   super(props)
   this.state = {
     modalObject:{},
     loadingObject:{},
     city:this.props.city,
     isAccountHasExist:false,
     currentUser:{},
     info:'当前您在“'+this.props.city.text+'”城市没有作业账号，但由于优铺目前分城市进行业务管理。若您确定在该城市作业，请点击下方“确认”按钮。我方会在“'+this.props.city.text+'”城市给您创建账号，账号和密码与您当前所用相同。',
     originalCity: null,
     titleInfo:''
   }
 }
 componentWillMount(){
   storage.load({key: keys.currentRemoteSite }).then(ret => {
     this.setState({
       originalCity: ret
     });
   }).catch((error)=>{
   });
   //1、判断目标城市是否有账号
   this.openLoading('检测数据...');
   this.changeCityFun();

   //2、有账号，直接跳转
   //3、没有账号提示 是否创建账号
   //4、点击确定创建账号并且跳转
 }
 changeCityFun(){
   let _url = this.getSiteUrl(this.state.city.value)+apis.findUserByAccount;
   storage.load({key:keys.currentUser}).then(currentUser=>{
     this.setState({currentUser});
     this.loadUserByAccount(currentUser.account,_url,true).then(retJson=>{
       if (retJson&&retJson!='not found user'&&retJson.account) {
         //目标城市有账号
         this.setState({isAccountHasExist:false,titleInfo:'切换城市'})
         this.openLoading('正在跳转...');
         // 清除设备信息
         storage.load({
           key: keys.patchOneUser,
           syncInBackground: false,
           syncParams: {
             isComplateUseCustomUrl: true,
             url: this.getSiteUrl(this.state.originalCity) + apis.patchOneUser + '/' + this.state.currentUser.id,
             body:{
               cid:null,
               platform:null
             }
           }
         }).catch(err => {
         })
         storage.save({key: keys.currentRemoteSite,data: this.state.city.value,expires: null});
         GeTuiPush.recordDeviceInfo(retJson.id);
         //this._refreshMenuData();
         let currentUser ={account:retJson.account,id:retJson.id,roleType:retJson.roleType,projectManager:retJson.projectManager,spreadQrCode:retJson.spreadQrCode,developQrCode:retJson.developQrCode}
         storage.save({key: keys.currentUser,data: currentUser,expires: null});
         this._addUserLog(retJson.id);
         let timer = setTimeout(()=>{
           this.closeLoading();
           Actions.reset('Index',{});
           clearTimeout(timer);
         },1000);
       }else {
         this.closeLoading();
         this.setState({isAccountHasExist:true,titleInfo:'创建账号'})
       }
     })
   }).catch(error=>{
     this.closeLoading();
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

 loadUserByAccount(account,url,isCustom){
  return  storage.load({key:keys.findUserByAccount,syncInBackground: false,syncParams: {
      url: url +'?account='+account,
      isComplateUseCustomUrl:isCustom
   }}).then(ret=>{
     if(ret.status == 200){
       return ret.json();
     }else{
       return Promise.reject('not found user');
     }
   }).catch(err=>{

   });
 }
 getSiteUrl(ret){
   let _url='';
   switch (ret) {
     case 'bj':
       _url = sites.bj;
       break;
     case 'sh':
       _url = sites.sh;
       break;
     case 'tj':
       _url = sites.tj;
       break;
     case 'hn':
       _url = sites.hn;
       break;
     case 'cs':
       _url = sites.cs;
       break;
     case 'sy':
       _url = sites.sy;
       break;
     case 'sq':
       _url = sites.sq;
       break;
    case 'xz':
       _url = sites.xz;
       break;
     default:
       _url = sites.bj;
       break;
   }
   return _url;
 }

 // 确认事件
 _Sure(){
   let currentUser = this.state.currentUser;
   this.openLoading('正在创建...');
   //查询出当前城市账户的密码和账户
   this.loadUserByAccount(currentUser.account,apis.findUserByAccount).then(retJson=>{
      if (retJson) {
        //在目标城市存储
        let _url = this.getSiteUrl(this.state.city.value)
        let roleType = 0;
        if (retJson.roleType.indexOf('公司')>-1) {
          roleType = 1;
        }
         storage.load({
           key: keys.migration,
           syncInBackground: false,
           syncParams: {
              url:_url +apis.migration + '?roleType=' + roleType+'&tel='+currentUser.account+'&password='+retJson.password+'&city='+this.state.city.city,
              isComplateUseCustomUrl:true
           }
         }).then(ret => {
           return ret.json()
         }).then(res => {
           this.closeLoading()
           if(res.user){
             this.msgShort('创建成功,正在跳转',()=>{
               // 清除设备信息
               storage.load({
                 key: keys.patchOneUser,
                 syncInBackground: false,
                 syncParams: {
                   isComplateUseCustomUrl: true,
                   url: this.getSiteUrl(this.state.originalCity) + apis.patchOneUser + '/' + this.state.currentUser.id,
                   body:{
                     cid:null,
                     platform:null
                   }
                 }
               }).catch(err => {
               })
               storage.save({key: keys.currentRemoteSite,data: this.state.city.value,expires: null});
               GeTuiPush.recordDeviceInfo(res.user.id);
               // this._refreshMenuData();
               let currentUser ={account:res.user.account,id:res.user.id,roleType:res.user.roleType,projectManager:res.user.projectManager,spreadQrCode:res.user.spreadQrCode,developQrCode:res.user.developQrCode}
               storage.save({key: keys.currentUser,data: currentUser,expires: null});
               this._addUserLog(res.user.id);
               Actions.reset('Index',{});
             })
           } else {
             this.msgShort(res.msg)
           }
         }).catch(err => {
           this.closeLoading()
           this.msgShort('注册异常')
         })
      }else {
        this.closeLoading()
        this.msgShort('登录失效，请重新登录',()=>{

          Actions.Login({});
        });
      }
   })
 }

 _refreshMenuData(){
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
  render() {
    return (
      <View style={[styles.container]}>
          <View style={styles.nav}>
                <TouchableHighlight style={styles.navLeft}  underlayColor="transparent" onPress={() => {Actions.pop({})}}>
                      <Image source={require('../../images/back.png')}/>
                </TouchableHighlight>
                <View style={styles.navCenter}>
                      <Text style={[fonts.t2_Black]}>{this.state.titleInfo}</Text>
                </View>
          </View>
          {
            this.state.isAccountHasExist?
            <View style={{flex:1}}>
                  <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
                  <View style={styles.creatView}>
                        <Text style={[fonts.bodyText_Black,styles.paddingBottom25]}>创建账号说明</Text>
                        <Text style={[fonts.bodyText_Black,styles.lineHeight20]}>{this.state.info}</Text>
                  </View>
                  <TouchableHighlight style={[styles.listBtn,styles.listBtnRest]} underlayColor="#3a8ff3" onPress={()=>{this._Sure()}}>
                       <Text style={[fonts.btnText_white]}>确认</Text>
                  </TouchableHighlight>
            </View>
            :null
          }
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
AppRegistry.registerComponent('Cooperation', () => Cooperation);
