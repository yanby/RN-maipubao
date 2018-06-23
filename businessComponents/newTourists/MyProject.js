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
  ListView,
  ScrollView
} from 'react-native';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/tourists/SignManagement';
import MyProjectItem from './MyProjectItem';
import { Actions,ActionConst } from 'react-native-router-flux';
import { DropDownMenu } from '../../commonComponents/menu/DropDownMenu';
import ListBasicComponent from '../basic/ListBasicComponent';
import CustomTabBar from '../../commonComponents/tabBar/CustomTabBar';

import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { NiceList } from '../../commonComponents/niceList/NiceList';
import {Title} from '../../commonComponents/CommentTitle/Title';
import lodash from 'lodash'
export default class MyProject extends ListBasicComponent {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      storkey:keys.projectListV2,
      baseUrl: null,
      remoteUrl: null,
      keywords: null,
    };
  }

  componentWillMount(){
    this._initBaseUrl();

  }

  _initBaseUrl(){
    storage.load({
      key: keys.currentUser
    }).then(currentUser => {
      this.setState({
        baseUrl: apis.projectListV2 + '?projectManagerId=' + currentUser.id,
        remoteUrl: apis.projectListV2 + '?projectManagerId=' + currentUser.id + '&sort=sort,desc'
      })
    })
  }

  _initSearchData(){
    storage.load({
      key: keys.hotSearchList,
      syncInBackground: false,
      syncParams: {
         url: apis.hotSearchList + '?sort=sort,desc'
      }
    }).then(ret => {
      return ret.json()
    }).then(content => {
      this.setState({
        hotSearchList: content._embedded.hotSearches
      })
    })
    storage.load({
      key:keys.historySearchList
    }).then(historySearch => {
      this.setState({
        historySearch: historySearch
      })
    }).catch(error => {
    })
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
                                    placeholder="请输入项目名称" clearButtonMode="always" returnKeyType='send'
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
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
      <Title isLeftShow={false} backColor={true} isRightSearchShow={true}  title={'我的项目'}  onClick={() => {this.searchContent()}} >
      </Title>
      <View style={{paddingBottom:20,flex:1}}>
      {this.state.remoteUrl && this.state.remoteUrl.indexOf("keywords")>-1 ?
        <NiceList noDataFun={()=>{return <View style={styles.noCustomView}>
          <Image style={styles.noCustom} source={require('../../images/noCustom.png')}/>
          <Text style={fonts.btnText_Gray}>您搜索的内容不存在</Text>
          <TouchableHighlight onPress={()=>this._initBaseUrl()} underlayColor="#3a8ff3" style={{width:100,height:30,backgroundColor:"#3a8ff3",alignItems:"center",justifyContent:"center",borderRadius:3,marginTop:15,}}>
            <Text style={fonts.btnText_white}>返回</Text>
          </TouchableHighlight>
        </View>}} isNeedLoading={true} renderItem={(rowData)=><MyProjectItem {...rowData} />} contentContainerStyle={styles.list} remoteUrl={this.state.remoteUrl} storkey={this.state.storkey}   />
      : this.state.remoteUrl ?
      <NiceList noDataInfo={'当前还没有分配项目，请联系管理员进行分配'} isNeedLoading={true} renderItem={(rowData)=><MyProjectItem {...rowData} />} contentContainerStyle={styles.list} remoteUrl={this.state.remoteUrl} storkey={this.state.storkey}   />
      :null
      }
      </View>
      {
        this.renderModal()
      }
      {
        this.renderLoading()
      }
      <CustomTabBar checkIndex={1} />
      </View>
    );
  }
}
