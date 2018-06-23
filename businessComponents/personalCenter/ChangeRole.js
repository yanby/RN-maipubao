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
  Modal
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/personalCenter/ChangeRole';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import SubmitBtn from '../../commonComponents/BtnCommon/SubmitBtn';

import { apis,sites } from '../../systemComponents/Remote/ApiStorage';
import BasicComponent from '../basic/BasicComponent';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class ChangeRole extends BasicComponent {

  constructor(props){
     super(props);
     this.state={
      modalObject:{},
      loadingObject:{},
      roleType:'',
      tcpName:'角色变更说明',
     }
   }

  _loadUser(){
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
          Actions.Login({})
        };
      }).then(retJson=>{
        this.setState({roleType:retJson.roleType});
      })
    }).catch(err => {
      // this.msgShort("用户失效，请重新登录4");
      Actions.Login({})
    })
  }
  componentWillMount(){
    this._loadUser();
  }
  // 弹框
  testContent(){
    this.content(
      {
        isWholeCustom:true,
        customText:()=>{
          return (<View style={styles.Fullscreen}>
                        <View style={styles.cityNav}>
                              <View style={[styles.chooseView,styles.borderLine]}>
                                    <Text style={fonts.bodyText_Black}>您当前角色是{this.state.roleType}</Text>
                              </View>
                              {
                                this.state.roleType != '品牌人' ?
                              <TouchableHighlight style={styles.chooseView} underlayColor="#fff" onPress={() => {this._OpenNewIndex(0)}}>
                                    <Text style={fonts.bodyText_Gray}>品牌人</Text>
                              </TouchableHighlight>
                              :null}
                              {
                                this.state.roleType != '招商人' ?
                              <TouchableHighlight style={styles.chooseView} underlayColor="#fff" onPress={() => {this._OpenNewIndex(1)}}>
                                    <Text style={fonts.bodyText_Gray}>招商人</Text>
                              </TouchableHighlight>
                              :null}
                              {
                                this.state.roleType != '金伙伴' ?
                              <TouchableHighlight style={styles.chooseView} underlayColor="#fff" onPress={() => {this._OpenNewIndex(2)}} >
                                    <Text style={fonts.bodyText_Gray}>金伙伴</Text>
                              </TouchableHighlight>
                              :null}
                              <TouchableHighlight style={[styles.chooseView,styles.marginTop10]} underlayColor="#fff" onPress={() => {this.closeModal()}}>
                                    <Text style={fonts.bodyText_Black}>取消</Text>
                              </TouchableHighlight>

                        </View>
          </View>);
        }
      })
  }
  _OpenNewIndex(roleNo){
    this.closeModal()
    if(roleNo == 0){
      Actions.Brander({})
    }else if(roleNo == 1){
      Actions.Franchiser({})
    }else{
      Actions.GoldPartner({})
    }

  }
  render() {
    return (
      <View style={[styles.mainView]}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
            <Title isLeftShow={true} backColor={true} isRightBtnShow={false} title={'变更角色'}/>
            <View style={[styles.viewText]}>
                  <Text style={[styles.marginTop25,fonts.bodyText_Black]}>
                  您当前的角色：
                  <Text style={[fonts.bodyText_Black]}>{this.state.roleType}</Text>
                  </Text>
                  <Text style={[styles.marginTop25,fonts.bodyText_Black]}>您可变更的角色：</Text>
                  {
                    this.state.roleType != '品牌人' ?
                  <Text style={[styles.marginTop10,fonts.bodyText_Gray]}>品牌人</Text>
                  :null}
                  {
                    this.state.roleType != '招商人' ?
                  <Text style={[styles.marginTop10,fonts.bodyText_Gray]}>招商人</Text>
                  :null}
                  {
                    this.state.roleType != '金伙伴' ?
                  <Text style={[styles.marginTop10,fonts.bodyText_Gray]}>金伙伴</Text>
                  :null}
                  <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.Protocol({protocolName:this.state.tcpName})}>
                    <Text style={[styles.marginTop25,fonts.bodyText_Blue]}>角色变更说明？</Text>
                  </TouchableHighlight>
            </View>
            <SubmitBtn btnText={'去变更'} isNeedLoading={false} styles={[styles.listBtn,styles.positionBottom20]} onPress={()=>this.testContent()} />
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
AppRegistry.registerComponent('changeRole', () => changeRole);
