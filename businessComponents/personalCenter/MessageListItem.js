import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  PixelRatio,
  Platform,
  NativeModules,
  AsyncStorage,
  NativeAppEventEmitter,
  Dimensions,AppRegistry,TouchableHighlight,Modal
} from 'react-native';
var moment = require('moment');
import { Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/personalCenter/MessageList';
import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import BasicComponent from '../basic/BasicComponent';

export default class MessageListItem extends BasicComponent {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      id: this.props.item.id,
      title: this.props.item.title ? this.props.item.title : '暂无',
      titleCut: this.props.item.titleCut ? this.props.item.titleCut : '暂无',
      content: this.props.item.content ? this.props.item.content : '暂无',
      contentCut: this.props.item.contentCut ? this.props.item.contentCut : '暂无',
      createTime: this.props.item.createTimeText,
      readFlag: this.props.item.readFlag ? this.props.item.readFlag : false,
      userId:this.props.userId,
      transmissionContent:this.props.item.transmissionContent
    };
  }

  _setNotificationRead(){
    storage.load({
      key: keys.userNotificationUpdate,
      syncInBackground: false,
      syncParams: {
         url: apis.userNotificationUpdate +'?id=' + this.state.id +'&userId=' +this.state.userId +'&flag=false'
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json();
      }else{
        return Promise.reject('404')
      };
    }).then(retJson=>{
        if(!retJson){
          Actions.replace('Login',{sourceFlag:'PersonalIndex'})
        }
    }).catch(err => {
      if (err === '404') {
        Actions.replace('Login',{sourceFlag:'PersonalIndex'})
      }
    })
  }

  _setPushMessageRead(pushMessageId){
    storage.load({
      key: keys.pushLogInsert,
      syncInBackground: false,
      syncParams: {
         url: apis.pushLogInsert +'?pushMessageId=' + pushMessageId +'&userId=' + this.state.userId +'&openTypeVal=1'
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json();
      }else{
        return Promise.reject('404')
      };
    }).then(retJson=>{
        if(!retJson){
          Actions.replace('Login',{sourceFlag:'PersonalIndex'})
        }
    }).catch(err => {
      if (err === '404') {
        Actions.replace('Login',{sourceFlag:'PersonalIndex'})
      }
    })
  }

  _pushMessageJump(transmissionContent){
    if(transmissionContent.effect){
      if(transmissionContent.pageType == '项目详情页' || transmissionContent.pageType == '旅居详情页'){
        Actions.ProjectDetails({id: transmissionContent.pageId,source:'message'});
      }else if(transmissionContent.pageType == '商铺详情页'){
        Actions.ShopDetails({id: transmissionContent.pageId,source:'message'});
      }else if(transmissionContent.pageType == '品牌详情页'){
        Actions.BrandsDetails({id: transmissionContent.pageId})
      }else if(transmissionContent.pageType == '资讯详情页'){
        Actions.Details({detailsId: transmissionContent.pageId})
      }else{
        return;
      }
    }else{
      Actions.MessageDetails({
        id:this.state.id,
        userId:this.state.userId,
        contenTitle:this.state.title,
        content:this.state.content
      })
    }
  }

  _MessageClick(){
    var transmissionContent = JSON.parse(this.state.transmissionContent);
    if(!this.state.readFlag){
      if(transmissionContent.type != '后台推送'){
        this._setNotificationRead();
      }else{
        this._setPushMessageRead(transmissionContent.pushMessageId)
        if(transmissionContent.pushLocation >1){
          this._setNotificationRead();
        }
      }
    }

    switch (transmissionContent.type) {
      case '报备提醒':
        Actions.reset('MyProject');
        break;
      case '报备成功':
        Actions.BusinessRentDetails({businessId: transmissionContent.businessId});
        break;
      case '报备失败':
        Actions.BusinessRentDetails({businessId: transmissionContent.businessId});
        break;
      case '录到访':
        Actions.BusinessRentDetails({businessId: transmissionContent.businessId});
        break;
      case '到访结束':
        Actions.BusinessRentDetails({businessId: transmissionContent.businessId});
        break;
      case '认购意向结束':
        Actions.BusinessRentDetails({businessId: transmissionContent.businessId});
        break;
      case '签约结束':
        Actions.BusinessRentDetails({businessId: transmissionContent.businessId});
        break;
      case '录认购':
        Actions.BusinessRentDetails({businessId: transmissionContent.businessId});
        break;
      case '录意向':
        Actions.BusinessRentDetails({businessId: transmissionContent.businessId});
        break;
      case '录签约':
        Actions.BusinessRentDetails({businessId: transmissionContent.businessId});
        break;
      case '新项目':
        Actions.ProjectDetails({id: transmissionContent.projectId,source:'message'});
        break;
      case '价格变动':
        Actions.ProjectDetails({id: transmissionContent.projectId,source:'message'});
        break;
      case '信息回复':
        Actions.MessageDetails({
          id:this.state.id,
          userId:this.state.userId,
          contenTitle:this.state.title,
          content:this.state.content
        })
        break;
      case '留言审核':
        Actions.Details({detailsId: transmissionContent.articleId});
        break;
      case '发帖审核':
        Actions.Details({detailsId: transmissionContent.articleId});
        break;
      case '后台推送':
        this._pushMessageJump(transmissionContent)
        break;
      default:
    }


  }
  render(){
    return(
            <View style={styles.memberView}>
                  <TouchableHighlight underlayColor="transparent" onPress={()=>this._MessageClick()} >
                  {
                    this.state.readFlag?
                    <View style={styles.viewList}>
                          <View style={styles.viewTitle}>
                                <Text style={[fonts.bodyText_Gray,styles.viewTitleText]}>{this.state.titleCut}</Text>
                                <Image source={require('../../images/more.png')}></Image>
                          </View>
                          <View style={styles.viewText}>
                                <Text style={[fonts.hintText_Gray,styles.viewTextText]}>{this.state.contentCut}</Text>
                          </View>
                          <View style={styles.createTime}>
                                <Text style={[styles.createTimeTxt,fonts.hintText_Gray]}>{this.state.createTime}</Text>
                          </View>
                    </View>
                  :
                  <View style={styles.viewList}>
                        <View style={styles.viewTitle}>
                              <Text style={[fonts.bodyText_Black,styles.viewTitleText]}>{this.state.titleCut}</Text>
                              <Image source={require('../../images/more.png')}></Image>
                              <View style={styles.redIcon}></View>
                        </View>
                        <View style={styles.viewText}>
                              <Text style={[fonts.hintText_Gray1,styles.viewTextText]}>{this.state.contentCut}</Text>
                        </View>
                        <View style={styles.createTime}>
                              <Text style={[styles.createTimeTxt,fonts.hintText_Gray]}>{this.state.createTime}</Text>
                        </View>
                  </View>

                }
                  </TouchableHighlight>
            </View>
      )
    }
  }
