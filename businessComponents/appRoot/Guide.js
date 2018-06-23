import React, { Component,PropTypes } from 'react';
import { Actions,ActionConst } from 'react-native-router-flux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,AsyncStorage,Platform
} from 'react-native';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';

var ViewPager = require('react-native-viewpager');
const BANNER_IMGS = [
  require('../../images/1.jpg'),
  require('../../images/2.jpg'),
  require('../../images/3.jpg'),
];

export default class Guide extends Component {
  constructor(props) {
    super(props);
    // 用于构建DataSource对象
    var dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });
    // 实际的DataSources存放在state中
    this.state = {
      dataSource: dataSource.cloneWithPages(BANNER_IMGS),userInfo:{},
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ViewPager style={styles.bannar} dataSource={this.state.dataSource} renderPage={this._renderPage.bind(this)}
          isLoop={false}   autoPlay={false}/>
      </View>
    );
  }
  _onPress(){
    storage.save({
      key:keys.openAppStatus,
      data:'FirstOpen',
      expires:1000*3600*24*7*4
    })
    Actions.reset('Index',{});
  }
  _renderPage(data,pageID) {
    return (
      <View>
      {pageID==2?
        <View>
              <Image source={data} style={styles.page}/>
              <TouchableHighlight style={styles.touchBtn} underlayColor="transparent" onPress={()=>this._onPress()}>
                   <Text style={styles.touchBtnText}>立即体验</Text>
              </TouchableHighlight>
        </View>
        :
        <Image source={data} style={styles.page}/>
      }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor:"#fff"
  },
  bannar:{
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
  },
  page: {
    height:Dimensions.get('window').height,
    width:Dimensions.get('window').width,
  },
  touchBtn:{
    position:"absolute",
    left:110,
    zIndex:10,
    width:Dimensions.get('window').width-220,
    height:35,
    backgroundColor:"transparent",
    borderRadius:10,
    alignItems:"center",
    justifyContent:"center",
    borderColor:"#fff",
    borderWidth:1,
    ...Platform.select({
      ios: {
        bottom:20,
      },
      android: {
        bottom:70,
      },
    }),
  },
  touchBtnText:{
   fontSize:16,
   color:"#fff",
   textAlign:"center"
  }

});
