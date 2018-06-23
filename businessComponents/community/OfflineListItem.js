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
import {staticSite} from '../../systemComponents/Remote/ApiStorage';
import {comlist} from '../../styles/commonStyle/ProjectList';


export default class OfflineListItem extends Component {
  constructor(props){
    super(props);
    this.state={
      detailsId: this.props.item.id,
      title: this.props.item.showTitle ? this.props.item.showTitle : this.props.item.title,
      source: this.props.item.source ? this.props.item.source : '暂无',
      createTime: this.props.item.createTime ? this.props.item.createTime : '暂无',
      clickNumber: this.props.item.clickNumber+this.props.item.dummyClickNumber,
      coverUrl:this.props.item.coverUrl?(staticSite+this.props.item.coverUrl):null,
      totalList:2,
    };
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
                <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.Details({detailsId:this.state.detailsId,totalList:this.state.totalList})}>
                      <View style={styles.offlineView}>
                            {
                              this.state.coverUrl ? (<Image style={comlist.projectImg} source={{uri: this.state.coverUrl}}/>) : (<Image source={require('../../images/projectList.png')}/>)

                            }
                            <View style={styles.offlineRight}>
                                  <Text style={[styles.bottomText,fonts.bodyText_Black]} includeFontPadding={false}>{this.state.title}</Text>
                                  <View style={styles.rightBottom}>
                                        <Text style={[fonts.tinyText_Gray]}>{this.state.source}  阅读{this.state.clickNumber}  </Text>
                                        <Text style={fonts.tinyText_Gray}>{moment(this.state.createTime).format('YYYY-MM-DD')}</Text>
                                  </View>
                            </View>
                            {this._iconImg()}
                      </View>
                </TouchableHighlight>
          </View>
      )
    }
  }
