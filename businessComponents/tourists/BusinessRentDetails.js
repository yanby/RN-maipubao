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
import {styles} from '../../styles/tourists/BusinessRentDetails';
import {flow} from '../../styles/tourists/BusinessFlow';
import BusinessRentDetailsItem from './BusinessRentDetailsItem';
import BusinessHorizonLine from './BusinessHorizonLine';
import {Actions,ActionConst} from 'react-native-router-flux';
import {apis} from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';

var moment = require('moment');
import BasicComponent from '../basic/BasicComponent';
export default class BusinessRentDetails extends BasicComponent {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      fromProject:this.props.fromProject,
      businessId:this.props.businessId,
      businessFlowId:null,
      business:null,
      flows:null,
    };
  }

  componentWillMount(){
    this.openLoading();
    storage.load({
      key: keys.getBusinessDetail,
      syncInBackground: false,
      syncParams: {
         url: apis.getBusinessDetail + '?id=' + this.state.businessId
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json();
      }else{
        this.closeLoading();
        this.msgShort('请求异常');
      }
    }).then(retJson=>{
      if (retJson!=null) {
        this.closeLoading();
        this.setState({
          business:retJson,
          flows:this.getFlowText(retJson.businessFlows),
        });
      }
      else {
        this.closeLoading();
        this.msgShort('获取交易数据异常');
      }
    }).catch(err => {
      this.closeLoading();
      this.msgShort('获取交易请求异常');
    });
  }

  getFlowText(flows){
    let flowText=[];
    for (var i in flows) {
      flowText.push({
        type:flows[i].flowType,
        status:flows[i].flowStatus,
        date:flows[i].updateTime ? moment(flows[i].date).format('YYYY-MM-DD HH:mm:ss') : null,
      });
    }
    return flowText;
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    if (this.state.business) {
      return (
        <View style={styles.mainView}>
          <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
          <View style={[styles.nav]}>
              {this.props.fromProject ?
                  <TouchableHighlight style={[styles.navLeft]} underlayColor="transparent" onPress={()=>{Actions.pop({refresh:{random:Math.random()}})}}>
                    <Image source={require('../../images/back.png')}></Image>
                  </TouchableHighlight>
                :
                  <TouchableHighlight style={[styles.navLeft]} underlayColor="transparent" onPress={()=>{Actions.pop({refresh:{random:Math.random()}})}}>
                    <Image source={require('../../images/back.png')}></Image>
                  </TouchableHighlight>
              }
                <View style={[styles.navCenter]}>
                      <Text style={[fonts.t2_Black]}>交易详情</Text>
                </View>
          </View>
          <View style={[styles.view]}>
            <View style={[styles.ListTextNum]}>
              <View style={[styles.project]}>
                <Text style={[styles.projectText,fonts.bodyText_Black]}>项目名称：{this.state.business.project.name}</Text>
                <Text style={[styles.projectText,fonts.bodyText_Black]}>项目经理：{this.state.business.project.projectManager ? this.state.business.project.projectManager.name : '暂无'}</Text>
                <Text style={[styles.projectText,fonts.bodyText_Black]}>需求类型：{this.state.business.customer.demandType}</Text>
              </View>
            </View>
            <BusinessHorizonLine flows={this.state.flows} />
          </View>

          <ListView contentContainerStyle={styles.list}
                    dataSource={ds.cloneWithRows(this.state.business.businessFlows)}
                    enableEmptySections={true}
                    renderRow={(data) => <BusinessRentDetailsItem {...data} />}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}  />}/>
          {this.renderModal()}{this.renderLoading()}
        </View>
      );
    }
    else {
      return <View>{this.renderModal()}{this.renderLoading()}</View>
    }
  }
}
AppRegistry.registerComponent('BusinessRentDetails', () => BusinessRentDetails);
