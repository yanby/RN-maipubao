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
  ScrollView
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/personalCenter/Balance';
import BasicComponent from '../basic/BasicComponent';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { apis,sites } from '../../systemComponents/Remote/ApiStorage';
export default class Balance extends BasicComponent {
  constructor(props){
     super(props);
     this.state={
      modalObject:{},
      loadingObject:{},
      balance:0.00,
      bankCount:0
     }
   }

   _loadData(){
     storage.load({key: keys.currentUser}).then(currentUser => {
       this.openLoading();
       storage.load({
         key: keys.getBalance,
         syncInBackground: false,
         syncParams: {
   	       url: apis.getBalance +'?userId=' + currentUser.id
         }
       }).then(ret => {
         if(ret.status == 200){
           return ret.json();
         }else{
           Actions.Login({})
           this.closeLoading()
         };
       }).then(retJson=>{
         this.setState({balance:retJson.toFixed(2)});
         this.closeLoading()
       })

       storage.load({
        key: keys.countUserBank,
        syncInBackground: false,
        syncParams: {
          url: apis.countUserBank +'?userId=' + currentUser.id
        }
      }).then(ret => {
        if(ret.status == 200){
          return ret.json();
        }else{
          Actions.Login({})
        };
      }).then(retJson=>{
        this.setState({bankCount:retJson});
      })
     })
   }

   componentWillReceiveProps(nextProps){
     this._loadData();
   }

   componentWillMount(){
     this._loadData();
   }

  render() {
    return (
      <View style={styles.main}>
            <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true}/>
            <Image style={[styles.imgBg]} source={require('../../images/balanceBg.png')}>
                  <View style={[styles.nav]}>
                        <TouchableHighlight style={[styles.backIcon]} underlayColor="transparent" onPress={()=>Actions.pop({})}>
                              <Image source={require('../../images/backWhite.png')}></Image>
                        </TouchableHighlight>
                        <View style={[styles.navTitle]}>
                              <Text style={[fonts.t2_white]}>账户余额</Text>
                        </View>
                        <TouchableHighlight style={[styles.navLeft]} underlayColor="transparent" onPress={()=>Actions.FundDetailsList({})}>
                              <Text style={fonts.bodyText_white}>资金明细</Text>
                        </TouchableHighlight>
                  </View>
                  <View style={[styles.text]}>
                        <Text style={[fonts.t2_white]}>余额</Text>
                        <View style={[styles.row,styles.marginTop15]}>
                              <Text style={[fonts.bigText_white,styles.flex]}>¥ {this.state.balance}</Text>
                        </View>
                  </View>
            </Image>
            {
              this.state.bankCount > 0 ?
            <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.ApplyWithdraw({})}>
                  <View style={[styles.listBtn,styles.row]}>
                        <Text style={[fonts.bodyText_Black,styles.flex]}>申请提现</Text>
                        <Image source={require('../../images/more.png')}></Image>
                  </View>
            </TouchableHighlight>
            :null
           }
            <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.ManageCardList({})}>
                  <View style={[styles.listBtn,styles.row]}>
                        <Text style={[fonts.bodyText_Black,styles.flex]}>管理银行卡</Text>
                        <Image source={require('../../images/more.png')}></Image>
                  </View>
            </TouchableHighlight>
      </View>
    );
  }
}
AppRegistry.registerComponent('Balance', () => Balance);
