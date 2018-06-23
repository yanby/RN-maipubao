import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Linking,
  StatusBar,
  TextInput,
  TouchableHighlight,
  Image,
  Dimensions,
  Modal,
  ScrollView
} from 'react-native';
var moment = require('moment');
import TabNavigator from 'react-native-tab-navigator';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/personalCenter/MyOrg';
import {nav} from '../../styles/commonStyle/nav';
import BasicComponent from '../basic/BasicComponent';
import { Actions,ActionConst } from 'react-native-router-flux';
import { NiceList } from '../../commonComponents/niceList/NiceList';
import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import MyOrgItem from './MyOrgItem';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class MyOrg extends BasicComponent {
  constructor(props){
    super(props);
    this.state={
      selectedTab: "home",
      modalObject:{},
      loadingObject:{},
      userId:null,
      remoteUrlRecommend:null,
      remoteUrlTeam:null,
      storkeyRecommend:keys.getRecommendList,
      storkeyTeam:keys.getDevelopList,
      recommenderDayNum:0,
      recommenderNumber:0,
      recommenderSignNumber:0,
      recommenderSignNumberZ:0,
      recommenderSignNumberX:0,
      recommenderCommission:0,
      teamName:null,
      accountLevel:null,
      createTime:null,
      teamNumber:0,
      teamSignNumber:0,
      teamSignNumberZ:0,
      teamSignNumberX:0,
      teamCommission:0,
      leader:null,
      userTeamId:'',
      teamStatus:this.props.teamStatus,
      teamNameX:'',
      accountLevelX:'',
      userPhoneX:'',
      createTimeX:'',
      userNameX:'',
      teamNumberX:'',
      teamTypeX:'',
      statusX:'',
      resJsonX:{},
    };
  }

  componentWillMount(){
    this._loadUser();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps){
      this._getDevelop(this.state.userId);
    }
  }

  //查询用户的推荐信息
  _getRecommendNum(recommenderId){
    storage.load({
      key: keys.getRecommendNum,
      syncInBackground: false,
      syncParams: {
         url: apis.getRecommendNum+'?userId='+recommenderId
      }
    }).then(ret => {

      return ret.json();
    }).then(res => {

      this.setState({
        recommenderDayNum:res.recommenderDayNum,
        recommenderNumber:res.recommenderNumber,
        recommenderSignNumber:res.recommenderSignNumber,
        recommenderSignNumberZ:res.recommenderSignNumberZ,
        recommenderSignNumberX:res.recommenderSignNumberX,
        recommenderCommission:res.recommenderCommission.toFixed(2)
      });
    }).catch(err => {

    })
  }

  //查询用户的团队信息
  _getDevelop(userId){
    storage.load({
      key: keys.getDevelop,
      syncInBackground: false,
      syncParams: {
         url: apis.getDevelop+'?userId='+userId
      }
    }).then(ret => {

      return ret.json();
    }).then(res => {
      if(res.leader){
        this.setState({
          teamName:res.teamName,
          accountLevel:res.accountLevel,
          createTime:res.createTime,
          teamNumber:res.teamNumber,
          teamSignNumber:res.teamSignNumber,
          teamSignNumberZ:res.teamSignNumberZ,
          teamSignNumberX:res.teamSignNumberX,
          teamCommission:res.teamCommission.toFixed(2),
          leader:res.leader,
          userTeamId:res.userTeamId
        });
      }else{
        this._getMyTeam();
      }
    }).catch(err => {

    })
  }

  //二级人员查询团队
  _getMyTeam(){
    storage.load({key: keys.currentUser}).then(currentUser => {
      this.openLoading('正在加载...');
      storage.load({
        key: keys.getMyTeam,
        syncInBackground: false,
        syncParams: {
          url: apis.getMyTeam +'?userId=' +currentUser.id
        }
      }).then(ret => {
        this.closeLoading();
        if(ret.status == 200){
          return ret.json();
        }else{
          Actions.Login({})
        };
      }).then(retJson=>{
        let userNameX="-";
        if(retJson.userName){
          userNameX=retJson.userName;
        }
        if(retJson.teamName){
          this.setState({
            resJsonX:retJson,
            teamNameX:retJson.teamName,
            teamTypeX:retJson.teamType,
            accountLevelX:retJson.accountLevel,
            userPhoneX:retJson.userPhone,
            createTimeX:retJson.createTime,
            userNameX:userNameX,
            teamNumberX:retJson.teamNumber,
            statusX:retJson.status
          })
        }else{
          this.setState({teamStatus:1})
        }

      })
    }).catch(err => {
      this.closeLoading();
      Actions.Login({})
    })
  }

  //判断
  _loadUser(){
    storage.load({key: keys.currentUser}).then(currentUser => {
      if(currentUser){
        let userId = currentUser.id;
        this._getRecommendNum(userId);
        this.setState({userId:userId});
      }else{
        Actions.reset('Login',{});
      }
    }).catch(err => {
      Actions.reset('Login',{});
    })
  }
  //切换标签
  _onTabPress(tag){
    if(tag =="home"){
      this._getRecommendNum(this.state.userId);
    }else{
      if(this.state.teamStatus == 2){
        this._getDevelop(this.state.userId);
      }else if(this.state.teamStatus == 3){
        this._getMyTeam();
      }
    }
    this.setState({
      selectedTab:tag
    });
  }

//根据团队等级显示图片
  _renderLevelPic(){
      if(this.state.accountLevel == '金牌'){
        return <Image style={styles.orgDeIcon} source={require('../../images/level.png')}/>
      }else if(this.state.accountLevel == '银牌'){
        return <Image style={styles.orgDeIcon} source={require('../../images/si.png')}/>
      }else{
        return <Image style={styles.orgDeIcon} source={require('../../images/co.png')}/>
      }
  }

  //解散团队
  _unbind(){
    this.confirm(
      {
        ok:{
          text:'确认',
          click:()=>{
            storage.load({
              key: keys.getOneUser,
              syncInBackground: false,
              syncParams: {
        	       url: apis.unbindTeam + '?userId=' + this.state.userId
              }
            }).then(ret => {
              if(ret.status == 200){
                return ret.json();
              }else{
                return Promise.reject('404')
              }
            }).then(retJson=>{
              if(retJson){
                Actions.PersonalIndex({})
              }
            }).catch((err)=>{
              if (err === '404') {
                Actions.replace('Login',{sourceFlag:'PersonalIndex'})
              }
            })
          }
        },
        no:{
          text:'取消',
          click:()=>{
          }
        },
        text:'解散组织？'
      })
  }
  //拨打电话
  _callPhone(){
    if(this.state.userPhoneX) {
      Linking.openURL('tel:' + this.state.userPhoneX)
    }
  }

  //解绑操作
  _unbindX(){
    if(this.state.statusX ==='解绑中'){
      return <TouchableHighlight style={styles.orgJs} underlayColor="transparent">
            <Text style={[fonts.hintText_Blue,styles.orgJsTxt]}>解绑申请中</Text>
      </TouchableHighlight>
    }else{
      if(this.state.teamTypeX == '公司类'){
        return <TouchableHighlight style={styles.orgJs} underlayColor="transparent" onPress={()=>Actions.UnbindCompany({json:this.state.resJsonX})}>
              <Text style={[fonts.hintText_Blue,styles.orgJsTxt]}>解绑</Text>
        </TouchableHighlight>
      }else{
        return <TouchableHighlight style={styles.orgJs} underlayColor="transparent" onPress={()=>Actions.UnbindTeam({json:this.state.resJsonX})}>
              <Text style={[fonts.hintText_Blue,styles.orgJsTxt]}>解绑</Text>
        </TouchableHighlight>
      }
    }
  }

  //根据团队等级显示图片
    _renderLevelPicX(){
        if(this.state.accountLevelX == '金牌'){
          return <Image style={styles.orgDeIcon} source={require('../../images/level.png')}/>
        }else if(this.state.accountLevelX == '银牌'){
          return <Image style={styles.orgDeIcon} source={require('../../images/si.png')}/>
        }else{
          return <Image style={styles.orgDeIcon} source={require('../../images/co.png')}/>
        }
    }

  render() {
    return (
      <View style={styles.main}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <Title isLeftShow={true} backColor={true} isRightBtnShow={false} title={'我的组织'}/>
        <TabNavigator tabBarStyle={styles.tabView}>
              <TabNavigator.Item selected={this.state.selectedTab === 'home'}  title="推荐"
                tabStyle={styles.tabBar} titleStyle={fonts.t3_Gray}
                onPress={() => this._onTabPress('home')}>
                {
                  <View style={styles.recommend}>
                      <View style={[styles.recommendIM,styles.shadowView]}>
                              <View style={[styles.recommendModule,styles.borderBottom,styles.padding20]}>
                                    <Image source={require('../../images/myOrgIcon1.png')}/>
                                    <View style={styles.recommendModuleTxt}>
                                          <View><Text style={[fonts.bodyText_Gray]}><Text style={[fonts.t2_Black]}>{this.state.recommenderDayNum}</Text>人</Text></View>
                                          <View style={styles.recommendModuleTxtB}><Text style={[fonts.bodyText_Gray]}>今日推荐</Text></View>
                                    </View>
                              </View>
                              <View style={[styles.recommendModule,styles.borderBottom,styles.borderLeft,styles.padding20]}>
                                    <Image source={require('../../images/myOrgIcon2.png')}/>
                                    <View style={styles.recommendModuleTxt}>
                                          <View><Text style={[fonts.bodyText_Gray]}><Text style={[fonts.t2_Black]}>{this.state.recommenderNumber}</Text>人</Text></View>
                                          <View style={styles.recommendModuleTxtB}><Text style={[fonts.bodyText_Gray]}>累计推荐</Text></View>
                                    </View>
                              </View>
                              <View style={styles.recommendModuleZS}>
                                    <View style={styles.recommendModule}>
                                          <Image source={require('../../images/myOrgIcon3.png')}/>
                                          <View style={styles.recommendModuleTxt}>
                                                <View><Text style={[fonts.bodyText_Gray]}><Text style={[fonts.t2_Black]}>{this.state.recommenderSignNumber}</Text>单</Text></View>
                                                <View style={styles.recommendModuleTxtB}><Text style={[fonts.bodyText_Gray]}>累计结佣单数</Text></View>
                                          </View>
                                    </View>
                                    <View style={styles.recommendZX}>
                                          <Text style={[fonts.hintText_Gray]}>招商</Text>
                                          <View style={styles.lineBlue}></View>
                                          <Text style={[fonts.hintText_Black]}>{this.state.recommenderSignNumberZ}单</Text>
                                          <Text style={[fonts.hintText_Gray]}> 销售</Text>
                                          <View style={styles.lineRed}></View>
                                          <Text style={[fonts.hintText_Black]}>{this.state.recommenderSignNumberX}单</Text>
                                    </View>
                              </View>
                              <View style={[styles.recommendModule,styles.borderLeft]}>
                                    <Image source={require('../../images/myOrgIcon4.png')}/>
                                    <View style={styles.recommendModuleTxt}>
                                          <View><Text style={[fonts.bodyText_Gray]}><Text style={[fonts.t2_Black]}>{this.state.recommenderCommission}</Text>元</Text></View>
                                          <View style={styles.recommendModuleTxtB}><Text style={[fonts.bodyText_Gray]}>累计奖励金额</Text></View>
                                    </View>
                              </View>
                        </View>
                        <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.MyRecommend({userId:this.state.userId,selectedTab:"home"})}>
                              <View style={[styles.title,styles.shadowView]}>
                                    <Image source={require('../../images/myOrgIcon5.png')}/>
                                    <View style={styles.titleView}>
                                          <Text style={[fonts.bodyText_Black,styles.marginLeft5]}>累计推荐</Text>
                                          <Text style={[fonts.t2_Blue,styles.marginLeft5]}>{this.state.recommenderNumber}</Text>
                                          <Text style={[fonts.hintText_Gray,styles.marginTop3]}>人</Text>
                                    </View>
                                    <View style={styles.titleViewRight}>
                                          <Text style={[fonts.t3_Blue,styles.marginLeft5]}>查看全部</Text>
                                          <Image source={require('../../images/more.png')}/>
                                    </View>
                              </View>
                        </TouchableHighlight>
                  </View>

                }
              </TabNavigator.Item>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'profile'} title="团队"
                tabStyle={styles.tabBar} titleStyle={fonts.t3_Gray}
                onPress={() => this._onTabPress('profile')}>
                {
                  this.state.teamStatus >1?
                  <View style={styles.org}>
                  {
                    this.state.teamStatus==2?
                    <View>
                    <Image style={styles.orgTop} source={require('../../images/tdBg.png')}>
                          <View>
                                <View style={[styles.orgName]}>
                                      <Text style={[fonts.bodyText_white]}>团队名称：</Text>
                                      <Text style={[fonts.bodyText_white,styles.flex1]}>{this.state.teamName}</Text>
                                </View>
                                <View style={styles.orgDe}>
                                      <Text style={[fonts.hintText_white]}>{this.state.accountLevel}团队</Text>
                                      {this._renderLevelPic()}
                                      <Text style={[fonts.hintText_white]}>创建时间：{moment(this.state.createTime).format('YYYY-MM-DD')}</Text>
                                      {
                                        this.state.teamNumber == 1 ?
                                        <TouchableHighlight style={[styles.orgJs]} underlayColor="transparent" onPress={()=>this._unbind({})}>
                                            <Text style={[fonts.bodyText_Blue,styles.orgJsTxt]}>解散</Text>
                                        </TouchableHighlight>
                                      :null}
                                </View>
                          </View>
                    </Image>
                    <View style={[styles.recommendIM,styles.shadowView,styles.marginTop10]}>
                          <View style={styles.recommendModuleZS}>
                                <View style={styles.recommendModule}>
                                      <Image source={require('../../images/myOrgIcon3.png')}/>
                                      <View style={styles.recommendModuleTxt}>
                                            <View><Text style={[fonts.bodyText_Gray]}><Text style={[fonts.t2_Black]}>{this.state.teamSignNumber}</Text>单</Text></View>
                                            <View style={styles.recommendModuleTxtB}><Text style={[fonts.bodyText_Gray]}>累计结佣单数</Text></View>
                                      </View>
                                </View>
                                <View style={styles.recommendZX}>
                                      <Text style={[fonts.hintText_Gray]}>招商</Text>
                                      <View style={styles.lineBlue}></View>
                                      <Text style={[fonts.hintText_Black]}>{this.state.teamSignNumberZ}单</Text>
                                      <Text style={[styles.marginLeft10,fonts.hintText_Gray]}>销售</Text>
                                      <View style={styles.lineRed}></View>
                                      <Text style={[fonts.hintText_Black]}>{this.state.teamSignNumberX}单</Text>
                                </View>
                          </View>
                          <View style={[styles.recommendModule,styles.borderLeft]}>
                                <Image source={require('../../images/myOrgIcon4.png')}/>
                                <View style={styles.recommendModuleTxt}>
                                      <View><Text style={[fonts.bodyText_Gray]}><Text style={[fonts.t2_Black]}>{this.state.teamCommission}</Text>元</Text></View>
                                      <View style={styles.recommendModuleTxtB}><Text style={[fonts.bodyText_Gray]}>累计奖励金额</Text></View>
                                </View>
                          </View>
                    </View>
                    <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.MyRecommend({userId:this.state.userId,selectedTab:"profile"})}>
                          <View style={[styles.title,styles.shadowView]}>
                                <Image source={require('../../images/myOrgIcon5.png')}/>
                                <View style={styles.titleView}>
                                      <Text style={[fonts.bodyText_Black,styles.marginLeft5]}>团队成员</Text>
                                      <Text style={[fonts.t2_Blue,styles.marginLeft5]}>{this.state.teamNumber}</Text>
                                      <Text style={[fonts.hintText_Gray,styles.marginTop3]}>人</Text>
                                </View>
                                <View style={styles.titleViewRight}>
                                      <Text style={[fonts.bodyText_Blue,styles.marginLeft5]}>查看全部</Text>
                                      <Image source={require('../../images/more.png')}/>
                                </View>
                          </View>
                    </TouchableHighlight>
                    </View>
                    :
                    <View>
                    <Image style={styles.orgTop} source={require('../../images/tdBg.png')}>
                          <View>
                                <View style={[styles.orgName]}>
                                      <Text style={[fonts.bodyText_white]}>团队名称：</Text>
                                      <Text style={[fonts.bodyText_white,styles.flex1]}>{this.state.teamNameX}</Text>
                                </View>
                                <View style={styles.orgDe}>
                                      <Text style={[fonts.hintText_white]}>{this.state.accountLevelX}团队</Text>
                                      {this._renderLevelPicX()}
                                      <Text style={[fonts.hintText_white]}>创建时间：{moment(this.state.createTimeX).format('YYYY-MM-DD')}</Text>
                                      {this._unbindX()}
                                </View>
                          </View>
                    </Image>
                    <View style={[styles.viewListMain,styles.shadowView]}>
                          <View style={styles.viewList}>
                                <Text style={[fonts.bodyText_Black,styles.flex]}>团队人数：<Text style={[fonts.t2_Gray]}>{this.state.teamNumberX}</Text></Text>
                          </View>
                          <View style={styles.viewList}>
                                <Text style={[fonts.bodyText_Black,styles.flex]}>上级姓名：<Text style={[fonts.bodyText_Gray]}>{this.state.userNameX}</Text></Text>
                          </View>
                          <View style={styles.viewList}>
                                <Text style={[fonts.bodyText_Black,styles.flex]}>联系方式：<Text style={[fonts.bodyText_Gray]}>{this.state.userPhoneX}</Text></Text>
                                <TouchableHighlight onPress={() => {this._callPhone()}} underlayColor="transparent">
                                <View style={styles.callBtn}><Text style={[fonts.bodyText_Blue]}>去联系</Text></View>
                                </TouchableHighlight>
                          </View>
                    </View>
                  </View>
                  }
                  </View>
                  :
                  <View style={styles.zwsj}>
                        <Text style={[fonts.t2_Gray]}>暂无数据</Text>
                  </View>
                }
              </TabNavigator.Item>
      </TabNavigator>
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
AppRegistry.registerComponent('MyOrg', () => MyOrg);
