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
var moment = require('moment');
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/community/DemandInput';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CheckBox from 'react-native-check-box';
import {Actions,ActionConst } from 'react-native-router-flux';
import {apis} from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import BasicComponent from '../basic/BasicComponent';
import DatePicker from 'react-native-datepicker';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class ReportInfo extends BasicComponent {
  constructor (props) {
   super(props)
   let nowTime = new Date().getTime();
   let updateTime=moment(nowTime).format("YYYY-MM-DD HH:mm");
   this.state = {
     modalObject: {},
     loadingObject: {},
     businessTypes: null,
     value1: "",
     value1Index: "",
     currentUser: null,
     projectId: this.props.projectId,
     customerId: this.props.customerId,
     visitTime: updateTime,
     businessType: null,
     mark: null
   }
 }

 componentWillMount(){
   this._initData()
 }

 _initData(){
   storage.load({
     key: keys.getProjects,
     syncInBackground: false,
     syncParams: {
        url: apis.getProjects + '/' + this.state.projectId
     }
   }).then(ret => {
     return ret.json();
   }).then(retJson=>{
     let businessTypes = []
     if (retJson.isSale) {
       businessTypes.push({label: '求购', value: '销售'})
     }
     if (retJson.isLease) {
       businessTypes.push({label: '求租', value: '招商'})
     }
     this.setState({
       businessTypes: businessTypes
     })
   }).catch(err => {
     this.msgShort('获取项目信息异常');
   });

   storage.load({
     key: keys.currentUser
   }).then(retJson => {
     this.setState({
       currentUser: retJson
     })
   })
 }

 saveReport(){
   let userId=this.state.currentUser.id;
   let customerId=this.state.customerId;
   let projectId=this.state.projectId;
   let visitTime=this.state.visitTime;
   let businessType=this.state.businessType;
   let mark=this.state.mark ? this.state.mark : '';

   if(!businessType) {
     this.msgShort('请选择需求类型')
     return
   }
   this.openLoading();
   storage.load({
     key: keys.createNewBusiness,
     syncInBackground: false,
     syncParams: {
        url: apis.createNewBusiness +'?userId='+userId+'&projectId='+projectId+'&customerId='+customerId+'&visitTime='+visitTime+'&businessType='+businessType+'&mark='+mark
     }
   }).then(ret => {
     if(ret.status == 200){
       return ret.json();
     }else{
       this.closeLoading();
       this.msgShort('请求失败');
     }
   }).then(retJson=>{
     if (retJson==true) {
       this.closeLoading();
       this.msgShort('报备提交成功');
       Actions.reset('TouristIndex');
     }
     else {
       this.closeLoading();
       this.msgShort('报备提交失败');
     }
   }).catch(err => {
     this.closeLoading();
     this.msgShort('请求异常');
   });
 }

  render() {
    return (
      <View style={[styles.container,styles.viewMargin]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <Title isLeftShow={true} backColor={true} title={'客户报备'}/>
        <ScrollView>
        <View style={styles.reportState}>
          <View style={styles.reportView}>
            <Text style={[fonts.hintText_Gray,styles.flexView]}>选择报备项目</Text>
            <Text style={[fonts.hintText_Gray,styles.flexView]}>选择报备客户</Text>
            <Text style={[fonts.hintText_Gray,styles.flexView]}>填写报备信息</Text>
          </View>
          <Image  source={require('../../images/bb3.png')}/>
        </View>
        <View style={[styles.listView,styles.borderView]}>
          <Text style={[styles.listViewText,fonts.bodyText_Black]}>  需求类型：</Text>
          <View style={styles.radioView}>
            <RadioForm formHorizontal={true} animation={true}>
            {this.state.businessTypes ? this.state.businessTypes.map((obj, i) => {
              var onPress = (value, index) => {
                  this.setState({
                    businessType: value,
                    value1Index: index
                  })
                }
              return (
                <RadioButton labelHorizontal={true} key={i} >
                   <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={this.state.value1Index === i}
                      onPress={onPress}
                      buttonInnerColor={'#3a8ff3'}
                      buttonOuterColor={this.state.value1Index === i ? '#eaeaea' : '#eaeaea'}
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
            }) : null}
            </RadioForm>
          </View>
        </View>
        <View style={styles.enterView}>
          <Text style={[styles.enterTitle,fonts.bodyText_Black]}>预计到访时间：</Text>
          <View style={styles.enterBtn}>
            <DatePicker  style={{width:200,height:20}}   date={this.state.visitTime}   mode="datetime"
              placeholder="请选择"  format="YYYY-MM-DD HH:mm" minDate="1980-01-01"  maxDate="2100-01-01"
              confirmBtnText="确认"  cancelBtnText="取消" showIcon={false}
              customStyles={{
                      dateInput: {
                        height:20,
                        position:"absolute",
                        top:0,right:0,borderWidth:0,
                      }
              }}
              onDateChange={(date) => {this.setState({visitTime: date})}}
            />
            <Image style={styles.imgMl}  source={require('../../images/more.png')}></Image>
          </View>
        </View>
        <View style={styles.bzViewM}>
              <View style={styles.bzViewMTitle}><Text style={[fonts.bodyText_Black]}>备注</Text></View>
              <View style={styles.newlistViewM}>
                    <TextInput
                      style={[fonts.bodyText_Gray,styles.inputM]}
                      underlineColorAndroid="transparent"
                      clearButtonMode="always" returnKeyType='done'
                      placeholder="请填写..." multiline={true} placeholderTextColor="#ccc"
                      onChangeText={(text)=>{this.setState({mark:text})}}
                    />
              </View>
        </View>
        <View style={[styles.viewBtnM]}>
              <TouchableHighlight style={[styles.listNoBtn2]} underlayColor="transparent" onPress={()=>Actions.pop({})}>
                    <Text style={[fonts.btnText_Gray]}>上一步</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.listBtn2]} underlayColor="#3a8ff3" onPress={()=>this.saveReport()}>
                    <Text style={[fonts.btnText_white]}>提 交</Text>
              </TouchableHighlight>
        </View>
        {this.renderModal()}
        {this.renderLoading()}
      </ScrollView>
      </View>
    );
  }
}
AppRegistry.registerComponent('ReportInfo', () => ReportInfo);
