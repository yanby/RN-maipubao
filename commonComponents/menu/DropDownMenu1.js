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
} from 'react-native';
export class DropDownMenu extends Component {
  constructor(props, context) {
    super(props, context);
    console.log(this.props.data);
    var selectIndex = new Array(this.props.data.length);
    let _selectValue = new Array(this.props.data.length);
    for (var i = 0; i < selectIndex.length; i++) {
      selectIndex[i] = null;
      if (this.props.data[i].type == 'single') {
        _selectValue[i] = [{}]
      }else if (this.props.data[i].type == 'double') {
        _selectValue[i] = [{},{}]
      }else if (this.props.data[i].type == 'third') {
        _selectValue[i] = [{},{},{}]
      }
    }
    this.state = {
      rotationAnims: props.data.map(() => new Animated.Value(0)),
      showMoreBtn: this.props.showMoreBtn,
      doubleList: this.props.doubleList? this.props.doubleList: [],
      topSelectIndex:-1,
      leftSelectIndex:0,
      leftSelectValue:'',
      rightSelectIndex:-1,
      rightSelectValue:'',

      singleData:[],
      doubleData:[],
      thirdData:[],
      returnValue:selectIndex,
      selectValue:_selectValue,
      viewType:'single',
    };
  }
  renderDropDownArrow(index) {
    var icon = this.props.arrowImg? this.props.arrowImg: require('../../images/select.png');
    return (<Animated.Image source={icon} style={{marginLeft: 8,marginRight:8,
        transform: [
          {
            rotateZ: this.state.rotationAnims[index].interpolate({
              inputRange: [
                0, 1,
              ],
              outputRange: [
                '0deg', '360deg',
              ],
            })
          }
        ],
      }}/>);
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
      this.closePanel(index);
      this.setState({topSelectIndex:-1});
    } else {
      if (this.state.topSelectIndex> -1) {
        this.closePanel(this.state.topSelectIndex);
      }
      this.openPanel(index);
      let _sdata = this.props.data[index];
      let dData = this.state.selectValue[index]&&this.state.selectValue[index][0].data?this.state.selectValue[index][0].data:_sdata.data[0].data
      this.setState({
        singleData:_sdata.data,
        doubleData:_sdata.data&&dData?dData:null,
        thirdData:_sdata.data&&_sdata.data[0].data&&_sdata.data[0].data[0].data?_sdata.data[0].data[0].data:null,
      });
      this.setState({viewType:_sdata.type,topSelectIndex:index});

    }
  }
  // 显示所有列表
  renderActivityPanel(){
    // if (this.state.topSelectIndex>-1) {
    //    let index=this.state.topSelectIndex;
    //    for(var i=0;i<this.props.data[index].data.length;i++){
    //      let _menuData = this.props.data[index];
    //     if (_menuData.type == single) {
    //       this.setState({singleData:this.props.data[index].data})
    //       return  this.renderSingle()
    //     }else if (_menuData.type == double) {
    //       this.setState({singleData:this.props.data[index].data,doubleData:this.props.data[index].data[0].data})
    //       return  this.renderDouble()
    //     }else if (_menuData.type == third) {
    //
    //     }
    //     //  if(this.props.data[index].data[i].data){
    //     //    return  this.leftList()
    //     //  }else{
    //     //    return  this.rightList()
    //     //  }
    //    }
    // }else{
    //   return (null);
    // }
    if (this.state.topSelectIndex>-1) {
        if (this.state.viewType == 'single') {
          return  this.renderSingle()
        }else if (this.state.viewType == 'double') {
          return  this.renderDouble()
        }else if (this.state.viewType == 'third') {
          return  this.renderThird()
        }
    }else{
      return null;
    }
  }
  renderSingle(){
    //1、拿到需要render的data
    //2、render
    if (this.state.singleData) {
      return(<View style={{position: 'absolute',left: 0,right: 0,top: 40,bottom: 0}}>
                   <ScrollView style={[{position: 'absolute',top: 0,left: 0,right: 0,backgroundColor: 'white'}]}>
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
      return(<View style={{position: 'absolute',left: 0,right: 0,top: 40,bottom: 0}}>
                 <ScrollView style={[{position: 'absolute',top: 0,left: 0,right: 0,backgroundColor: 'white'}]}>
                   <View style={{flexDirection: "row"}}>
                         <View style={{flex: 1.3}}>
                           {
                             this.state.singleData.map((item, index) => {return this.renderItem(item,index,0,()=>{
                               this.setState({doubleData:item.data})
                             })})
                           }
                         </View>
                         <View style={{flex: 3,borderLeftWidth:1,borderLeftColor:"#F6F6F6"}}>
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
  renderThird(){
    if (this.state.singleData&&this.state.doubleData&&this.state.thirdData) {
      return(<View style={{position: 'absolute',left: 0,right: 0,top: 40,bottom: 0}}>
                 <ScrollView style={[{position: 'absolute',top: 0,left: 0,right: 0,backgroundColor: 'white'}]}>
                   <View style={{flexDirection: "row"}}>
                         <View style={{flex: 1.3}}>
                           {
                             this.state.singleData.map((item, index) => {return this.renderItem(item,index,0,()=>{
                               this.setState({doubleData:item.data})
                             })})
                           }
                         </View>
                         <View style={{flex:1.3,borderLeftWidth:1,borderLeftColor:"#F6F6F6"}}>
                           {
                             this.state.doubleData.map((item, index) => {return this.renderItem(item,index,1,()=>{
                               this.setState({thirdData:item.data})
                             })})
                           }
                         </View>
                         <View style={{flex:1.6,borderLeftWidth:1,borderLeftColor:"#F6F6F6"}}>
                           {
                             this.state.thirdData.map((item, index) => {return this.renderItem(item,index,2)})
                           }
                         </View>
                    </View>
                  </ScrollView>
             </View>
            )
    }
  }
  renderItem(item,index,level,callback){
    return (<TouchableOpacity activeOpacity={1} key={index} onPress={()=>this.itemClick(item,index,level,callback)}
           style={{height: 44,justifyContent: "center",backgroundColor:"#fff",borderBottomWidth:1,borderBottomColor:"#F6F6F6",paddingLeft:15}}>
              {this.state.selectValue&&this.state.selectValue[this.state.topSelectIndex][level]===item?
                <Text style={{color:this.props.selectItemColor,fontSize: 15}} numberOfLines={1}>
                     {item.name}
               </Text>
              :<Text style={{color:this.props.tintColor,fontSize: 15}} numberOfLines={1}>
                     {item.name}
               </Text>
             }
          </TouchableOpacity>)
  }

  itemClick(item,index,level,callback){
    let _selectValue = this.state.selectValue;
    _selectValue[this.state.topSelectIndex][level] = item;
    if (callback) {
      callback();
    }else {
      this.openOrClosePanel(this.state.topSelectIndex);
      let _value=this.state.returnValue;
      _value[this.state.topSelectIndex] = item;
      this.setState({returnValue:_value});
    }
  }
  // 显示右侧列表
  // rightList(){
  //   let index =this.state.topSelectIndex;
  //   var currentTitles = this.props.data[index];
  //   var heightStyle = {};
  //   if (this.props.maxHeight && this.props.maxHeight < currentTitles.length * 44) {
  //     heightStyle.height = this.props.maxHeight;
  //   }
  //   return(<View style={{position: 'absolute',left: 0,right: 0,top: 40,bottom: 0}}>
  //                <ScrollView style={[{position: 'absolute',top: 0,left: 0,right: 0,backgroundColor: 'white'},heightStyle]}>
  //                   {
  //                     this.props.data[index].data.map((rows, index) => <TouchableOpacity activeOpacity={1} key={index} onPress={this.itemOnPressRight.bind(this, index)}
  //                     style={{flex: 1,height: 44,justifyContent: "center",backgroundColor:"#fff",borderBottomWidth:1,borderBottomColor:"#F6F6F6",paddingLeft:15}}>
  //                         <Text style={{color: this.props.tintColor? this.props.tintColor: this.defaultConfig.tintColor,fontSize: 15}} numberOfLines={1}>
  //                           {rows.name}
  //                         </Text>
  //                     </TouchableOpacity>)
  //                   }
  //                 </ScrollView>
  //          </View>
  //         )
  // }
  // 显示左侧列表
  // leftList(){
  //   let index =this.state.topSelectIndex;
  //   let leftSelectIndex=this.state.leftSelectIndex;
  //   var currentTitles = this.props.data[index];
  //   var heightStyle = {};
  //   if (this.props.maxHeight && this.props.maxHeight < currentTitles.length * 44) {
  //     heightStyle.height = this.props.maxHeight;
  //   }
  //   return(<View style={{position: 'absolute',left: 0,right: 0,top: 40,bottom: 0}}>
  //                <ScrollView style={[{position: 'absolute',top: 0,left: 0,right: 0,backgroundColor: 'white'},heightStyle]}>
  //                <View style={{flexDirection: "row"}}>
  //                      <View style={{flex: 1.3}}>
  //                        {
  //                          this.props.data[index].data.map((rows, index) => <TouchableOpacity key={index} activeOpacity={1}
  //                          style={{height: 44,justifyContent: "center",backgroundColor:"#fff",borderBottomWidth:1,borderBottomColor:"#F6F6F6",paddingLeft:15}}
  //                          onPress={this.itemOnPressLeft.bind(this, index)}>
  //                          <Text style={{color: this.props.tintColor? this.props.tintColor: this.defaultConfig.tintColor,fontSize: 15}} numberOfLines={1}>
  //                            {rows.name}
  //                          </Text>
  //                          </TouchableOpacity>)
  //                        }
  //                      </View>
  //                    <View style={{flex: 3,borderLeftWidth:1,borderLeftColor:"#F6F6F6"}}>
  //                      {
  //                        this.props.data[index].data[leftSelectIndex].data.map((rows, index) => <TouchableOpacity key={index} activeOpacity={1} style={{flex: 1,height: 44,justifyContent: "center",backgroundColor:"#fff",borderBottomWidth:1,borderBottomColor:"#F6F6F6",paddingLeft:15}}
  //                        onPress={this.itemOnPressRight.bind(this, index)}>
  //                        <Text style={{color: this.props.tintColor? this.props.tintColor: this.defaultConfig.tintColor,fontSize: 15}} numberOfLines={1}>
  //                          {rows.name}
  //                        </Text>
  //                        </TouchableOpacity>)
  //                      }
  //                    </View>
  //                  </View>
  //                 </ScrollView>
  //          </View>
  //         )
  // }
  // // 左侧列表点击
  // itemOnPressLeft(index){
  //   let leftSelectIndex = this.state.leftSelectIndex;
  //   let leftSelectValue =this.props.data[this.state.topSelectIndex].data[leftSelectIndex].data.value;
  //   this.setState({leftSelectIndex:index,leftSelectValue:leftSelectValue});
  // }
  // // 右侧列表点击
  // itemOnPressRight(index){
  //   if (this.state.topSelectIndex > -1) {
  //     let rightSelectIndex = this.state.rightSelectIndex;
  //     let selectIndex = this.state.selectIndex;
  //         selectIndex[this.state.topSelectIndex] = index;
  //     this.setState({rightSelectIndex:index});
  //     for(var i=0;i<this.props.data[this.state.topSelectIndex].data.length;i++){
  //       if(this.props.data[this.state.topSelectIndex].data[i].data){
  //         // 双列
  //         let rightSelectValue = this.props.data[this.state.topSelectIndex].data[this.state.leftSelectIndex].data[index].value;
  //         // this.props.handler(baseCount + leftIndex, index, this.state.topSelectIndex);
  //       }else{
  //         // 单列
  //         let rightSelectValue = this.props.data[this.state.topSelectIndex].data[index].value;
  //
  //       }
  //     }
  //     // if (this.props.handler) {
  //     //   let baseCount = 0;
  //     //   for (var i = 0; i < this.state.activityIndex; i++) {
  //     //     baseCount += this.state.leftCount[i];
  //     //   }
  //     //   let leftIndex = this.state.activityLeftIndex[this.state.activityIndex] >= 0
  //     //     ? this.state.activityLeftIndex[this.state.activityIndex]
  //     //     : 0;
  //     //   this.props.handler(baseCount + leftIndex, index, this.state.activityIndex);
  //     // }
  //   }
  //   this.openOrClosePanel(this.state.topSelectIndex);
  // }
  renderMenuTitle(item,index){
    let _menuData = this.state.returnValue[index];
    if (_menuData) {
      return _menuData.name;
    }else {
      return item.title;
    }
  }
  render() {
    return (<View style={{backgroundColor:"#fff",height:40,borderBottomWidth:1,borderBottomColor:"#eaeaea",flexDirection: 'row'}}>
                {
                  this.props.data.map((rows, index) => <TouchableOpacity activeOpacity={1} key={index} onPress={this.openOrClosePanel.bind(this, index)}
                  style={{flex: 1,height: 40}}>
                    <View style={{flexDirection: 'row',alignItems: "center",justifyContent: "center",height:40}}>
                      <Text style={{color: this.props.tintColor? this.props.tintColor: this.defaultConfig.tintColor,fontSize: 15}} numberOfLines={1}>
                        {
                          this.renderMenuTitle(rows,index)
                        }
                      </Text>
                      {this.renderDropDownArrow(index)}
                    </View>
                  </TouchableOpacity>)
                }
                {this.renderActivityPanel()}
          </View>);
  }

}
export default DropDownMenu;
