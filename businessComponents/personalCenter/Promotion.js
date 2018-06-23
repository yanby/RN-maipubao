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
  ScrollView
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/personalCenter/Promotion';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { apis, sites, staticSite, h5Sites } from '../../systemComponents/Remote/ApiStorage';
import BasicComponent from '../basic/BasicComponent';
export default class Promotion extends BasicComponent {
  constructor(props){
     super(props);
     this.state={
      modalObject:{},
      loadingObject:{},
      title:props.title,
      qrType:props.qrType,
      spreadQrCode: '',
      developQrCode: '',
      url: null,
      title: props.qrType == 1 ? '我要发展团队' : '我要推广',
      sharDescription: props.qrType == 1 ? '组建团队，众包联动资源' : '推荐好友，共享成交收益',
      description: props.qrType == 1 ? '发展团队福利说明' : '推荐福利说明',
      descriptionTxt: props.qrType == 1 ? '发展团队福利：成功发展一名用户，被发展人在优铺平台成交，发展人即可获得优铺平台奖励1000元起' : '推荐福利：成功推荐一名用户，被推荐人在优铺平台成交，推荐人即可获得优铺平台奖励1000元起'
     }
   }
   _loadData(){
     storage.load({key: keys.currentUser}).then(currentUser => {
       this.setState({
         spreadQrCode : currentUser.spreadQrCode,
         developQrCode : currentUser.developQrCode
       })
     }).catch(err => {
       this.closeLoading();
       Actions.Login({})
     })
   }

   componentWillMount(){
     this._initQRCodeUrl();
     this._loadData();
   }

   _initQRCodeUrl(){
     storage.load({
       key: keys.currentUser
     }).then(currentUser => {
       storage.load({key: keys.currentRemoteSite }).then(ret => {
         let url = h5Sites[ret] + '/user/qrcodeShare/' + currentUser.id
         if (this.state.qrType == 1) {
           url = url + '?type=develop';
         } else {
            url = url + '?type=spread';
         }
         this.setState({
           url: url
         })
       })
     })
   }

   renderQrPic(){
     if (this.state.qrType == 1) {
       return <Image style={styles.code} source={{uri: staticSite + this.state.developQrCode}}></Image>
     }else {
        return <Image style={styles.code} source={{uri : staticSite + this.state.spreadQrCode}}></Image>
     }
   }

   _shareToTimeline(){
     this.shareToTimeline({
       type: 'news',
       title: this.state.title,
       description: this.state.sharDescription,
       url: this.state.url
     }, () => {
       this.closeModal()
       this.msgShort('分享成功');
     }, () => {
       this.closeModal()
       this.msgShort('分享失败');
     })
   }

   _shareToSession(){
     this.shareToSession({
       type: 'news',
       title: this.state.title,
       description: this.state.sharDescription,
       url: this.state.url
     }, () => {
       this.closeModal()
       this.msgShort('分享成功');
     }, () => {
       this.closeModal()
       this.msgShort('分享失败');
     })
   }

   share(){
    this.content(
      {
        isWholeCustom:true,
        customText:()=>{
          return (
            <View style={styles.mask}>
                  <View style={styles.maskMain}>
                      <View style={styles.share}>
                            <TouchableHighlight style={styles.shareView} onPress={()=>{this._shareToSession()}}>
                                  <View>
                                        <Image source={require('../../images/weixin.png')}></Image>
                                        <Text style={[styles.shareText,fonts.bodyText_Black]}>微信好友</Text>
                                  </View>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.shareView} onPress={()=>{this._shareToTimeline()}}>
                                  <View>
                                        <Image source={require('../../images/pengyouquan.png')}></Image>
                                        <Text style={[styles.shareText,fonts.bodyText_Black]}>朋友圈</Text>
                                  </View>
                            </TouchableHighlight>

                      </View>
                      <TouchableHighlight style={styles.closeBtn} underlayColor="#fff" onPress={() => {this.closeModal()}}>
                            <Text style={[styles.cityNavText,fonts.btnText_Black]}>取消</Text>
                      </TouchableHighlight>
                  </View>
          </View>
        );
        }
      })
  }
  render() {
    return (
      <View style={[styles.main]}>
        <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true}/>
        <Image style={styles.imgBg} source={require('../../images/share_bg.png')}>
              <View style={[styles.QRView]}>
                <Image style={styles.codeImg} source={require('../../images/share_code.png')}>
                    <View>
                    <Text style={[styles.codeText,fonts.t1_Black]}>卖铺招商找优铺</Text>
                    {
                      this.renderQrPic()
                    }
                    </View>
                </Image>
              </View>
              <View style={[styles.promotionText]}>
                    <Text style={[fonts.bodyText_white,styles.exText]}>{this.state.description}</Text>
                    <Text style={[fonts.bodyText_white,styles.text]}>{this.state.descriptionTxt}</Text>
                    <Text style={[styles.specailText,fonts.bodyText_white]}>联系我们：400-8988808</Text>
              </View>
              <View style={[styles.nav]}>
                    <TouchableHighlight style={[styles.navIcon]} underlayColor="transparent" onPress={()=>Actions.pop({})}>
                    <Image source={require('../../images/backWhite.png')}></Image>
                    </TouchableHighlight>
                    <Text style={[styles.navTitle,fonts.t2_white]}>{this.state.title}</Text>
              </View>
              <TouchableHighlight style={[styles.listBtn]} underlayColor="#3a8ff3" onPress={() => {this.share()}}>
                    <Text style={[fonts.btnText_white]}>分享</Text>
              </TouchableHighlight>
        </Image>
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
AppRegistry.registerComponent('promotion', () => promotion);
