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
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/personalCenter/MyOrgSecond';
import BasicComponent from '../basic/BasicComponent';
import { Actions,ActionConst } from 'react-native-router-flux';
import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
export default class MyOrgSecond extends BasicComponent {
  constructor(props){
    super(props);
    this.state={
      selectedTab: "home",
      modalObject:{},
      loadingObject:{},
      teamName:'',
      accountLevel:'',
      userPhone:'',
      createTime:'',
      userName:'',
      teamNumber:'',
      teamType:'',
      status:'',
      resJson:{},
    };
  }

  _loadData(){
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
        this.setState({
          resJson:retJson,
          teamName:retJson.teamName,
          teamType:retJson.teamType,
          accountLevel:retJson.accountLevel,
          userPhone:retJson.userPhone,
          createTime:retJson.createTime,
          userName:retJson.userName,
          teamNumber:retJson.teamNumber,
          status:retJson.status
        })
      })
    }).catch(err => {
      this.closeLoading();
      Actions.Login({})
    })
  }
  componentWillMount(){
    this._loadData();
  }

  //根据团队等级显示图片
    _renderLevelPic(){
        if(this.state.accountLevel == '金牌'){
          return <Image style={styles.titleNameDeMImg} source={require('../../images/level.png')}/>
        }else if(this.state.accountLevel == '银牌'){
          return <Image style={styles.titleNameDeMImg} source={require('../../images/si.png')}/>
        }else{
          return <Image style={styles.titleNameDeMImg} source={require('../../images/co.png')}/>
        }
    }
    //拨打电话
    _callPhone(){
      if(this.state.userPhone) {
        Linking.openURL('tel:' + this.state.userPhone)
      }
    }

    //解绑操作
    _unbind(){
      if(this.state.status ==='解绑中'){
        return <View style={styles.navRight}>
              <Text style={[fonts.bodyText_Black]}>解绑</Text>
        </View>
      }else{
        if(this.state.teamType == '公司类'){
          return <TouchableHighlight style={styles.navRight} underlayColor="transparent" onPress={()=>Actions.UnbindCompany({json:this.state.resJson})}>
              <View>
                <Text style={[fonts.bodyText_Black]}>解绑</Text>
              </View>
          </TouchableHighlight>
        }else{
          return <TouchableHighlight style={styles.navRight} underlayColor="transparent" onPress={()=>Actions.UnbindTeam({json:this.state.resJson})}>
              <View>
                <Text style={[fonts.bodyText_Black]}>解绑</Text>
              </View>
          </TouchableHighlight>
        }
      }
    }
  render() {
    return (
      <View style={styles.main}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
            <Image style={styles.orgDeBg} source={require('../../images/orgDeBg.png')}>
                  <View>
                        <View style={styles.nav}>
                              <TouchableHighlight style={styles.navLeft}  underlayColor="transparent" onPress={() => {Actions.pop({})}}>
                                    <View>
                                          <Image source={require('../../images/backWhite.png')}/>
                                    </View>
                              </TouchableHighlight>
                              {this._unbind()}

                        </View>
                        <View style={styles.titleName}><Text style={styles.titleNameTxt}>{this.state.teamName}</Text></View>
                        <View style={styles.titleNameDe}>
                              <View style={styles.titleNameDeM}>
                                    <Text style={[fonts.bodyText_Black]}>{this.state.accountLevel}团队</Text>
                                    {this._renderLevelPic()}
                              </View>
                        </View>
                  </View>
            </Image>
            <View style={styles.view1}>
                  <View style={styles.view1L}>
                        <Text style={[fonts.t3_Blue,styles.view1Txt]}>{this.state.teamNumber}</Text>
                        <Text style={[fonts.bodyText_Gray1]}>团队人数</Text>
                  </View>
                  <View style={styles.view1R}>
                        <Text style={[fonts.t3_Blue,styles.view1Txt]}>{moment(this.state.createTime).format('YYYY-MM-DD')}</Text>
                        <Text style={[fonts.bodyText_Gray1]}>创建时间</Text>
                  </View>
            </View>
            <View style={styles.viewList}>
                  <Text style={[fonts.bodyText_Black,styles.flex]}>上级姓名：<Text style={[fonts.bodyText_Gray]}>{this.state.userName}</Text></Text>
            </View>
            <View style={styles.viewList}>
                  <Text style={[fonts.bodyText_Black,styles.flex]}>联系方式：<Text style={[fonts.bodyText_Gray]}>{this.state.userPhone}</Text></Text>
                  <TouchableHighlight onPress={() => {this._callPhone()}} underlayColor="transparent">
                  <View style={styles.callBtn}><Text style={[fonts.bodyText_Blue]}>去联系</Text></View>
                  </TouchableHighlight>
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
AppRegistry.registerComponent('MyOrgSecond', () => MyOrgSecond);
