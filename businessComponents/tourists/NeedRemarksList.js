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
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/tourists/NeedRemarksList';
import NeedRemarksListItem from './NeedRemarksListItem';
import { Actions,ActionConst } from 'react-native-router-flux';
import {Title} from '../../commonComponents/CommentTitle/Title';
var moment=require('moment');

export default class NeedRemarksList extends Component {
  constructor(props){
    super(props);
    this.state={
      marks:this.props.marks ? this.props.marks:[],
      customerId:this.props.customerId,
    };
  }

  renderMarkItem(item,index){
    return (
      <View style={styles.viewList} key={index}>
            <Text style={[styles.viewListText,fonts.bodyText_Gray]}>{item.mark}</Text>
            <Text style={[styles.viewListDate,fonts.hintText_Gray]}>{moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.mainView}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
            <Title isLeftShow={true} backColor={true} isRightBtnShow={false} title={'需求备注'}/>
            <ScrollView style={styles.scroll}>
              {this.state.marks.map((item,index)=>{
                return this.renderMarkItem(item,index)
              })}
            </ScrollView>
      </View>
    );
  }
}
AppRegistry.registerComponent('NeedRemarksList', () => NeedRemarksList);
