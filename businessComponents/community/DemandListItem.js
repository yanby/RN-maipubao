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
import {styles} from '../../styles/community/DemandList';
export default class DemandListItem extends Component {
  constructor(props){
    super(props);
    this.state={
      totalList:3,
      demandFlag:1,
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
                  <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.Details({detailsId:this.props.item.id,totalList:this.state.totalList,demandFlag:this.state.demandFlag})}>
                        <View style={styles.list}>
                              <Text style={[fonts.bodyText_Black,styles.listTitle]}>{this.props.item.title}</Text>
                              <View style={[styles.authorTime]}>
                                    <Text style={fonts.hintText_Gray2}>{this.props.item.label?this.props.item.label:"暂无"}</Text>
                                    <Text style={[styles.flex,fonts.hintText_Gray2]}>阅读{this.props.item.clickNumber+this.props.item.dummyClickNumber}</Text>
                                    <Text style={fonts.hintText_Gray2}>{moment(this.props.item.createTime).format('YYYY-MM-DD')}</Text>
                              </View>
                              {this._iconImg()}
                        </View>
                  </TouchableHighlight>
            </View>
      )
    }
  }
