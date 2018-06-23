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
  WebView,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/personalCenter/DevelopTeamTCP';
import BasicComponent from '../basic/BasicComponent';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { apis,sites,staticSite,h5Sites } from '../../systemComponents/Remote/ApiStorage';
import CheckBox from 'react-native-check-box';
import HTMLView from 'react-native-htmlview';
import SubmitBtn from '../../commonComponents/BtnCommon/SubmitBtn';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class DevelopTeamTCP extends BasicComponent {
  constructor () {
   super()
   this.state = {
     modalObject:{},
     loadingObject:{},
     modalObject:{},
     loadingObject:{},
     checked:false,
     userId:'',
     teamName:'',
     teamNameText:'',
     teamType:'公司类',
     url: null
   }
 }
  renderSatus(item,i){
    let checkStatus = this.state.checked;
    return <CheckBox
      style={styles.checkBoxView}
      onClick={()=>this._onChange()}
      isChecked={checkStatus}
      checkedImage={<Image source={require('../../images/checked.png')} />}
      unCheckedImage={<Image source={require('../../images/noCheck.png')} />}
      />
      ;
  }
 _onChange(){
   if(this.state.checked){
     this.setState({checked:false});
   }else{
     this.setState({checked:true});
   }
  }

  _loadData(){
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
        }
      }).then(retJson=>{
        if(retJson.roleType == '公司'){
          this.setState({
            userId: retJson.id,
            teamName: retJson.companyName,
            teamNameText: retJson.companyName,
            teamType: '公司类'
          })
        }else{
          this.setState({
            userId: retJson.id,
            teamType:'个人类'})
        }
    }).catch(err => {
      Actions.Login({})
    })
    }).catch(err => {
      Actions.Login({})
    })
  }

  componentWillMount(){
    this._loadData();

    storage.load({key: keys.currentRemoteSite }).then(ret => {
      let site = h5Sites[ret]
      this.setState({
        url: site + '/agreement/getDetail/发展团队协议'
      })
    })
  }

  _submit(obj){
    storage.load({
      key: keys.createTeam,
      syncInBackground: false,
      syncParams: {
         url: apis.createTeam + '?userId=' + this.state.userId + '&teamName=' + this.state.teamName + '&teamType=' + this.state.teamType,
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json()
      } else {
        obj.closeLoading();
        this.msgShort('创建团队失败')
      }
    }).then(res => {
      obj.closeLoading();
      if(res){
        this.msgShort('创建团队成功')
        Actions.PersonalIndex({})
      }else{
        this.msgShort('创建团队失败')
      }
    }).catch(err => {
      this.msgShort('创建团队失败')
    })
  }

  _renderButton(){
    if(this.state.checked && this.state.teamName){
      return (
        <SubmitBtn btnText={'提交'} isNeedLoading={false} styles={[styles.listBtn,styles.marginTop10]} onPress={(obj)=>this._submit(obj)} />
      )
    }else{
      return (
        <TouchableHighlight style={[styles.listBtnGray,styles.marginTop10]} >
              <Text style={[fonts.btnText_white]}>提交</Text>
        </TouchableHighlight>
      )
    }
  }

  _renderTeamName(){
  if(this.state.teamNameText){
    return(
      <Text style={[styles.text,fonts.bodyText_Black]}>{this.state.teamNameText}</Text>
    )
  }else{
    return(
      <View style={[styles.borderBottom]}>
            <TextInput
              style={[fonts.bodyText_Black,styles.flexInput]}
              underlineColorAndroid="transparent"
              clearButtonMode="always" returnKeyType='done'
              maxLength={30}
              value={this.state.teamName}
              onChangeText={(text) => this.setState({teamName: text})}
              onFocus={() => { _scrollView.scrollTo({y: 1660}); }}
            />
        </View>
    )
  }
}

  render() {

    return (
      <View style={styles.main}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <Title isLeftShow={true} backColor={true} isRightBtnShow={false} title={'发展团队协议'}/>
              {this.state.url ?
                <WebView
                 source={{uri:this.state.url}}
                 automaticallyAdjustContentInsets={false}
                 startInLoadingState={true}
                 domStorageEnabled={true}
                 javaScriptEnabled={true}
                 scalesPageToFit={true}
                 scrollEnable={false}
                 style={styles.webView}
                 onShouldStartLoadWithRequest={(e)=>{
                   if (e.url&&e.url.indexOf('://')>0) {
                     var scheme = e.url.split('://')[0]
                     if(scheme === 'http' || scheme === 'https'){
                     return true
                     }
                     return false
                   }else {
                     return false
                   }

                 }}
                  />
              : null}
        <KeyboardAvoidingView behavior={'padding'} >
              <View style={[styles.listText,styles.listTextRow]}>
                    {this.renderSatus()}
                    <TouchableHighlight>
                         <Text style={fonts.bodyText_Blue}>我已阅读并同意该协议</Text>
                    </TouchableHighlight>
              </View>
              <View style={[styles.row,styles.marginLeft15,styles.marginRight15]}>
                    <Text style={[styles.text,fonts.bodyText_Blue]}>*</Text>

                    <Text style={[styles.text,fonts.bodyText_Blue]}>请输入您的团队名称：</Text>
                    <View style={[styles.borderBottom]}>
                        <TextInput
                          style={[fonts.bodyText_Black,styles.flexInput]}
                          underlineColorAndroid="transparent"
                          clearButtonMode="always" returnKeyType='done'
                          maxLength={30}
                          value={this.state.teamName}
                          onChangeText={(text) => this.setState({teamName: text})}
                        />
                    </View>
              </View>
              {
                this._renderButton()
              }
        </KeyboardAvoidingView>
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
AppRegistry.registerComponent('DevelopTeamTCP', () => DevelopTeamTCP);
