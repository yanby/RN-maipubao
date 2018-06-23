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
  Modal
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';


import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import {fonts} from '../../styles/commonStyle/Font';
import { ModalIndex } from '../../commonComponents/modal/ModalIndex';
import { Loading } from '../../commonComponents/loading/Loading';


const styles = StyleSheet.create({
  listBtn:{
    width:Dimensions.get('window').width-30,
    marginLeft:15,
    marginRight:15,
    justifyContent:"center",
    alignItems:'center',
    borderRadius: 6,
    height:40,
    backgroundColor:'#3a8ff3',
  },
  positionBottom20:{
    position:'absolute',
    bottom:20,
  },
})


export default class SubmitBtn extends Component {
  constructor(props){
    super(props);
    this.state={
      btnText:this.props.btnText?this.props.btnText:'提交',
      callback:this.props.onPress?this.props.onPress:()=>{},
      styles:this.props.styles?this.props.styles:[styles.listBtn,styles.positionBottom20],
      vieStyles:styles.listBtn,
      isVisible:false,
      isNeedLoading:this.props.isNeedLoading,
      loadingText:this.props.loadingText?this.props.loadingText:'正在提交...',
    };
  }
  _onPress(){
    if (!this.state.isNeedLoading) {
      try {
        this.state.callback({closeLoading:()=>{}})
      } catch (e) {

      }
    }else {
      this.setState({isVisible:true})
      try {
        this.state.callback({closeLoading:()=>{this.setState({isVisible:false})}})
      } catch (e) {
        this.setState({isVisible:false})
      }
    }

  }
  renderLoading() {
    return (
      <Loading  isVisible={this.state.isVisible} text={this.state.loadingText} ></Loading>
    )
  }
  render() {
    return (
      <View style={this.state.styles}>
        <TouchableHighlight  style={{width:Dimensions.get('window').width,alignItems:"center"}} underlayColor="transparent" onPress={()=>{this._onPress()}}>
          <Text style={[fonts.btnText_white]}>{this.state.btnText}</Text>
        </TouchableHighlight>
        {this.renderLoading()}
      </View>
    );
  }
}
