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
  ListView,
  ScrollView
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/community/PostsDetailsList';
import PostsDetailsListItem from './PostsDetailsListItem';
export default class PostsDetailsList extends Component {
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
      <View style={styles.container}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
            <ScrollView ref={(scrollView) => { _scrollView = scrollView; }} automaticallyAdjustContentInsets={false}>
                  <View  style={styles.containerView}>
                        <View style={[styles.titleView]}>
                              <Text style={[styles.titleViewText,fonts.t2_Black]}>求合租求合租求合租求合租</Text>
                        </View>
                        <View style={[styles.imgView]}>
                              <Image style={[styles.img]} source={require('../../images/img1.png')}></Image>
                              <Text style={[styles.imgViewText,fonts.bodyText_Black]}>求合租求合租求合租求合租</Text>
                        </View>
                        <View style={[styles.authorTime]}>
                              <Image source={require('../../images/look-icon.png')}></Image>
                              <Text style={[styles.marginLeft5,fonts.bodyText_Gray]}>8.1万</Text>
                              <Image style={[styles.marginLeft10]} source={require('../../images/message.png')}></Image>
                              <Text style={[styles.marginLeft5,styles.viewFlex,fonts.bodyText_Gray]}>8.1万</Text>
                              <Text style={[fonts.bodyText_Gray]}>2017-2-2</Text>
                        </View>
                        <View style={[styles.message]}>
                              <Text style={[styles.messageText,fonts.bodyText_Gray]}>所有留言</Text>
                        </View>
                        <ListView contentContainerStyle={styles.list}
                                  dataSource={this.state.dataSource}
                                  enableEmptySections={true}
                                  renderRow={(data) => <PostsDetailsListItem {...data} />}
                                  renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}/>
                  </View>
                  <View style={[styles.inputView]}>
                        <View style={[styles.input]}>
                              <Image style={[styles.inputImg]} source={require('../../images/input-pen.png')}></Image>
                              <TextInput
                                style={[styles.viewFlex]}
                                underlineColorAndroid="transparent"
                                clearButtonMode="always" returnKeyType='done'
                                placeholderTextColor="#fff"
                                onFocus={() => { _scrollView.scrollTo({y: 300}); }}
                              />
                        </View>
                  </View>
            </ScrollView>

      </View>
    );
  }
}
AppRegistry.registerComponent('PostsDetailsList', () => PostsDetailsList);
