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
import {styles} from '../../styles/community/DemandList';
import DemandListItem from './DemandListItem';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import ListBasicComponent from '../basic/ListBasicComponent';
import { NiceList } from '../../commonComponents/niceList/NiceList';
import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
export default class DemandList extends ListBasicComponent {
  constructor(props){
    super(props);
    let a = '1';
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let data = [];
    let user ={item:{name:'sasa'}};
    data.push(user);
    this.state={
      modalObject:{},
      loadingObject:{},
      dataSource: ds.cloneWithRows(data),
      selected:0,
      remoteUrl:'',
      storkey:keys.demandList,
      tabArrary:[],
      tabsId:[],
      numberOfElements:0
    };
  }
  async  componentWillMount(){
    storage.load({
      key: keys.demandListTabs,
      syncInBackground: false,
      syncParams: {
	       url: apis.demandListTabs
      }
    }).then(ret => {
      console.log(ret);
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
        this.setState({tabArrary:newArry,tabsId:tabsIdArry,remoteUrl:apis.demandList+'?catId='+tabsIdArry[0]});
    }).catch(err => {
      this.msgShort('没有获取到任何信息，请稍后再次尝试')
    })
  }
  _onTabPress(index){
    this.setState({selected:index});
    this.setState({remoteUrl:apis.demandList+'?catId='+this.state.tabsId[index]});
  }
  render() {
    return (
      <View style={[styles.mainList]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <View style={styles.signTitleView}>
              <TouchableHighlight style={styles.backView} underlayColor="transparent" onPress={()=>Actions.pop({})}>
                    <Image  source={require('../../images/back.png')}/>
              </TouchableHighlight>
              <Text style={fonts.t2_Black}>需求信息</Text>
              <TouchableHighlight style={styles.searchView} underlayColor="transparent" onPress={()=>{
                this.checkIsLogin('DemandInput').then(flag=>{
                  if (flag) {
                    Actions.DemandInput({})
                  }
                })
              }}>
                    <Image  source={require('../../images/input-pen.png')}/>
              </TouchableHighlight>
        </View>
        <View style={styles.tabView}>
              <SegmentedControlTab borderRadius={0} tabsContainerStyle={styles.tabsContainerStyle}
                  tabStyle={styles.tabStyle} tabTextStyle={[styles.tabTextStyle,fonts.bodyText_Black]}
                  activeTabStyle={styles.activeTabStyle} activeTabTextStyle={[fonts.bodyText_Black,styles.activeTabTextStyle]}
                  selectedIndex={this.state.selected} values={this.state.tabArrary}
                  onTabPress= {index => this._onTabPress(index)}/>
        </View>
        {
          this.state.tabsId&&this.state.tabsId.length>0?
          <View style={[styles.main]}>
                <View style={[styles.top]}>
                      <Text style={[styles.topText,fonts.hintText_Gray]}>需求信息{this.state.numberOfElements}条</Text>
                      {
                      // <TouchableHighlight><Image style={styles.ViewList1Img} source={require('../../images/sort.png')}></Image></TouchableHighlight>
                      }
                </View>
                <NiceList isNeedLoading={true} getTotalCount={(count)=>{this.setState({numberOfElements:count})}} renderItem={(rowData)=><DemandListItem {...rowData} />} contentContainerStyle={styles.list} remoteUrl={this.state.remoteUrl} storkey={this.state.storkey}/>
          </View>
          :null
        }
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
AppRegistry.registerComponent('DemandList', () => DemandList);
