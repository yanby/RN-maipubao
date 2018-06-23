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
  WebView,
  Modal
} from 'react-native';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/personalCenter/Protocol';
import { Actions,ActionConst } from 'react-native-router-flux';
import BasicComponent from '../basic/BasicComponent';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { apis,sites,h5Sites} from '../../systemComponents/Remote/ApiStorage';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class Protocol extends BasicComponent {
  constructor (props) {
   super(props)
   this.state = {
     modalObject:{},
     loadingObject:{},
     protocolName: this.props.protocolName,
     url:null
   }
 }
 componentWillMount(){
   storage.load({key: keys.currentRemoteSite }).then(ret => {
     let site = h5Sites[ret]
     this.setState({
       url: site + '/agreement/getDetail/'+ this.state.protocolName
     })
   })
 }
  render() {
    return (
      <View style={styles.main}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
            <Title isLeftShow={true} backColor={true} isRightBtnShow={false} title={'协议'}/>
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
      </View>
    );
  }
}
AppRegistry.registerComponent('Protocol', () => Protocol);
