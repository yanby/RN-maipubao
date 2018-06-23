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
import {styles} from '../../styles/personalCenter/MessageEditList';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CheckBox from 'react-native-check-box';
export default class MessageEditListItem extends Component {
  constructor (props) {
   super(props)
   this.state = {
     checked:false,
     modalObject:{},
     loadingObject:{},
     id: this.props.item.id,
     title: this.props.item.titleCut ? this.props.item.titleCut : '暂无',
     content: this.props.item.contentCut ? this.props.item.contentCut : '暂无',
     createTime: this.props.item.createTimeText,
     readFlag: this.props.item.readFlag ? this.props.item.readFlag : false,
     userId:this.props.userId,
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
      <View style={styles.container}>
        <TouchableHighlight underlayColor="transparent" onPress={()=>this._onChange()}>
            <View style={styles.memberView}>
              <View style={styles.checkView}>
                    {this.renderSatus()}
              </View>
              {
                this.state.readFlag?
                <View style={styles.viewList}>
                      <View style={styles.viewTitle}>
                            <Text style={[fonts.bodyText_Gray,styles.viewTitleText]}>{this.state.title}</Text>
                            <Image source={require('../../images/more.png')}></Image>
                      </View>
                      <View style={styles.viewText}>
                            <Text style={[fonts.hintText_Gray,styles.viewTextText]}>{this.state.content}</Text>
                      </View>
                      <View style={styles.createTime}>
                            <Text style={[styles.createTimeTxt,fonts.hintText_Gray]}>{this.state.createTime}</Text>
                      </View>
                </View>
              :
              <View style={styles.viewList}>
                    <View style={styles.viewTitle}>
                          <Text style={[fonts.bodyText_Black,styles.viewTitleText]}>{this.state.title}</Text>
                          <Image source={require('../../images/more.png')}></Image>
                          <View style={styles.redIcon}></View>
                    </View>
                    <View style={styles.viewText}>
                          <Text style={[fonts.hintText_Gray1,styles.viewTextText]}>{this.state.content}</Text>
                    </View>
                    <View style={styles.createTime}>
                          <Text style={[styles.createTimeTxt,fonts.hintText_Gray]}>{this.state.createTime}</Text>
                    </View>
              </View>
            }
          </View>
        </TouchableHighlight>
      </View>
      )
    }
  }
