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
import {styles} from '../../styles/commonStyle/Details';
import { apis,sites,staticSite } from '../../systemComponents/Remote/ApiStorage';
export default class DetailsItem extends Component {
  constructor(props){
    super(props);
    console.log(this.props)
    this.state={

    };
  }
  render(){
    return(
            <View>
                  <TouchableHighlight underlayColor="transparent">
                        <View style={styles.ViewList}>
                              {this.props.item.user.logoPath?
                                <Image style={styles.headImg}  source={{uri:staticSite +  this.props.item.user.logoPath}}></Image>
                                :
                                <Image style={styles.headImg} source={require('../../images/noPhoto.png')}></Image>
                              }
                              <View style={styles.ViewListText}>
                                    <Text style={[styles.lineHeight20,fonts.hintText_Gray1]}>{this.props.item.user.name}</Text>
                                    <Text style={[styles.lineHeight20,fonts.hintText_Gray]}>{moment(this.props.item.createTime).format('YYYY-MM-DD')}</Text>
                                    <Text style={[styles.lineHeight20,fonts.bodyText_Black]}>{this.props.item.content}</Text>
                              </View>
                        </View>
                  </TouchableHighlight>
            </View>
      )
    }
  }
