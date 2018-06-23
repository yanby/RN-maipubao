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
import {styles} from '../../styles/tourists/ReportManagement';
import CheckBox from 'react-native-check-box';
var moment = require('moment');

export default class EditProjectCustomItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      checked: false,
      id: this.props.item.id,
      name: this.props.item.name ? this.props.item.name : '',
      level: this.props.item.customerLevel ? this.props.item.customerLevel : '',
      customerType: this.props.item.customerType ? this.props.item.customerType : '',
      brandName: this.props.item.brandName ? this.props.item.brandName : '',
      demandType: this.props.item.demandType ? this.props.item.demandType : '',
      createTime: this.props.item.createTime ? moment(this.props.item.createTime).format('YYYY.MM.DD') : '',
      selectIndexArrary: this.props.selectIndexArrary
    }
  }

  renderSatus(item,i){
    let checkStatus = this.state.checked;
    return <CheckBox
      style={styles.checkBoxView}
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

  render(){
    return(
        <TouchableHighlight underlayColor="transparent" onPress={() => this._onChange()}>
          <View style={[styles.mainView,styles.flexRowView]}>
                <View style={styles.checkView}>
                      {this.renderSatus()}
                </View>
                <View style={styles.flex}>
                <View style={[styles.reportTop,styles.reportTopRest]}>
                {
                    this.state.name != '' ?
                    <Text style={[fonts.bodyText_Black,styles.flex]}>{this.state.name}</Text>

                :null}

                {
                    this.state.demandType != '' ?
                    <TouchableHighlight style={styles.topBtn}>
                    <Text style={[fonts.tinyText_Black,styles.flagRed]}>{this.state.demandType}</Text>
                    </TouchableHighlight>

                :null}

                </View>
                <View style={styles.reportTop1}>
                      <View style={[styles.flex,styles.topView]}>
                      {
                          this.state.level != '' ?
                          <View style={[styles.reportTopText,styles.reportTopText1]}>
                                <Text style={[fonts.tinyText_Gray]}>{this.state.level}</Text>
                          </View>
                      :null}

                      {
                          this.state.customerType != '' ?
                          <View style={[styles.reportTopText,styles.reportTopText2]} ellipsizeMode={'clip'}>
                                <Text style={[fonts.tinyText_Gray]} numberOfLines={1}>{this.state.customerType}</Text>
                          </View>

                      :null}

                            {
                              this.state.brandName != '' ?
                                this.state.customerType == '品牌客户' ?
                                <View style={[styles.reportTopText,styles.reportTopText3]} ellipsizeMode={'clip'}>
                                      <Text style={[fonts.tinyText_Gray]} numberOfLines={1}>{this.state.brandName}</Text>
                                </View>
                                : null
                              : null
                            }
                      </View>

                      {
                          this.state.createTime != '' ?
                          <Text style={[fonts.tinyText_Gray,styles.topRight]}>{this.state.createTime}</Text>

                      :null}

                </View>
                </View>
          </View>
        </TouchableHighlight>
      )
    }
  }
