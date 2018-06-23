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
     id: this.props.item.id,
     name: this.props.item.name ? this.props.item.name : '暂无',
     followNum: this.props.item.followNumTotal ? this.props.item.followNumTotal : '0',
     area: (this.props.item.city ? this.props.item.city : '暂无') + '-' + (this.props.item.area ? this.props.item.area : '暂无'),
     businessAreaMeasure: this.props.item.businessAreaMeasure ? this.props.item.businessAreaMeasure : '暂无',
     salePrice: this.props.item.salePrice ? this.props.item.salePrice.toFixed(2) : '0',
     leasePrice: this.props.item.leasePrice ? this.props.item.leasePrice.toFixed(2) : '0',
     projectTags: this.props.item.projectTags ? this.props.item.projectTags : [],
     projectImg: this.props.item.projectImg ? this.props.item.projectImg : null,
     selectIndexArrary: this.props.selectIndexArrary
   }
 }

 renderSatus(){
    let checkStatus = this.state.checked;
    return <CheckBox
      style={comlist.checkBoxView}
      onClick={()=>this._onChange()}
      key={this.state.id}
      isChecked={this.state.checked}
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
    console.log('11');
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
                            {
                              this.state.projectImg ? (<Image style={comlist.projectImg} source={{uri: staticSite + this.state.projectImg}}/>) : (<Image source={require('../../images/projectList.png')}/>)
                            }
                            <View style={comlist.rightView}>
                                  <View style={comlist.rightTop} ellipsizeMode={'clip'}>
                                         <Text style={[fonts.t3_Black,comlist.rightText]} numberOfLines={1}>{this.state.name}</Text>

                                  </View>
                                  <View style={comlist.rightMiddle} ellipsizeMode={'clip'}>
                                         <Text style={[fonts.hintText_Gray,comlist.middelText]} numberOfLines={1}>{this.state.area}</Text>
                                         {
                                        //  <Text style={[fonts.hintText_Gray,comlist.rightTitle]}>关注：<Text style={comlist.rightRed}>{this.state.followNum}</Text></Text>
                                         }
                                  </View>
                                  <Text style={[fonts.hintText_Gray,comlist.thirdText]}>商业面积：{this.state.businessAreaMeasure}㎡</Text>
                                  {
                                    this.state.salePrice == 0 ? null :
                                    <Text style={[fonts.hintText_Gray,comlist.thirdText]}>销售均价：<Text style={comlist.rightRed}>{this.state.salePrice}</Text> 元/㎡</Text>
                                  }
                                  {
                                    this.state.leasePrice == 0 ? null :
                                    <Text style={[fonts.hintText_Gray,comlist.thirdText]}>租金均价：<Text style={comlist.rightRed}>{this.state.leasePrice}</Text> 元/天/㎡</Text>
                                  }
                                  <View style={comlist.rightBottom}>
                                    {
                                      // this.state.projectTags.map((item,i)=>this._renderProjectTags(item,i))
                                    }
                                  </View>
                            </View>
                      </View>
                  </TouchableHighlight>

            </View>
      )
    }
  }
