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
import {comlist} from '../../styles/newApp/ProjectList';
import {staticSite} from '../../systemComponents/Remote/ApiStorage';
import BasicComponent from '../basic/BasicComponent';


export default class ProspectingListItem extends BasicComponent {
  constructor(props){
    super(props);
    this.state={
    };
  }

  render(){
    return(
            <View style={comlist.container}>
                  <TouchableHighlight underlayColor="transparent" >
                      <View style={comlist.projectView}>
                            <Image style={comlist.imgView} source={require('../../images/projectList.png')}/>
                            <View style={comlist.rightView}>
                                    <View style={comlist.rightTop} ellipsizeMode={'clip'}>
                                           <Text style={[fonts.t3_Black,comlist.rightText]} numberOfLines={1} >朝阳-双井 | 100㎡</Text>
                                    </View>
                                    <View style={comlist.rightMiddle} ellipsizeMode={'clip'}>
                                           <Text style={[fonts.hintText_Gray,comlist.middelText]} numberOfLines={1}>广平门黄平路平米商铺</Text>
                                           <Text style={[fonts.hintText_Gray,comlist.rightTitle]}><Text style={comlist.rightNum}>6.76</Text>万／元</Text>
                                    </View>
                                    <View style={comlist.rightBottom}>
                                          <View style={comlist.bottomView}>
                                                <Text style={fonts.tinyText_Blue}>临近地铁</Text>
                                          </View>
                                          <View style={comlist.bottomView}>
                                                <Text style={fonts.tinyText_Blue}>可明火</Text>
                                          </View>
                                    </View>
                            </View>
                      </View>
                  </TouchableHighlight>
            </View>
      )
    }
  }
