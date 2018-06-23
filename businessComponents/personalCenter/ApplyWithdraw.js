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
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/personalCenter/ApplyWithdraw';
import { Actions,ActionConst } from 'react-native-router-flux';
import BasicComponent from '../basic/BasicComponent';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { apis,sites } from '../../systemComponents/Remote/ApiStorage';
import CheckBox from 'react-native-check-box';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class ApplyWithdraw extends BasicComponent {
  constructor(props){
     super(props);
     this.state={
      modalObject:{},
      loadingObject:{},
      balance:0,
      bankAccountShort:'',
      openBank:'',
      amount:'',
      expressName:'',
      expressNo:'',
      invoice:false,
      userId:'',
      bankId:'',
      tcpName:'收入及提现规则',
     }
   }

   _loadData(){
      storage.load({key: keys.currentUser}).then(currentUser => {
       this.setState({userId:currentUser.id})
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
           return Promise.reject();
         };
       }).then(retJson=>{
         this.setState({balance:retJson});
       }).catch(err=>{
         Actions.reset('Login');
       })

       storage.load({
         key: keys.getOneUserBank,
         syncInBackground: false,
         syncParams: {
   	       url: apis.getOneUserBank +'?userId=' + currentUser.id
         }
       }).then(ret => {
         if(ret.status == 200){
           return ret.json();
         }else{
           return Promise.reject();
         };
       }).then(retJson=>{
         this.setState({
           bankAccountShort:retJson.bankAccountShort,
           openBank:retJson.openBank,
           bankId:retJson.id
         });
       }).catch(err=>{
         Actions.reset('Login');
       })
     }).catch(error=>{})
   }
   _drawAll(){
     this.setState({amount:this.state.balance+''});
   }
   _submit(){
     let userId = this.state.userId
     let bankId = this.state.bankId
     let amount = this.state.amount
     let invoice = this.state.invoice
     let expressName = ''
     let expressNo = ''

      if(amount < 100) {
        this.msgShort('亲，最少提现100元哦')
        return
      }
      if(amount > this.state.balance){
        this.msgShort('余额不足')
        return
      }

     if(invoice){
       expressName = this.state.expressName
       expressNo = this.state.expressNo
       if(!expressName){
         this.msgShort('请输入您邮寄的快递公司')
         return
       }
       if(!expressNo){
         this.msgShort('请输入您邮寄的快递单号')
         return
       }
     }

     this.openLoading('正在提现...');

     storage.load({
       key: keys.cashApply,
       syncInBackground: false,
       syncParams: {
          url: apis.cashApply + '?userId=' + userId + '&bankId=' + bankId + '&amount=' + amount + '&invoice=' + invoice
          + '&expressNo=' + expressNo + '&expressName=' + expressName
       }
     }).then(ret => {
       return ret.json()
     }).then(res => {
       this.closeLoading()
       if(res){
         this.msgShort('提现申请已提交，请耐心等待',()=>{
           Actions.pop({refresh:{random:Math.random()}})
         })
       } else {
         this.msgShort('提现异常')
         this.closeLoading()
       }
     }).catch(err => {
       this.msgShort('提现异常')
       this.closeLoading()
     })

   }
   componentWillReceiveProps(nextProps){
     this._loadData();
   }
    componentWillMount(){
      this._loadData();
   }
   renderSatus(item,i){
     let checkStatus = this.state.checked;
     return <CheckBox
       style={styles.checkBoxView}
       onClick={()=>this._onChange()}
       isChecked={checkStatus}
       checkedImage={<Image style={{marginTop:4}} source={require('../../images/checked.png')} />}
       unCheckedImage={<Image style={{marginTop:4}} source={require('../../images/noCheck.png')} />}
       />
       ;
   }
   _onChange(){
    if(this.state.checked){
      this.setState({
        checked:false,
        invoice:false,
        expressName:'',
        expressNo:'',
      });
    }else{
      this.setState({
        checked:true,
        invoice:true
      });
    }
   }
  render() {
    return (
      <View style={styles.main}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <Title isLeftShow={true} backColor={true} isRightBtnShow={false} title={'申请提现'}/>
        <ScrollView ref={(scrollView) => { _scrollView = scrollView; }} automaticallyAdjustContentInsets={false}>
            <TouchableHighlight>
                  <View style={[styles.view,styles.row,styles.paddingTop15,styles.paddingBottom15]}>
                        <Text style={[fonts.bodyText_Black,styles.marginRight25]}>到账银行卡</Text>
                        <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.DefaultCardList({})}>
                        <View>
                              <Text style={[fonts.bodyText_Blue]}>{this.state.openBank}</Text>
                              <Text style={[fonts.bodyText_Gray,styles.marginTop10]}>尾号{this.state.bankAccountShort}的银行卡</Text>
                        </View>
                        </TouchableHighlight>
                  </View>
            </TouchableHighlight>
            <View style={[styles.view,styles.marginTop10,styles.paddingTop15,styles.paddingBottom15]}>
                  <Text style={[fonts.bodyText_Black]}>提现金额</Text>
                  <View style={[styles.row,styles.viewInput]}>
                        <View style={[styles.borderBottom,styles.row,styles.flex]}>
                              <Text style={[fonts.t1_Black,styles.marginRight10,styles.paddingTop15]}>¥</Text>
                              <TextInput
                                style={[fonts.bodyText_Black,styles.textInput]}
                                underlineColorAndroid="transparent"
                                clearButtonMode="always" returnKeyType='done'
                                value={this.state.amount}
                                onChangeText={(text) => this.setState({amount: text})}
                              />
                        </View>
                        <Text style={[fonts.bodyText_Blue,styles.lineHeight49]}>（预计税点？）</Text>
                  </View>
            </View>
            <View style={[styles.view,styles.row,styles.paddingBottom15]}>
                  <Text style={[fonts.bodyText_Gray]}>零钱余额¥ {this.state.balance}，</Text>
                  <Text style={[fonts.bodyText_Blue]} onPress={() => this._drawAll()}>全部提现</Text>
            </View>
            <View style={[styles.view,styles.row,styles.paddingBottom15]}>
                  <View>{this.renderSatus()}</View>
                  <Text style={[fonts.bodyText_Black,styles.lineHeight20]}>提供发票</Text>
            </View>

            {
              this.state.checked?
              <View style={[styles.view,styles.paddingBottom15]}>
                    <Text style={[fonts.bodyText_Black,styles.lineHeight22]}>邮寄地址：北京朝阳区东三环中路39号建外soho15号楼 2203室</Text>
                    <Text style={[fonts.bodyText_Black,styles.lineHeight22]}>收件人：张亚娟</Text>
                    <Text style={[fonts.bodyText_Black,styles.lineHeight22]}>手机号：18500031308</Text>
                    <View style={[styles.row,styles.marginTop10]}>
                          <Text style={[fonts.bodyText_Blue]}>*</Text>
                          <Text style={[fonts.bodyText_Black]}>请输入快递公司：</Text>
                          <View style={[styles.borderBottom,styles.flex]}>
                                <TextInput
                                  style={[fonts.bodyText_Black,styles.textInput1]}
                                  underlineColorAndroid="transparent"
                                  clearButtonMode="always" returnKeyType='done'
                                  value={this.state.expressName}
                                  editable={this.state.invoice}
                                  onChangeText={(text) => this.setState({expressName: text})}
                                  onFocus={() => { _scrollView.scrollTo({y: 200}); }}
                                />
                          </View>
                    </View>
                    <View style={[styles.row,styles.marginTop10]}>
                          <Text style={[fonts.bodyText_Blue]}>*</Text>
                          <Text style={[fonts.bodyText_Black]}>请输入您邮寄的快递单号：</Text>
                          <View style={[styles.borderBottom,styles.flex]}>
                                <TextInput
                                  style={[fonts.bodyText_Black,styles.textInput1]}
                                  underlineColorAndroid="transparent"
                                  clearButtonMode="always" returnKeyType='done'
                                  value={this.state.expressNo}
                                  editable={this.state.invoice}
                                  onChangeText={(text) => this.setState({expressNo: text})}
                                  onFocus={() => { _scrollView.scrollTo({y: 200}); }}
                                />
                          </View>
                   </View>
            </View>
                :null
            }



            <View style={[styles.view,styles.paddingBottom15]}>
                  <Text style={[fonts.bodyText_Gray,styles.lineHeight22]}>提现申请说明：提现到账周期以相应银行标准！</Text>
                  <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.Protocol({protocolName:this.state.tcpName})}>
                      <Text style={[fonts.bodyText_Blue,styles.lineHeight22,styles.paddingTop15]}>收入结算及提现规则?</Text>
                  </TouchableHighlight>
            </View>
            <TouchableHighlight style={[styles.listBtn,styles.marginTop10]} onPress={() => this._submit()}>
                  <Text style={[fonts.btnText_white]}>提现</Text>
            </TouchableHighlight>
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
AppRegistry.registerComponent('ApplyWithdraw', () => ApplyWithdraw);
