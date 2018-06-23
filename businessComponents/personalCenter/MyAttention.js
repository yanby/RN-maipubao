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
import {styles} from '../../styles/personalCenter/PersonalIndex';
import ListBasicComponent from '../basic/ListBasicComponent';
import { NiceList } from '../../commonComponents/niceList/NiceList';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import AttentionListItem from '../basic/AttentionListItem';
import ShopListItem from '../project/ShopListItem';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class MyAttention extends ListBasicComponent {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let data = [];
    this.state={
      selected:0,
      modalObject:{},
      loadingObject:{},
      dataSource: ds.cloneWithRows(data),
      resultVisible:false,
      month:[],
      year:this.props.year,
      storkeyProject: keys.attentionProjectList,
      remoteUrlProject:null,
      storkeyShop: keys.attentionShopList,
      remoteUrlShop: null,
    };
  }

  _loadProject(){
    storage.load({key: keys.currentUser}).then(currentUser => {
      this.setState({remoteUrlProject:apis.attentionProjectList + '?userId=' + currentUser.id +'&random='+Math.random()});
    }).catch(err => {
      Actions.Login({})
    })
  }

  _loadShop(){
    storage.load({key: keys.currentUser}).then(currentUser => {
      this.setState({remoteUrlShop:apis.attentionShopList + '?userId=' + currentUser.id +'&random='+Math.random()});
    }).catch(err => {
      Actions.Login({})
    })
  }

  componentWillMount(){
    this._loadProject();
    storage.save({
        key: keys.currentShop,
        data: 0,
        expires: null
    });
  }
  componentWillReceiveProps(nextprops){
    this._loadProject();
    this._loadShop();
  }
  _onTabPress(index){
    this.setState({
      selected:index
    });
    if(index == 1 && this.state.remoteUrlShop == null){
      this._loadShop();
    }
    storage.save({
        key: keys.currentShop,
        data: index,
        expires: null
    });

  }

  _renderProject(){
    if(this.state.selected === 0){
      if(this.state.remoteUrlProject != null){
        return <NiceList renderItem={(rowData)=><AttentionListItem {...rowData} />}
        noDataInfo={'您还没有关注任何项目，点击项目去看看吧'}
        contentContainerStyle={styles.list}
        storkey={this.state.storkeyProject}
        remoteUrl={this.state.remoteUrlProject}
        isNeedLoading={true} />
      }else{
        return null
      }
    }else{
      if(this.state.remoteUrlShop != null){
        return <NiceList renderItem={(rowData)=><ShopListItem {...rowData} />}
        noDataInfo={'您还没有关注任何商铺，点击商铺去看看吧'}
        contentContainerStyle={styles.list}
        storkey={this.state.storkeyShop}
        remoteUrl={this.state.remoteUrlShop}
        isNeedLoading={true} />
      }else{
        return null
      }
    }

  }

  render() {

    return (
      <View style={styles.mainView}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
      <Title isLeftShow={true} backColor={true} isRightBtnShow={true} title={'我的关注'} rightChoose={true} btnText={'编辑'} urlTitle={'EditAttention'}/>
      <View style={styles.tabView}>
            <SegmentedControlTab borderRadius={0} tabsContainerStyle={styles.tabsContainerStyle}
                tabStyle={styles.tabStyle} tabTextStyle={[styles.tabTextStyle,fonts.bodyText_Black]}
                activeTabStyle={styles.activeTabStyle} activeTabTextStyle={[fonts.bodyText_Black,styles.activeTabTextStyle]}
                selectedIndex={this.state.selected} values={['项目', '商铺']}
                onTabPress= {index => this._onTabPress(index)}/>
      </View>

      {this._renderProject()}
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
AppRegistry.registerComponent('MyAttention', () => MyAttention);
