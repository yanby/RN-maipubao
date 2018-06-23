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
  Modal
} from 'react-native';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/personalCenter/AboutUs';
import {currentVersionName} from '../../systemComponents/Remote/ApiStorage';
import {Title} from '../../commonComponents/CommentTitle/Title';

export default class AboutUs extends Component {
  render() {
    return (
      <View style={styles.mainAbout}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
            <Title isLeftShow={true} backColor={true} isRightBtnShow={false} title={'关于我们'}/>
            <View style={[styles.viewCenter,styles.marginTop40]}>
                  <Image source={require('../../images/you-pu100.png')}/>
            </View>
            <View style={[styles.viewCenter,styles.marginTop40]}>
                  <Text style={[fonts.t2_Black]}>卖铺招商找优铺</Text>
                  <Text style={[fonts.bodyText_Gray1]}>版本号{currentVersionName}</Text>
            </View>
            <View style={[styles.viewText,styles.marginTop30,styles.paddingBottom100,styles.marginBottom100]}>
                  <Text style={[styles.viewTextLeft,fonts.bodyText_Black]}>
                      优铺总部位于北京，公司定位于中国首席商铺租售O2O平台。优铺旗下卖铺宝APP，面向全国二三四线城市，招募100家城市合伙人加盟。加盟支持如下：
                  </Text>
                  <Text style={[styles.viewTextLeft,fonts.bodyText_Black]}>
                      1、优铺品牌输出；
                  </Text>
                  <Text style={[styles.viewTextLeft,fonts.bodyText_Black]}>
                      2、技术输出(开通当地优铺app和官网)；
                  </Text>
                  <Text style={[styles.viewTextLeft,fonts.bodyText_Black]}>
                      3、有效整合当地营销渠道(代理公司、渠道公司、独立经纪人、品牌)；
                  </Text>
                  <Text style={[styles.viewTextLeft,fonts.bodyText_Black]}>
                      4、提供万家全国连锁商业品牌库；
                  </Text>
                  <Text style={[styles.viewTextLeft,fonts.bodyText_Black]}>
                      5、参加优铺商学院活动。
                  </Text>

                  <Text style={[styles.viewTextCenter,fonts.bodyText_Black]}>
                      联系人：姜女士
                  </Text>
                  <Text style={[styles.viewTextCenter,fonts.bodyText_Black]}>
                      电话：13601198967
                  </Text>
            </View>
            <View style={[styles.viewCenter,styles.positionBottom0]}>
                  <Image style={styles.viewCenter} source={require('../../images/aboutBg.png')}>
                         <View style={styles.positionBottom10}>
                               <Text style={{fontWeight:"600",marginBottom:10}}>官方网址：youpu100.cn</Text>
                               <Text style={{fontWeight:"600"}}>客服电话：4008988808</Text>
                         </View>
                  </Image>
            </View>
      </View>
    );
  }
}
AppRegistry.registerComponent('AboutUs', () => AboutUs);
