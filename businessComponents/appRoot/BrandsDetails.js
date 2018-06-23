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
  ScrollView,
  Linking
} from 'react-native';
var moment = require('moment');
import {Actions} from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/appRoot/BrandsDetails';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import Swiper from 'react-native-swiper';
import {apis, sites, staticSite} from '../../systemComponents/Remote/ApiStorage';
import BasicComponent from '../basic/BasicComponent';
import { UMengAnalytics } from '../../commonComponents/umeng/UMAnalytics';
import {Title} from '../../commonComponents/CommentTitle/Title';
const renderPagination1 = (index,total,context) => {
      return (
        <View style={styles.paginationStyle1}>
          <Text style={fonts.bodyText_white}>
            <Text style={fonts.bodyText_white}>{index + 1}</Text>/{total}
          </Text>
        </View>
      )
}
export default class BrandsDetails extends BasicComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalObject: {},
      loadingObject: {},
      brandId: this.props.id,
      brand: null,
      introduce:'',
      brandPics:[],
      userBrandCallHistory:{date:moment(new Date()).format('YYYYMMDD'),user:[]}
    };
  }

  componentWillMount() {
    this.openLoading();
    storage.load({
      key: keys.getUserBrandDetail,
      syncInBackground: false,
      syncParams: {
        url: apis.getUserBrandDetail + '?id=' + this.state.brandId
      }
    }).then(ret => {
      if (ret.status == 200) {
        return ret.json();
      } else {
        return Promise.reject('远程返回错误')
      }
    }).then(retJson => {

      if (retJson != null) {
        this.closeLoading();
        if(retJson.userBrand.closed){
          this.msgShort('该品牌已下架')
          setTimeout(
            () => {
              Actions.pop({})
            },
            1000
          );
        }else{
          let introduce= retJson.userBrand.introduce;
          if(retJson.userBrand.introduce && retJson.userBrand.introduce.length>100){
            introduce=introduce.substr(0,100)+'...';
          }
          this.setState({
            brand: retJson,
            introduce:introduce,
            brandPics:retJson.userBrand.pic?retJson.userBrand.pic.split(','):[]
          });
        }
      } else {
        this.closeLoading();
        this.msgShort('数据异常');
      }
    }).catch(err => {
      this.closeLoading();
      this.msgShort('请求异常');
    });
  }

  _callPhone(tel) {
    storage.load({
      key:keys.currentUser
    }).then(user=>{
      if (!user) {
        Actions.reset('Login')
        return false;
      }else {
        if (user.projectManager) {
          {
          // this.content(
          //   {
          //     isWholeCustom:true,
          //     customText:()=>{
          //       return (
          //         <View style={styles.mask}>
          //               <View style={styles.maskMain}>
          //                     <View style={styles.maskMainTxt}>
          //                           <Text style={[fonts.bodyText_Gray,styles.lineHeight20]}>只有招商人或品牌人才可以联系他</Text>
          //                     </View>
          //               </View>
          //       </View>
          //     );
          //     }
          //   });
          }
            this.alert({
              text:'您还没有查看权限'
            })
          return false;
        }
        else if (user.roleType=='公司' || user.roleType=='品牌人' || user.roleType=='招商人') {
          this._getUserBrandCallHistory(tel,user.id);
          return true;
        }
        {
        // this.content(
        //   {
        //     isWholeCustom:true,
        //     customText:()=>{
        //       return (
        //         <View style={styles.mask}>
        //               <View style={styles.maskMain}>
        //                     <View style={styles.maskMainTxt}>
        //                           <Text style={[fonts.bodyText_Gray,styles.lineHeight20]}>只有招商人或者品牌人才可以联系他，确认要变更角色？</Text>
        //                     </View>
        //                     <View style={styles.maskMainBtn}>
        //                           <TouchableHighlight style={styles.btn} underlayColor="#fff" onPress={() => {this.closeModal()}}>
        //                                 <Text style={fonts.bodyText_Black}>取消</Text>
        //                           </TouchableHighlight>
        //                           <TouchableHighlight style={[styles.btn,styles.btn1]} underlayColor="#fff" onPress={()=>this._Qg()}>
        //                                 <Text style={fonts.bodyText_Black}>确定</Text>
        //                           </TouchableHighlight>
        //                     </View>
        //               </View>
        //       </View>
        //     );
        //     }
        //   });
       }
          this.confirm(
            {
              text:'只有招商人或者品牌人才可以联系他，确认要变更角色？',
              ok:{click:()=>{this._Qg()},text:'确定'},
              no:{text:'取消'},
            });
        return false;
      }
    }).catch(error=>{
      Actions.reset('Login')
      return false;
    });
    UMengAnalytics.onEvent('brand_contact_click');
  }
  _Qg(){
    this.closeModal();
    Actions.ChangeRole({})
  };
  _getUserBrandCallHistory(tel,id){
    storage.load({key:keys.userBrandCallHistory,syncInBackground: true}).then(ret => {
      if (ret && ret.date==this.state.userBrandCallHistory.date) {
        this.setState({userBrandCallHistory:ret});
      }
      this._checkPhone(tel,id);
    }).catch(err => {
      this._checkPhone(tel,id);
    })
  }

  _checkPhone(tel,id){
    let limitCount=this.state.brand.callLimitCount;
    let history=this.state.userBrandCallHistory;
    let callDate=moment(new Date()).format('YYYYMMDD');
    let user={userID:id,phones:[]};

    let removeIndex=-1;
    history.user.forEach((u,index)=>{
      if(u.userID==id) {
        user=u;
        removeIndex=index;
      }
    });
    if(removeIndex>=0) history.user.splice(removeIndex,1);

    let isCalled=false;
    user.phones.forEach(p=>{if(p==tel) isCalled=true});

    if (history.date!=callDate || isCalled || user.phones.length<limitCount) {
      if(!isCalled) user.phones.push(tel);
      history.user.push(user);
      history.date=callDate;
      storage.save({key:keys.userBrandCallHistory,data:history,expires:null});
      Linking.openURL('tel:' + tel);
    }else{
      history.user.push(user);
      this.alert({
        customText:()=>{
          return (
            <Text style={{paddingTop:20,paddingBottom:20,paddingLeft:5,paddingRight:5,color:"#898989",lineHeight:22}}>您每天有{limitCount}次联系品牌人的机会，今天已经全部用完，明天再来～</Text>
          )
        }
      });
    }
  }

  // swiper弹框
  _swiperModule(){
    this.content(
      {
        isWholeCustom:true,
        customText:()=>{
          return (
          <View style={styles.swiperMask}>
                <View style={styles.swiperMaskNav}>
                      <TouchableHighlight style={styles.swiperMasknavLeft} underlayColor="transparent" onPress={() => {this.closeModal()}}>
                            <Image source={require('../../images/backWhite.png')}/>
                      </TouchableHighlight>
                      <View style={styles.swiperMasknavCenter} ellipsizeMode={'clip'}>
                            <Text style={fonts.t2_white} numberOfLines={1}>{this.state.brand.userBrand.name}</Text>
                      </View>
                </View>
                <View style={styles.swiperMaskMain}>
                      <View style={styles.swiper1}>
                            <Swiper
                                style={styles.wrapper}
                                renderPagination={renderPagination1}
                                loop={true}>
                                {
                                  this.state.brandPics.map((p,index)=>{
                                    return(
                                      <View style={styles.slide} key={index}>
                                        <TouchableHighlight underlayColor="transparent">
                                          <Image style={styles.slideImg1} source={{uri: staticSite + p}}/>
                                        </TouchableHighlight>
                                      </View>
                                    )
                                  })
                                }
                              </Swiper>
                      </View>
                </View>

        </View>

        );
        }
      })
  }

  // 品牌简介弹框
  _txtModule(){
    this.content(
      {
        isWholeCustom:true,
        customText:()=>{
          return (
            <View style={styles.txtMask}>
                  <TouchableHighlight style={styles.txtMaskClose} underlayColor="transparent" onPress={() => {this.closeModal()}}><View></View></TouchableHighlight>
                  <View style={styles.txtMaskMain}>
                        <View style={[styles.txtMaskMainT]}><Text style={[fonts.t2_white]}>品牌简介</Text></View>
                        <ScrollView>
                              <Text style={[styles.txtMaskMainTxt,fonts.bodyText_Gray]}>{this.state.brand.userBrand.introduce}</Text>
                        </ScrollView>
                  </View>
            </View>
        );
        }
      })
  }


  render() {
    return (
      <View style={[styles.mainView]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <Title isLeftShow={true} backColor={true} title={'品牌详情'}></Title>
        {this.state.brand ?
          <ScrollView>
              <View style={styles.swiper}>
                <Swiper
                  style={styles.wrapper}
                  autoplay={true}
                  dotStyle={{
                  backgroundColor: "rgba(255,255,255,0.7)",
                  width: 5,
                  height: 5
                }}
                  activeDotStyle={{
                  backgroundColor: "rgba(255,255,255,1)",
                  width: 8,
                  height: 8
                }}
                  loop={true}
                  showsPagination={true}>
                  {
                    this.state.brandPics.length>0?
                    this.state.brandPics.map((p,index)=>{
                      return(
                        <View style={styles.slide} key={index}>
                          <TouchableHighlight underlayColor="transparent" onPress={() => {this._swiperModule()}}>
                            <Image style={styles.slideImg} source={{uri: staticSite + p}}/>
                          </TouchableHighlight>
                        </View>
                      )
                    })
                    :
                    <View style={styles.slide}>
                      <TouchableHighlight underlayColor="transparent">
                        <Image style={styles.slideImg} source={require('../../images/brandB.png')}/>
                      </TouchableHighlight>
                    </View>
                  }

                </Swiper>
              </View>
              <View style={[styles.textView,styles.textView1]}>
                <Text style={[styles.title, fonts.bodyText_Black]}>品牌信息</Text>
                {this.state.brand.userBrand.name?
                  <Text style={[styles.txt, fonts.bodyText_Gray]}>品牌名称：<Text style={[styles.txt, fonts.bodyText_Black]}>{this.state.brand.userBrand.name}</Text>
                  </Text>
                  :null}
                {this.state.brand.userBrand.brandType?
                  <Text style={[styles.txt, fonts.bodyText_Gray]}>品牌业态：<Text style={[styles.txt, fonts.bodyText_Black]}>{this.state.brand.userBrand.brandType.name}</Text>
                  </Text>
                  :null}
                {this.state.brand.userBrand.partnerType?
                  <Text style={[styles.txt, fonts.bodyText_Gray]}>合作方式：<Text style={[styles.txt, fonts.bodyText_Black]}>{this.state.brand.userBrand.partnerType}</Text>
                  </Text>
                  :null}
                {this.state.brand.userBrand.areaText?
                  <Text style={[styles.txt, fonts.bodyText_Gray]}>拓展区域：<Text style={[styles.txt, fonts.bodyText_Black]}>{this.state.brand.userBrand.areaText}</Text>
                  </Text>
                  :null}
              </View>
              {
              this.state.brand.userBrand.introduce?
              <View style={styles.textView} ellipsizeMode={'clip'}>
                    <Text style={[styles.title, fonts.bodyText_Black]}>品牌简介</Text>
                    <Text style={[styles.txt, fonts.bodyText_Gray]}>{this.state.introduce}</Text>
                      <View style={[styles.textViewBtnM]}>
                      {
                        this.state.introduce.length>100?
                        <TouchableHighlight underlayColor="transparent" onPress={() => {this._txtModule()}}>
                              <View style={[styles.textViewBtn]}><Text style={[fonts.hintText_Blue]}>查看详情</Text></View>
                        </TouchableHighlight>
                        :null
                      }

                      </View>
              </View>
              :
              <View style={styles.textView} ellipsizeMode={'clip'}>
                    <Text style={[styles.title, fonts.bodyText_Black]}>品牌简介</Text>
                    <View style={styles.imgNoB}>
                          <Image style={styles.introduceNo} source={require('../../images/imgNoB.png')}/>
                          <Text style={fonts.hintText_Gray}>暂无品牌简介</Text>
                    </View>
              </View>
              }
              {
                this.state.brand.userBrandUsers && this.state.brand.userBrandUsers.length>0?
                <View>
                  <View style={[styles.textView, styles.paddingBottom0]}>
                    <Text style={[styles.title, fonts.bodyText_Black]}>品牌人</Text>
                  </View>
                  {this.state.brand.userBrandUsers.map((user,index) => {
                    return <TouchableHighlight  underlayColor="transparent" key={index} onPress={() => this._callPhone(user.account)}>
                              <View style={styles.brander}>
                                <View style={styles.branderTxt}>
                                      <View style={styles.branderTxtF} ellipsizeMode={'clip'}>
                                            <Text style={[styles.branderTxtFtxt,fonts.bodyText_Black]} numberOfLines={1}>{user.name}<Text style={fonts.bodyText_Black}>   {user.positionName}</Text></Text>
                                      </View>
                                      <Text style={fonts.bodyText_Gray}>{user.userBrandAreaText}</Text>
                                </View>
                                <View style={styles.branderCall}>
                                  <Text style={fonts.btnText_white}>去联系</Text>
                                </View>
                              </View>
                          </TouchableHighlight>
                    })}
                </View>
                :
                <View>
                  <View style={[styles.textView, styles.paddingBottom0]}>
                    <Text style={[styles.title, fonts.bodyText_Black]}>品牌人</Text>
                  </View>
                  <View style={styles.imgNoB1}>
                        <Image style={styles.introduceNo} source={require('../../images/imgNoB.png')}/>
                        <Text style={fonts.hintText_Gray}>暂无品牌人</Text>
                  </View>
                </View>
              }

            </ScrollView>
          : null}
        {this.renderModal()}{this.renderLoading()}
      </View>
    );
  }
}
AppRegistry.registerComponent('BrandsDetails', () => BrandsDetails);
