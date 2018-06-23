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

export default class BrListItem extends Component {
  constructor(props){
    super(props);
    this.state={
      detailsId: this.props.item.id,
      coverUrl: this.props.item.coverUrl?(staticSite+this.props.item.coverUrl):null,
      brandName: this.props.item.brandName ? this.props.item.brandName : '暂无',
      area: this.props.item.area ? this.props.item.area : '暂无',
      brandType: this.props.item.brandType ? this.props.item.brandType : '暂无',
      projectBusinessTypes: this.props.item.brandTypesText ? this.props.item.brandTypesText : '暂无',
      label: this.props.item.label
    };
  }

  _onPress(){
    Actions.BrandDetails({detailsId: this.state.detailsId})
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
              <Text style={[styles.bottomText,fonts.bodyText_Black]}>{this.state.brandName}</Text>
              <Text style={[styles.bottomTxt,fonts.tinyText_Gray]}>需求面积: {this.state.area}</Text>
              <Text style={[styles.bottomTxt,fonts.tinyText_Gray]}>品牌类型: {this.state.brandType}</Text>
              <View style={styles.rightBottom}>
                <Text style={[styles.bottomTitle,fonts.tinyText_Gray]}>业态:{this.state.projectBusinessTypes}</Text>
              </View>
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
