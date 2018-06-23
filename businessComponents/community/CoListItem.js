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

export default class CoListItem extends Component {
  constructor(props){
    super(props);
    this.state={
      detailsId: this.props.item.id,
      coverUrl: this.props.item.coverUrl ? (staticSite + this.props.item.coverUrl) : null,
      name: this.props.item.name ? this.props.item.name : '暂无',
      synopsis: this.props.item.synopsis ? this.props.item.synopsis : '暂无',
      scale: this.props.item.scale ? this.props.item.scale : '暂无',
      label: this.props.item.label
    };
  }

  _onPress(){
    Actions.CompanyDetails({detailsId: this.state.detailsId})
  }

  _iconImg(){
    if(this.state.label == '精选'){
      return <Image style={styles.proImgRest} source={require('../../images/jx.png')}/>
    } else if (this.state.label == '优质'){
      return <Image style={styles.proImgRest} source={require('../../images/yz.png')}/>
    }else if(this.state.label == '优铺官方'){
      return <Image style={styles.proImgRest} source={require('../../images/gf.png')}/>
    } else{
      return null
    }
  }

  render(){
  return(
    <View style={styles.mianView}>
      <TouchableHighlight underlayColor="transparent" onPress={()=>this._onPress()}>
        <View style={styles.offlineView}>
          {
          this.state.coverUrl ? (<Image style={styles.offlineViewImg} source={{uri: this.state.coverUrl}}/>) : (<Image source={require('../../images/projectList.png')}/>)

          }
          <View style={styles.offlineRight}>
            <Text style={[styles.bottomText,fonts.bodyText_Black]}>{this.state.name}</Text>
            {/* <Text style={[styles.bottomTxt,fonts.tinyText_Gray]}>公司简介: {this.state.synopsis}</Text> */}
            <Text style={[styles.bottomTxt,fonts.tinyText_Gray]}>公司规模: {this.state.scale}</Text>
          </View>
          {
          this._iconImg()
          }
        </View>
      </TouchableHighlight>
    </View>
    )
  }
}
