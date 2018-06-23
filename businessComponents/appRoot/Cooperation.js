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
  Modal
} from 'react-native';
var t = require('tcomb-form-native');
var TextBox = require('../../commonComponents/forms/TextBox');
import { Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/community/DemandInput';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import BasicComponent from '../basic/BasicComponent';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { apis,sites } from '../../systemComponents/Remote/ApiStorage';
export default class Cooperation extends BasicComponent {
  constructor () {
   super()
   this.state = {
     modalObject:{},
     loadingObject:{},
     types3: [{label: '公司类合作', value: "公司"}, {label: '个人类合作', value: "个人"}],
     value3Index: '',
     customer:'',
     customerPhone:'',
     cooperationType:'',
     customerRemark:'',
     userId:'',
   }
 }
 componentWillMount(){
   storage.load({key: keys.currentUser}).then(currentUser => {
     if(currentUser){
       console.log(currentUser.id)
        this.setState({userId:currentUser.id});
     }
   }).catch(error=>{})
 }
  async _SaveCooperation(){
   if (!this.state.customer) {
      this.msgShort('姓名不能为空，请输入')
      return
   }
   let tel = this.state.customerPhone;
   if (!/(^[1][0-9]{10}$)/.test(tel)) {
     this.msgShort('手机号码格式不对')
     return
   }
   if (!this.state.cooperationType) {
     this.msgShort('意向不能为空，请选择')
     return
   }
   this.openLoading('正在保存...');
   let cooperationInfo={
       "customer":  this.state.customer,
       "customerPhone": this.state.customerPhone,
       "cooperationType": await this.state.cooperationType,
       "customerRemark": this.state.customerRemark,
       "status": "待审核",
       "user": '/users/'+ this.state.userId,
   }
   storage.load({
     key: keys.cooperation,
     syncInBackground: false,
     syncParams: {
        url: apis.cooperation,
        body:cooperationInfo
     }
   }).then(ret => {
     if(ret.status == 201){
       this.closeLoading();
       this.msgShort('提交成功，我们会尽快联系您的哦！')
       Actions.reset('Index',{});
     } else {
       this.closeLoading();
      this.msgShort('保存失败，请重新保存！')
     }

   }).catch(err => {
     this.closeLoading();
     this.msgShort('保存失败')
   })

 }

  render() {
    return (
      <View style={[styles.container]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <View style={[styles.listView]}>
              <Text style={[fonts.bodyText_Blue]}>*</Text>
              <Text style={[styles.listViewText,fonts.bodyText_Black]}>姓        名：</Text>
              <TextInput
                style={[styles.listInput,fonts.bodyText_Gray]}
                underlineColorAndroid="transparent"
                clearButtonMode="always" returnKeyType='done'
                placeholder="请输入您的姓名"
                onChangeText={(text) => this.setState({customer:text})}
              />
        </View>
        <View style={[styles.listView]}>
              <Text style={[fonts.bodyText_Blue]}>*</Text>
              <Text style={[styles.listViewText,fonts.bodyText_Black]}>手机号码：</Text>
              <TextInput
                style={[styles.listInput,fonts.bodyText_Gray]}
                underlineColorAndroid="transparent"
                clearButtonMode="always" returnKeyType='done'
                placeholder="请输入联系人手机号"
                keyboardType="numeric"
                maxLength={11}
                onChangeText={(text) => this.setState({customerPhone:text})}
              />
        </View>
        <View style={[styles.listView]}>
              <Text style={[fonts.bodyText_Blue]}>*</Text>
              <Text style={[styles.listViewText,fonts.bodyText_Black]}>意        向：</Text>
              <View style={styles.checkView}>
              <RadioForm formHorizontal={true} animation={true} >
              {this.state.types3.map((obj, i) => {
                var onPress = (value, index) => {
                    this.setState({
                      cooperationType: value,
                      value3Index: index
                    })
                  }
                  return (
                    <RadioButton labelHorizontal={true} key={i} >
                                 <RadioButtonInput
                                    obj={obj}
                                    index={i}
                                    isSelected={this.state.value3Index === i}
                                    onPress={onPress}
                                    buttonInnerColor={'#3a8ff3'}
                                    buttonOuterColor={this.state.value3Index === i ? '#eaeaea' : '#eaeaea'}
                                    buttonSize={10}
                                    buttonOuterSize={18}
                                    buttonWrapStyle={{marginLeft: 10}}
                                  />
                                  <RadioButtonLabel
                                    obj={obj}
                                    index={i}
                                    onPress={onPress}
                                    labelStyle={{color: '#333'}}
                                    labelWrapStyle={{marginLeft:10,}}
                                  />
                    </RadioButton>
                  )
        })}
      </RadioForm>
              </View>
        </View>
        <View style={[styles.listView,styles.listViewRest]}>
          <View style={[styles.listViewText,styles.listViewTextRest]}><Text style={[fonts.bodyText_Black]}>备          注：</Text></View>
          <TextInput
            style={[styles.listInput,fonts.bodyText_Gray,styles.moreInput]}
            underlineColorAndroid="transparent"
            clearButtonMode="always" returnKeyType='done'
            placeholder="亲，可以在这输入您更多的需求哦"
            placeholderTextColor="#ccc"
            onChangeText={(text) => this.setState({customerRemark:text})}
            multiline={true} blurOnSubmit={true}
          />
        </View>
        <TouchableHighlight style={[styles.listBtn,styles.listBtnRest]} underlayColor="#3a8ff3" onPress={()=>{this._SaveCooperation()}}>
          <Text style={[fonts.btnText_white]}>提交</Text>
        </TouchableHighlight>
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
AppRegistry.registerComponent('Cooperation', () => Cooperation);
