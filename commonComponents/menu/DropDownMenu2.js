'use strict';

import React, {Component, PropTypes,} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  TextInput
} from 'react-native';
import DatePicker from 'react-native-datepicker';
export class DropDownMenu extends Component {
  constructor(props, context) {
    super(props, context);
    console.log(this.props.selection);
    var selectIndex = new Array(this.props.data.length);
    let _selectValue = new Array(this.props.data.length);
    for (var i = 0; i < selectIndex.length; i++) {
      selectIndex[i] = null;
      if (this.props.data[i].type == 'single') {
        _selectValue[i] = [{}]
      }else if (this.props.data[i].type == 'double') {
        _selectValue[i] = [{},{}]
      }
    }
    this.state = {
      rotationAnims: props.data.map(() => new Animated.Value(0)),
      showMoreBtn: this.props.showMoreBtn,
      doubleList: this.props.doubleList? this.props.doubleList: [],
      topSelectIndex:-1,
      singleData:[],
      doubleData:[],
      returnValue:selectIndex,
      selectValue:_selectValue,
      viewType:'single',
      startTime:this.props.startTime,
      endTime:this.props.endTime,
      leftSelectedIndex:[-1,-1],
      selection:this.props.selection,
    };
  }

  componentWillReceiveProps(nextProps){
   this.setState({selection:nextProps.selection,startTime:nextProps.startTime,endTime:nextProps.endTime})
  }
  // 显示列表右侧箭头动画
  openPanel(index) {
    Animated.timing(this.state.rotationAnims[index], {
      toValue: 0.5,
      duration: 300,
      easing: Easing.linear,
    }).start();
  }
  // 隐藏列表右侧箭头动画
  closePanel(index) {
    Animated.timing(this.state.rotationAnims[index], {
      toValue: 0,
      duration: 300,
      easing: Easing.linear,
    }).start();
  }
  // 点击头部重新render
  openOrClosePanel(index) {
    this.props.bannerAction? this.props.bannerAction(): null;
    if (this.state.topSelectIndex == index) {
      // this.closePanel(index);
      // this.setState({topSelectIndex:-1});
    } else {
      if (this.state.topSelectIndex> -1) {
        // this.closePanel(this.state.topSelectIndex);
      }
      // this.openPanel(index);
      let _sdata = this.props.data[index];
      let dData = this.state.selectValue[index]&&this.state.selectValue[index][0].data?this.state.selectValue[index][0].data:_sdata.data[0].data
      this.setState({
        singleData:_sdata.data,
        doubleData:_sdata.data&&dData?dData:null,
      });
      let  leftIndex =this.state.leftSelectedIndex;
      // leftIndex[index]=1;
      if(index==0){
         if(this.state.selection[1]!=null){
           leftIndex=[1,1];
         }else{
           leftIndex=[1,-1];
         }
      }else{
        if(this.state.selection[0]!= null){
          leftIndex=[1,1];
        }else{
          leftIndex=[-1,1];
        }
      }
      this.setState({viewType:_sdata.type,topSelectIndex:index,leftSelectedIndex:leftIndex});

    }
  }
  // 显示所有列表
  renderActivityPanel(){
    if (this.state.topSelectIndex>-1) {
        if (this.state.viewType == 'single') {
          return  this.renderSingle()
        }else if (this.state.viewType == 'double') {
          return  this.renderDouble()
        }
    }else{
      return null;
    }
  }
  renderSingle(){
    //1、拿到需要render的data
    //2、render
    if (this.state.singleData) {
      return(<View style={{position: 'absolute',left: 100,right: 0,top: 0,bottom: 0,backgroundColor:"#f7f8fa",borderRightWidth:1,borderRightColor:"#eaeaea"}}>
                   <ScrollView style={[{position: 'absolute',top: 0,left: 0,right: 0,}]}>
                      {
                        this.state.singleData.map((item, index) => {return this.renderItem(item,index,0)})
                      }
                    </ScrollView>
             </View>
            )
    }else {

    }

  }
  renderDouble(){
    if (this.state.singleData&&this.state.doubleData) {
      return(<View style={{position: 'absolute',left: 100,right: 0,top: 0,bottom: 0,backgroundColor:"#f7f8fa"}}>
                 <ScrollView style={[{position: 'absolute',top: 0,left: 0,right: 0}]}>
                   <View style={{flexDirection: "row"}}>
                         <View style={{flex: 1,borderLeftWidth:1,borderLeftColor:"#eaeaea"}}>
                           {
                             this.state.singleData.map((item, index) => {return this.renderItem(item,index,0,()=>{
                               this.setState({doubleData:item.data})
                             })})
                           }
                         </View>
                         <View style={{flex: 1,borderLeftWidth:1,borderLeftColor:"#eaeaea"}}>
                           {
                             this.state.doubleData.map((item, index) => {return this.renderItem(item,index,1)})
                           }
                         </View>
                    </View>
                  </ScrollView>
             </View>
            )
    }
  }
  renderItem(item,index,level,callback){
    if(this.state.selectValue&&this.state.selectValue[this.state.topSelectIndex][level]===item )
    {
      return (<View style={{alignItems:"center"}} key={index} >
                   <TouchableOpacity activeOpacity={1} onPress={()=>this.itemClick(item,index,level,callback)}
                     style={{height: 44,justifyContent: "center",alignItems:"center",borderBottomWidth:1,borderBottomColor:"#3a8ff3",width:100}}>
                          <Text style={{color:this.props.selectItemColor,fontSize: 15}} numberOfLines={1}>
                               {item.name}
                         </Text>
                    </TouchableOpacity>
                    {this.state.selectValue[this.state.topSelectIndex][level].name=='自定义'?
                     <View style={{flexDirection:"row",marginTop:15}}>
                       <DatePicker  style={{width:80,height:26,borderWidth:1,borderColor:"#eaeaea",alignItems:"center",
                       justifyContent:"center",position:"relative",}}   date={this.state.startTime}   mode="datetime"
                         placeholder="起始日期"  format="YYYY/MM/DD" minDate="1980/01/01"  maxDate="2100/01/01"
                         confirmBtnText="确认"  cancelBtnText="取消" showIcon={false}
                         customStyles={{
                                 dateInput: {
                                   height:26,
                                 }
                         }}
                         onDateChange={(date) => {this.setState({startTime: date});this.sendValue(date,'')}}
                       />
                       <Text style={{color:"#ececec"}}> —— </Text>
                       <DatePicker  style={{width:80,height:26,borderWidth:1,borderColor:"#eaeaea",alignItems:"center",
                       justifyContent:"center",position:"relative"}}   date={this.state.endTime}   mode="datetime"
                         placeholder="结束日期"  format="YYYY/MM/DD" minDate="1980/01/01"  maxDate="2100/01/01"
                         confirmBtnText="确认"  cancelBtnText="取消" showIcon={false}
                         customStyles={{
                                 dateInput: {
                                   height:26,
                                 }
                         }}
                         onDateChange={(date) => {this.setState({endTime: date});this.sendValue('',date)}}
                       />
                     </View>
                     :null
                    }
        </View>)
    }else{
      return (<View style={{alignItems:"center"}} key={index} ><TouchableOpacity activeOpacity={1} key={index} onPress={()=>this.itemClick(item,index,level,callback)}
         style={{height: 44,justifyContent: "center",alignItems:"center",width:100,}}>
            <Text style={{color:this.props.tintColor,fontSize: 15}} numberOfLines={1}>
                   {item.name}
             </Text>
        </TouchableOpacity></View>)
    }



  }

  itemClick(item,index,level,callback){
    let _selectValue = this.state.selectValue;
    _selectValue[this.state.topSelectIndex][level] = item;
    if (callback) {
      callback();
    }else {
      let _value=this.state.returnValue;
      _value[this.state.topSelectIndex] = item;
      let  leftIndex =this.state.leftSelectedIndex;
      leftIndex[this.state.topSelectIndex]=1;
      this.setState({returnValue:_value,leftSelectedIndex:leftIndex,selection:_value});
      if(item.name=='自定义'){
        // this.props.handler(this.state.returnValue,this.state.startTime,this.state.endTime);
      }else{
        this.props.handler(this.state.returnValue);
      }
    }
  }
  sendValue(startTime,endTime){
     startTime=startTime?startTime:this.state.startTime;
    endTime=endTime?endTime:this.state.endTime;
    if(startTime && endTime){
      this.props.handler(this.state.returnValue,startTime,endTime);
    }
  }
  render() {
    return (<View style={{backgroundColor:"#fff",flex:1}}>
                {
                  this.props.data.map((rows, index) => <TouchableOpacity activeOpacity={1} key={index} onPress={this.openOrClosePanel.bind(this, index)}
                  style={{height: 50,width:100,alignItems:"center",justifyContent:"center"}}>
                      {this.state.leftSelectedIndex[index]>0 || this.state.selection[index]?
                      <View style={{height: 50,width:80,alignItems:"center",justifyContent:"center",borderBottomWidth:1,borderBottomColor:"#3a8ff3"}}>
                          <Text style={{color: this.props.selectItemColor,fontSize: 15}} numberOfLines={1}>
                            {rows.title}
                          </Text>
                      </View>
                      :
                      <View style={{height: 50,width:80,alignItems:"center",justifyContent:"center",}}>
                          <Text style={{color: this.props.tintColor,fontSize: 15}} numberOfLines={1}>
                            {rows.title}
                          </Text>
                      </View>
                      }
                  </TouchableOpacity>)
                }
                {this.renderActivityPanel()}
          </View>);
  }

}
export default DropDownMenu;
