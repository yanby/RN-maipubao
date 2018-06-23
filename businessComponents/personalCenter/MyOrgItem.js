import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  PixelRatio,
  Linking,
  Platform,
  NativeModules,
  AsyncStorage,
  NativeAppEventEmitter,
  Dimensions,AppRegistry,TouchableHighlight,Modal
} from 'react-native';
var moment = require('moment');
import { Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/personalCenter/MyOrg';
import {staticSite} from '../../systemComponents/Remote/ApiStorage';
import { UMengAnalytics } from '../../commonComponents/umeng/UMAnalytics';

export default class MyOrgItem extends Component {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      name:this.props.item.name ? this.props.item.name : '-',
      account:this.props.item.account,
      logoPath:this.props.item.logoPath,
      signNumber:this.props.item.signNumber,
      signNumberZ:this.props.item.signNumberZ,
      signNumberX:this.props.item.signNumberX,
      signCommission:this.props.item.signCommission.toFixed(2),
      id:this.props.item.id,
      recommendNumber:this.props.item.recommendNumber,
      flag:this.props.flag,
    };
  }



  //拨打电话
  _callPhone(){
    if(this.state.account) {
      Linking.openURL('tel:' + this.state.account)
    }
  }

  render(){
  return(
    <View style={styles.main}>
          <View style={styles.listItem}>
                <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.MyOrgDetails({flag:this.state.flag, userId:this.state.id})}>
                      <View style={styles.listView}>
                      {
                        this.state.logoPath ? (<Image style={styles.listViewH} source={{uri: staticSite + this.state.logoPath}}/>) : (<Image style={styles.listViewH} source={require('../../images/noPhoto.png')}/>)
                      }
                            <View style={styles.listViewTxt}>
                                  <Text style={[fonts.bodyText_Black]}>{this.state.name}</Text>
                                  <View style={styles.listViewTxtT}>
                                        <Text style={[fonts.bodyText_Gray]}>累计结佣单数<Text style={[fonts.bodyText_Black,styles.color1]}>|{this.state.signNumber}</Text>单</Text>
                                        <Text style={[fonts.hintText_Gray,styles.marginLeft5]}>招商单<Text style={[fonts.hintText_Black,styles.color2]}>|{this.state.signNumberZ}</Text>单</Text>
                                        <Text style={[fonts.hintText_Gray,styles.marginLeft5]}>销售单<Text style={[fonts.hintText_Black,styles.color3]}>|{this.state.signNumberX}</Text>单</Text>
                                  </View>
                                  <Text style={[fonts.bodyText_Gray,styles.marginTop13]}>累计奖励金额<Text style={[fonts.hintText_Black,styles.color4]}>|{this.state.signCommission}</Text>元</Text>
                            </View>
                      </View>
                </TouchableHighlight>
                <View style={styles.btn}>
                      {
                        this.state.flag && this.state.recommendNumber>0?
                        <TouchableHighlight style={styles.contact} underlayColor="transparent" onPress={()=>Actions.MyRecommend({userId:this.state.id,selectedTab:"home"})} >
                              <Text style={[fonts.bodyText_Blue]}>查看推荐人</Text>
                        </TouchableHighlight>
                        :null
                      }
                      <TouchableHighlight style={styles.callBtn} underlayColor="transparent" onPress={() => {this._callPhone()}}>
                            <Text style={[fonts.bodyText_Blue]}>去联系</Text>
                      </TouchableHighlight>
                </View>
          </View>
    </View>
    )
  }
}
