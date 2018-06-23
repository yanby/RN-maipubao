import React, { Component,PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,AsyncStorage
} from 'react-native';
import ListViewModelItem from './ListViewModelItem';
export default class ListViewModel extends Component {

  constructor(props){
    super(props);
    this.state={
      dataSource:this.getPropsData(this.props.dataSource,[]),
      checkObject:this.getPropsData(this.props.checkObject,[]),
      resultFlag:[],
      isAllowMul:this.getPropsData(this.props.isAllowMul,false),
      btnEnable:!this.checkObjectFun(this.props.checkObject),
      title:this.props.title,
      modelViewStyle:this.getPropsData(this.props.modelViewStyle,styles.modelViewStyle),
      centerViewStyle:this.getPropsData(this.props.centerViewStyle,styles.centerViewStyle),
      titleStyle:this.getPropsData(this.props.titleStyle,styles.titleStyle),
      btnStyle:this.getPropsData(this.props.btnStyle,styles.btnStyle),
      activeBtnStyle:this.getPropsData(this.props.activeBtnStyle,styles.activeBtnStyle),
      btnTextStyle:this.getPropsData(this.props.btnTextStyle,styles.btnTextStyle),
      activeBtnTextStyle:this.getPropsData(this.props.activeBtnTextStyle,styles.activeBtnTextStyle),
      submitBtnStyle:this.getPropsData(this.props.submitBtnStyle,styles.submitBtnStyle),
      submitBtnTextStyle:this.getPropsData(this.props.submitBtnTextStyle,styles.submitBtnTextStyle),
      visible:this.props.visible,
      btnClickEnabled:this.props.btnClickEnabled
    };
  }
  getPropsData(propData,defalut){
    if (this.checkObjectFun(propData)) {
        return propData;
    }
    return defalut;
  }
  async componentWillReceiveProps(nextProps){
    if (nextProps.checkObject&&nextProps.checkObject.length>0) {
      await this.setState({checkObject:nextProps.checkObject});
    }
    if (nextProps.dataSource&&nextProps.dataSource.length>0) {
      await this.setState({dataSource:[]});
      await this.setState({dataSource:nextProps.dataSource});
    }
    this.setState({visible:nextProps.visible});
  }

  check(o1,o2){
    if (this.checkObjectFun(o1)&&this.checkObjectFun(o2)) {
      if (this.props.check!==undefined) {
        return this.props.check(o1,o2);
      }
    }
    return false;
  }
  checkObjectFun(obj){
    return obj?true:false;
  }

  renderBtn(item,i){
    let isCheckItem = false;
    for (var j = 0; j < this.state.checkObject.length; j++) {
      if (this.check(this.state.checkObject[j],item)) {
        let b = this.state.resultFlag.indexOf(i);
        if (b===-1) {
            this.state.resultFlag.push(i);
        }
        isCheckItem = true;
        break;
      }
    }
    return (
      <ListViewModelItem
      index={i}
      key={i}
      initCheck={isCheckItem}
      changeIndex={this.state.changeIndex}//发生改变的index，用来通知其他的btn状态改变
      btnStyle={this.state.btnStyle}
      activeBtnStyle={this.state.activeBtnStyle}
      btnTextStyle={this.state.btnTextStyle}
      activeBtnTextStyle={this.state.activeBtnTextStyle}
      item={item}
      isAllowMul={this.state.isAllowMul}
      enable={this.state.btnEnable}
      btnText={this.props.btnText}
      onPress={(index,isCheck)=>this.btnOnPress(index,isCheck)} />
    )
  }
  async btnOnPress(index,isCheck){
    if (isCheck) {
      let i = this.state.resultFlag.indexOf(index);
      if (i===-1) {
        if (!this.state.isAllowMul) {//当不允许选择多个时
          await this.setState({btnEnable:false,changeIndex:index});
          this.state.resultFlag.length=0;
        }
        this.state.resultFlag.push(index);
      }
    }else {
      let i = this.state.resultFlag.indexOf(index);
      if (i!==-1) {
        if (!this.state.isAllowMul) {//当不允许选择多个时，设置所有当按钮为可以点击状态
          await this.setState({btnEnable:true,changeIndex:index});
        }
        this.state.resultFlag.splice(i, 1);
      }
    }
    if (this.state.btnClickEnabled) {
      this.submit();
    }
  }
  async submit(){
    let resultObject = [];
    let _indexArray =await this.state.resultFlag;
    for (var i = 0; i < _indexArray.length; i++) {
      resultObject.push(this.state.dataSource[_indexArray[i]]);
    }
    this.props.submit(resultObject);
  }
  render() {
    return (
      <View>
      {
        this.state.visible?<ScrollView style={styles.modelViewStyle} visible={false}>
          <View style={this.state.centerViewStyle}>
              {
                this.state.title?
                <Text style={this.state.titleStyle}>{this.state.title}</Text>:null
              }
              {
                this.state.dataSource?this.state.dataSource.map((item,i)=>this.renderBtn(item,i)):null
              }
              {
                !this.state.btnClickEnabled?<TouchableHighlight style={this.state.submitBtnStyle} underlayColor="#e95513" onPress={()=>{this.submit()}}>
                     <Text style={this.state.submitBtnTextStyle}>确定</Text>
                </TouchableHighlight>:null
              }

          </View>
        </ScrollView>:null
      }
      </View>


    )
  }
}
const styles = StyleSheet.create({
  modelViewStyle:{
  },
  centerViewStyle:{
    backgroundColor:"#fff",
    marginLeft:15,
    marginRight:15,
    borderRadius:3,
    paddingTop:0,
    marginTop:15,
  },
  titleStyle:{
    fontSize:18,
    color:"#1b1b1b",
    marginTop:30,
    marginBottom:25,
    textAlign:"center",
  },
  activeBtnStyle:{
    backgroundColor:'#fff',
    borderWidth:1,
    borderColor:"#e95513",
    height:35,
    marginTop:10,
    marginLeft:12,
    marginRight:12,
    borderRadius:3,
    alignItems:"center",
    justifyContent:"center",
  },
  btnStyle:{
    backgroundColor:'#eee',
    height:35,
    marginTop:10,
    marginLeft:12,
    marginRight:12,
    borderRadius:3,
    alignItems:"center",
    justifyContent:"center",
  },
  activeBtnTextStyle:{
    fontSize:15,
    color:"#e95513",
    textAlign:"center",
  },
  btnTextStyle:{
    fontSize:15,
    color:"#959595",
    textAlign:"center",
  },
  submitBtnStyle:{
    backgroundColor:'#e95513',
    height:40,
    marginTop:30,
    marginLeft:63,
    marginRight:63,
    borderRadius:3,
    alignItems:"center",
    justifyContent:"center",
    marginBottom:30,
    marginTop:10,
  },
  submitBtnTextStyle:{
    fontSize:15,
    color:"#fff",
    textAlign:"center",
  },
})
