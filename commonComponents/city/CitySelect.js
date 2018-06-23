import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,TouchableHighlight,Modal,Image,Dimensions,StatusBar
} from 'react-native';

import {fonts} from '../../styles/commonStyle/Font';
import { ModalIndex } from '../modal/ModalIndex';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import {apis} from '../../systemComponents/Remote/ApiStorage';

export default class CitySelect extends Component {
 _open=()=>{
   this.setState({isVisible:true});
 }
 _close=()=>{
   this.setState({isVisible:false});
 }
 constructor(props){
  super(props);
  this.state={
    isVisible:this.props.isVisible,cityData:this.props.cityData,selectIndex:this.props.selectIndex?this.props.selectIndex:null
  }
 }
 componentWillReceiveProps(nextProps) {
   if (nextProps.isVisible) {
     this._open();
     this.setState({selectIndex:nextProps.selectIndex});
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
 async cityClick(index){
   if (index === this.state.selectIndex) {
     if (this.props.onClose) {
        this.props.onClose()
     }
     this._close();
   }else {
     this.setState({selectIndex:index});
     await this.props.cityClick(index);
     //await this._refreshMenuData();
   }

 }
 renderCity(item,index){
   let isSelect = index == this.state.selectIndex;
   return (<TouchableHighlight key={index} style={isSelect?[styles.hotCityTouchRest]:[styles.hotCityTouch]}  underlayColor="transparent" onPress={()=>this.cityClick(index)}>
      <Text style={isSelect?[fonts.bodyText_white]:[fonts.bodyText_Gray]}>{item.text}</Text>
   </TouchableHighlight>)
 }
 _refreshMenuData(){
   storage.remove({key: keys.projectListConditions});
   storage.load({
     key: keys.projectListConditions,
     syncInBackground: false,
     syncParams: {
        url: apis.projectListConditions
     }
   }).then(ret => {
     return ret.json()
   }).then(kv => {
     this.saveToStorage(keys.projectListConditions,kv)
   })
 }
 saveToStorage(key,value){
   storage.save({
     key:key,
     data:value,
     expires: 1000 * 3600
   })
 }
 render() {
   return (
     <Modal onRequestClose={()=>{}} animationType={"none"} transparent={true} visible={this.state.isVisible}>
       <View style={styles.Fullscreen}>
         <View style={styles.cityNav}>
               <TouchableHighlight style={styles.closeBtn} underlayColor="transparent" onPress={() => {
                 if (this.props.onClose) {
                    this.props.onClose()
                 }
                 this._close()
               }}>
                  <Image source={require('../../images/back.png')}/>
               </TouchableHighlight>
               <View style={styles.cityNavText}>
               <Text style={[fonts.t2_Black]}>选择城市</Text>
               </View>
         </View>
         <View style={styles.hotCity}>
               <Text style={[styles.hotCityTitle,fonts.t3_Black]}>城市</Text>
               <View style={styles.hotCityList}>
                   {
                     this.state.cityData.map((item,index)=>this.renderCity(item,index))
                   }
                </View>
         </View>
       </View>
     </Modal>
   );
 }
}

export const styles = StyleSheet.create({
  Fullscreen:{
    flex:1,
    backgroundColor:"#fff",
  },
  cityNav:{
    backgroundColor:"#fff",
    height:64,
    paddingLeft:12,
    paddingTop:20,
    borderColor:"#eaeaea",
    borderBottomWidth:1
  },
  closeBtn:{
    position:"absolute",
    left:0,
    top:20,
    width:70,
    height:44,
    backgroundColor:"transparent",
    justifyContent:"center",
    zIndex:10,
    paddingLeft:15,
  },
  cityNavText:{
    alignItems:"center",
    justifyContent:"center",
    height:44,
  },
  hotCityTitle:{
    paddingLeft:15,
    paddingBottom:15,
    paddingTop:15,
  },
  hotCityList:{
    flexDirection:"row",
    flexWrap:"wrap",
  },
  hotCityTouch:{
    backgroundColor:"#fff",
    alignItems:"center",
    borderRadius:3,
    marginLeft:15,
    marginRight:15,
    height:35,
    marginBottom:15,
    justifyContent:"center",
    borderColor:"#eaeaea",
    borderWidth:1,
    width:(Dimensions.get('window').width-90)/3
  },
  hotCityTouchRest:{
    backgroundColor:"#3a8ff3",
    alignItems:"center",
    borderRadius:3,
    marginLeft:15,
    marginRight:15,
    height:35,
    marginBottom:15,
    justifyContent:"center",
    borderColor:"#3a8ff3",
    borderWidth:1,
    width:(Dimensions.get('window').width-90)/3
  },
  hotCityText:{
    textAlign:"center",
  },
});
