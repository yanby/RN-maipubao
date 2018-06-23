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
  Linking
} from 'react-native';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/personalCenter/manageDetails';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { apis,sites,staticSite } from '../../systemComponents/Remote/ApiStorage';
import ListBasicComponent from '../basic/ListBasicComponent';
import { NiceList } from '../../commonComponents/niceList/NiceList';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class CooManageDetails extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.main}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
            <Title isLeftShow={true} backColor={true} isRightBtnShow={false} title={'合作详情'}/>
            <View>
                  <View style={styles.list}>
                        <Text style={[styles.lineHeight24,fonts.bodyText_Gray]}>姓       名：</Text>
                        <Text style={[styles.txt,styles.flex1,fonts.bodyText_Black]}>{this.props.dataInfo.customer}</Text>
                  </View>
                  <View style={styles.list}>
                        <Text style={[styles.lineHeight24,fonts.bodyText_Gray]}>手机号码：</Text>
                        <Text style={[styles.txt,styles.flex1,fonts.bodyText_Black]}>{this.props.dataInfo.customerPhone}</Text>
                  </View>
                  <View style={styles.list}>
                        <Text style={[styles.lineHeight24,fonts.bodyText_Gray]}>意       向：</Text>
                        <Text style={[styles.txt,styles.flex1,fonts.bodyText_Black]}>{this.props.dataInfo.cooperationType}类合作</Text>
                  </View>
                  <View style={styles.remark}>
                        <Text style={[styles.lineHeight24,fonts.bodyText_Gray]}>备       注：</Text>
                        <Text style={[styles.lineHeight24,fonts.bodyText_Black,styles.flex1]}>
                              {this.props.dataInfo.customerRemark}
                        </Text>

                  </View>
            </View>
      </View>
    );
  }
}
AppRegistry.registerComponent('CooManageDetails', () => CooManageDetails);
