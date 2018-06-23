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
import { BarChart } from 'react-native-charts'

const data = [
	["报备", 100],
	["到访", 600],
	["意向", 500],
  ["签约", 1000],
];
const data1 = [
	["报备", 200],
	["到访", 600],
	["意向", 500],
  ["签约", 1000],
];
export default class ChartMM extends BasicComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalObject: {},
      loadingObject: {},
      timeOn:false,
      timeOnI:'',
    };
  }
  _timeOn(index){
    this.closeModal();
    if (this.state.timeOn == true) {
      if(this.state.timeOnI == index){
        this.setState({
          timeOn: false,
        })
      }else {
        this.setState({
          timeOnI: index,
          timeOn: true,
        })
      }
    }else{
      this.setState({
        timeOn: true,
        timeOnI: index,
      })
    }
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
                      <TouchableHighlight underlayColor="transparent" onPress={() => {this._timeOn(0)}} style={styles.timeList}><Text style={[this.state.timeOnI == 0?fonts.bodyText_Blue:fonts.bodyText_Gray]}>本日</Text></TouchableHighlight>
                      <TouchableHighlight underlayColor="transparent" onPress={() => {this._timeOn(1)}} style={styles.timeList}><Text style={[this.state.timeOnI == 1?fonts.bodyText_Blue:fonts.bodyText_Gray]}>本周</Text></TouchableHighlight>
                      <TouchableHighlight underlayColor="transparent" onPress={() => {this._timeOn(2)}} style={styles.timeList}><Text style={[this.state.timeOnI == 2?fonts.bodyText_Blue:fonts.bodyText_Gray]}>本月</Text></TouchableHighlight>
                      <View style={styles.timeListPersonality}>
                            <Text style={[fonts.bodyText_Gray]}>自定义</Text>
                            <View>
                            <TextInput
                              style={[styles.listInput,fonts.bodyText_Gray]}
                              underlineColorAndroid="transparent"
                              clearButtonMode="always" returnKeyType='done'
                              placeholderTextColor="#ccc"
                              maxLength={19}
                              keyboardType='numeric'
                            />
                            </View>
                            <Text style={[fonts.bodyText_Gray2]}>——</Text>
                            <View>
                            <TextInput
                              style={[styles.listInput,fonts.bodyText_Gray]}
                              underlineColorAndroid="transparent"
                              clearButtonMode="always" returnKeyType='done'
                              placeholderTextColor="#ccc"
                              maxLength={19}
                              keyboardType='numeric'
                            />
                            </View>
                      </View>
                      <View style={styles.timeBtn}>
                            <TouchableHighlight style={styles.timeBtnL} underlayColor="transparent" onPress={() => {this.closeModal()}}>
                                  <Text style={[fonts.bodyText_Gray]}>清空条件</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.timeBtnR} underlayColor="transparent" onPress={() => {this.closeModal()}}>
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
                        <Text style={[fonts.t2_Black]}>交易分析数据</Text>
                  </View>
                  <TouchableHighlight underlayColor="transparent" onPress={()=>{this._module()}}>
                        <View  style={[styles.navRight]}>
                              <Text style={[fonts.hintText_Black]}>时间筛选</Text>
                              <Image style={[styles.navRightIcon]} source={require('../../images/shaixuan.png')}></Image>
                        </View>
                  </TouchableHighlight>
            </View>
            <Image style={styles.chartBg} source={require('../../images/chart1Bg.png')}>
              <View style={styles.chartTitle}><Text style={[fonts.t3_white,styles.chartTitleTxt]}>招商</Text></View>
              <View style={styles.chartMain}>
                    <View style={styles.chartView}>
                          <BarChart
                          dataSets={[
                          {
                          fillColor: "rgba(255,255,255,0.5)",
                          data: [
                            { value: 3 },
                            { value: 1 },
                            { value: 2 },
                            { value: 1 },
                          ]
                          },
                          ]}
                          graduation={1}
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
                          <Text style={[fonts.hintText_white,styles.chartTxtTxt]}>报备  30</Text>
                          <Text style={[fonts.hintText_white,styles.chartTxtTxt]}>到访  30</Text>
                          <Text style={[fonts.hintText_white,styles.chartTxtTxt]}>意向  30</Text>
                          <Text style={[fonts.hintText_white,styles.chartTxtTxt]}>签约  30</Text>
                     </View>
               </View>
               <View style={styles.chartBgTxt}>
                    <Text style={[fonts.bodyText_Gray,styles.chartBgTxtL]}>报备到访转化率：<Text style={[fonts.bodyText_Gray,styles.chartBgTxtColor1]}>59%</Text></Text>
                    <Text style={[fonts.bodyText_Gray,styles.chartBgTxtR]}>到访意向转化率：<Text style={[fonts.bodyText_Gray,styles.chartBgTxtColor2]}>89%</Text></Text>
               </View>
      			</Image>
            <Image style={styles.chartBg} source={require('../../images/chart2Bg.png')}>
              <View style={styles.chartTitle}><Text style={[fonts.t3_white,styles.chartTitleTxt]}>销售</Text></View>
              <View style={styles.chartMain}>
                    <View style={styles.chartView}>
                          <BarChart
                          dataSets={[
                          {
                          fillColor: "rgba(255,255,255,0.5)",
                          data: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 1 },
                          ]
                          },
                          ]}
                          graduation={1}
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

                     </View>
                     <View style={styles.chartTxt}>
                          <Text style={[fonts.hintText_white,styles.chartTxtTxt]}>报备  30</Text>
                          <Text style={[fonts.hintText_white,styles.chartTxtTxt]}>到访  30</Text>
                          <Text style={[fonts.hintText_white,styles.chartTxtTxt]}>意向  30</Text>
                          <Text style={[fonts.hintText_white,styles.chartTxtTxt]}>签约  30</Text>
                     </View>
               </View>
               <View style={styles.chartBgTxt}>
                    <Text style={[fonts.bodyText_Gray,styles.chartBgTxtL]}>报备到访转化率：<Text style={[fonts.bodyText_Gray,styles.chartBgTxtColor1]}>59%</Text></Text>
                    <Text style={[fonts.bodyText_Gray,styles.chartBgTxtR]}>到访意向转化率：<Text style={[fonts.bodyText_Gray,styles.chartBgTxtColor2]}>89%</Text></Text>
               </View>
      			</Image>
            {this.renderModal()}{this.renderLoading()}
      </View>
    );
  }
}

AppRegistry.registerComponent('ChartMM', () => ChartMM);
