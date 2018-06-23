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
import {comlist} from '../../styles/commonStyle/ProjectList';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CheckBox from 'react-native-check-box';
import {staticSite} from '../../systemComponents/Remote/ApiStorage';

export default class AttentionListItem extends Component {
  constructor (props) {
   super(props)
   this.state = {
     checked: false,

     selectIndexArrary: this.props.selectIndexArrary,

     source: this.props.source,
     id: this.props.item.id,
     name: this.props.item.name ? this.props.item.name : '暂无',
     followNum: this.props.item.followNum ? this.props.item.followNum : '暂无',
     area: (this.props.item.city ? this.props.item.city : '暂无') + '-' + (this.props.item.area ? this.props.item.area : '暂无'),
     areaMeasure: this.props.item.areaMeasure ? this.props.item.areaMeasure : '暂无',
     totalPrice: this.props.item.totalPrice ? this.props.item.totalPrice : '0',
     type: this.props.item.type ? this.props.item.type : '暂无',
     monthlyRent: this.props.item.monthlyRent ? this.props.item.monthlyRent.toFixed(1) : '0',
     shopTags: this.props.item.projectTags ? this.props.item.projectTags : [],
     shopImg: this.props.item.shopImg ? this.props.item.shopImg : null
   }
 }

 renderSatus(item,i){
    let checkStatus = this.state.checked;
    return <CheckBox
      style={comlist.checkBoxView}
      onClick={()=>this._onChange()}
      isChecked={checkStatus}
      checkedImage={<Image source={require('../../images/selectCircled.png')} />}
      unCheckedImage={<Image source={require('../../images/selectCircle.png')} />}
      />
      ;
  }

  async componentWillReceiveProps(nextprops){
    if (nextprops) {
      await this.setState({selectIndexArrary: nextprops.selectIndexArrary});
      this.initCheckBox();
    }
  }

  initCheckBox(){
    if (this.state.selectIndexArrary && this.state.selectIndexArrary.indexOf(this.state.id) !== -1) {
      this.setState({checked:true})
    }else {
      this.setState({checked:false})
    }
  }

  _onChange(){
    if(this.state.checked){
      this.setState({checked:false})
    }else{
      this.setState({checked:true})
    }
    this.props.rowSelect(this.state.id)
  }

  _renderProjectTags(item,i){
    let textStyle=[comlist.bottomText,comlist.bottomTitle,comlist.bottomTxt];
    let viewStyle=[comlist.bottomTextView,comlist.bottomTitleView,comlist.bottomTxtView];
    let styleIndex = 0;
    if (i>=0&&i<=2) {
      styleIndex=i;
    }
    return<View style={viewStyle[styleIndex]} key={i}><Text style={[textStyle[styleIndex]]}>{item}</Text></View>
  }

  render(){
    return(
            <View style={comlist.container}>
                  <TouchableHighlight underlayColor="transparent" onPress={() => this._onChange()}>
                      <View style={comlist.projectView}>
                            <View style={comlist.checkView}>
                                  {this.renderSatus()}
                            </View>
                            <View style={comlist.projectImgView}>
                              {
                                this.state.shopImg ? (<Image style={comlist.projectImg} source={{uri: staticSite + this.state.shopImg}}/>) : (<Image source={require('../../images/projectList.png')}/>)
                              }
                              <View style={comlist.imgTxt}><Text style={fonts.hintText_white}>{this.state.type}</Text></View>
                            </View>

                            <View style={comlist.rightView}>
                                  <View style={comlist.rightTop}>
                                         <Text style={[fonts.t3_Black,comlist.rightText]}>{this.state.name}</Text>
                                  </View>
                                  <View style={comlist.rightMiddle}>
                                         <Text style={[fonts.hintText_Gray,comlist.middelText]}>{this.state.area}</Text>
                                         <Text style={[fonts.hintText_Gray,comlist.rightTitle]}>关注：<Text style={comlist.rightRed}>{this.state.followNum}</Text></Text>
                                  </View>
                                  <Text style={[fonts.hintText_Gray,comlist.thirdText]}>面积：{this.state.areaMeasure}㎡</Text>
                                  <Text style={[fonts.hintText_Gray,comlist.thirdText]}>售价：<Text style={comlist.rightRed}>{this.state.totalPrice}</Text>万元</Text>
                                  <Text style={[fonts.hintText_Gray,comlist.thirdText]}>租金：<Text style={comlist.rightRed}>{this.state.monthlyRent}</Text> 元/月</Text>
                                  <View style={comlist.rightBottom}>
                                    {
                                      this.state.shopTags.map((item,i)=>this._renderShopTags(item,i))
                                    }
                                  </View>
                            </View>
                      </View>
                  </TouchableHighlight>

            </View>
      )
    }
  }
