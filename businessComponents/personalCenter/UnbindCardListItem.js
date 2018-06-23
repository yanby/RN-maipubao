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
import {styles} from '../../styles/personalCenter/UnbindCardList';
import CheckBox from 'react-native-check-box';
export default class UnbindCardListItem extends Component {
  constructor (props) {
   super(props)
   this.state = {
     checked:false,
     modalObject:{},
     loadingObject:{},
     id:this.props.item.id?this.props.item.id:-1,
     bankAccount: this.props.item.bankAccountShort ? this.props.item.bankAccountShort : '****',
     selectIndexArrary:this.props.selectIndexArrary
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
      await this.setState({selectIndexArrary:nextprops.selectIndexArrary});
      this.initCheckBox();
    }
  }
  initCheckBox(){
    if (this.state.selectIndexArrary.indexOf(this.state.id)!==-1) {
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
        <View style={styles.view}>
          <View style={styles.checkView}>
                {this.renderSatus()}
          </View>
          <TouchableHighlight underlayColor="transparent" onPress={() => this._onChange()}>
                <Image style={styles.imageBg} source={require('../../images/bankCard.png')}>
                      <Text style={[styles.num,fonts.t1_white]}>**** **** **** {this.state.bankAccount}</Text>
                </Image>
          </TouchableHighlight>
        </View>
      )
    }
  }
