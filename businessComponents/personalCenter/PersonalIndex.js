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
  Modal,
  Linking,
  ScrollView
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/personalCenter/PersonalIndex';
import CustomTabBar from '../../commonComponents/tabBar/CustomTabBar';

import BasicComponent from '../basic/BasicComponent';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { apis,sites,staticSite } from '../../systemComponents/Remote/ApiStorage';
import { UMengAnalytics } from '../../commonComponents/umeng/UMAnalytics';

export default class PersonalIndex extends BasicComponent {

  constructor(props){
     super(props);
     this.state={
      modalObject:{},
      loadingObject:{},
      name:'',
      roleType:'',
      logoPath:'',
      leader:'',
      accountLevel:'',
      authStatus:false,
      projectManager:false,
      developPhone:'',
      userTeamId:'',
      userId:'',
      redFlag:false,
      isNeedRefresh:0,
     }
   }
  _loadUser(){
    storage.load({key: keys.currentUser}).then(currentUser => {
      storage.load({
        key: keys.getOneUser,
        syncInBackground: false,
        syncParams: {
  	       url: apis.getOneUser + currentUser.id
        }
      }).then(ret => {
        if(ret.status == 200){
          return ret.json();
        }else{
          return Promise.reject('404')
        }
      }).then(retJson=>{
        let nameStr = retJson.name;
        if(!nameStr){
          nameStr = retJson.accountText
        }
        this.setState({
          name:nameStr,
          logoPath:retJson.logoPath,
          roleType:retJson.roleType,
          leader:retJson.leader,
          accountLevel:retJson.accountLevel,
          authStatus:retJson.authStatus,
          projectManager:retJson.projectManager,
          developPhone:retJson.developPhone,
          userTeamId:retJson.userTeamId,
          userId:retJson.id
        })
        this.updateCurrentUser(retJson);
        this._loadRedFlag(retJson);
      }).catch((err)=>{
        if (err === '404') {
          Actions.replace('Login',{sourceFlag:'PersonalIndex'})
        }
      })
    })
  }

  _loadRedFlag(retJson){
    storage.load({
      key: keys.getRedFlag,
      syncInBackground: false,
      syncParams: {
         url: apis.getRedFlag + '?userId=' + retJson.id
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json();
      }else{
        return Promise.reject('404')
      }
    }).then(retJson=>{
      this.setState({
        redFlag:retJson
      })
    })
  }

  updateCurrentUser(retJson){
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
  }

  componentWillMount(){
    this._loadUser();
  }

  componentWillReceiveProps(nextprops){
    this._loadUser();
    this.setState({
      isNeedRefresh:1
    })
  }

  _callPhone(){
    return Linking.openURL('tel:4008988808')
  }

  _renderHeadPic(){
    if (this.state.logoPath) {
      return <Image style={styles.hasPic} source={{uri: staticSite + this.state.logoPath}}/>
    }else {
      return <Image source={require('../../images/noPhoto.png')}/>
    }
  }

  _renderAuthPic(){
    if (this.state.roleType == '公司') {
      if (this.state.authStatus) {
        return <Image source={require('../../images/confirm.png')}/>
      }else {
        return <Image source={require('../../images/unConfirm.png')}/>
      }
    }else {
      return null;
    }
  }

  _renderBindPic(){
    if (this.state.leader) {
      return <Image style={styles.marLR} source={require('../../images/binding.png')}/>
    }else {
      if(this.state.userTeamId){
        return <Image style={styles.marLR} source={require('../../images/binding.png')}/>
      }else {
        return <Image style={styles.marLR} source={require('../../images/unBind.png')}/>
      }
    }
  }

  _renderLevelPic(){
    if (this.state.leader) {
      if(this.state.accountLevel == '金牌'){
        return <Image source={require('../../images/level.png')}/>
      }else if(this.state.accountLevel == '银牌'){
        return <Image source={require('../../images/si.png')}/>
      }else{
        return <Image source={require('../../images/co.png')}/>
      }
    }else {
      return null;
    }
  }

  _actionToMyTeam(){
    if(!this.state.userTeamId){
      Actions.MyOrg({teamStatus:1});
    }else{
      if (this.state.leader) {
        // Actions.MemberTeam({})
        Actions.MyOrg({teamStatus:2});

      }else{
        Actions.MyOrg({teamStatus:3});
        // Actions.OrganizationTeam({})
        // Actions.MyOrgSecond({});

      }
    }
  }

  _renderAuthInfo(){
    if(!this.state.roleType){
      return
    }
    if (this.state.roleType == '公司'){
      if(this.state.authStatus){
        return (
          <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.CredentialsCompany({})} >
              <View style={styles.navTouch}>
                 <Image  source={require('../../images/myAuthentication.png')}/>
                 <Text style={[styles.navText,fonts.bodyText_Black]}>认证信息</Text>
                 <Image source={require('../../images/more.png')}/>
              </View>
          </TouchableHighlight>
        )
      }else{
        return (
          <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.AuthenticationInfo({})} >
              <View style={styles.navTouch}>
                 <Image  source={require('../../images/myAuthentication.png')}/>
                 <Text style={[styles.navText,fonts.bodyText_Black]}>认证信息</Text>
                 <Image  source={require('../../images/more.png')}/>
              </View>
          </TouchableHighlight>
        )
      }
    }else {
      if(!this.state.projectManager){
        return (
          <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.ChangeRole({})} >
              <View style={styles.navTouch}>
                 <Image  source={require('../../images/myAuthentication.png')}/>
                 <Text style={[styles.navText,fonts.bodyText_Black]}>变更角色</Text>
                 <Image  source={require('../../images/more.png')}/>
              </View>
          </TouchableHighlight>
        )
      }else{
        return null;
      }
    }
  }

  _developTeamQr(){
    if(this.state.roleType == ''){
      return
    }
    //判断是否公司类
    if (this.state.roleType == '公司'){
      //判断公司是否已经认证
      if(this.state.authStatus){
        //判断公司是否已经创建团队
        if(!this.state.userTeamId){
          //跳转协议页面进行团队创建
          Actions.DevelopTeamTCP({})
        }else{
          //跳转到二维码页面
          Actions.DevelopTeamQr({qrType:'1'})
        }
      }else{
          this.confirm(
            {
              text:'去认证？',
              ok:{click:()=>{Actions.AuthenticationInfo({})},text:'确认'},
              no:{click:()=>{},text:'取消'},
            });
      }
    }else{
      //个人类
      if(!this.state.userTeamId){
        //跳转协议页面进行团队创建
        Actions.DevelopTeamTCP({})
      }else{
        if(this.state.leader){
          //跳转到二维码页面
          Actions.DevelopTeamQr({qrType:'1'})
        }else{
          this.confirm(
            {
              text:'您目前已绑定组织，解除已有组织关系才能加入？',
              ok:{click:()=>{},text:'确认'},
              no:{click:()=>{},text:'取消'},
            });
        }
      }

    }

  }

  render() {
    return (
      <View style={styles.mainView}>
            <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true}/>
            <ScrollView style={styles.scrollView}>
                  <Image style={styles.bgImg} source={require('../../images/mySetBg.png')}>
                         <View>
                               <View style={styles.topView}>
                                     <TouchableHighlight style={styles.TopTouch1} underlayColor="transparent" onPress={()=>Actions.Setting({userId:this.state.userId})}>
                                                 <Image source={require('../../images/mySet.png')}/>
                                     </TouchableHighlight>
                                     <TouchableHighlight style={styles.TopTouch2} underlayColor="transparent" onPress={()=>Actions.ShareQr({qrType:'2'})}>
                                                 <Image source={require('../../images/myShare.png')}/>
                                     </TouchableHighlight>
                               </View>
                               <View style={styles.middleView}>
                                     <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.PersonalInformation({userId:this.state.userId})}>
                                     {
                                       this._renderHeadPic()
                                     }
                                     </TouchableHighlight>
                                     <TouchableHighlight>
                                     <View style={styles.middleTop}>
                                           <Text style={fonts.t2_white}>{this.state.name}</Text>
                                           {
                                             this._renderAuthPic()
                                           }
                                           {
                                             this._renderBindPic()
                                           }
                                           {
                                             this._renderLevelPic()
                                           }
                                     </View>
                                     </TouchableHighlight>
                                     <TouchableHighlight underlayColor="transparent">
                                     <View style={styles.middleBottom}>
                                           <Text style={fonts.bodyText_white}>当前角色：</Text>
                                           {
                                             this.state.projectManager ?
                                             <Text style={fonts.bodyText_white}>项目经理</Text>
                                             :
                                             <Text style={fonts.bodyText_white}>{this.state.roleType}</Text>
                                           }
                                     </View>
                                     </TouchableHighlight>
                               </View>
                               <View style={styles.bottomView}>
                                     <TouchableHighlight style={[styles.bottomTouch]} underlayColor="transparent" onPress={()=>Actions.SpreadQr({qrType:'0'})}>
                                           <View style={styles.bottomL}>
                                                 <Image style={styles.bottomImg} source={require('../../images/myExtension.png')}/>
                                                 <Text style={fonts.bodyText_white}>微信推广</Text>
                                           </View>
                                     </TouchableHighlight>
                                     <Text style={[styles.bottomBoder,fonts.t1_white]}>|</Text>
                                     <TouchableHighlight style={styles.bottomTouch} underlayColor="transparent" onPress={()=>this._developTeamQr()}>
                                           <View style={styles.bottomL}>
                                                 <Image style={styles.bottomImg} source={require('../../images/myDevelopment.png')}/>
                                                 <Text style={fonts.bodyText_white}>发展团队</Text>
                                           </View>
                                     </TouchableHighlight>

                               </View>
                         </View>
                  </Image>
                  <View style={styles.navMiddle}>
                        <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.Balance({})} >
                            <View style={styles.navView}>
                                  <Image  source={require('../../images/myBalance.png')}/>
                                  <Text style={[styles.navViewText,fonts.bodyText_Black]}>账户余额</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.MessageList({})} >
                            <View style={[styles.navView,styles.redIconView]}>
                                  <Image  source={require('../../images/myNews.png')}/>
                                  <Text style={[styles.navViewText,fonts.bodyText_Black]}>我的消息</Text>
                                  {
                                    this.state.redFlag?
                                    <View style={styles.redIcon}></View>
                                    :null
                                  }

                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.MyAttention({})} >
                            <View style={[styles.navView,styles.borderRightNone]}>
                                  <Image  source={require('../../images/myFouce.png')}/>
                                  <Text style={[styles.navViewText,fonts.bodyText_Black]}>我的关注</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="transparent" onPress={()=>this._actionToMyTeam()}>
                            <View style={[styles.navView,styles.borderNone]}>
                                  <Image  source={require('../../images/myOrganization.png')}/>
                                  <Text style={[styles.navViewText,fonts.bodyText_Black]}>我的组织</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.MyFeedback({})} >
                            <View style={[styles.navView,styles.borderNone]}>
                                  <Image  source={require('../../images/feedback.png')}/>
                                  <Text style={[styles.navViewText,fonts.bodyText_Black]}>用户反馈</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="transparent" onPress={() => {UMengAnalytics.onEvent('personal_service_click');this._callPhone()}}>
                            <View style={[styles.navView,styles.borderNone,styles.borderRightNone]}>
                                  <Image  source={require('../../images/myService.png')}/>
                                  <Text style={[styles.navViewText,fonts.bodyText_Black]}>联系客服</Text>
                            </View>
                        </TouchableHighlight>
                  </View>
                  <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.AboutUs({})}>
                  <Image style={styles.aboutImg} source={require('../../images/myAbout.png')}/>
                  </TouchableHighlight>
                  {
                    this._renderAuthInfo()
                  }
                  <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.CNManage({userId:this.state.userId})}>
                      <View style={styles.navTouch} >
                             <Image  source={require('../../images/cnmIcon.png')}/>
                             <Text style={[styles.navText,fonts.bodyText_Black]}>需求管理</Text>
                             <Image  source={require('../../images/more.png')}/>
                      </View>
                  </TouchableHighlight>

            </ScrollView>
            <CustomTabBar checkIndex={3} isNeedRefresh={this.state.isNeedRefresh}/>
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
AppRegistry.registerComponent('personalIndex', () => personalIndex);
