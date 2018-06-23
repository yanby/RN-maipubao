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
import {styles} from '../../styles/newApp/SubleaseShop';
import SectionHeader from '../data/SectionHeader';
import BasicComponent from '../basic/BasicComponent';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { apis, staticSite,currentVersion } from '../../systemComponents/Remote/ApiStorage';
import { checkVersion,getRemoteVersion,updateBasicVersion } from '../../systemComponents/VersionControl/VersionApp';
import { UMengAnalytics } from '../../commonComponents/umeng/UMAnalytics';
import AppMessageCenter from '../../systemComponents/routerCenter/AppMessageCenter';


var { NativeAppEventEmitter } = require('react-native');
var receiveRemoteNotificationSub;
var clickRemoteNotificationSub;
export default class SubleaseShop extends BasicComponent {

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
            <View style={styles.navDefault}>
                  <TouchableHighlight style={styles.navLeft} underlayColor="transparent" onPress={()=>Actions.pop({})}>
                      <Image  source={require('../../images/newApp/feedBack.png')}/>
                  </TouchableHighlight>
                  <View style={styles.navCenter}>
                        <Text style={[fonts.t2_Black]}>委托转铺</Text>
                  </View>
            </View>
            <ScrollView style={styles.scrollView} >
                         <Image style={styles.imgView} source={require('../../images/newApp/zpImg.png')}>
                                  <View style={styles.subView}>
                                        <TextInput style={[styles.subInput,fonts.bodyText_Black]} autoFocus={false}
                                          underlineColorAndroid="transparent"
                                          placeholder="输入您的手机号码 优铺专家马上服务" clearButtonMode="always" returnKeyType='send'
                                          onSubmitEditing={()=>this._onSubmitEditing()}
                                          placeholderTextColor="#ce961f"
                                          onChangeText={(text) => this.setState({keywords: text})}/>
                                          <TouchableHighlight style={styles.subTouch} underlayColor="#ed5f00" onPress={()=>{this._changeCity()}}>
                                             <Text style={fonts.bodyText_white}>提交</Text>
                                          </TouchableHighlight>
                                  </View>
                         </Image>
            </ScrollView>

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
AppRegistry.registerComponent('SubleaseShop', () => personalIndex);
