import React, {Component} from 'react';
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
  Dimensions,
  AppRegistry,
  TouchableHighlight,
  Modal
} from 'react-native';
var moment = require('moment');
import {Actions, ActionConst} from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/appRoot/BrandsList';
import {staticSite} from '../../systemComponents/Remote/ApiStorage';
export default class BrandsListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:this.props.item.id,
      name:this.props.item.name,
      facePic:this.props.item.facePic,
      positioning:this.props.item.positioning,
      brandTypeName:this.props.item.brandType?this.props.item.brandType.name:'暂无',
      area:this.props.item.areaText?this.props.item.areaText:'暂无'
    };
  }
  render() {
    return (
      <View>
        <TouchableHighlight onPress={() => Actions.BrandsDetails({id: this.state.id})} underlayColor="transparent">
          <View style={[styles.viewList]}>
            {this.state.facePic?
              <Image style={[styles.img]} source={{uri: staticSite + this.state.facePic}}/>
              :
              <Image style={[styles.img]} source={require('../../images/brandList.png')}/>
            }
            <View style={[styles.listTxt]}>
                <View >
                <Text style={fonts.t3_Black}>品牌名称：{this.state.name}</Text>
                </View>
                <View style={styles.listText} ellipsizeMode={'clip'}>
                <Text style={fonts.bodyText_Gray} numberOfLines={1}>品牌业态：{this.state.brandTypeName}</Text>
                </View>
                <View style={styles.listText} ellipsizeMode={'clip'}>
                <Text style={fonts.bodyText_Gray} numberOfLines={1}>拓展区域：{this.state.area}</Text>
                </View>
              {this.state.positioning
                ? <View style={styles.txtIcon}>
                    <Text style={fonts.tinyText_Blue}>{this.state.positioning}</Text>
                  </View>
                : null}
            </View>
          </View>
        </TouchableHighlight>
      </View>

    )
  }
}
AppRegistry.registerComponent('BrandsListItem', () => BrandsListItem);
