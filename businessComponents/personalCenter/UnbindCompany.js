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
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/commonStyle/ListForm';
import { Actions,ActionConst } from 'react-native-router-flux';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { apis,sites,staticSite} from '../../systemComponents/Remote/ApiStorage';
import BasicComponent from '../basic/BasicComponent';
import CountDown from '../basic/CountDown';
import {md5HashX} from '../../commonComponents/encrypt/PasswordHelper';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class UnbindCompany extends BasicComponent {
  constructor (props) {
   super(props)
   this.state = {
     modalObject:{},
     loadingObject:{},
     perJson:'',
     userId:'',
     captcha:'',
     quitReason:'',
     quitPic:'',
     countDownStart:false
   }
 }
 _upload(){
    this.uploadModal(false,(image)=>{
      this._uploadImage(image)
    })
 }
 _uploadImage(image){
   image.then(a=>{
     if (a&&a.path) {
       this.closeModal();
       this.openLoading('正在上传')
       this.uploadToRemote(a.path).then(respones=>{
         this.setState({quitPic:a.path});
         this.setState({upimgUrl:respones.url})
         this.closeLoading()
       });
     }
   })
 }

 renderImage(){
   if (this.state.quitPic) {
     return <Image style={{width:150,height:100,}} source={{uri:this.state.quitPic}} />
   }else {
     return <Image source={require('../../images/add-img.png')}></Image>
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
       })
 }
  _UnbindCompany(){
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
               url: apis.unbindTeamK + '?userId=' +currentUser.id+'&teamId='+ this.props.json.teamId+'&quitReason='+this.state.quitReason+'&quitPic='+this.state.upimgUrl+'&captcha='+this.state.captcha
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
                // Actions.OrganizationCompany({});
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
                    <Text style={[fonts.bodyText_Black]}>所属公司：</Text>
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
        <View style={[styles.listTextRow,styles.marginLeft15,styles.marginTop10]}>
          <View style={[styles.listImg]}>
            <TouchableHighlight underlayColor="transparent" onPress={()=>this._upload()}>
            {
              this.renderImage()
            }
            </TouchableHighlight>
            <Text style={[styles.imgText,fonts.bodyText_Gray]}>请上传离职凭证</Text>
          </View>
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
          <TouchableHighlight>
            <Text style={[fonts.bodyText_Blue,styles.listLeftText]}>解绑说明？</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight style={[styles.listBtn,styles.positionBottom20]} underlayColor="#3a8ff3" onPress={() => {this._UnbindCompany()}}>
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
AppRegistry.registerComponent('unbindCompany', () => unbindCompany);
