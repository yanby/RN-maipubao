import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import AppForProjectManage from '../appForProjectManage'
import {keys} from './SyncStorage/StorageKeys'
import { regirstWechat } from '../commonComponents/wechat/RegirstWechat'


export default class Starter extends Component {
  constructor(props){
   super(props);
   this.state={
     isLogin:false,
     launcherFlag:false
   }
 }
 componentWillMount(){
   console.log('我是安卓啊');
   //注册微信app
   regirstWechat.regirst();
   storage.load({
     key:keys.currentRemoteSite
   }).then(sites=>{
     if (!sites||sites.length<=0) {
       storage.save({
        key: keys.currentRemoteSite,
        data: "bj",
        expires: null
      });
     }
   }).catch(err=>{
     storage.save({
      key: keys.currentRemoteSite,
      data: "bj",
      expires: null
    });
   })
 }
 // componentDidMount(){
 //  //  setTimeout(() => {
 //  //     //SplashScreen.hide();
 //  //     this.setState({launcherFlag:true})
 //  //   }, 5000);
 // }


  render() {
    return (
      <AppForProjectManage>
      </AppForProjectManage>
    )

  }
}
