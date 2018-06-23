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
import {styles} from '../../styles/personalCenter/Memberlist';
import { apis,sites,staticSite } from '../../systemComponents/Remote/ApiStorage';
export default class MemberListItem extends Component {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      comeFlag: this.props.comeFlag,
      userId: this.props.item.id,
      index:this.props.index,
      userName: this.props.item.userName ? this.props.item.userName : '暂无',
      logoPath: this.props.item.logoPath ? this.props.item.logoPath: '',
      reportNum: this.props.item.reportNum ? this.props.item.reportNum : 0,
      visitNum: this.props.item.visitNum ? this.props.item.visitNum : 0,
      signNum: this.props.item.signNum ? this.props.item.signNum : 0,
      createTime: this.props.item.createTimeText ? this.props.item.createTimeText : '暂无',
      audit: this.props.item.audit ? this.props.item.audit : false,
    };
  }

  _renderPicTop(){
    if (this.state.index==0) {
      return <Image  source={require('../../images/member1.png')}/>
    } else if(this.state.index==1){
      return <Image  source={require('../../images/member2.png')}/>
    } else if (this.state.index==2){
      return <Image  source={require('../../images/member3.png')}/>
    } else {
      return <Text style={[styles.memberTitle,fonts.t2_Black]}>{this.state.index + 1 }</Text>
    }
  }
  _renderLogPath(){
    if(this.state.logoPath == ''){
      if(this.state.audit){
        return (
          <Image style={styles.memberImg} source={require('../../images/noPhoto.png')}>
                 <View style={styles.redSpecail}></View>
          </Image>
        )
      }else{
        return <Image style={styles.memberImg} source={require('../../images/noPhoto.png')} />
      }
    }else{
      if(this.state.audit){
        return (
          <Image style={{width:50,height:50}} source={{uri: staticSite + this.state.logoPath}}>
                 <View style={styles.redSpecail}></View>
          </Image>
        )
      }else{
        return <Image style={{width:50,height:50}} source={{uri: staticSite + this.state.logoPath}} />
      }
    }
  }
  render(){
    return(
            <View style={styles.memberView}>
                  <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.TeamMemberDetails({audit:this.state.audit,comeFlag:this.state.comeFlag,userId:this.state.userId})}>
                  <View>
                        <View style={styles.memberTop}>

                              <View style={styles.memberLeft}>
                                    {
                                      this._renderPicTop()
                                    }
                              </View>
                              {
                                this._renderLogPath()
                              }
                              <View style={styles.memberRight}>
                                    <Text style={[styles.memberTitle,fonts.t3_Black]}>{this.state.userName}</Text>
                                    <View style={styles.rightBottom}>
                                          <Text style={[styles.memberText,fonts.bodyText_Gray1]}>报备：{this.state.reportNum}组</Text>
                                          <Text style={[styles.memberText,fonts.bodyText_Gray1]}>到访：{this.state.visitNum}组</Text>
                                          <Text style={[styles.memberText,fonts.bodyText_Gray1]}>签约：{this.state.signNum}单</Text>
                                    </View>
                              </View>
                        </View>
                        <Text style={[styles.signText,fonts.bodyText_Gray]}>{this.state.createTime}</Text>
                  </View>
                  </TouchableHighlight>
            </View>
      )
    }
  }
