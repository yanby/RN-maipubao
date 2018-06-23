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
import {styles} from '../../styles/community/BrandDetails';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { apis,sites,staticSite } from '../../systemComponents/Remote/ApiStorage';
import ListBasicComponent from '../basic/ListBasicComponent';
import { NiceList } from '../../commonComponents/niceList/NiceList';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class CompanyDetails extends Component {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      detailsInfo:{},
    };
  }
  componentWillMount(){
    //显示新闻详情
    storage.load({
      key: keys.companiesK,
      syncInBackground: false,
      syncParams: {
	       url: apis.companiesK+ '/' +this.props.detailsId
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json();
      }else{
        this.msgShort(ret.msg);
      };
    }).then(retJson=>{
      let detailsInfo = this.state.detailsInfo;
      this.setState({detailsInfo:retJson})
    }).catch(err => {
      this.msg("显示异常");
      this.closeLoading();
    })
  }
  render() {
    return (
      <View style={[styles.mainView]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <Title isLeftShow={true} backColor={true}  title={'公司详情'} >
        </Title>
        <ScrollView>
        <View style={[styles.imgView]}>
          <Image style={[styles.img]} source={{uri: staticSite + this.state.detailsInfo.coverUrl}}></Image>
        </View>
          <View style={[styles.textView]}>
            <Text style={[styles.lineHeight24,fonts.bodyText_Blue]}>公司信息</Text>
            <Text style={[styles.lineHeight24,fonts.bodyText_Black]}>公司名称：{this.state.detailsInfo.name}</Text>
            <Text style={[styles.lineHeight24,fonts.bodyText_Black]}>公司规模：{this.state.detailsInfo.scale}</Text>
            <Text style={[styles.lineHeight24,fonts.bodyText_Black]}>公司地址：{this.state.detailsInfo.address}</Text>
          </View>
          <View style={[styles.textView]}>
            <Text style={[styles.lineHeight24,fonts.bodyText_Blue]}>公司简介</Text>
            <Text style={[styles.lineHeight24,fonts.bodyText_Black]}>{this.state.detailsInfo.synopsis}</Text>
          </View>
        </ScrollView>

      </View>
    );
  }
}
AppRegistry.registerComponent('brandDetails', () => brandDetails);
