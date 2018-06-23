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
export default class DefaultCardList extends ListBasicComponent {
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
      storkey:keys.getBankList,
      checkArrary:[],
      reload:true
    };
  }

  _loadData(){
    storage.load({key: keys.currentUser}).then(currentUser => {
      this.setState({remoteUrl:apis.getBankList + '?userId=' + currentUser.id + '&sort=defaultFlag,desc'});
    })
  }
  _setDefault(){
    if(this.state.checkArrary.length ==0){
      this.msgShort("请选择需要设定默认的银行卡");
      return
    }
    storage.load({
      key: keys.bankSetDefault,
      syncInBackground: false,
      syncParams: {
	       url: apis.bankSetDefault +'?id=' + this.state.checkArrary[0]
      }
    }).then(ret => {
      if(ret.status == 200){
        Actions.pop({refresh:{random:Math.random()}})
      }else{
        this.msgShort("设置失败");
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
            <NiceEditList isMutex={true}
            returnCheckArrary={(arrary)=>{this.setState({checkArrary:arrary})}}
            renderItem={(rowData,selectIndexArrary,rowSelect)=>
              <UnbindCardListItem {...rowData} selectIndexArrary={selectIndexArrary} rowSelect={(index)=>{rowSelect(index)}}  />}
              contentContainerStyle={styles.list}
              remoteUrl={this.state.remoteUrl}
              storkey={this.state.storkey}
              isNeedLoading={true}/>
          : null
          }
            <View style={styles.btnView}>
                  <TouchableHighlight underlayColor="transparent" underlayColor="transparent" onPress={()=>{this._setDefault()}}>
                  <View style={styles.btn}>
                        <Text style={[fonts.bodyText_Gray]}>确定</Text>
                  </View>
                  </TouchableHighlight>
                  <TouchableHighlight underlayColor="transparent" underlayColor="transparent" onPress={()=>Actions.pop({})}>
                        <View style={styles.btn}>
                              <Text style={[fonts.bodyText_Gray]}>取消</Text>
                        </View>
                  </TouchableHighlight>
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
AppRegistry.registerComponent('DefaultCardList', () => DefaultCardList);
