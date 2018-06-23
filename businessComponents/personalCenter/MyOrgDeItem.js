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
import {styles} from '../../styles/personalCenter/MyOrgDetails';
import {staticSite} from '../../systemComponents/Remote/ApiStorage';

export default class MyOrgDeItem extends Component {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      projectName: this.props.item.projectName ? this.props.item.projectName : '暂无',
      signType: this.props.item.signType ? this.props.item.signType : '暂无',
      signTime: this.props.item.signTime ? moment(this.props.item.signTime).format('YYYY-MM-DD') : '暂无',
      signCommission:this.props.flag?this.props.item.developCommission.toFixed(2) : this.props.item.recommendCommission.toFixed(2),
    };
  }
  render(){
  return(
          <View style={styles.listItem}>
                <TouchableHighlight underlayColor="transparent">
                      <View style={styles.view6}>
                            <View style={styles.view6List}>
                                  <View style={styles.view6ListV}>
                                        <Image style={styles.view6Icon} source={require('../../images/myOrgIcon12.png')}/>
                                        <Text style={[fonts.bodyText_Gray]}>项目名称：<Text style={[fonts.bodyText_Black]}>{this.state.projectName}</Text></Text>
                                  </View>
                                  <View style={styles.view6ListV}>
                                        <Image style={styles.view6Icon} source={require('../../images/myOrgIcon9.png')}/>
                                        <Text style={[fonts.bodyText_Gray]}>签约类型：<Text style={[fonts.bodyText_Black]}>{this.state.signType}</Text></Text>
                                  </View>
                                  <View style={styles.view6ListV}>
                                        <Image style={styles.view6Icon} source={require('../../images/myOrgIcon13.png')}/>
                                        <Text style={[fonts.bodyText_Gray]}>签约时间：<Text style={[fonts.bodyText_Black]}>{this.state.signTime}</Text></Text>
                                  </View>
                                  <View style={styles.view6ListV}>
                                        <Image style={styles.view6Icon} source={require('../../images/myOrgIcon14.png')}/>
                                        <Text style={[fonts.bodyText_Gray]}>贡献金额：<Text style={[fonts.bodyText_Blue]}>{this.state.signCommission}元</Text></Text>
                                  </View>
                            </View>
                      </View>
                </TouchableHighlight>
          </View>

    )
  }
}
