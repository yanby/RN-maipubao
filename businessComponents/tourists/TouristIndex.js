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
import {styles} from '../../styles/tourists/TouristIndex';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import CustomTabBar from '../../commonComponents/tabBar/CustomTabBar';

import { apis,sites } from '../../systemComponents/Remote/ApiStorage';
import BasicComponent from '../basic/BasicComponent';
export default class TouristIndex extends BasicComponent {
  constructor(props){
     super(props);
     this.state={
      date:[],
      modalObject:{},
      loadingObject:{},
     }
   }
    componentDidMount(){
      this.initPage();
   }
    initPage(){
      storage.load({
        key:keys.currentUser
      }).then(ret=>{
        storage.load({
          key: keys.TouristIndex,
          syncInBackground: false,
          syncParams: {
            url:apis.TouristIndex +'?userId='+ret.id
          }
        }).then(ref=>{
          if(ref.status == 200){
            return ref.json();
          }else{
            return Promise.reject('error')
          }
        }).then(retJson=>{
         this.setState({date:retJson});
       }).catch(err=>{
       })
      }).catch(err=>{
        console.log(err);
      })

   }
  render() {
    return (
      <View style={[styles.main]}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
            <View style={[styles.nav]}>
                  <Text style={[fonts.t2_Black]}>客源</Text>
            </View>
            <View style={[styles.viewNav]}>
                  <TouchableHighlight style={[styles.navBtnA,styles.navBtnB,styles.navBtnC]}>
                        <View style={[styles.navBtn]}>
                              <Text style={[fonts.hintText_Black]}>{this.state.date.reportNum} 组</Text>
                              <Text style={[styles.textBottom,fonts.hintText_Black]}>累计约看</Text>
                        </View>
                  </TouchableHighlight>
                  <TouchableHighlight style={[styles.navBtnA,styles.navBtnB]}>
                        <View style={[styles.navBtn]}>
                              <Text style={[fonts.hintText_Black]}>{this.state.date.visitNum} 组</Text>
                              <Text style={[styles.textBottom,fonts.hintText_Black]}>累计到访</Text>
                        </View>
                  </TouchableHighlight>
                  <TouchableHighlight style={[styles.navBtnA,styles.navBtnC,]}>
                        <View style={[styles.navBtn]}>
                              <Text style={[fonts.hintText_Black]}>{this.state.date.signNum} 组</Text>
                              <Text style={[styles.textBottom,fonts.hintText_Black]}>累计签约</Text>
                        </View>
                  </TouchableHighlight>
                  <TouchableHighlight style={[styles.navBtnA]}>
                        <View style={[styles.navBtn]}>
                              <Text style={[fonts.hintText_Black]}>{this.state.date.commission} 元</Text>
                              <Text style={[styles.textBottom,fonts.hintText_Black]}>累计提佣</Text>
                        </View>
                  </TouchableHighlight>
            </View>
            <TouchableHighlight underlayColor="transparent" onPress={()=>{
              this.checkIsLogin('ReportProject').then(flag=>{
                if (flag) {
                  Actions.ReportProject({source: 0})
                }
              })
            }}>
                  <View style={[styles.viewListItem1]}>
                        <Image style={[styles.img]} source={require('../../images/touristsIcon2.png')}></Image>
                        <Text style={[styles.viewListText1,fonts.t2_Blue]}>预约看房</Text>
                  </View>
            </TouchableHighlight>
            <View style={[styles.viewList]}>
                  <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.CustomerEnter({})}>
                        <View style={[styles.viewListItem]}>
                              <Image style={[styles.img]} source={require('../../images/addCustom.png')}></Image>
                              <Text style={[styles.viewListText,fonts.bodyText_Black]}>客户录入</Text>
                              <Image style={[styles.img]} source={require('../../images/more.png')}></Image>
                        </View>
                  </TouchableHighlight>
                  <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.MyCustom({})}>
                        <View style={[styles.viewListItem]}>
                              <Image style={[styles.img]} source={require('../../images/customManage.png')}></Image>
                              <Text style={[styles.viewListText,fonts.bodyText_Black]}>客户管理</Text>
                              <Image style={[styles.img]} source={require('../../images/more.png')}></Image>
                        </View>
                  </TouchableHighlight>
                  <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.SignManagement({})}>
                        <View style={[styles.viewListItem]}>
                              <Image style={[styles.img]} source={require('../../images/touristsIcon3.png')}></Image>
                              <Text style={[styles.viewListText,fonts.bodyText_Black]}>签约管理</Text>
                              <Image style={[styles.img]} source={require('../../images/more.png')}></Image>
                        </View>
                  </TouchableHighlight>
            </View>
            {
              this.renderModal()
            }
            {
              this.renderLoading()
            }
            <CustomTabBar checkIndex={2} />
      </View>
    );
  }
}
AppRegistry.registerComponent('TouristIndex', () => TouristIndex);
