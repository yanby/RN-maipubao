import React, { Component,PropTypes} from 'react';
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
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import {fonts} from '../../styles/commonStyle/Font';
import {nav} from '../../styles/commonStyle/nav';


const styles = StyleSheet.create({
  listBtn:{
    width:Dimensions.get('window').width-30,
    marginLeft:15,
    marginRight:15,
    justifyContent:"center",
    alignItems:'center',
    borderRadius: 6,
    height:40,
    backgroundColor:'#3a8ff3',
  },
  positionBottom20:{
    position:'absolute',
    bottom:20,
  },
})

export class Title extends Component {
  constructor(props){
    super(props);
    console.log(this.props.isLeftShow);
    this.state={
      title:this.props.title,
      btnText:this.props.btnText,
      callback:this.props.onPress?this.props.onPress:()=>{},
      isLeftShow:this.props.isLeftShow,
      isRightSearchShow:this.props.isRightSearchShow,
      isRightBtnShow:this.props.isRightBtnShow,
      urlTitle:this.props.urlTitle,
      backColor:this.props.backColor,
      rightChoose:this.props.rightChoose
    };
  }
  // 返回事件
  _fadeBack(){
    Actions.pop({refresh:{flag:Math.random()}})
  }
  // 搜索事件
  _searchContent(){
    console.log(this.props.onClick);

  }
  // 按钮点击事件
  _btnTouch(index){
    Actions[index].call();
  }
  render() {
    return (
      <View style={this.state.backColor?nav.navDefault:nav.navDark}>
            {this.state.isLeftShow?
             <TouchableHighlight style={[nav.navLeft]} underlayColor="transparent" onPress={()=>{this._fadeBack()}}>
                   <Image source={require('../../images/back.png')}></Image>
             </TouchableHighlight>
             :
             <TouchableHighlight style={[nav.navLeft]} underlayColor="transparent" >
                  <Text style={[fonts.t2_Black]}></Text>
             </TouchableHighlight>
            }
             <View style={[nav.navCenter]}>
                   <Text style={[fonts.t2_Black]}>{this.state.title}</Text>
             </View>
             {this.state.isRightBtnShow?
             <TouchableHighlight style={[nav.navRight]} underlayColor="transparent" onPress={()=>{this._btnTouch(this.state.urlTitle)}}>
                   {this.state.rightChoose?
                     <Text style={fonts.t3_Black}>{this.state.btnText}</Text>
                     :
                     this.props.specifiedImage
                   }
             </TouchableHighlight>
             :null
             }
             {this.state.isRightSearchShow?
             <TouchableHighlight style={nav.navRight} underlayColor="transparent" onPress={this.props.onClick} >
                 <Image  source={require('../../images/search.png')}/>
             </TouchableHighlight>
             :null
             }
      </View>
    );
  }
}
