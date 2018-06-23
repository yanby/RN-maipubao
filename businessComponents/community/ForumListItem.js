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
import {styles} from '../../styles/community/OfflineActivit';
import BasicComponent from '../basic/BasicComponent';
import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
export default class ForumListItem extends BasicComponent {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      totalElements:0,
      totalList:4
    };
  }
  async  componentWillMount(){
    storage.load({
      key: keys.commentList,
      syncInBackground: false,
      syncParams: {
	       url: apis.commentList+'?articleId='+this.props.item.id
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json();
      }else{
         this.msgShort(ret.msg)
      };
    }).then(res => {
        let totalElements=this.state.totalElements;
        this.setState({totalElements:res.totalElements})
    }).catch(err => {
      this.msgShort('获取异常')
    })

  }
  _iconImg(){
    if(this.props.item.label == '精选'){
      return <Image style={styles.proImgRest} source={require('../../images/jx.png')}/>
    } else if (this.props.item.label == '优质'){
      return <Image style={styles.proImgRest} source={require('../../images/yz.png')}/>
    }else if(this.props.item.label == '优铺官方'){
      return <Image style={styles.proImgRest} source={require('../../images/gf.png')}/>
    } else{
      return null
    }
  }
  render(){
    return(
          <View style={styles.mianView}>
                <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.Details({detailsId:this.props.item.id,totalList:this.state.totalList})}>
                            <View style={[styles.offlineRight,styles.offlineRightRest]}>
                                  <Text style={[styles.ForumText,fonts.bodyText_Black]}>{this.props.item.title}</Text>
                                  <View style={[styles.rightBottom,styles.bottomTop]}>
                                        <View style={styles.flexView}>
                                        <Text style={[styles.flexTitle,fonts.tinyText_Gray]}>{this.props.item.label?this.props.item.label:"暂无"}</Text>
                                        <Text style={[styles.flexTitle,fonts.tinyText_Gray]}>浏览{this.props.item.clickNumber+this.props.item.dummyClickNumber}</Text>
                                        <Text style={[styles.flexTitle,fonts.tinyText_Gray]}>评论{this.state.totalElements}</Text>
                                        </View>
                                        <Text style={[styles.bottomTitle,fonts.tinyText_Gray]}>{moment(this.props.item.createTime).format('YYYY-MM-DD')}</Text>
                                  </View>
                                  {this._iconImg()}
                            </View>
                </TouchableHighlight>
                {
                  this.renderModal()
                }
                {
                  this.renderLoading()
                }
          </View>
      )
    }
  }
