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
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/community/DemandInput';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class CustomerFastEnter extends Component {
  constructor () {
   super()
   this.state = {
     types1: [{label: '男', value: 0}, {label: '女', value: 1}],
     value1: "",
     value1Index: "",
     types2: [{label: '个人客户', value: 0}, {label: '品牌客户', value: 1}],
     value2: "",
     value2Index: "",
     types3: [{label: 'A', value: 0}, {label: 'B', value: 1},{label: 'C', value: 2}],
     value3: "",
     value3Index: "",
   }
 }
  render() {
    return (
      <View style={[styles.mainList]}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
            <Title isLeftShow={true} backColor={true} isRightBtnShow={false} title={'客户快速录入'}/>
                      <View style={styles.enterView}>
                            <Text style={[styles.enterTitle,fonts.bodyText_Black]}>客户基本信息</Text>
                      </View>
                      <View style={[styles.listView,styles.borderView]}>
                            <Text style={[fonts.bodyText_Blue]}>*</Text>
                            <Text style={[styles.listViewText,fonts.bodyText_Black]}>联系方式：</Text>
                            <TextInput
                              style={[styles.listInput,fonts.bodyText_Gray]}
                              underlineColorAndroid="transparent"
                              clearButtonMode="always" returnKeyType='done'
                              placeholder="请输入客户手机号"
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
                            />
                      </View>
                      <View style={[styles.listView]}>
                            <Text style={[fonts.bodyText_Blue]}>*</Text>
                            <Text style={[styles.listViewText,fonts.bodyText_Black]}>客户性别：</Text>
                            <View style={styles.checkView}>
                            <RadioForm formHorizontal={true} animation={true} >
                            {this.state.types1.map((obj, i) => {
                              var onPress = (value, index) => {
                                  this.setState({
                                    value1: value,
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
                            <View style={styles.checkView}>
                            <RadioForm formHorizontal={true} animation={true} >
                            {this.state.types2.map((obj, i) => {
                              var onPress = (value, index) => {
                                  this.setState({
                                    value2: value,
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
                            <View style={styles.checkView}>
                            <RadioForm formHorizontal={true} animation={true} >
                            {this.state.types3.map((obj, i) => {
                              var onPress = (value, index) => {
                                  this.setState({
                                    value3: value,
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
                      <View style={[styles.viewBtn]}>
                            <TouchableHighlight style={[styles.listNoBtn2]}>
                                  <Text style={[fonts.btnText_Gray]}>取消</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={[styles.listBtn2]}>
                                  <Text style={[fonts.btnText_white]}>保存</Text>
                            </TouchableHighlight>
                      </View>
      </View>
    );
  }
}
AppRegistry.registerComponent('CustomerFastEnter', () => CustomerFastEnter);
