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
import EditProjectCustomItem from './EditProjectCustomItem';
import { Actions,ActionConst } from 'react-native-router-flux';
import { DropDownMenu } from '../../commonComponents/menu/DropDownMenu';
import ListBasicComponent from '../basic/ListBasicComponent';
import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { NiceEditList } from '../../commonComponents/niceList/NiceEditList';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class ReportCustom extends ListBasicComponent {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      source: this.props.source,
      projectId: this.props.projectId,
      customerId: this.props.customerId,
      menuData: null,
      storkey: keys.customerList,
      baseUrl: null,
      remoteUrl: null,
      params: [['level': null], ['dateCondition': null], ['demandType': null], ['flowType': null]],
      keywords: null,
      checkArrary: [],
      number:''
    };
  }

  componentWillMount(){
    this._initBaseUrl()
    this._initMenuData()
  }

  _initBaseUrl(){
    storage.load({
      key: keys.currentUser
    }).then(currentUser => {
      this.setState({
        baseUrl: apis.customerList + '?userId=' + currentUser.id
      })
      this._initData()
    })
  }

  _initData(){
    if(this.state.source == 1){
      if(this.state.customerId){
        this.setState({
          remoteUrl: this.state.baseUrl + '&customerId=' + this.state.customerId,
          checkArrary: [this.state.customerId]
        })
      } else {
        storage.load({
          key: keys.reportSource
        }).then(reportSource => {
          if(reportSource == 2){
            storage.load({
              key: keys.reportCustomer
            }).then(reportCustomer => {
              this.setState({
                remoteUrl: this.state.baseUrl + '?customerId=' + reportCustomer,
                checkArrary: [reportCustomer]
              })
            })
          } else {
            this.setState({
              remoteUrl: this.state.baseUrl
            })
          }
        })
      }
    } else {
      storage.load({
        key: keys.reportCustomer
      }).then(reportCustomer => {
        let checkArrary = []
        checkArrary.push(reportCustomer)
        this.setState({
          remoteUrl: this.state.baseUrl + '&customerId=' + reportCustomer,
          checkArrary: checkArrary
        })
      })
    }
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
        menuData: [kv[0][0], kv[0][1], kv[0][2]],
        menuDataValue: [kv[1][0], kv[1][1], kv[1][2]]
      })
      this.closeLoading()
    })
  }

  _menuChange(selection,row){
    storage.load({
      key: keys.reportSource
    }).then(reportSource => {
      if(reportSource != 2){
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
                                    placeholder="请输入客户名称或手机号" clearButtonMode="always" returnKeyType='send'
                                    onEndEditing={() => this._onPressSearch()} onSubmitEditing={() => this._onSubmitEditing()}
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
    storage.load({
      key: keys.reportSource
    }).then(reportSource => {
      if(reportSource != 2){
        this.setState({
          remoteUrl: this.state.baseUrl + '&keywords=' + this.state.keywords
        });
      }
    })
    this.closeModal()
  }

  _nextStep(){
    if(this.state.checkArrary.length == 0){
      this.msgShort('请选择客户');
      return
    }
    storage.save({
      key: keys.reportCustomer,
      data: this.state.checkArrary[0],
      expires: null
    })
    storage.load({
      key: keys.reportProject
    }).then(reportProject => {
      Actions.ReportInfo({projectId: reportProject, customerId: this.state.checkArrary[0]})
    })
  }

  _cancel(){
    storage.load({
      key: keys.reportSource
    }).then(reportSource => {
      if(reportSource == 0){
        Actions.pop()
      } else if(reportSource == 1){
        storage.load({
          key: keys.reportProject
        }).then(reportProject => {
          Actions.pop()
        })
      } else if(reportSource == 2){
        Actions.pop()
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
      <Title isLeftShow={true} backColor={true} isRightSearchShow={true} rightChoose={true} title={'客户报备'}  onClick={() => {this.searchContent()}} >
      </Title>
      <View style={styles.reportState}>
            <View style={styles.reportView}>
                  <Text style={[fonts.hintText_Gray,styles.flexView]}>选择报备项目</Text>
                  <Text style={[fonts.hintText_Gray,styles.flexView]}>选择报备客户</Text>
                  <Text style={[fonts.hintText_Gray,styles.flexView]}>填写报备信息</Text>
            </View>
            <Image  source={require('../../images/bb2.png')}/>
      </View>
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
              <NiceEditList
                getTotalCount= {(count)=>{this.setState({number:count})}}
                isMutex={true}
                selectIndexArrary={this.state.checkArrary}
                returnCheckArrary={(arrary) => {this.setState({checkArrary: arrary})}}
                renderItem={(rowData,selectIndexArrary,rowSelect) => <EditProjectCustomItem {...rowData} selectIndexArrary={selectIndexArrary}
                rowSelect={(index) => {rowSelect(index)}} />}
                contentContainerStyle={styles.list}
                remoteUrl={this.state.remoteUrl}
                storkey={this.state.storkey}
                isNeedLoading={true}
                noDataFun={()=>{return <View style={styles.noCustomView}>
                  <Image style={styles.noCustom} source={require('../../images/noCustom.png')}/>
                  <Text style={fonts.btnText_Gray}>您还没有客户需要先录入哟！</Text>
                  <TouchableHighlight style={[styles.touchTop]} onPress={()=>Actions.CustomerEnter({quickNew:true})} underlayColor="#3a8ff3">
                        <Text style={fonts.bodyText_white}>客户录入</Text>
                  </TouchableHighlight>
                </View>}}
                />
            : null}

          </DropDownMenu>
        </View>
      : null}
      {this.state.number?
        <TouchableHighlight style={styles.addCustom} onPress={()=>Actions.CustomerEnter({quickNew:true})} underlayColor="transparent">
                    <Text style={[fonts.t2_white,styles.addText]}>客户录入</Text>
        </TouchableHighlight>
        :null
      }
      <View style={styles.btnView}>
            <TouchableHighlight style={styles.touchBtn,styles.touchBtnRest} underlayColor="transparent" onPress={() => this._cancel()}>
                 <Text style={fonts.btnText_Gray}>取消</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.touchBtn} underlayColor="#3a8ff3" onPress={() => this._nextStep()}>
                 <Text style={fonts.bodyText_white}>下一步</Text>
            </TouchableHighlight>
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
