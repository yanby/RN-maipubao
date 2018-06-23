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
  ListView,
  ScrollView
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/personalCenter/ManageCardList';

import { NiceList } from '../../commonComponents/niceList/NiceList';
import ListBasicComponent from '../basic/ListBasicComponent';
import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import ManageCardListItem from './ManageCardListItem';
export default class ManageCardList extends ListBasicComponent {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let data = [];
    this.state={
      modalObject:{},
      loadingObject:{},
      dataSource: ds.cloneWithRows(data),
      bank:'',
      totalCount:0,
      resultVisible:false,
      remoteUrl: null,
      storkey:keys.getBankList
    };
  }

  _loadData(){
    storage.load({key: keys.currentUser}).then(currentUser => {
      this.setState({remoteUrl:apis.getBankList + '?userId=' + currentUser.id + '&sort=defaultFlag,desc'});
    })
  }

  componentWillReceiveProps(nextProps){
    storage.load({key: keys.currentUser}).then(currentUser => {
      this.setState({remoteUrl:apis.getBankList + '?userId=' + currentUser.id + '&sort=defaultFlag,desc&randorm='+nextProps.randorm});
    })
  }

  componentWillMount(){
    this._loadData();
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={false}/>
            <ScrollView>
            {
              this.state.remoteUrl != null ?
              <NiceList isShowEmptyInfo={false} normalList={false} renderItem={(rowData)=><ManageCardListItem {...rowData} />}
                getTotalCount = {(ret)=>{this.setState({totalCount:ret})}}
                contentContainerStyle={styles.list}
                remoteUrl={this.state.remoteUrl}
                storkey={this.state.storkey}
                isNeedLoading={true}/>
            : null}
            {
              this.state.totalCount < 5 ?
            <TouchableHighlight underlayColor="transparent" underlayColor="transparent" onPress={()=>Actions.BindingBankCard({})}>
                  <View style={styles.btn}>
                        <Image style={styles.icon1} source={require('../../images/add.png')}/>
                        <View style={styles.text}><Text style={fonts.t2_Gray}>添加银行卡</Text></View>
                        <Image style={styles.icon2} source={require('../../images/more.png')}/>
                  </View>
            </TouchableHighlight>
            : null}
            </ScrollView>
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
AppRegistry.registerComponent('ManageCardList', () => ManageCardList);
