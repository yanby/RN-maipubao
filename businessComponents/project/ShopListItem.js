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
import {comlist} from '../../styles/commonStyle/ProjectList';
import {staticSite} from '../../systemComponents/Remote/ApiStorage';
import BasicComponent from '../basic/BasicComponent';
import { UMengAnalytics } from '../../commonComponents/umeng/UMAnalytics';

export default class ShopListItem extends BasicComponent {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      source: this.props.source,
      id: this.props.item.id,
      name: this.props.item.nameCut ? this.props.item.nameCut : '暂无',
      followNum: this.props.item.followNumTotal ? this.props.item.followNumTotal : '0',
      area: (this.props.item.city ? this.props.item.city : '暂无') + '-' + (this.props.item.area ? this.props.item.area : '暂无'),
      areaMeasure: this.props.item.areaMeasure ? this.props.item.areaMeasure : '暂无',
      totalPrice: this.props.item.totalPrice ? this.props.item.totalPrice : '',
      type: this.props.item.type ? this.props.item.type : '暂无',
      monthlyRent: this.props.item.monthlyRent ? this.props.item.monthlyRent : '',
      shopTags: this.props.item.shopTags ? this.props.item.shopTags : [],
      shopImg: this.props.item.shopImg ? this.props.item.shopImg : null
    };

  }

  componentWillMount() {
    UMengAnalytics.onEvent('shops_list_show');
  }

  _renderShopTags(item,i){
    let textStyle=[comlist.bottomText,comlist.bottomTitle,comlist.bottomTxt];
    let viewStyle=[comlist.bottomTextView,comlist.bottomTitleView,comlist.bottomTxtView];
    let styleIndex = 0;
    if (i>=0&&i<=2) {
      styleIndex=i;
    }
    return <View style={viewStyle[styleIndex]} key={i}><Text style={[textStyle[styleIndex]]}>{item}</Text></View>
  }

  render(){
    return(
            <View style={comlist.container}>
                  <TouchableHighlight underlayColor="transparent" onPress={() =>{Actions.ShopDetails({id: this.state.id, source: this.state.source})}}>
                      <View style={comlist.projectView}>
                        <View style={comlist.projectImgView}>
                          {
                            this.state.shopImg ? (<Image style={comlist.projectImg} source={{uri: staticSite + this.state.shopImg}}/>) : (<Image source={require('../../images/projectList.png')}/>)
                          }
                          <View style={comlist.imgTxt}><Text style={fonts.hintText_white}>{this.state.type}</Text></View>
                        </View>

                        <View style={comlist.rightView}>
                              <View style={comlist.rightTop}>
                                     <Text style={[fonts.t3_Black,comlist.rightText]}>{this.state.name}</Text>
                              </View>
                              <View style={comlist.rightMiddle}>
                                     <Text style={[fonts.hintText_Gray,comlist.middelText]}>{this.state.area}</Text>
                                     <Text style={[fonts.hintText_Gray,comlist.rightTitle]}>关注：<Text style={comlist.rightRed}>{this.state.followNum}</Text></Text>
                              </View>
                              <Text style={[fonts.hintText_Gray,comlist.thirdText]}>面积：{this.state.areaMeasure}㎡</Text>
                              {
                                this.state.totalPrice?
                              <Text style={[fonts.hintText_Gray,comlist.thirdText]}>售价：<Text style={comlist.rightRed}>{this.state.totalPrice}</Text>万元</Text>
                              :null}
                              {
                                this.state.monthlyRent?
                              <Text style={[fonts.hintText_Gray,comlist.thirdText]}>租金：<Text style={comlist.rightRed}>{this.state.monthlyRent}</Text>元/月</Text>
                              :null}
                              <View style={comlist.rightBottom}>
                                {
                                  this.state.shopTags.map((item,i)=>this._renderShopTags(item,i))
                                }
                              </View>
                        </View>
                      </View>
                  </TouchableHighlight>
            </View>
      )
    }
  }
