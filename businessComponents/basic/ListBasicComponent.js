import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableHighlight,
  Image
} from 'react-native';

import BasicComponent from './BasicComponent';

export default class ListBasicComponent extends BasicComponent {
  constructor(props){
    super(props);
  }
  // const pageUrlHelp = {
  //   searchUrl:''
  //   initUrl:(index,getCurrentUrl)=>{
  //     let pageUrlHelp.searchUrl = getCurrentUrl();
  //     return pageUrlHelp.addParams('page',index).searchUrl;
  //   },
  //   addParams:(key,value)=>{
  //     if (value&&value.length>0) {
  //       if (pageUrlHelp.searchUrl.indexOf('?')==-1) {
  //         pageUrlHelp.searchUrl+="?" + key + "=" + value;
  //       }else {
  //         pageUrlHelp.searchUrl+="&" + key + "=" + value;
  //       }
  //       return pageUrlHelp;
  //     }
  //   }
  // }
}
