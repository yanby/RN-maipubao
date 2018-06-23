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
import {styles} from '../../styles/personalCenter/MessageEditList';
import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import ListBasicComponent from '../basic/ListBasicComponent';
import { NiceEditList } from '../../commonComponents/niceList/NiceEditList';
import MessageEditListItem from './MessageEditListItem';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class MessageEditList extends ListBasicComponent {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      remoteUrl: null,
      oriRemoteUrl: null,
      storkey:keys.userNotificationList,
      checkArrary:[],
      reload:true,
      userId:''
    };
  }

  _loadData(){
    storage.load({key: keys.currentUser}).then(currentUser => {
      this.setState({
        userId:currentUser.id,
        remoteUrl:apis.userNotificationList + '?userId=' + currentUser.id,
        oriRemoteUrl:apis.userNotificationList + '?userId=' + currentUser.id
      });
    }).catch(err => {
      Actions.replace('Login',{sourceFlag:'PersonalIndex'})
    })
  }
  componentWillMount(){
    this._loadData();
  }
  _del(){
    if(this.state.checkArrary.length ==0){
      this.msgShort("请选择需要删除的消息");
      return
    }
    this.state.checkArrary.map(
      (arrary,index)=>{
        storage.load({
          key: keys.userNotificationUpdate,
          syncInBackground: false,
          syncParams: {
    	       url: apis.userNotificationUpdate + '?id=' + arrary + '&userId=' + this.state.userId + '&flag=true'
          }
        }).then(ret => {
          if(ret.status == 200){
            return ret.json();
          }else{
            this.msgShort('删除异常');
          };
        }).then(retJson=>{
          if(retJson){
            if(index == this.state.checkArrary.length-1){
              this.msgShort('删除成功');
              let _url = this.state.oriRemoteUrl;
              this.setState({remoteUrl:_url+'&_random_='+Math.random()});
              this.setState({checkArrary:[]});
            }
          }else{
            this.msgShort('删除异常');
          }
        }).catch(err => {
          this.msgShort('删除异常');
          return
        })
      }
    )
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
      <Title isLeftShow={true} backColor={true} isRightBtnShow={true} rightChoose={true} title={'消息列表'} btnText={'完成'} urlTitle={'MessageList'}/>
      {
        this.state.remoteUrl != null ?
          <NiceEditList isShowEmptyInfo={false} normalList={false}  isMutex={false}
          returnCheckArrary={(arrary)=>{this.setState({checkArrary:arrary})}}
          renderItem={(rowData,selectIndexArrary,rowSelect)=>
            <MessageEditListItem {...rowData} selectIndexArrary={selectIndexArrary} rowSelect={(index)=>{rowSelect(index)}}  />}
            contentContainerStyle={styles.list}
            remoteUrl={this.state.remoteUrl}
            storkey={this.state.storkey}
            isNeedLoading={true}/>
      : null
      }
      <TouchableHighlight style={styles.touchBtn} underlayColor="#3a8ff3" onPress={()=>{this._del()}}>
         <Text style={[fonts.bodyText_white]}>删除</Text>
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
AppRegistry.registerComponent('MessageEditList', () => MessageEditList);
