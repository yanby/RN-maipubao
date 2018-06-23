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
import { Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/personalCenter/MemberInfo';
import ShopListItem from './ShopListItem';
import { DropDownMenu } from '../../commonComponents/menu/DropDownMenu';
import ListBasicComponent from '../basic/ListBasicComponent';
import { NiceList } from '../../commonComponents/niceList/NiceList';
import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { UMengAnalytics } from '../../commonComponents/umeng/UMAnalytics';
import {Title} from '../../commonComponents/CommentTitle/Title';
import lodash from 'lodash'

export default class ShopList extends ListBasicComponent {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      resultVisible:false,
      month:[],
      year:this.props.year,
      baseUrl: apis.shopList + '?status=开启',
      remoteUrl: apis.shopList + '?status=开启&sort=sort,desc' + (this.props.keywords ? ('&keywords=' + this.props.keywords) : ''),
      storkey:keys.shopList,
      menuData: null,
      menuDataValue: null,
      params: [['areaId', null], ['shopBusinessTypeId', null], ['areaMeasureId', null], ['salePriceId', null], ['dailyRentId', null], ['monthlyRentId', null], ['transferFeeId', null],['sort', 'sort,desc'], ['shopType', null], ['shopTagIds', null], ['shopSupportingId', null]],
      paramsNews: [['areaId', null], ['shopBusinessTypeId', null], ['areaMeasureId', null], ['salePriceId', null], ['dailyRentId', null], ['monthlyRentId', null], ['transferFeeId', null], ['sort', 'sort,desc'], ['shopType', null], ['shopTagIds', null], ['shopSupportingId', null]],
      keywords: null,
      status:[false,false,false],
      currentIndex:0,
      status1:[false,false,false,false,false,false,false,false,false],
      currentIndex1:0,
      status2:[false,false,false,false,false],
      currentIndex2:0,
      status3:[false,false,false,false,false],
      currentIndex3:0,
      classValues: ['sort,desc', 'followNum,desc', 'followNum,asc'],
      shopTypeValues: null,
      shopTagValues: null,
      shopSupportingValues: null,
      historySearch: null,
      doubleList:false
    };
  }

  componentWillReceiveProps(){
    this._initMenuData();
    this._initShopTagData();
    this._initShopSupportingData();
    this._initShopTypeData();
    this.setState({
      remoteUrl: this.state.baseUrl + '&rand=1'
    })
  }

  componentWillMount(){
    this._initMenuData();
    this._initShopTagData();
    this._initShopSupportingData();
    this._initShopTypeData();
  }

  _initMenuData(){
    storage.load({
      key: keys.shopListConditions,
      syncInBackground: true,
      syncParams: {
         url: apis.shopListConditions
      }
    }).then(ret => {
      if (ret.json) {
        return ret.json()
      }
      return ret
    }).then(kv => {
      this.setState({
        menuData: kv[0],
        menuDataValue: kv[1]
      })
    })
  }

  _initShopTagData(){
    storage.load({
      key: keys.shopTags,
      syncInBackground: false,
      syncParams: {
         url: apis.shopTags + '?sort=sort,desc'
      }
    }).then(ret => {
      return ret.json()
    }).then(content => {
      this.setState({
        shopTagValues: content._embedded.shopTags
      })
    })
  }

  _initShopSupportingData(){
    storage.load({
      key: keys.shopSupportings,
      syncInBackground: false,
      syncParams: {
         url: apis.shopSupportings + '?sort=sort,desc'
      }
    }).then(ret => {
      return ret.json()
    }).then(content => {
      this.setState({
        shopSupportingValues: content._embedded.shopSupportings
      })
    })
  }

  _initShopTypeData(){
    storage.load({
      key: keys.getShopTypes,
      syncInBackground: false,
      syncParams: {
         url: apis.getShopTypes
      }
    }).then(ret => {
      return ret.json()
    }).then(content => {
      this.setState({
        shopTypeValues: content
      })
    })
  }

  _menuChange(selection,row){
    console.log(selection)
    if(selection == 0) {
      UMengAnalytics.onEvent('shops_list_tab_zone_click');
    } else if(selection == 1) {
      UMengAnalytics.onEvent('shops_list_tab_career_click');
    }else if(selection == 2) {
      UMengAnalytics.onEvent('shops_list_tab_area_click');
    } else if(selection == 3) {
      UMengAnalytics.onEvent('shops_price_click');
    } else if(selection == 4) {
      UMengAnalytics.onEvent('shops_daily_rents_click');
    }else if(selection == 5) {
      UMengAnalytics.onEvent('shops_monthly_rent_click');
    }else if(selection == 6) {
      UMengAnalytics.onEvent('shops_transfer_fee_click');
    }
    let paramsString = ''
    let params = this.state.params
    let paramsNews = this.state.paramsNews
    if(selection == 3 || selection == 4 || selection == 5 || selection == 6){
      params = lodash.cloneDeep(paramsNews);
      params[selection][1] = this.state.menuDataValue[selection][row]
    }else{
      params[selection][1] = this.state.menuDataValue[selection][row]
      paramsNews[selection][1] = this.state.menuDataValue[selection][row]
    }
    params.forEach(param => {
      if(param[1]) {
        paramsString = '&' + param[0] + '=' + param[1] + paramsString
      }
    })
    this.setState({
      params: params,
      paramsNews: paramsNews,
      remoteUrl: this.state.baseUrl + paramsString
    });

  }

  _initSearchData(){
    storage.load({
      key:keys.historySearchList
    }).then(historySearch => {
      this.setState({
        historySearch: historySearch
      })
    }).catch(error => {
    })
  }

  _emptySearchHistory(){
    storage.save({
      key: keys.historySearchList,
      data: [],
      expires: null
    });
    this.setState({
      historySearch: []
    })
  }

  _delSearchHistory(keywords){
    storage.load({
      key:keys.historySearchList
    }).then(historySearch => {
      historySearch.pop(keywords)
      storage.save({
        key: keys.historySearchList,
        data: historySearch,
        expires: null
      });
      this.setState({
        historySearch: historySearch
      })
    }).catch(error => {
    })
  }

  _search(params){
    this.setState({
      remoteUrl: this.state.baseUrl + '&keywords=' + params.keywords
    });
    this.closeModal()
  }

  // 搜索弹框
  searchContent(){
    this._initSearchData();
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
                                    placeholder="请输入商铺名称或关键字" clearButtonMode="always" returnKeyType='send'
                                    onEndEditing={()=>this._onPressSearch()} onSubmitEditing={()=>this._onSubmitEditing()}
                                    placeholderTextColor="#898989"
                                    onChangeText={(text) => this.setState({keywords: text})}/>
                            </View>
                            <TouchableHighlight style={styles.cancelBtn} underlayColor="transparent" onPress={()=>{this.closeModal()}}>
                                <Text style={[fonts.bodyText_Gray]}>取消</Text>
                            </TouchableHighlight>
                      </View>
                      {
                        this.state.historySearch && this.state.historySearch.length > 0 ?
                          <View style={styles.historyView}>
                            <View style={styles.historyViewSon}>
                              <Text style={[fonts.bodyText_Black,styles.historyText]}>搜索历史</Text>
                              <TouchableHighlight style={styles.delectTouchRest} underlayColor="transparent" onPress={() => this._emptySearchHistory()}>
                                <Text style={[fonts.hintText_Gray]}>X</Text>
                              </TouchableHighlight>
                            </View>
                            {
                              this.state.historySearch.map((keywords, i) => {
                                return (
                                  <View style={styles.historyViewSon} key={i}>
                                    <TouchableHighlight style={styles.delectTouch} underlayColor="transparent" onPress={()=>this._search({keywords: keywords})}>
                                      <Text style={[fonts.bodyText_Gray]}>{keywords}</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight style={styles.delectTouchRest} underlayColor="transparent" onPress={()=>this._delSearchHistory({keywords: keywords})}>
                                      <Text style={[fonts.hintText_Gray]}>X</Text>
                                    </TouchableHighlight>
                                  </View>
                                )
                              })
                            }
                          </View>
                        : null
                      }
                </View>
          </View>);
        }
      })
  }
  // 更多弹框
  _moreContent(){
    this.content(
      {
        isWholeCustom:true,
        customText:()=>{
          return (
            <View style={[styles.mask]}>
                <StatusBar backgroundColor="transparent" hidden={true} barStyle="dark-content" translucent={true}/>
                <View style={styles.centerView}>
                      <View style={styles.moreNav}>
                            <TouchableHighlight style={styles.moreNavIcon} underlayColor="transparent" onPress={()=>{this.closeModal()}}>
                                <Image source={require('../../images/back.png')}/>
                            </TouchableHighlight>
                            <View style={styles.moreNavTitle}><Text style={fonts.t2_Black}>更多筛选</Text></View>
                      </View>
                      <ScrollView style={styles.moreMain}>

                      <View style={styles.moreMainTitle}>
                            <Text style={fonts.t3_Black}>商铺类型</Text>
                      </View>
                      {this.state.shopTypeValues ?
                      <View style={styles.moreMainList}>
                            <TouchableHighlight style={this.state.status1[0]?[styles.listTextSelect]:[styles.listText]} underlayColor="transparent" onPress={()=>this.addShopType(0)}>
                                  <Text style={this.state.status1[0]?[fonts.hintText_Blue]:[fonts.hintText_Gray]}>全部</Text>
                            </TouchableHighlight>
                            {
                              this.state.shopTypeValues.map((shopType, i) => {
                                return (
                                  <TouchableHighlight style={this.state.status1[i + 1]?[styles.listTextSelect]:[styles.listText]} underlayColor="transparent" onPress={()=>this.addShopType(i + 1)} key={i + 1}>
                                    <Text style={this.state.status1[i + 1]?[fonts.hintText_Blue]:[fonts.hintText_Gray]}>{shopType}</Text>
                                  </TouchableHighlight>
                                )
                              })
                            }
                      </View>
                      : null}

                      <View style={styles.moreMainTitle}>
                            <Text style={fonts.t3_Black}>配套设施</Text>
                      </View>
                      {this.state.shopSupportingValues ?
                      <View style={styles.moreMainList}>
                            <TouchableHighlight style={this.state.status3[0]?[styles.listTextSelect]:[styles.listText]} underlayColor="transparent" onPress={()=>this.addSupporting(0)}>
                                  <Text style={this.state.status3[0]?[fonts.hintText_Blue]:[fonts.hintText_Gray]}>全部</Text>
                            </TouchableHighlight>
                            {
                              this.state.shopSupportingValues.map((shopSupporting, i) => {
                                return (
                                  <TouchableHighlight style={this.state.status3[i + 1]?[styles.listTextSelect]:[styles.listText]} underlayColor="transparent" onPress={()=>this.addSupporting(i + 1)} key={shopSupporting.id}>
                                    <Text style={this.state.status3[i + 1]?[fonts.hintText_Blue]:[fonts.hintText_Gray]}>{shopSupporting.name}</Text>
                                  </TouchableHighlight>
                                )
                              })
                            }
                      </View>
                      : null}

                      <View style={styles.moreMainTitle}>
                            <Text style={fonts.t3_Black}>关注度</Text>
                      </View>
                      <View style={styles.moreMainList}>
                            <TouchableHighlight style={this.state.status[0]?[styles.listTextSelect]:[styles.listText]} underlayColor="transparent" onPress={()=>this.addClass(0)}>
                                  <Text style={this.state.status[0]?[fonts.hintText_Blue]:[fonts.hintText_Gray]}>默认排序</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={this.state.status[1]?[styles.listTextSelect]:[styles.listText]} underlayColor="transparent" onPress={()=>this.addClass(1)}>
                                  <Text style={this.state.status[1]?[fonts.hintText_Blue]:[fonts.hintText_Gray]}>关注度由高到低</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={this.state.status[2]?[styles.listTextSelect]:[styles.listText]} underlayColor="transparent" onPress={()=>this.addClass(2)}>
                                  <Text style={this.state.status[2]?[fonts.hintText_Blue]:[fonts.hintText_Gray]}>关注度由低到高</Text>
                            </TouchableHighlight>
                      </View>


                      <View style={styles.moreMainTitle}>
                            <Text style={fonts.t3_Black}>特色标签</Text>
                      </View>
                      {this.state.shopTagValues ?
                      <View style={styles.moreMainList}>
                            <TouchableHighlight style={this.state.status2[0]?[styles.listTextSelect]:[styles.listText]} underlayColor="transparent" onPress={()=>this.addFlag(0)}>
                                  <Text style={this.state.status2[0]?[fonts.hintText_Blue]:[fonts.hintText_Gray]}>全部</Text>
                            </TouchableHighlight>
                            {
                              this.state.shopTagValues.map((shopTag, i) => {
                                return (
                                  <TouchableHighlight style={this.state.status2[i + 1]?[styles.listTextSelect]:[styles.listText]} underlayColor="transparent" onPress={()=>this.addFlag(i + 1)} key={shopTag.id}>
                                    <Text style={this.state.status2[i + 1]?[fonts.hintText_Blue]:[fonts.hintText_Gray]}>{shopTag.name}</Text>
                                  </TouchableHighlight>
                                )
                              })
                            }
                      </View>
                      : null}
                        <View style={styles.viewBtn}>
                              <TouchableHighlight style={[styles.listNoBtn2]} underlayColor="transparent" onPress={() => {this._onEmptyConditions()}}>
                                    <Text style={[fonts.btnText_Gray]}>清空</Text>
                              </TouchableHighlight>
                              <TouchableHighlight style={[styles.listBtn2]} underlayColor="#3a8ff3" onPress={() => {this._onSaveConditions()}}>
                                    <Text style={[fonts.btnText_white]}>保存</Text>
                              </TouchableHighlight>
                        </View>
                      </ScrollView>
                </View>
          </View>
        );
        }
      })
      UMengAnalytics.onEvent('shops_more_screening');
  }

  // 此回调函数当软键盘的确定/提交按钮被按下的时候调用此函数
  _onSubmitEditing(){
    if (this.state.keywords) {
      storage.load({
        key:keys.historySearchList
      }).then(historySearch => {
        historySearch.unshift(this.state.keywords)
        if(historySearch.length == 9) {
          historySearch.pop()
        }
        storage.save({
          key: keys.historySearchList,
          data: historySearch,
          expires: null
        });
      }).catch(error => {
        let historySearch = [this.state.keywords];
        storage.save({
          key: keys.historySearchList,
          data: historySearch,
          expires: null
        });
      })
      this.setState({
        remoteUrl: this.state.baseUrl + '&keywords=' + this.state.keywords
      });
    }
    this.closeModal()
  }
  // 关注度选择
  async  addClass(index) {
    let showState = this.state.status;
    showState[this.state.currentIndex] = false;
    showState[index] = !showState[index];
    await this.setState({status:showState});
    await this.setState({currentIndex:index});
  }
  // 商铺类型选择
  async addShopType(index){
    console.log(index)
    let showState = this.state.status1;
    showState[this.state.currentIndex1] = false;
    showState[index] = !showState[index];
    await this.setState({status1:showState});
    await this.setState({currentIndex1:index});
  }

  // 特色标签选择
  async addFlag(index){
    let showState = this.state.status2;
    showState[this.state.currentIndex2] = false;
    showState[index] = !showState[index];
    await this.setState({status2:showState});
    await this.setState({currentIndex2:index});
  }

  // 配套设施选择
  async addSupporting(index){
    let showState = this.state.status3;
    showState[this.state.currentIndex3] = false;
    showState[index] = !showState[index];
    await this.setState({status3:showState});
    await this.setState({currentIndex3:index});
  }

  _onEmptyConditions(){
    let showState = this.state.status;
    showState[this.state.currentIndex] = false;
    let showState1 = this.state.status1;
    showState1[this.state.currentIndex1] = false;
    let showState2 = this.state.status2;
    showState2[this.state.currentIndex2] = false;
    let showState3 = this.state.status3;
    showState3[this.state.currentIndex3] = false;
    this.setState({
      status: showState,
      status1: showState1,
      status2: showState2,
      status3: showState3,
      currentIndex: 0,
      currentIndex1: 0,
      currentIndex2: 0,
      currentIndex3: 0
    });
  }

  _onSaveConditions(){
    let paramsString = ''
    let params = this.state.params
    params[7][1] = this.state.classValues[this.state.currentIndex]
    if (this.state.currentIndex1 == 0) {
      params[8][1] = null
    } else if (this.state.currentIndex1 > 0) {
      params[8][1] = this.state.shopTypeValues[this.state.currentIndex1 - 1]
    }
    if (this.state.currentIndex2 == 0) {
      params[9][1] = null
    } else if (this.state.currentIndex2 > 0) {
      params[9][1] = this.state.shopTagValues[this.state.currentIndex2 - 1].id
    }
    if (this.state.currentIndex3 == 0) {
      params[10][1] = null
    } else if (this.state.currentIndex3 > 0) {
      params[10][1] = this.state.shopSupportingValues[this.state.currentIndex3 - 1].id
    }

    params.forEach(param => {
      if(param[1]) {
          paramsString = '&' + param[0] + '=' + param[1] + paramsString
      }
    })
    this.setState({
      params: params,
      remoteUrl: this.state.baseUrl + paramsString
    });
    this.closeModal();
    this._onEmptyConditions();
  }


  render() {
    return (
      <View style={styles.container}>
            <StatusBar backgroundColor="#f9f9f9" barStyle="dark-content" translucent={true}/>
            <Title isLeftShow={true} backColor={true} isRightSearchShow={true} rightChoose={true} title={'商铺'}  onClick={() => {this.searchContent()}} >
            </Title>
            {this.state.menuData && this.state.menuData.length > 0 ?
            <View style={styles.dropdownView}>
                  <DropDownMenu style={styles.downView} showMoreBtn={true} doubleList={[3]}
                                arrowImg={require('../../images/select.png')}      //set the arrow icon, default is a triangle
                                checkImage={require('../../images/tab.png')}    //set the icon of the selected item, default is a check mark
                                bgColor={"#fff"}                            //the background color of the head, default is grey
                                tintColor={"#333"}                        //the text color of the head, default is white
                                selectItemColor={"#3a8ff3"}                    //the text color of the selected item, default is red
                                data={this.state.menuData}
                                maxHeight={410}                            // the max height of the menu
                                handler={(selection, row) => this._menuChange(selection,row)} >
                                <NiceList noDataInfo={'商铺添加中，敬请期待'} isNeedLoading={true} renderItem={(rowData)=><ShopListItem {...rowData} />} contentContainerStyle={styles.list} remoteUrl={this.state.remoteUrl} storkey={this.state.storkey} />
                  </DropDownMenu>
                  <TouchableHighlight underlayColor="transparent" onPress={()=>{this._moreContent()}} style={styles.moreBtn}>
                        <View style={styles.moreView}>
                              <Text style={styles.moreText}>更多</Text>
                              <Image style={styles.moreIcon} source={require('../../images/select.png')}/>
                        </View>
                  </TouchableHighlight>
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
