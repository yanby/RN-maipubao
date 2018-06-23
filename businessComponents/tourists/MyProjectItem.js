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
import {styles} from '../../styles/tourists/SignManagement';
import {staticSite} from '../../systemComponents/Remote/ApiStorage';

export default class MyProjectItem extends Component {
  constructor(props){
    super(props);
    this.state={
      id: this.props.item.id,
      name: this.props.item.name ? this.props.item.name : '暂无',
      followNum: this.props.item.followNum ? this.props.item.followNum : '暂无',
      area: (this.props.item.city ? this.props.item.city : '暂无') + '-' + (this.props.item.area ? this.props.item.area : '暂无'),
      businessAreaMeasure: this.props.item.businessAreaMeasure ? this.props.item.businessAreaMeasure : '暂无',
      salePrice: this.props.item.salePrice ? this.props.item.salePrice : '暂无',
      leasePrice: this.props.item.leasePrice ? this.props.item.leasePrice : '暂无',
      projectTags: this.props.item.projectTags ? this.props.item.projectTags : [],
      projectImg: this.props.item.projectImg ? this.props.item.projectImg : null,
      reportTodo: this.props.item.reportTodo
    };
  }

  render(){
    return(
          <View style={styles.mainView}>
                <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.ReportManagement({id: this.state.id})}>
                <View style={[styles.signTop]}>
                  {
                    this.state.projectImg ? (<Image style={styles.projectImg} source={{uri: staticSite + this.state.projectImg}} >{this.state.reportTodo ? <Image source={require('../../images/youpu.png')} /> : null}</Image>) : (<Image style={styles.leftView} source={require('../../images/projectList.png')} />)
                  }
                  <View style={styles.signTopRight}>
                        <Text style={[fonts.bodyText_Black,styles.flex]}>{this.state.name}</Text>
                        <Text style={[fonts.hintText_Gray,styles.flex]}>{this.state.area}</Text>
                        <Text style={[fonts.hintText_Gray,styles.flex]}>商业面积：{this.state.businessAreaMeasure}㎡</Text>
                        <Text style={[fonts.hintText_Gray,styles.flex]}>销售均价：{this.state.salePrice}元/㎡</Text>
                        <Text style={[fonts.hintText_Gray,styles.flex]}>租金均价：{this.state.leasePrice}元/天/㎡</Text>
                  </View>
                </View>
                </TouchableHighlight>
          </View>
      )
    }
  }
