import React, {Component} from 'react';
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
 ScrollView
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/appRoot/BrandsList';
import BrandsListItem from './BrandsListItem';
import ListBasicComponent from '../basic/ListBasicComponent';
import {NiceList} from '../../commonComponents/niceList/NiceList';

import {apis} from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import {Title} from '../../commonComponents/CommentTitle/Title';
import { DropDownMenu } from '../../commonComponents/menu/DropDownMenu';
import lodash from 'lodash'
export default class BrandsList extends ListBasicComponent {
 constructor(props) {
   super(props);
   this.state = {
     modalObject: {},
     loadingObject: {},
     baseUrl:apis.brandList,
     remoteUrl: apis.brandList,
     storkey: keys.brandList,
     params: [['shopArea', null], ['userBrandAreaId', null], ['brandTypeId', null]],
     keywords: '',
     menuData: null,
     menuDataValue: null,
   };
 }

 componentWillMount(){
   this._initMenuData();
 }

//查询品牌筛选条件
 _initMenuData(){
   storage.load({
     key: keys.brandListConditions,
     syncInBackground: true,
     syncParams: {
        url: apis.brandListConditions
     }
   }).then(ret => {
     if (ret.json) {
       return ret.json()
     }
     return ret
   }).then(kv => {
     this.setState({
       menuData: kv[0],
       menuDataValue: kv[1]
     })
   })
 }

//根据条件筛选列表
 _menuChange(selection,row, index){
   let paramsString = '';
   let params= this.state.params;
   params[index][1] = this.state.menuDataValue[selection][row];
   params.forEach(param => {
     if(param[1] != null) {
       if(paramsString){
         paramsString = paramsString+ '&' + param[0] + '=' + param[1];
       }else{
         paramsString = '?' + param[0] + '=' + param[1];
       }
     }
   })
   this.setState({
     params: params,
     remoteUrl: this.state.baseUrl + paramsString
   });
 }

 // 搜索弹框
 searchContent() {
   this.content({
     isWholeCustom: true,
     customText: () => {
       return (
         <View style={[styles.modalMask]}>
           <View style={styles.centerView}>
             <View style={styles.searchTop}>
               <View style={styles.searchInput}>
                 <Image source={require('../../images/search.png')}/>
                 <TextInput
                   style={[styles.searchIputRest, fonts.bodyText_Black]}
                   autoFocus={true}
                   underlineColorAndroid="transparent"
                   placeholder="请输入品牌名称"
                   clearButtonMode="always"
                   returnKeyType='send'
                   onEndEditing={() => this._onPressSearch()}
                   onSubmitEditing={() => this._onSubmitEditing()}
                   placeholderTextColor="#898989"
                   onChangeText={(text) => this.setState({keywords: text})}/>
               </View>
               <TouchableHighlight
                 style={styles.cancelBtn}
                 underlayColor="transparent"
                 onPress={() => {
                 this.closeModal()
               }}>
                 <Text style={[fonts.bodyText_Black]}>取消</Text>
               </TouchableHighlight>
             </View>
           </View>
         </View>
       );
     }
   })
 }

 // 此回调函数当软键盘的确定/提交按钮被按下的时候调用此函数
 _onSubmitEditing() {
   this.setState({
     remoteUrl: apis.brandList + '?name=' + this.state.keywords
   });
   this.closeModal()
 }

 render() {
   return (
     <View style={styles.mainView}>
       <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
       <Title isLeftShow={true} backColor={true} isRightSearchShow={true} rightChoose={true} title={'品牌列表'}  onClick={() => {this.searchContent()}} >
       </Title>
       {this.state.menuData && this.state.menuData.length > 0 ?
       <View style={styles.dropdownView}>
             <DropDownMenu style={styles.downView} showMoreBtn={false} doubleList={[1,2]}
                           arrowImg={require('../../images/select.png')}      //set the arrow icon, default is a triangle
                           checkImage={require('../../images/tab.png')}    //set the icon of the selected item, default is a check mark
                           bgColor={"#fff"}                            //the background color of the head, default is grey
                           tintColor={"#333"}                        //the text color of the head, default is white
                           selectItemColor={"#3a8ff3"}                    //the text color of the selected item, default is red
                           data={this.state.menuData}
                           maxHeight={410}                            // the max height of the menu
                           handler={(selection, row, index) => this._menuChange(selection,row, index)} >
                           <NiceList isNeedLoading={true}
                            renderItem={(rowData)=><BrandsListItem {...rowData} />}
                            contentContainerStyle={styles.list}
                            remoteUrl={this.state.remoteUrl}
                            storkey={this.state.storkey}
                            noDataFun={()=>{return <View style={styles.noCustomView}>
                              <Image style={styles.noCustom} source={require('../../images/noCustom.png')}/>
                              <Text style={fonts.btnText_Gray}>您搜索的品牌不存在，试试搜索其他的内容</Text>
                            </View>}}
                             />
             </DropDownMenu>
       </View>
       :null}

       {this.renderModal()}
       {this.renderLoading()}

     </View>
   );
 }
}
AppRegistry.registerComponent('BrandsList', () => BrandsList);
