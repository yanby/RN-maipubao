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
import {styles} from '../../styles/tourists/EditCustomerDetails';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CheckBox from 'react-native-check-box'
import BasicComponent from '../basic/BasicComponent';
import ModalPicker from '../../commonComponents/ModalPicker/index';
import {apis} from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
export default class EditCustomerDetails extends BasicComponent {
  constructor (props) {
   super(props)
   this.state = {
     types2: [{label: '个人客户', value: '个人客户'}, {label: '品牌客户', value: '品牌客户'}],
     types3: [{label: 'A', value: 'A'}, {label: 'B', value: 'B'},{label: 'C', value: 'C'}],
     types4: [{label: '求购', value: '求购'}, {label: '求租', value: '求租'}],
     modalObject:{},
     loadingObject:{},
     perJson:{},
     id:'',
     customerLevel:'',
     customerType:'',
     demandType:'',
     name:'',
     tel:'',
     brandName:'',
     customerRank:'',
     manageArea:'',
     price:0.00,
     size:0.00,
     shopPlan:'',
     propertyDemand:'',
     specialDemand:'',
   }
 }
 componentWillMount(){
   this.openLoading();
   storage.load({
     key: keys.getCustomerBusinessDetail,
     syncInBackground: false,
     syncParams: {
        url: apis.getCustomerBusinessDetail + '?customerId=' + this.props.customerId
     }
   }).then(ret => {
     if(ret.status == 200){
       return ret.json()
     } else {
       this.msgShort(ret.msg)
     }
   }).then(retJson=>{
     this.setState({
       name:retJson.name,
       tel:retJson.tel,
       brandName:retJson.brandName,
       customerRank:retJson.customerRank,
       manageArea:retJson.manageArea,
       id:retJson.id,
       price:retJson.price ? retJson.price : '',
       size:retJson.size ? retJson.size : '',
       shopPlan:retJson.shopPlan,
       propertyDemand:retJson.propertyDemand,
       specialDemand:retJson.specialDemand,
       customerLevel:retJson.customerLevel,
       customerType:retJson.customerType,
       demandType:retJson.demandType
     })
     this.closeLoading();
   }).catch(err => {
     this.msgShort("异常1");
     this.closeLoading();
   })
 }

   _subCustomer(){
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

     storage.load({
       key: keys.patchCustomer,
       syncInBackground: false,
       syncParams: {
          url: apis.patchCustomer+'/'+this.props.customerId,
          body:{
            name:this.state.name,
            tel:this.state.tel,
            customerLevel:this.state.customerLevel,
            customerType:this.state.customerType,
            brandName:this.state.brandName,
            customerRank:this.state.customerRank,
            manageArea:this.state.manageArea,
            demandType:this.state.demandType,
            price:this.state.price,
            size:this.state.size,
            shopPlan:this.state.shopPlan,
            propertyDemand:this.state.propertyDemand,
            specialDemand:this.state.specialDemand,
          }
       }
     }).then(ret => {
       if(ret.status == 200){
         this.closeLoading();
         this.msgShort('保存成功');
         Actions.CustomerDetails({id:this.props.customerId});
       }else{
         this.closeLoading();
         this.msgShort('保存失败');
       }
     }).catch(err => {
       this.closeLoading();
       this.msgShort('请求异常');
     });

   }
  _delCustom(){
    console.log(this.state.id)
    storage.load({
      key: keys.customerDel,
      syncInBackground: false,
      syncParams: {
         url: apis.customerDel  + '/' + this.state.id
      }
    }).catch(err => {
      this.msgShort('删除异常');
      return
    })

    Actions.MyCustom({})
  }
 testConfirm(){
   this.confirm(
     {
       ok:{
         text:'确认',
         click:()=>{
           this._delCustom()

         }
       },
       no:{
         text:'取消',
         click:()=>{
         }
       },
       text:'确认删除该客户？'
     })
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
            <View style={styles.main}>
                  <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
                  <View style={[styles.nav]}>
                        <TouchableHighlight style={[styles.navLeftIcon]} underlayColor="transparent" onPress={()=>Actions.pop({})}>
                              <Image source={require('../../images/back.png')}></Image>
                        </TouchableHighlight>
                        <View style={[styles.navTitle]}>
                              <Text style={[fonts.t2_Black]}>客户详情</Text>
                        </View>
                        <TouchableHighlight style={[styles.navRightText]} underlayColor="transparent" onPress={() => {this.testConfirm()}}>
                              <Text style={[fonts.bodyText_Black]}>删除</Text>
                        </TouchableHighlight>
                  </View>
                  <ScrollView ref={(scrollView) => { _scrollView = scrollView; }} automaticallyAdjustContentInsets={false}>
                            <View style={styles.enterView}>
                                  <Text style={[styles.enterTitle,fonts.bodyText_Black]}>客户基本信息</Text>
                            </View>
                            <View style={[styles.listView,styles.borderView]}>
                                  <Text style={[styles.listViewText,fonts.bodyText_Black]}>客户姓名：</Text>
                                  <TextInput
                                    style={[styles.listInput,fonts.bodyText_Gray]}
                                    underlineColorAndroid="transparent"
                                    clearButtonMode="always" returnKeyType='done'
                                    placeholder="请输入客户姓名" placeholderTextColor="#ccc"
                                    value={this.state.name}
                                    onChangeText={(text)=>{this.setState({name:text})}}
                                  />
                            </View>
                            <View style={[styles.listView]}>
                                  <Text style={[styles.listViewText,fonts.bodyText_Black]}>联系方式：</Text>
                                  <TextInput
                                    style={[styles.listInput,fonts.bodyText_Gray]}
                                    underlineColorAndroid="transparent"
                                    returnKeyType='done'
                                    placeholder="请输入客户手机号"
                                    editable={false}
                                    value={this.state.tel}
                                    onChangeText={(text)=>this.setState({tel:text})}
                                  />
                            </View>

                            <View style={[styles.listView]}>
                                  <Text style={[styles.listViewText,fonts.bodyText_Black]}>客户等级：</Text>
                                  <View style={styles.radioView}>
                                  <RadioForm formHorizontal={true} animation={true} >
                                  {this.state.types3.map((obj, i) => {
                                    var onPress = (value, index) => {
                                        this.setState({
                                          customerLevel: value
                                        })
                                      }
                                      return (
                                        <RadioButton labelHorizontal={true} key={i} >
                                           <RadioButtonInput
                                              obj={obj}
                                              index={i}
                                              isSelected={this.state.customerLevel == obj.value}
                                              onPress={onPress}
                                              buttonInnerColor={'#3a8ff3'}
                                              buttonOuterColor={this.state.customerLevel === obj.value ? '#eaeaea' : '#eaeaea'}
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
                                  <Text style={[styles.listViewText,fonts.bodyText_Black]}>客户类型：</Text>
                                  <View style={styles.radioView}>
                                  <RadioForm formHorizontal={true} animation={true} >
                                  {this.state.types2.map((obj, i) => {
                                    var onPress = (value, index) => {
                                        this.setState({
                                          customerType: value
                                        })
                                      }
                                      return (
                                        <RadioButton labelHorizontal={true} key={i} >
                                           <RadioButtonInput
                                              obj={obj}
                                              index={i}
                                              isSelected={this.state.customerType === obj.value}
                                              onPress={onPress}
                                              buttonInnerColor={'#3a8ff3'}
                                              buttonOuterColor={this.state.customerType === obj.value ? '#eaeaea' : '#eaeaea'}
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
                                  <Text style={[styles.listViewText,fonts.bodyText_Black]}>品牌名称：</Text>
                                  <TextInput
                                    style={[styles.listInput,fonts.bodyText_Gray]}
                                    underlineColorAndroid="transparent"
                                    clearButtonMode="always" returnKeyType='done'
                                    placeholder="请输入客户负责品牌名称"
                                    value={this.state.brandName}
                                    onChangeText={(text)=>this.setState({brandName:text})}
                                    onFocus={() => { _scrollView.scrollTo({y: 180}); }}
                                  />
                            </View>
                            <View style={[styles.listView]}>
                                  <Text style={[styles.listViewText,fonts.bodyText_Black]}>客户职务：</Text>
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
                            <View style={[styles.listView]}>
                                  <Text style={[styles.listViewText,fonts.bodyText_Black]}>负责区域：</Text>
                                  <TextInput
                                    style={[styles.listInput,fonts.bodyText_Gray]}
                                    underlineColorAndroid="transparent"
                                    clearButtonMode="always" returnKeyType='done'
                                    value={this.state.manageArea}
                                    onChangeText={(text)=>this.setState({manageArea:text})}
                                    onFocus={() => { _scrollView.scrollTo({y: 180}); }}
                                  />
                            </View>
                            <View style={[styles.enterView,styles.mt10]}>
                                  <Text style={[styles.enterTitle,fonts.bodyText_Black]}>客户需求信息</Text>
                            </View>
                            <View style={[styles.listView,styles.borderView]}>
                                  <Text style={[styles.listViewText,fonts.bodyText_Black]}>需求类型：</Text>
                                  <View style={styles.radioView}>
                                  <RadioForm formHorizontal={true} animation={true} >
                                  {this.state.types4.map((obj, i) => {
                                    var onPress = (value, index) => {
                                        this.setState({
                                          demandType: value,
                                        })
                                      }
                                      return (
                                        <RadioButton labelHorizontal={true} key={i} >
                                           <RadioButtonInput
                                              obj={obj}
                                              index={i}
                                              isSelected={this.state.demandType === obj.value}
                                              onPress={onPress}
                                              buttonInnerColor={'#3a8ff3'}
                                              buttonOuterColor={this.state.demandType === obj.value ? '#eaeaea' : '#eaeaea'}
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
                                  <Text style={[styles.listViewText,fonts.bodyText_Black]}>价      格：</Text>
                                  <TextInput
                                    style={[styles.listInput,fonts.bodyText_Gray]}
                                    underlineColorAndroid="transparent"
                                    clearButtonMode="always" returnKeyType='done'
                                    placeholder="请填写"
                                    value={this.state.price + ''}
                                    keyboardType='numeric'
                                    onChangeText={(text)=>this.setState({price:text})}
                                    onFocus={() => { _scrollView.scrollTo({y: 360}); }}
                                  />
                            </View>
                            <View style={[styles.listView]}>
                                  <Text style={[styles.listViewText,fonts.bodyText_Black]}>面      积：</Text>
                                  <TextInput
                                    style={[styles.listInput,fonts.bodyText_Gray]}
                                    underlineColorAndroid="transparent"
                                    clearButtonMode="always" returnKeyType='done'
                                    placeholder="请填写"
                                    value={this.state.size + ''}
                                    keyboardType='numeric'
                                    onChangeText={(text)=>this.setState({size:text})}
                                    onFocus={() => { _scrollView.scrollTo({y: 360}); }}
                                  />
                            </View>
                            <View style={[styles.listView]}>
                                  <Text style={[styles.listViewText,fonts.bodyText_Black]}>开店计划：</Text>
                                  <TextInput
                                    style={[styles.listInput,fonts.bodyText_Gray]}
                                    underlineColorAndroid="transparent"
                                    clearButtonMode="always" returnKeyType='done'
                                    placeholder="请填写"
                                    value={this.state.shopPlan}
                                    onChangeText={(text)=>this.setState({shopPlan:text})}
                                    onFocus={() => { _scrollView.scrollTo({y: 360}); }}
                                  />
                            </View>
                            <View style={[styles.listView]}>
                                  <Text style={[styles.listViewText,fonts.bodyText_Black]}>业务要求：</Text>
                                  <TextInput
                                    style={[styles.listInput,fonts.bodyText_Gray]}
                                    underlineColorAndroid="transparent"
                                    clearButtonMode="always" returnKeyType='done'
                                    placeholder="请填写"
                                    value={this.state.propertyDemand}
                                    onChangeText={(text)=>this.setState({propertyDemand:text})}
                                    onFocus={() => { _scrollView.scrollTo({y: 360}); }}
                                  />
                            </View>
                            <View style={[styles.listView]}>
                                  <Text style={[styles.listViewText,fonts.bodyText_Black]}>特殊要求：</Text>
                                  <TextInput
                                    style={[styles.listInput,fonts.bodyText_Gray]}
                                    underlineColorAndroid="transparent"
                                    clearButtonMode="always" returnKeyType='done'
                                    placeholder="请填写"
                                    value={this.state.specialDemand}
                                    onChangeText={(text)=>this.setState({specialDemand:text})}
                                    onFocus={() => { _scrollView.scrollTo({y: 400}); }}
                                  />
                            </View>
                            <View style={[styles.viewBtn]}>
                                  <TouchableHighlight style={[styles.listNoBtn2]} underlayColor="transparent" onPress={()=>Actions.pop({})}>
                                        <Text style={[fonts.btnText_Gray]}>取消</Text>
                                  </TouchableHighlight>
                                  <TouchableHighlight style={[styles.listBtn2]} underlayColor="#3a8ffc" onPress={()=>this._subCustomer()}>
                                        <Text style={[fonts.btnText_white]}>保存</Text>
                                  </TouchableHighlight>
                            </View>
            </ScrollView>
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
AppRegistry.registerComponent('EditCustomerDetails', () => EditCustomerDetails);
