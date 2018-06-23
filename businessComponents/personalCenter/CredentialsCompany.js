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
import BasicComponent from '../basic/BasicComponent';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { apis,sites, staticSite} from '../../systemComponents/Remote/ApiStorage';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class CredentialsCompany extends BasicComponent {
  constructor(props){
     super(props);
     this.state={
      modalObject:{},
      loadingObject:{},
      companyName:'',
      companyLicence:'',
      companyPhone:'',
      name:''
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
          this.setState({
            companyName:retJson.companyName,
            companyPhone:retJson.companyPhone,
            companyLicence:retJson.companyLicence,
            name:retJson.name
          });
        }
      })
    }).catch(err => {
      // this.msgShort("用户失效，请重新登录5");
      Actions.Login({})
    })
  }

  componentWillMount(){
    this._loadData()
  }

  render() {
    return (
      <View style={[styles.mainList]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <Title isLeftShow={true} backColor={true} isRightBtnShow={false} title={'认证成功'}/>
        <View style={[styles.listView]}>
              <View style={[styles.listViewText]}>
                    <Text style={[fonts.bodyText_Black]}>当前角色：</Text>
              </View>
              <View style={[styles.bindcompany]}>
                    <Text style={fonts.bodyText_Gray}>公司类</Text>
              </View>
        </View>
        <View style={[styles.listView]}>
              <View style={[styles.listViewText]}>
                    <Text style={[fonts.bodyText_Black]}>公司名称：</Text>
              </View>
              <View style={[styles.bindcompany]}>
                    <Text style={fonts.bodyText_Gray}>{this.state.companyName}</Text>
              </View>
        </View>
        <View style={[styles.listView]}>
              <View style={[styles.listViewText]}>
                    <Text style={[fonts.bodyText_Black]}>姓名：</Text>
              </View>
              <View style={[styles.bindcompany]}>
                    <Text style={fonts.bodyText_Gray}>{this.state.name}</Text>
              </View>
        </View>
        <View style={[styles.listView]}>
              <View style={[styles.listViewText]}>
                    <Text style={[fonts.bodyText_Black]}>手机号：</Text>
              </View>
              <View style={[styles.bindcompany]}>
                    <Text style={fonts.bodyText_Gray}>{this.state.companyPhone}</Text>
              </View>
        </View>
        <View style={[styles.listTextRow,styles.marginLeft15,styles.marginTop10]}>
          <Text style={[fonts.bodyText_Black]}>营业执照：</Text>
          <View style={[styles.listImg,styles.flex1]}>
            <Image style={{width:100,height:100}} source={{uri: staticSite + this.state.companyLicence}}></Image>
          </View>
        </View>
      </View>
    );
  }
}
AppRegistry.registerComponent('credentialsCompany', () => credentialsCompany);
