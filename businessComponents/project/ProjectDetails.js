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
  Linking
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/project/ProjectDetails';
import Carousel from 'react-native-snap-carousel';
import {sites, h5Sites, apis} from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import BasicComponent from '../basic/BasicComponent';

const horizontalMargin = 20;
const slideWidth = 280;
const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 200;

export default class ProjectDetails extends BasicComponent {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      source: this.props.source,
      id: this.props.id,
      follow : 0,
      site: null,
      url: null,
      userId:0,
      showBack: true
    };
  }

  componentWillMount() {
    this._followProject();
    storage.load({key: keys.currentRemoteSite}).then(ret => {
      let site = h5Sites[ret]
      this.setState({
        site: site,
        url: site + '/project/details/' + this.state.id+'/?userId='+this.state.userId
      })
    })
  }

  //判断用户有没有关注此项目
  _followProject() {
    storage.load({
      key: keys.currentUser
    }).then(currentUser => {
      if(currentUser){
        this.setState({userId:currentUser.id});
        storage.load({
          key: keys.followProject,
          syncInBackground: false,
          syncParams: {
            url: apis.followProject + '?userId=' + currentUser.id + '&projectId=' + this.state.id,
          }
        }).then(res => {
          if(res.status == 200) {
            return res.json();
          }
        }).then(ret => {
          if(ret){
            this.setState({follow:1});
          }
        })
      }
    })
  }

  //取消关注此项目
  _followProjectDel() {
    storage.load({
      key: keys.currentUser
    }).then(currentUser => {
      if(currentUser){
        storage.load({
          key: keys.delAttentionProject,
          syncInBackground: false,
          syncParams: {
            url: apis.delAttentionProject + '?userId=' + currentUser.id + '&projectId=' + this.state.id,
          }
        }).then(res => {
          if(res.status == 200) {
            return res.json();
          }
        }).then(ret => {

          if(ret){
            this.setState({follow:0});
            this.msgShort('取消关注成功');
          }
        })
      }
    })
  }

  //关注此项目
  _onAttention() {
    storage.load({key: keys.currentRemoteSite }).then(ret => {
      let site = sites[ret]
      storage.load({
        key: keys.currentUser
      }).then(currentUser => {
        if(currentUser){
          storage.load({
            key: keys.attentionProject,
            syncInBackground: false,
            syncParams: {
              url: apis.attentionProject + '?userId=' + currentUser.id + '&projectId=' + this.state.id,
            }
          }).then(res => {

            if(res.status == 200) {
              return res.json();
            }
          }).then(ret => {

            if(ret.id >0){
              this.setState({follow:1});
              this.msgShort('关注成功');
            }

          })
        }else{
          Actions.reset('Login',{sourceFlag:'sourceFlag'});
        }
      })
    })
  }

  _onMessage(e){
    let {projectId, showBack} = JSON.parse(e.nativeEvent.data);

    if(projectId && (projectId != this.state.id)) {
      this.setState({
        id: projectId,
        showBack: showBack
      })
    } else {
      this.setState({
        showBack: showBack
      })
    }
  }

  _goBack() {
    if (this.state.source && this.state.source == 'Mapshop'){
      Actions.pop({})
    } else if (this.state.source && this.state.source == 'index'){
      Actions.pop({})
    } else {
      Actions.pop({})
    }
  }

  _onShare(){
    this.share();
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

  _shareToTimeline(){
    storage.load({
      key: keys.getProjects,
      syncInBackground: false,
      syncParams: {
        url: apis.getProjects + '/' + this.state.id,
      }
    }).then(res => {
      return res.json();
    }).then(content => {
      let description = '';
      if(content.isSale) {
        description = '销售均价：' + content.salePrice + '元/㎡，'
      }
      if(content.isLease) {
        description = description + '租金均价：' + content.leasePrice + '元/天/㎡，'
      }
      description = description + '商铺面积：' + content.shopAreaMeasureLow + '-' + content.shopAreaMeasureHigh + '㎡';

      this.shareToTimeline({
        type: 'news',
        title: content.name,
        description: description,
        url: this.state.site + '/project/share/' + this.state.id
      }, () => {
        this.closeModal()
        this.msgShort('项目分享成功');
      }, () => {
        this.closeModal()
        this.msgShort('项目分享失败');
      })
    }).catch(err => {
      this.msgShort('获取项目失败')
    })
  }

  _shareToSession(){
    storage.load({
      key: keys.getProjects,
      syncInBackground: false,
      syncParams: {
        url: apis.getProjects + '/' + this.state.id,
      }
    }).then(res => {
      return res.json();
    }).then(content => {
      let description = '';
      if(content.isSale) {
        description = '销售均价：' + content.salePrice + '元/㎡，'
      }
      if(content.isLease) {
        description = description + '租金均价：' + content.leasePrice + '元/天/㎡，'
      }
      description = description + '商铺面积：' + content.shopAreaMeasureLow + '-' + content.shopAreaMeasureHigh + '㎡';

      this.shareToSession({
        type: 'news',
        title: content.name,
        description: description,
        url: this.state.site + '/project/share/' + this.state.id
      }, () => {
        this.closeModal();
        this.msgShort('项目分享成功');
      }, () => {
        this.closeModal();
        this.msgShort('项目分享失败');
      })
    }).catch(err => {
      this.msgShort('获取项目失败')
    })
  }

  _callPhone(){
    storage.load({
      key: keys.getProjectManagerTel,
      syncInBackground: false,
      syncParams: {
        url: apis.getProjectManagerTel + '/' + this.state.id,
      }
    }).then(res => {
      return res.text();
    }).then(content => {
      Linking.openURL('tel:' + (content ? content : '4008988808'))
    }).catch(err => {
      this.msgShort('获取项目经理电话失败')
    })
  }

  render() {
    return (
      <View style={styles.container}>
            <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true}/>

            {this.state.url ?
              <WebView
               source={{uri:this.state.url}}
               automaticallyAdjustContentInsets={false}
               startInLoadingState={true}
               domStorageEnabled={true}
               javaScriptEnabled={true}
               scalesPageToFit={true}
               scrollEnable={false}
               style={styles.webView}
               injectedJavaScript='window.postMessage(params)'
               onMessage={this._onMessage.bind(this)}
                />
            : null}
            {
              this.state.showBack ?
                <TouchableHighlight style={styles.touchBack} underlayColor="transparent" onPress={() => this._goBack()}>
                  <Image source={require('../../images/backWhite.png')}/>
                </TouchableHighlight>
              : null
            }
            <View style={styles.bottomTouch}>
              {
                this.state.follow == 1?
                <TouchableHighlight onPress={() => this._followProjectDel()} underlayColor="transparent">
                    <View style={styles.attention}>
                          <Image source={require('../../images/attention1.png')}/>
                          <Text style={[styles.mt10,fonts.tinyText_Gray]}>关注</Text>
                    </View>
                </TouchableHighlight>
                :
                <TouchableHighlight onPress={() => this._onAttention()} underlayColor="transparent">
                    <View style={styles.attention}>
                          <Image source={require('../../images/attention.png')}/>
                          <Text style={[styles.mt10,fonts.tinyText_Gray]}>关注</Text>
                    </View>
                </TouchableHighlight>
              }
                  <TouchableHighlight onPress={() => this._onShare()} underlayColor="transparent">
                      <View style={styles.attention}>
                            <Image source={require('../../images/shared.png')}/>
                            <Text style={[styles.mt10,fonts.tinyText_Gray]}>分享</Text>
                      </View>
                  </TouchableHighlight>
                  <TouchableHighlight underlayColor="transparent" onPress={() => this._callPhone()}>
                      <View style={styles.attention}>
                            <Image source={require('../../images/contant.png')}/>
                            <Text style={[styles.mt10,fonts.tinyText_Gray]}>咨询</Text>
                      </View>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.reportBtn} underlayColor="#3a8ff3" onPress={()=>{

                    this.checkIsLogin('ReportProject').then(flag=>{
                      if (flag) {
                        Actions.ReportProject({source: 1, projectId: this.state.id})
                      }
                    })
                  }}>
                            <Text style={fonts.bodyText_white}>快速报备</Text>
                  </TouchableHighlight>
            </View>
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
