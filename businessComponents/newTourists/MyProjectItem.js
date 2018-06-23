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
import {styles} from '../../styles/tourists/MyProjectItem';
import {staticSite} from '../../systemComponents/Remote/ApiStorage';

export default class MyProjectItem extends Component {
  constructor(props){
    super(props);
    this.state={
      id: this.props.item.id,
      name: this.props.item.name ? this.props.item.name : '暂无',
      isLease: this.props.item.isLease ? true : false,
      isSale: this.props.item.isSale ? true : false,
      projectImg: this.props.item.projectImg ? this.props.item.projectImg : null,
      reportNumZ: this.props.item.reportNumZ ? this.props.item.reportNumZ : 0,
      visitNumZ: this.props.item.visitNumZ ? this.props.item.visitNumZ : 0,
      intentNumZ: this.props.item.intentNumZ ? this.props.item.intentNumZ : 0,
      signNumZ: this.props.item.signNumZ ? this.props.item.signNumZ : 0,
      reportNumX: this.props.item.reportNumX ? this.props.item.reportNumX : 0,
      visitNumX: this.props.item.visitNumX ? this.props.item.visitNumX : 0,
      intentNumX: this.props.item.intentNumX ? this.props.item.intentNumX : 0,
      signNumX: this.props.item.signNumX ? this.props.item.signNumX : 0,
      reprotAuditNum: this.props.item.reprotAuditNum ? this.props.item.reprotAuditNum : 0,

    };
  }

  renderNumber(){
    if((this.state.isLease || this.state.reportNumZ>0) && (this.state.isSale || this.state.reportNumX>0)){
      return (
        <View>
          <View style={[styles.rightTop,styles.mt10]}>
               <Image style={styles.img} source={require('../../images/zs.png')}></Image>
               <Text style={[fonts.hintText_Black]}>招商</Text>
               <Text style={[fonts.tinyText_Gray]}>-累计</Text>
          </View>
          <View style={[styles.rightTop,styles.mt10]}>
                <Text style={[fonts.hintText_Gray,styles.flex]}>报备 <Text style={[fonts.hintText_Gray,styles.hitColor1]}>{this.state.reportNumZ}</Text></Text>
                <Text style={[fonts.hintText_Gray,styles.flex]}>意向 <Text style={[fonts.hintText_Gray,styles.hitColor1]}>{this.state.intentNumZ}</Text></Text>
          </View>
          <View style={[styles.rightTop,styles.mt10]}>
                <Text style={[fonts.hintText_Gray,styles.flex]}>到访 <Text style={[fonts.hintText_Gray,styles.hitColor1]}>{this.state.visitNumZ}</Text></Text>
                <Text style={[fonts.hintText_Gray,styles.flex]}>签约 <Text style={[fonts.hintText_Gray,styles.hitColor1]}>{this.state.signNumZ}</Text></Text>
          </View>
          <View style={[styles.rightTop,styles.mt10]}>
               <Image style={styles.img} source={require('../../images/xs.png')}></Image>
               <Text style={[fonts.hintText_Black]}>销售</Text>
               <Text style={[fonts.tinyText_Gray]}>-累计</Text>
          </View>
          <View style={[styles.rightTop,styles.mt10]}>
                <Text style={[fonts.hintText_Gray,styles.flex]}>报备 <Text style={[fonts.hintText_Gray,styles.hitColor2]}>{this.state.reportNumX}</Text></Text>
                <Text style={[fonts.hintText_Gray,styles.flex]}>认购 <Text style={[fonts.hintText_Gray,styles.hitColor2]}>{this.state.intentNumX}</Text></Text>
          </View>
          <View style={[styles.rightTop]}>
              <Text style={[fonts.hintText_Gray,styles.flex]}>到访 <Text style={[fonts.hintText_Gray,styles.hitColor2]}>{this.state.visitNumX}</Text></Text>
              <Text style={[fonts.hintText_Gray,styles.flex]}>签约 <Text style={[fonts.hintText_Gray,styles.hitColor2]}>{this.state.signNumX}</Text></Text>
          </View>
        </View>
      );
    }else if(this.state.isLease || this.state.reportNumZ>0){
      return (
        <View>
          <View style={[styles.rightTop,styles.mt10]}>
               <Image style={styles.img} source={require('../../images/xs.png')}></Image>
               <Text style={[fonts.hintText_Black]}>招商</Text>
               <Text style={[fonts.tinyText_Gray]}>-累计</Text>
          </View>
          <View style={[styles.rightTop,styles.mt10]}>
                <Text style={[fonts.hintText_Gray,styles.flex]}>报备 <Text style={[fonts.hintText_Gray,styles.hitColor2]}>{this.state.reportNumZ}</Text></Text>
                <Text style={[fonts.hintText_Gray,styles.flex]}>意向 <Text style={[fonts.hintText_Gray,styles.hitColor2]}>{this.state.intentNumZ}</Text></Text>
          </View>
          <View style={[styles.rightTop]}>
              <Text style={[fonts.hintText_Gray,styles.flex]}>到访 <Text style={[fonts.hintText_Gray,styles.hitColor2]}>{this.state.visitNumZ}</Text></Text>
              <Text style={[fonts.hintText_Gray,styles.flex]}>签约 <Text style={[fonts.hintText_Gray,styles.hitColor2]}>{this.state.signNumZ}</Text></Text>
          </View>
        </View>
      );
    }else if(this.state.isSale || this.state.reportNumX>0){
      return (
        <View>
          <View style={[styles.rightTop,styles.mt10]}>
               <Image style={styles.img} source={require('../../images/xs.png')}></Image>
               <Text style={[fonts.hintText_Black]}>销售</Text>
               <Text style={[fonts.tinyText_Gray]}>-累计</Text>
          </View>
          <View style={[styles.rightTop,styles.mt10]}>
                <Text style={[fonts.hintText_Gray,styles.flex]}>报备 <Text style={[fonts.hintText_Gray,styles.hitColor2]}>{this.state.reportNumX}</Text></Text>
                <Text style={[fonts.hintText_Gray,styles.flex]}>认购 <Text style={[fonts.hintText_Gray,styles.hitColor2]}>{this.state.intentNumX}</Text></Text>
          </View>
          <View style={[styles.rightTop]}>
              <Text style={[fonts.hintText_Gray,styles.flex]}>到访 <Text style={[fonts.hintText_Gray,styles.hitColor2]}>{this.state.visitNumX}</Text></Text>
              <Text style={[fonts.hintText_Gray,styles.flex]}>签约 <Text style={[fonts.hintText_Gray,styles.hitColor2]}>{this.state.signNumX}</Text></Text>
          </View>
        </View>
      );
    }
  }

  render(){
    return(
          <View style={styles.mainView}>
                <View style={[styles.signTop]}>
                      {
                        this.state.projectImg ?
                          <Image style={styles.projectImg} source={{uri: staticSite + this.state.projectImg}} >
                                 <View style={styles.bgView}>
                                       <Text style={[fonts.hintText_white]} numberOfLines={1}>{this.state.name}</Text>
                                 </View>
                          </Image> :
                          <Image style={styles.projectImg} source={require('../../images/projectList.png')} >
                                <View style={styles.bgView}>
                                      <Text style={[fonts.hintText_white]} numberOfLines={1}>{this.state.name}</Text>
                                </View>
                          </Image>
                      }
                      <View style={styles.signTopRight}>
                      {this.renderNumber()}
                      </View>
                      {this.state.reprotAuditNum>0?
                      <View style={styles.dbView}>
                        <Image  source={require('../../images/ywdb.png')} />
                      </View>
                      :null
                       }
                </View>
                <View style={styles.touchBtn}>
                      {
                        this.state.reportNumX>0 ?
                        <View>
                        <TouchableHighlight onPress={()=>Actions.ReportManagement({id: this.state.id,projectName: this.state.name,businessType: "销售"})} underlayColor="transparent" style={[styles.borderColor2,styles.touch]}><Text style={[fonts.hintText_Gray,styles.color2]}>销售交易管理</Text></TouchableHighlight>
                        </View>
                        :null
                      }
                      {
                        this.state.reportNumZ>0 ?
                        <View>
                        <TouchableHighlight onPress={()=>Actions.ReportManagement({id: this.state.id,projectName: this.state.name,businessType: "招商"})} underlayColor="transparent" style={[styles.borderColor1,styles.touch]}><Text style={[fonts.hintText_Gray,styles.color1]}>招商交易管理</Text></TouchableHighlight>
                        </View>
                        :null
                      }
                      <TouchableHighlight onPress={()=>Actions.ChartM({id: this.state.id,projectName: this.state.name,isLease:this.state.isLease,isSale:this.state.isSale})} underlayColor="transparent" style={[styles.borderColor3,styles.touch]}><Text style={[fonts.hintText_Gray,styles.color3]}>交易数据分析</Text></TouchableHighlight>
                </View>
          </View>
      )
    }
  }
