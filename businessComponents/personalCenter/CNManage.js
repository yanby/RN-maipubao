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
import {styles} from '../../styles/personalCenter/CNManage';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import CooManageItem from './CooManageItem';
import NeedManageItem from './NeedManageItem';
import ListBasicComponent from '../basic/ListBasicComponent';
import { NiceList } from '../../commonComponents/niceList/NiceList';
import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class CNManage extends ListBasicComponent {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      resultVisible:false,
      storkeyDemand: keys.demandUserList,
      remoteUrlDemand: apis.demandUserList + '?userId=' + this.props.userId,
    };
  }
  render() {
    console.log(this.state.remoteUrlDemand);
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
      <Title isLeftShow={true} backColor={true} isRightBtnShow={false} title={'我的需求'}/>
      <View style={styles.container}>
        {
          this.state.remoteUrlDemand?
          <NiceList isNeedLoading={true}
          customListSourceFlag="demands"
          renderItem={(rowData)=><NeedManageItem {...rowData} />}
          contentContainerStyle={styles.list}
          storkey={this.state.storkeyDemand}
          remoteUrl={this.state.remoteUrlDemand}
          noDataFun={()=>{return <View style={styles.noCustomView}>
            <Image style={styles.noCustom} source={require('../../images/noCustom.png')}/>
            <Text style={fonts.btnText_Gray}>暂无数据</Text>
          </View>}}
          />
          :null
        }
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
