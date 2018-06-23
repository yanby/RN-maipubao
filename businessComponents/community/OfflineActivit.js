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
} from 'react-native';
var moment = require('moment');
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/community/OfflineActivit';
import OfflineListItem from './OfflineListItem';
import ListBasicComponent from '../basic/ListBasicComponent';
import { NiceList } from '../../commonComponents/niceList/NiceList';
import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class OfflineActivit extends ListBasicComponent {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      remoteUrl:'',
      storkey:keys.newsList,
    };
  }
  async componentWillMount(){
    this.openLoading();
    storage.load({
      key: keys.OfflineActivitK,
      syncInBackground: false,
      syncParams: {
         url: apis.OfflineActivitK+'?type='+'活动' + '&mold=' + 'true',
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json();

      }else{
        this.msgShort('异常');
        this.closeLoading();
      };
    }).then(retJson=>{
      this.closeLoading();
      let remoteUrl = this.state.remoteUrl;
      this.setState({remoteUrl:apis.newsList+'?catId='+retJson[0].id})
   }).catch(err=>{
     this.closeLoading();
    //  this.msgShort('err');
   })
  }
  render() {
    return (
      <View style={styles.container}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
            <Title isLeftShow={true} backColor={true}  title={'线下活动'} >
            </Title>
            {
              this.state.remoteUrl&&this.state.remoteUrl.length>0?
              <NiceList renderItem={(rowData)=><OfflineListItem {...rowData} />}
              contentContainerStyle={styles.list}
              remoteUrl={this.state.remoteUrl}
              storkey={this.state.storkey}/>:null
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
