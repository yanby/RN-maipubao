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
import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
export default class CommunityIndexItem extends Component {
  constructor(props){
    super(props);
    this.state={
      detailsId: this.props.item.article.id,
      title: this.props.item.title,
      coverUrl: this.props.item.coverUrl ? this.props.item.coverUrl : '',
      clickNumber: 0,
      source: '',
      createTime: this.props.item.createTime ? this.props.item.createTime : '暂无',
      totalList:5,
    };
  }
  componentWillMount(){
    //显示新闻详情
    this._loadDetail();
  }
  //显示新闻详情
  _loadDetail(){
    storage.load({
      key: keys.newsDetails,
      syncInBackground: false,
      syncParams: {
        url: apis.newsDetails+ '/' +this.state.detailsId
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json();
      };
    }).then(retJson=>{
      let source = this.state.source;
      let clickNumber = this.state.clickNumber;
      let clickNum = retJson.clickNumber?retJson.clickNumber:0;
      let dummyClickNumber = retJson.dummyClickNumber?retJson.dummyClickNumber:0;
      let clickTotal = clickNum+dummyClickNumber;
      if(retJson.source){
        this.setState({source:retJson.source});
      }
      this.setState({clickNumber:clickTotal});
    }).catch(err => {

    })
  }
  render(){
    return(
            <View>
                {
                  this.state.coverUrl == ''?
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
