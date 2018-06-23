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
} from 'react-native';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/tourists/SignedDetails';
import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import BasicComponent from '../basic/BasicComponent';
import {Title} from '../../commonComponents/CommentTitle/Title';

var moment = require('moment');

export default class SignedDetails extends BasicComponent {
  constructor(props){
    super(props);
    this.state={
      modalObject: {},
      loadingObject: {},
      id: this.props.id,
      loaded: false,
      signProjectName: null,
      customerName: null,
      customerTel: null,
      gender: null,
      customerType: null,
      brandName: null,
      signType: null,
      signTime: null,
      signPrice: 0.00,
      signArea: null,
      commission: 0.00,
      applyEnabled: null,
      signShopNo: null
    }
  }

  componentWillMount() {
    this._initData()
  }

  _initData(){
    storage.load({
      key: keys.signDetail,
      syncInBackground: false,
      syncParams: {
         url: apis.signDetail + '?id=' + this.state.id
      }
    }).then(res => {
      return res.json()
    }).then(content => {
      this.setState({
        loaded: true,
        signProjectName: content.signProjectName,
        customerName: content.customerName,
        customerTel: content.customerTel,
        gender: content.gender,
        customerType: content.customerType,
        brandName: content.brandName,
        signType: content.signType,
        signTime: content.signTime,
        signPrice: content.signPrice.toFixed(2),
        signArea: content.signArea,
        commission: content.commission?content.commission.toFixed(2):'0.00',
        applyEnabled: content.applyEnabled,
        signShopNo: content.signShopNo
      })
    })
  }

  _applyCheck(){
    storage.load({
      key: keys.applyCheck,
      syncInBackground: false,
      syncParams: {
         url: apis.applyCheck + '/' + this.state.id
      }
    }).then(res => {
      if(res.status == 200){
        this.msgShort('申请成功')
        this.setState({
          applyEnabled: false
        })
      } else {
        this.msgShort('申请失败')
      }
    })
  }

  render() {
    return (
        <View style={[styles.mainView]}>
          <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
          <Title isLeftShow={true} backColor={true} isRightBtnShow={false} title={'签约详情'}/>
          {this.state.loaded ?
          <ScrollView style={{marginBottom:60}}>
            <View style={[styles.view]}>
              <View style={[styles.titleView]}>
                <Text style={[styles.titleViewText,fonts.t3_Black]}>项目信息</Text>
              </View>
              <View style={[styles.bodyView]}>
                <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>项目名称：{this.state.signProjectName}</Text>
                <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>项目编号：{this.state.signShopNo}</Text>
              </View>
            </View>
            <View style={[styles.view]}>
              <View style={[styles.titleView]}>
                <Text style={[styles.titleViewText,fonts.t3_Black]}>客户信息</Text>
              </View>
              <View style={[styles.bodyView]}>
                <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>客户姓名：{this.state.customerName}</Text>
                <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>联系方式：{this.state.customerTel}</Text>
                <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>客户性别：{this.state.gender}</Text>
                <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>客户类型：{this.state.customerType ? this.state.customerType : '暂无'}</Text>
                <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>品牌名称：{this.state.brandName ? this.state.brandName : '暂无'}</Text>
              </View>
            </View>
            <View style={[styles.view]}>
              <View style={[styles.titleView]}>
                <Text style={[styles.titleViewText,fonts.t3_Black]}>签约信息</Text>
              </View>
              <View style={[styles.bodyView]}>
                <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>签约类型：{this.state.signType}</Text>
                <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>签约时间：{this.state.signTime ? moment(this.state.signTime).format('YYYY-MM-DD') : '暂无'}</Text>
                <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>签约价格：{this.state.signPrice}元</Text>
                <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>签约面积：{this.state.signArea}㎡</Text>
                <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>实发佣金：{this.state.commission ? (this.state.commission + '元') : '0.00'}</Text>
              </View>
            </View>
          </ScrollView>
          : null}
          {this.state.applyEnabled ?
            <TouchableHighlight style={[styles.listBtn]} onPress={() => this._applyCheck()} underlayColor="#3a8ff3">
              <Text style={[fonts.btnText_white]}>申请结佣</Text>
            </TouchableHighlight>
          : null}
          {
            this.renderModal()
          }
          {
            this.renderLoading()
          }
        </View>
    );
  }
}
AppRegistry.registerComponent('SignedDetails', () => SignedDetails);
