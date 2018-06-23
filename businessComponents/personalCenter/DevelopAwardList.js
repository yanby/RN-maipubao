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
import {styles} from '../../styles/personalCenter/DevelopAwardList';
import ListBasicComponent from '../basic/ListBasicComponent';
import { NiceList } from '../../commonComponents/niceList/NiceList';
import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import DevelopAwardListItem from './DevelopAwardListItem';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class DevelopAwardList extends ListBasicComponent {
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
      storkey:keys.getDevelopCommissionList
    };
  }

  _loadData(){
    storage.load({key: keys.currentUser}).then(currentUser => {
      this.setState({remoteUrl:apis.getDevelopCommissionList + '?id=' + currentUser.id});
    }).catch(err => {
      // this.shortmsg("用户失效，请重新登录6");
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
      <Title isLeftShow={true} backColor={true} isRightBtnShow={false} title={'发展奖励佣金'}/>
      {
        this.state.remoteUrl != null ?
        <NiceList renderItem={(rowData)=><DevelopAwardListItem {...rowData} />}
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
AppRegistry.registerComponent('DevelopAwardList', () => DevelopAwardList);
