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
  ScrollView,
  ListView,
  Alert
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/personalCenter/MemberInfo';
import MemberSignListItem from './MemberSignListItem';
import ListBasicComponent from '../basic/ListBasicComponent';
import { NiceList } from '../../commonComponents/niceList/NiceList';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { apis,sites,staticSite } from '../../systemComponents/Remote/ApiStorage';
export default class TeamMemberDetails extends ListBasicComponent {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      remoteUrl: null,
      storkey:keys.signList,
      audit:this.props.audit,
      comeFlag:this.props.audit,
      name: '',
      gender: '',
      createTime: '',
      account: '',
      logoPath:'',
      signNum: 0,
      reportNum: 0,
      attractBusiNum: 0,
      visitNum: 0,
      sellNum: 0,
      userId:this.props.userId,
      teamId:'',
      leader:false,
    };
  }

  _loadData(){
    this.setState({remoteUrl: apis.signList + '?userId=' + this.state.userId})
    storage.load({
      key: keys.getMemberInfo,
      syncInBackground: false,
      syncParams: {
	       url: apis.getMemberInfo +'?userId=' + this.state.userId
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json();
      }else{
        Actions.PersonalIndex({})
      };
    }).then(retJson=>{
      this.setState({
        gender:retJson.gender,
        createTime:retJson.createTime,
        name:retJson.name,
        logoPath:retJson.logoPath,
        account:retJson.account,
        signNum:retJson.signNum,
        reportNum:retJson.reportNum,
        attractBusiNum:retJson.attractBusiNum,
        visitNum:retJson.visitNum,
        sellNum:retJson.sellNum,
        teamId:retJson.teamId,
        leader:retJson.leader
      });
    })
  }
  componentWillMount(){
    this._loadData();
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
                Actions.PersonalIndex({})
              };
            }).then(retJson=>{
              if(!retJson){
                Alert.alert("程序异常")
              }
              this._back()
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
    Actions.pop({});
  }

  _renderImage(){
    if (this.state.logoPath) {
      return <Image style={{width:100,height:100}} source={{uri: staticSite + this.state.logoPath}} />
    }else {
      return <Image source={require('../../images/noPhoto.png')}></Image>
    }
  }

  _renderRemove0(){
    if(!this.state.leader){
      if(!this.state.audit){
        return (
          <TouchableHighlight style={styles.searchView} underlayColor="transparent" onPress={()=>{this._remove(true)}}>
                <Text style={fonts.hintText_Black}>移除</Text>
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
      if(this.state.audit){
        return (
          <TouchableHighlight style={styles.touchBtn} onPress={()=>{this._remove(false)}}>
             <Text style={[fonts.bodyText_white]}>同意解绑</Text>
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
      <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
            <View style={styles.signTitleView}>
                  <TouchableHighlight style={styles.backView} underlayColor="transparent" onPress={()=>this._back()}>
                        <Image  source={require('../../images/back.png')}/>
                  </TouchableHighlight>
                  <Text style={fonts.t2_Black}>队员详情</Text>
                  {
                    this._renderRemove0()
                  }
            </View>
            <ScrollView>
            <View style={styles.memberTitle}><Text style={fonts.bodyText_black}>队员基本信息</Text></View>
            <View style={styles.topView}>
                {
                  this._renderImage()
                }

                 <View style={styles.topRight}>
                       <Text style={[styles.rightText,fonts.bodyText_black]}>姓名：{this.state.name}</Text>
                       <Text style={[styles.rightText,fonts.bodyText_Gray]}>性别：{this.state.gender}</Text>
                       <Text style={[styles.rightText,fonts.bodyText_Gray]}>联系方式：{this.state.account}</Text>
                       <Text style={[styles.rightText,fonts.bodyText_Gray]}>注册时间：{this.state.createTime}</Text>
                 </View>
            </View>
            <View style={styles.memberTitle}><Text style={fonts.bodyText_black}>队员交易信息</Text></View>
            <View style={styles.middleView}>
                        <Text style={[styles.rightText,fonts.bodyText_black]}>累计报备：{this.state.reportNum}组</Text>
                        <Text style={[styles.rightText,fonts.bodyText_black]}>累计到访：{this.state.visitNum}组</Text>
                        <View style={styles.middleLast}>
                        <Text style={styles.marginLeft15}>累计签约：{this.state.signNum}单 </Text>
                        <Text style={styles.marginLeft15}>销售单：{this.state.sellNum}单</Text>
                        <Text style={styles.marginLeft15}>招商单：{this.state.attractBusiNum}单</Text>
                        </View>
            </View>
            <View style={styles.memberTitle}><Text style={fonts.bodyText_black}>队员签约信息</Text></View>
            <View style={styles.bottomView}>
            {
              this.state.remoteUrl != null ?
              <NiceList renderItem={(rowData)=><MemberSignListItem {...rowData} />}
                contentContainerStyle={styles.list}
                remoteUrl={this.state.remoteUrl}
                storkey={this.state.storkey}
                isNeedLoading={true}/>
            : null}
            </View>
            {
              this._renderRemove1()
            }
            </ScrollView>
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
AppRegistry.registerComponent('TeamMemberDetails', () => TeamMemberDetails);
