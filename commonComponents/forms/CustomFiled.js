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

export  class UpCustomFiled extends Component {
  constructor(props) {
    super(props);
  }
  getLocals() {
    var locals = super.getLocals();
    //config
    locals.customRender=locals.config.customRender;
    

    return locals;
  }



  getTemplate() {

    return function (locals) {
      if (locals.hidden) {
          return null;
        }
      return locals.customRender(locals);
    };
  }
}
module.exports = UpCustomFiled;
