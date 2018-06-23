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
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import ReportManagementList from './ReportManagementList';
import BusinessProjectCustomItem from './BusinessProjectCustomItem';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import CustomList from './CustomList.js';
import { Actions,ActionConst } from 'react-native-router-flux';
import TabNavigator from 'react-native-tab-navigator';
import { NiceList } from '../../commonComponents/niceList/NiceList';

export default class ReportManagement extends Component {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      selected:this.props.selectTabIndex?this.props.selectTabIndex:0,
      selectedTab: "home",
      storkey: keys.customerListByProjectId,
      remoteUrl: apis.findBusinessByProjectId + '?projectId=' + this.props.id,
      businessRefreshFlag:'',
      customRefreshFlag:''
    };
  }

  componentWillReceiveProps(nextProps){
    if (nextProps) {
      if (nextProps.selectTabIndex==1) {
        this.setState({customRefreshFlag:Math.random(),selected:nextProps.selectTabIndex})
      }else if(nextProps.selectTabIndex==0){
        this.setState({businessRefreshFlag:Math.random(),selected:nextProps.selectTabIndex})
      }
    }
  }

  _onTabPress(index){
    this.setState({selected:index});
    if (index === 0) {
      this.setState({selected:0})
    }else{
      this.setState({selected:1})
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <View style={styles.tabViewRest}>
              <SegmentedControlTab borderRadius={0} tabsContainerStyle={styles.tabsContainerStyle}
              tabStyle={styles.tabStyle} tabTextStyle={[styles.tabTextStyle,fonts.bodyText_Black]}
              activeTabStyle={styles.activeTabStyle} activeTabTextStyle={[fonts.bodyText_Black,styles.activeTabTextStyle]}
              selectedIndex={this.state.selected} values={['报备管理', '项目客户']}
              onTabPress= {index => this._onTabPress(index)}/>
              <TouchableHighlight style={styles.backView} underlayColor="transparent" onPress={()=>Actions.reset('MyProject',{})}>
                    <Image  source={require('../../images/back.png')}/>
              </TouchableHighlight>
        </View>
        {this.state.selected === 0 ?
            <ReportManagementList projectId={this.props.id} isNeedRefresh={this.state.businessRefreshFlag} />
          : null
        }
        {this.state.selected === 1 ?
             //<NiceList renderItem={(rowData)=><BusinessProjectCustomItem projectId={this.props.id} {...rowData} />} contentContainerStyle={styles.list} remoteUrl={this.state.remoteUrl} storkey={this.state.storkey}  isNeedLoading={true} />
            <CustomList projectId={this.props.id} isNeedRefresh={this.state.customRefreshFlag}></CustomList>
          : null
        }
      </View>
    );
  }
}
