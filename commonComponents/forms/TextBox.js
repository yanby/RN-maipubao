import React from 'react';
import {
  Text,
  View,
  TextInput
} from 'react-native';

import {fonts} from '../../styles/commonStyle/Font';
import {styles} from './FormStyles';


var t = require('tcomb-form-native');

var Component = t.form.Component;

var isFirst = true;

export  class UpTextInput extends Component {
  constructor(props) {
    super(props);
  }

  getLocals() {
    var locals = super.getLocals();

    //styles
    locals.formGroupStyle=styles.formGroupStyle;
    locals.textboxViewStyle=styles.textboxViewStyle;
    locals.requireLableStyle=[styles.requireLableStyle,fonts.bodyText_Blue];
    locals.controlLabelStyle=[styles.controlLabelStyle,fonts.bodyText_Black];
    locals.helpBlockStyle=[styles.helpBlockStyle,fonts.bodyText_Blue];
    locals.errorBlockStyle=[styles.errorBlockStyle,fonts.tinyText_Red];
    locals.textboxStyle=[styles.textboxStyle,fonts.bodyText_Gray];

    //config
    locals.onFocus=locals.config.onFocus;
    locals.requireLable=locals.config.requireLable;
    locals.placeholder=locals.config.placeholder;
    locals.underlineColorAndroid=locals.config.underlineColorAndroid;
    locals.clearButtonMode=locals.config.clearButtonMode;
    locals.returnKeyType=locals.config.returnKeyType;
    locals.placeholderTextColor=locals.config.placeholderTextColor;
    locals.multiline=locals.config.multiline;

    locals.customOnChange=locals.config.customOnChange;



    locals.renderComponent = (locals)=>{return this.renderComponent(locals);};
    return locals;
  }


  getTemplate() {

    return function (locals) {
      if (locals.hidden) {
          return null;
        }
      return locals.renderComponent(locals);
    };
  }
  _onChangeText(value,locals){
    locals.customOnChange(locals);
    locals.onChange(value);
  }
  renderComponent(locals){
    return (
      <View style={locals.formGroupStyle}>
        <View style={locals.textboxViewStyle}>
              {this.renderRequirelable(locals)}
              {this.renderlable(locals)}
              {this.renderInput(locals)}
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
  _onChange(locals){
    locals.value=locals.value+'1';
  }
  renderInput(locals){
    return (
      <TextInput
        style={locals.textboxStyle}
        accessibilityLabel={locals.label}
        ref="input"
        autoCapitalize={locals.autoCapitalize}
        autoCorrect={locals.autoCorrect}
        autoFocus={locals.autoFocus}
        blurOnSubmit={locals.blurOnSubmit}
        editable={locals.editable}
        keyboardType={locals.keyboardType}
        maxLength={locals.maxLength}
        multiline={locals.multiline}
        onBlur={locals.onBlur}
        onEndEditing={locals.onEndEditing}
        onFocus={locals.onFocus}
        onLayout={locals.onLayout}
        onSelectionChange={locals.onSelectionChange}
        onSubmitEditing={locals.onSubmitEditing}
        onContentSizeChange={locals.onContentSizeChange}
        placeholderTextColor={locals.placeholderTextColor}
        secureTextEntry={locals.secureTextEntry}
        selectTextOnFocus={locals.selectTextOnFocus}
        selectionColor={locals.selectionColor}
        numberOfLines={locals.numberOfLines}
        underlineColorAndroid={locals.underlineColorAndroid}
        clearButtonMode={locals.clearButtonMode}
        clearTextOnFocus={locals.clearTextOnFocus}
        enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
        keyboardAppearance={locals.keyboardAppearance}
        onKeyPress={locals.onKeyPress}
        returnKeyType={locals.returnKeyType}
        selectionState={locals.selectionState}
        onChangeText={(value) => this._onChangeText(value,locals)}
        onChange={locals.onChangeNative}
        placeholder={locals.placeholder}
        placeholderTextColor={locals.placeholderTextColor}
        value={locals.value}
      />
    );
  }
}
module.exports = UpTextInput;
