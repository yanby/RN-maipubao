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
  WebView
} from 'react-native';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/community/Rankinglist';
import RankingListItem from './RankingListItem';
import { Actions,ActionConst } from 'react-native-router-flux';
import ListBasicComponent from '../basic/ListBasicComponent';
import { NiceList } from '../../commonComponents/niceList/NiceList';

import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
export default class Rankinglist extends ListBasicComponent {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      remoteUrl:apis.RankinglistK,
      storkey:keys.RankinglistK,
    };
  }
  // async componentWillMount(){
  //   this.openLoading();
  //   storage.load({
  //     key: keys.RankinglistK,
  //     syncInBackground: false,
  //     syncParams: {
  //        url: apis.RankinglistK,
  //     }
  //   }).then(ret => {
  //     console.log(ret);
  //     if(ret.status == 200){
  //       return ret.json();
  //
  //     }else{
  //       this.msgShort('异常');
  //       this.closeLoading();
  //     };
  //   }).then(retJson=>{
  //     this.closeLoading();
  //     console.log(retJson);
  //     this.setState({remoteUrl:apis.RankinglistK})
  //  }).catch(err=>{
  //    this.closeLoading();
  //    this.msgShort('err');
  //  })
  // }
  render() {
    return (
      <View style={styles.main}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
            <Image  style={styles.rankBg} source={require('../../images/rankingBg.png')}>
                   <View style={styles.rankView}>
                          <TouchableHighlight style={styles.touchBack} underlayColor="transparent" onPress={()=>Actions.pop({})}>
                             <Image source={require('../../images/backWhite.png')}/>
                          </TouchableHighlight>
                          <Text style={[styles.rankTitle,fonts.t2_white]}>排行榜</Text>
                    </View>
            </Image>
            <View style={styles.container}>
                  <NiceList customListSourceFlag={'billboards'} renderItem={(rowData)=><RankingListItem {...rowData} />}
                  contentContainerStyle={styles.list}
                  remoteUrl={this.state.remoteUrl}
                  storkey={this.state.storkey}
                  />
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
