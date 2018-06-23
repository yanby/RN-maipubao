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
export default class NeedManageDetails extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.main}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
            <Title isLeftShow={true} backColor={true} isRightBtnShow={false} title={'需求详情'}/>
            <ScrollView>
                  <View style={styles.list}>
                        <Text style={[styles.lineHeight24,fonts.bodyText_Gray]}>需求类型：</Text>
                        <Text style={[styles.txt,styles.flex1,fonts.bodyText_Black]}>{this.props.dataInfo.demandType}</Text>
                  </View>
                  <View style={styles.list}>
                        <Text style={[styles.lineHeight24,fonts.bodyText_Gray]}>联  系  人：</Text>
                        <Text style={[styles.txt,styles.flex1,fonts.bodyText_Black]}>{this.props.dataInfo.customer}</Text>
                  </View>
                  <View style={styles.list}>
                        <Text style={[styles.lineHeight24,fonts.bodyText_Gray]}>联系方式：</Text>
                        <Text style={[styles.txt,styles.flex1,fonts.bodyText_Black]}>{this.props.dataInfo.customerPhone}</Text>
                  </View>
                  <View style={styles.list}>
                        <Text style={[styles.lineHeight24,fonts.bodyText_Gray]}>区       位：</Text>
                        <Text style={[styles.txt,styles.flex1,fonts.bodyText_Black]}>{this.props.dataInfo.area}</Text>
                  </View>
                  <View style={styles.list}>
                        <Text style={[styles.lineHeight24,fonts.bodyText_Gray]}>商铺面积：</Text>
                        <Text style={[styles.txt,styles.flex1,fonts.bodyText_Black]}>{this.props.dataInfo.size}</Text>
                  </View>
                  {
                    this.props.dataInfo.demandType == '出售'?
                    <View>
                          <View style={styles.list}>
                                <Text style={[styles.lineHeight24,fonts.bodyText_Gray]}>价格要求：</Text>
                                <Text style={[styles.txt,styles.flex1,fonts.bodyText_Black]}>{this.props.dataInfo.price}</Text>
                          </View>
                          <View style={styles.list}>
                                <Text style={[styles.lineHeight24,fonts.bodyText_Gray]}>历史经营业态：</Text>
                                <Text style={[styles.txt,styles.flex1,fonts.bodyText_Black]}>{this.props.dataInfo.manageHistory}</Text>
                          </View>
                          <View style={styles.list}>
                                <Text style={[styles.lineHeight24,fonts.bodyText_Gray]}>商铺介绍：</Text>
                                <Text style={[styles.txt,styles.flex1,fonts.bodyText_Black]}>{this.props.dataInfo.shopIntroduce}</Text>
                          </View>
                    </View>
                    :null
                  }
                  {
                    this.props.dataInfo.demandType == '出租'?
                    <View>
                          <View style={styles.list}>
                                <Text style={[styles.lineHeight24,fonts.bodyText_Gray]}>租金要求：</Text>
                                <Text style={[styles.txt,styles.flex1,fonts.bodyText_Black]}>{this.props.dataInfo.price}</Text>
                          </View>
                          <View style={styles.list}>
                                <Text style={[styles.lineHeight24,fonts.bodyText_Gray]}>历史经营业态：</Text>
                                <Text style={[styles.txt,styles.flex1,fonts.bodyText_Black]}>{this.props.dataInfo.manageHistory}</Text>
                          </View>
                          <View style={styles.list}>
                                <Text style={[styles.lineHeight24,fonts.bodyText_Gray]}>商铺介绍：</Text>
                                <Text style={[styles.txt,styles.flex1,fonts.bodyText_Black]}>{this.props.dataInfo.shopIntroduce}</Text>
                          </View>
                    </View>
                    :null
                  }
                  {
                    this.props.dataInfo.demandType == '求购'?
                    <View>
                          <View style={styles.list}>
                                <Text style={[styles.lineHeight24,fonts.bodyText_Gray]}>价格要求：</Text>
                                <Text style={[styles.txt,styles.flex1,fonts.bodyText_Black]}>{this.props.dataInfo.price}</Text>
                          </View>
                          <View style={styles.list}>
                                <Text style={[styles.lineHeight24,fonts.bodyText_Gray]}>物业要求：</Text>
                                <Text style={[styles.txt,styles.flex1,fonts.bodyText_Black]}>{this.props.dataInfo.propertyNeed}</Text>
                          </View>
                          <View style={styles.list}>
                                <Text style={[styles.lineHeight24,fonts.bodyText_Gray]}>开店计划：</Text>
                                <Text style={[styles.txt,styles.flex1,fonts.bodyText_Black]}>{this.props.dataInfo.shopPlan}</Text>
                          </View>
                    </View>
                    :null
                  }
                  {
                    this.props.dataInfo.demandType == '求租'?
                    <View>
                          <View style={styles.list}>
                                <Text style={[styles.lineHeight24,fonts.bodyText_Gray]}>租金要求：</Text>
                                <Text style={[styles.txt,styles.flex1,fonts.bodyText_Black]}>{this.props.dataInfo.price}</Text>
                          </View>
                          <View style={styles.list}>
                                <Text style={[styles.lineHeight24,fonts.bodyText_Gray]}>物业要求：</Text>
                                <Text style={[styles.txt,styles.flex1,fonts.bodyText_Black]}>{this.props.dataInfo.propertyNeed}</Text>
                          </View>
                          <View style={styles.list}>
                                <Text style={[styles.lineHeight24,fonts.bodyText_Gray]}>开店计划：</Text>
                                <Text style={[styles.txt,styles.flex1,fonts.bodyText_Black]}>{this.props.dataInfo.shopPlan}</Text>
                          </View>
                    </View>
                    :null
                  }
                  <View style={styles.remark1}>
                        <Text style={[styles.lineHeight24,fonts.bodyText_Gray]}>需求备注：</Text>
                        <Text style={[styles.lineHeight24,fonts.bodyText_Black,styles.flex1]}>{this.props.dataInfo.remark}</Text>
                  </View>
            </ScrollView>
      </View>
    );
  }
}
AppRegistry.registerComponent('NeedManageDetails', () => NeedManageDetails);
