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
  Linking,
  ScrollView,
  Animated,
  Easing
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/newApp/NewIndex';
import Swiper from 'react-native-swiper';
import ProspectingListItem from './ProspectingListItem';
import SectionHeader from '../data/SectionHeader';
import BasicComponent from '../basic/BasicComponent';
import {cityData} from '../data/CityData'
import CitySelect from '../../commonComponents/city/CitySelect';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import CustomTabBar from '../../commonComponents/tabBar/CustomTabBar1';
import { NiceList } from '../../commonComponents/niceList/NiceList';
import { apis, staticSite,currentVersion } from '../../systemComponents/Remote/ApiStorage';
import { checkVersion,getRemoteVersion,updateBasicVersion } from '../../systemComponents/VersionControl/VersionApp';


import { UMengAnalytics } from '../../commonComponents/umeng/UMAnalytics';
import AppMessageCenter from '../../systemComponents/routerCenter/AppMessageCenter';

const Permissions = require('react-native-permissions');

var { NativeAppEventEmitter } = require('react-native');
var receiveRemoteNotificationSub;
var clickRemoteNotificationSub;
export default class NewIndex extends BasicComponent {

  constructor(props){
     super(props);
     this.state={
      modalObject:{},
      loadingObject:{},
      swiperData: null,
      height:false,
      fadeAnim: new Animated.Value(0),
      remoteUrl:'',
      storkey:keys.newsList,
     }
   }
   async componentWillMount(){
     await this._initSwiperData();
     await this._showList();
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
   _showList(){
     this.openLoading();
     storage.load({
       key: keys.OfflineActivitK,
       syncInBackground: false,
       syncParams: {
          url: apis.OfflineActivitK+'?type='+'活动' + '&mold=' + 'true',
       }
     }).then(ret => {
       if(ret.status == 200){
         return ret.json();

       }else{
         this.msgShort('异常');
         this.closeLoading();
       };
     }).then(retJson=>{
       this.closeLoading();
       let remoteUrl = this.state.remoteUrl;
       this.setState({remoteUrl:apis.newsList+'?catId='+retJson[0].id})
    }).catch(err=>{
      this.closeLoading();
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
    //  this._initSearchData();
     this.content(
       {
         isWholeCustom:true,
         customText:()=>{
           return (<View style={[styles.modalMask]}>
                 <View style={styles.centerView}>
                       <View style={styles.searchTop}>
                             <View style={styles.searchInput}>
                                         <View style={styles.searchSelect}>
                                               <Image style={styles.searchSelectIcon} source={require('../../images/newApp/search2.png')}/>
                                         </View>
                                   <TextInput style={[styles.searchIputRest,fonts.bodyText_Black]} autoFocus={false}
                                     underlineColorAndroid="transparent"
                                     placeholder="区域／面积／租金／商铺编号" clearButtonMode="always" returnKeyType='send'
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
                         this.state.historySearch && this.state.historySearch.length > 0 ?
                           <View style={styles.historyView}>
                             <View style={styles.historyViewSon}>
                               <Text style={[fonts.bodyText_Black,styles.historyText]}>搜索历史</Text>
                               <TouchableHighlight style={styles.delectTouchRest} underlayColor="transparent" onPress={() => this._emptySearchHistory()}>
                                 <Image  source={require('../../images/newApp/delete.png')}/>
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
                 </View>
           </View>);
         }
       })
   }
  //滑动显示搜索导航
   showView(){
     Animated.timing(
     this.state.fadeAnim,//初始值
     {
       toValue: 1,
       duration: 300,
       easing: Easing.linear
     }//结束值
     ).start();//开始
   }
   closeView(){
     Animated.timing(
     this.state.fadeAnim,//初始值
     {
       toValue: 0,
       duration: 300,
       easing: Easing.linear
     }//结束值
     ).start();//开始
   }
  //显示拨打电话
   _ShowTel(){
     this.confirm(
       {
         text:'业务咨询 | 服务投诉热线 4008988808',
         ok:{click:()=>{this._Qg()},text:'拨打'},
         no:{text:'取消'},
       });
   }
















  render() {
    return (
      <View style={styles.container}>
            <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true}/>
            <ScrollView style={styles.scrollView} onScroll={(e)=>{
              if(e.nativeEvent.contentOffset.y>0){
                this.showView();
                this.setState({height:true})
              }else{
                this.closeView();
                this.setState({height:false})
              }
            }}>
            <View style={styles.swiper}>
                {
                  this.state.swiperData ?
                    <Swiper style={styles.wrapper} autoplay={true} paginationStyle={{paddingBottom:10}}
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
                <TouchableHighlight style={styles.searchRight} underlayColor="transparent" onPress={() => this._searchContent()}>
                    <Image  source={require('../../images/newApp/search.png')}/>
                </TouchableHighlight>
            </View>
            <View style={styles.BottomView}>
                  <TouchableHighlight style={[styles.touchBtn,styles.touchBtn1]} underlayColor="transparent" onPress={()=>Actions.ProjectIndex()}>
                      <View style={styles.touchView}>
                            <Image  source={require('../../images/newApp/seeShop.png')}/>
                            <Text style={[styles.textTop,fonts.tinyText_Black]}>查看新铺</Text>
                      </View>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.touchBtn} underlayColor="transparent" onPress={()=>Actions.FindShop({})}>
                      <View style={styles.touchView}>
                            <Image  source={require('../../images/newApp/findShop.png')}/>
                            <Text style={[styles.textTop,fonts.tinyText_Black]}>委托找铺</Text>
                      </View>
                  </TouchableHighlight>
                  <TouchableHighlight style={[styles.touchBtn,styles.touchBtn2]} underlayColor="transparent" onPress={()=>Actions.SubleaseShop()}>
                      <View style={styles.touchView}>
                            <Image  source={require('../../images/newApp/transferShop.png')}/>
                            <Text style={[styles.textTop,fonts.tinyText_Black]}>委托转铺</Text>
                      </View>
                  </TouchableHighlight>
            </View>
            <View style={{alignItems:"center"}}>
                <Image   source={require('../../images/newApp/dataImages.png')}>
                       <View style={styles.MiddleView}>
                             <View style={[styles.textView,styles.textView1]}>
                                   <Text style={fonts.tinyText_Gray}><Text style={[fonts.t3_Red,styles.textNum]}>814</Text> 套</Text>
                                   <Text style={fonts.tinyText_Gray}>24小时新上</Text>
                             </View>
                             <View style={styles.textView}>
                                   <Text style={fonts.tinyText_Gray}><Text style={[fonts.t3_Red,styles.textNum]}>77847</Text> 套</Text>
                                   <Text style={fonts.tinyText_Gray}>在线转铺</Text>
                             </View>
                             <View style={[styles.textView,styles.textView2]}>
                                   <Text style={fonts.tinyText_Gray}><Text style={[fonts.t3_Red,styles.textNum]}>20173</Text> 套</Text>
                                   <Text style={fonts.tinyText_Gray}>正在找铺</Text>
                             </View>
                       </View>
                </Image>
            </View>
            <View style={styles.newsView}>
                  <Image   source={require('../../images/newApp/newsImage.png')} style={{marginRight:10}}/>
                  <Image   source={require('../../images/newApp/HOT.png')}/>
                  <TouchableHighlight >
                    <View ellipsizeMode={'clip'} style={{flex:1,paddingLeft:5}}>
                          <Text style={fonts.hintText_Gray} numberOfLines={1} >新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻</Text>
                    </View>
                  </TouchableHighlight>
            </View>
            <View style={styles.projectView}>
                  <View style={styles.projectTitle}>
                        <Text style={[fonts.bodyText_Black,styles.titleWeight]}> 独家实勘商铺 </Text>
                        <TouchableHighlight style={{marginRight:10}}>
                           <Text style={fonts.tinyText_Gray}>查看全部 ></Text>
                        </TouchableHighlight>
                  </View>
                  {
                    this.state.remoteUrl&&this.state.remoteUrl.length>0?
                    <NiceList renderItem={(rowData)=><ProspectingListItem {...rowData} />}
                    contentContainerStyle={styles.list}
                    remoteUrl={this.state.remoteUrl}
                    storkey={this.state.storkey}/>:null
                  }
            </View>
            </ScrollView>
            {this.state.height?
            <Animated.View style={{width:Dimensions.get('window').width,
            position:'absolute',
            left:0,
            top:0,
            flexDirection:"row",
            backgroundColor:"#f6f9fc",
            height:64,
            alignItems:"center",
            justifyContent:"center",
            paddingTop:0,opacity: this.state.fadeAnim}}>
                  <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
                  <View style={styles.topView}>
                        <TouchableHighlight style={styles.TopTouch} underlayColor="transparent" onPress={() => {this.setState({cityIsVisible:true})}}>
                             <View style={styles.chooseCity}>
                                   <Text style={[styles.chooseText,fonts.tinyText_Black]}>北京</Text>
                                   <Image source={require('../../images/newApp/index_area.png')}></Image>
                             </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.SearchBtn} underlayColor="transparent" onPress={() => this._searchContent()}>
                                   <View style={{flexDirection:"row",alignItems:"center"}}>
                                   <Image style={styles.SearchIcon} source={require('../../images/search2.png')}></Image>
                                   <Text style={[fonts.hintText_Gray]}>区域／面积／租金／商铺编号</Text>
                                   </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.middleTouch} underlayColor="transparent" onPress={()=>this._ShowTel()}>
                              <Image source={require('../../images/newApp/phone.png')}></Image>
                        </TouchableHighlight>
                  </View>
            </Animated.View>
            :
            null
           }
            <CustomTabBar checkIndex={0} />
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
AppRegistry.registerComponent('NewIndex', () => personalIndex);
