import React, { Component,PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,AsyncStorage
} from 'react-native';

export default class ListViewModelItem extends Component {
  constructor(props){
    super(props);
    this.state={
      btnStyle:this.props.btnStyle,
      activeBtnStyle:this.props.activeBtnStyle,
      btnTextStyle:this.props.btnTextStyle,
      activeBtnTextStyle:this.props.activeBtnTextStyle,
      item:this.props.item,
      isCheck:this.props.initCheck,
      index:this.props.index,
      isAllowMul:this.props.isAllowMul,
      enable:this.props.enable
    };
  }
  getbtnText(item){
    let text = this.props.btnText(item);
    return text;
  }
  async onPress(){
    console.log("123");
    if (!this.state.isAllowMul&&this.state.isCheck) {
      return;
    }
    this.pressBody();
  }
  async pressBody(){
    let checkFlag = !this.state.isCheck;
    await this.setState({isCheck:checkFlag});//变更当前点击按钮的状态
    this.props.onPress(this.state.index,checkFlag);//调用外部onPress事件
  }
  async componentWillReceiveProps(nextProps){
    let _nprops = nextProps;
    this.setState({enable:_nprops.enable});
    if (!this.state.isAllowMul) {//不允许多个
      this.setState({isCheck:_nprops.changeIndex === this.state.index});
    }
  }
  render(){
    return (
      <TouchableHighlight style={this.state.isCheck?this.state.activeBtnStyle:this.state.btnStyle}  underlayColor="#eee" onPress={()=>this.onPress()}>
           <Text style={this.state.isCheck?this.state.activeBtnTextStyle:this.state.btnTextStyle} >{this.getbtnText(this.state.item)}</Text>
      </TouchableHighlight>
    )
  }
}
