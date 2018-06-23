import React from 'react';
import {
  Text,
  View,
  TextInput,Image
} from 'react-native';

import {fonts} from '../../styles/commonStyle/Font';
import {styles} from './FormStyles';
import ModalPicker from '../ModalPicker/index';


var t = require('tcomb-form-native');

var Component = t.form.Component;

export  class UpSelect extends Component {
  constructor(props) {
    super(props);
    this.state={
      
    }
  }
  getLocals() {
    var locals = super.getLocals();

    //styles
    locals.formGroupStyle=styles.formGroupStyle;
    locals.textboxViewStyle=styles.textboxViewStyle;
    locals.requireLableStyle=[styles.requireLableStyle,fonts.bodyText_Blue];
    locals.controlLabelStyle=[styles.selectControlLabelStyle,fonts.bodyText_Black];
    locals.helpBlockStyle=[styles.helpBlockStyle,fonts.bodyText_Blue];
    locals.errorBlockStyle=[styles.errorBlockStyle,fonts.tinyText_Red];
    locals.selectStyle=[styles.selectStyle];
    locals.selectTextInputValueStyle=[styles.selectTextInputValueStyle,fonts.bodyText_Black];


    //config
    locals.onFocus=locals.config.onFocus;
    locals.requireLable=locals.config.requireLable;
    locals.placeholder=locals.config.placeholder;
    locals.underlineColorAndroid=locals.config.underlineColorAndroid;
    locals.clearButtonMode=locals.config.clearButtonMode;
    locals.returnKeyType=locals.config.returnKeyType;
    locals.placeholderTextColor=locals.config.placeholderTextColor;
    locals.multiline=locals.config.multiline;
    locals.data=locals.config.data;

    if (locals.value) {
      locals.hasError=!locals.value;
      locals.error=locals.config.error;
      let defaultValue = this.getDefault(locals.value,locals.data);
      locals.selectLabel=defaultValue.label;
    }



    locals.renderComponent = (locals)=>{return this.renderComponent(locals);};
    return locals;
  }

  getDefault(index,data){
    let defaultValue = {};
    data.map((item,i)=>{
      if (item.key == index) {
        defaultValue = item
      }
    });
    return defaultValue;
  }

  getTemplate() {

    return function (locals) {
      if (locals.hidden) {
          return null;
        }
      return locals.renderComponent(locals);
    };
  }
  getDefaultText(){

  }

  _onChange(option,locals){
    locals.onChange(option.key);
  }
  renderComponent(locals){
    return (
      <View  style={styles.formGroupStyle}>
         <View style={styles.selectViewStyle}>
               {this.renderRequirelable(locals)}
               {this.renderlable(locals)}
               <ModalPicker data={locals.data} style={locals.selectStyle}
                initValue=""
                cancelText="取消" cancelStyle={{backgroundColor:"#fff"}} optionContainer={{backgroundColor:"#fff"}}
                onChange={(option)=>{ this._onChange(option,locals) }}>
                <TextInput
                    style={[locals.selectTextInputValueStyle]}
                    editable={false}
                    placeholder=""
                    value={locals.selectLabel} />
               </ModalPicker>
               <Image source={require('../../images/dropFlag.png')}/>
         </View>
         {this.renderHelpLable(locals)}
         {this.renderErrorLable(locals)}
    </View>
    )
  }
  renderRequirelable(locals){
    let requireLable = locals.requireLable ? <Text style={locals.requireLableStyle}>{locals.requireLable}</Text> : null;
    if (locals.customRequireLable) {
      requireLable = locals.customRequireLable();
    }
    return requireLable;
  }
  renderlable(locals){
    let lable = locals.label ? <Text style={locals.controlLabelStyle}>{locals.label}</Text> : null;
    if (locals.customLable) {
      lable = locals.customLable();
    }
    return lable;
  }
  renderHelpLable(locals){
    let helpLable = locals.help ? <Text style={locals.helpBlockStyle}>{locals.help}</Text> : null;
    return helpLable;
  }
  renderErrorLable(locals){
    let errorLable = locals.hasError && locals.error ? <Text accessibilityLiveRegion="polite" style={locals.errorBlockStyle}>{locals.error}</Text> : null;
    return errorLable;
  }
}
module.exports = UpSelect;
