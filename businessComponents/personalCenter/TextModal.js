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
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/personalCenter/TextModal';
export default class TextModal extends Component {
  constructor(props){
    super(props);
    this.state={
      textVisible:false,
    }
  }
  render() {
    return (
      <View style={[styles.mainView]}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content"/>
            <TouchableHighlight style={[styles.listBtn,styles.positionTop20]} onPress={()=>{this.setState({textVisible:true})}} underlayColor="transparent">
              <Text style={[fonts.btnText_white]}>弹框</Text>
            </TouchableHighlight>
            <Modal animationType={"none"} transparent={true} visible={this.state.textVisible}>
                   <View style={[styles.modalMask]}>
                         <View style={styles.centerView}>
                               <Text>1235</Text>
                         </View>
                   </View>
            </Modal>

      </View>
    );
  }
}
AppRegistry.registerComponent('textModal', () => textModal);
