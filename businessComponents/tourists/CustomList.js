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
import BusinessProjectCustomItem from './BusinessProjectCustomItem';
import { Actions,ActionConst } from 'react-native-router-flux';
import { DropDownMenu } from '../../commonComponents/menu/DropDownMenu';
import ListBasicComponent from '../basic/ListBasicComponent';
import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { NiceList } from '../../commonComponents/niceList/NiceList';

export default class CustomList extends ListBasicComponent {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      menuData: null,
      storkey:keys.findByProjectIdCondition,
      baseUrl: null,
      remoteUrl: null,
      params: [['level': null], ['dateCondition': null], ['demandType': null], ['flowType': null]],
      keywords: null
    };
  }

  componentWillMount(){
    this._initBaseUrl()
    this._initMenuData()
  }

  _initBaseUrl(){
      this.setState({
        baseUrl: apis.findByProjectIdCondition + '?projectId=' + this.props.projectId,
        remoteUrl: apis.findByProjectIdCondition + '?projectId=' + this.props.projectId
    })
  }

  _initMenuData(){
    this.openLoading();
    let getProjectBusinessTypes = storage.load({
      key: keys.customerListConditions,
      syncInBackground: false,
      syncParams: {
         url: apis.customerListConditions
      }
    }).then(ret => {
      return ret.json()
    }).then(kv => {
      this.setState({
        menuData: kv[0],
        menuDataValue: kv[1]
      })
      this.closeLoading()
    })
  }

  _menuChange(selection,row){
    let paramsString = ''
    let params = this.state.params
    params[selection][1] = this.state.menuDataValue[selection][row]

    params.forEach(param => {
      if(param[1]) {
          paramsString = '&' + param[0] + '=' + param[1] + paramsString
      }
    })
    this.setState({
      params: params,
      remoteUrl: this.state.baseUrl + paramsString
    });
  }

  // 搜索弹框
  searchContent(){
    this.content(
      {
        isWholeCustom:true,
        customText:()=>{
          return (<View style={[styles.modalMask]}>
                <View style={styles.centerView}>
                      <View style={styles.searchTop}>
                            <View style={styles.searchInput}>
                                  <Image  source={require('../../images/search.png')}/>
                                  <TextInput style={[styles.searchIputRest,fonts.bodyText_Black]} autoFocus={true}
                                    underlineColorAndroid="transparent"
                                    placeholder="请输入客户名称或手机号" clearButtonMode="always" returnKeyType='send'
                                    onEndEditing={()=>this._onPressSearch()} onSubmitEditing={()=>this._onSubmitEditing()}
                                    placeholderTextColor="#898989"
                                    onChangeText={(text) => this.setState({keywords: text})}/>
                            </View>
                            <TouchableHighlight style={styles.cancelBtn} underlayColor="transparent" onPress={()=>{this.closeModal()}}>
                                <Text style={[fonts.bodyText_Black]}>取消</Text>
                            </TouchableHighlight>
                      </View>
                </View>
          </View>);
        }
      })
  }

  // 当文本输入结束后调用此回调函数。
  _onPressSearch(){

  }

  // 此回调函数当软键盘的确定/提交按钮被按下的时候调用此函数
  _onSubmitEditing(){
    this.setState({
      remoteUrl: this.state.baseUrl + '&keywords=' + this.state.keywords
    });
    this.closeModal()
  }

  render() {
    return (
      <View style={styles.container}>
      {/* <StatusBar backgroundColor="#f9f9f9" barStyle="dark-content" translucent={false}/>
      <View style={styles.signTitleView}>
            <TouchableHighlight style={styles.searchView} underlayColor="transparent" onPress={()=>{this.searchContent()}}>
                  <Image  source={require('../../images/search.png')}/>
            </TouchableHighlight>
      </View> */}
      {this.state.menuData ?
        <View style={styles.dropdownView}>
              <DropDownMenu  style={styles.downView}
                            arrowImg={require('../../images/select.png')}      //set the arrow icon, default is a triangle
                            checkImage={require('../../images/tab.png')}    //set the icon of the selected item, default is a check mark
                            bgColor={"#fff"}                            //the background color of the head, default is grey
                            tintColor={"#333"}                        //the text color of the head, default is white
                            selectItemColor={"#3a8ff3"}                    //the text color of the selected item, default is red
                            data={this.state.menuData}
                            maxHeight={410}                            // the max height of the menu
                            handler={(selection, row) => this._menuChange(selection, row)}>
                            {this.state.remoteUrl ?
                              <NiceList renderItem={(rowData)=><BusinessProjectCustomItem {...rowData} />} contentContainerStyle={styles.list} remoteUrl={this.state.remoteUrl} storkey={this.state.storkey}  isNeedLoading={true} />
                            : null
                            }
              </DropDownMenu>

        </View>
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
