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
  ListView,
  ScrollView,
  WebView,
  KeyboardAvoidingView,
  Linking
} from 'react-native';
var moment = require('moment');
import { Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/commonStyle/Details';
import DetailsItem from './DetailsItem';
import HTMLView from 'react-native-htmlview';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import {sites, h5Sites, apis, staticSite} from '../../systemComponents/Remote/ApiStorage';
import ListBasicComponent from '../basic/ListBasicComponent';
import { NiceList } from '../../commonComponents/niceList/NiceList';
import { UMengAnalytics } from '../../commonComponents/umeng/UMAnalytics';

export default class Details extends ListBasicComponent {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let data = [];
    this.state={
      dataSource: ds.cloneWithRows(data),
      modalObject:{},
      loadingObject:{},
      remoteUrl:apis.commentList+'?articleId='+this.props.detailsId,
      storkey:keys.commentList,
      detailsInfo:{},
      content:'',
      enroll:'',
      totalElements:0,
      clickNumber:"",
      url: null,
      title:'',
      scrollViewHeight: 0,
      height:500,
      behavior: 'padding',
      site: null,
    };
  }
  componentWillMount(){
    this.openLoading('正在加载...');
    //显示新闻详情
    this._loadDetail();

    storage.load({
      key: keys.currentRemoteSite
    }).then(ret => {
      let site = h5Sites[ret]
      this.setState({
        site: site
      })
    })
  }
  //显示新闻详情
  _loadDetail(){
    storage.load({key: keys.currentRemoteSite}).then(ret => {
      let site = h5Sites[ret]
      this.setState({
        url: site + '/article/' + this.props.detailsId
      })
    })
    storage.load({
      key: keys.newsDetails,
      syncInBackground: false,
      syncParams: {
         url: apis.newsDetails+ '/' + this.props.detailsId
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json();
      }else{
        return Promise.reject('error')
      };
    }).then(retJson=>{
      this.closeLoading();
      if(retJson.auditing != '通过'){
        this.msgShort('文章已下架')
        setTimeout(
          () => {
            Actions.pop({})
          },
          1000
        );
      }else{
        let detailsInfo = this.state.detailsInfo;
        let clickNumber = this.state.clickNumber;
        let enroll= false;
        if(retJson.enroll){
          enroll=true;
        }
        this.setState({detailsInfo:retJson,clickNumber:retJson.clickNumber,enroll:enroll});
          // 浏览量+1
          this._browser();
          // 是否报名过这条新闻
          this._isEnroll();
      }
    }).catch(err => {
      this.closeLoading();
      this.msgShort('文章已下架')
      setTimeout(
        () => {
          Actions.pop({})
        },
        1000
      );
    })
  }
  // 浏览量+1
   _browser(){
    let clickNumber=  this.state.clickNumber;
    storage.load({
      key: keys.patchArticlesInfo,
      syncInBackground: false,
      syncParams: {
         url: apis.patchArticlesInfo+ '/' +this.props.detailsId,
         body:{
           "clickNumber":clickNumber+1
         }
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json();
      }else{
        return Promise.reject('error')
      };
    }).then(retJson=>{
      if (retJson!=null) {
        this.setState({clickNumber:retJson.clickNumber})
      }
      else {
        this.msgShort('更新评论数量请求返回异常');
      }
    }).catch(err => {
      this.msg("显示异常");
      this.closeLoading();
    })
  }
  // 是否报名过这条新闻
  _isEnroll(){
    storage.load({key: keys.currentUser}).then(currentUser => {
      let enroll = this.state.enroll;
      if (enroll) {
        storage.load({
          key: keys.isEnroll,
          syncInBackground: false,
          syncParams: {
            url: apis.isEnroll+'?articleId='+this.props.detailsId +'&userId='+currentUser.id
          }
        }).then(ret => {
          if(ret.status == 200){
            return ret.json();
          }else{
            return Promise.reject('error')
          };
        }).then(retJson=>{
          this.closeLoading();
          if(retJson){
            this.setState({enroll:false});
          }else{
            this.setState({enroll:true})
          }
        }).catch(err => {
          this.msg("显示异常");
          this.closeLoading();
        })
      }
    }).catch(error=>{

    })
  }
  // 报名成功提示
  _enrollSuccess(){
    storage.load({key: keys.currentUser}).then(currentUser => {
      if (!currentUser||!currentUser.id) {
        Actions.replace('Login',{sourceFlag:'Details'})
        return
      }
        this.openLoading('正在报名...');
        let contentInfo={
            "user": '/users/'+ currentUser.id,
            "article":"articles/" + this.props.detailsId,
        }
        storage.load({
          key: keys.enrollSuccess,
          syncInBackground: false,
          syncParams: {
             url: apis.enrollSuccess,
             body:contentInfo
          }
        }).then(ret => {
          if(ret.status == 201){
            return ret.json()
          } else {
            return Promise.reject('error')
          }
        }).then(res => {
            this.setState({enroll:false})
            this.msgShort('报名已成功哦！')
        }).catch(err => {
          this.msgShort('保存异常，稍后再试')
        })
    }).catch(error=>{
      Actions.replace('Login',{sourceFlag:'Details'})
      return
    })
  }
  // 此回调函数当软键盘的确定/提交按钮被按下的时候调用此函数
  _onSubmitEditing(){
    //提交留言
    storage.load({key: keys.currentUser}).then(currentUser => {
      if (!currentUser||!currentUser.id) {
        Actions.replace('Login',{sourceFlag:'Details'})
        return
      }
      if(currentUser&&currentUser.id){
        if (!this.state.content) {
           this.msgShort('留言不能为空，请输入')
           return
        }
        this.openLoading('正在保存...');
        let contentInfo={
            "content":this.state.content,
            "user": '/users/'+ currentUser.id,
            "article":"articles/" + this.props.detailsId,
            "addSource":"APP",
            "auditing":"未审核"
        }
        storage.load({
          key: keys.commentInfo,
          syncInBackground: false,
          syncParams: {
             url: apis.commentInfo,
             body:contentInfo
          }
        }).then(ret => {
          if(ret.status == 201){
            return ret.json()
          } else {
            return Promise.reject('error')
          }
        }).then(res => {
            let content=this.state.content;
            this.setState({content:''});
            this.msgShort('留言已成功,正在审核哦');
        }).catch(err => {
          this.msgShort('保存异常，稍后再试')
        })
      }else{
        this._noLogin();
      }
    }).catch(error=>{
      Actions.replace('Login',{sourceFlag:'Details'})
    })
  }
  // 未登录留言弹框
  _noLogin(){
    this.alert(
      {
        text:'要留言请先登录哦！',
      })
  }
  // 返回来源
  _cameBack(){
    Actions.pop({refresh:{random:Math.random()}});
  }
  _callPhone(){
    return Linking.openURL('tel:4008988808')
  }

//分享朋友圈
  _shareToTimeline(){
    storage.load({
      key: keys.newsDetails,
      syncInBackground: false,
      syncParams: {
        url: apis.newsDetails+ '/' + this.props.detailsId,
      }
    }).then(res => {
      return res.json();
    }).then(content => {
      let description = '';
      let des = content.content;
      let str=des.replace(/<[^>]*>|/g,"").replace(/[ ]|[&nbsp;]/g, "");
      str = str.substr(0,35);
      description = str + '...';
      this.shareToTimeline({
        type: 'news',
        title: content.title,
        description: description,
        url: this.state.site + '/article/share/' + this.props.detailsId
      }, () => {
        this.closeModal()
        this.msgShort('文章分享成功');
      }, () => {
        this.closeModal()
        this.msgShort('文章分享失败');
      })
    }).catch(err => {
      this.msgShort('获取文章失败')
    })
    UMengAnalytics.onEvent('article_circle_friends_click');
  }

//分享到微信好友
  _shareToSession(){
    storage.load({
      key: keys.newsDetails,
      syncInBackground: false,
      syncParams: {
        url: apis.newsDetails+ '/' + this.props.detailsId,
      }
    }).then(res => {
      return res.json();
    }).then(content => {
      let description = '';
      let des = content.content;
      let str=des.replace(/<[^>]*>|/g,"").replace(/[ ]|[&nbsp;]/g, "");
      str = str.substr(0,35);
      description = str + '...';

      this.shareToSession({
        type: 'news',
        title: content.title,
        description: description,
        url: this.state.site + '/article/share/' + this.props.detailsId
      }, () => {
        this.closeModal();
        this.msgShort('文章分享成功');
      }, () => {
        this.closeModal();
        this.msgShort('文章分享失败');
      })
    }).catch(err => {
      this.msgShort('获取文章失败')
    })
    UMengAnalytics.onEvent('article_wechat_click');
  }

  _onShare(){
    this.content(
      {
        isWholeCustom:true,
        customText:()=>{
          return (
            <View style={styles.mask}>
                  <View style={styles.maskMain}>
                      <View style={styles.share}>
                            <TouchableHighlight style={styles.shareView} underlayColor="transparent" onPress={()=>{this._shareToSession()}}>
                                  <View>
                                        <Image source={require('../../images/weixin.png')}></Image>
                                        <Text style={[styles.shareText,fonts.bodyText_Black]}>微信好友</Text>
                                  </View>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.shareView} underlayColor="transparent" onPress={()=>{this._shareToTimeline()}}>
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
      <View style={styles.main}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content"/>
            <View style={styles.nav}>
                  <TouchableHighlight style={styles.navIconLeft} underlayColor="transparent" onPress={()=>this._cameBack()}>
                        <Image source={require('../../images/back.png')}></Image>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.navIconRight} underlayColor="transparent" onPress={() => this._onShare()}>
                        <Image source={require('../../images/share-icon.png')}></Image>
                  </TouchableHighlight>
            </View>
            <View style={styles.detailsTitle}>
                  <Text style={[styles.titleText,fonts.t2_Black]}>{this.state.detailsInfo.title}</Text>
            </View>
            {
              this.state.detailsInfo.content||this.state.detailsInfo.content===""?
              <View style={styles.DetailsView}>
                  {
                    this.state.url ?
                      <WebView
                        source={{uri: this.state.url}}
                        automaticallyAdjustContentInsets={true}
                        startInLoadingState={true}
                        domStorageEnabled={true}
                        javaScriptEnabled={true}
                        scalesPageToFit={true}
                        scrollEnable={false}
                        style={styles.webView}
                        onShouldStartLoadWithRequest={(e)=>{
                          if (e.url&&e.url.indexOf('://')>0) {
                            var scheme = e.url.split('://')[0]
                            if(scheme === 'http' || scheme === 'https'){
                            return true
                            }
                            return false
                          }else {
                            return false
                          }

                        }}
                      />
                    : null
                  }
              </View>
                  :null
            }
            <KeyboardAvoidingView behavior={this.state.behavior} >
            {this.state.detailsInfo.message?
                <View style={[styles.inputView]}>
                      <View style={[styles.input]}>
                            <Image style={[styles.inputImg]} source={require('../../images/input-pen.png')}></Image>
                            <TextInput
                              style={[styles.viewFlex]}
                              underlineColorAndroid="transparent"
                              clearButtonMode="always" returnKeyType='done'
                              placeholderTextColor="#fff"
                              onSubmitEditing={()=>this._onSubmitEditing()}
                              maxLength={150}
                              value={this.state.content}
                              onChangeText={(text) => this.setState({content: text})}
                            />
                      </View>
                </View>
                :null
             }
             </KeyboardAvoidingView>
             {this.state.enroll?
                <TouchableHighlight style={[styles.applyBtn]} underlayColor="rgba(58,143,243,0.7)" onPress={()=>this._enrollSuccess()}>
                  <Text style={[styles.applyBtnText,fonts.btnText_white]}>立即报名</Text>
                </TouchableHighlight>
                :null
             }
             {this.props.demandFlag?
               <TouchableHighlight style={[styles.applyBtn]} underlayColor="rgba(58,143,243,0.7)" onPress={() => {UMengAnalytics.onEvent('home_banner_click');this._callPhone()}}>
                 <Text style={[styles.applyBtnText,fonts.btnText_white]}>服务咨询</Text>
               </TouchableHighlight>
               :null
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
AppRegistry.registerComponent('Details', () => Details);
