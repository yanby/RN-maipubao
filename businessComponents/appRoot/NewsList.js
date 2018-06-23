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
import { Actions } from 'react-native-router-flux';

import TabNavigator from 'react-native-tab-navigator';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/community/DemandList';
import NewsListItem from './NewsListItem';

import ListBasicComponent from '../basic/ListBasicComponent';
import { NiceList } from '../../commonComponents/niceList/NiceList';

import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class NewsList extends ListBasicComponent {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      remoteUrl:null,
      storkey:keys.newsList,
      tabArrary:[],
      status:[],
      currentIndex:0,
      tabsId:[],
      keywords: null
    };
  }
    componentWillMount(){
    this.openLoading('正在加载...');
    storage.load({
      key: keys.newsListTabs,
      syncInBackground: false,
      syncParams: {
	       url: apis.newsListTabs
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json();
      }else{
         return Promise.reject('error')
      };
    }).then(res => {
        let newArry=[];
        let tabArrary=this.state.tabArrary;
        let tabsIdArry=[]
        let tabsId=this.state.tabsId;
        let tempArry=[];
        let status=this.state.status;
        for (var j=0;j<res.length;j++){
          newArry.push(res[j].name);
          tabsIdArry.push(res[j].id);
          tempArry.push(false);
        }
        if (tabsIdArry.length>0) {
          this.setState({tabArrary:newArry,tabsId:tabsIdArry,status:tempArry,remoteUrl:apis.newsList+'?catId='+tabsIdArry[0]});
          this.initTabInfo(this.state.tabArrary[0]);
          this.closeLoading();
        }else {
          this.msgShort('小编正在加快上线新闻哦',()=>{
            Actions.pop();
          })
        }
    }).catch(err => {
      this.closeLoading();
      this.msgShort('获取异常')
    })

  }
  initTabInfo(_tab){
    let tabsInfo = [];
    let mstatus = this.state.status;
    let tabArraryText =this.state.tabArrary;
    for (var i=0;i<tabArraryText.length;i++) {
      mstatus[i+1]=false;
      tabsInfo.push({tabsInfo:tabArraryText[i]});
    }
    mstatus[0]=true;
    this.setState({status:mstatus});
    this.setState({tabArrary:tabsInfo});

  }
  renderTab(item,i){
    return <TouchableHighlight style={this.state.status[i]?styles.mouthViewRest:styles.mouthView} key={i} underlayColor="#fff"
       onPress={()=>this._onPressTabs(item,i)}>
      <Text style={[this.state.status[i]?fonts.bodyText_Blue:fonts.bodyText_Gray]}>{item.tabsInfo}</Text>
    </TouchableHighlight>;
  }
  _onPressTabs(item,i){
    let showState = this.state.status;
    let currentIndex=this.state.currentIndex;
    showState[this.state.currentIndex] = false;
    showState[i] = !showState[i];
    this.setState({status:showState});
    this.setState({currentIndex:i});
    if(this.state.status){
      this.setState({remoteUrl:apis.newsList+'?catId='+this.state.tabsId[i]});
    }
  }
  render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
      <Title isLeftShow={true} backColor={true}  title={'资讯频道'} >
      </Title>
      <ScrollView keyboardDismissMode={'on-drag'} horizontal={true} style={styles.scrollView} showsHorizontalScrollIndicator={false}>
          {
            this.state.tabArrary.map((item,i)=>this.renderTab(item,i))
          }
      </ScrollView>
      <View style={[styles.mainList]}>
      {
        this.state.remoteUrl?
        <NiceList renderItem={(rowData)=><NewsListItem {...rowData} />} contentContainerStyle={styles.list} remoteUrl={this.state.remoteUrl} storkey={this.state.storkey}/>
        :null

      }
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
AppRegistry.registerComponent('NewsList', () => NewsList);
