import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    TouchableWithoutFeedback
} from 'react-native';

let timeout = null;

export default class CountDown extends Component {

  constructor(props){
    super(props);
    this.state={
        time: this.props.time ? this.props.time : 60,
        enabled: true
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.countDownStart && this.state.enabled) {
      this.setState({
        enabled: false
      });
      this._countdown();
    }
  }

  componentWillUnmount(){
    clearTimeout(timeout)
  }

  render(){
    return (
      <View>
      {
        this.state.enabled ?
          <TouchableHighlight style={styles.wrapper} onPress={() => this._onPress()} underlayColor="transparent">
                <View>
                  <Text style={styles.text}>{this.props.text}</Text>
                </View>
          </TouchableHighlight>
        :
          <TouchableWithoutFeedback >
              <View style={styles.wrapper1}>
                <Text style={styles.text1}>{this.props.text}({this.state.time})</Text>
              </View>
          </TouchableWithoutFeedback>
      }
      </View>
    )
  }

  _onPress(){
    if (this.state.enabled) {
      if(this.props.onPress){
        this.props.onPress();
      }
    }
  }

  _countdown(){
    var timer = () => {
      var time = this.state.time - 1;
      this.setState({time: time});
      if (time > 0) {
        timeout = setTimeout(timer, 1000);
      } else {
        this.setState({
          enabled: true
        });
        this.setState({
          time: this.props.time ? this.props.time : 60
        });
      }
    };
    setTimeout(timer.bind(this), 1000);
  }
}

var styles = StyleSheet.create({
  text: {
    color: '#3a8ff3'
  },
  text1: {
    color: '#fff'
  },
  wrapper: {
    paddingLeft:5,
    paddingRight:5,
    height:24,
    borderWidth:1,
    borderColor:'#3a8ff3',
    justifyContent:"center",
    alignItems:'center',
    borderRadius:4,
    marginTop:10,
  },
  wrapper1: {
    paddingLeft:5,
    paddingRight:5,
    height:24,
    backgroundColor:"#ececec",
    justifyContent:"center",
    alignItems:'center',
    borderRadius:4,
    marginTop:10,
  }
});
