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
var moment = require('moment');
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/commonStyle/ListForm';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { apis } from '../../systemComponents/Remote/ApiStorage';
import BasicComponent from '../basic/BasicComponent';
export default class BindingTeam extends BasicComponent {
  constructor(props){
     super(props);
     this.state={
       modalObject:{},
       loadingObject:{},
       userTeamId:this.props.hisDetail.userTeamId,
       teamName:'',
       memberNumber:0,
       name:this.props.hisDetail.name,
       account:this.props.hisDetail.account,
       AccountText:this.props.hisDetail.accountText,
       hisId:this.props.hisDetail.id,
       hisRecommendPhone:this.props.hisDetail.recommendPhone?this.props.hisDetail.recommendPhone:null,
       hisRecommenderId:this.props.hisDetail.recommenderId?this.props.hisDetail.recommenderId:null,
       isRecommend:this.props.isRecommend==1?this.props.isRecommend:0,
     }
   }
   componentWillMount(){
     //查询用户的团队信息
     if(this.props.userType == 1){
       this._getUserTeam();
     }
   }
   _getUserTeam(){
     storage.load({
       key: keys.userTeamDetails,
       syncInBackground: false,
       syncParams: {
         url: apis.userTeams+'/'+this.state.userTeamId,
       }
     }).then(ret => {
       if(ret.status == 200){
         return ret.json()
       } else {
         return Promise.reject('BindTeam');
       }
     }).then(res => {
         let teamNames = res.teamName;
         let teamNumber = res.memberNumber?res.memberNumber:0;
         this.setState({teamName:teamNames,memberNumber:teamNumber});
     }).catch(err=>{
       this.msgShort('扫码失败，请重新扫码！')
       let timer = setTimeout(()=>{
         Actions.reset('Index',{});
         clearTimeout(timer);
       },2000);
     })
   }

  _submit(){
    storage.load({key: keys.currentUser}).then(currentUser => {
      let userId = currentUser.id;
      let developPhone = this.state.account;
      let userTeam = '/userTeams/'+this.state.userTeamId;
      let recommenderId = this.state.hisRecommenderId;
      let recommendPhone = this.state.hisRecommendPhone;
      let nowTime = new Date().getTime();

      let contentInfo={};
      if(this.state.isRecommend ==1 && recommendPhone && recommenderId){
        contentInfo={
          "developPhone":developPhone,
          "developTime":nowTime,
          "userTeam":userTeam,
          "recommenderId":recommenderId,
          "recommendPhone":recommendPhone,
          "teamRecommend":true,
          "recommendTime":nowTime
        }
      }else{
        contentInfo={
          "developPhone":developPhone,
          "developTime":nowTime,
          "userTeam":userTeam
        }
      }
      console.log(contentInfo);
      storage.load({
        key: keys.userPatch,
        syncInBackground: false,
        syncParams: {
          url: apis.users+'/'+userId,
          body:contentInfo,
        }
      }).then(ret => {
        console.log(ret)
        if(ret.status == 200){
          let teamNum = this.state.memberNumber + 1;
          storage.load({
            key: keys.userTeamPatch,
            syncInBackground: false,
            syncParams: {
              url: apis.userTeams+'/'+this.state.userTeamId,
              body:{"memberNumber":teamNum},
            }
          }).then(retJson => {
            this.msgShort('绑定成功')
            let timer = setTimeout(()=>{
              Actions.reset('Index',{});
              clearTimeout(timer);
            },2000);

          }).catch(error=>{

          })
        } else {
          this.msgShort('请重新扫描二维码！')
          let timer = setTimeout(()=>{
            Actions.reset('Index',{});
            clearTimeout(timer);
          },2000);
        }

      }).catch(err => {
        this.msgShort('绑定失败,请重新扫码！')
        let timer = setTimeout(()=>{
          Actions.reset('Index',{});
          clearTimeout(timer);
        },2000);
      })
    })
  }

  render() {
    return (
      <View style={[styles.mainList]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        {
          this.props.userType == 1?
          <View style={{flex:1}}>
            <View style={[styles.listView]}>
                  <View style={[styles.bindcompanyText]}>
                        <Text style={[fonts.bodyText_Black]}>团队名称：</Text>
                  </View>
                  <View style={[styles.bindcompany]}>
                        <Text style={[fonts.bodyText_Gray]}>{this.state.teamName}</Text>
                  </View>
            </View>
            <View style={[styles.listView]}>
                  <View style={[styles.bindcompanyText]}>
                        <Text style={[fonts.bodyText_Black]}>发展人姓名：</Text>
                  </View>
                  <View style={[styles.bindcompany]}>
                        <Text style={[fonts.bodyText_Gray]}>{this.state.name}</Text>
                  </View>
            </View>
            <View style={[styles.listView]}>
                  <View style={[styles.bindcompanyText]}>
                        <Text style={[fonts.bodyText_Black]}>发展人手机号：</Text>
                  </View>
                  <View style={[styles.bindcompany]}>
                        <Text style={[fonts.bodyText_Gray]}>{this.state.AccountText}</Text>
                  </View>
            </View>
            <TouchableHighlight style={[styles.listBtn,styles.positionBottom70]} onPress={()=>this._submit()}>
              <Text style={[fonts.btnText_white]}>确认</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.listNoBtn,styles.positionBottom20]} onPress={()=>Actions.reset('Index',{})}>
              <Text style={[fonts.btnText_white]}>取消</Text>
            </TouchableHighlight>
          </View>
          :
          <View style={{flex:1}}>
            <View style={[styles.textMi]}>
                  <Text style={[styles.textMiTxt,fonts.bodyText_Gray]}>您目前已绑定组织，解除已有组织关系才能加入哦！</Text>
            </View>
            <TouchableHighlight style={[styles.listBtn,styles.positionBottom20]} onPress={()=>Actions.reset('Index',{})}>
                  <Text style={[fonts.btnText_white]}>确认</Text>
            </TouchableHighlight>
          </View>
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
AppRegistry.registerComponent('bindingTeam', () => bindingTeam);
