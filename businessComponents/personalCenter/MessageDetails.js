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
import {styles} from '../../styles/personalCenter/MessageDetails';
import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import BasicComponent from '../basic/BasicComponent';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class MessageDetails extends BasicComponent {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      id:this.props.id,
      userId:this.props.userId,
      title: this.props.contenTitle,
      content: this.props.content
    };
  }

  componentWillMount(){
  }

  render() {
    return (
      <View style={[styles.mainView]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <Title isLeftShow={true} backColor={true} isRightBtnShow={false} title={'消息详情'}/>
        <View style={[styles.titleView]}>
          <Text style={[styles.titleViewText,fonts.t2_Black]}>{this.state.title}</Text>
        </View>
        <View style={[styles.bodyText]}>
          <Text style={[styles.bodyTextTxt,fonts.bodyText_Gray]}>{this.state.content}</Text>
          </View>
      </View>
    );
  }
}
AppRegistry.registerComponent('messageDetails', () => messageDetails);
