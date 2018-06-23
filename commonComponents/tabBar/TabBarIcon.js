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

const defaultIcon = [require('../../images/Index.png'),
               require('../../images/Project.png'),
               require('../../images/Business.png'),
               require('../../images/Tourists.png'),
               require('../../images/My.png')];

 const activeInco = [require('../../images/ActiveIndex.png'),
                require('../../images/ActiveProject.png'),
                require('../../images/ActiveBusiness.png'),
                require('../../images/ActiveTourists.png'),
                require('../../images/ActiveMy.png')];

export  class TabBarIcon extends Component {
  constructor(props){
    super(props);
    this.state={
      active:this.props.focused,
      barIndex:this.props.barIndex
    };
  }
  renderTab(){
    if (this.state.active) {
      return <View style={styles.TabView}>
        <Image style={styles.SelectTabImg} source={activeInco[this.state.barIndex]}/>

      </View>
    }else {
      return <View style={styles.TabView}>
        <Image style={styles.SelectTabImg} source={defaultIcon[this.state.barIndex]}/>

      </View>
    }
  }
  render() {

    return (
      <View>
      {
        this.renderTab()
      }
    </View>
    );
  }
}
const styles = StyleSheet.create({
  TabView:{
    alignItems:"center",
    width:(Dimensions.get('window').width/4)*1,
  },
  SelectTabImg:{
    marginTop:5,
    marginBottom:2,
    width:22,
    height:22,
  }
});
