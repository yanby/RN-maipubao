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
import {styles} from '../../styles/community/OfflineActivit';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import ForumListItem from './ForumListItem';
import { Actions,ActionConst } from 'react-native-router-flux';
import ListBasicComponent from '../basic/ListBasicComponent';
import { NiceList } from '../../commonComponents/niceList/NiceList';
import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
export default class ForumList extends ListBasicComponent {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let data = [];
    let user ={item:{name:'sasa'}};
    data.push(user);
    data.push(user);
    this.state={
      modalObject:{},
      loadingObject:{},
      dataSource: ds.cloneWithRows(data),
      selected:0,
      tabArrary:[],
      tabsId:[],
      remoteUrl:null,
      storkey:keys.forumList,
      numberOfElements:0

    };
  }
  async  componentWillMount(){
    this._loadList();
  }
  // 加载列表
  _loadList(){
    storage.load({
      key: keys.forumListTabs,
      syncInBackground: false,
      syncParams: {
	       url: apis.forumListTabs
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
        for (var j=0;j<res.length;j++){
          newArry.push(res[j].name);
          tabsIdArry.push(res[j].id);
        }
        if (tabsIdArry.length>0) {
          this.setState({tabArrary:newArry,tabsId:tabsIdArry,remoteUrl:apis.forumList+'?catId='+tabsIdArry[0]});
        }else {
          this.msgShort('小编正在加快上线新闻哦',()=>{
            Actions.pop();
          })
        }

    }).catch(err => {
      this.msgShort('没有获取到任何信息，请稍后再次尝试')
    })
  }
  _onTabPress(index){
    this.setState({selected:index});
    this.setState({remoteUrl:apis.forumList+'?catId='+this.state.tabsId[index]});
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
      <View style={styles.tabView}>
            <SegmentedControlTab borderRadius={0} tabsContainerStyle={styles.tabsContainerStyle}
                tabStyle={styles.tabStyle} tabTextStyle={[styles.tabTextStyle,fonts.bodyText_Black]}
                activeTabStyle={styles.activeTabStyle} activeTabTextStyle={[fonts.bodyText_Black,styles.activeTabTextStyle]}
                selectedIndex={this.state.selected} values={this.state.tabArrary}
                onTabPress= {index => this._onTabPress(index)}/>
                <TouchableHighlight style={styles.backView} underlayColor="transparent" onPress={()=>Actions.pop({})}>
                      <Image  source={require('../../images/back.png')}/>
                </TouchableHighlight>
                <TouchableHighlight style={styles.EditView} underlayColor="transparent" onPress={()=>Actions.AddForum({})}>
                      <Image  source={require('../../images/input-pen.png')}/>
                </TouchableHighlight>
      </View>
      <View style={styles.mianView}>
        <View style={styles.ForumListTitle}>
              <Text style={[styles.allianceText,fonts.tinyText_Gray]}>论坛数{this.state.numberOfElements}</Text>
              <TouchableHighlight>
              <Image  source={require('../../images/sort.png')}/>
              </TouchableHighlight>
        </View>
        {
          this.state.remoteUrl?<NiceList isNeedLoading={true} getTotalCount={(count)=>{this.setState({numberOfElements:count})}} renderItem={(rowData)=><ForumListItem {...rowData} />} contentContainerStyle={styles.list} remoteUrl={this.state.remoteUrl} storkey={this.state.storkey}/>
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
