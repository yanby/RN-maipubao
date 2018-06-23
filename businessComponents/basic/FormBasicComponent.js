import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableHighlight,
  Image
} from 'react-native';
var t = require('tcomb-form-native');
import {fonts} from '../../styles/commonStyle/Font';

import BasicComponent from './BasicComponent';

var textbox = require('../../commonComponents/forms/TextBox');
var mulTextBox = require('../../commonComponents/forms/MulTextBox');
var customFiled = require('../../commonComponents/forms/CustomFiled');
var selectFiled = require('../../commonComponents/forms/Select');



export default class FormBasicComponent extends BasicComponent {
  constructor(props){
    super(props);
  }
  val(){
    var uv = {
      mustbe:t.refinement(t.String, function (s) {
        if (!s) {
          return false;
        }
        return true;
      })
    }
    return uv;
  }
  renderForm(_from){
    let Form = t.form.Form;
    return(
      <Form
        ref="form"
        type={_from.type}
        options={_from.options}
        value={_from.value}
        
      />
    );
  }
  textField(field,config){
    var _field = field;
    _field.config = config;
    _field.config.underlineColorAndroid="transparent";
    _field.config.clearButtonMode="always";
    _field.config.placeholderTextColor="#ccc";
    _field.factory = textbox;
    _field.config.error = field.error;
    _field.config.customOnChange=(locals)=>{
      this.refs.form.getValue();
    }
    return _field;
  }
  mulTextField(field,config){
    var _field = field;
    _field.config = config;
    _field.config.underlineColorAndroid="transparent";
    _field.config.clearButtonMode="always";
    _field.config.placeholderTextColor="#ccc";
    _field.factory = mulTextBox;
    _field.config.error = field.error;
    return _field;
  }
  customField(field,config){
    var _field = field;
    _field.config = config;
    _field.factory = customFiled;
    _field.config.error = field.error;
    return _field;
  }
  lineFiled(){
    return this.customField({},{customRender:()=>{ return (
      <View style={[pageStyle.viewLine]}>
      </View>
    )}});
  }
  titleFiled(title){
    return this.customField({},{customRender:()=>{ return (
      <View style={[pageStyle.title]}>
          <Text style={[pageStyle.titleText,fonts.t3_Black]}>{title}</Text>
      </View>
    )}});
  }
  selectFiled(field,config){
    var _field = field;
    _field.config = config;
    _field.factory=selectFiled;
    _field.config.error = field.error;
    return _field;
  }
}

const pageStyle =StyleSheet.create({
  viewLine:{
    height:10,
  },
  title:{
    height:44,
    justifyContent:"center",
    alignItems:'center',
    flexDirection:"row",
    paddingLeft:15,
    paddingRight:15,
    backgroundColor:'#fff',
    borderBottomWidth:1,
    borderBottomColor:'#eaeaea',
  },
  titleText:{
    flex:1,
  }
})
