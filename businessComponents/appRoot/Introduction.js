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
  ScrollView
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/appRoot/Introduction';
export default class Introduction extends Component {
  render() {
    return (
      <View style={styles.main}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
            <View style={[styles.nav]}>
                  <TouchableHighlight style={[styles.backIcon]} underlayColor="transparent" onPress={()=>Actions.pop({})}>
                        <Image source={require('../../images/backWhite.png')}></Image>
                  </TouchableHighlight>
            </View>
            <ScrollView>
                  <Image style={styles.img} source={require('../../images/Introduction.png')}>

                  </Image>
            </ScrollView>
      </View>
    );
  }
}
AppRegistry.registerComponent('Introduction', () => Introduction);
