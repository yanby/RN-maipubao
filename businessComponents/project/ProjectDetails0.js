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
  Linking,
  Animated,
  Easing
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/project/ProjectDetails0';
import Carousel from 'react-native-snap-carousel';
import {sites, h5Sites, apis, staticSite} from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import BasicComponent from '../basic/BasicComponent';
import Swiper from 'react-native-swiper';

var moment = require('moment');

import { UMengAnalytics } from '../../commonComponents/umeng/UMAnalytics';
const renderPagination = (index,total,context) => {
      return (
        <View style={styles.paginationStyle}>
          <Text style={fonts.bodyText_white}>
            <Text style={fonts.bodyText_white}>{index + 1}</Text>/{total}
          </Text>
        </View>
      )
}
const renderPagination1 = (index,total,context) => {
      return (
        <View style={styles.paginationStyle1}>
          <Text style={fonts.bodyText_white}>
            <Text style={fonts.bodyText_white}>{index + 1}</Text>/{total}
          </Text>
        </View>
      )
}
export default class ProjectDetails0 extends BasicComponent {
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
      flag:false,
      userId:0,
      tcpName:'佣金规则',
      ausleseProjects: null,
      project: null,
      trafficLine:'',
      moreView:null,
      settled:'',
      moreView1:null,
      height:false,
      fadeAnim: new Animated.Value(0),
    };
  }

  componentWillMount() {
    this._initProjectData();
    this._followProject();
    this._initAusleseProjects();
      storage.load({
      key:keys.currentUser
    }).then(user=>{
      if (user) {
        this.setState({
          flag: true
        })
      }
    }).catch(error=>{

    })
    storage.load({
      key: keys.currentRemoteSite
    }).then(ret => {
      let site = h5Sites[ret]
      this.setState({
        site: site
      })
    })
  }

  _initProjectData(){
    storage.load({
      key: keys.getProjectDetails,
      syncInBackground: false,
      syncParams: {
         url: apis.getProjectDetails + '/' + this.state.id
      }
    }).then(res => {
      return res.json()
    }).then(content => {
      if(content.status == '未开启'){
        let message = '该项目已下架'
        if(content.specialType == '旅居'){
          message = '该旅居已下架'
        }
        this.msgShort(message)
        setTimeout(
          () => {
            Actions.pop({})
          },
          1000
        );
      }else{
        this.setState({
          project: content,
          trafficLine:content.trafficLine,
          settled:content.settled
        })
        if(content.trafficLine.length>20){
          this.setState({
            moreView:true,
            moreView1:true,
            trafficLine: content.trafficLine.substring(0,20)+'...',
            settled: content.settled.substring(0,20)+'...',
          })
        }else{
          this.setState({
            moreView:false,
            moreView1:false,
            trafficLine: content.trafficLine,
            settled: content.settled
          })
        }
      }
    })
  }
  _showMore(){
    if(this.state.trafficLine.length>20){
      this.setState({
        trafficLine: this.state.project.trafficLine,
      })
    }
  }
  _showMore1(){
    if(this.state.settled.length>20){
      this.setState({
        settled: this.state.project.settled,
      })
    }
  }
  _initAusleseProjects(){
    storage.load({
      key: keys.getAusleseProjects,
      syncInBackground: false,
      syncParams: {
         url: apis.getAusleseProjects + '?size=5'
      }
    }).then(res => {
      return res.json()
    }).then(content => {
      this.setState({
        ausleseProjects: content.content
      })
    })
  }

  _renderAusleseProjects() {
    return (
      <ScrollView style={styles.recommendMain} horizontal={true} showsHorizontalScrollIndicator={false}>
        {
          this.state.ausleseProjects.map(project => {
            return (
              <TouchableHighlight underlayColor="transparent" key={project.id} onPress={() => {Actions.ProjectDetails({id: project.id})}}>
                <View style={styles.recommendView} >
                  {
                    project.projectImg ?
                      <Image style={styles.recommendImg} source={{uri: staticSite + project.projectImg}}/>
                    :
                      <Image source={require('../../images/projectList.png')}></Image>
                  }
                  <View style={styles.marginTop8} ellipsizeMode={'clip'}>
                    <Text style={fonts.t3_Black} numberOfLines={1}>{project.name}</Text>
                  </View>
                  {
                    project.isSale ?
                      <View style={styles.marginTop8}>
                        <Text style={fonts.hintText_Black}>销售均价：<Text style={[fonts.hintText_Black,styles.txtRed]}>{project.salePrice}</Text>元/㎡</Text>
                      </View>
                    : null
                  }
                  {
                    project.isLease ?
                      <View style={styles.marginTop8}>
                        <Text style={fonts.hintText_Black}>租金均价：<Text style={[fonts.hintText_Black,styles.txtRed]}>{project.leasePrice}</Text>元/天/㎡</Text>
                      </View>
                    : null
                  }
                </View>
              </TouchableHighlight>
            );
          })
        }
      </ScrollView>
    );
  }

  _goBack() {
    Actions.pop({refresh:{random:Math.random(),sourceFlag:this.state.source}})
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
            this.setState({
              follow: 1
            });
          }
        })
      }
    }).catch(error=>{

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
            this.setState({
              follow: 0
            });
            this.msgShort('取消关注成功');
          }
        })
      }
    }).catch(error=>{

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
      }).catch(error=>{

      })
    })
    UMengAnalytics.onEvent('project_attention_click');
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
      let shareImg = '';
      if(content.isSale) {
        description = '销售均价：' + content.salePrice + '元/㎡'+"\n"
      }
      if(content.isLease) {
        description = description + '租金均价：' + content.leasePrice + '元/天/㎡'+"\n"
      }
      description = description + '商铺面积：' + content.shopAreaMeasureLow + '-' + content.shopAreaMeasureHigh + '㎡';
      if(this.state.project.imgArray && this.state.project.length>0){
        shareImg = staticSite + this.state.project.imgArray[0]
      }else{
        shareImg = ''
      }

      this.shareToTimeline({
        type: 'news',
        title: content.name,
        description: description,
        url: this.state.site + '/project/share/' + this.state.id,
        thumbImage: shareImg
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
    UMengAnalytics.onEvent('project_circle_friends_click');
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
      let shareImg = '';
      if(content.isSale) {
        description = '销售均价：' + content.salePrice + '元/㎡'+"\n"
      }
      if(content.isLease) {
        description = description + '租金均价：' + content.leasePrice + '元/天/㎡'+"\n"
      }
      description = description + '商铺面积：' + content.shopAreaMeasureLow + '-' + content.shopAreaMeasureHigh + '㎡';
      if(this.state.project.imgArray && this.state.project.length>0){
        shareImg = staticSite + this.state.project.imgArray[0]
      }else{
        shareImg = ''
      }
      this.shareToSession({
        type: 'news',
        title: content.name,
        description: description,
        url: this.state.site + '/project/share/' + this.state.id,
        thumbImage: shareImg
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
    UMengAnalytics.onEvent('project_wechat_click');
  }

  _callPhone(){
    if(this.state.project.tel) {
      Linking.openURL('tel:' + this.state.project.tel)
    }
  }
  showView(){
    Animated.timing(
    this.state.fadeAnim,//初始值
    {
      toValue: 1,
      duration: 300,
      easing: Easing.linear
    }//结束值
    ).start();//开始
  }
  closeView(){
    Animated.timing(
    this.state.fadeAnim,//初始值
    {
      toValue: 0,
      duration: 300,
      easing: Easing.linear
    }//结束值
    ).start();//开始
  }
  // swiper弹框
  _swiperModule(){
    this.content(
      {
        isWholeCustom:true,
        customText:()=>{
          return (
          <View style={styles.swiperMask}>
                <View style={styles.swiperMaskNav}>
                      <TouchableHighlight style={styles.swiperMasknavLeft} underlayColor="transparent" onPress={() => {this.closeModal()}}>
                            <Image source={require('../../images/backWhite.png')}/>
                      </TouchableHighlight>
                      <View style={styles.swiperMasknavCenter} ellipsizeMode={'clip'}>
                            <Text style={fonts.t2_white} numberOfLines={1}>{this.state.project.name}</Text>
                      </View>
                </View>
                <View style={styles.swiperMaskMain}>
                      <View style={styles.swiper1}>
                            <Swiper
                                style={styles.wrapper}
                                renderPagination={renderPagination1}
                                loop={true}>
                                {
                                  this.state.project.imgArray.map((img, i) => {
                                    return (
                                      <View key={i} style={styles.slide}>
                                            <TouchableHighlight underlayColor="transparent">
                                                  <Image style={styles.slideImg1} source={{uri: staticSite + img}} />
                                            </TouchableHighlight>
                                      </View>
                                    )
                                  })
                                }
                              </Swiper>
                      </View>
                </View>

        </View>

        );
        }
      })
  }

  render() {
    return (
      <View style={styles.container}>
            <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true}/>
            {
              this.state.project ?
                <ScrollView style={styles.marginBottom50} onScroll={(e)=>{
                  if(e.nativeEvent.contentOffset.y>0){
                    this.showView();
                    this.setState({height:true})
                  }else{
                    this.closeView();
                    this.setState({height:false})
                  }
                }}>
                  <View style={styles.swiper}>
                    <Swiper
                            style={styles.wrapper}
                            renderPagination={renderPagination}
                            loop={true}>
                            {this.state.project.imgArray && this.state.project.imgArray.length>0?
                              this.state.project.imgArray.map((img, i) => {
                                return (
                                  <View key={i} style={styles.slide}>
                                        <TouchableHighlight underlayColor="transparent" onPress={() => {this._swiperModule()}}>
                                              <Image style={styles.slideImg} source={{uri: staticSite + img}} />
                                        </TouchableHighlight>
                                        <View style={styles.slideTxt} ellipsizeMode={'clip'}><Text style={[styles.slideTxtT,fonts.bodyText_white]} numberOfLines={1}>{this.state.project.name}</Text></View>
                                  </View>
                                )
                              })
                              :
                              <View style={styles.slide}>
                                <TouchableHighlight underlayColor="transparent">
                                  <Image style={styles.slideImg} source={require('../../images/projectDetails.png')}/>
                                </TouchableHighlight>
                                <View style={styles.slideTxt} ellipsizeMode={'clip'}><Text style={[styles.slideTxtT,fonts.bodyText_white]} numberOfLines={1}>{this.state.project.name}</Text></View>
                              </View>
                            }

                  </Swiper>

                  </View>
                  <View style={styles.main}>
                    {
                      this.state.project.projectTags ?
                        <View style={styles.label}>
                          {
                            this.state.project.projectTags.map((projectTag, i) => {
                              let projectTagStyles = [[styles.flagColor1, styles.txtColor1], [styles.flagColor2, styles.txtColor2], [styles.flagColor3, styles.txtColor3]];
                              let styleIndex = i % 3;
                              return (
                                <View style={[styles.flag, projectTagStyles[styleIndex][0]]} key={i}><Text style={[fonts.tinyText_Gray, projectTagStyles[styleIndex][1]]}>{projectTag.name}</Text></View>
                              )
                            })
                          }
                        </View>
                      : null
                    }
                    <View style={styles.price}>
                      {
                        this.state.project.isSale ?
                          <View style={styles.marginTop10}><Text style={fonts.t3_Black}>销售均价：<Text style={[fonts.t3_Black,styles.txtRed]}>{this.state.project.salePrice}</Text>元／㎡</Text></View>
                        : null
                      }
                      {
                        this.state.project.isLease ?
                          <View style={styles.marginTop5}><Text style={fonts.t3_Black}>租金均价：<Text style={[fonts.t3_Black,styles.txtRed]}>{this.state.project.leasePrice}</Text>元/天/㎡</Text></View>
                        : null
                      }
                    </View>
                    <View style={styles.information}>
                      {
                        this.state.project.businessAreaMeasure ?
                          <View style={styles.marginTop10}><Text style={fonts.bodyText_Gray}>面积：<Text style={fonts.bodyText_Black}>{this.state.project.businessAreaMeasure}㎡</Text></Text></View>
                        : null
                      }
                      {
                        //                      <View style={styles.marginTop10}><Text style={fonts.bodyText_Gray}>商铺面积：<Text style={fonts.bodyText_Black}>{this.state.project.shopAreaMeasureLow}-{this.state.project.shopAreaMeasureHigh}㎡</Text></Text></View>
                      }
                      <View style={styles.marginTop10}><Text style={fonts.bodyText_Gray}>项目类型：<Text style={fonts.bodyText_Black}>{this.state.project.projectTypeText}</Text></Text></View>
                      <View style={styles.marginTop10}><Text style={fonts.bodyText_Gray}>项目业态：<Text style={fonts.bodyText_Black}>{this.state.project.projectBusinessTypesText}</Text></Text></View>
                      <View style={styles.marginTop10}><Text style={fonts.bodyText_Gray}>地       址：<Text style={fonts.bodyText_Black}>{this.state.project.address}</Text></Text></View>
                      <View style={[styles.marginTop10,styles.flexView]}>
                            <Text style={[fonts.bodyText_Gray,styles.flexText]}>交       通：<Text style={fonts.bodyText_Black}>{this.state.trafficLine}</Text></Text>
                            {this.state.moreView?
                            <TouchableHighlight underlayColor="transparent" onPress={() => this._showMore()} style={styles.more}>
                             <Image  source={require('../../images/dropFlag.png')}/>
                            </TouchableHighlight>
                            :null
                            }
                      </View>
                      <View style={[styles.marginTop10,styles.flexView]}>
                            <Text style={[fonts.bodyText_Gray,styles.flexText]}>周边配套：<Text style={[fonts.bodyText_Black,styles.lineHeight22]}>{this.state.settled}</Text></Text>
                            {this.state.moreView1?
                            <TouchableHighlight underlayColor="transparent" onPress={() => this._showMore1()} style={styles.more}>
                             <Image  source={require('../../images/dropFlag.png')}/>
                            </TouchableHighlight>
                            :null
                            }
                      </View>
                    </View>
                    {
                      this.state.flag ?
                      <View style={styles.commission}>
                        <TouchableHighlight underlayColor="transparent" onPress={() => {UMengAnalytics.onEvent('commission_show');Actions.Protocol({protocolName: this.state.tcpName})}}>
                          <View style={styles.title}>
                            <View style={styles.titleLeft}><Text style={fonts.t3_Black}>佣金规则</Text></View>
                            <View><Text style={fonts.hintText_Blue}>佣金规则?</Text></View>
                          </View>
                        </TouchableHighlight>
                        {
                          this.state.project.isSale ?
                            <View style={styles.marginTop10}>
                              <Text style={[fonts.bodyText_Black,styles.marginTop15]}>销售佣金：</Text>
                                <Text style={[fonts.bodyText_Black,styles.marginTop15]}>金牌：<Text style={[fonts.bodyText_Gray,styles.lineHeight22]}>{this.state.project.saleCommissionGold}</Text></Text>
                                <Text style={[fonts.bodyText_Black,styles.marginTop15]}>银牌：<Text style={[fonts.bodyText_Gray,styles.lineHeight22]}>{this.state.project.saleCommissionSilver}</Text></Text>
                                <Text style={[fonts.bodyText_Black,styles.marginTop15]}>铜牌：<Text style={[fonts.bodyText_Gray,styles.lineHeight22]}>{this.state.project.saleCommissionCopper}</Text></Text>
                            </View>
                          : null
                        }
                        {
                          this.state.project.isLease ?
                            <View style={styles.marginTop10}>
                              <Text style={[fonts.bodyText_Black,styles.marginTop15]}>招商佣金：</Text>
                                <Text style={[fonts.bodyText_Black,styles.marginTop15]}>金牌：<Text style={[fonts.bodyText_Gray,styles.lineHeight22]}>{this.state.project.attractCommissionGold}</Text></Text>
                                <Text style={[fonts.bodyText_Black,styles.marginTop15]}>银牌：<Text style={[fonts.bodyText_Gray,styles.lineHeight22]}>{this.state.project.attractCommissionSilver}</Text></Text>
                                <Text style={[fonts.bodyText_Black,styles.marginTop15]}>铜牌：<Text style={[fonts.bodyText_Gray,styles.lineHeight22]}>{this.state.project.attractCommissionCopper}</Text></Text>
                            </View>
                          : null
                        }
                      </View>
                      : null
                    }

                    <View style={styles.infoOverview}>
                      <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.InfoOverview({project: this.state.project})}>
                        <View style={styles.title}>
                          <View style={styles.titleLeft}><Text style={fonts.t3_Black}>信息概况</Text></View>
                          <Image  source={require('../../images/more.png')}/>
                        </View>
                      </TouchableHighlight>
                      <View style={styles.marginTop10}><Text style={fonts.bodyText_Black}>开   发   商：<Text style={fonts.bodyText_Gray}>{this.state.project.developer}</Text></Text></View>
                      <View style={styles.marginTop10}><Text style={fonts.bodyText_Black}>开 业 时 间：<Text style={fonts.bodyText_Gray}>{this.state.project.openingTime ? (moment(this.state.project.openingTime).format('YYYY年MM月')) : '暂无'}</Text></Text></View>
                      <View style={styles.marginTop10}><Text style={fonts.bodyText_Black}>地上停车位：<Text style={fonts.bodyText_Gray}>{this.state.project.groundParkingLots ? (this.state.project.groundParkingLots + '个') : '暂无'}</Text></Text></View>
                      <View style={styles.marginTop10}><Text style={fonts.bodyText_Black}>地下停车位：<Text style={fonts.bodyText_Gray}>{this.state.project.underGroundParkingLots ? (this.state.project.underGroundParkingLots + '个') : '暂无'}</Text></Text></View>
                      <View style={styles.marginTop10}><Text style={fonts.bodyText_Black}>周 边 人 口：<Text style={fonts.bodyText_Gray}>{this.state.project.einwohnerThree ? this.state.project.einwohnerThree : '暂无'}／3公里／{this.state.project.einwohnerFive ? this.state.project.einwohnerFive : '暂无'}／5公里</Text></Text></View>
                      <View style={styles.marginTop10}><Text style={fonts.bodyText_Black}>项 目 编 号：<Text style={fonts.bodyText_Gray}>{this.state.project.projectNumber ? this.state.project.projectNumber : '暂无'}</Text></Text></View>
                      <View style={styles.marginTop10}><Text style={fonts.bodyText_Black}>项 目 优 势：<Text style={[fonts.bodyText_Gray,styles.lineHeight22]}>{this.state.project.superiority}</Text></Text></View>
                    </View>
                    <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.Floorplan({id: this.state.project.id})}>
                      <View style={styles.floorplan}>
                        <View style={styles.titleLeft}><Text style={[fonts.t2_Black,styles.floorplanTxt]}>楼层平面</Text></View>
                        <Image  source={require('../../images/more.png')}/>
                      </View>
                    </TouchableHighlight>
                    <View style={styles.recommend}>
                      <View style={[styles.title,styles.paddingRight15]}>
                        <View style={styles.titleLeft}><Text style={fonts.t3_Black}>推荐</Text></View>
                      </View>
                      {
                        this.state.ausleseProjects ? this._renderAusleseProjects() : null
                      }
                    </View>
                  </View>
                </ScrollView>
              : null
            }
            {this.state.height?
            <Animated.View style={{width:Dimensions.get('window').width,
            position:'absolute',
            left:0,
            top:0,
            flexDirection:"row",
            backgroundColor:"#f6f9fc",
            height:64,
            alignItems:"center",
            justifyContent:"center",
            paddingTop:15,opacity: this.state.fadeAnim}}>
                  <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
                  <TouchableHighlight style={styles.navLeft} underlayColor="transparent" onPress={() => this._goBack()}>
                      <Image source={require('../../images/back.png')}/>
                  </TouchableHighlight>
                  <View ellipsizeMode={'clip'}>
                        <Text style={[fonts.t2_Black,styles.navName]} numberOfLines={1}>{this.state.project.name}</Text>
                  </View>
            </Animated.View>
            :
                  <TouchableHighlight style={styles.touchBack} underlayColor="transparent" onPress={() => this._goBack()}>
                      <Image source={require('../../images/backWhite.png')}/>
                  </TouchableHighlight>
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
                  <TouchableHighlight underlayColor="transparent" onPress={() => {UMengAnalytics.onEvent('project_customer_service_click');this._callPhone()}}>
                      <View style={styles.attention}>
                            <Image source={require('../../images/contant.png')}/>
                            <Text style={[styles.mt10,fonts.tinyText_Gray]}>咨询</Text>
                      </View>
                  </TouchableHighlight>
                  <TouchableHighlight underlayColor="transparent" style={styles.reportBtn} underlayColor="#3a8ff3" onPress={() => {
                      this.checkIsLogin('ReportProject').then(flag => {
                        if (flag) {
                          Actions.ReportProject({source: 1, projectId: this.state.id, speicialType: this.state.project.specialType})
                        }
                      })
                    }}>
                    <Text style={fonts.bodyText_white}>预约看房</Text>
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
