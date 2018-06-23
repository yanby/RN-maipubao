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
import TabNavigator from 'react-native-tab-navigator';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/personalCenter/MyOrg';
import BasicComponent from '../basic/BasicComponent';
import { Actions,ActionConst } from 'react-native-router-flux';
import { NiceList } from '../../commonComponents/niceList/NiceList';
import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import MyOrgItem from './MyOrgItem';
export default class MyRecommend extends BasicComponent {
  constructor(props){
    super(props);
    this.state={
      selectedTab: this.props.selectedTab,
      modalObject:{},
      loadingObject:{},
      remoteUrl:this.props.selectedTab=="home"? apis.getRecommendList + '?userId=' + this.props.userId : apis.getDevelopList + '?userId='+this.props.userId,
      storkey:this.props.selectedTab=="home"? keys.getRecommendList : keys.getDevelopList,
      tabName:this.props.selectedTab=="home"?"累计推荐":"团队成员",
      flag:this.props.selectedTab=="home"?false:true,
      back:false,
    };
  }
  componentWillReceiveProps(nextProps){
    this.setState({remoteUrl:this.state.remoteUrl+"&randorm="+Math.random(),back:true});
  }
  _back(){
    if(this.state.back){
      Actions.pop({refresh:{random:Math.random()}});
    }else{
      Actions.pop({});
    }
  }
  render() {
    return (
      <View style={styles.main}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <View style={styles.nav}>
              <TouchableHighlight style={styles.navLeft}  underlayColor="transparent"  onPress={() => {this._back()}}>
                    <Image source={require('../../images/back.png')}/>
              </TouchableHighlight>
              <View style={styles.navCenter}>
                    <Text style={[fonts.t2_Black]}>{this.state.tabName}</Text>
              </View>
        </View>
        <View style={styles.listMain}>
            {
              this.state.remoteUrl != null?
              <NiceList renderItem={(rowData)=><MyOrgItem flag={this.state.flag} {...rowData} />}
                contentContainerStyle={styles.list}
                remoteUrl={this.state.remoteUrl}
                storkey={this.state.storkey}
                isNeedLoading={true}/>
              :null
            }
        </View>

      </View>
    );
  }
}
AppRegistry.registerComponent('MyRecommend', () => MyRecommend);
