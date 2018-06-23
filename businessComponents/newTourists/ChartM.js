import React, { Component} from 'react';
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
} from 'react-native';
import {fonts} from '../../styles/commonStyle/Font';
import {currentVersionName} from '../../systemComponents/Remote/ApiStorage';
import {styles} from '../../styles/tourists/ChartM';
import {Title} from '../../commonComponents/CommentTitle/Title';
import BasicComponent from '../basic/BasicComponent';
import { BarChart } from '../../commonComponents/chart/';
import DatePicker from 'react-native-datepicker';
import {Actions,ActionConst } from 'react-native-router-flux';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import {sites, h5Sites, apis, staticSite} from '../../systemComponents/Remote/ApiStorage';
var moment = require('moment');
export default class ChartM extends BasicComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalObject: {},
      loadingObject: {},
      timeOnI:['本日','本周','本月','自定义'],
      timeTxt: null,
      beginTime:null,
      endTime:null,
      visitTime:null,
      visitTime1:null,
      projectId: this.props.id,
      isSale:this.props.isSale?true:false,
      isLease:this.props.isLease?true:false,
      businessNum:{},
      graduationZ:1,
      graduationX:1,
      data:[
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 },
      ],
      data1:[
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 },
      ],
    };
  }
  componentWillMount(){
    this._getBusinessNum();
  }
  //查询交易数据
  _getBusinessNum(beginTime,endTime){
    let str = '';
    if(beginTime){
      str = "&beginTime="+beginTime;
    }
    if(endTime){
      str += "&endTime="+endTime;
    }
    storage.load({
      key: keys.findByBusinessNum,
      syncInBackground: true,
      syncParams: {
         url: apis.findByBusinessNum+'?projectId='+this.state.projectId + str
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json();
      }else{
        return Promise.reject('error')
      };
    }).then(retJson => {
      if(retJson){
      let data = [
        { value: retJson.reportNumZ },
        { value: retJson.visitNumZ},
        { value: retJson.intentNumZ },
        { value: retJson.signNumZ },
      ];
        let data1 = [
          { value: retJson.reportNumX },
          { value: retJson.visitNumX},
          { value: retJson.intentNumX},
          { value: retJson.signNumX},
        ];
        let graduationZ= this.state.reportNumZ;
        let graduationX= this.state.reportNumX;
        if(retJson.reportNumZ>0){
          graduationZ = Math.ceil(retJson.reportNumZ/5);
        }
        if(retJson.reportNumX>0){
          graduationX = Math.ceil(retJson.reportNumX/5);
        }
        this.setState({businessNum:retJson,data:data,data1:data1,graduationZ:graduationZ,graduationX:graduationX});
      }

    }).catch(err => {

    })
  }
  //根据选择填写开始结束日期
  _timeOn(index){
    let beginTime= moment().format("1991/01/01");
    let endTime = moment().format("YYYY/MM/DD");
    console.log(index);
      if(index ==0){
        beginTime=moment().format("YYYY/MM/DD");

      }else if(index == 1){
        let weekDay=moment().format('d');
        if(weekDay == 0){
          weekDay = 7;
        }
        beginTime =  moment().add(-weekDay,'days').format("YYYY/MM/DD");

      }else if(index == 2){
        beginTime =  moment().format("YYYY/MM/01");

      }
      this.setState({
          timeTxt: this.state.timeOnI[index],
          visitTime:null,
          visitTime1:null,
          beginTime:beginTime,
          endTime:endTime,
        })
  }
//提交
  _onSubmitEditing(){
    let visitTime = this.state.visitTime;
    let visitTime1 = this.state.visitTime1;
    let beginTime = this.state.beginTime;
    let endTime = this.state.endTime;
    if(visitTime || visitTime1){
      this._getBusinessNum(visitTime,visitTime1);
    }else if(beginTime || endTime){
      this._getBusinessNum(beginTime,endTime);
    }
    this.closeModal();

  }
  //清除数据
  _closeSerach(){

      this._getBusinessNum();

    this.setState({
        timeTxt: null,
        visitTime:null,
        visitTime1:null,
        beginTime:null,
        endTime:null,
      })
    this.closeModal();
  }
  // module
  _module(){
    this.content(
      {
        isWholeCustom:true,
        customText:()=>{
          return (
          <View style={styles.mask}>
                <View style={[styles.nav]}>
                      <TouchableHighlight style={[styles.navLeft]} underlayColor="transparent" onPress={() => {this.closeModal()}}>
                            <Image source={require('../../images/back.png')}></Image>
                      </TouchableHighlight>
                      <View style={[styles.navCenter]}>
                            <Text style={[fonts.t2_Black]}>交易分析数据</Text>
                      </View>
                      <TouchableHighlight underlayColor="transparent" onPress={() => {this.closeModal()}}>
                            <View style={[styles.navRight]}>
                                  <Text style={[fonts.hintText_Blue]}>时间筛选</Text>
                                  <Image style={[styles.navRightIcon]} source={require('../../images/shaixuanOn.png')}></Image>
                            </View>
                      </TouchableHighlight>
                </View>
                <View style={styles.maskMain}>
                      <TouchableHighlight underlayColor="transparent" onPress={() => {this._timeOn(0)}} style={styles.timeList}><Text style={[this.state.timeOnI[0] == this.state.timeTxt&&this.state.visitTime == null&&this.state.visitTime1 == null?fonts.bodyText_Blue:fonts.bodyText_Gray]}>{this.state.timeOnI[0]}</Text></TouchableHighlight>
                      <TouchableHighlight underlayColor="transparent" onPress={() => {this._timeOn(1)}} style={styles.timeList}><Text style={[this.state.timeOnI[1] == this.state.timeTxt&&this.state.visitTime == null&&this.state.visitTime1 == null?fonts.bodyText_Blue:fonts.bodyText_Gray]}>{this.state.timeOnI[1]}</Text></TouchableHighlight>
                      <TouchableHighlight underlayColor="transparent" onPress={() => {this._timeOn(2)}} style={styles.timeList}><Text style={[this.state.timeOnI[2] == this.state.timeTxt&&this.state.visitTime == null&&this.state.visitTime1 == null?fonts.bodyText_Blue:fonts.bodyText_Gray]}>{this.state.timeOnI[2]}</Text></TouchableHighlight>
                      <View style={styles.timeListPersonality}>
                      {
                        this.state.visitTime||this.state.visitTime1?
                        <Text style={[fonts.bodyText_Blue]}>{this.state.timeOnI[3]}</Text>
                        :
                        <Text style={[fonts.bodyText_Gray]}>{this.state.timeOnI[3]}</Text>

                      }
                            <DatePicker style={{width:130,height:30,borderWidth:1,borderColor:"#eaeaea",marginLeft:10,borderRadius:6,paddingRight:5}} date={this.state.visitTime} mode="datetime"
                              placeholder="请选择"  format="YYYY/MM/DD" minDate="1980-01-01"  maxDate="2100-01-01"
                              confirmBtnText="确认"  cancelBtnText="取消" showIcon={false}
                              customStyles={{
                                      dateInput: {
                                        height:30,
                                        position:"absolute",
                                        top:0,right:0,borderWidth:0,
                                      }
                              }}
                              onDateChange={(date) => {this.setState({visitTime: date})}}
                            />
                            <DatePicker style={{width:130,height:30,borderWidth:1,borderColor:"#eaeaea",marginLeft:10,borderRadius:6,paddingRight:5}} date={this.state.visitTime1} mode="datetime"
                              placeholder="请选择"  format="YYYY/MM/DD" minDate="1980-01-01"  maxDate="2100-01-01"
                              confirmBtnText="确认"  cancelBtnText="取消" showIcon={false}
                              customStyles={{
                                      dateInput: {
                                        height:30,
                                        position:"absolute",
                                        top:0,right:0,borderWidth:0,
                                      }
                              }}
                              onDateChange={(date) => {this.setState({visitTime1: date})}}
                            />
                      </View>
                      <View style={styles.timeBtn}>
                            <TouchableHighlight style={styles.timeBtnL} underlayColor="transparent" onPress={() => {this._closeSerach()}}>
                                  <Text style={[fonts.bodyText_Gray]}>清空条件</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.timeBtnR} underlayColor="transparent" onPress={() => {this._onSubmitEditing()}}>
                                  <Text style={[fonts.bodyText_Blue]}>确定</Text>
                            </TouchableHighlight>
                      </View>
                </View>
         </View>
        );
        }
      })
  }
  render() {
    return (
      <View>
            <View style={[styles.nav]}>
                  <TouchableHighlight style={[styles.navLeft]} underlayColor="transparent" onPress={()=>{Actions.pop({refresh:{random:Math.random()}})}}>
                        <Image source={require('../../images/back.png')}></Image>
                  </TouchableHighlight>
                  <View style={[styles.navCenter]}>
                        <Text style={[fonts.t2_Black]} numberOfLines={1}>{this.props.projectName}</Text>
                  </View>
                  <TouchableHighlight underlayColor="transparent" onPress={()=>{this._module()}}>
                        <View  style={[styles.navRight]}>
                              {
                                this.state.timeTxt?
                                <Text style={[fonts.hintText_Black]}>{this.state.visitTime&&this.state.visitTime1?this.state.timeOnI[3]:this.state.timeTxt}</Text>
                                :
                                <Text style={[fonts.hintText_Black]}>
                                {this.state.visitTime&&this.state.visitTime1?this.state.timeOnI[3]:"时间筛选"}
                                </Text>
                              }
                              <Image style={[styles.navRightIcon]} source={require('../../images/shaixuan.png')}></Image>
                        </View>
                  </TouchableHighlight>
            </View>
            {this.state.isLease?
            <Image style={styles.chartBg} source={require('../../images/chart1Bg.png')}>
              <View style={styles.chartTitle}><Text style={[fonts.t3_white,styles.chartTitleTxt]}>招商</Text></View>
              <View style={styles.chartMain}>
                    <View style={styles.chartView}>
                          <BarChart
                          dataSets={[
                          {
                          fillColor: "rgba(255,255,255,0.5)",
                          data: this.state.data,
                          },
                          ]}
                          graduation={this.state.graduationZ}
                          horizontal={false}
                          showGrid={true}
                          barSpacing={10}
                          style={{
                            width: 230,
                            height: 130,
                            marginLeft:10,
                            backgroundColor:"transparent",
                          }}
                          barStyle={{
                          }}
                          />
                          <View style={styles.chartViewTxt}>
                                <View style={styles.chartViewTxtD}><Text style={[fonts.hintText_white]}>报备</Text></View>
                                <View style={styles.chartViewTxtD}><Text style={[fonts.hintText_white]}>到访</Text></View>
                                <View style={styles.chartViewTxtD}><Text style={[fonts.hintText_white]}>意向</Text></View>
                                <View style={styles.chartViewTxtD}><Text style={[fonts.hintText_white]}>签约</Text></View>
                          </View>
                     </View>
                     <View style={styles.chartTxt}>
                          <Text style={[fonts.hintText_white,styles.chartTxtTxt]}>报备  {this.state.businessNum.reportNumZ}</Text>
                          <Text style={[fonts.hintText_white,styles.chartTxtTxt]}>到访  {this.state.businessNum.visitNumZ}</Text>
                          <Text style={[fonts.hintText_white,styles.chartTxtTxt]}>意向  {this.state.businessNum.intentNumZ}</Text>
                          <Text style={[fonts.hintText_white,styles.chartTxtTxt]}>签约  {this.state.businessNum.signNumZ}</Text>
                     </View>
               </View>
               <View style={styles.chartBgTxt}>
                    <Text style={[fonts.bodyText_Gray,styles.chartBgTxtL]}>报备到访转化率:<Text style={[fonts.hintText_Black,styles.chartBgTxtColor1]}>{this.state.businessNum.visitRateZ*100}%</Text></Text>
                    <Text style={[fonts.bodyText_Gray,styles.chartBgTxtR]}>到访意向转化率:<Text style={[fonts.hintText_Black,styles.chartBgTxtColor2]}>{this.state.businessNum.intentRateZ*100}%</Text></Text>
               </View>
      			</Image>
            :null}
            {this.state.isSale?
            <Image style={styles.chartBg} source={require('../../images/chart2Bg.png')}>
              <View style={styles.chartTitle}><Text style={[fonts.t3_white,styles.chartTitleTxt]}>销售</Text></View>
              <View style={styles.chartMain}>
                    <View style={styles.chartView}>
                          <BarChart
                          dataSets={[
                          {
                          fillColor: "rgba(255,255,255,0.5)",
                          data: this.state.data1
                          },
                          ]}
                          graduation={this.state.graduationX}
                          horizontal={false}
                          showGrid={true}
                          barSpacing={10}
                          style={{
                            width: 230,
                            height: 130,
                            marginLeft:10,
                            backgroundColor:"transparent",
                          }}
                          />
                          <View style={styles.chartViewTxt}>
                                <View style={styles.chartViewTxtD}><Text style={[fonts.hintText_white]}>报备</Text></View>
                                <View style={styles.chartViewTxtD}><Text style={[fonts.hintText_white]}>到访</Text></View>
                                <View style={styles.chartViewTxtD}><Text style={[fonts.hintText_white]}>认购</Text></View>
                                <View style={styles.chartViewTxtD}><Text style={[fonts.hintText_white]}>签约</Text></View>
                          </View>
                     </View>
                     <View style={styles.chartTxt}>
                          <Text style={[fonts.hintText_white,styles.chartTxtTxt]}>报备  {this.state.businessNum.reportNumX}</Text>
                          <Text style={[fonts.hintText_white,styles.chartTxtTxt]}>到访  {this.state.businessNum.visitNumX}</Text>
                          <Text style={[fonts.hintText_white,styles.chartTxtTxt]}>认购  {this.state.businessNum.intentNumX}</Text>
                          <Text style={[fonts.hintText_white,styles.chartTxtTxt]}>签约  {this.state.businessNum.signNumX}</Text>
                     </View>
               </View>
               <View style={styles.chartBgTxt}>
                    <Text style={[fonts.bodyText_Gray,styles.chartBgTxtL]}>报备到访转化率:<Text style={[fonts.bodyText_Gray,styles.chartBgTxtColor1]}>{this.state.businessNum.visitRateX*100}%</Text></Text>
                    <Text style={[fonts.bodyText_Gray,styles.chartBgTxtR]}>到访认购转化率:<Text style={[fonts.bodyText_Gray,styles.chartBgTxtColor2]}>{this.state.businessNum.intentRateX*100}%</Text></Text>
               </View>
      			</Image>
            :null}
            {this.renderModal()}{this.renderLoading()}
      </View>
    );
  }
}

AppRegistry.registerComponent('ChartM', () => ChartM);
