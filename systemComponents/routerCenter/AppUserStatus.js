import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  AppState,
  TouchableHighlight,
  StatusBar,
  Linking
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import {keys} from '../SyncStorage/StorageKeys';
import {apis,staticSite,currentVersion} from '../Remote/ApiStorage';
import {ModalIndex} from '../../commonComponents/modal/ModalIndex';
import PositionSelect from '../../commonComponents/BtnCommon/PositionSelect';
import {cityData} from '../../businessComponents/data/CityData';
import CitySelect from '../../commonComponents/city/CitySelect';
import {GeTuiPush} from '../../commonComponents/getui/GeTuiPush';
import {NetworkInfo} from 'react-native-network-info';

var moment = require('moment');
var Platform = require('Platform');

var timer=null;
export default class AppUserStatus extends Component {
  constructor(props){
     super(props);
     this.state={
       modalObject:{},
       loadingObject:{},
       isShowJumpBtn:false,
       number:3,
       goFlag:'index',
       launchNumber:null
     }
   }
  componentWillMount(){
    this._initOrGetCurrentTimeLaunchNumber();
    storage.save({
       key: keys.curAPPFirstOpen,
       data: 1,
       expires: null
    });
    this._recordDeviceInfo();
    this.startApp();
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  componentWillUnmount() {
    clearTimeout(timer);
  }
  _initOrGetCurrentTimeLaunchNumber(){
    let _month = moment().date();
    let _hour = moment().hour();
    this.setState({launchNumber:{brandUserNumber:(3*_month+2*_hour),brandNumber:(_month+_hour)}});
  }
  _recordDeviceInfo() {
    storage.load({
      key: keys.currentUser
    }).then(currentUser => {
      if(currentUser) {
        GeTuiPush.checkDeviceInfo(currentUser.id);
      }
    }).catch(err => {

    });
  }

  _handleAppStateChange = (nextAppState) => {
      console.log(nextAppState)
      if (nextAppState === 'active') {
        storage.load({key: keys.curAPPFirstOpen}).then(curAPPFirstOpen => {
          console.log(curAPPFirstOpen)
          if(curAPPFirstOpen == 2){
            this._initAppState('event');
          }
        }).catch(err=>{

        })
      }else{
        let nowTime = Math.round(new Date().getTime()/1000);
        storage.save({
           key: keys.currentTime,
           data: nowTime,
           expires: null
        });
        storage.save({
           key: keys.curAPPFirstOpen,
           data: 2,
           expires: null
        });
      }
    }
// 添加用户登陆日志
_addUserLog(userId){
    let platform = 1;
    if (Platform.OS === 'android') {
        platform=2;
    }
    let contentInfo = '?userId='+userId+'&loginStatus=1&platform='+platform;
    storage.load({
      key: keys.saveLoginLog,
      syncInBackground: false,
      syncParams: {
         url: apis.saveLoginLog+contentInfo,
      }

    }).catch(err => {

    })
}

_initAppState(source){
  storage.load({key: keys.currentUser}).then(currentUser => {
    if (currentUser) {
      if (source === 'event') {
        this._addUserLog(currentUser.id);
      }
      storage.load({key:keys.currentTime}).then(curTime=>{
        let nowTime = Math.round(new Date().getTime()/1000);
        if(curTime){
          let time = nowTime-curTime;
          if(time > 1800){
             PositionSelect._getSite((backSite)=>{
                 console.log(backSite)
               PositionSelect.getPosition((backAddress)=>{
                 console.log(backAddress)
                 if(backAddress != undefined && backAddress.province && backAddress.city){
                   let province = backAddress.province;
                   let city = backAddress.city;
                   let address = province+city;
                   for(i=0;i<cityData.length;i++){
                     let length = i+1;
                     if(address.indexOf(cityData[i].text)>-1 && cityData[i].value != backSite){
                       let cityText = cityData[i].text;
                       let isCity = cityData[i].value;
                       let cityKey = i;
                       console.log('123123');
                       console.log(source);
                       if (source === 'event') {
                         this.jumpBtn('Index',{flag:111,cityText:cityText,isCity:isCity,cityKey:cityKey})
                       }else {
                         this.showJumpBtn('Index',{flag:111,cityText:cityText,isCity:isCity,cityKey:cityKey});
                       }
                       break;
                     }else if(length == cityData.length){
                       if(source == 'startApp'){
                         this.showJumpBtn('Index',null);
                        //  Actions.reset('Index',{});
                       }
                     }
                   }
                 }else{
                   if(source == 'startApp'){
                     this.showJumpBtn('Index',null);
                    //  Actions.reset('Index',{});
                   }
                 }
               })
             })
          }else{
            if(source == 'startApp'){
              this.showJumpBtn('Index',null);
              // Actions.reset('Index',{});
            }
          }
        }else{
          if(source == 'startApp'){
            this.showJumpBtn('Index',null);
            // Actions.reset('Index',{});
          }
        }
      }).catch(error=>{
        if(source == 'startApp'){
          this.showJumpBtn('Index',null);
          // Actions.reset('Index',{});
        }
      })
    }else{
      if(source == 'startApp'){
        this.showJumpBtn('Index',null);
        // Actions.reset('Index',{});
      }
    }
  }).catch(err => {
    if(source == 'startApp'){
      this.showJumpBtn('Index',null);
      // Actions.reset('Index',{});
    }
  })
}

  showJumpBtn(goFlag,data){
    this.setState({isShowJumpBtn:true,goFlag:goFlag});
    this.daojishi(goFlag,data);
  }
  jumpBtnClick(){
    let goFlag = this.state.goFlag;
    clearTimeout(timer);
    this.jumpBtn(goFlag);
  }
  daojishi(goFlag,data){
    let _number = this.state.number;
     timer = setTimeout(()=>{
      this.setState({number:_number-1})
      if (_number<=1) {
        clearTimeout(timer);
        this.jumpBtn(goFlag,data);
      }else {
        clearTimeout(timer);
        this.daojishi(goFlag,data);
      }
    },1000);
    //clearTimeout(timer);
  }
  jumpBtn(goFlag,data){
    if(!data){
      data={};
    }
    switch (goFlag) {
      case 'Guide':
        Actions.reset('Guide',data);
        break;
      case 'Login':
        Actions.reset('Login',data);
        break;
      case 'Index':
        Actions.reset('Index',data);
        break;
      default:

    }
  }
  startApp(){
    //this._initMenuData();
    storage.remove({
      key: keys.projectListConditions
    });
    this.checkIsFirstOpenApp().then(flag=>{
      if (flag) {
        this.showJumpBtn('Guide',null);
        //Actions.reset('Guide',{});
      }else {
        this.checkStatus();
      }
    });
  }

  checkIsFirstOpenApp(){
    return storage.load({
      key:keys.openAppStatus
    }).then(openStatus=>{
      if (openStatus === 'FirstOpen') {
        return false
      }else {
        return true
      }
    }).catch(error=>{
      return true;
    })
  }
  checkStatus(){
    storage.load({
      key:keys.currentUser
    }).then(res=>{
      if (res) {
        this._initAppState('startApp');
      }else {
        this.showJumpBtn('Login',null);
        //Actions.reset('Login',{});
      }
    }).catch(err=>{
      this.showJumpBtn('Login',null);
      //Actions.reset('Login',{});
    })
  }
  saveToStorage(key,value){
    storage.save({
      key:key,
      data:value,
      expires: 1000 * 3600
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

  confirm(modal){
    let modalObject = {text:modal.text,customText:null,modalType:'confirm',btns:[],isVisible:true};
    modal.no?modalObject.btns.push(modal.no):modalObject.btns.push({text:'取消'});
    modal.ok?modalObject.btns.push(modal.ok):modalObject.btns.push({text:'确定'});
    if (modal.customText) modalObject.customText = modal.customText;
    modalObject.isWholeCustom=false;
    this.setState({modalObject});
  }

  alert(modal){
    let modalObject = {text:modal.text,customText:null,modalType:'alert',btns:[],isVisible:true};
    if (modal.ok) modalObject.btns.push(modal.ok);
    if (modal.customText) modalObject.customText = modal.customText;
    modalObject.isWholeCustom=false;
    this.setState({modalObject});
  }

  content(modal){
    let modalObject = {text:modal.text,customText:null,modalType:'content',btns:[],isVisible:true};
    if (modal.btns) modalObject.btns = modal.btns;
    if (modal.customText) modalObject.customText = modal.customText;
    modalObject.isWholeCustom=modal.isWholeCustom;
    this.setState({modalObject});
  }

  render(){
    return (
      <View>
      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true}/>
      <Image style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height}} source={require('../../images/advertisingImg.png')}>
                     <View style={{marginTop:30,position:"relative"}}>
                     {
                       this.state.isShowJumpBtn?<TouchableHighlight style={{width:75,height:30,borderRadius:15,backgroundColor:"#444446",position:"absolute",right:15,top:0,alignItems:"center",justifyContent:"center"}}
                       onPress={()=>{this.jumpBtnClick()}} underlayColor="#444446">
                           <Text style={{color:"#fff"}}>跳过{this.state.number}</Text>
                       </TouchableHighlight>:null
                     }
                     
                     </View>
              </Image>
        <ModalIndex text={this.state.modalObject.text}
          customText={this.state.modalObject.customText}
          modalType={this.state.modalObject.modalType}
          btns={this.state.modalObject.btns}
          isVisible={this.state.modalObject.isVisible}
          isWholeCustom={this.state.modalObject.isWholeCustom}>
        </ModalIndex>
      </View>
    )
  }
}

AppRegistry.registerComponent('AppUserStatus', () => AppUserStatus);
