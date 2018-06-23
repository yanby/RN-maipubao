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
import {styles} from '../../styles/project/ShopsDetails';
import Carousel from 'react-native-snap-carousel';
import {sites, h5Sites, apis, staticSite} from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import BasicComponent from '../basic/BasicComponent';
import Swiper from 'react-native-swiper';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import HTMLView from 'react-native-htmlview';
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
export default class ShopDetails extends BasicComponent {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      source: this.props.source,
      id: this.props.id,
      site: null,
      selectedIndex:0,
      selectedStyleIndex:0,
      follow : 0,
      userId:0,
      shop: null,
      tabs:['商铺详情', '商铺优势'],
      tcpName:'商铺佣金规则',
      servicePhone:'4008988808',
      height:false,
      fadeAnim: new Animated.Value(0),
      shopDdvantage:null,
      imgArrary:[]
    };
  }

  _handleIndexChange = (index) => {
    this.setState({})
    let styleIndex = index
    // if(this.state.userId == 0 && index==1){
    if(index==1){
      index = 2
    }
    if(index == 2){
      UMengAnalytics.onEvent('shops_details_advantage_click');
    }
    this.setState({
      selectedIndex: index,
      selectedStyleIndex:styleIndex
    });
  }
  componentWillMount() {
    this._initShopData();
    this._loadUser();
    this._initRemoteSite();
    UMengAnalytics.onEvent('shops_details_show');
  }

  _initShopData(){
    storage.load({
      key: keys.getShopDetails,
      syncInBackground: false,
      syncParams: {
         url: apis.getShopDetails + '/' + this.state.id
      }
    }).then(res => {
      return res.json()
    }).then(content => {
      if(content.status == '未开启' || content.dueFlag){
        this.msgShort('该商铺已下架')
        setTimeout(
          () => {
            Actions.pop({})
          },
          1000
        );
      }else{
        let newClass='<head></head>'+content.superiority;
        this.setState({
          shop: content,
          shopDdvantage:newClass
        })
      }

    }).catch((err)=>{
      this.msgShort('该商铺已下架')
      setTimeout(
        () => {
          Actions.pop({})
        },
        1000
      );
    })
  }
  async renderNode(node, index, siblings, parent, defaultRenderer) {
      if (node.name == 'img') {
          const a = node.attribs;
          return null;
      }
  }
  _loadUser(){
    storage.load({key: keys.currentUser}).then(currentUser => {
        this.setState({
          userId:currentUser.id,
          // tabs:['商铺详情', '佣金政策', '商铺优势']
        });
        this._followShop();
    }).catch((err)=>{
      if (err === '404') {
        Actions.replace('Login',{sourceFlag:'ShopDetails'})
      }
    })
  }

  _initRemoteSite(){
    storage.load({
      key: keys.currentRemoteSite
    }).then(ret => {
      let site = h5Sites[ret]
      this.setState({
        site: site
      })
    })
  }

  //判断用户有没有关注此商铺
  _followShop() {
    storage.load({
      key: keys.followShop,
      syncInBackground: false,
      syncParams: {
        url: apis.followShop + '?userId=' + this.state.userId + '&shopId=' + this.state.id,
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
    }).catch(error=>{
      Actions.replace('Login',{sourceFlag:'ShopDetails'})
    })
  }

  //取消关注此商铺
  _followShopDel() {
    storage.load({
      key: keys.delAttentionShop,
      syncInBackground: false,
      syncParams: {
        url: apis.delAttentionShop + '?userId=' + this.state.userId + '&shopId=' + this.state.id,
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
    }).catch(error=>{
      Actions.replace('Login',{sourceFlag:'ShopDetails'})
    })
  }

  //关注此商铺
  _onAttention() {
    storage.load({
      key: keys.attentionShop,
      syncInBackground: false,
      syncParams: {
        url: apis.attentionShop + '?userId=' + this.state.userId + '&shopId=' + this.state.id,
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
    }).catch(error=>{
    })
    UMengAnalytics.onEvent('shops_attention_click');
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
      key: keys.getShops,
      syncInBackground: false,
      syncParams: {
        url: apis.getShops + '/' + this.state.id,
      }
    }).then(res => {
      return res.json();
    }).then(content => {
      let description = '';
      let shareImg = '';
      if(content.totalPrice){
        description = '售价：' + content.totalPrice + '万元'+"\n"
      }
      if(content.monthlyRent){
        description = description + '租金：' + content.monthlyRent + '元/月'+"\n"
      }
      if(content.areaMeasure){
        description = description + '商铺面积：' + content.areaMeasure+ '㎡';
      }
      if(this.state.shop.imgArray && this.state.shop.imgArray.length>0){
        shareImg = staticSite + this.state.shop.imgArray[0]
      }else{
        shareImg = ''
      }

      this.shareToTimeline({
        type: 'news',
        title: content.name,
        description: description,
        url: this.state.site + '/shop/share/' + this.state.id,
        thumbImage: shareImg
      }, () => {
        this.closeModal()
        this.msgShort('商铺分享成功');
      }, () => {
        this.closeModal()
        this.msgShort('商铺分享失败');
      })
    }).catch(err => {
      this.msgShort('获取商铺失败')
    })
    UMengAnalytics.onEvent('shops_circle_friends_click');
  }

  _shareToSession(){
    storage.load({
      key: keys.getShops,
      syncInBackground: false,
      syncParams: {
        url: apis.getShops + '/' + this.state.id,
      }
    }).then(res => {
      return res.json();
    }).then(content => {
      let description = '';
      let shareImg = '';
      if(content.totalPrice){
        description = '售价：' + content.totalPrice + '万元'+"\n"
      }
      if(content.monthlyRent){
        description = description + '租金：' + content.monthlyRent + '元/月'+"\n"
      }
      if(content.areaMeasure){
        description = description + '商铺面积：' + content.areaMeasure + '㎡';
      }
      if(this.state.shop.imgArray && this.state.shop.imgArray.length>0){
        shareImg = staticSite + this.state.shop.imgArray[0]
      }else{
        shareImg = ''
      }
      this.shareToSession({
        type: 'news',
        title: content.name,
        description: description,
        url: this.state.site + '/shop/share/' + this.state.id,
        thumbImage: shareImg
      }, () => {
        this.closeModal();
        this.msgShort('商铺分享成功');
      }, () => {
        this.closeModal();
        this.msgShort('商铺分享失败');
      })
    }).catch(err => {
      this.msgShort('获取项目失败')
    })
    UMengAnalytics.onEvent('shops_wechat_click');
  }

  _callPhone(){
    if(this.state.shop.tel) {
      Linking.openURL('tel:' + this.state.shop.tel)
    }else{
      Linking.openURL('tel:' + this.state.servicePhone)
    }
  }
  _callService(){
    Linking.openURL('tel:' + this.state.servicePhone)
  }
  _goBack() {
    if (this.state.source && this.state.source == 'index'){
      Actions.pop({})
    } else {
      Actions.pop({})
    }
  }
  _renderPrice(){
    let flag1 = false;
    let flag2 = false;
    let flag3 = false;
    if(this.state.shop.totalPrice || this.state.shop.averagePrice){
      flag1 = true;
    }
    if(this.state.shop.monthlyRent || this.state.shop.dailyRent){
      flag2 = true;
    }
    if(this.state.shop.transferFeeText){
      flag3 = true;
    }
    if(flag1 && flag2 && flag3){
      return(
        <View style={styles.price}>
          <View style={styles.priceView}>
                <Text style={[fonts.t3_Black,styles.priceTxt]}>售价</Text>
                <Text style={[fonts.t3_Blue,styles.priceTxt]}>{this.state.shop.totalPrice}万元</Text>
                <Text style={[fonts.t3_Blue,styles.priceTxt]}>{this.state.shop.averagePrice}元/㎡</Text>
          </View>
          <View style={[styles.priceView,styles.priceViewCenter]}>
                <Text style={[fonts.t3_Black,styles.priceTxt]}>租金</Text>
                <Text style={[fonts.t3_Blue,styles.priceTxt]}>{this.state.shop.monthlyRent}元/月</Text>
                <Text style={[fonts.t3_Blue,styles.priceTxt]}>{this.state.shop.dailyRent.toFixed(2) }元/天/㎡</Text>
          </View>
          <View style={styles.priceView}>
                <Text style={[fonts.t3_Black,styles.priceTxt]}>转让费</Text>
                <Text style={[fonts.t3_Blue,styles.priceTxt]}>{this.state.shop.transferFeeText}</Text>
          </View>
        </View>
      )
    }else if(flag1 && flag2 && flag3 ==false){
      return(
        <View style={styles.price}>
          <View style={styles.priceView}>
                <Text style={[fonts.t3_Black,styles.priceTxt]}>售价</Text>
                <Text style={[fonts.t3_Blue,styles.priceTxt]}>{this.state.shop.totalPrice}万元</Text>
                <Text style={[fonts.t3_Blue,styles.priceTxt]}>{this.state.shop.averagePrice}元/㎡</Text>
          </View>
          <View style={[styles.priceView,styles.priceViewCenter]}>
                <Text style={[fonts.t3_Black,styles.priceTxt]}>租金</Text>
                <Text style={[fonts.t3_Blue,styles.priceTxt]}>{this.state.shop.monthlyRent}元/月</Text>
                <Text style={[fonts.t3_Blue,styles.priceTxt]}>{this.state.shop.dailyRent.toFixed(2)}元/天/㎡</Text>
          </View>
        </View>
      )
    }else if(flag1 && flag2==false && flag3==false){
      return(
        <View style={styles.price}>
          <View style={[styles.priceView,styles.priceViewRight]}>
              <Text style={[fonts.t3_Black,styles.priceTxt]}>总售价</Text>
              <Text style={[fonts.t3_Blue,styles.priceTxt]}>{this.state.shop.totalPrice}万元</Text>
          </View>
          <View style={styles.priceView}>
                <Text style={[fonts.t3_Black,styles.priceTxt]}>单价</Text>
                <Text style={[fonts.t3_Blue,styles.priceTxt]}>{this.state.shop.averagePrice}元/㎡</Text>
          </View>
        </View>
      )
    }else if(flag1 && flag2==false && flag3){
      return(
        <View style={styles.price}>
          <View style={styles.priceView}>
                <Text style={[fonts.t3_Black,styles.priceTxt]}>售价</Text>
                <Text style={[fonts.t3_Blue,styles.priceTxt]}>{this.state.shop.totalPrice}万元</Text>
                <Text style={[fonts.t3_Blue,styles.priceTxt]}>{this.state.shop.averagePrice}元/㎡</Text>
          </View>
          <View style={styles.priceView}>
                <Text style={[fonts.t3_Black,styles.priceTxt]}>转让费</Text>
                <Text style={[fonts.t3_Blue,styles.priceTxt]}>{this.state.shop.transferFeeText}</Text>
          </View>
        </View>
      )
    }else if(flag1==false && flag2 && flag3){
      return(
        <View style={styles.price}>
          <View style={styles.priceView}>
            <Text style={[fonts.t3_Black,styles.priceTxt]}>租金</Text>
            <Text style={[fonts.t3_Blue,styles.priceTxt]}>{this.state.shop.monthlyRent}元/月</Text>
            <Text style={[fonts.t3_Blue,styles.priceTxt]}>{this.state.shop.dailyRent.toFixed(2)}元/天/㎡</Text>
          </View>
          <View style={styles.priceView}>
                <Text style={[fonts.t3_Black,styles.priceTxt]}>转让费</Text>
                <Text style={[fonts.t3_Blue,styles.priceTxt]}>{this.state.shop.transferFeeText}</Text>
          </View>
        </View>
      )
    }else if(flag1==false && flag2 && flag3 ==false){
        return(
          <View style={styles.price}>
            <View style={[styles.priceView,styles.priceViewRight]}>
                <Text style={[fonts.t3_Black,styles.priceTxt]}>月租金</Text>
                <Text style={[fonts.t3_Blue,styles.priceTxt]}>{this.state.shop.monthlyRent}元/月</Text>
            </View>
            <View style={styles.priceView}>
                  <Text style={[fonts.t3_Black,styles.priceTxt]}>日租金</Text>
                  <Text style={[fonts.t3_Blue,styles.priceTxt]}>{this.state.shop.dailyRent.toFixed(2)}元/天/㎡</Text>
            </View>
          </View>
        )
    }else if(flag1==false && flag2==false && flag3){
      return(
        <View style={styles.price}>
              <View style={styles.priceView1}>
                    <Text style={[fonts.t3_Black,styles.priceTxt]}>转让费：</Text>
                    <Text style={[fonts.t3_Blue,styles.priceTxt]}>{this.state.shop.transferFeeText}</Text>
              </View>
        </View>
      )
    }else{
      return null;
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
                            <Text style={fonts.t2_white} numberOfLines={1}>{this.state.shop.name}</Text>
                      </View>
                </View>
                <View style={styles.swiperMaskMain}>
                      <View style={styles.swiper1}>
                            <Swiper
                                style={styles.wrapper}
                                renderPagination={renderPagination1}
                                loop={true}>
                                {
                                  this.state.shop.imgArray.map((img, i) => {
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
              this.state.shop ?
            <ScrollView style={styles.scrollView} onScroll={(e)=>{
              if(e.nativeEvent.contentOffset.y>0){
                this.showView();
                this.setState({height:true})
              }else{
                this.closeView();
                this.setState({height:false})
              }
            }}>
                  <View style={styles.swiper}>
                        <Swiper renderPagination={renderPagination} loop={true} >
                        {this.state.shop.imgArray && this.state.shop.imgArray.length>0?
                          this.state.shop.imgArray.map((img, i) => {
                            return (
                              <View key={i} style={styles.slide}>
                                    <TouchableHighlight underlayColor="transparent" onPress={() => {this._swiperModule()}}>
                                          <View>
                                                <Image style={styles.slideImg} source={{uri: staticSite + img}} />
                                                <Image style={styles.bannerBg} source={require('../../images/bannerBg.png')}>
                                                      <View style={styles.slideTxt} ellipsizeMode={'clip'}><Text style={fonts.bodyText_white} numberOfLines={1}>{this.state.shop.name}</Text></View>
                                                </Image>
                                          </View>
                                    </TouchableHighlight>
                              </View>
                            )
                          })
                          :
                          <View style={styles.slide}>
                            <TouchableHighlight underlayColor="transparent">
                              <View>
                                    <Image style={styles.slideImg} source={require('../../images/projectDetails.png')}/>
                                    <Image style={styles.bannerBg} source={require('../../images/bannerBg.png')}>
                                          <View style={styles.slideTxt} ellipsizeMode={'clip'}><Text style={fonts.bodyText_white} numberOfLines={1}>{this.state.shop.name}</Text></View>
                                    </Image>
                              </View>
                            </TouchableHighlight>
                          </View>
                        }
                        </Swiper>
                  </View>
                  <View style={styles.main}>
                        <View style={styles.label}>
                        {
                          this.state.shop.shopTags.map((shopTag, i) => {
                            let shopTagStyles = [[styles.flagColor1, styles.txtColor1], [styles.flagColor2, styles.txtColor2], [styles.flagColor3, styles.txtColor3]];
                            let styleIndex = i % 3;
                            return (
                              <View style={[styles.flag, shopTagStyles[styleIndex][0]]} key={i}><Text style={[styles.flagTxt, shopTagStyles[styleIndex][1]]}>{shopTag.name}</Text></View>
                            )
                          })
                        }
                        </View>
                        {
                          this._renderPrice()
                        }
                        <View style={styles.areaAddress}>
                              <View style={styles.areaAddressView}>
                                    <Text style={[fonts.bodyText_Gray]}>面      积：</Text>
                                    <Text style={[fonts.bodyText_Black,styles.areaAddressTxt]}>{this.state.shop.areaMeasure}㎡</Text>
                              </View>
                              {
                                this.state.shop.address ?
                                  <View style={styles.areaAddressView}>
                                  <Text style={[fonts.bodyText_Gray]}>地      址：</Text>
                                  <Text style={[fonts.bodyText_Black,styles.areaAddressTxt]}>{this.state.shop.address}</Text>
                                  </View>
                                : null
                              }
                        </View>
                        <View>
                              <View style={styles.tab}>
                                    <SegmentedControlTab
                                        values={this.state.tabs}
                                        tabStyle={styles.tabStyle}
                                        tabTextStyle={[styles.tabTextStyle,fonts.bodyText_Black]}
                                        activeTabStyle={styles.activeTabStyle}
                                        activeTabTextStyle={[fonts.bodyText_Black,styles.activeTabTextStyle]}
                                        selectedIndex={this.state.selectedStyleIndex}
                                        onTabPress={this._handleIndexChange}
                                    />
                              </View>

                              {
                                this.state.selectedIndex == 0?
                                <View style={styles.details}>
                                  {
                                    this.state.shop.type||this.state.shop.orientation||this.state.shop.floorType||this.state.shop.floor||this.state.shop.floorHeight||this.state.shop.faceWidth
                                    ||this.state.shop.depth?
                                      <View style={styles.property}>
                                            <View style={styles.title}><Text style={fonts.t3_Black}>物业信息</Text></View>
                                            <View style={styles.propertyList}>
                                              {
                                                this.state.shop.type?
                                                <View style={[styles.propertyTxt]}>
                                                      <Text style={[fonts.bodyText_Gray]}>类型：<Text style={fonts.bodyText_Black}>{this.state.shop.type}</Text></Text>

                                                </View>
                                                :null
                                              }
                                              {
                                                this.state.shop.orientation?
                                                <View style={[styles.propertyTxt]}>
                                                      <Text style={[fonts.bodyText_Gray]}>朝向：<Text style={fonts.bodyText_Black}>{this.state.shop.orientation}</Text></Text>

                                                </View>
                                                :null
                                              }
                                              {
                                                this.state.shop.floorType?
                                                <Text style={[fonts.bodyText_Gray,styles.propertyTxt]}>装修：<Text style={fonts.bodyText_Black}>{this.state.shop.floorType}</Text></Text>
                                                :null
                                              }
                                              {
                                                this.state.shop.floor?
                                                <Text style={[fonts.bodyText_Gray,styles.propertyTxt]}>楼层：<Text style={fonts.bodyText_Black}>{this.state.shop.floor}层</Text></Text>
                                                :null
                                              }
                                              {
                                                this.state.shop.floorHeight?
                                                <Text style={[fonts.bodyText_Gray,styles.propertyTxt]}>层高：<Text style={fonts.bodyText_Black}>{this.state.shop.floorHeight}m</Text></Text>
                                                :null
                                              }
                                              {
                                                this.state.shop.faceWidth?
                                                <Text style={[fonts.bodyText_Gray,styles.propertyTxt]}>面宽：<Text style={fonts.bodyText_Black}>{this.state.shop.faceWidth}m</Text></Text>
                                                :null
                                              }
                                              {
                                                this.state.shop.depth?
                                                <Text style={[fonts.bodyText_Gray,styles.propertyTxt]}>进深：<Text style={fonts.bodyText_Black}>{this.state.shop.depth}m</Text></Text>
                                                :null
                                              }
                                            </View>
                                      </View>
                                      :null}
                                      {
                                        this.state.shop.manage||this.state.shop.manageBusinessTypesText||this.state.shop.fitBusinessTypesText?
                                      <View style={styles.manage}>
                                            <View style={styles.title}><Text style={fonts.t3_Black}>经营状态</Text></View>
                                            {
                                              this.state.shop.manage?
                                            <View style={styles.manageList}>
                                                  <Text style={[fonts.bodyText_Gray,styles.manageTxt]}>经营现状：<Text style={fonts.bodyText_Black}>{this.state.shop.manage}</Text></Text>
                                            </View>
                                            :null}
                                            {
                                              this.state.shop.manageBusinessTypesText?
                                            <View style={styles.manageList}>
                                                  <Text style={[fonts.bodyText_Gray,styles.manageTxt]}>经营业态：<Text style={fonts.bodyText_Black}>{this.state.shop.manageBusinessTypesText}</Text></Text>
                                            </View>
                                            :null}
                                            {
                                              this.state.shop.fitBusinessTypesText?
                                            <View style={styles.manageList}>
                                                  <Text style={[fonts.bodyText_Gray,styles.manageTxt]}>适合业态：<Text style={fonts.bodyText_Black}>{this.state.shop.fitBusinessTypesText}</Text></Text>
                                            </View>
                                            :null}
                                      </View>
                                      :null}
                                      <View style={styles.facility}>
                                            <View style={styles.title}><Text style={fonts.t3_Black}>配套设施</Text></View>
                                            <View style={styles.facilityMain}>
                                              {
                                                this.state.shop.shopSupportings.map((shopSupporting,i) => {
                                                  if(shopSupporting.flag){
                                                    return(
                                                      <View style={styles.facilityIcon} key={i}>
                                                            <Image style={styles.facilityImg} source={{uri: staticSite + shopSupporting.highlightIco}}/>
                                                            <Text style={fonts.tinyText_Blue}>{shopSupporting.name}</Text>
                                                      </View>
                                                    )
                                                  }else{
                                                    return(
                                                      <View style={styles.facilityIcon} key={i}>
                                                            <Image style={styles.facilityImg} source={{uri: staticSite + shopSupporting.defaultIco}}/>
                                                            <Text style={fonts.tinyText_Gray}>{shopSupporting.name}</Text>
                                                      </View>
                                                    )
                                                  }
                                                })
                                              }
                                            </View>
                                      </View>
                                      {
                                        this.state.shop.leftNearName||this.state.shop.leftNearBusinessTypesText||this.state.shop.rightNearName||this.state.shop.rightNearBusinessTypesText?
                                      <View style={styles.neighbor}>
                                            <View style={styles.title}><Text style={fonts.t3_Black}>临铺信息</Text></View>
                                            {
                                              this.state.shop.leftNearName||this.state.shop.leftNearBusinessTypesText?
                                            <View style={styles.neighborList}>
                                                  <Image style={styles.neighborImg} source={require('../../images/leftIcon.png')}/>
                                                  <View style={styles.facilityTxt}>
                                                        <Text style={[fonts.bodyText_Gray,styles.marginBottom8]}>商铺名称：<Text style={fonts.bodyText_Black}>{this.state.shop.leftNearName}</Text></Text>
                                                        <Text style={fonts.bodyText_Gray}>所属业态：<Text style={fonts.bodyText_Black}>{this.state.shop.leftNearBusinessTypesText}</Text></Text>
                                                  </View>
                                            </View>
                                            :null}
                                            {
                                              this.state.shop.rightNearName||this.state.shop.rightNearBusinessTypesText?
                                            <View style={[styles.neighborList,styles.borderBottom]}>
                                                  <Image style={styles.neighborImg} source={require('../../images/rightIcon.png')}/>
                                                  <View style={styles.facilityTxt}>
                                                        <Text style={[fonts.bodyText_Gray,styles.marginBottom8]}>商铺名称：<Text style={fonts.bodyText_Black}>{this.state.shop.rightNearName}</Text></Text>
                                                        <Text style={fonts.bodyText_Gray}>所属业态：<Text style={fonts.bodyText_Black}>{this.state.shop.rightNearBusinessTypesText}</Text></Text>
                                                  </View>
                                            </View>
                                            :null}
                                      </View>
                                      :null}
                                </View>
                                :null
                              }
                              {
                                this.state.selectedIndex == 1?
                                <View style={styles.commission}>
                                      <TouchableHighlight underlayColor="transparent" onPress={() => {UMengAnalytics.onEvent('commission_show');Actions.Protocol({protocolName: this.state.tcpName})}}>
                                            <View style={styles.rule}>
                                                  <Text style={fonts.t3_Black}>佣金规则</Text>
                                                  <Text style={[fonts.bodyText_Blue,styles.ruleFlex]}>佣金规则？</Text>
                                            </View>
                                      </TouchableHighlight>
                                      {
                                        this.state.shop.saleGold||this.state.shop.saleSilver||this.state.shop.saleCopper?
                                      <View style={styles.commissionTitle}><Text style={fonts.bodyText_Gray}>出售佣金</Text></View>
                                      :null}
                                      {
                                        this.state.shop.saleGold||this.state.shop.saleSilver||this.state.shop.saleCopper?
                                      <View style={styles.commissionMain}>
                                          {
                                            this.state.shop.saleGold?
                                            <View style={styles.commissionView}>
                                                  <Text style={[fonts.t3_Black,styles.commissionTxt]}>金牌</Text>
                                                  <Text style={[fonts.bodyText_Gray]}>{this.state.shop.saleGold}</Text>
                                            </View>
                                          :null}
                                          {
                                            this.state.shop.saleSilver?
                                            <View style={[styles.commissionView,styles.commissionViewCenter]}>
                                                  <Text style={[fonts.t3_Black,styles.commissionTxt]}>银牌</Text>
                                                  <Text style={[fonts.bodyText_Gray]}>{this.state.shop.saleSilver}</Text>
                                            </View>
                                          :null}
                                          {
                                            this.state.shop.saleCopper?
                                            <View style={styles.commissionView}>
                                                  <Text style={[fonts.t3_Black,styles.commissionTxt]}>铜牌</Text>
                                                  <Text style={[fonts.bodyText_Gray]}>{this.state.shop.saleCopper}</Text>
                                            </View>
                                          :null}
                                      </View>
                                      :null}

                                      {
                                        this.state.shop.rentGold||this.state.shop.rentSilver||this.state.shop.rentCopper?
                                      <View style={styles.commissionTitle}><Text style={fonts.bodyText_Gray}>出租佣金</Text></View>
                                      :null}
                                      {
                                        this.state.shop.rentGold||this.state.shop.rentSilver||this.state.shop.rentCopper?
                                      <View style={styles.commissionMain}>
                                        {
                                          this.state.shop.rentGold?
                                            <View style={styles.commissionView}>
                                                  <Text style={[fonts.t3_Black,styles.commissionTxt]}>金牌</Text>
                                                  <Text style={[fonts.bodyText_Gray]}>{this.state.shop.rentGold}</Text>
                                            </View>
                                        :null}
                                        {
                                          this.state.shop.rentSilver?
                                            <View style={[styles.commissionView,styles.commissionViewCenter]}>
                                                  <Text style={[fonts.t3_Black,styles.commissionTxt]}>银牌</Text>
                                                  <Text style={[fonts.bodyText_Gray]}>{this.state.shop.rentSilver}</Text>
                                            </View>
                                        :null}
                                        {
                                          this.state.shop.rentCopper?
                                            <View style={styles.commissionView}>
                                                  <Text style={[fonts.t3_Black,styles.commissionTxt]}>铜牌</Text>
                                                  <Text style={[fonts.bodyText_Gray]}>{this.state.shop.rentCopper}</Text>
                                            </View>
                                        :null}
                                      </View>
                                      :null}

                                  {
                                    this.state.shop.transferGold||this.state.shop.rentSilver||this.state.shop.rentCopper?
                                      <View style={styles.commissionTitle}><Text style={fonts.bodyText_Gray}>转让佣金</Text></View>
                                    :null}
                                    {
                                      this.state.shop.transferGold||this.state.shop.transferSilver||this.state.shop.transferCopper?
                                      <View style={styles.commissionMain}>
                                        {this.state.shop.transferGold?
                                            <View style={styles.commissionView}>
                                                  <Text style={[fonts.t3_Black,styles.commissionTxt]}>金牌</Text>
                                                  <Text style={[fonts.bodyText_Gray]}>{this.state.shop.transferGold}</Text>
                                            </View>
                                        :null}
                                        {this.state.shop.transferSilver?
                                            <View style={[styles.commissionView,styles.commissionViewCenter]}>
                                                  <Text style={[fonts.t3_Black,styles.commissionTxt]}>银牌</Text>
                                                  <Text style={[fonts.bodyText_Gray]}>{this.state.shop.transferSilver}</Text>
                                            </View>
                                        :null}
                                        {this.state.shop.transferCopper?
                                            <View style={styles.commissionView}>
                                                  <Text style={[fonts.t3_Black,styles.commissionTxt]}>铜牌</Text>
                                                  <Text style={[fonts.bodyText_Gray]}>{this.state.shop.transferCopper}</Text>
                                            </View>
                                        :null}
                                      </View>
                                    :null}
                                </View>
                                :null
                              }
                              <View style={styles.strengths}>

                              {
                                (this.state.site && this.state.selectedIndex == 2)?
                                <View>
                                <Text>商铺编号：<Text>{this.state.shop.shopNumber}</Text></Text>
                                <HTMLView value={this.state.shopDdvantage}  renderNode={(node, index, siblings, parent, defaultRenderer)=>{this.renderNode(node, index, siblings, parent, defaultRenderer)}}/>
                                </View>
                                // <WebView
                                //                                             source={{uri: this.state.site + '/shop/superiority/' + this.state.id}}
                                //                                             automaticallyAdjustContentInsets={true}
                                //                                             startInLoadingState={true}
                                //                                             domStorageEnabled={true}
                                //                                            javaScriptEnabled={true}
                                //                                            scalesPageToFit={true}
                                //                                            scrollEnable={false}
                                //                                            style={styles.webView}
                                //                                          />
                                :null
                              }
                              </View>
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
                        <Text style={[fonts.t2_Black,styles.navName]} numberOfLines={1}>{this.state.shop.name}</Text>
                  </View>
            </Animated.View>
            :
                  <TouchableHighlight style={styles.navLeft} underlayColor="transparent" onPress={() => this._goBack()}>
                      <Image source={require('../../images/backWhite.png')}/>
                  </TouchableHighlight>
            }
            <View style={styles.bottomTouch}>
                  {
                    this.state.follow == 1?
                    <TouchableHighlight onPress={() => this._followShopDel()} underlayColor="transparent">
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
                  {
                    // <TouchableHighlight underlayColor="transparent" onPress={() => {UMengAnalytics.onEvent('shops_customer_service_click');this._callService()}}>
                    //     <View style={styles.attention}>
                    //           <Image source={require('../../images/contant.png')}/>
                    //           <Text style={[styles.mt10,fonts.tinyText_Gray]}>联系客服</Text>
                    //     </View>
                    // </TouchableHighlight>
                  }
                  <TouchableHighlight underlayColor="transparent" style={styles.reportBtn} underlayColor="#3a8ff3" onPress={() => {UMengAnalytics.onEvent('shops_Look_about_click');this._callPhone()}}>
                        <Image style={styles.reportImg} source={require('../../images/btnBg.png')}>
                              <Image style={styles.reportImgIcon} source={require('../../images/call_y.png')}/>
                              <Text style={fonts.t3_white}>约看</Text>
                        </Image>
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
