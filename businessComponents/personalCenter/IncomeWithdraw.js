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
} from 'react-native';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/personalCenter/IncomeWithdraw';
export default class IncomeWithdraw extends Component {
  render() {
    return (
      <View style={styles.main}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <View style={styles.view}>

        </View>
      </View>
    );
  }
}
AppRegistry.registerComponent('IncomeWithdraw', () => IncomeWithdraw);
