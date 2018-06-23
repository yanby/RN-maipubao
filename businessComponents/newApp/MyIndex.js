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
  ScrollView,
  Animated,
  Easing
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/newApp/MyIndex';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import CustomTabBar from '../../commonComponents/tabBar/CustomTabBar1';
import BasicComponent from '../basic/BasicComponent';
import { apis, staticSite,currentVersion } from '../../systemComponents/Remote/ApiStorage';
import { checkVersion,getRemoteVersion,updateBasicVersion } from '../../systemComponents/VersionControl/VersionApp';


import { UMengAnalytics } from '../../commonComponents/umeng/UMAnalytics';
import AppMessageCenter from '../../systemComponents/routerCenter/AppMessageCenter';

const Permissions = require('react-native-permissions');

var { NativeAppEventEmitter } = require('react-native');
var receiveRemoteNotificationSub;
var clickRemoteNotificationSub;
export default class MyIndex extends BasicComponent {

  constructor(props){
     super(props);
     this.state={
      modalObject:{},
      loadingObject:{},
     }
   }

















  render() {
    return (
      <View style={styles.container}>
            <StatusBar backgroundColor="transparent" barStyle="default" translucent={true}/>
            <Image  source={require('../../images/newApp/myBg.png')}>
                    <View style={styles.ImgView}>
                          <Image style={styles.imgLogo} source={require('../../images/newApp/myImg.png')}/>
                          <View style={styles.ImgRight}>
                                <View style={styles.rightTop}>
                                      <Text style={fonts.t3_white}>登录您的优铺账号>></Text>
                                </View>
                                <Text style={fonts.bodyText_white}>获取最新商铺信息和专业服务</Text>
                          </View>
                    </View>
            </Image>
            <View style={styles.tipsView}>
               <Text style={fonts.bodyText_Black}>今日已查看<Text style={styles.tipsColor}> 3 </Text>套铺源（共10套／日）</Text>
            </View>
            <TouchableHighlight>
               <View style={styles.listView}>
                     <Image  source={require('../../images/newApp/myVip.png')}/>
                     <Text style={[styles.listText,fonts.bodyText_Black]}>会员服务</Text>
                     <Image  source={require('../../images/newApp/showMore.png')}/>
               </View>
            </TouchableHighlight>
            <TouchableHighlight>
               <View style={styles.listView}>
                     <Image  source={require('../../images/newApp/myOrder.png')}/>
                     <Text style={[styles.listText,fonts.bodyText_Black]}>我的订单</Text>
                     <Image  source={require('../../images/newApp/showMore.png')}/>
               </View>
            </TouchableHighlight>
            <TouchableHighlight>
               <View style={styles.listView}>
                     <Image  source={require('../../images/newApp/myCollection.png')}/>
                     <Text style={[styles.listText,fonts.bodyText_Black]}>我的收藏</Text>
                     <Image  source={require('../../images/newApp/showMore.png')}/>
               </View>
            </TouchableHighlight>
            <TouchableHighlight>
               <View style={styles.listView}>
                     <Image  source={require('../../images/newApp/myIntroduce.png')}/>
                     <Text style={[styles.listText,fonts.bodyText_Black]}>关于优铺</Text>
                     <Image  source={require('../../images/newApp/showMore.png')}/>
               </View>
            </TouchableHighlight>
            <TouchableHighlight>
               <View style={[styles.listView,styles.mt10]}>
                     <Text style={[styles.listText1,fonts.bodyText_Black]}>当前版本</Text>
                     <Text style={fonts.bodyText_Black}>v1.2.1</Text>
               </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.btn}>
                     <Text style={fonts.bodyText_Gray}>退出当前账号</Text>
            </TouchableHighlight>
            <CustomTabBar checkIndex={2} />
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
AppRegistry.registerComponent('MyIndex', () => personalIndex);
