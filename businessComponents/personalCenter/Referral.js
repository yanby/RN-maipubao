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
var moment = require('moment');
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/commonStyle/ListForm';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { apis } from '../../systemComponents/Remote/ApiStorage';
import BasicComponent from '../basic/BasicComponent';
export default class BindingTeam extends BasicComponent {
  constructor(props){
     super(props);
     this.state={
       modalObject:{},
       loadingObject:{},
       hisId: this.props.hisDetail.id,
       name:this.props.hisDetail.name,
       account:this.props.hisDetail.account,
       recommenderNumber : this.props.hisDetail.recommenderNumber ? this.props.hisDetail.recommenderNumber : 0,
       AccountText:this.props.hisDetail.accountText,
       prompt:"您目前已建立推荐关系，无法再建立推荐关系！",
     }
   }
   componentWillMount(){
     let userType = this.props.userType;
     let prompt = this.state.prompt;
     if(userType == 2){
       prompt = '别调皮，请不要扫描自己哦！';
     }else if(userType == 3){
       prompt = '亲，由于您之前已建立推荐关系，故无法再建立推荐关系哦！';
     }
     this.setState({prompt:prompt});
   }
  _submit(){

    storage.load({key: keys.currentUser}).then(currentUser => {
      let userId = currentUser.id;
      let recommenderId = this.state.hisId;
      let recommendPhone = this.state.account;
      let nowTime = new Date().getTime();

      storage.load({
        key: keys.userPatch,
        syncInBackground: false,
        syncParams: {
          url: apis.users+'/'+userId,
          body:{"recommenderId":recommenderId,"recommendPhone":recommendPhone,"recommendTime":nowTime},
        }
      }).then(ret => {
        if(ret.status == 200){

            this.msgShort('推荐成功');
            let timer = setTimeout(()=>{
              Actions.reset('Index',{});
              clearTimeout(timer);
            },2000);

        } else {
          this.msgShort('请重新扫描二维码！');
          let timer = setTimeout(()=>{
            Actions.reset('Index',{});
            clearTimeout(timer);
          },2000);

        }

      }).catch(err => {
        this.msgShort('推荐失败,请重新扫码！')
        let timer = setTimeout(()=>{
          Actions.reset('Index',{});
          clearTimeout(timer);
        },2000);

      })
    })
  }

  render() {
    return (
      <View style={[styles.mainList]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        {
          this.props.userType == 1?
          <View style={{flex:1}}>
            <View style={[styles.listView]}>
                  <View style={[styles.bindcompanyText]}>
                        <Text style={[fonts.bodyText_Black]}>推荐人姓名：</Text>
                  </View>
                  <View style={[styles.bindcompany]}>
                        <Text style={[fonts.bodyText_Gray]}>{this.state.name}</Text>
                  </View>
            </View>
            <View style={[styles.listView]}>
                  <View style={[styles.bindcompanyText]}>
                        <Text style={[fonts.bodyText_Black]}>推荐手机号：</Text>
                  </View>
                  <View style={[styles.bindcompany]}>
                        <Text style={[fonts.bodyText_Gray]}>{this.state.AccountText}</Text>
                  </View>
            </View>
            <TouchableHighlight style={[styles.listBtn,styles.positionBottom70]} onPress={()=>this._submit()}>
              <Text style={[fonts.btnText_white]}>确认</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.listNoBtn,styles.positionBottom20]} onPress={()=>Actions.reset('Index',{})}>
              <Text style={[fonts.btnText_white]}>取消</Text>
            </TouchableHighlight>
          </View>
          :
          <View style={{flex:1}}>
            <View style={[styles.textMi]}>
                  <Text style={[styles.textMiTxt,fonts.bodyText_Gray]}>{this.state.prompt}</Text>
            </View>
            <TouchableHighlight style={[styles.listBtn,styles.positionBottom20]} onPress={()=>Actions.reset('Index',{})}>
                  <Text style={[fonts.btnText_white]}>确认</Text>
            </TouchableHighlight>
          </View>
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
AppRegistry.registerComponent('bindingTeam', () => bindingTeam);
