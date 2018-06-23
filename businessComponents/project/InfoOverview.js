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
  ScrollView
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/project/ProjectDetails0';
import {Title} from '../../commonComponents/CommentTitle/Title';
var moment = require('moment');

export default class Introduction extends Component {
  constructor(props){
    super(props);
    this.state={
      project: props.project
    };
  }

  render() {
    return (
      <View style={styles.container}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
            <Title isLeftShow={true} backColor={true} title={'信息概况'} >
            </Title>
            <ScrollView style={styles.main}>
                  <View style={styles.viewList}><Text style={fonts.bodyText_Black}>开 发 商：<Text style={fonts.bodyText_Gray}>{this.state.project.developer}</Text></Text></View>
                  <View style={styles.viewList}><Text style={fonts.bodyText_Black}>开业时间：<Text style={fonts.bodyText_Gray}>{this.state.project.openingTime ? (moment(this.state.project.openingTime).format('YYYY年MM月')) : '暂无'}</Text></Text></View>
                  <View style={styles.viewList}><Text style={fonts.bodyText_Black}>商铺面积：<Text style={fonts.bodyText_Gray}>{this.state.project.shopAreaMeasureLow}-{this.state.project.shopAreaMeasureHigh}㎡</Text></Text></View>
                  <View style={styles.viewList}><Text style={fonts.bodyText_Black}>地上停车位：<Text style={fonts.bodyText_Gray}>{this.state.project.groundParkingLots ? (this.state.project.groundParkingLots + '个') : '暂无'}</Text></Text></View>
                  <View style={styles.viewList}><Text style={fonts.bodyText_Black}>地下停车位：<Text style={fonts.bodyText_Gray}>{this.state.project.underGroundParkingLots ? (this.state.project.underGroundParkingLots + '个') : '暂无'}</Text></Text></View>
                  <View style={styles.viewList}><Text style={fonts.bodyText_Black}>周边人口：<Text style={fonts.bodyText_Gray}>{this.state.project.einwohnerThree ? this.state.project.einwohnerThree : '暂无'}／3公里／{this.state.project.einwohnerFive ? this.state.project.einwohnerFive : '暂无'}／5公里</Text></Text></View>
                  <View style={styles.viewList}><Text style={fonts.bodyText_Black}>项目编号：<Text style={fonts.bodyText_Gray}>{this.state.project.projectNumber ? this.state.project.projectNumber : '暂无'}</Text></Text></View>
                  <View style={styles.viewList}><Text style={fonts.bodyText_Black}>项目优势：<Text style={[fonts.bodyText_Gray,styles.lineHeight22]}>{this.state.project.superiority}</Text></Text></View>
                  <View style={[styles.viewList,styles.marginTop10]}><Text style={fonts.bodyText_Black}>商铺总数：<Text style={fonts.bodyText_Gray}>{this.state.project.businessShopAmount ? this.state.project.businessShopAmount : '暂无'}</Text></Text></View>
            </ScrollView>

      </View>
    );
  }
}
AppRegistry.registerComponent('Introduction', () => Introduction);
