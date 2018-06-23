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
import {styles} from '../../styles/commonStyle/ListForm';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Actions,ActionConst } from 'react-native-router-flux';

import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { apis,sites,staticSite } from '../../systemComponents/Remote/ApiStorage';
import BasicComponent from '../basic/BasicComponent';
export default class PersonalInformation extends BasicComponent {
  constructor (props) {
   super(props)
   this.state = {
     modalObject:{},
     loadingObject:{},
     types1: [{label: '男', value: '男'}, {label: '女', value: '女'}],
     value1: '',
     value1Index:"",
     perJson:{},
     name:'',
     gender:'',
     userId:'',
     logoPath:'',
     idCardPicA:''
   }
 }

 _upload(){
    this.uploadModal(false,(image)=>{
      this._uploadImage(image)
    })
 }
 _uploadImage(image){
   image.then(a=>{
     if (a&&a.path) {
       this.closeModal();
       this.openLoading('正在上传')
       this.uploadToRemote(a.path).then(respones=>{
         this.setState({logoPath:a.path});
         this.setState({upimgUrl:respones.url})
         this.closeLoading()
       })
     }
   })
 }
  _loadData(){
    storage.load({
      key: keys.getOneUser,
      syncInBackground: false,
      syncParams: {
         url: apis.getOneUser + this.props.userId,
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json()
      } else {
        this.msgShort(ret.msg)
      }
    }).then(retJson=>{
      let perJson = this.state.perJson;
      let value1 =  this.state.value1;
      let name = this.state.name;
      this.setState({
        perJson:retJson,
        value1:retJson.gender,
        userId:retJson.id,
        name:retJson.name,
        logoPath:staticSite + retJson.logoPath,
        idCardPicA:retJson.idCardPicA
      })
      if(this.state.value1 == '女'){
        this.setState({value1Index:1})
      }else{
        this.setState({value1Index:0})
      }
      this.closeLoading();
    }).catch(err => {
      this.msgShort("异常");
      this.closeLoading();
    })
  }

   componentWillMount(){
     this._loadData()
  }
  _subUser(){
    if(!this.state.name){
      this.msgShort('请输入姓名')
      return
    }
    this.openLoading('正在保存...');
    let userInfo={
        "logoPath": this.state.upimgUrl,
        "name": this.state.name,
        "gender": this.state.value1,
    }
    storage.load({
      key: keys.patchOneUser,
      syncInBackground: false,
      syncParams: {
         url: apis.patchOneUser + '/' + this.state.userId,
         body:userInfo,
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json()
      } else {
        this.msgShort(ret.msg)
      }
    }).then(retJson=>{
      this.closeLoading();
      this.msgShort('提交成功');
      Actions.PersonalIndex({});
    }).catch(err => {
      this.msgShort("异常");
      this.closeLoading();
    })
  }

  _renderImage(){

    if (this.state.logoPath) {
      return <Image style={{width:40,height:40,borderRadius:20}} source={{uri: this.state.logoPath}} />
    }else {
      return <Image style={[styles.headImg]} source={require('../../images/head-img1.png')}></Image>
    }
  }
  render() {
    return (
      <View>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <View style={[styles.nav]}>
              <TouchableHighlight style={[styles.backIcon]} underlayColor="transparent" onPress={()=>Actions.pop({})}>
                    <Image source={require('../../images/back.png')}></Image>
              </TouchableHighlight>
              <View style={[styles.navTitle]}>
                    <Text style={[fonts.t2_Black]}>个人信息</Text>
              </View>
              <TouchableHighlight style={[styles.navLeft]} underlayColor="transparent" onPress={()=>this._subUser()}>
                    <Text style={[fonts.bodyText_Black]}>提交</Text>
              </TouchableHighlight>
        </View>
        <TouchableHighlight underlayColor="transparent" onPress={()=>this._upload()}>
          <View style={[styles.listView,styles.listViewLeft]}>
            <Text style={[styles.listInput,fonts.bodyText_Black]}>头像</Text>
            {
              this._renderImage()
            }
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={[styles.listView,styles.listViewLeft]}>
            <Text style={[styles.listInput,fonts.bodyText_Black]}>姓名</Text>
            <TextInput
              style={[styles.textAlignRight,fonts.bodyText_Gray]}
              underlineColorAndroid="transparent"
              clearButtonMode="always"
              value={this.state.name}
              onChangeText={(text) => this.setState({name:text})}
            />
          </View>
        </TouchableHighlight>
          <View style={[styles.listView,styles.listViewLeft]}>
            <Text style={[styles.listInput,fonts.bodyText_Black]}>性别</Text>
            <View style={styles.radioView}>
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
        <TouchableHighlight>
          <View style={[styles.listView,styles.listViewLeft]}>
            <Text style={[styles.listInput,fonts.bodyText_Black]}>手机号</Text>
            <Text style={[fonts.bodyText_Gray]}>{this.state.perJson.accountText}</Text>
          </View>
        </TouchableHighlight>
        {
          this.state.idCardPicA ?
          <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.AddImgID({status:1})}>
            <View style={[styles.listView,styles.marginTop10,styles.listViewLeft1]}>
              <Text style={[styles.listInput,fonts.bodyText_Black]}>身份证</Text>
              <Text style={[fonts.bodyText_Black]}>已上传</Text>
              <Image source={require('../../images/more.png')}></Image>
            </View>
          </TouchableHighlight>
          :
          <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.AddImgID({status:0})}>
            <View style={[styles.listView,styles.marginTop10,styles.listViewLeft1]}>
              <Text style={[styles.listInput,fonts.bodyText_Black]}>身份证</Text>
              <Text style={[fonts.bodyText_Black]}>未上传</Text>
              <Image source={require('../../images/more.png')}></Image>
            </View>
          </TouchableHighlight>
        }
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
AppRegistry.registerComponent('personalInformation', () => personalInformation);
