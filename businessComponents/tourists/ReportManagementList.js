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
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/tourists/ReportManagement';
import {apis} from '../../systemComponents/Remote/ApiStorage';
import BasicComponent from '../basic/BasicComponent';
import ReportManagementItem from './ReportManagementItem';
import BusinessProjectCustomItem from './BusinessProjectCustomItem';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { Actions,ActionConst } from 'react-native-router-flux';
import TabNavigator from 'react-native-tab-navigator';
import { NiceList } from '../../commonComponents/niceList/NiceList';
export default class ReportManagementList extends BasicComponent {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      selected:0,
      selectedTab: 'home',
      projectId: this.props.projectId,
      storkey:'reportManagementList'
    };
  }
  renderNavItem(flag){
    if ('home' === flag&&this.state.selectedTab===flag) {
      return (
        <View style={[styles.main]}>
        <NiceList renderItem={(rowData)=><ReportManagementItem {...rowData} needAudit={false} failed={false} />} contentContainerStyle={styles.list}
        remoteUrl={apis.reportManagementList+'?projectId='+this.state.projectId+'&lastStatus=报备成功&flowStatus=报备成功'} storkey={this.state.storkey} />

        </View>
      )
    }else if ('profile1' === flag&&this.state.selectedTab===flag) {
      return (
        <View style={[styles.main]}>
        <NiceList renderItem={(rowData)=><ReportManagementItem {...rowData} needAudit={true} failed={false}/>} contentContainerStyle={styles.list}
        remoteUrl={apis.reportManagementList+'?projectId='+this.state.projectId+'&lastStatus=报备提交&flowStatus=报备提交'} storkey={this.state.storkey} />

        </View>
      )
    }else if ('profile2' === flag&&this.state.selectedTab===flag){
      return (
        <View style={[styles.main]}>
        <NiceList renderItem={(rowData)=><ReportManagementItem {...rowData} needAudit={false} failed={true} />} contentContainerStyle={styles.list}
        remoteUrl={apis.reportManagementList+'?projectId='+this.state.projectId+'&lastStatus=报备失败&flowStatus=报备失败'} storkey={this.state.storkey} />

        </View>
      )
    }else {
      return null;
    }
  }
  render() {
    return (
      <View style={{flex:1}}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <TabNavigator  tabBarStyle={styles.tabView}>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'home'} title="待到访"
                tabStyle={styles.tabBar} titleStyle={[fonts.t3_Gray]}
                onPress={() => this.setState({ selectedTab: 'home' })}>
                {
                  this.renderNavItem('home')
                }
              </TabNavigator.Item>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'profile1'} title="待审核"
                tabStyle={styles.tabBar} titleStyle={fonts.t3_Gray}
                onPress={() => this.setState({ selectedTab: 'profile1' })}>
                {
                  this.renderNavItem('profile1')
                }
              </TabNavigator.Item>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'profile2'} title="审核未通过"
                tabStyle={styles.tabBar} titleStyle={fonts.t3_Gray}
                onPress={() => this.setState({ selectedTab: 'profile2' })}>
                {
                  this.renderNavItem('profile2')
                }
              </TabNavigator.Item>
        </TabNavigator>
      </View>

    );
  }
}
