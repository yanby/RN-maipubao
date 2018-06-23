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
import {styles} from '../../styles/personalCenter/UnbindCardList';
import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import ListBasicComponent from '../basic/ListBasicComponent';
import { NiceEditList } from '../../commonComponents/niceList/NiceEditList';
import UnbindCardListItem from './UnbindCardListItem';
export default class UnbindCardList extends ListBasicComponent {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let data = [];
    this.state={
      modalObject:{},
      loadingObject:{},
      dataSource: ds.cloneWithRows(data),
      bank:'',
      resultVisible:false,
      remoteUrl: null,
      oriRemoteUrl: null,
      storkey:keys.getBankList,
      checkArrary:[],
      totalCount:0,
      reload:true
    };
  }

  _loadData(){
    storage.load({key: keys.currentUser}).then(currentUser => {
      this.setState({
        remoteUrl:apis.getBankList + '?userId=' + currentUser.id + '&sort=defaultFlag,desc',
        oriRemoteUrl:apis.getBankList + '?userId=' + currentUser.id + '&sort=defaultFlag,desc'
      });
    })
  }
  _unBind(){
    if(this.state.checkArrary.length ==0){
      this.msgShort("请选择需要解绑的银行卡");
      return
    }
    storage.load({
      key: keys.unBindBank,
      syncInBackground: false,
      syncParams: {
	       url: apis.unBindBank + this.state.checkArrary[0]
      }
    }).then(ret => {
      if(ret.status == 204){
        this.msgShort("解绑成功");
        let _url = this.state.oriRemoteUrl;
        this.setState({remoteUrl:_url+'&_random_='+Math.random()});
      }else{
        this.msgShort("解绑失败");
      };
    })
  }

  componentWillMount(){
    this._loadData();
  }
  render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={false}/>
            {
              this.state.remoteUrl != null ?
              <NiceEditList isShowEmptyInfo={false} normalList={false}  isMutex={true}
              getTotalCount = {(ret)=>{this.setState({totalCount:ret})}}
              returnCheckArrary={(arrary)=>{this.setState({checkArrary:arrary})}}
              renderItem={(rowData,selectIndexArrary,rowSelect)=>
                <UnbindCardListItem {...rowData} selectIndexArrary={selectIndexArrary} rowSelect={(index)=>{rowSelect(index)}}  />}
                contentContainerStyle={styles.list}
                remoteUrl={this.state.remoteUrl}
                storkey={this.state.storkey}
                isNeedLoading={true}/>
            : null
            }
            {
              this.state.totalCount > 0 ?
            <TouchableHighlight underlayColor="transparent" underlayColor="transparent" onPress={()=>{this._unBind()}}>
                  <View style={styles.btn}>
                        <Text style={[fonts.bodyText_Gray]}>解除绑定</Text>
                  </View>
            </TouchableHighlight>
          :null}
            <TouchableHighlight underlayColor="transparent" underlayColor="transparent" onPress={()=>Actions.ManageCardList({})}>
                  <View style={styles.btn}>
                        <Text style={[fonts.bodyText_Gray]}>取消</Text>
                  </View>
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
AppRegistry.registerComponent('UnbindCardList', () => UnbindCardList);
