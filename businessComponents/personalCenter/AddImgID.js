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
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class AddImgID extends BasicComponent {
  constructor () {
   super()
   this.state = {
     modalObject:{},
     loadingObject:{},
     userId:'',
     idCardPicA:'',
     idCardPicB:'',
     tcpName:'上传身份证说明',
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
         this.setState({idCardPicA:a.path});
         this.setState({upimgUrl:respones.url})
         this.closeLoading()
       });
     }
   })
 }

 renderImage(){
   if (this.state.idCardPicA) {
     return <Image style={{width:150,height:100}} source={{uri:this.state.idCardPicA}}/>
   }else {
     return <Image source={require('../../images/add-img.png')}></Image>
   }
 }

 _uploadB(){
    this.uploadModal(false,(image)=>{
      this._uploadImageB(image)
    })
 }
 _uploadImageB(image){
   image.then(a=>{
     if (a&&a.path) {
       this.closeModal();
       this.openLoading('正在上传')
       this.uploadToRemote(a.path).then(respones=>{
         this.setState({idCardPicB:a.path});
         this.setState({upimgUrlB:respones.url})
         this.closeLoading()
       });
     }
   })
 }

 renderImageB(){
   if (this.state.idCardPicB) {
     return <Image style={{width:150,height:100}} source={{uri: this.state.idCardPicB}}/>
   }else {
     return <Image source={require('../../images/add-img.png')}></Image>
   }
 }
  componentWillMount(){
    this.openLoading();
    storage.load({key: keys.currentUser}).then(currentUser => {
      this.setState({userId:currentUser.id})
      storage.load({
        key: keys.getOneUser,
        syncInBackground: false,
        syncParams: {
  	       url: apis.getOneUser + currentUser.id
        }
      }).then(ret => {
        if(ret.status == 200){
          return ret.json()
        } else {
          this.closeLoading();
          this.msgShort(ret.msg)
        }
      }).then(retJson=>{
        this.setState({
          idCardPicA:staticSite + retJson.idCardPicA,
          idCardPicB:staticSite + retJson.idCardPicB
        })
        this.closeLoading();
      })
    }).catch(err => {
      this.closeLoading();
      this.msgShort("异常");
    })
  }
  _subUser(){
    if(!this.state.idCardPicA || !this.state.idCardPicB){
      this.msgShort("请上传身份证正反面");
      return
    }
    this.openLoading('正在保存...');
    let userInfo={
        "idCardPicA": this.state.upimgUrl,
        "idCardPicB": this.state.upimgUrlB,
    }
    storage.load({
      key: keys.patchOneUser,
      syncInBackground: false,
      syncParams: {
         url: apis.patchOneUser + '/' + this.state.userId,
         body:userInfo,
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json()
      } else {
        this.msgShort(ret.msg)
      }
    }).then(retJson=>{
      this.closeLoading();
      this.msgShort('提交成功');
      Actions.PersonalInformation({userId:this.state.userId});
    }).catch(err => {
      this.msgShort("异常");
      this.closeLoading();
    })
  }
  render() {
    return (
      <View style={[styles.mainList]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <Title isLeftShow={true} backColor={true} isRightBtnShow={false} title={'上传身份证'}/>
        <View style={[styles.listAddImg,styles.marginTop50]}>
              <TouchableHighlight underlayColor="transparent" onPress={()=>this._upload()}>
                    <View style={[styles.listImg,styles.listImgCenter]}>
                          <Text style={[styles.marginBottom10,fonts.bodyText_Black]}>身份证正面照</Text>
                          {
                            this.renderImage()
                          }
                    </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="transparent" onPress={()=>this._uploadB()}>
                    <View style={[styles.listImg,styles.listImgCenter,styles.marginTop50]}>
                          <Text style={[styles.marginBottom10,fonts.bodyText_Black]}>身份证反面照</Text>
                          {
                            this.renderImageB()
                          }
                    </View>
              </TouchableHighlight>
              <View style={[styles.listText]}>
                <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.Protocol({protocolName:this.state.tcpName})}>
                  <Text style={[fonts.bodyText_Blue]}>上传身份证说明？</Text>
                </TouchableHighlight>
              </View>
        </View>
        <TouchableHighlight style={[styles.listBtn,styles.positionBottom20]} underlayColor="#3a8ff3" onPress={()=>this._subUser()}>
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
AppRegistry.registerComponent('addImgID', () => addImgID);
