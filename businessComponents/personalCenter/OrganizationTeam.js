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
import { apis,sites } from '../../systemComponents/Remote/ApiStorage';
export default class OrganizationTeam extends BasicComponent {
  constructor(props){
     super(props);
     this.state={
      modalObject:{},
      loadingObject:{},
      teamName : '',
  		teamId : '',
  		userName : '',
  		userPhone : '',
  		status : '',
      resJson:{},
     }
   }
   _loadData(){
     storage.load({key: keys.currentUser}).then(currentUser => {
       this.openLoading('正在加载...');
       storage.load({
         key: keys.getMyTeam,
         syncInBackground: false,
         syncParams: {
   	       url: apis.getMyTeam +'?userId=' +currentUser.id
         }
       }).then(ret => {
         this.closeLoading();
         if(ret.status == 200){
           return ret.json();
         }else{
           Actions.Login({})
         };
       }).then(retJson=>{
         this.setState({
           resJson:retJson,
           teamName:retJson.teamName,
           teamId:retJson.teamId,
           userName:retJson.userName,
           userPhone:retJson.userPhone,
           status:retJson.status
         })
       })
     }).catch(err => {
       this.closeLoading();
       Actions.Login({})
     })
   }
   componentWillMount(){
     this._loadData();
   }

  render() {
    return (

      <View style={styles.mainView}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
            <View style={[styles.nav]}>
                  <TouchableHighlight style={[styles.backIcon]} underlayColor="transparent" onPress={()=>Actions.PersonalIndex({})}>
                        <Image source={require('../../images/back.png')}></Image>
                  </TouchableHighlight>
                  <View style={[styles.navTitle]}>
                        <Text style={[fonts.t2_Black]}>我的组织</Text>
                  </View>
                  {this.state.status==='解绑中'?
                  <TouchableHighlight style={[styles.navLeft]}>
                        <Text style={[fonts.bodyText_Black]}>解绑</Text>
                  </TouchableHighlight>
                  :
                  <TouchableHighlight style={[styles.navLeft]} underlayColor="transparent" onPress={()=>Actions.UnbindTeam({json:this.state.resJson})}>
                        <Text style={[fonts.bodyText_Black]}>解绑</Text>
                  </TouchableHighlight>
                  }
            </View>
            <View style={[styles.listView]}>
                  <View style={[styles.listViewText]}>
                  <Text style={[fonts.bodyText_Black]}>团队名称:</Text>
                  </View>
                  <View style={[styles.bindcompany]}>
                        <Text style={[fonts.bodyText_Gray]}>{this.state.teamName}</Text>
                  </View>
            </View>
            <View style={[styles.listView]}>
                  <View style={[styles.listViewText]}>
                  <Text style={[fonts.bodyText_Black]}>联系人:</Text>
                  </View>
                  <View style={[styles.bindcompany]}>
                        <Text style={[fonts.bodyText_Gray]}>{this.state.userName}</Text>
                  </View>
            </View>
            <View style={[styles.listView]}>
                  <View style={[styles.listViewText]}>
                  <Text style={[fonts.bodyText_Black]}>联系方式:</Text>
                  </View>
                  <View style={[styles.bindcompany]}>
                        <Text style={[fonts.bodyText_Gray]}>{this.state.userPhone}</Text>
                  </View>
            </View>
            <View style={[styles.listView]}>
                  <View style={[styles.listViewText]}>
                  <Text style={[fonts.bodyText_Black]}>状态:</Text>
                  </View>
                  <View style={[styles.bindcompany]}>
                        <Text style={[fonts.bodyText_Gray]}>{this.state.status}</Text>
                  </View>
            </View>
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
AppRegistry.registerComponent('OrganizationTeam', () => OrganizationTeam);
