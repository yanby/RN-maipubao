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
} from 'react-native';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/community/OfflineActivit';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import BrListItem from './BrListItem';
import CoListItem from './CoListItem';
import { Actions,ActionConst } from 'react-native-router-flux';

import ListBasicComponent from '../basic/ListBasicComponent';
import { NiceList } from '../../commonComponents/niceList/NiceList';

import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';

export default class CooperativeAlliance extends ListBasicComponent {
  constructor(props){
    super(props);
    this.state={
      selected:0,
      modalObject:{},
      loadingObject:{},
      storkeyBrand: keys.brandsK,
      remoteUrlBrand: apis.brandsK + '?sort=sort,desc',
      storkeyCompany: keys.companiesK,
      remoteUrlCompany: null,
      brandAmount: null,
      companyAmount: null
    };
  }

  componentWillMount(){
  }

  _onTabPress(index){
    this.setState({
      selected:index
    });
    if (index === 1) {
      if(!this.state.remoteUrlCompany){
        this.setState({
          remoteUrlCompany: apis.companiesK + '?sort=sort,desc'
        })
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
      <View style={styles.tabView}>
            <SegmentedControlTab borderRadius={0} tabsContainerStyle={styles.tabsContainerStyle}
                tabStyle={styles.tabStyle} tabTextStyle={[styles.tabTextStyle,fonts.bodyText_Black]}
                activeTabStyle={styles.activeTabStyle} activeTabTextStyle={[fonts.bodyText_Black,styles.activeTabTextStyle]}
                selectedIndex={this.state.selected} values={['品牌', '公司']}
                onTabPress= {index => this._onTabPress(index)}/>
            <TouchableHighlight style={styles.backView} underlayColor="transparent" onPress={()=>Actions.pop({})}>
                      <Image  source={require('../../images/back.png')}/>
            </TouchableHighlight>
      </View>
      {
        this.state.selected == 0 ?
          <View style={styles.container}>
            <Text style={[styles.allianceTextRest,fonts.tinyText_Gray]}>合作品牌有{this.state.brandAmount}个</Text>
            {
              this.state.remoteUrlBrand ?
              <NiceList isNeedLoading={true} getTotalCount={(count)=>{this.setState({brandAmount:count})}} renderItem={(rowData)=><BrListItem {...rowData} />} contentContainerStyle={styles.list} storkey={this.state.storkeyBrand} remoteUrl={this.state.remoteUrlBrand} customListSourceFlag="brands" />
              :null
            }
          </View>
        :
          <View style={styles.container}>
            <Text style={[styles.allianceTextRest,fonts.tinyText_Gray]}>合作公司有{this.state.companyAmount}个</Text>
            {
              this.state.remoteUrlCompany ?
              <NiceList isNeedLoading={true} getTotalCount={(count)=>{this.setState({companyAmount:count})}} renderItem={(rowData)=><CoListItem {...rowData} />} contentContainerStyle={styles.list} storkey={this.state.storkeyCompany} remoteUrl={this.state.remoteUrlCompany} customListSourceFlag="companies" />
              :null
            }
          </View>
      }
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
