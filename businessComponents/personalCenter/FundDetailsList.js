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
import {styles} from '../../styles/personalCenter/FundDetailsList';
import { NiceList } from '../../commonComponents/niceList/NiceList';

import ListBasicComponent from '../basic/ListBasicComponent';
import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import FundDetailsListItem from './FundDetailsListItem';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class FundDetailsList extends ListBasicComponent {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let data = [];
    this.state={
      modalObject:{},
      loadingObject:{},
      dataSource: ds.cloneWithRows(data),
      incomeTotal:0.00,
		  costTotal:0.00,
      resultVisible:false,
      remoteUrl: null,
      storkey:keys.getBalanceDetail
    };
  }

  _loadData(){
    storage.load({key: keys.currentUser}).then(currentUser => {
      storage.load({
        key: keys.getBalanceTotal,
        syncInBackground: false,
        syncParams: {
          url: apis.getBalanceTotal +'?userId=' + currentUser.id
        }
      }).then(ret => {
        if(ret.status == 200){
          return ret.json();
        }else{
          return Promise.reject('error')
        };
      }).then(retJson=>{
        this.setState({
          incomeTotal:retJson.incomeTotal,
          costTotal:retJson.costTotal,
          remoteUrl:apis.getBalanceDetail + '?userId=' + currentUser.id + '&sort=createTime,desc'
        });
      })
    }).catch(err => {
      // this.msgShort("用户失效，请重新登录12");
      Actions.Login({})
    })
  }
  componentWillMount(){
    this._loadData();
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
      <Title isLeftShow={true} backColor={true} isRightBtnShow={false} title={'资金明细'}/>
      <View style={styles.viewTop}>
            <Text style={[fonts.hintText_Gray,styles.viewTopText]}>总收入¥{this.state.incomeTotal?this.state.incomeTotal.toFixed(2):'0.00'}</Text>
            <Text style={[fonts.hintText_Gray,styles.viewTopText]}>总支出¥{this.state.costTotal?this.state.costTotal.toFixed(2):'0.00'}</Text>
      </View>
      {
        this.state.remoteUrl != null ?
        <NiceList renderItem={(rowData)=><FundDetailsListItem {...rowData} />}
          contentContainerStyle={styles.list}
          remoteUrl={this.state.remoteUrl}
          storkey={this.state.storkey}
          isNeedLoading={true}
          noDataFun={()=>{return <View style={styles.noCustomView}>
            <Image style={styles.noCustom} source={require('../../images/noCustom.png')}/>
            <Text style={fonts.btnText_Gray}>暂无数据</Text>
          </View>}}
          />
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
AppRegistry.registerComponent('FundDetailsList', () => FundDetailsList);
