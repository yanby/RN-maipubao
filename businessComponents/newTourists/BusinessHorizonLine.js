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
  Modal,
  ListView
} from 'react-native';
import {fonts} from '../../styles/commonStyle/Font';
import {flow} from '../../styles/tourists/BusinessFlow';
export default class BusinessHorizonLine extends Component {
  constructor(props){
    super(props);
    this.state={
      flows:this.props.flows
    };
  }
  componentWillReceiveProps(nextProps){
    this.setState({flows:nextProps.flows})
  }

  renderFlowImg(index){
    if (this.state.flows[index].status==null) {
      return (
        <View style={[flow.flowListView]}>
          <Image source={require('../../images/businessFlow8.png')}></Image>
          <Text style={[flow.colorGray,flow.flowListText]}>{this.state.flows[index].type}</Text>
        </View>
      );
    }else if (this.state.flows[index].status.indexOf('成功')>=0 || this.state.flows[index].status.indexOf('待审核')>=0) {
      return (
        <View style={[flow.flowListView]}>
          <Image source={require('../../images/businessFlow7.png')}></Image>
          <Text style={[flow.colorBlack,flow.flowListText]}>{this.state.flows[index].type}</Text>
        </View>
      );
    } else if(this.state.flows[index].status.indexOf('失败')>=0) {
      return (
        <View style={[flow.flowListView]}>
          <Image source={require('../../images/businessFlow5.png')}></Image>
          <Text style={[flow.colorRed,flow.flowListText]}>{this.state.flows[index].type}</Text>
        </View>
      );
    } else {
      return (
        <View style={[flow.flowListView]}>
          <Image source={require('../../images/jxz.png')}></Image>
          <Text style={[flow.colorBlack,flow.flowListText]}>{this.state.flows[index].type}</Text>
        </View>
      );
    }
  }


  render() {
      return (
        <View style={[flow.horizontalFlow]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
          <Image style={[flow.horizontalLine]} source={require('../../images/horizontalLine.png')}></Image>
          <View>
            <View style={[flow.flowList]}>
              {this.renderFlowImg(0)}
              {this.renderFlowImg(1)}
              {this.renderFlowImg(2)}
              {this.renderFlowImg(3)}
              {this.renderFlowImg(4)}
              {this.renderFlowImg(5)}
            </View>
          </View>
        </View>
      );
  }
}
