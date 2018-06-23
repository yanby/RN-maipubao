import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  PixelRatio,
  Platform,
  NativeModules,
  AsyncStorage,
  NativeAppEventEmitter,
  Dimensions,AppRegistry,TouchableHighlight,Modal
} from 'react-native';
var moment = require('moment');
import { Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/personalCenter/ManageCardList';
export default class ManageCardListItem extends Component {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      bankAccount: this.props.item.bankAccountShort ? this.props.item.bankAccountShort : '****'
    };
  }

  render(){
    return(
            <View style={styles.view}>
                  <TouchableHighlight underlayColor="transparent" >
                        <Image style={styles.imageBg} source={require('../../images/bankCard.png')}>
                              <Text style={[styles.num,fonts.t1_white]}>**** **** **** {this.state.bankAccount}</Text>
                        </Image>
                  </TouchableHighlight>
            </View>
      )
    }
  }
