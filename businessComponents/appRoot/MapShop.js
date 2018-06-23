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
  Linking,
  WebView
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import { fonts } from '../../styles/commonStyle/Font';
import { styles } from '../../styles/tourists/ReportManagement';
import { DropDownMenu } from '../../commonComponents/menu/DropDownMenu';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { keys } from '../../systemComponents/SyncStorage/StorageKeys';
import { h5Sites } from '../../systemComponents/Remote/ApiStorage';
import BasicComponent from '../basic/BasicComponent';
var currentUser = null
var that = null
export default class Mapshop  extends BasicComponent {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      baseUrl: null,
      url: null,
      selected: 0,
      keywords: '',
      user:null,
      site:'',
      searchText:'请输入项目名称'
    };
    that = this
  }

  componentWillMount() {
    storage.load({key: keys.currentRemoteSite }).then(ret => {
      let site = h5Sites[ret]
      this.setState({
        site:site,
        baseUrl: site + '/bMap/shop',
        url: site + '/bMap/shop'
      })
    })

    storage.load({
      key:keys.currentUser
    }).then(user=>{
      if (!user) {
        currentUser=null
      }else {
        currentUser=user
      }
    }).catch(error=>{
      currentUser=null
    })
  }

  _onTabPress(index){
    if (index === 0) {
      currIndex = 0,
      this.setState({
        selected: 0,
        baseUrl:this.state.site + '/bMap/shop',
        url:this.state.site + '/bMap/shop'
      })
    } else {
      currIndex = 1,
      this.setState({
        selected: 1,
        baseUrl: this.state.site + '/bMap/project',
        url: this.state.site + '/bMap/project'
      })
    }
  }

  _onMessage(event){
    if (currentUser) {
        if(that.state.selected == 1){
          Actions.ProjectDetails({id: event.nativeEvent.data, source: 'Mapshop'})
        }else{
          var data = JSON.parse(event.nativeEvent.data);
          console.log(data.flag)
          if(data.flag == 0){
            Linking.openURL('tel:' + data.param)
          }else{
            Actions.ShopDetails({id: data.param, source: 'Mapshop'})
          }

        }

    }else {
      Actions.reset('Login',{sourceFlag:'MapShow'})
    }

  }

  _onSubmitEditing(){
    this.setState({
      url: this.state.baseUrl + '?keywords=' + this.state.keywords
    });
    this.closeModal()
  }

  searchContent(){
    if(this.state.selected == 1){
      this.setState({
        keywords: '',
        searchText:'请输入项目名称'
      })
    }else{
      this.setState({
        keywords: '',
        searchText:'请输入商铺名称'
      })
    }

    this.content(
      {
        isWholeCustom:true,
        customText:()=>{
          return (<View style={[styles.modalMask]}>
                <View style={styles.centerView}>
                      <View style={styles.searchTop}>
                            <View style={styles.searchInput}>
                                  <Image  source={require('../../images/search.png')}/>
                                  <TextInput style={[fonts.bodyText_Black,styles.searchIputRest]} autoFocus={true}
                                    underlineColorAndroid="transparent"
                                    placeholder={this.state.searchText} clearButtonMode="always" returnKeyType='send'
                                    onEndEditing={()=>this._onPressSearch()} onSubmitEditing={()=>this._onSubmitEditing()}
                                    placeholderTextColor="#898989"
                                    onChangeText={(text) => this.setState({keywords: text})}/>
                            </View>
                            <TouchableHighlight style={styles.cancelBtn} underlayColor="transparent" onPress={()=>{this.closeModal()}}>
                                <Text style={[fonts.bodyText_Black]}>取消</Text>
                            </TouchableHighlight>
                      </View>
                </View>
          </View>);
        }
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>

        <View style={styles.tabViewRest}>
              <SegmentedControlTab borderRadius={0} tabsContainerStyle={styles.tabsContainerStyle}
              tabStyle={styles.tabStyle} tabTextStyle={[styles.tabTextStyle,fonts.bodyText_Black]}
              activeTabStyle={styles.activeTabStyle} activeTabTextStyle={[fonts.bodyText_Black,styles.activeTabTextStyle]}
              selectedIndex={this.state.selected} values={[ '项目']}
              onTabPress= {index => this._onTabPress(index)} />
              <TouchableHighlight style={styles.backView} underlayColor="transparent" onPress={()=>Actions.pop({})}>
                <Image  source={require('../../images/back.png')}/>
              </TouchableHighlight>
              <TouchableHighlight style={styles.searchView} underlayColor="transparent" onPress={()=>{this.searchContent()}}>
                   <Image  source={require('../../images/search.png')}/>
              </TouchableHighlight>
        </View>
        {
          (this.state.selected === 1 && this.state.url) ?
          <WebView
          source={{uri: this.state.url}}
          automaticallyAdjustContentInsets={false}
          startInLoadingState={true}
          domStorageEnabled={true}
          javaScriptEnabled={true}
          scalesPageToFit={true}
          scrollEnable={false}
          style={styles.webView}
          onMessage={this._onMessage}/>
          :null
        }
        {
          (this.state.selected === 0  && this.state.url) ?
          <WebView
          source={{uri: this.state.url}}
          automaticallyAdjustContentInsets={false}
          startInLoadingState={true}
          domStorageEnabled={true}
          javaScriptEnabled={true}
          scalesPageToFit={true}
          scrollEnable={false}
          style={styles.webView}
          onMessage={this._onMessage}/>
          :null
        }
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
AppRegistry.registerComponent('Mapshop', () => Mapshop);
