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
import {styles} from '../../styles/personalCenter/MessageList';
import ListBasicComponent from '../basic/ListBasicComponent';
import { NiceList } from '../../commonComponents/niceList/NiceList';
import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import MessageListItem from './MessageListItem';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class MessageList extends ListBasicComponent {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      remoteUrl: null,
      userId:'',
      storkey:keys.userNotificationList
    };
  }

  _loadData(){
    storage.load({key: keys.currentUser}).then(currentUser => {
      this.setState({
        userId:currentUser.id,
        remoteUrl:apis.userNotificationList + '?userId=' + currentUser.id+'&random='+Math.random()
      });
    }).catch(err => {
      this.closeLoading();
      Actions.Login({})
    })
  }
  componentWillMount(){
    this._loadData();
  }
  componentWillReceiveProps(nextprops){
    this._loadData();
  }
  render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
      <Title isLeftShow={true} backColor={true} isRightBtnShow={true} rightChoose={true} title={'消息列表'} btnText={'编辑'} urlTitle={'MessageEditList'}/>
      {
        this.state.remoteUrl != null ?
        <NiceList renderItem={(rowData)=><MessageListItem userId={this.state.userId}  {...rowData} />}
          contentContainerStyle={styles.list}
          noDataInfo={'当前还没有短消息'}
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
AppRegistry.registerComponent('MessageList', () => MessageList);
