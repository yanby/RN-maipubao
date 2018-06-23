import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,TouchableHighlight,Modal,Image
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {fonts} from '../../styles/commonStyle/Font';

export  class Loading extends Component {
 _open=()=>{
   this.setState({isVisible:true});
 }
 _close=()=>{
   this.setState({isVisible:false});
 }
 constructor(props){
  super(props);
  this.state={
    color:"#FFF",isVisible:props.isVisible,text:props.text,isShowImg:this.props.isShowImg?true:false
  }
 }
 componentWillReceiveProps(nextProps) {
   if (nextProps.isVisible) {
     this._open();
     this.setState({text:nextProps.text,isShowImg:nextProps.isShowImg});
   }else {
     this._close();
   }
 }
 componentWillMount() {
   if (this.state.isVisible) {
     this._open();
   }else {
     this._close();
   }
 }
 render() {
   return (
     <Modal onRequestClose={()=>{}} animationType={"none"} transparent={true} visible={this.state.isVisible}>
      <View style={styles.firstEnterView}>
        <View style={this.state.isShowImg?styles.blackCenter:styles.blackCenterWidth}>
        {
          this.state.isShowImg?<Image style={styles.refreshImg} source={require('../../images/refresh.gif')}/>:null
        }

          <Text style={fonts.tinyText_white}>{this.state.text}</Text>
          </View>
      </View>
     </Modal>
   );
 }
}

export const styles = StyleSheet.create({
  flex:{
    flex:1,
  },
  netWork:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#f7f8fa",
  },
  touchBtn:{
    borderRadius:3,
    borderColor:"#eaeaea",
    borderWidth:1,
    paddingTop:12,
    paddingBottom:12,
    paddingLeft:30,
    paddingRight:30,
    marginTop:30,
  },
  firstEnterView:{
    backgroundColor:"transparent",
    alignItems:"center",
    justifyContent:'center',
    flex:1,
  },
  blackCenter:{
    width:80,
    height:85,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"rgba(0,0,0,0.8)",
    borderRadius:6,
  },
  blackCenterWidth:{
    width:200,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"rgba(0,0,0,0.8)",
    borderRadius:6,
  },
  refreshImg:{
    width:30,
    height:30,
    marginBottom:10,
    marginTop:10,
  },
  loadView:{
    alignItems:"center",
    justifyContent:"center",
    paddingTop:15,
    paddingBottom:15,
    flexDirection:"row"
  },
  loadImg:{
    width:17,
    height:17,
    marginRight:10,
  },
  marginTop10:{
    marginTop:10,
  }

});
