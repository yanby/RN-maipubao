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
  ScrollView
} from 'react-native';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/personalCenter/MyOrgDetails';
import {nav} from '../../styles/commonStyle/nav';
import BasicComponent from '../basic/BasicComponent';
import { Actions,ActionConst } from 'react-native-router-flux';
import { NiceList } from '../../commonComponents/niceList/NiceList';
import { apis,sites,staticSite } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import MyOrgDeItem from './MyOrgDeItem';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class MyOrgDetailsList extends BasicComponent {
  constructor(props){
    super(props);
    this.state={
      selectedTab: "home",
      modalObject:{},
      loadingObject:{},
      remoteUrl: apis.getUserSignList + '?userId=' + this.props.userId+'&flag='+this.props.flag,
      storkey:keys.getUserSignList,
    };
  }

  render() {
    return (
      <View style={styles.main}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
            <Title isLeftShow={true} backColor={true} isRightBtnShow={false} title={'签约明细'}/>
            <View style={styles.viewMain1}>
                    <NiceList renderItem={(rowData)=><MyOrgDeItem flag={this.props.flag} {...rowData} />}
                      contentContainerStyle={styles.list}
                      remoteUrl={this.state.remoteUrl}
                      storkey={this.state.storkey}
                      isNeedLoading={true}/>
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
AppRegistry.registerComponent('MyOrgDetailsList', () => MyOrgDetailsList);
