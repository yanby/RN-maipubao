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
import { Actions,ActionConst } from 'react-native-router-flux';

import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/appRoot/Expect';
export default class Expect extends Component {
  constructor(props){
    super(props);
    let cityText = ''
    if (this.props.cityText) {
      cityText= this.props.cityText;
    }
    this.state={
      modalObject:{},
      loadingObject:{},
      text:cityText.replace('省','站').replace('市','站'),
    };
  }
  render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
            <View style={[styles.nav]}>
                  <TouchableHighlight style={[styles.backIcon]} underlayColor="transparent" onPress={()=>Actions.pop({})}>
                        <Image source={require('../../images/backWhite.png')}></Image>
                  </TouchableHighlight>
            </View>
            <Image style={styles.img} source={require('../../images/expect_bg.png')}>
                <Text style={styles.txt}>{this.state.text}即将开通</Text>
            </Image>
      </View>
    );
  }
}
AppRegistry.registerComponent('Expect', () => Expect);
