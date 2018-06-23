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
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  PushNotificationIOS,Linking
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/appRoot/Index';
import Swiper from 'react-native-swiper';
import AttentionListItem from '../basic/AttentionListItem';
import SectionHeader from '../data/SectionHeader';
import BasicComponent from '../basic/BasicComponent';
import {cityData} from '../data/CityData'
import CitySelect from '../../commonComponents/city/CitySelect';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import CustomTabBar from '../../commonComponents/tabBar/CustomTabBar';
import { NiceList } from '../../commonComponents/niceList/NiceList';
import { apis, staticSite,currentVersion } from '../../systemComponents/Remote/ApiStorage';
import { checkVersion,getRemoteVersion,updateBasicVersion } from '../../systemComponents/VersionControl/VersionApp';


import { UMengAnalytics } from '../../commonComponents/umeng/UMAnalytics';
import AppMessageCenter from '../../systemComponents/routerCenter/AppMessageCenter';

const Permissions = require('react-native-permissions');

var { NativeAppEventEmitter } = require('react-native');
var receiveRemoteNotificationSub;
var clickRemoteNotificationSub;

export default class Index extends BasicComponent {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      city:cityData,
      dataSource: null,
      ausleseProjects:null,
      ausleseShops:null,
      status:[false,false],
      viewAppear: false,
      barCodeTypes:[],
      selectedCity:"",
      cityIsVisible:false,
      selectIndex:0,
      countBrand: null,
      countUser: null,
      countBusinessZs: null,
      countBusinessXs: null,
      swiperData: null,
      keywords: null,
      hotSearches: null,
      historySearch: null,
      flag:this.props.flag?this.props.flag:0,
      cityText:this.props.cityText?this.props.cityText:'',
      cityKey:this.props.cityKey?this.props.cityKey:0,
      searchCity:"商铺",
      showModal:false,
      searchCityV:['商铺','项目','旅居'],
      searchCityVIndex:0,
      searchCityOn:[true,false,false],
      searchText:'请输入商铺名称或关键字',
    };
  }
  componentWillReceiveProps(nextProps){
    //this.initCitySelectIndex();
  }
  async componentWillMount(){
    await this._initSwiperData();
    await this.initCitySelectIndex();
    await this._initAusleseProjects();
    await this._initAusleseShops();
    await this._initCountData();
    this._checkUserStatus();
  }
  versionMustUpdate(data){
    this.alert({
      text:data.text,
      closePrassBtn:true,
      ok:{text:'去更新',click:()=>{
        if (data.updateUrl) {
          Linking.openURL(data.updateUrl);
        }else{
          Linking.openURL('http://a.app.qq.com/o/simple.jsp?pkgname=com.youpu');
        }
      }}
    });
  }
  versionSuggestUpdate(data){
    updateBasicVersion(data.version)
    this.confirm({
      text:data.text,
      no:{text:'知道了'},
      ok:{text:'去更新',click:()=>{
        if (data.updateUrl) {
          Linking.openURL(data.updateUrl);
        }else{
          Linking.openURL('http://a.app.qq.com/o/simple.jsp?pkgname=com.youpu');
        }
      }}
    });
  }
  checkVersion(){
    let _cthis = this;
    getRemoteVersion().then(data=>{
      checkVersion(data.version).then(flag=>{
        switch (flag) {
          case 1:
            if (data.forceUpdate) {
              this.versionMustUpdate(data);
            }else {
              this.versionSuggestUpdate(data);
            }
            break;
          case 2:
            if (data.forceUpdate) {
              this.versionMustUpdate(data);
            }else {
              if(_cthis.state.flag == 111){
                this._initCurrentTime();
              }
            }
            break;
          default:
            if(_cthis.state.flag == 111){
              this._initCurrentTime();
            }
        }
      })
    })
  }
  _checkUserStatus(){
    storage.load({
      key:keys.currentUser
    }).then(res=>{
      if (res) {
        let userid = res.id;
        this._getUser(userid).then(userDetails=>{
          if(userDetails && userDetails.projectManager && userDetails.status=="锁定"){
            storage.save({
             key: keys.currentUser,
             data: null,
             expires: null
           });
            Alert.alert('提示', '登录失败，您的账号已锁定！', [
                {text: 'OK', onPress: () => Actions.reset('Login',{})},
            ])
          }else{
          }
        })
      }else {
      }
    }).catch(err=>{
    })

  }
  _getUser(userid){
    return storage.load({
        key: keys.userDetails,
        syncInBackground: false,
        syncParams: {
          url: apis.users+ '/' +userid,
        }
      }).then(res => {
        if(res.status == 200){
          return res.json();
        }else{

        };
      })
  }

  componentDidMount() {
    if(!receiveRemoteNotificationSub) {
      if(Platform.OS == "ios") {
        PushNotificationIOS.getInitialNotification().then(xx => {
          if(xx) {
            AppMessageCenter.receiveRemoteNotification(JSON.parse(xx._data.payload));
          }
        });
      }
    }
    if(!receiveRemoteNotificationSub) {
      receiveRemoteNotificationSub = NativeAppEventEmitter.addListener('receiveRemoteNotification', (notification) => {
        switch (notification.type) {
          case 'payload':
            if(Platform.OS == "android") {
              console.log('Android payload 消息通知', notification.payload);
              let payload = JSON.parse(notification.payload);
              AppMessageCenter.receiveRemoteNotification(payload);
            }
            break;
          default:
        }
      });
    }
    if(!clickRemoteNotificationSub) {
      clickRemoteNotificationSub = NativeAppEventEmitter.addListener('clickRemoteNotification', (notification) => {
        let payload = JSON.parse(notification.aps.category);
        AppMessageCenter.receiveRemoteNotification(payload);
      });
    }

    // if(this.state.flag == 111){
    //   this._initCurrentTime();
    // }
    this.checkVersion();
  }

  componentWillUnMount() {
    receiveRemoteNotificationSub.remove()
    clickRemoteNotificationSub.remove()
  }

  _initCurrentTime(){
    let cityKey = this.state.cityKey;
    let cityText = this.state.cityText;
    let tempCity = this.state.city[cityKey];
    this.confirm(
      {
        text:'系统定位您现在在'+this.state.cityText+',是否切换城市！',
        ok:{click:()=>{Actions.CreatNewAccount({city:tempCity,aaaa:'sfsf'})},text:'确定'},
        no:{click:()=>{Actions.reset('Index',{})},text:'取消'}
      });
      {
      // this.content(
      //     {
      //       isWholeCustom:true,
      //       customText:()=>{
      //         return (
      //         <View style={styles.changeCityMask}>
      //               <View style={styles.changeCityMaskMain}>
      //                     <View style={styles.changeCityMaskMainTxt}>
      //                           <Text style={fonts.bodyText_Black}>系统定位您现在在{this.state.cityText},是否切换城市！</Text>
      //                     </View>
      //                     <View style={styles.changeCityMaskBtnMain}>
      //                           <TouchableHighlight style={styles.changeCityMaskBtnL} underlayColor="#f4f4f4" onPress={()=>{this._changeCityClose()}}>
      //                                 <Text style={fonts.bodyText_Black}>取消</Text>
      //                           </TouchableHighlight>
      //                           <TouchableHighlight style={styles.changeCityMaskBtnR} underlayColor="#3a8ff3" onPress={() => {Actions.CreatNewAccount({city:tempCity,aaaa:'sfsf'})}}>
      //                                 <Text style={fonts.bodyText_white}>确定</Text>
      //                           </TouchableHighlight>
      //                     </View>
      //               </View>
      //       </View>
      //       );
      //       }
      //     })
     }
}
_changeCityClose(){
   this.closeModal();
   Actions.reset('Index',{})
}



  _initSwiperData(){
    storage.load({
      key: keys.articleFindByModuleType,
      syncInBackground: false,
      syncParams: {
         url: apis.articleFindByModuleType + '?showType=轮播&pageType=首页'
      }
    }).then(res => {
      return res.json()
    }).then(content => {
      this.setState({
        swiperData: content
      })
    }).catch(err=>{

    })
  }

  initCitySelectIndex(){
    storage.load({
      key:keys.currentRemoteSite
    }).then(sites=>{
      for (var i = 0; i < this.state.city.length; i++) {
        if (this.state.city[i].value === sites) {
          this.setState({selectIndex:i,selectedCity:this.state.city[i].text});
          break;
        }
      }
    }).catch((error)=>{
      this.setState({selectIndex:0});
    })
  }
  changeCity(index){
    let tempCity = this.state.city[index];
    // if (tempCity&&(tempCity.value == 'hn'||tempCity.value == 'cs')) {
    //   this.setState({cityIsVisible:false});
    //   Actions.Expect({cityText:tempCity.text});
    //   return;
    // }
    storage.load({key: keys.currentUser}).then(currentUser => {
      if (!currentUser) {
        Actions.reset('Login',{sourceFlag:'selectedCity'})
      }else {
        this.setState({cityIsVisible:false});
        Actions.CreatNewAccount({city:tempCity,aaaa:'sfsf'});
      }
    }).catch(err => {
      Actions.reset('Login',{sourceFlag:'selectedCity'})
    })
  }

  _Permissions(){
    Permissions.check('camera').then(response => {
      //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      if(response == 'denied'){
        Alert.alert(
          '提示',
          '请在设置中允许相机权限'
        )
        // this.alert(
        //   {
        //     text:'请在设置中允许相机权限',
        //   })
      }else{
        Actions.ScanCode();
      }
    }).catch(err=>{
      Actions.ScanCode();
    })
  }

  _initAusleseProjects(){
    storage.load({
      key: keys.getAusleseProjects,
      syncInBackground: false,
      syncParams: {
         url: apis.getAusleseProjects + '?size=6'
      }
    }).then(res => {
      return res.json()
    }).then(content => {
      let items = []
      if (content&&content.content) {
        this.setState({
          ausleseProjects: content.content
        })
        // content.content.forEach(project => {
        //   items.push({item: project})
        // })
        // let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(items)
        // this.setState({
        //   dataSource: dataSource
        // })
      }

    }).catch(err=>{

    })
  }
  _initAusleseShops(){
    storage.load({
      key: keys.getAusleseShops,
      syncInBackground: false,
      syncParams: {
         url: apis.getAusleseShops + '?size=6'
      }
    }).then(res => {
      return res.json()
    }).then(content => {
      if (content&&content.content) {
        this.setState({
          ausleseShops: content.content
        })
      }
    }).catch(err=>{

    })
  }

  _initCountData(){
    storage.load({
      key: keys.indexCount,
      syncInBackground: false,
      syncParams: {
         url: apis.indexCount
      }
    }).then(res => {
      return res.json()
    }).then(content => {
      this.setState({
        countBrand: content.countBrand,
        countUser: content.countUser,
        countBusinessZs: content.countBusinessZs,
        countBusinessXs: content.countBusinessXs
      })
    }).catch(err=>{

    })
  }
 _searchCity(){
      this.setState({
        showModal: true,
      })
 }
  _searchCityV(index){
    var searchText = ''
    if(index == 0){
      searchText = '请输入商铺名称或关键字'
    }else if(index==1){
      searchText = '请输入项目名称或关键字'
    }else if(index==2){
      searchText = '请输入旅居名称或关键字'
    }
    this.setState({
      searchCityVIndex:index,
      searchCity: this.state.searchCityV[index],
      showModal: false,
      searchText:searchText,
    })
  }
  _changeCity(){
    this.setState({
      showModal:false,
    });
    this.closeModal();
  }
  // 搜索弹框
  _searchContent(){
    this._initSearchData();
    this.content(
      {
        isWholeCustom:true,
        customText:()=>{
          return (<View style={[styles.modalMask]}>
                <View style={styles.centerView}>
                      <View style={styles.searchTop}>
                            <View style={styles.searchInput}>
                                  <TouchableHighlight underlayColor="transparent" style={{paddingTop:5,paddingBottom:5,}} onPress={()=>{this._searchCity()}}>
                                        <View style={styles.searchSelect}>
                                              <Text style={fonts.bodyText_Gray}>{this.state.searchCity}</Text>
                                              <Image style={styles.searchSelectIcon} source={require('../../images/select.png')}/>
                                        </View>
                                  </TouchableHighlight>
                                  <TextInput style={[styles.searchIputRest,fonts.bodyText_Black]} autoFocus={false}
                                    underlineColorAndroid="transparent"
                                    placeholder={this.state.searchText} clearButtonMode="always" returnKeyType='send'
                                    onSubmitEditing={()=>this._onSubmitEditing()}
                                    placeholderTextColor="#ccc"
                                    onChangeText={(text) => this.setState({keywords: text})}/>
                            </View>
                            <TouchableHighlight style={styles.cancelBtn} underlayColor="transparent" onPress={()=>{this._changeCity()}}>
                                <Text style={[fonts.bodyText_Gray]}>取消</Text>
                            </TouchableHighlight>
                      </View>
                      <ScrollView>
                      {
                        this.state.hotSearchList && this.state.hotSearchList.length > 0 && this.state.searchCityVIndex ==1 ?
                          <View style={styles.recommendView}>
                            <Text style={[fonts.bodyText_Black]}>最近热搜</Text>
                            <View style={styles.Recommend}>
                              {
                                this.state.hotSearchList.map((hotSearch, i) => {
                                  return (
                                    <TouchableHighlight key={i} style={styles.recommendTouch} underlayColor="transparent" onPress={()=>this._search({keywordsType:1,keywords: hotSearch.keywords})}>
                                      <Text style={fonts.hintText_Gray}>{hotSearch.keywords}</Text>
                                    </TouchableHighlight>
                                  )
                                })
                              }
                            </View>
                          </View>
                        : null
                      }
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
                                    <TouchableHighlight style={styles.delectTouch} underlayColor="transparent" onPress={()=>this._search({keywordsType:keywords.key,keywords: keywords.values})}>
                                      <Text style={[fonts.bodyText_Gray]}>{keywords.values}</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight style={styles.delectTouchRest} underlayColor="transparent" onPress={()=>this._delSearchHistory({keywords: keywords.values})}>
                                      <Text style={[fonts.hintText_Gray]}>X</Text>
                                    </TouchableHighlight>
                                  </View>
                                )
                              })
                            }
                          </View>
                        : null
                      }
                      </ScrollView>
                      {
                        this.state.showModal?
                              <Image style={styles.searchCityMask} source={require('../../images/searchCityBg.png')}>
                                    <View>
                                          <TouchableHighlight style={styles.searchCityMaskL} underlayColor="transparent" onPress={()=>{this._searchCityV(0)}}>
                                                <View><Text style={this.state.searchCity === this.state.searchCityV[0]?[fonts.bodyText_Blue]:[fonts.bodyText_Gray]}>{this.state.searchCityV[0]}</Text></View>
                                          </TouchableHighlight>
                                          <TouchableHighlight style={styles.searchCityMaskL} underlayColor="transparent" onPress={()=>{this._searchCityV(1)}}>
                                                <View><Text style={this.state.searchCity === this.state.searchCityV[1]?[fonts.bodyText_Blue]:[fonts.bodyText_Gray]}>{this.state.searchCityV[1]}</Text></View>
                                          </TouchableHighlight>
                                          <TouchableHighlight style={styles.searchCityMaskL} underlayColor="transparent" onPress={()=>{this._searchCityV(2)}}>
                                                <View><Text style={this.state.searchCity === this.state.searchCityV[2]?[fonts.bodyText_Blue]:[fonts.bodyText_Gray]}>{this.state.searchCityV[2]}</Text></View>
                                          </TouchableHighlight>
                                    </View>
                              </Image>
                        :null
                      }
                </View>
          </View>);
        }
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
      key:keys.historySearchListIndex
    }).then(historySearch => {
      this.setState({
        keywords:null,
        historySearch: historySearch
      })
    }).catch(error => {
    })
  }

  _onSubmitEditing(){
    if (this.state.keywords) {
      let keywordsArr = {}
      keywordsArr.key = this.state.searchCityVIndex;
      keywordsArr.values = this.state.keywords;
      storage.load({
        key:keys.historySearchListIndex
      }).then(historySearch => {
        historySearch.unshift(keywordsArr)
        if(historySearch.length == 9) {
          historySearch.pop()
        }
        storage.save({
          key: keys.historySearchListIndex,
          data: historySearch,
          expires: null
        });
      }).catch(error => {
        let keywordsArr = {}
        keywordsArr.key = this.state.searchCityVIndex;
        keywordsArr.values = this.state.keywords;
        let historySearch = []
        historySearch.push(keywordsArr)

        storage.save({
          key: keys.historySearchListIndex,
          data: historySearch,
          expires: null
        });
      })

      if(this.state.searchCityVIndex == 0){
        Actions.ShopList({keywords: this.state.keywords})
      }else if(this.state.searchCityVIndex == 1){
        Actions.ProjectIndex({keywords: this.state.keywords})
      }else{
        Actions.ProjectIndexLJ({keywords: this.state.keywords})
      }
    }
    this.closeModal();
  }

  _search(params){
    this.closeModal();
    if(params.keywordsType == 0){
      Actions.ShopList({keywords: params.keywords})
    }else if(params.keywordsType == 1){
      Actions.ProjectIndex({keywords: params.keywords})
    }else{
      Actions.ProjectIndexLJ({keywords: params.keywords})
    }
  }

  _emptySearchHistory(){
    storage.save({
      key: keys.historySearchListIndex,
      data: [],
      expires: null
    });
    this.setState({
      historySearch: []
    })
  }

  _delSearchHistory(keywords){
    storage.load({
      key:keys.historySearchListIndex
    }).then(historySearch => {
      historySearch.pop(keywords)
      storage.save({
        key: keys.historySearchListIndex,
        data: historySearch,
        expires: null
      });
      this.setState({
        historySearch: historySearch
      })
    }).catch(error => {
    })
  }

  closeCity(){
    this.setState({cityIsVisible:false});
  }
  _renderAusleseProjects() {
    return (
      <ScrollView style={styles.recommendMain} horizontal={true} showsHorizontalScrollIndicator={false}>
        {
          this.state.ausleseProjects.map(project => {
            return (
              <TouchableHighlight underlayColor="transparent" key={project.id} onPress={() => {Actions.ProjectDetails({id: project.id})}}>
                <View style={styles.recommendView1}>
                      <View style={styles.listTitle} ellipsizeMode={'clip'}>
                        <Text style={fonts.bodyText_Black} numberOfLines={1} >{project.name}</Text>
                      </View>
                      {
                        project.projectImg ?
                          <Image style={styles.recommendImg} source={{uri: staticSite + project.projectImg}}/>
                        :
                          <Image style={styles.recommendImg} source={require('../../images/projectList.png')}/>
                      }
                      {
                        project.isSale ?
                          <View style={styles.marginTop8}>
                            <Text style={fonts.hintText_Gray} >销售均价：<Text style={[fonts.hintText_Black,styles.txtRed]}>{project.salePrice}</Text>元/㎡</Text>
                          </View>
                        :
                        null
                      }
                      {
                        project.isLease ?
                          <View style={styles.marginTop8}>
                            <Text style={fonts.hintText_Gray} numberOfLines={1}>租金均价：<Text style={[fonts.hintText_Black,styles.txtRed]}>{project.leasePrice}</Text>元/天/㎡</Text>
                          </View>
                        :
                        null
                      }
                      <View style={styles.gzView}>
                            <Image source={require('../../images/index_area.png')} />
                            <Text style={[fonts.tinyText_Gray,styles.marginLeft5]}>{project.city}-{project.area}</Text>
                      </View>
                </View>
              </TouchableHighlight>
            );
          })
        }
      </ScrollView>
    );
  }
  _renderAusleseShops() {
    return (
      <ScrollView style={styles.recommendMain} horizontal={true} showsHorizontalScrollIndicator={false}>
        {
          this.state.ausleseShops.map(project => {
            return (
              <TouchableHighlight underlayColor="transparent" key={project.id} onPress={() => {Actions.ShopDetails({id: project.id})}}>
                <View style={styles.recommendView1}>
                      <View style={styles.listTitle} ellipsizeMode={'clip'}>
                        <Text style={fonts.bodyText_Black} numberOfLines={1}>{project.name}</Text>
                      </View>
                      {
                        project.shopImg ?
                          <Image style={styles.recommendImg} source={{uri: staticSite + project.shopImg}}/>
                        :
                          <Image style={styles.recommendImg} source={require('../../images/projectList.png')}/>
                      }
                      {
                        project.totalPrice ?
                          <View style={styles.marginTop8}>
                            <Text style={fonts.hintText_Gray}>售价：<Text style={[fonts.hintText_Black,styles.txtRed]}>{project.totalPrice}</Text>万元</Text>
                          </View>
                        : null
                      }
                      {
                        project.monthlyRent ?
                          <View style={styles.marginTop8}>
                            <Text style={fonts.hintText_Gray}>租金：<Text style={[fonts.hintText_Black,styles.txtRed]}>{project.monthlyRent}</Text>元/月</Text>
                          </View>
                        : null
                      }
                      <View style={styles.gzView}>
                            <Image source={require('../../images/index_area.png')} />
                            <Text style={[fonts.tinyText_Gray,styles.marginLeft5]}>{project.city}-{project.area}</Text>
                      </View>
                </View>
              </TouchableHighlight>
            );
          })
        }
      </ScrollView>
    );
  }
  render() {
    return (
      <View style={styles.container}>
            <StatusBar backgroundColor="transparent"  barStyle="dark-content" translucent={true}/>
            <View style={styles.topView}>
                  <TouchableHighlight style={styles.TopTouch} underlayColor="transparent" onPress={() => {this.setState({cityIsVisible:true})}}>
                       <View style={styles.chooseCity}>
                             <Text style={[styles.chooseText,fonts.tinyText_Black]}>{this.state.selectedCity}</Text>
                             <Image source={require('../../images/select2.png')}></Image>
                       </View>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.SearchBtn} underlayColor="transparent" onPress={() => this._searchContent()}>
                             <View style={{flexDirection:"row",alignItems:"center"}}>
                             <Image style={styles.SearchIcon} source={require('../../images/search2.png')}></Image>
                             <Text style={[fonts.hintText_Gray]}>请输入关键字</Text>
                             </View>
                  </TouchableHighlight>
            </View>
            <ScrollView style={{marginBottom:55}}>
            <View style={styles.swiper}>
                {
                  this.state.swiperData ?
                    <Swiper style={styles.wrapper} autoplay={true} paginationStyle={{paddingBottom:35}}
                     dotStyle={{backgroundColor:"rgba(255,255,255,0.7)",width:5,height:5,}}
                     activeDotStyle={{backgroundColor:"rgba(255,255,255,1)",width:8,height:8,}}
                     loop={true} showsPagination={true}>
                      {
                        this.state.swiperData.map((data) => {
                          return (
                            <View style={styles.slide} key="{data.id}">
                              <TouchableHighlight underlayColor="transparent" onPress={() => {UMengAnalytics.onEvent('home_banner_click');Actions.Details({detailsId: data.articleId})}}>
                                  <Image style={styles.slideImg} source={{uri: staticSite + data.coverUrl}}/>
                              </TouchableHighlight>
                            </View>
                          )
                        })
                      }
                    </Swiper>
                  : null
                }
            </View>

                         <View style={styles.BottomView}>
                         <TouchableHighlight style={styles.touchBtn} underlayColor="transparent" onPress={()=>Actions.ProjectIndex()}>
                             <View style={styles.touchView}>
                                   <Image  source={require('../../images/ysxm.png')}/>
                                   <Text style={[styles.textTop,fonts.tinyText_Black]}>商业项目</Text>
                             </View>
                         </TouchableHighlight>
                         {
                           // <TouchableHighlight style={styles.touchBtn} underlayColor="transparent" onPress={()=>Actions.ShopList({})}>
                           //     <View style={styles.touchView}>
                           //           <Image  source={require('../../images/essp.png')}/>
                           //           <Text style={[styles.textTop,fonts.tinyText_Black]}>商铺租赁</Text>
                           //     </View>
                           // </TouchableHighlight>
                         }
                         <TouchableHighlight style={styles.touchBtn} underlayColor="transparent" onPress={()=>Actions.MapShop({})}>
                             <View style={styles.touchView}>
                                   <Image  source={require('../../images/essp.png')}/>
                                   <Text style={[styles.textTop,fonts.tinyText_Black]}>地图找铺</Text>
                             </View>
                         </TouchableHighlight>
                         <TouchableHighlight style={styles.touchBtn} underlayColor="transparent" onPress={()=>Actions.ProjectIndexLJ()}>
                             <View style={styles.touchView}>
                                   <Image  source={require('../../images/lj.png')}/>
                                   <Text style={[styles.textTop,fonts.tinyText_Black]}>住宅办公</Text>
                             </View>
                         </TouchableHighlight>
                               {
                              //  <TouchableHighlight style={styles.touchBtn} underlayColor="transparent" onPress={()=>
                              //    {
                               //
                              //      this.checkIsLogin('Cooperation').then(flag=>{
                              //        if (flag) {
                              //          Actions.Cooperation({})
                              //        }
                              //      })
                              //    }
                              //   }>
                              //      <View style={styles.touchView}>
                              //            <Image  source={require('../../images/fqhz.png')}/>
                              //            <Text style={[styles.textTop,fonts.tinyText_Black]}>发起合作</Text>
                              //      </View>
                              //  </TouchableHighlight>
                               }
                               <TouchableHighlight style={styles.touchBtn} underlayColor="transparent" onPress={()=>Actions.NewsList({})}>
                                   <View style={styles.touchView}>
                                         <Image  source={require('../../images/dtzp.png')}/>
                                         <Text style={[styles.textTop,fonts.tinyText_Black]}>资讯频道</Text>
                                   </View>
                               </TouchableHighlight>
                               <TouchableHighlight style={styles.touchBtn} underlayColor="transparent" onPress={()=>
                                 {
                                   this.checkIsLogin('DemandInput').then(flag=>{
                                     if (flag) {
                                       Actions.DemandInput({})
                                     }
                                   })
                                 }
                               }>
                                   <View style={styles.touchView}>
                                         <Image  source={require('../../images/xqlr.png')}/>
                                         <Text style={[styles.textTop,fonts.tinyText_Black]}>需求录入</Text>
                                   </View>
                               </TouchableHighlight>
                               <TouchableHighlight style={styles.touchBtn} underlayColor="transparent" onPress={()=>Actions.BrandsList()}>
                                   <View style={styles.touchView}>
                                         <Image  source={require('../../images/ppk.png')}/>
                                         <Text style={[styles.textTop,fonts.tinyText_Black]}>品牌库</Text>
                                   </View>
                               </TouchableHighlight>
                               <TouchableHighlight style={styles.touchBtn} underlayColor="transparent" onPress={()=>
                                 {
                                   this.checkIsLogin('DemandInput').then(flag=>{
                                     if (flag) {
                                       Actions.SpreadQr({qrType:'0'})
                                     }
                                   })
                                 }
                               }>
                                   <View style={styles.touchView}>
                                         <Image  source={require('../../images/ypsq.png')}/>
                                         <Text style={[styles.textTop,fonts.tinyText_Black]}>微信推广</Text>
                                   </View>
                               </TouchableHighlight>
                               <TouchableHighlight style={styles.touchBtn} underlayColor="transparent" onPress={()=>
                                 {
                                    this.checkIsLogin('DemandInput').then(flag=>{
                                      if (flag) {
                                        Actions.SpreadQr({qrType:'1'})
                                      }
                                    })
                                  }
                                }>
                                   <View style={styles.touchView}>
                                         <Image  source={require('../../images/zxpd.png')}/>
                                         <Text style={[styles.textTop,fonts.tinyText_Black]}>发展团队</Text>
                                   </View>
                               </TouchableHighlight>


                         </View>
                   {
                  //  <View style={styles.middleView}>
                  //        <TouchableHighlight style={styles.middleTouch} underlayColor="transparent" onPress={()=>{
                  //          this.checkIsLogin('ReportProject').then(flag=>{
                  //            if (flag) {
                  //              Actions.ReportProject({source: 0})
                  //            }
                  //          })
                   //
                  //        }}>
                  //             <Image  source={require('../../images/ksbb.png')}/>
                  //        </TouchableHighlight>
                  //        <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.CommunityIndex({})}>
                  //             <Image  source={require('../../images/ypsq.png')}/>
                  //        </TouchableHighlight>
                  //  </View>
                   }

                     <View style={styles.ChartView}>
                           <View style={styles.chartLeft}>
                                 <Image  source={require('../../images/chart01.png')}/>
                                 <View style={styles.leftView}>
                                       <View style={[styles.rightView,styles.mb10]}>
                                             <Text style={styles.flagBg}>●</Text>
                                             <Text style={fonts.tinyText_Gray}>入驻品牌量：{this.state.countBrand}</Text>
                                       </View>
                                       <View style={styles.rightView}>
                                             <Text style={styles.flagBg1}>●</Text>
                                             <Text style={fonts.tinyText_Gray}>入驻经纪人量：{this.state.countUser}</Text>
                                       </View>
                                 </View>
                           </View>
                           <View style={styles.chartRight}>
                                 <Image  source={require('../../images/chart02.png')}/>
                                 <View style={styles.leftView}>
                                       <View style={[styles.rightView,styles.mb10]}>
                                             <Text style={styles.flagBg}>●</Text>
                                             <Text style={fonts.tinyText_Gray}>销售：{this.state.countBusinessXs}</Text>
                                       </View>
                                       <View style={styles.rightView}>
                                             <Text style={styles.flagBg1}>●</Text>
                                             <Text style={fonts.tinyText_Gray}>招商：{this.state.countBusinessZs}</Text>
                                       </View>
                                 </View>
                           </View>
                     </View>

                   <View style={styles.projectView}>
                         {this.state.ausleseProjects && this.state.ausleseProjects.length>0?
                           <View style={styles.projectTitle}>
                                 <Text style={[fonts.bodyText_Black,styles.titleWeight]}> 精选项目 </Text>
                           </View>
                           :null
                         }

                         <View style={styles.featured}>
                               {
                                //  this.state.dataSource ?
                                //    <ListView contentContainerStyle={styles.list}
                                //    dataSource={this.state.dataSource}
                                //    enableEmptySections={true}
                                //    renderRow={(data) => <AttentionListItem {...data} source="index" />}
                                //    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}  />}/>
                                //   this._renderAusleseProjects()
                                //  : null
                               }
                               {
                                 this.state.ausleseProjects&& this.state.ausleseProjects.length>0 ? this._renderAusleseProjects() : null
                               }
                         </View>
                         {this.state.ausleseShops && this.state.ausleseShops.length>0?
                           <View style={styles.projectTitle}>
                                 <Text style={[fonts.bodyText_Black,styles.titleWeight]}> 精选商铺 </Text>
                           </View>
                           :
                           null
                         }
                         {
                           this.state.ausleseShops && this.state.ausleseShops.length>0? this._renderAusleseShops() : null
                         }

                   </View>
                   {
                     this.renderModal()
                   }
                   {
                     this.renderLoading()
                   }
                   <CitySelect cityClick={(index)=>{this.changeCity(index)}} onClose={()=>{this.closeCity()}} isVisible={this.state.cityIsVisible} cityData={this.state.city} selectIndex={this.state.selectIndex} />

      </ScrollView>
      <CustomTabBar checkIndex={0} />
      </View>
    );
  }
}
