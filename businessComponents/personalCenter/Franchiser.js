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
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { apis,sites,staticSite } from '../../systemComponents/Remote/ApiStorage';
import BasicComponent from '../basic/BasicComponent';
import { UMengAnalytics } from '../../commonComponents/umeng/UMAnalytics';

import {Title} from '../../commonComponents/CommentTitle/Title';
export default class Franchiser extends BasicComponent {
  constructor(props){
     super(props);
     this.state={
      modalObject:{},
      loadingObject:{},
      roleType:'招商人',
      userId:'',
      name:'',
      projectName:'',
    	intentBusiness:'',
    	intentBrand:'',
    	goodBusiness:'',
      visitingCardPic:''
     }
   }

  _loadUser(){
    storage.load({key: keys.currentUser}).then(currentUser => {
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
        this.setState({
          userId:retJson.id,
          name:retJson.name
        })
      })
    }).catch(err => {
      // this.msgShort("用户失效，请重新登录11");
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
          this.setState({visitingCardPic:a.path});
          this.setState({upimgUrl:respones.url})
          this.closeLoading()
        });
      }
    })
  }

  renderImage(){
    if (this.state.visitingCardPic) {
      return <Image style={{width:100,height:100}} source={{uri:this.state.visitingCardPic}} />
    }else {
      return <Image source={require('../../images/add-img.png')}></Image>
    }
  }

  componentWillMount(){
    this._loadUser();
  }

  _submit(){
    let name = this.state.name
    let positionName = this.state.positionName
    let projectName = this.state.projectName
    let intentBusiness = this.state.intentBusiness
    let intentBrand = this.state.intentBrand
    let goodBusiness = this.state.goodBusiness
    let visitingCardPic = this.state.upimgUrl
    if(!name) {
      this.msgShort('请输入您的姓名！')
      return
    }
    if(!positionName) {
      this.msgShort('请输入您的职位！')
      return
    }
    if(!projectName) {
      this.msgShort('请输入现负责的项目名称！')
      return
    }

    let user ={
      "roleType" : this.state.roleType,
      "id" : this.state.userId,
      "name" : name,
      "positionName" : positionName,
      "projectName" : projectName,
      "intentBusiness" : intentBusiness,
      "intentBrand" : intentBrand,
      "goodBusiness" : goodBusiness,
      "visitingCardPic" : visitingCardPic,
    }
    storage.load({
      key: keys.changeRoleType,
      syncInBackground: false,
      syncParams: {
         url: apis.changeRoleType,
         body: user
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
    UMengAnalytics.onEvent('personal_role_merchants_submit');
  }

  render() {
    return (
      <View style={[styles.mainList]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <Title isLeftShow={true} backColor={true} isRightBtnShow={false} title={'招商人'}/>
        <View style={[styles.listView]}>
          <Text style={[styles.listIcon]}>*</Text>
          <TextInput
            style={[styles.listInput,fonts.bodyText_Gray]}
            underlineColorAndroid="transparent"
            clearButtonMode="always" returnKeyType='done'
            placeholder="请输入您的姓名"
            placeholderTextColor="#ccc"
            value={this.state.name}
            onChangeText={(text) => this.setState({name: text})}
          />
        </View>
        <View style={[styles.listView]}>
          <Text style={[styles.listIcon]}>*</Text>
          <TextInput
            style={[styles.listInput,fonts.bodyText_Gray]}
            underlineColorAndroid="transparent"
            clearButtonMode="always" returnKeyType='done'
            placeholder="请输入您的职位"
            placeholderTextColor="#ccc"
            onChangeText={(text) => this.setState({positionName: text})}
          />
        </View>
        <View style={[styles.listView]}>
          <Text style={[styles.listIcon]}>*</Text>
          <TextInput
            style={[styles.listInput,fonts.bodyText_Gray]}
            underlineColorAndroid="transparent"
            clearButtonMode="always" returnKeyType='done'
            placeholder="现负责的项目名称"
            placeholderTextColor="#ccc"
            onChangeText={(text) => this.setState({projectName: text})}
          />
        </View>
        <View style={[styles.listView]}>
          <TextInput
            style={[styles.listInput,fonts.bodyText_Gray]}
            underlineColorAndroid="transparent"
            clearButtonMode="always" returnKeyType='done'
            placeholder="请输入您的意向业态（选填）"
            placeholderTextColor="#ccc"
            onChangeText={(text) => this.setState({intentBusiness: text})}
          />
        </View>
        <View style={[styles.listView]}>
          <TextInput
            style={[styles.listInput,fonts.bodyText_Gray]}
            underlineColorAndroid="transparent"
            clearButtonMode="always" returnKeyType='done'
            placeholder="请输入您的意向品牌（选填）"
            placeholderTextColor="#ccc"
            onChangeText={(text) => this.setState({intentBrand: text})}
          />
        </View>
        <View style={[styles.listView]}>
          <TextInput
            style={[styles.listInput,fonts.bodyText_Gray]}
            underlineColorAndroid="transparent"
            clearButtonMode="always" returnKeyType='done'
            placeholder="请输入您的专长业态（选填）"
            placeholderTextColor="#ccc"
            onChangeText={(text) => this.setState({goodBusiness: text})}
          />
        </View>
        <View style={[styles.listTextRow,styles.marginLeft15,styles.marginTop10]}>
          <Text style={[fonts.bodyText_Black]}>名片：</Text>
          <View style={[styles.listImg,styles.flex1]}>
            <TouchableHighlight underlayColor="transparent" onPress={()=> this._upload()}>
            {
              this.renderImage()
            }
            </TouchableHighlight>
            <Text style={[styles.imgText,fonts.hintText_Gray]}>请上传名片</Text>
          </View>
        </View>
        <TouchableHighlight style={[styles.listBtn,styles.positionBottom20]} underlayColor="#3a8ff3" onPress={() => this._submit()}>
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
AppRegistry.registerComponent('franchiser', () => franchiser);
