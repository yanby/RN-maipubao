import React, { Component,PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Dimensions,
  TextInput,
  Modal,
  AsyncStorage
} from 'react-native';
import BasicCommonComponent from './BasicCommonComponent';
import Spinner from 'react-native-loading-spinner-overlay';

export default class SubmitButton extends BasicCommonComponent {

  constructor(props){
    super(props);
    this.state={
      viewStyle:this.getPropsData(this.props.viewStyle,styles.viewStyle),
      submitText:this.getPropsData(this.props.submitText,'保存'),
      submitStyles:{
        touchButtonStyle:this.getPropsData(this.props.submitStyles.touchButtonStyle,styles.touchButtonStyle),
        touchButtonTextStyle:this.getPropsData(this.props.submitStyles.touchButtonTextStyle,styles.touchButtonTextStyle)
      },
      spinnerVisible:false,
      btnEnabled:true,

      modalLayerStyles:{
        MoalViewStyle:this.getPropsData(this.props.ModalLayer.MoalViewStyle,styles.MoalViewStyle),
        ModalCenterViewStyle:this.getPropsData(this.props.ModalLayer.ModalCenterViewStyle,styles.ModalCenterViewStyle),
        ModalViewInfoStyle:this.getPropsData(this.props.ModalLayer.ModalViewInfoStyle,styles.ModalViewInfoStyle),
        ModalBtnViewStyle:this.getPropsData(this.props.ModalLayer.ModalBtnViewStyle,styles.ModalBtnViewStyle),
        ModalBtnStyle:this.getPropsData(this.props.ModalLayer.ModalBtnStyle,styles.ModalBtnStyle),
        ModalBtnTextStyle:this.getPropsData(this.props.ModalLayer.ModalBtnTextStyle,styles.ModalBtnTextStyle)
      },

      modalLayerInfo:this.getPropsData(this.props.ModalLayer.info,'保存成功'),
      modalLayerBtnText:this.getPropsData(this.props.ModalLayer.btnText,'确定'),
      modalViewResult:false,
      modalVisable:false,
      isShowModal:this.props.isShowModal
    }
  }

  async submit(){
    if (!this.state.btnEnabled) {
      return;
    }
    await this.setState({btnEnabled:false,spinnerVisible:true});

    let result = await this.props.submit()?true:false;

    await this.setState({modalViewResult:result});

    await this.setState({spinnerVisible:false});

    if (result) {
      if (this.state.isShowModal) {
        await this.setState({modalVisable:true});
      }else {
        await  this.submitOk();
      }
    }else {
      await this.setState({btnEnabled:!result})
      await  this.submitFail();
    }
  }
  async submitOk(){
    await this.setState({modalVisable:false});
    if (this.props.submitOk) {
      this.props.submitOk();
      this.setState({btnEnabled:true});
    }
  }
  async submitFail(){
    await this.setState({modalVisable:false});
    if (this.props.submitFail) {
      this.props.submitFail();
    }
  }
  render() {
    return (
      <View style={this.state.viewStyle}>
        <TouchableHighlight underlayColor="#e95513" style={this.state.submitStyles.touchButtonStyle} onPress={()=>this.submit()}>
          <Text style={this.state.submitStyles.touchButtonTextStyle}>{this.state.submitText}</Text>
        </TouchableHighlight>
        <Spinner visible={this.state.spinnerVisible}  textStyle={{color: '#FFF'}} />

        <Modal  animationType={"fade"}  transparent={true} visible={this.state.modalVisable}>
            <View style={this.state.modalLayerStyles.MoalViewStyle}>
                  <View style={this.state.modalLayerStyles.ModalCenterViewStyle}>
                        <Text style={this.state.modalLayerStyles.ModalViewInfoStyle}>{this.state.modalLayerInfo}</Text>
                        <TouchableHighlight style={this.state.modalLayerStyles.ModalBtnStyle} underlayColor="#e95513" onPress={()=>{this.submitOk()}}>
                             <Text style={this.state.modalLayerStyles.ModalBtnTextStyle}>{this.state.modalLayerBtnText}</Text>
                        </TouchableHighlight>
                  </View>
            </View>
        </Modal>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  viewStyle:{
    flexDirection:"row",
    flex:1
  },
  touchButtonStyle:{
    backgroundColor:"#e95513",
    borderRadius:3,
    flex:1,
    height:40,
    marginTop:20,
    justifyContent:"center"
  },
  touchButtonTextStyle:{
    textAlign:"center",
    fontSize:13,
        color:"#fff"
  },
  MoalViewStyle:{
    backgroundColor:"rgba(0,0,0,0.8)",
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },
  ModalCenterViewStyle:{
    backgroundColor:"#fff",
    marginLeft:10,
    marginRight:10,
    borderRadius:3,
    paddingLeft:10,
    paddingRight:10,
    paddingTop:30,
  },
  ModalViewInfoStyle:{
    fontSize:16,
    color:"#707070",
    textAlign:"center",
    paddingBottom:15,
  },
  ModalBtnViewStyle:{
    flexDirection:"row",
    justifyContent:"space-between",
  },
  ModalBtnStyle:{
    height:40,
    marginTop:20,
    borderRadius:3,
    alignItems:"center",
    justifyContent:"center",
    marginBottom:10,
    borderColor:"#e95513",
    borderWidth:1,
    backgroundColor:"#e95513",
    width:Dimensions.get('window').width-60
  },
  ModalBtnTextStyle:{
    textAlign:"center",
    fontSize:13,
        color:"#fff",
  }
})
