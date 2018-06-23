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
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/personalCenter/MyOrgDetails';
import {nav} from '../../styles/commonStyle/nav';
import BasicComponent from '../basic/BasicComponent';
import { Actions,ActionConst } from 'react-native-router-flux';
import { NiceList } from '../../commonComponents/niceList/NiceList';
import { apis,sites,staticSite } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import MyOrgDeItem from './MyOrgDeItem';
export default class MyOrgDetails extends BasicComponent {
  constructor(props){
    super(props);
    this.state={
      selectedTab: "home",
      modalObject:{},
      loadingObject:{},
      remoteUrl: null,
      name: '',
      gender: '',
      createTime: '',
      account: '',
      logoPath:'',
      roleType:'',
      signNumber: 0,
      signNumberZ: 0,
      signNumberX: 0,
      signCommission:0,
      reportNum: 0,
      visitNum: 0,
      userId:this.props.userId,
      teamId:'',
      leader:false,
      conceal:false,
      flag:this.props.flag,
      audit:false,
    };
  }
  _loadData(){
    storage.load({
      key: keys.getUserDetail,
      syncInBackground: false,
      syncParams: {
	       url: apis.getUserDetail +'?userId=' + this.state.userId+'&flag='+this.state.flag
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json();
      }else{
        return Promise.reject('error');
      };
    }).then(retJson=>{
      this.setState({
        createTime:retJson.createTime,
        name:retJson.name?retJson.name:'-',
        logoPath:retJson.logoPath,
        account:retJson.account,
        roleType:retJson.roleType,
        signNumber:retJson.signNumber,
        signNumberZ:retJson.signNumberZ,
        signNumberX:retJson.signNumberX,
        signCommission:retJson.signCommission?retJson.signCommission.toFixed(2):'0.00',
        reportNum:retJson.reportNum,
        visitNum:retJson.visitNum,
        teamId:retJson.userTeamId,
        leader:retJson.leader,
        audit : retJson.audit,
        gender:retJson.gender?retJson.gender:'-'

      });
    }).catch((err)=>{
      console.log(err);
      //Actions.PersonalIndex({})
    })
  }
  componentWillMount(){
    this._loadData();
  }

  _conceal(){
    if(this.state.conceal){
        this.setState({conceal:false})
      }else{
          this.setState({conceal:true})
      }
  }

  _remove(flag){
    let confirmText = '亲，确认移除队员'
    if(!flag){
      confirmText = '亲，确认同意解绑'
    }
    this.confirm(
      {
        ok:{
          text:'确认',
          click:()=>{
            storage.load({
              key: keys.removeMember,
              syncInBackground: false,
              syncParams: {
                 url: apis.removeMember +'?userId=' + this.state.userId +'&teamId=' +this.state.teamId + '&flag=' + flag
              }
            }).then(ret => {
              if(ret.status == 200){
                return ret.json()
              }else{
                return Promise.reject('error');
              };
            }).then(retJson=>{
              if(!retJson){
                Alert.alert("程序异常")
              }
              this._back()
            }).catch((err)=>{
              console.log(err);
              //Actions.PersonalIndex({})
            })

          }
        },
        no:{
          text:'取消',
          click:()=>{
          }
        },
        text:confirmText
      })
  }

  _back(){
    Actions.pop({refresh:{random:Math.random()}});
  }

  _renderRemove0(){
    if(!this.state.leader){
      if(!this.state.audit && this.state.flag){
        return (
          <TouchableHighlight style={nav.navRight} underlayColor="transparent" onPress={()=>{this._remove(true)}}>
                <Text style={[fonts.hintText_white]}>移除</Text>
          </TouchableHighlight>
        )
      }else{
        return null
      }
    }else{
      return null
    }
  }

  _renderRemove1(){
    if(!this.state.leader){
      if(this.state.audit && this.state.flag){
        return (
          <TouchableHighlight underlayColor="#3a8ff3" style={styles.btn} onPress={()=>{this._remove(false)}}>
             <View><Text style={[fonts.bodyText_white]}>同意解绑</Text></View>
          </TouchableHighlight>
        )
      }else{
        return null
      }
    }else{
      return null
    }
  }

  render() {
    return (
      <View style={styles.main}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <ScrollView style={styles.scrollView}>
        <Image style={styles.orgDeBg} source={require('../../images/MyOrgDeBg.png')}>
              <View>
                    <View style={nav.navTran}>
                        <TouchableHighlight style={nav.navLeft}  underlayColor="transparent" onPress={() => {Actions.pop({})}}>
                              <Image source={require('../../images/backWhite.png')}/>
                        </TouchableHighlight>
                        <TouchableHighlight style={nav.navCenter}>
                              <Text></Text>
                        </TouchableHighlight>
                          {this._renderRemove0()}
                    </View>
                    <View style={styles.view1}>
                    {
                      this.state.logoPath ? (<Image style={styles.headerImg} source={{uri: staticSite + this.state.logoPath}}/>) : (<Image style={styles.headerImg} source={require('../../images/noPhoto.png')}/>)
                    }
                          <Text style={[fonts.t2_white,styles.headerTxt]}>角色|{this.state.roleType}</Text>
                    </View>
              </View>
        </Image>
        <View style={styles.viewMain}>
              <View style={styles.title}>
                    <Image source={require('../../images/myOrgIcon6.png')}/>
                    <Text style={[fonts.bodyText_Black,styles.titleTxt]}>基本信息</Text>
              </View>
              <View style={styles.view2}>
                    <Text style={[fonts.hintText_Gray,styles.view2Txt]}>姓名：<Text style={[fonts.hintText_Black]}>{this.state.name}</Text></Text>
                    <Text style={[fonts.hintText_Gray,styles.view2Txt]}>联系方式：<Text style={[fonts.hintText_Black]}>{this.state.account}</Text></Text>
                    <Text style={[fonts.hintText_Gray,styles.view2Txt]}>性别：<Text style={[fonts.hintText_Black]}>{this.state.gender}</Text></Text>
                    <Text style={[fonts.hintText_Gray,styles.view2Txt]}>注册时间：<Text style={[fonts.hintText_Black]}>{this.state.createTime}</Text></Text>
              </View>
        </View>
        <View style={styles.viewMain}>
              <View style={styles.title}>
                    <Image source={require('../../images/myOrgIcon7.png')}/>
                    <Text style={[fonts.bodyText_Black,styles.titleTxt]}>基本信息</Text>
              </View>
              <View style={styles.view3}>
                    <View style={styles.view3Item}>
                          <View style={styles.view3ItemF}>
                                <Image source={require('../../images/myOrgIcon8.png')}/>
                                <Text style={[fonts.bodyText_Gray,styles.view3ItemFTxt]}>   | <Text style={[fonts.bodyText_Black]}>{this.state.reportNum}</Text> <Text style={[fonts.hintText_Gray]}>组</Text></Text>
                          </View>
                          <Text style={[fonts.bodyText_Gray,styles.view3ItemTxt]}>累计报备</Text>
                    </View>
                    <View style={styles.view3Item}>
                          <View style={styles.view3ItemF}>
                                <Image source={require('../../images/myOrgIcon9.png')}/>
                                <Text style={[fonts.bodyText_Gray,styles.view3ItemFTxt]}>   | <Text style={[fonts.bodyText_Black]}>{this.state.visitNum}</Text> <Text style={[fonts.hintText_Gray]}>组</Text></Text>
                          </View>
                          <Text style={[fonts.bodyText_Gray,styles.view3ItemTxt]}>累计到访</Text>
                    </View>
                    <View style={styles.view3Item}>
                          <View style={styles.view3ItemF}>
                                <Image source={require('../../images/myOrgIcon10.png')}/>
                                <Text style={[fonts.bodyText_Gray,styles.view3ItemFTxt]}>   | <Text style={[fonts.bodyText_Black]}>{this.state.signNumber}</Text> <Text style={[fonts.hintText_Gray]}>单</Text></Text>
                          </View>
                          <Text style={[fonts.bodyText_Gray,styles.view3ItemTxt]}>累计结佣单数</Text>
                    </View>
                    <View style={styles.view3Item}>
                          <View style={styles.recommendZX}>
                                <Text style={[fonts.bodyText_Gray]}>招商单</Text>
                                <View style={styles.lineBlue}></View>
                                <Text style={[fonts.bodyText_Black]}>{this.state.signNumberZ}单</Text>
                          </View>
                          <View style={styles.recommendZX}>
                                <Text style={[styles.marginLeft10,fonts.bodyText_Gray]}>销售单</Text>
                                <View style={styles.lineRed}></View>
                                <Text style={[fonts.bodyText_Black]}>{this.state.signNumberX}单</Text>
                          </View>
                    </View>
              </View>
              <View style={styles.view4}>
                    <Image style={styles.view4Icon} source={require('../../images/myOrgIcon11.png')}/>
                    <Text style={[fonts.t2_Gray]}>| 累计贡献金额<Text style={[fonts.t2_Gray,styles.colorRed]}>{this.state.signCommission}</Text><Text style={[fonts.hintText_Gray]}>元</Text></Text>
              </View>
              {this.state.signNumber>0?
                <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.MyOrgDetailsList({flag:this.state.flag,userId:this.props.userId})}>
                    <View style={styles.view5}>
                          <Text style={[fonts.bodyText_Black,styles.view5Txt]}>签约明细</Text>
                          <Image source={require('../../images/more.png')}/>
                    </View>
                </TouchableHighlight>
                :null
              }
        </View>
        </ScrollView>
        {
          this._renderRemove1()
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
AppRegistry.registerComponent('MyOrgDetails', () => MyOrgDetails);
