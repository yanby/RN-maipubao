import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableHighlight,
  Image,Dimensions
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';

import {styles} from '../../commonComponents/modal/modalStyle';
import {fonts} from '../../styles/commonStyle/Font';
import { ModalIndex } from '../../commonComponents/modal/ModalIndex';
import { Loading } from '../../commonComponents/loading/Loading';
import { imageHelper } from '../../commonComponents/imagePicker/ImagePickerHelper'
import { shareHelper } from '../../commonComponents/wechat/WechatShare'
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import {apis,sites} from '../../systemComponents/Remote/ApiStorage';
import {cityData} from '../data/CityData';




export default class BasicComponent extends Component {
  constructor(props){
    super(props);
    this.state={
     modalObject:{},
     loadingObject:{},

    }
  }
  checkIsLogin(sourceFlag){
    return storage.load({
      key:keys.currentUser
    }).then(user=>{
      if (!user) {
        Actions.reset('Login',{sourceFlag:sourceFlag})
        return false;
      }else {
        return true;
      }
    }).catch(error=>{
      Actions.reset('Login',{sourceFlag:sourceFlag})
      return false;
    })
  }

  //分享到微信朋友圈
  //data：要分享的数据，具体参数请查看commonComponents/wechat/wechatShare
  //callbackSuccess 如果分享成功，则回调此函数，并且把结果以参数传入
  //callbackFaild 如果分享失败，则回调此函数，并且把结果以参数传入
  shareToTimeline(data,callbackSuccess,callbackFaild){
    try {
      shareHelper.checkIsInstallWechat().then(inInstall=>{
        if (inInstall) {
          shareHelper.checkIsSupportApi().then(isSupport=>{
            if (isSupport) {
              shareHelper.shareToTimeline(data).then(result=>{
                if (result.errCode==0) {
                  if (callbackSuccess) {
                    callbackSuccess(result);
                  }
                  this.msgShort('分享成功');
                }else {
                  if (callbackFaild) {
                    callbackFaild(result);
                  }
                  this.alert({text:'分享失败，请稍后再试'});
                }
              });

            }else {
              this.alert({text:'您的微信不支持分享优铺信息，请前往微信进行设置'});
            }
          })
        }else {
          this.alert({text:'您还没有安装微信，请先安装微信'});
        }
      })
    } catch (e) {
      callbackFaild(result);
      this.alert({text:'系统出错，请您稍后再次尝试'});
    }
  }
  //分享给好友
  //data：要分享的数据，具体参数请查看commonComponents/wechat/wechatShare
  //callbackSuccess 如果分享成功，则回调此函数，并且把结果以参数传入
  //callbackFaild 如果分享失败，则回调此函数，并且把结果以参数传入
  shareToSession(data,callbackSuccess,callbackFaild){
    try {
      shareHelper.checkIsInstallWechat().then(inInstall=>{
        if (inInstall) {
          shareHelper.checkIsSupportApi().then(isSupport=>{
            if (isSupport) {
              shareHelper.shareToSession(data).then(result=>{
                if (result.errCode==0) {
                  if (callbackSuccess) {
                    callbackSuccess(result);
                  }
                  this.msgShort('分享成功');
                }else {
                  if (callbackFaild) {
                    callbackFaild(result);
                  }
                  this.alert({text:'分享失败，请稍后再试'});
                }
              });

            }else {
              this.alert({text:'您的微信不支持分享优铺信息，请前往微信进行设置'});
            }
          })
        }else {
          this.alert({text:'您还没有安装微信，请先安装微信'});
        }
      })
    } catch (e) {
      callbackFaild(result);
      this.alert({text:'系统出错，请您稍后再次尝试'});
    }

  }
  //获取上传图片静态类（更多注释和使用函数请查看imageHelper）
  getImageHelper(){
    return imageHelper;
  }
  uploadToRemote(filePath){
    return this.getImageHelper().uploadFile(filePath);
  }
  //从相册上传
  uploadFromLib(isMul){
    if (!isMul) {
      return this.getImageHelper().uploadOne({});
    }else {
      return this.getImageHelper().uploadMul();
    }
  }
  //拍照上传
  uploadFromCamera(isMul){
    return this.getImageHelper().uploadWithCamera({});
  }
  //通用上传功能，调用后会打开一个底部弹窗，询问从哪儿上传
  //isMul：是否可以多文件上传
  uploadModal(isMul,callback){
    this.content(
      {
        isWholeCustom:true,
        customText:()=>{
          return (<View style={basicStyles.Fullscreen}>
                        <View style={basicStyles.cityNav}>
                              <TouchableHighlight style={basicStyles.chooseView} underlayColor="#fff" onPress={() => {

                                callback(this.uploadFromLib(isMul))
                              }}>
                                    <Text style={fonts.bodyText_Gray}>从手机相册选择上传</Text>
                              </TouchableHighlight>
                              <TouchableHighlight style={basicStyles.chooseView} underlayColor="#fff" onPress={() => {

                                callback(this.uploadFromCamera(isMul))
                              }} >
                                    <Text style={fonts.bodyText_Gray}>拍照上传</Text>
                              </TouchableHighlight>
                              <TouchableHighlight style={[basicStyles.chooseView,basicStyles.marginTop10]} underlayColor="#fff" onPress={() => {this.closeModal()}}>
                                    <Text style={fonts.bodyText_Black}>取消</Text>
                              </TouchableHighlight>

                        </View>
          </View>);
        }
      })
  }
  //只有一个按钮的弹出框
  //modal为参数对象
  //modal:{
  //text 静态提示文字
  //customText 自定义显示内容，非必填（此字段为自定义函数，函数返回可以为静态文字，也可以是包含标签的代码）
  //text和customText两者必须有一个传入，优先级customText大于text
  //ok 确定按钮，非必填。ok:{click,text}
  //}
  alert(modal){
    let modalObject = {
    text:modal.text,
    customText:()=>{return (<View style={styles.maskMainTxt}>
                                  <Text style={[fonts.bodyText_Black,styles.lineHeight20]}>{modal.text}</Text>
                            </View>)},
    modalType:'alert',
    btns:[],
    isVisible:true,
    closePrassBtn:modal.closePrassBtn
    };
    if (modal.ok) modalObject.btns.push(modal.ok);
    if (modal.customText) modalObject.customText = modal.customText;
    modalObject.isWholeCustom=false;
    this.setState({modalObject});
  }
  //有两个按钮的弹出框
  //modal为参数对象
  //modal:{
  //text 静态提示文字
  //customText 自定义显示内容，非必填（此字段为自定义函数，函数返回可以为静态文字，也可以是包含标签的代码）
  //text和customText两者必须有一个传入，优先级customText大于text
  //ok 确定按钮，非必填。ok:{click,text}
  //no 取消按钮，非必填。no:{click,text}
  //}
  confirm(modal){
    let modalObject = {
    text:modal.text,
    customText:()=>{return (<View style={styles.maskMainTxt}>
                                  <Text style={[fonts.bodyText_Black,styles.lineHeight20]}>{modal.text}</Text>
                            </View>)},
    modalType:'confirm',btns:[],isVisible:true};
    modal.no?modalObject.btns.push(modal.no):modalObject.btns.push({text:'取消'});
    modal.ok?modalObject.btns.push(modal.ok):modalObject.btns.push({text:'确定'});
    if (modal.customText) modalObject.customText = modal.customText;
    modalObject.isWholeCustom=false;
    this.setState({modalObject});
  }
  //内容展示弹出框
  //modal为参数对象
  //modal:{
  //text 静态提示文字
  //customText 自定义显示内容，非必填（此字段为自定义函数，函数返回可以为静态文字，也可以是包含标签的代码）
  //text和customText两者必须有一个传入，优先级customText大于text
  //btns 自定义按钮组合，非必填。btns:[{click,text},{click,text},{click,text}]
  //}
  content(modal){
    let modalObject = {text:modal.text,customText:null,modalType:'content',btns:[],isVisible:true};
    if (modal.btns) modalObject.btns = modal.btns;
    if (modal.customText) modalObject.customText = modal.customText;
    modalObject.isWholeCustom=modal.isWholeCustom;
    this.setState({modalObject});
  }
  //统一时间提示
  msgShort(text,callback) {
      this.openLoading(text,1500,false,callback)
  }
  //提示类tips，弹出框
  //text 静态提示文字
  //timeout 展示时间 非必填，默认3秒
  //customText 自定义显示内容，非必填（此字段为自定义函数，函数返回可以为静态文字，也可以是包含标签的代码）
  //callback 弹窗消失的时候回调此函数
  msg(text,timeout,customText,callback){
    let modalObject = {text:text,customText:null,modalType:'msg',btns:[],isVisible:true};
    if (customText) {
      modalObject.customText = customText;
      modalObject.isWholeCustom=true;
    }
    this.setState({modalObject});
    let _timeout = timeout?timeout:3000;
    let timer = setTimeout(()=>{
      this.setState({modalObject:{isVisible:false}})
      if (callback) {
        callback()
      }
      clearTimeout(timer);
    },_timeout);
  }
  closeModal(){
    this.setState({modalObject:{isVisible:false}});
  }
  //加载弹层
  //text 弹窗中展示的文字 可以为空
  //timeout 关闭时间，如果不设置该时间则不会自动关闭
  openLoading(text,timeout,isShowImg,callback){
    let _text = text?text:'正在加载...';//默认显示的文字为正在加载
    if (isShowImg===null||isShowImg===undefined) {
      isShowImg=true;
    }
    this.setState({loadingObject:{isVisible:true,text:_text,isShowImg:isShowImg?true:false}});
    if (timeout) {
      let _timeout = parseInt(timeout)?parseInt(timeout):3000;
      let timer = setTimeout(()=>{
        this.setState({loadingObject:{isVisible:false}})
        if (callback) {
          callback()
        }
        clearTimeout(timer);
      },_timeout);
    }
  }
  //关闭加载弹层
  closeLoading(timeout,callback){
    let _timeout = timeout?parseInt(timeout):500;
    let timer = setTimeout(()=>{
      this.setState({loadingObject:{isVisible:false}})
      if (callback) {
        callback()
      }
      clearTimeout(timer);
    },_timeout);
  }
  //页面如果需要用到信息弹窗，则需要在页面底部的最外层view内部调用此函数（this.renderModal()）
  renderModal() {
    return (
      <ModalIndex text={this.state.modalObject.text}
      customText={this.state.modalObject.customText}
      modalType={this.state.modalObject.modalType}
      btns={this.state.modalObject.btns}
      isVisible={this.state.modalObject.isVisible}
      isWholeCustom={this.state.modalObject.isWholeCustom}
      closePrassBtn={this.state.modalObject.closePrassBtn}
      onClose={()=>{
        let _modalObject = {isVisible:false};
        this.setState({modalObject:_modalObject})
      }}
      >
      </ModalIndex>
    )
  }
  //页面如果需要用到加载弹窗，则需要在页面底部的最外层view内部调用此函数（this.renderLoading()）
  renderLoading() {
    return (
      <Loading isShowImg={this.state.loadingObject.isShowImg}  isVisible={this.state.loadingObject.isVisible} text={this.state.loadingObject.text} ></Loading>
    )
  }
}

export const blackStyles = StyleSheet.create({
  flex:{
    flex:1,
  },
  netWork:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#f7f8fa",
  },
  touchBtn:{
    borderRadius:3,
    borderColor:"#eaeaea",
    borderWidth:1,
    paddingTop:12,
    paddingBottom:12,
    paddingLeft:30,
    paddingRight:30,
    marginTop:30,
  },
  firstEnterView:{
    backgroundColor:"transparent",
    alignItems:"center",
    justifyContent:'center',
    flex:1,
  },
  blackCenter:{
    width:200,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"rgba(0,0,0,0.8)",
    borderRadius:6,
  },
  refreshImg:{
    width:30,
    height:30,
    marginBottom:10,
    marginTop:10,
  },
  loadView:{
    alignItems:"center",
    justifyContent:"center",
    paddingTop:15,
    paddingBottom:15,
    flexDirection:"row"
  },
  loadImg:{
    width:17,
    height:17,
    marginRight:10,
  },
  marginTop10:{
    marginTop:10,
  }

});
const basicStyles = StyleSheet.create({
  marginTop10:{
    marginTop:10,
  },
  Fullscreen:{
    flex:1,
    backgroundColor:"rgba(0,0,0,0.7)",
    alignItems:"center",
    justifyContent:"flex-end"
  },
  chooseView:{
    height:45,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#fff",
    width:Dimensions.get('window').width
  }
});
