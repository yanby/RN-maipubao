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
import {styles} from '../../styles/community/DemandInput';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import ModalPicker from '../../commonComponents/ModalPicker/index';
import {apis,sites,staticSite} from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import BasicComponent from '../basic/BasicComponent';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class ReportAudit extends BasicComponent {
  constructor (props) {
   super(props);
   this.state = {
     modalObject:{},
     loadingObject:{},
     currentUser:'',
     types2: [{value: '报备成功',label: '报备成功'}, {value: '报备失败',label: '报备失败'}],
     value2: '',
     value2Index: 0,
     flowStatus:'报备成功',
     failedType:null,
     auditMark:null,
     businessId:this.props.businessId,
     businessFlowId:this.props.businessFlowId,
   }

  }

  componentWillMount(){
    storage.load({
      key: keys.currentUser
    }).then(retJson => {this.setState({currentUser:retJson})});
  }

  _save(){
    if (this.state.flowStatus=='报备失败' && this.state.failedType==null) {
      this.msgShort('请选择失败原因');
      return
    }
    this.openLoading();
    this.updateBusinessFlow();
  }

  updateBusiness(){
    storage.load({
      key: keys.patchBusiness,
      syncInBackground: false,
      syncParams: {
         url: apis.patchBusiness + '/' + this.state.businessId,
         body:{
           lastStatus:this.state.flowStatus,
         }
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json();
      }else{
        this.closeLoading();
        this.msgShort('更新交易请求失败');
      }
    }).then(retJson=>{
      if (retJson==null) {
        this.closeLoading();
        this.msgShort('更新交易请求返回异常');
      }else{
        try {
          let type = this.state.flowStatus == '报备成功' ? '报备成功' : '报备失败';
          storage.load({
            key: keys.businessNotify,
            syncInBackground: false,
            syncParams: {
               url: apis.businessNotify + '?type=' + type + '&businessId=' + this.state.businessId
            }
          }).catch(err => {

          });
        } catch (e) {

        }
        this.closeLoading();
        // Actions.pop({refresh:{selectTabIndex:0}});
        Actions.popTo('MyProject');
      }
    }).catch(err => {
      this.closeLoading();
      this.msgShort('更新交易请求异常');
    });
  }

  updateBusinessFlow(){
    storage.load({
      key: keys.patchBusinessFlow,
      syncInBackground: false,
      syncParams: {
         url: apis.patchBusinessFlow + '/' + this.state.businessFlowId,
         body:{
           flowStatus:this.state.flowStatus,
           flowMark:this.state.auditMark,
           failedType:this.state.failedType,
           operatorId:this.state.currentUser.id,
           operatorType:'项目经理',
         }
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json();
      }else{
        this.closeLoading();
        this.msgShort('更新交易流程请求失败');
      }
    }).then(retJson=>{
      if (retJson!=null) {
        this.updateBusiness();
      }
      else {
        this.closeLoading();
        this.msgShort('更新交易流程返回异常');
      }
    }).catch(err => {
      this.closeLoading();
      this.msgShort('更新交易流程异常');
    });
  }


  render() {
    let index = 0;
        const data = [
            { key: index++, section: true, label: '请选择失败原因' },
            { key: index++, label: '客户已存在且在保护期' },
            { key: index++, label: '客户在黑名单' },
            { key: index++, label: '其他' }
        ];
    return (
      <View>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <Title isLeftShow={true} backColor={true}  title={'报备审核'} >
        </Title>
        <ScrollView style={[styles.viewMargin]}  ref={(scrollView) => { _scrollView = scrollView; }} automaticallyAdjustContentInsets={false}>
          <View style={styles.radioView}>
            <RadioForm formHorizontal={false} animation={true} >
              {
                this.state.types2.map((obj, i) => {
                  var onPress = (value, index) => {
                    this.setState({
                      flowStatus: value,
                      value2Index: index
                    })
                  }
                  return (
                    <RadioButton labelHorizontal={true} key={i} style={styles.radioViewBtn} >
                      <RadioButtonLabel
                        obj={obj}
                        index={i}
                        onPress={onPress}
                        labelStyle={[fonts.bodyText_Black,]}
                        labelWrapStyle={styles.flexLabel}
                      />
                      <RadioButtonInput
                          obj={obj}
                          index={i}
                          isSelected={this.state.value2Index === i}
                          onPress={onPress}
                          buttonInnerColor={'#3a8ff3'}
                          buttonOuterColor={this.state.value2Index === i ? '#eaeaea' : '#eaeaea'}
                          buttonSize={10}
                          buttonOuterSize={18}
                          buttonWrapStyle={{marginLeft: 10}}
                      />
                    </RadioButton>
                  )
                })
              }
            </RadioForm>
          </View>

          {this.state.flowStatus=='报备失败' ?
            <View style={styles.drowView}>
              <View style={styles.drowViewBtn}>
                 <Text style={[fonts.bodyText_Black,styles.flexLabel]}>*请选择失败原因</Text>
                 <ModalPicker data={data} style={styles.flexLabel}
                  initValue="Select something yummy!"
                  cancelText="取消" cancelStyle={{backgroundColor:"#fff"}} optionContainer={{backgroundColor:"#fff"}}
                  onChange={(option)=>{ this.setState({failedType:option.label})}}>
                  <TextInput
                      style={[fonts.bodyText_Black,styles.textInputValue]}
                      editable={false}
                      placeholder=""
                      value={this.state.failedType} />
                 </ModalPicker>
                 <Image source={require('../../images/dropFlag.png')}/>
              </View>
            </View>
            :null}

          <View style={styles.bzView}>
                <Text style={[fonts.bodyText_Black]}>备注</Text>
                <View style={styles.newlistView}>
                      <TextInput
                        style={[styles.listInput,fonts.bodyText_Gray,styles.inputPadding]}
                        underlineColorAndroid="transparent"
                        clearButtonMode="always" returnKeyType='done'
                        placeholder="请填写..." multiline={true} placeholderTextColor="#ccc"
                        onChangeText={(text)=>{this.setState({auditMark:text})}}
                        onFocus={() => { _scrollView.scrollTo({y: 100}); }}
                        blurOnSubmit={true}
                      />
                </View>
          </View>

          <View style={[styles.viewBtn]}>
                <TouchableHighlight style={[styles.listNoBtn2]} onPress={()=>{Actions.pop({})}}>
                  <Text style={[fonts.btnText_Gray]}>取消</Text>
                </TouchableHighlight>
                <TouchableHighlight style={[styles.listBtn2]} onPress={()=>{this._save()}}>
                  <Text style={[fonts.btnText_white]}>保存</Text>
                </TouchableHighlight>
          </View>
          {this.renderModal()}{this.renderLoading()}
      </ScrollView>
      </View>
    );
  }
}
AppRegistry.registerComponent('ReportAudit', () => ReportAudit);
