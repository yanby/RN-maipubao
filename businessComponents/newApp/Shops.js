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
  Linking,
  ScrollView,
  Animated,
  Easing
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/newApp/NewIndex';
import Swiper from 'react-native-swiper';
import ProspectingListItem from './ProspectingListItem';
import SectionHeader from '../data/SectionHeader';
import BasicComponent from '../basic/BasicComponent';
import {cityData} from '../data/CityData'
import CitySelect from '../../commonComponents/city/CitySelect';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import CustomTabBar from '../../commonComponents/tabBar/CustomTabBar1';
import { NiceList } from '../../commonComponents/niceList/NiceList';
import { apis, staticSite,currentVersion } from '../../systemComponents/Remote/ApiStorage';
import { checkVersion,getRemoteVersion,updateBasicVersion } from '../../systemComponents/VersionControl/VersionApp';


import { UMengAnalytics } from '../../commonComponents/umeng/UMAnalytics';
import AppMessageCenter from '../../systemComponents/routerCenter/AppMessageCenter';

const Permissions = require('react-native-permissions');

var { NativeAppEventEmitter } = require('react-native');
var receiveRemoteNotificationSub;
var clickRemoteNotificationSub;
export default class MyIndex extends BasicComponent {

  constructor(props){
     super(props);
     this.state={
      modalObject:{},
      loadingObject:{},
     }
   }

















  render() {
    return (
      <View style={styles.container}>
            <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true}/>
            <ScrollView style={styles.scrollView} >
            <Text>ghjjhg</Text>
            </ScrollView>

            <CustomTabBar checkIndex={1} />
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
AppRegistry.registerComponent('MyIndex', () => personalIndex);
