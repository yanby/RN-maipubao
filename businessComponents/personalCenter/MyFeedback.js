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
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/personalCenter/MyFeedback';
import BasicComponent from '../basic/BasicComponent';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { apis,sites } from '../../systemComponents/Remote/ApiStorage';
export default class MyFeedback extends BasicComponent {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      selected:0,
      message0:'',
      message1:'',
      message2:'',
      userId:'',
    };
  }

  _loadData(){
    storage.load({key: keys.currentUser}).then(currentUser => {
      this.setState({userId:currentUser.id})
    }).catch(err => {
      Actions.Login({})
    })
  }

  componentWillMount(){
    this._loadData()
  }

  _onTabPress(index){
    this.setState({selected:index});
  }
  _submit(){
    let status = '投诉'
    let message = this.state.message0
    if(this.state.selected == 1){
      status = '建议'
      message = this.state.message1
    }else if(this.state.selected == 2){
      status = '咨询'
      message = this.state.message2
    }
    if(!message){
      this.msgShort('亲，别调皮，内容不能为空哦！')
      return
    }
    let feedbackInfo={
        "status":  status,
        "message": message,
        "reply": false,
        "user": '/users/' + this.state.userId
    }
    storage.load({
      key: keys.userFeedback,
      syncInBackground: false,
      syncParams: {
         url: apis.userFeedback,
         body:feedbackInfo
      }
    }).then(ret => {
      if(ret.status == 201){
        return ret.json()
      } else {
        return Promise.reject('')
      }
    }).then(res => {
        this.closeLoading();
        this.msgShort('提交成功，会尽快回复您哦！')
        Actions.pop();
    }).catch(err => {
      this.closeLoading();
      this.msgShort('提交失败')
    })

  }

  render() {
    return (
      <View style={[styles.mainList]}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
      <View style={styles.tabView}>
            <SegmentedControlTab borderRadius={0} tabsContainerStyle={styles.tabsContainerStyle}
                tabStyle={styles.tabStyle} tabTextStyle={[styles.tabTextStyle,fonts.bodyText_Black]}
                activeTabStyle={styles.activeTabStyle} activeTabTextStyle={[fonts.bodyText_Black,styles.activeTabTextStyle]}
                selectedIndex={this.state.selected} values={['投诉', '建议','咨询']}
                onTabPress= {index => this._onTabPress(index)}/>
                <TouchableHighlight style={styles.backView} underlayColor="transparent" onPress={()=>Actions.pop({})}>
                      <Image  source={require('../../images/back.png')}/>
                </TouchableHighlight>
      </View>
      <View  style={styles.scrollview}>
      {
        this.state.selected===0?
        <View style={styles.tabListView}>
                    <View style={[styles.listViewText]}>
                          <TextInput  style={[styles.loginTextInput,fonts.bodyText_black]}
                            underlineColorAndroid="transparent"
                            clearButtonMode="always" returnKeyType='done'
                            placeholder="请输入您的投诉内容"
                            placeholderTextColor="#ccc"
                            onChangeText={(text) => this.setState({message0: text})}
                            multiline={true} blurOnSubmit={true}
                          />
                    </View>
                    <TouchableHighlight style={styles.subTouch} underlayColor="#3a8ff3" onPress={() => {this._submit()}}>
                        <Text style={fonts.t3_white}>提交</Text>
                    </TouchableHighlight>
        </View>:null
      }
      {
        this.state.selected===1?
        <View style={styles.tabListView}>
                    <View style={[styles.listViewText]}>
                    <TextInput
                      style={[styles.loginTextInput,fonts.bodyText_black]}
                      underlineColorAndroid="transparent"
                      clearButtonMode="always" returnKeyType='done'
                      placeholder="请输入您的建议内容"
                      placeholderTextColor="#ccc"
                      onChangeText={(text) => this.setState({message1: text})}
                      multiline={true}
                      blurOnSubmit={true}
                    />
                    </View>
                    <TouchableHighlight style={styles.subTouch} underlayColor="#3a8ff3" onPress={() => {this._submit()}}>
                        <Text style={fonts.t3_white}>提交</Text>
                    </TouchableHighlight>
        </View>:null
      }
      {
        this.state.selected===2?
        <View style={styles.tabListView}>
                    <View style={[styles.listViewText]}>
                    <TextInput
                      style={[styles.loginTextInput,fonts.bodyText_black]}
                      underlineColorAndroid="transparent"
                      clearButtonMode="always" returnKeyType='done'
                      placeholder="请输入您的咨询内容"
                      placeholderTextColor="#ccc"
                      onChangeText={(text) => this.setState({message2: text})}
                      multiline={true}
                      blurOnSubmit={true}
                    />
                    </View>
                    <TouchableHighlight style={styles.subTouch} underlayColor="#3a8ff3" onPress={() => {this._submit()}}>
                        <Text style={fonts.t3_white}>提交</Text>
                    </TouchableHighlight>
        </View>:null
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
AppRegistry.registerComponent('MyFeedback', () => MyFeedback);
