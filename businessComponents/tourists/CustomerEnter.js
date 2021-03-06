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
import CheckBox from 'react-native-check-box';
import BasicComponent from '../basic/BasicComponent';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import SubmitBtn from '../../commonComponents/BtnCommon/SubmitBtn';
import ModalPicker from '../../commonComponents/ModalPicker/index';
import { apis,sites } from '../../systemComponents/Remote/ApiStorage';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class CustomerEnter extends BasicComponent {
  constructor () {
   super()
   this.state = {
     modalObject:{},
     loadingObject:{},
     types1: [{label: '男', value: "男"}, {label: '女', value: "女"}],
     value1Index: "",
     types2: [{label: '个人客户', value: "个人客户"}, {label: '品牌客户', value: "品牌客户"}],
     value2Index: "",
     types3: [{label: 'A', value: "A"}, {label: 'B', value: "B"},{label: 'C', value: "C"}],
     value3Index: "",
     types4: [{label: '求购', value: "求购"}, {label: '求租', value: "求租"}],
     value3Index: "",
     BasicInfoMore:false,
     CustomInfoMore:false,
     name:'',tel:'',gender: null ,customerType: null ,customerLevel:null,demandType:null,demandMark:'',
     price:'',size:'',shopPlan:'',specialDemand:'',propertyDemand:'',manageArea:'',brandName:'',customerRank:null,
     userId:'',
     projectManager: null
   }
 }

  _loadUser(){
    storage.load({key: keys.currentUser}).then(currentUser => {
        this.setState({
          userId: currentUser.id,
          projectManager: currentUser.projectManager
        })
    }).catch(err => {
      // this.msgShort("用户失效，请重新登录26");
      Actions.Login({})
    })
  }
  componentWillMount(){
    this._loadUser();
  }

  _AddCustomer(){
   let tel = this.state.tel
   let price = this.state.price
   let size = this.state.size
   if (!/(^[1][0-9]{10}$)/.test(tel)) {
     this.msgShort('手机号格式错误')
     return
   }
   if (!this.state.name) {
     this.msgShort('名字不能为空')
     return
   }
   if (!this.state.gender) {
     this.msgShort('性别不能为空')
     return
   }
   if(price){
     if (!/^[0-9]+([.]{1}[0-9]{1,2}){0,1}$/.test(price)) {
       this.msgShort('价格格式错误')
       return
     }
   }
   if(size){
     if (!/^[0-9]+([.]{1}[0-9]{1,2}){0,1}$/.test(size)) {
       this.msgShort('面积格式错误')
       return
     }
   }
   this.openLoading('正在保存...');
   let customerInfo={
       "name":  this.state.name,
       "tel": this.state.tel,
       "gender": this.state.gender,
       "customerType": this.state.customerType,
       "customerLevel": this.state.customerLevel,
       "demandType": this.state.demandType,
       "demandMark": this.state.demandMark,
       "price": this.state.price,
       "size": this.state.size,
       "shopPlan": this.state.shopPlan,
       "specialDemand": this.state.specialDemand,
       "propertyDemand": this.state.propertyDemand,
       "manageArea": this.state.manageArea,
       "brandName": this.state.brandName,
       "customerRank": this.state.customerRank,
       "user": {"id": this.state.userId},
       "customerMarks": this.state.demandMark ? [{"mark": this.state.demandMark}] : null,
       "customerSource": (this.state.projectManager ? "平台录入" : "自然到访")
   }
   storage.load({
     key: keys.saveCustomerWithMark,
     syncInBackground: false,
     syncParams: {
        url: apis.saveCustomerWithMark,
        body:customerInfo
     }
   }).then(ret => {
     if(ret.status == 200){
       return ret.json()
     } else {
       this.closeLoading();
       this.msgShort('保存异常')
     }
   }).then(content=>{
     if (this.props.quickNew) {
       storage.save({
         key: keys.reportCustomer,
         data: content.id,
         expires: null
       })
       storage.load({
         key: keys.reportProject
       }).then(reportProject => {
         Actions.replace('ReportInfo',{projectId: reportProject, customerId: content.id});
        //  Actions.ReportInfo({projectId: reportProject, customerId: content.id})
       })
       this.closeLoading();
       this.msgShort('保存成功');
     }
     else {
       Actions.replace('MyCustom');
     }
   }).catch(err => {
     this.closeLoading();
     this.msgShort('保存异常')
   })
 }
 _showBasicInfo(){
   if(this.state.BasicInfoMore){
     this.setState({BasicInfoMore:false})
   }else{
     this.setState({BasicInfoMore:true})
   }
 }
 _showCustomInfo(){
   if(this.state.CustomInfoMore){
     this.setState({CustomInfoMore:false})
   }else{
     this.setState({CustomInfoMore:true})
   }
 }

  render() {
    let index = 0;
        const data = [
            { key: index++, section: true, label: '请选择客户职级' },
            { key: index++, label: '拓展专员' },
            { key: index++, label: '拓展经理' },
            { key: index++, label: '区域总监' },
            { key: index++, label: '地区总经理' }
        ];
    return (
      <View style={styles.container}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
            <Title isLeftShow={true} backColor={true} isRightBtnShow={false} title={'客户录入'}/>
            <ScrollView ref={(scrollView) => { _scrollView = scrollView; }} automaticallyAdjustContentInsets={false}>

                      <View style={styles.enterView}>
                            <Text style={[styles.enterTitle,fonts.bodyText_Black]}>客户基本信息</Text>
                            <TouchableHighlight underlayColor="transparent" onPress={()=>this._showBasicInfo()}>
                                  <View style={styles.enterBtn}>
                                        <Text style={[fonts.bodyText_Black]}>更多</Text>
                                        {this.state.BasicInfoMore?
                                        <Image style={styles.imgMl}  source={require('../../images/dropFlag.png')}></Image>
                                        :
                                        <Image style={styles.imgMl}  source={require('../../images/more.png')}></Image>
                                        }
                                  </View>
                            </TouchableHighlight>
                      </View>
                      <View style={[styles.listView,styles.borderView]}>
                            <Text style={[fonts.bodyText_Blue]}>*</Text>
                            <Text style={[styles.listViewText,fonts.bodyText_Black]}>联系方式：</Text>
                            <TextInput
                              style={[styles.listInput,fonts.bodyText_Gray]}
                              underlineColorAndroid="transparent"
                              clearButtonMode="always" returnKeyType='done'
                              placeholder="请输入客户手机号"
                              maxLength={11}
                              onChangeText={(text) => this.setState({tel: text})}
                            />
                      </View>
                      <View style={[styles.listView]}>
                            <Text style={[fonts.bodyText_Blue]}>*</Text>
                            <Text style={[styles.listViewText,fonts.bodyText_Black]}>客户姓名：</Text>
                            <TextInput
                              style={[styles.listInput,fonts.bodyText_Gray]}
                              underlineColorAndroid="transparent"
                              clearButtonMode="always" returnKeyType='done'
                              placeholder="请输入客户姓名"
                              onChangeText={(text) => this.setState({name: text})}
                            />
                      </View>
                      <View style={[styles.listView]}>
                            <Text style={[fonts.bodyText_Blue]}>*</Text>
                            <Text style={[styles.listViewText,fonts.bodyText_Black]}>客户性别：</Text>
                            <View style={styles.radioView}>
                            <RadioForm formHorizontal={true} animation={true} >
                            {this.state.types1.map((obj, i) => {
                              var onPress = (value, index) => {
                                  this.setState({
                                    gender: value,
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
                      })}
                    </RadioForm>
                            </View>
                      </View>
                      <View style={[styles.listView]}>
                            <Text style={[styles.listViewText,fonts.bodyText_Black]}>  客户类型：</Text>
                            <View style={styles.radioView}>
                            <RadioForm formHorizontal={true} animation={true} >
                            {this.state.types2.map((obj, i) => {
                              var onPress = (value, index) => {
                                  this.setState({
                                    customerType: value,
                                    value2Index: index
                                  })
                                }
                                return (
                                  <RadioButton labelHorizontal={true} key={i} >
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
                      <View style={[styles.listView]}>
                            <Text style={[styles.listViewText,fonts.bodyText_Black]}>  客户等级：</Text>
                            <View style={styles.radioView}>
                            <RadioForm formHorizontal={true} animation={true} >
                            {this.state.types3.map((obj, i) => {
                              var onPress = (value, index) => {
                                  this.setState({
                                    customerLevel: value,
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
                      {this.state.BasicInfoMore?
                      <View>
                            <View style={[styles.listView]}>
                                  <View style={[styles.listViewText]}><Text style={[fonts.bodyText_Black]}>  品牌名称：</Text></View>
                                  <TextInput
                                    style={[styles.listInput,fonts.bodyText_Gray]}
                                    underlineColorAndroid="transparent"
                                    clearButtonMode="always" returnKeyType='done'
                                    placeholder="请输入客户负责品牌名称"
                                    placeholderTextColor="#ccc"
                                    onChangeText={(text) => this.setState({brandName: text})}
                                  />
                            </View>

                            <View style={styles.drowView}>
                              <View style={styles.drowViewBtn}>
                                 <Text style={[fonts.bodyText_Black,styles.flexLabel]}>  客户职务：</Text>
                                 <ModalPicker data={data} style={styles.flexLabel}
                                  initValue="Select something yummy!"
                                  cancelText="取消" cancelStyle={{backgroundColor:"#fff"}} optionContainer={{backgroundColor:"#fff"}}
                                  onChange={(option)=>{ this.setState({customerRank:option.label})}}>
                                  <TextInput
                                      style={[fonts.bodyText_Black,styles.textInputValue]}
                                      editable={false}
                                      placeholder=""
                                      value={this.state.customerRank} />
                                 </ModalPicker>
                                 <Image style={[styles.selectIcon]} source={require('../../images/select.png')}></Image>
                              </View>
                            </View>
                            <View style={[styles.listView]}>
                                  <View style={[styles.listViewText]}><Text style={[fonts.bodyText_Black]}>  负责区域：</Text></View>
                                  <TextInput
                                    style={[styles.listInput,fonts.bodyText_Gray]}
                                    underlineColorAndroid="transparent"
                                    clearButtonMode="always" returnKeyType='done'
                                    placeholder=""
                                    placeholderTextColor="#ccc"
                                    onChangeText={(text) => this.setState({manageArea: text})}
                                    onFocus={() => { _scrollView.scrollTo({y: 180}); }}
                                  />
                            </View>
                      </View>
                      :null
                    }
                      <View style={[styles.enterView,styles.mt10]}>
                            <Text style={[styles.enterTitle,fonts.bodyText_Black]}>客户需求信息</Text>
                            <TouchableHighlight underlayColor="transparent" onPress={()=>this._showCustomInfo()}>
                                        <View style={styles.enterBtn}>
                                              <Text style={[fonts.bodyText_Black]}>更多</Text>
                                              {this.state.CustomInfoMore?
                                              <Image style={styles.imgMl}  source={require('../../images/dropFlag.png')}></Image>
                                              :
                                              <Image style={styles.imgMl} source={require('../../images/more.png')}></Image>
                                              }
                                        </View>
                            </TouchableHighlight>
                      </View>
                      <View style={[styles.listView,styles.borderView]}>
                            <Text style={[styles.listViewText,fonts.bodyText_Black]}>  需求类型：</Text>
                            <View style={styles.radioView}>
                            <RadioForm formHorizontal={true} animation={true} >
                            {this.state.types4.map((obj, i) => {
                              var onPress = (value, index) => {
                                  this.setState({
                                    demandType: value,
                                    value4Index: index
                                  })
                                }
                                return (
                                  <RadioButton labelHorizontal={true} key={i} >
                                               <RadioButtonInput
                                                  obj={obj}
                                                  index={i}
                                                  isSelected={this.state.value4Index === i}
                                                  onPress={onPress}
                                                  buttonInnerColor={'#3a8ff3'}
                                                  buttonOuterColor={this.state.value4Index === i ? '#eaeaea' : '#eaeaea'}
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
                      { this.state.CustomInfoMore?
                      <View>
                      <View style={[styles.listView]}>
                            <View style={[styles.listViewText]}><Text style={[fonts.bodyText_Black]}>  价       格：</Text></View>
                            <TextInput
                              style={[styles.listInput,fonts.bodyText_Gray]}
                              underlineColorAndroid="transparent"
                              clearButtonMode="always" returnKeyType='done'
                              placeholder="请填写"
                              placeholderTextColor="#ccc"
                              keyboardType='numeric'
                              onChangeText={(text) => this.setState({price: text})}
                              onFocus={() => { _scrollView.scrollTo({y: 200}); }}
                            />
                      </View>
                      <View style={[styles.listView]}>
                            <View style={[styles.listViewText]}><Text style={[fonts.bodyText_Black]}>  面       积：</Text></View>
                            <TextInput
                              style={[styles.listInput,fonts.bodyText_Gray]}
                              underlineColorAndroid="transparent"
                              clearButtonMode="always" returnKeyType='done'
                              placeholder="请填写"
                              placeholderTextColor="#ccc"
                              keyboardType='numeric'
                              onChangeText={(text) => this.setState({size: text})}
                              onFocus={() => { _scrollView.scrollTo({y: 280}); }}
                            />
                      </View>
                      <View style={[styles.listView]}>
                            <View style={[styles.listViewText]}><Text style={[fonts.bodyText_Black]}>  开店计划：</Text></View>
                            <TextInput
                              style={[styles.listInput,fonts.bodyText_Gray]}
                              underlineColorAndroid="transparent"
                              clearButtonMode="always" returnKeyType='done'
                              placeholder="请填写"
                              placeholderTextColor="#ccc"
                              onChangeText={(text) => this.setState({shopPlan: text})}
                              onFocus={() => { _scrollView.scrollTo({y: 320}); }}
                            />
                      </View>
                      <View style={[styles.listView]}>
                            <View style={[styles.listViewText]}><Text style={[fonts.bodyText_Black]}>  业务要求：</Text></View>
                            <TextInput
                              style={[styles.listInput,fonts.bodyText_Gray]}
                              underlineColorAndroid="transparent"
                              clearButtonMode="always" returnKeyType='done'
                              placeholder="请填写"
                              placeholderTextColor="#ccc"
                              onChangeText={(text) => this.setState({propertyDemand: text})}
                              onFocus={() => { _scrollView.scrollTo({y: 360}); }}
                            />
                      </View>
                      <View style={[styles.listView]}>
                            <View style={[styles.listViewText]}><Text style={[fonts.bodyText_Black]}>  特殊要求：</Text></View>
                            <TextInput
                              style={[styles.listInput,fonts.bodyText_Gray]}
                              underlineColorAndroid="transparent"
                              clearButtonMode="always" returnKeyType='done'
                              placeholder="请填写"
                              placeholderTextColor="#ccc"
                              onChangeText={(text) => this.setState({specialDemand: text})}
                              onFocus={() => { _scrollView.scrollTo({y: 400}); }}
                            />
                      </View>
                      </View>
                      :null
                     }
                      <View style={styles.bzView}>
                            <Text style={[fonts.bodyText_Black]}>备注</Text>
                            <View style={styles.newlistView}>
                                  <TextInput
                                    style={[styles.listInput,fonts.bodyText_Gray,styles.inputPadding]}
                                    underlineColorAndroid="transparent"
                                    clearButtonMode="always" returnKeyType='done' blurOnSubmit={true}
                                    placeholder="请填写..." multiline={true} placeholderTextColor="#ccc"
                                    onChangeText={(text) => this.setState({demandMark: text})}
                                    onFocus={() => { _scrollView.scrollTo({y: 400}); }}
                                  />
                            </View>
                      </View>
                      <View style={[styles.viewBtn]}>
                            <TouchableHighlight style={[styles.listNoBtn2]} underlayColor="transparent" onPress={()=>{Actions.pop({})}}>
                                  <Text style={[fonts.btnText_Gray]}>取消</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={[styles.listBtn2]} underlayColor="#3a8ff3" onPress={() => {this._AddCustomer()}}>
                                    <Text style={[fonts.btnText_white]}>保存</Text>
                            </TouchableHighlight>
                      </View>
                      {
                        this.renderModal()
                      }
                      {
                        this.renderLoading()
                      }
      </ScrollView>
</View>
    );
  }
}
AppRegistry.registerComponent('CustomerEnter', () => CustomerEnter);
