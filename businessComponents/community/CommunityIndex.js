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
import Swiper from 'react-native-swiper';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/community/CommunityIndex';
import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { NiceList } from '../../commonComponents/niceList/NiceList';
import ListBasicComponent from '../basic/ListBasicComponent';
import {staticSite} from '../../systemComponents/Remote/ApiStorage';
import CommunityFooter from './CommunityFooter';
import { UMengAnalytics } from '../../commonComponents/umeng/UMAnalytics';

export default class CommunityIndex extends ListBasicComponent {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let data = [];
    let user ={item:{name:'sasa'}};
    data.push(user);
    this.state={
      dataSource: ds.cloneWithRows(data),
      storkey:keys.moduleList,
      remoteUrl:[],
      tabUrl:'',
      tabArrary:null,
      tabsId: [],
      footerArrary: [],
      footersId : [],
    };
  }
  componentWillMount(){
    //渲染社区轮播图
    this._carousel();
    //渲染社区底部模块
    this._footer();
   }
   //社区轮播图
   _carousel(){
    storage.load({
      key: keys.CommunityCarousel,
      syncInBackground: false,
      syncParams: {
         url: apis.CommunityCarousel
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json();
      }else{

      };
    }).then(res => {
        let tabUrl = this.state.tabUrl;
        this.setState({tabUrl:apis.moduleList+'?moduleId='+res[0].id});
        this.openLoading('正在加载...');
        storage.load({
          key: keys.moduleList,
          syncInBackground: false,
          syncParams: {
             url: this.state.tabUrl,
          }
        }).then(ret => {
          if(ret.status == 200){
            return ret.json();
          }else{
             this.msgShort(ret.msg)
          };
        }).then(res => {
            this.closeLoading();
            let newArry=[];
            let tabArrary=this.state.tabArrary;
            let tabsIdArry=[]
            let tabsId=this.state.tabsId;
            for (var j=0;j<res.content.length;j++){
              newArry.push({coverUrl:res.content[j].coverUrl,articleId:res.content[j].article.id});
              tabsIdArry.push({id:res.content[j].id});
            }
            this.setState({tabArrary:newArry,tabsId:tabsIdArry});

        }).catch(err => {
          this.closeLoading();
          this.msgShort('获取异常')
        })

    }).catch(err => {

    })
  }
  //底部模块
  _footer(){
    this.openLoading('正在加载...');
    storage.load({
      key: keys.CommunityFooter,
      syncInBackground: false,
      syncParams: {
         url: apis.CommunityFooter,
      }
    }).then(retJson => {
      if(retJson.status == 200){
        return retJson.json();
      }else{
         this.msgShort(retJson.msg)
      };
    }).then(resJson => {
        this.closeLoading();
        let footerArry=[];
        let footerArrary=this.state.footerArrary;
        let footersIdArry=[];
        let footersId=this.state.footersId;
        let remotesUrl=[];
        let remoteUrl = this.state.remoteUrl;
        for (var j=0;j<resJson.length;j++){
          footerArry.push({name:resJson[j].name});
          footersIdArry.push({id:resJson[j].id});
          remotesUrl.push({url:apis.moduleList+'?size=2&moduleId='+resJson[j].id})
        }
        this.setState({footerArrary:footerArry,footersId:footersIdArry,remoteUrl:remotesUrl});

    }).catch(err => {
      this.closeLoading();
      this.msgShort('获取异常')
    })
  }
  //轮播图循环
  renderTab(item,i){
    return <TouchableHighlight style={styles.slide} key={i} onPress={()=>{UMengAnalytics.onEvent('social_banner_click');Actions.Details({detailsId:item.articleId})}}>
            <Image style={styles.bgImg} source={{uri:staticSite + item.coverUrl}}/>
          </TouchableHighlight>;
  }
  //社区底部模块循环
  renderFooter(item,i){
    return <View style={styles.ViewList} key={i}>
              <View style={styles.ViewTitle}>
                <Text style={[styles.ViewTitleText,fonts.bodyText_Black]}>{item.name}</Text>
              </View>
              <NiceList normalList={false} isShowEmptyInfo={false} renderItem={(rowData)=><CommunityFooter {...rowData}  />}
              contentContainerStyle={styles.list}
              remoteUrl={this.state.remoteUrl[i].url} storkey={this.state.storkey}/>
          </View>


  }

  render() {
    return (
      <View style={styles.container}>
            <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true}/>
            <ScrollView>
            <View style={styles.swiper}>
            {
              this.state.tabArrary ?
                  <Swiper style={styles.wrapper} autoplay={true} height={220} loop={true} showsPagination={true}>
                    {
                      this.state.tabArrary.map((item,i)=>this.renderTab(item,i))
                    }
                  </Swiper>
             : null
            }
            </View>
            <View style={[styles.viewNav]}>
                  <TouchableHighlight style={[styles.navBtnA]} underlayColor="transparent" onPress={()=>Actions.OfflineActivit({})}>
                        <View style={[styles.navBtn]}>
                              <Image style={[styles.navBtnImg]} source={require('../../images/communityIcon1.png')}></Image>
                              <Text style={[fonts.hintText_Black]}>线下活动</Text>
                        </View>
                  </TouchableHighlight>
                  <TouchableHighlight style={[styles.navBtnA]} underlayColor="transparent" onPress={()=>Actions.CooperativeAlliance({})}>
                        <View style={[styles.navBtn]}>
                              <Image style={[styles.navBtnImg]} source={require('../../images/communityIcon2.png')}></Image>
                              <Text style={[fonts.hintText_Black]}>合作伙伴</Text>
                        </View>
                  </TouchableHighlight>
                  <TouchableHighlight style={[styles.navBtnA]} underlayColor="transparent" onPress={()=>Actions.DemandList({})}>
                        <View style={[styles.navBtn]}>
                              <Image style={[styles.navBtnImg]} source={require('../../images/communityIcon3.png')}></Image>
                              <Text style={[fonts.hintText_Black]}>需求信息</Text>
                        </View>
                  </TouchableHighlight>
                  <TouchableHighlight style={[styles.navBtnA]} underlayColor="transparent" onPress={()=>Actions.ForumList({})}>
                        <View style={[styles.navBtn]}>
                              <Image style={[styles.navBtnImg]} source={require('../../images/communityIcon4.png')}></Image>
                              <Text style={[fonts.hintText_Black]}>优铺论坛</Text>
                        </View>
                  </TouchableHighlight>
                  <TouchableHighlight style={[styles.navBtnA]} underlayColor="transparent" onPress={()=>Actions.Rankinglist({})}>
                        <View style={[styles.navBtn]}>
                              <Image style={[styles.navBtnImg]} source={require('../../images/communityIcon5.png')}></Image>
                              <Text style={[fonts.hintText_Black]}>优铺榜单</Text>
                        </View>
                  </TouchableHighlight>
            </View>
                {this.state.footerArrary.map((item,i)=>this.renderFooter(item,i))}
      </ScrollView>
      <TouchableHighlight style={[styles.navBack]} underlayColor="transparent" onPress={()=>Actions.reset('Index',{})}>
            <Image source={require('../../images/backWhite.png')}></Image>
      </TouchableHighlight>
      </View>
    );
  }
}
AppRegistry.registerComponent('CommunityIndex', () => CommunityIndex);
