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
import TabNavigator from 'react-native-tab-navigator';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/personalCenter/MyReward';
import BasicComponent from '../basic/BasicComponent';
import { Actions,ActionConst } from 'react-native-router-flux';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { apis,sites } from '../../systemComponents/Remote/ApiStorage';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class Recommend extends BasicComponent {
  constructor(props){
    super(props);
    this.state={
      selectedTab: "home",
      modalObject:{},
      loadingObject:{},
      teamMemberCount:0,
      commission:0.00,
      recommendCount:0,
      recommendCommission:0.00,
      leader:false,
      userId:'',
    };
  }

  loadData(){
    storage.load({key: keys.currentUser}).then(currentUser => {
      storage.load({
        key: keys.getOneUser,
        syncInBackground: false,
        syncParams: {
  	       url: apis.getOneUser + currentUser.id
        }
      }).then(ret => {
        if(ret.status == 200){
          return ret.json();
        }else{
          Actions.replace('Login',{})
        }
      }).then(retJson=>{
        this.setState({
          leader:retJson.leader,
          userId:retJson.userId
        })
        if(retJson.leader){
          storage.load({
            key: keys.getDevelopCommission,
            syncInBackground: false,
            syncParams: {
      	       url: apis.getDevelopCommission +'?id=' + currentUser.id
            }
          }).then(ret => {
            if(ret.status == 200){
              return ret.json()
            }else{
              Actions.Login({})
            }
          }).then(retJson=>{
            this.setState({
              teamMemberCount:retJson.teamMemberCount,
              commission:retJson.commission.toFixed(2)
            })
          })
        }
      })

      storage.load({
        key: keys.getRecommendCommission,
        syncInBackground: false,
        syncParams: {
  	       url: apis.getRecommendCommission +'?id=' + currentUser.id
        }
      }).then(ret => {
        if(ret.status == 200){
          return ret.json();
        }else{
          Actions.Login({})
        };
      }).then(retJson=>{
        this.setState({
          recommendCount:retJson.recommendCount,
          recommendCommission:retJson.commission.toFixed(2)
        })
      })
    })
  }

  componentWillMount(){
    this.loadData();
  }
  render() {
    return (
      <View style={[styles.mainList]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <Title isLeftShow={true} backColor={true} isRightBtnShow={false} title={'我的奖励'}/>
        <TabNavigator  tabBarStyle={styles.tabView}>
              <TabNavigator.Item selected={this.state.selectedTab === 'home'}  title="推荐"
                tabStyle={styles.tabBar} titleStyle={fonts.t3_Gray}
                onPress={() => this.setState({ selectedTab: 'home' })}>
                {<View style={styles.tabListView}>
                      <View style={[styles.listView]}>
                            <View style={[styles.listViewText]}>
                                  <Text style={[fonts.bodyText_Black]}>累计推荐人数：</Text>
                            </View>
                            <View style={[styles.listViewText2]}>
                                  <Text style={fonts.bodyText_Gray}>{this.state.recommendCount}人</Text>
                            </View>
                      </View>
                      <View style={[styles.listView]}>
                            <View style={[styles.listViewText]}>
                                  <Text style={[fonts.bodyText_Black]}>成交奖励金额：</Text>
                            </View>
                            <View style={[styles.listViewText2]}>
                                  <Text style={fonts.bodyText_Gray}>{this.state.recommendCommission}元</Text>
                            </View>
                      </View>
                      <View style={[styles.marginTop50]}>
                            <Text style={[styles.listCenterText,fonts.t3_Black]}>推荐人成交奖励说明</Text>
                            <View style={[styles.viewText,styles.marginTop10]}>
                            <Text style={[styles.lineHeight20,fonts.bodyText_Black]}>
                            1.     新用户在注册时，可以填写推荐人的手机号码或通过扫描推荐人的推广二维码，完成推荐人绑定。
                            </Text>
                            <Text style={[styles.lineHeight20,fonts.bodyText_Black]}>
                            2.     被推荐人首单成交后，推荐人可获得首单交易众包基准佣金1‰的奖励。
                            </Text>
                            <Text style={[styles.lineHeight20,fonts.bodyText_Black]}>
                            3.     优铺针对每一个项目制定众包基准佣金，并在项目佣金政策上公示。
                            </Text>
                            </View>
                      </View>
                </View>}
              </TabNavigator.Item>
              {
                this.state.leader ?
              <TabNavigator.Item
                selected={this.state.selectedTab === 'profile'} title="发展"
                tabStyle={styles.tabBar} titleStyle={fonts.t3_Gray}
                onPress={() => this.setState({ selectedTab: 'profile' })}>
                {<View style={styles.tabListView}>
                      <View style={[styles.listView]}>
                            <View style={[styles.listViewText]}>
                                  <Text style={[fonts.bodyText_Black]}>累计发展人数：</Text>
                            </View>
                            <View style={[styles.listViewText2]}>
                                  <Text style={fonts.bodyText_Gray}>{this.state.teamMemberCount}人</Text>
                            </View>
                      </View>
                    <View style={[styles.listView]}>
                          <View style={[styles.listViewText]}>
                                <Text style={[fonts.bodyText_Black]}>成交奖励金额：</Text>
                          </View>
                          <View style={[styles.listViewText2]}>
                                <Text style={fonts.bodyText_Gray}>{this.state.commission}元</Text>
                          </View>
                    </View>
                    <ScrollView style={[styles.marginTop50,styles.flex]}>
                          <Text style={[styles.listCenterText,fonts.t3_Black]}>发展人成交奖励说明</Text>
                          <View style={[styles.viewText,styles.marginTop10]}>
                                <Text style={[styles.lineHeight20,fonts.bodyText_Black]}>
                                一、 发展团队方式：
                                </Text>
                                <Text style={[styles.lineHeight20,fonts.bodyText_Black]}>
                                1.      新用户通过扫描发展人的发展二维码进行注册，完成团队绑定。
                                </Text>
                                <Text style={[styles.lineHeight20,fonts.bodyText_Black]}>
                                2.      新用户在注册时，可以填写发展人的手机号码完成团队绑定。
                                </Text>
                                <Text style={[styles.lineHeight20,fonts.bodyText_Black]}>
                                3.      已注册的用户若无团队关系时，可通过扫描发展人的发展二维码，完成团队绑定。
                                </Text>
                                <Text style={[styles.lineHeight20,fonts.bodyText_Black]}>
                                二、 发展团队奖励规则
                                </Text>
                                <Text style={[styles.lineHeight20,fonts.bodyText_Black]}>
                                优铺针对每一个项目制定众包基准佣金，根据级别享有相应公佣奖励系数。
                                </Text>
                                <Text style={[styles.lineHeight20,fonts.bodyText_Black]}>
                                1.      金牌下属团队成交的，享有基准佣金的0.2作为公佣奖励。
                                </Text>
                                <Text style={[styles.lineHeight20,fonts.bodyText_Black]}>
                                2.      银牌下属团队成交的，享有基准佣金的0.1作为公佣奖励。
                                </Text>
                          </View>
                    </ScrollView>
                    <TouchableHighlight style={styles.touchBtn} underlayColor="#3a8ff3" onPress={()=>Actions.DevelopAwardList({})}>
                        <Text style={fonts.bodyText_white}>明细</Text>
                    </TouchableHighlight>
                </View>
              }
              </TabNavigator.Item>
              : null}
      </TabNavigator>

      </View>
    );
  }
}
AppRegistry.registerComponent('recommend', () => recommend);
