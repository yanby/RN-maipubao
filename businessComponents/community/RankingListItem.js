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
import {styles} from '../../styles/community/Rankinglist';
import {staticSite} from '../../systemComponents/Remote/ApiStorage';

export default class RankingListItem extends Component {
  constructor(props){
    super(props);
    this.state={
      index:this.props.index,
      username: this.props.item.username ? this.props.item.username : '暂无',
      companyName: this.props.item.companyName ? this.props.item.companyName : '暂无',
      positionName: this.props.item.positionName ? this.props.item.positionName : '暂无',
      description: this.props.item.description ? this.props.item.description : '暂无',
      rankTopImg: this.props.item.rankTopImg ? this.props.item.rankTopImg : '暂无',
      picUrl:this.props.item.picUrl?(staticSite+this.props.item.picUrl):null
    };
  }
  renderPicTop(){
    if (this.state.index==0) {
      return <Image style={styles.porImg} source={require('../../images/firstFlag.png')}/>
    } else if(this.state.index==1){
      return <Image style={styles.porImg} source={require('../../images/thirdFlag.png')}/>
    } else if (this.state.index==2){
      return <Image style={styles.porImg} source={require('../../images/secondFlag.png')}/>
    } else {
      return null
    }
  }
  renderPicLeft(){
    if (this.state.index==0) {
      return <Image source={require('../../images/firstGold.png')}/>
    } else if(this.state.index==1){
      return <Image source={require('../../images/thirdGold.png')}/>
    } else if (this.state.index==2){
      return <Image source={require('../../images/secondGold.png')}/>
    } else {
      return <Text style={[styles.porText,fonts.t3_Black]}>{this.state.index}</Text>
    }
  }
  render(){
    return(
      <View>
            <View style={styles.rankList}>
                  <View style={styles.rankTop}>
                        <Image style={styles.rankTopImg} source={{uri:this.state.picUrl}}/>
                        {this.renderPicTop()}
                  </View>
                  <View style={styles.rankMiddle}>
                        <Text style={[styles.rankText,fonts.t3_Black]}>{this.state.username}</Text>
                        <Text style={[styles.rankrTxt,fonts.bodyText_Gray1]}>{this.state.companyName}：{this.state.positionName}</Text>
                        <Text style={[styles.rankTxt,fonts.bodyText_Gray1]} includeFontPadding={false}>{this.state.description}</Text>
                  </View>
                  <View style={styles.rankBottm}>
                        {this.renderPicLeft()}
                  </View>
            </View>
      </View>
      )
    }
  }
