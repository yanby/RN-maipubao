import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableHighlight,
  Image,
  Dimensions,
  Modal,
  ScrollView,
  Linking
} from 'react-native';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/community/BrandDetails';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { apis,sites,staticSite } from '../../systemComponents/Remote/ApiStorage';
import ListBasicComponent from '../basic/ListBasicComponent';
import { NiceList } from '../../commonComponents/niceList/NiceList';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class BrandDetails extends Component {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      detailsInfo:{},
    };
  }
  componentWillMount(){
    //显示新闻详情
    storage.load({
      key: keys.brandsK,
      syncInBackground: false,
      syncParams: {
	       url: apis.brandsK+ '/' +this.props.detailsId
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json();
      }else{
        this.msgShort(ret.msg);
      };
    }).then(retJson=>{
      let detailsInfo = this.state.detailsInfo;
      this.setState({detailsInfo:retJson})
    }).catch(err => {
      this.msg("显示异常");
      this.closeLoading();
    })
  }
  _callPhone(){
    return Linking.openURL('tel:4008988808')
  }
  render() {
    return (
      <View style={[styles.mainView]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <Title isLeftShow={true} backColor={true}  title={'品牌详情'} ></Title>
        <ScrollView>
          <View style={[styles.imgView]}>
            <Image style={[styles.img]} source={{uri: staticSite + this.state.detailsInfo.coverUrl}}></Image>
          </View>
          <View style={[styles.textView]}>
            <Text style={[styles.lineHeight24,fonts.bodyText_Blue]}>{this.state.detailsInfo.brandName}</Text>
            <Text style={[styles.lineHeight24,fonts.bodyText_Black]}>公司名称：{this.state.detailsInfo.companyName}</Text>
            <Text style={[styles.lineHeight24,fonts.bodyText_Black]}>所属业态：{this.state.detailsInfo.brandTypesText}</Text>
            <Text style={[styles.lineHeight24,fonts.bodyText_Black]}>需求面积：{this.state.detailsInfo.area}</Text>
            <Text style={[styles.lineHeight24,fonts.bodyText_Black]}>品牌定位：{this.state.detailsInfo.brandLocation}</Text>
            <Text style={[styles.lineHeight24,fonts.bodyText_Black]}>物业方式：{this.state.detailsInfo.propertyWay}</Text>
            <Text style={[styles.lineHeight24,fonts.bodyText_Black]}>品牌类型：{this.state.detailsInfo.brandType}</Text>
            <Text style={[styles.lineHeight24,fonts.bodyText_Black]}>首选物业：{this.state.detailsInfo.buildingType}</Text>
            <Text style={[styles.lineHeight24,fonts.bodyText_Black]}>公司地址：{this.state.detailsInfo.address}</Text>
          </View>
          <View style={[styles.textView]}>
            <Text style={[styles.lineHeight24,fonts.bodyText_Blue]}>品牌简介</Text>
            <Text style={[styles.lineHeight24,fonts.bodyText_Black]}>{this.state.detailsInfo.synopsis}</Text>
            <View style={[styles.row]}>
              <Text style={[styles.flex,styles.lineHeight24,fonts.bodyText_Black]}>楼层：{this.state.detailsInfo.floor}</Text>
              <Text style={[styles.flex,styles.lineHeight24,fonts.bodyText_Black]}>燃气：{this.state.detailsInfo.gas? '有' : '无'}</Text>
            </View>
            <View style={[styles.row]}>
              <Text style={[styles.flex,styles.lineHeight24,fonts.bodyText_Black]}>层高：{this.state.detailsInfo.floorHeight}</Text>
              <Text style={[styles.flex,styles.lineHeight24,fonts.bodyText_Black]}>上下水：{this.state.detailsInfo.blaze ? '有' : '无'}</Text>
            </View>
            <View style={[styles.row]}>
              <Text style={[styles.flex,styles.lineHeight24,fonts.bodyText_Black]}>面宽：{this.state.detailsInfo.faceWidth}</Text>
              <Text style={[styles.flex,styles.lineHeight24,fonts.bodyText_Black]}>明火：{this.state.detailsInfo.openFire ? '有' : '无'}</Text>
            </View>
            <View style={[styles.row]}>
              <Text style={[styles.flex,styles.lineHeight24,fonts.bodyText_Black]}>供电：{this.state.detailsInfo.powerSupply}</Text>
              <Text style={[styles.flex,styles.lineHeight24,fonts.bodyText_Black]}>特殊要求：{this.state.detailsInfo.description ? this.state.detailsInfo.description : '无'}</Text>
            </View>
          </View>
        </ScrollView>
        <TouchableHighlight style={[styles.applyBtn]} underlayColor="#3a8ff3" onPress={() => this._callPhone()}>
          <Text style={[styles.applyBtnText,fonts.btnText_white]}>服务咨询</Text>
        </TouchableHighlight>

      </View>
    );
  }
}
AppRegistry.registerComponent('brandDetails', () => brandDetails);
