import React, { Component,PropTypes } from 'react';
export default class BasicCommonComponent extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  }
  getPropsData(propData,defalut){
    if (this.checkObjectFun(propData)) {
        return propData;
    }
    return defalut;
  }
  checkObjectFun(obj){
    return obj?true:false;
  }
}
