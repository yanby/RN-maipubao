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
  ListView
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/personalCenter/Memberlist';
import ListBasicComponent from '../basic/ListBasicComponent';
import { NiceList } from '../../commonComponents/niceList/NiceList';
import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import MemberListItem from './MemberListItem';
export default class MemberCompany extends ListBasicComponent {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let data = [];
    this.state={
      modalObject:{},
      loadingObject:{},
      dataSource: ds.cloneWithRows(data),
      resultVisible:false,
      remoteUrl: null,
      storkey:keys.getTeamBusinessList,
      totalCount:0,
      userId:'',
    };
  }

  _loadData(){
    storage.load({key: keys.currentUser}).then(currentUser => {
      this.setState({
        userId:currentUser.id,
        remoteUrl:apis.getTeamBusinessList + '?id=' + currentUser.id
      });
    }).catch(err => {
      Actions.Login({})
    })
  }
  _unbind(){
    this.confirm(
      {
        ok:{
          text:'确认',
          click:()=>{
            storage.load({
              key: keys.getOneUser,
              syncInBackground: false,
              syncParams: {
        	       url: apis.unbindTeam + '?userId=' + this.state.userId
              }
            }).then(ret => {
              if(ret.status == 200){
                return ret.json();
              }else{
                return Promise.reject('404')
              }
            }).then(retJson=>{
              if(retJson){
                Actions.PersonalIndex({})
              }
            }).catch((err)=>{
              if (err === '404') {
                Actions.replace('Login',{sourceFlag:'PersonalIndex'})
              }
            })
          }
        },
        no:{
          text:'取消',
          click:()=>{
          }
        },
        text:'解散组织？'
      })
  }
  componentWillMount(){
    this._loadData();
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content"translucent={false}/>
      <View style={[styles.nav]}>
            <TouchableHighlight style={[styles.navLeftIcon]} underlayColor="transparent" onPress={()=>{Actions.pop({})}}>
                  <Image source={require('../../images/back.png')}></Image>
            </TouchableHighlight>
            <View style={[styles.navTitle]}>
                  <Text style={[fonts.t2_Black]}>我的公司</Text>
            </View>
            {
              this.state.totalCount == 1 ?
            <TouchableHighlight style={[styles.navRightText]} underlayColor="transparent" underlayColor="transparent" onPress={()=>this._unbind({})}>
                        <Text style={[fonts.btnText_Gray]}>解散</Text>
            </TouchableHighlight>
            :null}
      </View>
      {
        this.state.remoteUrl != null ?
        <NiceList renderItem={(rowData)=><MemberListItem comeFlag={true} {...rowData} />}
          getTotalCount = {(ret)=>{this.setState({totalCount:ret})}}
          contentContainerStyle={styles.list}
          remoteUrl={this.state.remoteUrl}
          storkey={this.state.storkey}
          isNeedLoading={true}/>
      : null}
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
AppRegistry.registerComponent('MemberCompany', () => MemberCompany);
