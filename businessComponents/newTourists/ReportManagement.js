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
  ListView
} from 'react-native';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/tourists/ReportManagement1';
import {apis} from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import BusinessProjectCustomItem from './BusinessProjectCustomItem';
import { Actions,ActionConst } from 'react-native-router-flux';
import { NiceList } from '../../commonComponents/niceList/NiceList';
import {Title} from '../../commonComponents/CommentTitle/Title';
import ListBasicComponent from '../basic/ListBasicComponent';
import { DropDownMenu } from '../../commonComponents/menu/DropDownMenu2';
var moment = require('moment');
export default class ReportManagement extends ListBasicComponent {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      flowTypeNum:{},
      selected:this.props.selectTabIndex?this.props.selectTabIndex:0,
      selectedTab: "home",
      storkey: keys.findByBusinessList,
      baseUrl: apis.findByBusinessList + '?projectId=' + this.props.id + '&businessType=' + this.props.businessType,
      remoteUrl: apis.findByBusinessList + '?projectId=' + this.props.id + '&businessType=' + this.props.businessType + '&flowStatus=报备提交',
      projectName: this.props.name,
      businessType:this.props.businessType,
      businessRefreshFlag:'',
      customRefreshFlag:'',
      status:[true,false,false,false,false,false],
      currentIndex:0,
      showmodal:false,
      newSelection:[null,null],
      flag:false,
      endTime:'',
      startTime:'',
      dropDownMenu:[{
           title:'时间筛选',
           value:'1000',
           type:'single',
           data:[{
             name:"本周",
             value:'1001',
             },
             {
             name:"本月",
             value:'1002',
             },

             {
             name:"自定义",
             value:'1003',
             }
           ]},
           {
                title:'交易进展',
                value:'2000',
                type:'double',
                data:[{
                  name:"报备",
                  value:'2001',
                  data:[{
                    name:"待审核",
                    value:'20001'
                    },
                    {
                      name:"报备失败",
                      value:'20002'
                    }]
                  },
                  {
                  name:"到访",
                  value:'2002',
                  data:[{
                      name:"待到访",
                      value:'20003'
                    },
                    {
                      name:"到访失败",
                      value:'20004'
                    }]
                  },
                  {
                  name:"认购",
                  value:'2003',
                  data:[{
                      name:"待认购",
                      value:'20005'
                    },
                    {
                      name:"认购失败",
                      value:'20006'
                    }]
                  },
                  {
                  name:"意向",
                  value:'2004',
                  data:[{
                      name:"待意向",
                      value:'20007'
                    },
                    {
                      name:"意向失败",
                      value:'20008'
                    }]
                  },
                  {
                  name:"签约",
                  value:'2005',
                  data:[{
                      name:"待签约",
                      value:'20009'
                    },
                    {
                      name:"签约失败",
                      value:'20010'
                    }]
                  },
                  {
                  name:"结佣",
                  value:'2006',
                  data:[{
                      name:"待结佣",
                      value:'20011'
                    },
                    {
                      name:"已完结",
                      value:'20012'
                    }]
                  }
                ]}
         ]
    };
  }

  componentWillMount(){
    this._initFlowType();

  }
  _initFlowType(){
    storage.load({
      key: keys.findFlowTypeNum,
      syncInBackground: false,
      syncParams: {
         url: apis.findFlowTypeNum+'?projectId=' + this.props.id + '&businessType=' + this.props.businessType
      }
    }).then(ret => {
      return ret.json()
    }).then(content => {
      // console.log(content);
      this.setState({
        flowTypeNum: content
      })
    }).catch(error => {
    })
  }
  componentWillReceiveProps(nextProps){
    if (nextProps) {
      if (nextProps.selectTabIndex==1) {
        this.setState({customRefreshFlag:Math.random(),selected:nextProps.selectTabIndex})
      }else if(nextProps.selectTabIndex==0){
        this.setState({businessRefreshFlag:Math.random(),selected:nextProps.selectTabIndex})
      }
    }
  }

  _onTabPress(index){
    this.setState({selected:index});
    if (index === 0) {
      this.setState({selected:0})
    }else{
      this.setState({selected:1})
    }
  }
  // 搜索切换
  async  addClass(index) {
    let showState = this.state.status;
    let baseUrl = this.state.baseUrl;
    let businessType = this.state.businessType;
    if(index == 0){
      baseUrl = baseUrl + '&flowStatus=报备提交';
    }else if(index == 1){
      baseUrl = baseUrl + '&flowStatus=报备成功';
    }else if(index == 2){
      baseUrl = baseUrl + '&flowStatus=到访成功';
    }else if(index == 3){
      if(businessType=='招商'){
        baseUrl = baseUrl + '&flowStatus=意向成功';
      }else{
        baseUrl = baseUrl + '&flowStatus=认购成功';
      }
    }else if(index == 4){
      baseUrl = baseUrl + '&businessFlowType=待结佣';
    }else if(index == 5){
      baseUrl = baseUrl;
    }
    showState[this.state.currentIndex] = false;
    showState[index] = !showState[index];
    await this.setState({status:showState});
    await this.setState({currentIndex:index});
    await this.setState({remoteUrl:baseUrl});
  }
  // 搜索弹框
  searchContent(){
    this.content(
      {
        isWholeCustom:true,
        customText:()=>{
          return (<View style={[styles.modalMask]}>
                <View style={styles.centerView}>
                      <View style={styles.searchTop}>
                            <TouchableHighlight style={styles.backView} underlayColor="transparent" onPress={()=>{this.closeModal()}}>
                                    <Image source={require('../../images/back.png')}></Image>
                            </TouchableHighlight>
                            <View style={styles.searchInput}>
                                  <Image  source={require('../../images/search.png')}/>
                                  <TextInput style={[styles.searchIputRest,fonts.bodyText_Black]} autoFocus={true}
                                    underlineColorAndroid="transparent"
                                    placeholder="请输入客户姓名或电话" clearButtonMode="always" returnKeyType='send'
                                    onEndEditing={()=>this._onPressSearch()} onSubmitEditing={()=>this._onSubmitEditing()}
                                    placeholderTextColor="#898989"
                                    onChangeText={(text) => this.setState({keywords: text})}/>
                            </View>
                            {this.state.showmodal?
                              <TouchableHighlight  underlayColor="transparent">
                                  <View style={styles.rightSearch}>
                                        <Text style={[fonts.tinyText_Blue]}>筛选</Text>
                                        <Image  source={require('../../images/shaixuanOn.png')} />
                                  </View>
                              </TouchableHighlight>
                              :
                              <TouchableHighlight onPress={()=>{this.showModal()}} underlayColor="transparent">
                                  <View style={styles.rightSearch}>
                                        <Text style={[fonts.tinyText_Gray]}>筛选</Text>
                                        <Image  source={require('../../images/sx.png')} />
                                  </View>
                              </TouchableHighlight>
                            }
                      </View>
                      {this.state.showmodal?
                      <View style={styles.downView}>
                        <DropDownMenu
                                       arrowImg={require('../../images/select.png')}      //set the arrow icon, default is a triangle
                                       checkImage={require('../../images/tab.png')}    //set the icon of the selected item, default is a check mark
                                       bgColor={"#fff"}                            //the background color of the head, default is grey
                                       tintColor={"#333"}                        //the text color of the head, default is white
                                       selectItemColor={"#3a8ff3"}                    //the text color of the selected item, default is red
                                       data={this.state.dropDownMenu}
                                       maxHeight={410}
                                       selection={this.state.newSelection}
                                       endTime={this.state.endTime}
                                       startTime={this.state.startTime}
                                       handler={(selection,startTime,endTime) => this._menuChange(selection,startTime,endTime)} >
                                        >
                         </DropDownMenu>
                         <View style={styles.searchTouch}>
                               <TouchableHighlight style={[styles.searchBtn,styles.backColor1]} underlayColor="#eee" onPress={()=>{this.closeModal();this.setState({newSelection:[null,null],startTime:'',endTime:'',flag:false,remoteUrl:this.state.baseUrl+ '&flowStatus=报备提交'})}}>
                                 <Text style={fonts.bodyText_Gray}>清空条件</Text>
                               </TouchableHighlight>
                               <TouchableHighlight style={[styles.searchBtn,styles.backColor2]} underlayColor="#3a8ff3" onPress={()=>{this._onSubmit()}}>
                                 <Text style={fonts.bodyText_white}>确定</Text>
                               </TouchableHighlight>
                         </View>
                         </View>
                         :null
                      }
                </View>
          </View>);
        }
      })
  }
  showModal(){
    console.log(this.state.newSelection);
   if(this.state.showmodal){
     this.setState({showmodal:false})
   }else{
     this.setState({showmodal:true})
   }
  }

  _onPressSearch(){

  }
  _menuChange(selection,startTime,endTime){
  this.setState({newSelection:selection,startTime:startTime,endTime:endTime});
  }
  // 此回调函数当软键盘的确定/提交按钮被按下的时候调用此函数
  _onSubmitEditing(){

      this.setState({
        remoteUrl: this.state.baseUrl + '&keywords=' + this.state.keywords,
        flag:true
      });

    this.closeModal()
  }

  // 此回调函数当软键盘的确定/提交按钮被按下的时候调用此函数
_onSubmit(){

    // this.setState({
    //   remoteUrl: this.state.baseUrl + '&keywords=' + this.state.keywords
    // });
    let dataInfo = this.state.newSelection;
    let timeInfo = dataInfo[0];
    let flowInfo = dataInfo[1];
    let businessType = this.state.businessType;
    let baseUrl = this.state.baseUrl;
    console.log(dataInfo);
    if(this.state.keywords){
      baseUrl + '&keywords=' + this.state.keywords;
    }
    if(timeInfo!=null){
      let beginTime= moment().format("1991/01/01");
      let endTime = moment().format("YYYY/MM/DD");
      if(timeInfo.value == 1001){
        let weekDay=moment().format('d');
        if(weekDay == 0){
          weekDay = 7;
        }
        beginTime =  moment().add(-weekDay,'days').format("YYYY/MM/DD");

      }else if(timeInfo.value == 1002){
        beginTime =  moment().format("YYYY/MM/01");

      }else if(timeInfo.value == 1003){
        if(this.state.startTime){
          beginTime =  this.state.startTime;
        }
        if(this.state.endTime){
          endTime = this.state.endTime;
        }
      }

      baseUrl = baseUrl + '&beginTime=' + beginTime + '&endTime=' + endTime;
    }
    if(flowInfo!=null){
      if(flowInfo.value ==20001){
        baseUrl = baseUrl + '&flowStatus=报备提交';
      }else if(flowInfo.value ==20002){
        baseUrl = baseUrl + '&flowStatus=报备失败';
      }else if(flowInfo.value ==20003){
        baseUrl = baseUrl + '&flowStatus=报备成功';
      }else if(flowInfo.value ==20004){
        baseUrl = baseUrl + '&flowStatus=到访失败';
      }else if(flowInfo.value ==20005){
        baseUrl = baseUrl + '&flowStatus=到访成功';
      }else if(flowInfo.value ==20006){
        baseUrl = baseUrl + '&flowStatus=认购失败';
      }else if(flowInfo.value ==20007){
        baseUrl = baseUrl + '&flowStatus=到访成功';
      }else if(flowInfo.value ==20008){
        baseUrl = baseUrl + '&flowStatus=意向失败';
      }else if(flowInfo.value ==20009){
        if(businessType=='招商'){
          baseUrl = baseUrl + '&flowStatus=意向成功';
        }else{
          baseUrl = baseUrl + '&flowStatus=认购成功';
        }
      }else if(flowInfo.value ==20010){
        baseUrl = baseUrl + '&flowStatus=签约失败';
      }else if(flowInfo.value ==20011){
        baseUrl = baseUrl + '&businessFlowType=待结佣';
      }else if(flowInfo.value ==20012){
        baseUrl = baseUrl + '&flowStatus=成功完结';
      }
    }
    this.setState({remoteUrl:baseUrl,flag:true});
    this.closeModal()
}


  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <Title isLeftShow={true} backColor={true} isRightBtnShow={false} title={this.props.projectName}/>
       <View style={styles.searchView}>
             <TouchableHighlight  onPress={()=>{this.searchContent()}} underlayColor="transparent">
                 <View style={styles.leftSearch}>
                       <Image  source={require('../../images/search2.png')} />
                       <Text style={styles.leftText}>请输入客户姓名或电话</Text>
                 </View>
             </TouchableHighlight>
             <TouchableHighlight onPress={()=>{this.searchContent()}} underlayColor="transparent">
                 <View style={styles.rightSearch}>
                       <Text style={[fonts.tinyText_Gray]}>筛选</Text>
                       <Image  source={require('../../images/sx.png')} />
                 </View>
             </TouchableHighlight>
       </View>
       {this.state.flag?null:

       <View style={styles.tabView}>
             <TouchableHighlight underlayColor="transparent" onPress={()=>this.addClass(0)}>
                   <View style={styles.tabTouch}>
                         { this.state.status[0]?
                            <Image style={styles.imgMt} source={require('../../images/sh_blue.png')} />
                            :
                            <Image  style={styles.imgMt} source={require('../../images/sh_gray.png')} />
                         }
                         <Text style={this.state.status[0]?styles.blueText:styles.grayText}>待审核</Text>
                         <Text style={this.state.status[0]?styles.blueText:styles.grayText}>({this.state.flowTypeNum.auditNum>99?'99+':this.state.flowTypeNum.auditNum})</Text>
                   </View>
             </TouchableHighlight>
             <TouchableHighlight  underlayColor="transparent" onPress={()=>this.addClass(1)}>
                   <View style={styles.tabTouch}>
                         { this.state.status[1]?
                            <Image style={styles.imgMt} source={require('../../images/df_blue.png')} />
                            :
                            <Image style={styles.imgMt} source={require('../../images/df_gray.png')} />
                         }
                         <Text style={this.state.status[1]?styles.blueText:styles.grayText}>待到访</Text>
                         <Text style={this.state.status[1]?styles.blueText:styles.grayText}>({this.state.flowTypeNum.visitNum>99?'99+':this.state.flowTypeNum.visitNum})</Text>
                   </View>
             </TouchableHighlight>
             <TouchableHighlight underlayColor="transparent" onPress={()=>this.addClass(2)}>
                   <View style={styles.tabTouch}>
                         { this.state.status[2]?
                            <Image style={styles.imgMt} source={require('../../images/rg_blue.png')} />
                            :
                            <Image style={styles.imgMt} source={require('../../images/rg_gray.png')} />
                         }
                         <Text style={this.state.status[2]?styles.blueText:styles.grayText}>{this.state.businessType=="招商"?"待意向":"待认购"}</Text>
                         <Text style={this.state.status[2]?styles.blueText:styles.grayText}>({this.state.flowTypeNum.intentNum>99?'99+':this.state.flowTypeNum.intentNum})</Text>
                   </View>
             </TouchableHighlight>
             <TouchableHighlight underlayColor="transparent" onPress={()=>this.addClass(3)}>
                   <View style={styles.tabTouch}>
                         { this.state.status[3]?
                            <Image style={styles.imgMt} source={require('../../images/qy_blue.png')} />
                            :
                            <Image style={styles.imgMt} source={require('../../images/qy_gray.png')} />
                         }
                         <Text style={this.state.status[3]?styles.blueText:styles.grayText}>待签约</Text>
                         <Text style={this.state.status[3]?styles.blueText:styles.grayText}>({this.state.flowTypeNum.signNum>99?'99+':this.state.flowTypeNum.signNum})</Text>
                   </View>
             </TouchableHighlight>
             <TouchableHighlight underlayColor="transparent" onPress={()=>this.addClass(4)}>
                   <View style={styles.tabTouch}>
                         { this.state.status[4]?
                            <Image style={styles.imgMt} source={require('../../images/js_blue.png')} />
                            :
                            <Image style={styles.imgMt} source={require('../../images/js_gray.png')} />
                         }
                         <Text style={this.state.status[4]?styles.blueText:styles.grayText}>待结佣</Text>
                         <Text style={this.state.status[4]?styles.blueText:styles.grayText}>({this.state.flowTypeNum.knotNum>99?'99+':this.state.flowTypeNum.knotNum})</Text>
                   </View>
             </TouchableHighlight>
             <TouchableHighlight underlayColor="transparent" onPress={()=>this.addClass(5)}>
                   <View style={styles.tabTouch}>
                         { this.state.status[5]?
                            <Image style={styles.imgMt} source={require('../../images/all_blue.png')} />
                            :
                            <Image style={styles.imgMt} source={require('../../images/all_gray.png')} />
                         }
                         <Text style={this.state.status[5]?styles.blueText:styles.grayText}>全部</Text>
                         <Text style={this.state.status[5]?styles.blueText:styles.grayText}>({this.state.flowTypeNum.allNum>99?'99+':this.state.flowTypeNum.allNum})</Text>
                   </View>
             </TouchableHighlight>
       </View>
     }
       {this.state.remoteUrl?
       <NiceList
       noDataFun={()=>{return this.state.flag?<View style={styles.noCustomView}>
         <Image style={styles.noCustom} source={require('../../images/noCustom.png')}/>
         <Text style={fonts.btnText_Gray}>您搜索的内容不存在</Text>
       </View>:<View style={styles.noCustomView}>
                  <Text style={styles.mt20,fonts.btnText_Blue}>暂无数据</Text>
                  <Text style={fonts.btnText_Gray,styles.mt20}>快快联系客户吧</Text>
                  <Image style={styles.noCustom} source={require('../../images/noDateLogo.png')}/>
            </View>
       }}
       isNeedLoading={true} renderItem={(rowData)=><BusinessProjectCustomItem {...rowData} />} contentContainerStyle={styles.list} remoteUrl={this.state.remoteUrl}
       storkey={this.state.storkey}/>
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
