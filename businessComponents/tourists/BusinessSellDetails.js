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
  ListView
} from 'react-native';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/tourists/BusinessSellDetails';
import {flow} from '../../styles/tourists/BusinessFlow';
import BusinessSellDetailsItem from './BusinessSellDetailsItem';
import { Actions,ActionConst } from 'react-native-router-flux';
export default class BusinessSellDetails extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let data = [];
    let user ={item:{name:'sasa'}};
    data.push(user);
    data.push(user);
    this.state={
      dataSource: ds.cloneWithRows(data),
    };
  }
  render() {
    return (
      <View style={styles.mainView}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
            <View style={[styles.view]}>
                  <View style={[styles.ListTextNum]}>
                        <View style={[styles.project]}>
                              <Text style={[styles.projectText,fonts.bodyText_Black]}>项目名称：天津开发区项目</Text>
                              <Text style={[styles.projectText,fonts.bodyText_Black]}>项目经理：李某某</Text>
                              <Text style={[styles.projectText,fonts.bodyText_Black]}>需求类型：求购</Text>
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
            </View>
            <ListView contentContainerStyle={styles.list}
                      dataSource={this.state.dataSource}
                      enableEmptySections={true}
                      renderRow={(data) => <BusinessSellDetailsItem {...data} />}
                      renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}  />}/>
      </View>
    );
  }
}
AppRegistry.registerComponent('BusinessSellDetails', () => BusinessSellDetails);
