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
  Modalsq,
  Alert
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';

import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/commonStyle/ListForm';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { apis } from '../../systemComponents/Remote/ApiStorage';
import BasicComponent from '../basic/BasicComponent';
export default class BindRouterCenter extends BasicComponent {
  constructor(props){
     super(props);
     this.state={
       nowUrl : '',
       modalObject:{},
       loadingObject:{},
       qrCodeUrl:this.props.qrCodeUrl
      // qrCodeUrl:'https://bj.api.youpuchina.com/qrcode/user?type=develop&userId=9'
     }
   }
   //根据扫出来的用户ID查询用户信息
   _getUser(userid){
     return  storage.load({
         key: keys.userDetails,
         syncInBackground: false,
         syncParams: {
           url: apis.users+ '/' +userid,
         }
       }).then(res => {
         if(res.status == 200){
           return res.json();
         }else{
           return Promise.reject('BindTeam');
         };
       }).then(retJson=>{
         return retJson;
       }).catch(err=>{
          Actions.reset('Index',{});
       })
   }
   _getOneUserId(){
     //判断用户是否登陆，已登陆记录用户ID，否则跳转登陆页
    return  storage.load({key: keys.currentUser}).then(currentUser => {
      return  storage.load({
         key: keys.userDetails,
         syncInBackground: false,
         syncParams: {
           url: apis.users+ '/' +currentUser.id,
         }
       }).then(ret => {

         if(ret.status == 200){
           return ret.json();
         }else{
           return Promise.reject('BindTeam');
         };
       }).then(retJson=>{
         return retJson;
       }).catch(err=>{
          Actions.reset('Index',{});
       })

     })
   }

   _nowUrl(){
     storage.load({key: keys.currentRemoteSite }).then(ret=>{
       this.setState({nowUrl:ret});
      })
   }
   componentWillMount(){
     this._nowUrl();
    //  this.openLoading();
     this._getOneUserId().then(userDetail=>{

       try {
         let qrCodeUrl = this.state.qrCodeUrl;
         let nowUrl = this.state.nowUrl;
         if (qrCodeUrl&&qrCodeUrl.indexOf('?')>-1) {
           let splitArrary = qrCodeUrl.split('?');
           if(splitArrary[0].indexOf(nowUrl) == -1){
            //  this.closeLoading();
             let msg = '二维码与您所在城市不匹配！';
             this.testConfirm(msg);

             return
           }
           if (splitArrary.length==2) {
             let paramsSplitArrary = splitArrary[1].split('&');
             let _type = paramsSplitArrary[0].toLowerCase().replace('type=','');
             let userid = paramsSplitArrary[1].toLowerCase().replace('userid=','');

             this._getUser(userid).then(hisDetail=>{
              //  this.closeLoading();
               if (!hisDetail) {
                 let msg = '二维码为非法二维码!';
                 this.testConfirm(msg);
                 return
               }
               if (_type == 'develop') {
                 //发展

                 if(userDetail.roleType == '公司'){
                   //跳转提示页(公司类用户无法加入团队)
                   Actions.reset('BindingCompany',{hisDetail:hisDetail,userType:0});

                   return
                 }else if(userDetail.userTeamId>0){
                   //跳转提示页(解除已有组织关系才能加入哦)
                   Actions.reset('BindingTeam',{hisDetail:hisDetail,userType:0});

                   return
                 }else if(hisDetail.roleType == '公司' && hisDetail.userTeamId>0 && hisDetail.leader == 1){
                   //跳转确认绑定公司页
                   if(userDetail.recommendPhone){
                     Actions.reset('BindingCompany',{hisDetail:hisDetail,userType:1});
                   }else{
                     Actions.reset('BindingCompany',{hisDetail:hisDetail,userType:1,isRecommend:1});
                   }

                   return
                 }else if(hisDetail.userTeamId>0 && hisDetail.leader == 1){
                   //跳转确认绑定团队页
                   if(userDetail.recommendPhone){
                     Actions.reset('BindingTeam',{hisDetail:hisDetail,userType:1});
                   }else{
                     Actions.reset('BindingTeam',{hisDetail:hisDetail,userType:1,isRecommend:1});
                   }

                   return
                 }else{
                  //  this.closeLoading();
                   let msg = '你目前绑定的团队不存在!';
                   this.testConfirm(msg);
                   return
                 }
               }else if (_type == 'spread') {
                 //推广
                 if(userDetail.recommendPhone){
                   //跳转提示页(您目前已建立推荐关系，无法再建立推荐关系！)
                   Actions.reset('Referral',{hisDetail:hisDetail,userType:0});

                   return
                 }else if(hisDetail.id == userDetail.id){
                   //别调皮，请不要扫描自己哦！
                   Actions.reset('Referral',{hisDetail:hisDetail,userType:2});

                   return
                 }else if(hisDetail.recommenderId && hisDetail.recommenderId == userDetail.id){
                   //亲，由于您之前已建立推荐关系，故无法再建立推荐关系哦！
                   Actions.reset('Referral',{hisDetail:hisDetail,userType:3});

                   return
                 }else{
                   //跳转确认绑定推荐页
                   Actions.reset('Referral',{hisDetail:hisDetail,userType:1});
                   return
                 }

               }else {
                //  this.closeLoading();
                 let msg = '无法识别的二维码!';
                 this.testConfirm(msg);
               }
             });
           }
          //  this.closeLoading();
         }else {
          //  this.closeLoading();
           //this._startScan()
           let msg = '无效的二维码';
           this.testConfirm(msg);
         }
       } catch (e) {
        //  this.closeLoading();
         let msg = '无效的二维码!';
         this.testConfirm(msg);
         //this._startScan()
       }
     }).catch(err => {
        // this.closeLoading();
        Actions.reset('Login',{sourceFlag:'sourceFlag'});
     })
    //  this.closeLoading();
   }
   testConfirm(msg){
     this.alert(
       {
         ok:{
           text:'确认',
           click:()=>{
             Actions.reset('Index',{});
           }
         },
         text:msg
       })
   }
  render() {
    return (
      <View>
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
AppRegistry.registerComponent('bindingCompany', () => bindingCompany);
