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
import { Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/commonStyle/ListForm';
import BasicComponent from '../basic/BasicComponent';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { apis,sites,staticSite } from '../../systemComponents/Remote/ApiStorage';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class AuthenticationInfo extends BasicComponent {
  constructor(props){
     super(props);
     this.state={
      modalObject:{},
      loadingObject:{},
      userId:'',
      companyName:'',
      companyLicence:'',
      companyPhone:'',
      name:'',
      tcpName:'公司认证说明',
     }
   }

  _loadData(){
    storage.load({key: keys.currentUser}).then(currentUser => {
      this.setState({userId:currentUser.id})
      storage.load({
        key: keys.getOneUser,
        syncInBackground: false,
        syncParams: {
  	       url: apis.getOneUser + currentUser.id
        }
      }).then(ret => {
        if(ret.status == 200){
          return ret.json();
        }else{
          Actions.Login({})
        };
      }).then(retJson=>{
        if(retJson.name != ''){
          this.setState({name:retJson.name});
        }
      })
    }).catch(err => {
      Actions.Login({})
    })
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
          this.setState({
            companyLicence:a.path,
            upimgUrl:respones.url
          });
          this.closeLoading()
        });
      }
    })
  }
  renderImage(){
    if (this.state.companyLicence) {
      return <Image style={{width:100,height:100}} source={{uri:this.state.companyLicence}} />
    }else {
      return <Image source={require('../../images/add-img.png')}></Image>
    }
  }
  componentWillMount(){
    this._loadData()
  }

  _submit(){
	  let companyName = this.state.companyName
    let companyPhone = this.state.companyPhone
    let name = this.state.name
    let companyLicence = this.state.upimgUrl
    if(!companyName) {
      this.msgShort('请输入公司名称！')
      return
    }
    if(!companyPhone) {
      this.msgShort('请输入您的手机号！')
      return
    }
    if(!name) {
      this.msgShort('请输入您的姓名！')
      return
    }
    if(!companyLicence) {
      this.msgShort('请上传公司营业执照！')
      return
    }

    let companyInfo ={
      "companyName" : companyName,
      "companyPhone" : companyPhone,
      "name" : name,
      "companyLicence" : companyLicence,
      "authStatus" : true
    }
    storage.load({
      key: keys.authCompany,
      syncInBackground: false,
      syncParams: {
         url: apis.users + '/' + this.state.userId,
         body:companyInfo
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json()
      } else {
        this.msgShort(ret.msg)
      }
    }).then(res => {
        this.msgShort('提交成功')
        Actions.PersonalIndex({})
    }).catch(err => {
      this.msgShort('提交失败')
    })
  }

  render() {
    return (
      <View style={[styles.mainList]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <Title isLeftShow={true} backColor={true} isRightBtnShow={false} title={'认证'}/>
        <View style={[styles.listView]}>
          <Text style={[styles.listIcon]}>*</Text>
          <TextInput
            style={[styles.listInput,fonts.bodyText_Gray]}
            underlineColorAndroid="transparent"
            clearButtonMode="always" returnKeyType='done'
            placeholder="请输入公司名称"
            placeholderTextColor="#ccc"
            value={this.state.companyName}
            onChangeText={(value)=>{this.setState({companyName:value})}}
          />
        </View>
        <View style={[styles.listView]}>
          <Text style={[styles.listIcon]}>*</Text>
          <TextInput
            style={[styles.listInput,fonts.bodyText_Gray]}
            underlineColorAndroid="transparent"
            clearButtonMode="always" returnKeyType='done'
            placeholder="请输入您的姓名"
            placeholderTextColor="#ccc"
            value={this.state.name}
            onChangeText={(value)=>{this.setState({name:value})}}
          />
        </View>
        <View style={[styles.listView]}>
          <Text style={[styles.listIcon]}>*</Text>
          <TextInput
            style={[styles.listInput,fonts.bodyText_Gray]}
            underlineColorAndroid="transparent"
            clearButtonMode="always" returnKeyType='done'
            placeholder="请输入您的手机号"
            placeholderTextColor="#ccc"
            maxLength={11}
            value={this.state.companyPhone}
            onChangeText={(value)=>{this.setState({companyPhone:value})}}
          />
        </View>
        <View style={[styles.listTextRow,styles.marginLeft15,styles.marginTop10]}>
          <Text style={[fonts.bodyText_Black]}>营业执照：</Text>
          <View style={[styles.listImg,styles.flex1]}>
            <TouchableHighlight underlayColor="transparent" onPress={()=> this._upload()}>
              {
                this.renderImage()
              }
            </TouchableHighlight>
              <Text style={[styles.imgText,fonts.hintText_Gray]}>请上传公司营业执照</Text>
          </View>
        </View>
        <TouchableHighlight style={{marginLeft:15,marginTop:20}} underlayColor="transparent" onPress={()=>Actions.Protocol({protocolName:this.state.tcpName})}>
            <Text style={[styles.marginTop25,fonts.hintText_Blue]}>公司级认证说明？</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.listBtn,styles.positionBottom20]} onPress={() => this._submit()}>
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
AppRegistry.registerComponent('AuthenticationInfo', () => AuthenticationInfo);
