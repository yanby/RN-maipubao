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
} from 'react-native';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/tourists/ProjectCustomerDetailsNo';
import {flow} from '../../styles/tourists/BusinessFlow';
import { Actions,ActionConst } from 'react-native-router-flux';
export default class ProjectCustomerDetailsNo extends Component {
  render() {
    return (
      <View style={[styles.mainView]}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
            <View style={[styles.nav]}>
                  <TouchableHighlight style={[styles.navLeft]} underlayColor="transparent" onPress={()=>Actions.ProjectCustomerDetails({})}>
                        <Image source={require('../../images/back.png')}></Image>
                  </TouchableHighlight>
                  <View style={[styles.navCenter]}>
                        <Text style={[fonts.t2_Black]}>客户详情</Text>
                  </View>
            </View>
            <ScrollView>
                  <View style={[styles.view]}>
                        <View style={[styles.titleView]}>
                              <Text style={[styles.titleViewText,fonts.t3_Black]}>客户信息：</Text>
                        </View>
                        <View style={[styles.bodyView]}>
                              <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>客户姓名：米先生</Text>
                              <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>联系方式：12345678910</Text>
                              <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>客户性别：男</Text>
                        </View>
                  </View>
                  <View style={[styles.view]}>
                        <View style={[styles.titleView]}>
                              <Text style={[styles.titleViewText,fonts.t3_Black]}>经纪人信息：</Text>
                        </View>
                        <View style={[styles.bodyView]}>
                              <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>经纪人姓名：王经纪人</Text>
                              <View style={[styles.row]}>
                                    <Text style={[styles.flex,styles.bodyViewText,fonts.hintText_Gray]}>联系方式：13155551234</Text>
                                    <TouchableHighlight style={[styles.numBtn]}>
                                          <Text style={[fonts.hintText_Blue]}>去联系</Text>
                                    </TouchableHighlight>
                              </View>
                              <Text style={[styles.bodyViewText,fonts.hintText_Gray]}>经纪人类型：招商人</Text>
                        </View>
                  </View>
                  <View style={[styles.view]}>
                        <View style={[styles.titleView]}>
                              <Text style={[styles.titleViewText,fonts.t3_Black]}>交易信息：</Text>
                        </View>
                        <View style={[styles.ListTextNum]}>
                              <View style={[styles.project]}>
                                    <Text style={[styles.projectText,fonts.hintText_Black]}>项目名称：天津开发区项目</Text>
                                    <Text style={[styles.projectText,fonts.hintText_Black]}>项目经理：李某某</Text>
                                    <Text style={[styles.projectText,fonts.hintText_Black]}>需求类型：求租</Text>
                              </View>
                        </View>
                        <View style={[flow.horizontalFlow]}>
                              <Image style={[flow.horizontalLine]} source={require('../../images/horizontalLine.png')}></Image>
                              <View>
                                    <View style={[flow.flowList]}>
                                          <View style={[flow.flowListView]}>
                                                <Image source={require('../../images/businessFlow5.png')}>
                                                      <Text style={[flow.colorRed,flow.flowListText]}>报备</Text>
                                                </Image>
                                          </View>
                                          <View style={[flow.flowListView]}>
                                                <Image source={require('../../images/businessFlow6.png')}>
                                                      <Text style={[flow.colorYellow,flow.flowListText]}>带看</Text>
                                                </Image>
                                          </View>
                                          <View style={[flow.flowListView]}>
                                                <Image source={require('../../images/businessFlow7.png')}>
                                                      <Text style={[flow.colorGreen,flow.flowListText]}>带看</Text>
                                                </Image>
                                          </View>
                                          <View style={[flow.flowListView]}>
                                                <Image source={require('../../images/businessFlow8.png')}>
                                                      <Text style={[flow.colorGray,flow.flowListText]}>带看</Text>
                                                </Image>
                                          </View>
                                          <View style={[flow.flowListView]}>
                                                <Image source={require('../../images/businessFlow5.png')}>
                                                      <Text style={[flow.colorRed,flow.flowListText]}>带看</Text>
                                                </Image>
                                          </View>
                                          <View style={[flow.flowListView]}>
                                                <Image source={require('../../images/businessFlow5.png')}>
                                                      <Text style={[flow.colorRed,flow.flowListText]}>带看</Text>
                                                </Image>
                                          </View>
                                    </View>
                              </View>
                        </View>
                        <TouchableHighlight>
                              <View style={[styles.viewMore]}>
                                    <Text style={[styles.viewTextMore,fonts.hintText_Gray]}>查看详情</Text>
                                    <Image source={require('../../images/more.png')}></Image>
                              </View>
                        </TouchableHighlight>
                  </View>
                  <View style={[styles.view]}>
                        <View style={[styles.listText]}><Text style={[fonts.bodyText_Black]}>无效时间：2017-06-12   13:03</Text></View>
                        <View style={[styles.listText]}><Text style={[fonts.bodyText_Black]}>无效原因：客户不买了</Text></View>
                  </View>
            </ScrollView>
            <Image style={[styles.invalid]} source={require('../../images/Invalid.png')}></Image>
      </View>
    );
  }
}
AppRegistry.registerComponent('ProjectCustomerDetailsNo', () => ProjectCustomerDetailsNo);
