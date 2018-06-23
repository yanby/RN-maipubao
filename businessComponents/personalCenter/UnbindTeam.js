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
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { apis,sites,staticSite } from '../../systemComponents/Remote/ApiStorage';
import BasicComponent from '../basic/BasicComponent';
import CountDown from '../basic/CountDown';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class UnbindTeam extends BasicComponent {
  constructor (props) {
   super(props)
   this.state = {
     modalObject:{},
     loadingObject:{},
     perJson:'',
     userId:'',
     captcha:'',
     quitReason:'',
     tcpName:'解绑说明',
     countDownStart:false
   }
 }
 _captcha(){
    storage.load({
         key: keys.bindSendMessageK,
         syncInBackground: false,
         syncParams: {
            url: apis.bindSendMessageK +'?phone=' + this.props.json.phone
         }
       }).then(res=>{
         if (res.status==200) {
           this.msgShort('验证码发送成功');
           this.setState({
             countDownStart: true
           })
         }else {
           this.msgShort('验证码发送失败');
           this.setState({
             countDownStart: false
           })
         }
       }).catch(err=>{
         this.msgShort('验证码发送失败');
       }).catch(err=>{
    this.msgShort('验证码发送失败');
  })
 }
  _unbindTeam(){
    storage.load({key: keys.currentUser}).then(currentUser => {
          let captcha = this.state.captcha
          let quitReason = this.state.quitReason
          if (!captcha) {
              this.msgShort('请输入验证码')
              return
          }
          if (!quitReason) {
              this.msgShort('请输入解绑理由')
              return
          }
          this.openLoading();
          storage.load({
            key: keys.unbindTeamK,
            syncInBackground: false,
            syncParams: {
               url: apis.unbindTeamK + '?userId=' +currentUser.id+'&teamId='+ this.props.json.teamId+'&quitReason='+quitReason+'&captcha='+captcha
            }
          }).then(ret => {
            if(ret.status == 200){
              return ret.json()
            } else {
              this.closeLoading();
              this.msgShort("解绑申请提交异常");
            }
          }).then(retJson=>{
              if(retJson.id){
                this.closeLoading();
                this.msgShort("解绑申请提交成功");
                // Actions.OrganizationTeam({});
                Actions.pop({refresh:{random:Math.random()}});
              }else{
                this.closeLoading();
                this.msgShort(retJson.msg)
              }
          }).catch(err => {
            this.closeLoading();
            this.msgShort("解绑申请提交异常");

          })
        })
      }

  render() {
    return (
      <View style={[styles.mainList]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <Title isLeftShow={true} backColor={true} isRightBtnShow={false} title={'申请解绑'}/>
        <View style={[styles.listView]}>
              <View style={[styles.listViewText]}>
                    <Text style={[fonts.bodyText_Black]}>当前账号：</Text>
              </View>
              <View style={[styles.bindcompany]}>
                    <Text style={fonts.bodyText_Gray}>{this.props.json.phone}</Text>
              </View>
        </View>
        <View style={[styles.listView]}>
              <View style={[styles.listViewText]}>
                    <Text style={[fonts.bodyText_Black]}>所属团队：</Text>
              </View>
              <View style={[styles.bindcompany]}>
                    <Text style={fonts.bodyText_Gray}>{this.props.json.teamName}</Text>
              </View>
        </View>
        <View style={[styles.listView,styles.listViewRest]}>
          <View style={[styles.listViewText,styles.listViewTextRest]}><Text style={[fonts.bodyText_Black]}>解绑理由：</Text></View>
          <TextInput
            style={[styles.listInput,fonts.bodyText_Gray,styles.moreInput]}
            underlineColorAndroid="transparent"
            clearButtonMode="always" returnKeyType='done'
            placeholder="请输入解绑理由"
            placeholderTextColor="#ccc"
            multiline={true} blurOnSubmit={true}
            onChangeText={(text) => this.setState({quitReason: text})}
          />
        </View>
        <View style={[styles.listView,styles.borderTop,styles.marginTop10]}>
          <View style={[styles.listViewText]}><Text style={[fonts.bodyText_Black]}>验证码：</Text></View>
          <TextInput
            style={[styles.listInput,fonts.bodyText_Gray]}
            underlineColorAndroid="transparent"
            clearButtonMode="always" returnKeyType='done'
            placeholder="请输入验证码"
            placeholderTextColor="#ccc"
            onChangeText={(text) => this.setState({captcha: text})}
          />
          <CountDown
          onPress={() => {this._captcha()}}
          time={60}
          countDownStart={this.state.countDownStart}
          text='获取验证码'/>
        </View>
        <View style={[styles.listText]}>
          <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.Protocol({protocolName:this.state.tcpName})}>
            <Text style={[fonts.bodyText_Blue,styles.listLeftText]}>解绑说明？</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight style={[styles.listBtn,styles.positionBottom20]} underlayColor="#3a8ff3" onPress={() => {this._unbindTeam()}}>
          <Text style={[fonts.btnText_white]}>提交</Text>
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
AppRegistry.registerComponent('UnbindTeam', () => UnbindTeam);
