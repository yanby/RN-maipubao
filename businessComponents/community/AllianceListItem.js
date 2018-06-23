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
export default class AllianceListItem extends Component {
  constructor(props){
    super(props);
    console.log(this.props.item);
    this.state={

      coverUrl: this.props.item.coverUrl ? this.props.item.coverUrl : '暂无',
      brandName: this.props.item.brandName ? this.props.item.brandName : '暂无',
      area: this.props.item.area ? this.props.item.area : '暂无',
      brandType: this.props.item.brandType ? this.props.item.brandType : '暂无',
      projectBusinessTypes: this.props.item.projectBusinessTypes ? this.props.item.projectBusinessTypes : '暂无',
    };
  }
  render(){
    return(
          <View style={styles.mianView}>
                <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.BrandDetails({})}>
                      <View style={styles.offlineView}>
                            <Image style={styles.offlineViewImg} source={{uri: this.state.coverUrl}}></Image>
                            <View style={styles.offlineRight}>
                                  <Text style={[styles.bottomText,fonts.bodyText_Black]}>{this.state.brandName}</Text>
                                  <Text style={[styles.bottomTxt,fonts.tinyText_Gray]}>需求面积{this.state.area}平米</Text>
                                  <Text style={[styles.bottomTxt,fonts.tinyText_Gray]}>{this.state.brandType}</Text>
                                  <View style={styles.rightBottom}>
                                        <Text style={[styles.bottomTitle,fonts.tinyText_Gray]}>{this.state.projectBusinessTypes}</Text>
                                  </View>
                            </View>
                            <Image style={styles.proImgRest} source={require('../../images/youpu.png')}></Image>
                      </View>
                </TouchableHighlight>

          </View>
      )
    }
  }
