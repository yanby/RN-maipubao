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
  ScrollView,
  WebView
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/project/ProjectDetails0';
import {h5Sites, apis} from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class Introduction extends Component {
  constructor(props){
    super(props);
    this.state={
      h5Site: null
    };
  }

  componentWillMount(){
    storage.load({
      key: keys.currentRemoteSite
    }).then(ret => {
      this.setState({
        h5Site: h5Sites[ret]
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <Title isLeftShow={true} backColor={true} title={'楼层平面'} >
        </Title>
        {
          this.state.h5Site ?
            <WebView
              source={{uri: this.state.h5Site + '/project/introduction/' + this.props.id}}
              style={styles.webView}
              automaticallyAdjustContentInsets={false}
              startInLoadingState={true}
              domStorageEnabled={true}
              javaScriptEnabled={true}
              scalesPageToFit={true}
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
              scrollEnable={false} />
          : null
        }
      </View>
    );
  }
}

AppRegistry.registerComponent('Introduction', () => Introduction);
