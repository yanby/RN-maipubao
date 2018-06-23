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
import {styles} from './modalStyle';
import {fonts} from '../../styles/commonStyle/Font';
import PropTypes from 'prop-types';


export  class ModalIndex extends Component {
  _open=()=>{
    if (this.props.onOpen) {
      this.props.onOpen();
    }
    this.setState({isVisible:true});
  }
  _close=()=>{
    if (this.state.closePrassBtn) {
      this.setState({isVisible:false});
    }
  }
  init(_props){
    let btns = [];
    if (!_props.btns||_props.btns.length<=0){
      switch (_props.modalType){
        case 'alert':
          btns.push({text:'确定'});
          break;
        case 'confirm':
          btns.push({text:'取消'});
          btns.push({text:'确定'});
          break;
        default:
      }
    }else {
      btns = _props.btns;
    }
    if (_props.modalType == 'msg') {
      btns=[];
      _props.customText=()=>{
        return (<View style={[styles.centerView,styles.centerView2]}>
              <Text style={[fonts.t2_gray]}>_props.text</Text>
        </View>);
      }
    }
    let _closePrassBtn = _props.closePrassBtn?false:true;
    this.setState({btns:btns,text:_props.text,customText:_props.customText,isVisible:true,isWholeCustom:_props.isWholeCustom,closePrassBtn:_closePrassBtn});
  }
  constructor(props){
   super(props);
   this.state={
     btns:this.props.btns?this.props.btns:[],
     text:this.props.text?this.props.text:'',
     customText:this.props.customText?this.props.customText:null,
     isVisible:this.props.isVisible?true:false,
     isWholeCustom:this.props.isWholeCustom?true:false,
     closePrassBtn:this.props.closePrassBtn?false:true
   }
 }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isVisible) {
      this.init(nextProps);
      this._open();
    }else {
      this._close();
    }
  }
  componentWillMount() {
    if (this.state.isVisible) {
      this.init(this.props);
      this._open();
    }
  }
  renderBtn(btn,i){
    if(this.state.btns.length<=1){
      return (
        <TouchableHighlight style={styles.btnTouch}  key={i} underlayColor="#3a8ff3"
          onPress={() => {
            this._close();
              if (this.props.onClose) {
                this.props.onClose();
              }
            if (btn.click) {btn.click();}
           }}>
          <Text style={fonts.bodyText_white}>{btn.text}</Text>
        </TouchableHighlight>
       )
    }else if(i==0){
      return(
        <TouchableHighlight style={styles.btnTouch1}
          key={i} underlayColor="#f4f4f4"
          onPress={() => {
            this._close();
              if (this.props.onClose) {
                this.props.onClose();
              }
            if (btn.click) {btn.click();}

        }}>
          <Text style={fonts.bodyText_Black}>{btn.text}</Text>
        </TouchableHighlight>
      )
    }else{
      return(
      <TouchableHighlight style={styles.btnTouch2}
        key={i} underlayColor="#3a8ff3"
        onPress={() => {
          this._close();
            if (this.props.onClose) {
              this.props.onClose();
            }
          if (btn.click) {btn.click();}
      }}>
        <Text style={fonts.bodyText_white}>{btn.text}</Text>
      </TouchableHighlight>
      )
    }

   {
    // return (<TouchableHighlight style={this.props.btns.length>1?i==0?styles.btnTouch1:styles.btnTouch2:styles.btnTouch}
    //   key={i} underlayColor={this.props.btns.length>1?i==0?styles.btnTouch1:styles.btnTouch2:"#3a8ff3"}
    //   onPress={() => {if (btn.click) {btn.click();}
    //   this._close();
    // }}>
    //   <Text style={this.props.btns.length>1?i==0?fonts.bodyText_Black:fonts.bodyText_white:fonts.bodyText_white}>{btn.text}</Text>
    // </TouchableHighlight>);
   }
  }

  render() {
    return (
      <Modal animationType={"none"} transparent={true} visible={this.state.isVisible} onRequestClose={()=>{}}>
            {
              this.state.isWholeCustom?this.state.customText():
              <View style={styles.firstEnterView}>
                     <View style={[styles.centerView]}>
                           {
                             this.state.customText?
                             this.state.customText():
                             <Text style={[fonts.t2_gray,styles.paddingView]}>{this.state.text}</Text>
                           }
                           <View style={[styles.centerBtnView]}>
                                 {this.state.btns?
                                   this.state.btns.map((item,i)=>this.renderBtn(item,i))
                                   :null
                                 }
                           </View>

                     </View>
              </View>
            }

      </Modal>
    );
  }
}
