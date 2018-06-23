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
import {staticSite} from '../../systemComponents/Remote/ApiStorage';
import {styles} from '../../styles/community/CommunityIndex';
export default class CommunityIndexItem extends Component {
  constructor(props){
    super(props);
    this.state={
      detailsId: this.props.item.id,
      title: this.props.item.showTitle ? this.props.item.showTitle : this.props.item.title,
      coverUrl: this.props.item.coverUrl ? this.props.item.coverUrl : '暂无',
      clickNumber: this.props.item.clickNumber+this.props.item.dummyClickNumber,
      source: this.props.item.source ? this.props.item.source : '暂无',
      createTime: this.props.item.createTime ? this.props.item.createTime : '暂无',
      totalList:5,
    };
  }
  render(){
    return(
            <View>
                {
                  this.props.item.coverUrl == ''?
                  <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.Details({detailsId:this.state.detailsId,totalList:this.state.totalList})}>
                        <View style={styles.ViewList2}>
                              <View style={styles.ViewList2Text}>
                                    <Text style={[fonts.bodyText_Black]}>{this.state.title}</Text>
                                    <View style={[styles.authorTime2]}>
                                          <Text style={[fonts.hintText_Gray2]}>{this.state.source}</Text>
                                          <Text style={[styles.authorTime2Text,fonts.hintText_Gray2]}>阅读{this.state.clickNumber}</Text>
                                          <Text style={[fonts.hintText_Gray2]}>{moment(this.state.createTime).format('YYYY-MM-DD')}</Text>
                                    </View>
                              </View>
                        </View>
                  </TouchableHighlight>
                  :
                  <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.Details({detailsId:this.state.detailsId,totalList:this.state.totalList})}>
                        <View style={styles.ViewList1}>
                              <Image style={styles.ViewList1Img} source={{uri: staticSite + this.state.coverUrl}}></Image>
                              <View style={styles.ViewList1Text}>
                                    <Text style={[fonts.bodyText_Black]}>{this.state.title}</Text>
                                    <View style={[styles.authorTime]}>
                                          <Text style={[fonts.hintText_Gray2]}>{this.state.source}</Text>
                                          <Text style={[styles.authorTimeText,fonts.hintText_Gray2]}>阅读{this.state.clickNumber}</Text>
                                          <Text style={[fonts.hintText_Gray2]}>{moment(this.state.createTime).format('YYYY-MM-DD')}</Text>
                                    </View>
                              </View>
                        </View>
                  </TouchableHighlight>
                  }
            </View>
      )
    }
  }
