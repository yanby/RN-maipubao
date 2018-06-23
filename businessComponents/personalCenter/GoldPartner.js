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
import { apis,sites } from '../../systemComponents/Remote/ApiStorage';
import BasicComponent from '../basic/BasicComponent';
import { UMengAnalytics } from '../../commonComponents/umeng/UMAnalytics';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class GoldPartner extends BasicComponent {
  constructor(props){
     super(props);
     this.state={
      modalObject:{},
      loadingObject:{},
      roleType:'金伙伴',
      userId:'',
      name:'',
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
      // this.msgShort("用户失效，请重新登录13");
      Actions.Login({})
    })
  }
  componentWillMount(){
    this._loadUser();
  }

  _submit(){
    let name = this.state.name
    if(!name) {
      this.msgShort('请输入您的姓名！')
      return
    }

    let user ={
      "roleType" : this.state.roleType,
      "id" : this.state.userId,
      "name" : name
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
    UMengAnalytics.onEvent('personal_role_partner_submit');
  }
  render() {
    return (
      <View style={[styles.mainList]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <Title isLeftShow={true} backColor={true} isRightBtnShow={false} title={'金伙伴'}/>
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
        <TouchableHighlight style={[styles.listBtn,styles.positionBottom20]}  underlayColor="#3a8ff3" onPress={() => this._submit()}>
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
AppRegistry.registerComponent('goldPartner', () => goldPartner);
