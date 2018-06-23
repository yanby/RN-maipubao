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
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/community/DemandInput';
import BasicComponent from '../basic/BasicComponent';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { apis,sites } from '../../systemComponents/Remote/ApiStorage';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class DemandInput extends BasicComponent {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      selected:0,
      customer : '' ,
      customerPhone : '' ,
      area : '' ,
      size : '' ,
      remark : '',
      price0 : '',
      price1 : '',
      price2 : '',
      price3 : '',
      propertyNeed0 : '' ,
      propertyNeed1 : '' ,
      shopPlan0 : '' ,
      shopPlan1 : '' ,
      shopIntroduce2 : '' ,
      shopIntroduce3 : '' ,
      manageHistory2 : '' ,
      manageHistory3 : '',
      userId : '',
    };
  }
  componentWillMount(){
    storage.load({key: keys.currentUser}).then(currentUser => {
      if(currentUser){
        console.log(currentUser.id)
         this.setState({userId:currentUser.id});
      }
    }).catch(error=>{})
  }
  _onTabPress(index){
    this.setState({selected:index});
  }

  _submit(){
    this.openLoading('正在保存...');
    if(!this.state.customer){
      this.msgShort('请填写联系人！')
      return
    }
    if (!/(^[1][0-9]{10}$)/.test(this.state.customerPhone)) {
      this.msgShort('联系方式格式错误')
      return
    }

    let demandInfo={
       "customer": this.state.customer,
       "customerPhone": this.state.customerPhone,
       "area": this.state.area,
       "size": this.state.size,
       "remark": this.state.remark,
       "demandType": this.state.demandType,
       "status": '待审核',
       "user": '/users/'+ this.state.userId,
    }

    if(this.state.selected == 0){
      demandInfo.demandType = '求租'
      demandInfo.price = this.state.price0
      demandInfo.propertyNeed = this.state.propertyNeed0
      demandInfo.shopPlan = this.state.shopPlan0
    }else if(this.state.selected == 1){
      demandInfo.demandType = '求购'
      demandInfo.price = this.state.price1
      demandInfo.propertyNeed = this.state.propertyNeed1
      demandInfo.shopPlan = this.state.shopPlan1
    }else if(this.state.selected == 2){
      demandInfo.demandType = '出租'
      demandInfo.price = this.state.price2
      demandInfo.shopIntroduce = this.state.shopIntroduce2
      demandInfo.manageHistory = this.state.manageHistory2
    }else{
      demandInfo.demandType = '出售'
      demandInfo.price = this.state.price3
      demandInfo.shopIntroduce = this.state.shopIntroduce3
      demandInfo.manageHistory = this.state.manageHistory3
    }

    storage.load({
      key: keys.demand,
      syncInBackground: false,
      syncParams: {
         url: apis.demand,
         body:demandInfo
      }
    }).then(ret => {
      if(ret.status == 201){
        this.closeLoading();
        this.msgShort('提交成功，会尽快回复您哦！')
        Actions.reset('Index',{});
      } else {
        this.closeLoading();
        this.msgShort('提交失败,请重新提交')
      }

    }).catch(err => {
      this.closeLoading();
      this.msgShort('提交失败')
    })
    this.closeLoading();

  }

  render() {
    return (
      <View style={[styles.mainList]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <Title isLeftShow={true} backColor={true}  title={'需求录入'}>
        </Title>
        <View style={styles.tabView}>
            <SegmentedControlTab borderRadius={0} tabsContainerStyle={styles.tabsContainerStyle}
                tabStyle={styles.tabStyle} tabTextStyle={[styles.tabTextStyle,fonts.bodyText_Black]}
                activeTabStyle={styles.activeTabStyle} activeTabTextStyle={[fonts.bodyText_Black,styles.activeTabTextStyle]}
                selectedIndex={this.state.selected} values={['求租', '求购','出租','出售']}
                onTabPress= {index => this._onTabPress(index)}/>
        </View>
        <ScrollView ref={(scrollView) => { _scrollView = scrollView; }} automaticallyAdjustContentInsets={false}>
              <View style={[styles.listView]}>
                  <Text style={[fonts.bodyText_Blue]}>*</Text>
                  <Text style={[styles.listViewText,fonts.bodyText_Black]}>联  系 人：</Text>
                  <TextInput
                      style={[styles.listInput,fonts.bodyText_Gray]}
                      underlineColorAndroid="transparent"
                      clearButtonMode="always" returnKeyType='done'
                      onChangeText={(text) => this.setState({customer: text})}/>
              </View>
              <View style={[styles.listView]}>
                  <Text style={[fonts.bodyText_Blue]}>*</Text>
                  <Text style={[styles.listViewText,fonts.bodyText_Black]}>联系方式：</Text>
                  <TextInput
                    style={[styles.listInput,fonts.bodyText_Gray]}
                    underlineColorAndroid="transparent"
                    clearButtonMode="always" returnKeyType='done'
                    onChangeText={(text) => this.setState({customerPhone: text})}
                  />
              </View>
              <View style={[styles.listView]}>
                  <Text style={[styles.listViewText,fonts.bodyText_Black]}>区       位：</Text>
                  <TextInput
                    style={[styles.listInput,fonts.bodyText_Gray]}
                    underlineColorAndroid="transparent"
                    clearButtonMode="always" returnKeyType='done'
                    placeholder="商铺位置 区域-商圈-街道"
                    placeholderTextColor="#ccc"
                    onChangeText={(text) => this.setState({area: text})}
                  />
              </View>
              <View style={[styles.listView]}>
                  <Text style={[styles.listViewText,fonts.bodyText_Black]}>商铺面积：</Text>
                  <TextInput
                    style={[styles.listInput,fonts.bodyText_Gray]}
                    underlineColorAndroid="transparent"
                    clearButtonMode="always" returnKeyType='done'
                    placeholderTextColor="#ccc"
                    onChangeText={(text) => this.setState({size: text})}
                  />
              </View>
              {
                this.state.selected===0?
                <View style={styles.tabListView}>
                   <View style={[styles.listView]}>
                          <Text style={[styles.listViewText,fonts.bodyText_Black]}>租金要求：</Text>
                          <TextInput
                            style={[styles.listInput,fonts.bodyText_Gray]}
                            underlineColorAndroid="transparent"
                            clearButtonMode="always" returnKeyType='done'
                            onChangeText={(text) => this.setState({price0: text})}
                          />
                    </View>
                    <View style={[styles.listView]}>
                          <Text style={[styles.listViewText,fonts.bodyText_Black]}>物业要求：</Text>
                          <TextInput
                            style={[styles.listInput,fonts.bodyText_Gray]}
                            underlineColorAndroid="transparent"
                            clearButtonMode="always" returnKeyType='done'
                            onChangeText={(text) => this.setState({propertyNeed0: text})}
                            onFocus={() => { _scrollView.scrollTo({y: 180}); }}
                          />
                    </View>
                    <View style={[styles.listView]}>
                          <Text style={[styles.listViewText,fonts.bodyText_Black]}>开店计划：</Text>
                          <TextInput
                            style={[styles.listInput,fonts.bodyText_Gray]}
                            underlineColorAndroid="transparent"
                            clearButtonMode="always" returnKeyType='done'
                            onChangeText={(text) => this.setState({shopPlan0: text})}
                            onFocus={() => { _scrollView.scrollTo({y: 180}); }}
                          />
                    </View>
                </View>
              :null}
              {
                this.state.selected===1?
                <View style={styles.tabListView}>
                    <View style={[styles.listView]}>
                         <Text style={[styles.listViewText,fonts.bodyText_Black]}>价格要求：</Text>
                         <TextInput
                           style={[styles.listInput,fonts.bodyText_Gray]}
                           underlineColorAndroid="transparent"
                           clearButtonMode="always" returnKeyType='done'
                           onChangeText={(text) => this.setState({price1: text})}
                         />
                   </View>
                   <View style={[styles.listView]}>
                         <Text style={[styles.listViewText,fonts.bodyText_Black]}>物业要求：</Text>
                         <TextInput
                           style={[styles.listInput,fonts.bodyText_Gray]}
                           underlineColorAndroid="transparent"
                           clearButtonMode="always" returnKeyType='done'
                           onChangeText={(text) => this.setState({propertyNeed1: text})}
                           onFocus={() => { _scrollView.scrollTo({y: 180}); }}
                         />
                   </View>
                   <View style={[styles.listView]}>
                         <Text style={[styles.listViewText,fonts.bodyText_Black]}>开店计划：</Text>
                         <TextInput
                           style={[styles.listInput,fonts.bodyText_Gray]}
                           underlineColorAndroid="transparent"
                           clearButtonMode="always" returnKeyType='done'
                           onChangeText={(text) => this.setState({shopPlan1: text})}
                           onFocus={() => { _scrollView.scrollTo({y: 180}); }}
                           />
                  </View>
                </View>
              :null}
              {
                this.state.selected===2?
                <View style={styles.tabListView}>
                <View style={[styles.listView]}>
                    <Text style={[styles.listViewText,fonts.bodyText_Black]}>租金要求：</Text>
                        <TextInput
                          style={[styles.listInput,fonts.bodyText_Gray]}
                          underlineColorAndroid="transparent"
                          clearButtonMode="always" returnKeyType='done'
                          onChangeText={(text) => this.setState({price2: text})}
                        />
                  </View>
                  <View style={[styles.listView]}>
                        <Text style={[styles.listViewText,fonts.bodyText_Black]}>历史经营业态：</Text>
                        <TextInput
                          style={[styles.listInput,fonts.bodyText_Gray]}
                          underlineColorAndroid="transparent"
                          clearButtonMode="always" returnKeyType='done'
                          onChangeText={(text) => this.setState({manageHistory2: text})}
                          onFocus={() => { _scrollView.scrollTo({y: 180}); }}
                        />
                  </View>
                  <View style={[styles.listView]}>
                        <Text style={[styles.listViewText,fonts.bodyText_Black]}>商铺介绍：</Text>
                        <TextInput
                          style={[styles.listInput,fonts.bodyText_Gray]}
                          underlineColorAndroid="transparent"
                          clearButtonMode="always" returnKeyType='done'
                          placeholder="介绍更多商铺信息，让大家更了解它"
                          placeholderTextColor="#ccc"
                          onChangeText={(text) => this.setState({shopIntroduce2: text})}
                          onFocus={() => { _scrollView.scrollTo({y: 180}); }}
                        />
                  </View>
                </View>
              :null}
              {
                this.state.selected===3?
                <View style={styles.tabListView}>
                <View style={[styles.listView]}>
                  <Text style={[styles.listViewText,fonts.bodyText_Black]}>价格要求：</Text>
                        <TextInput
                          style={[styles.listInput,fonts.bodyText_Gray]}
                          underlineColorAndroid="transparent"
                          clearButtonMode="always" returnKeyType='done'
                          onChangeText={(text) => this.setState({price3: text})}
                        />
                  </View>
                  <View style={[styles.listView]}>
                        <Text style={[styles.listViewText,fonts.bodyText_Black]}>历史经营业态：</Text>
                        <TextInput
                          style={[styles.listInput,fonts.bodyText_Gray]}
                          underlineColorAndroid="transparent"
                          clearButtonMode="always" returnKeyType='done'
                          onChangeText={(text) => this.setState({manageHistory3: text})}
                          onFocus={() => { _scrollView.scrollTo({y: 180}); }}
                        />
                  </View>
                  <View style={[styles.listView]}>
                        <Text style={[styles.listViewText,fonts.bodyText_Black]}>商铺介绍：</Text>
                        <TextInput
                          style={[styles.listInput,fonts.bodyText_Gray]}
                          underlineColorAndroid="transparent"
                          clearButtonMode="always" returnKeyType='done'
                          placeholder="介绍更多商铺信息，让大家更了解它"
                          placeholderTextColor="#ccc"
                          onChangeText={(text) => this.setState({shopIntroduce3: text})}
                          onFocus={() => { _scrollView.scrollTo({y: 180}); }}
                        />
                  </View>
                </View>
              :null}
              <View style={[styles.listView,styles.listViewRest]}>
                <View style={[styles.listViewText,styles.listViewTextRest]}><Text style={[fonts.bodyText_Black]}>需求备注：</Text></View>
                <TextInput
                  style={[styles.listInput,fonts.bodyText_Gray,styles.moreInput]}
                  underlineColorAndroid="transparent"
                  clearButtonMode="always" returnKeyType='done'
                  placeholder="写下您想要商铺更多信息，获得更精准的推荐"
                  placeholderTextColor="#ccc"
                  onChangeText={(text) => this.setState({remark: text})}
                  onFocus={() => { _scrollView.scrollTo({y: 300}); }}
                  multiline={true} blurOnSubmit={true}
                />
              </View>
              <View style={[styles.viewBtnB]}>
                    <Text style={[styles.text,fonts.bodyText_Blue]}>为了更好的为您卖铺请完善以上信息</Text>
                    <View>
                        <TouchableHighlight style={[styles.listBtn]} underlayColor="#3a8ff3" onPress={() => {this._submit()}}>
                              <Text style={[fonts.btnText_white]}>提交</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={[styles.listNoBtn]} onPress={()=>Actions.pop({Index:''})}>
                              <Text style={[fonts.btnText_Gray]}>取消</Text>
                        </TouchableHighlight>
                    </View>
              </View>
        </ScrollView>


          {
            this.renderModal()
          }
          {
            this.renderLoading()
          }
      </View>
    );
  }
}
AppRegistry.registerComponent('DemandInput', () => DemandInput);
