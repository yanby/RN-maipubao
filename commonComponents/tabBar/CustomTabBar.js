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


import { apis,sites,staticSite } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import {fonts} from '../../styles/commonStyle/Font';




const defaultIcon = [require('../../images/Index.png'),
              //  require('../../images/Project.png'),
               require('../../images/Business.png'),
               require('../../images/Tourists.png'),
               require('../../images/My.png')];

 const activeInco = [require('../../images/ActiveIndex.png'),
                // require('../../images/ActiveProject.png'),
                require('../../images/ActiveBusiness.png'),
                require('../../images/ActiveTourists.png'),
                require('../../images/ActiveMy.png')];
// const titleInfo = ['首页','项目','业务','客源','我的'];
const titleInfo = ['首页','业务','客源','我的'];


const styles = StyleSheet.create({

    tabView:{
      position:"absolute",
      backgroundColor:"#fff",
      bottom:0,
      left:0,
      width:Dimensions.get('window').width,
      flexDirection:"row",
      paddingTop:10,
      borderTopWidth:1,
      borderColor:"#ececec"
    },
    marginTop10:{
      marginTop:5,
      marginBottom:5,
    },
    redIcon:{
      width:10,
      height:10,
      backgroundColor:'red',
      position:'absolute',
      right:25,
      top:5,
      borderRadius:5,
    },
})

const sonViewStyle4 = StyleSheet.create({
    sonView:{
      alignItems:"center",
      justifyContent:"center",
      width:(Dimensions.get('window').width)/3
    }
})
const sonViewStyle5 = StyleSheet.create({
    sonView:{
      alignItems:"center",
      justifyContent:"center",
      width:(Dimensions.get('window').width)/4
    }
})

export default class CustomTabBar extends Component {
  constructor(props){
    super(props);
    this.state={
      active:this.props.focused,
      barIndex:this.props.barIndex,
      isProject:false,
      checkIndex:this.props.checkIndex,
      user:{},
      sonViewStyle:sonViewStyle4,
      redFlag:false,
    };
  }
  async checkIsLogin(sourceFlag){
    await  storage.load({
      key:keys.currentUser
    }).then(user=>{
      if (!user) {
        Actions.replace('Login',{sourceFlag:sourceFlag})
        return false;
      }else {
        return true;
      }
    }).catch(error=>{
      Actions.replace('Login',{sourceFlag:sourceFlag})
      return false;
    })
  }
  _loadRedFlag(user){
    storage.load({
      key: keys.getRedFlag,
      syncInBackground: false,
      syncParams: {
         url: apis.getRedFlag + '?userId=' + user.id
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json();
      }else{
        return Promise.reject('404')
      }
    }).then(retJson=>{
      this.setState({
        redFlag:retJson
      })
    })
  }

  componentDidMount(){
    this.loadCurrentUser()
  }

  componentWillReceiveProps(nextprops){
    if(nextprops && nextprops.isNeedRefresh == 1){
      this.loadCurrentUser()
    }
  }
  // async componentWillMount(){
  //   await this.loadCurrentUser()
  // }

  renderTab(item,index){
    if (!this.state.sonViewStyle) {
      return null;
    }
    if (!this.state.isProject&&index===1) {
      return null;
    }
    if (this.state.checkIndex === index) {
      if(titleInfo[index] == '我的' && this.state.redFlag){
        return <TouchableHighlight key={index} underlayColor="transparent" onPress={()=>{this.checkPress(index)}}>
              <View style={this.state.sonViewStyle.sonView}>
                    <Image  source={activeInco[index]}/>
                    <Text style={[fonts.tinyText_Gray,styles.marginTop10]}>{titleInfo[index]}</Text>
                    <View style={styles.redIcon}></View>
              </View>
        </TouchableHighlight>
      }else{
      return <TouchableHighlight key={index} underlayColor="transparent">
            <View style={this.state.sonViewStyle.sonView}>
                  <Image  source={activeInco[index]}/>
                  <Text style={[fonts.tinyText_Blue,styles.marginTop10]}>{titleInfo[index]}</Text>
            </View>
      </TouchableHighlight>
    }
    }else {
      if(titleInfo[index] == '我的' && this.state.redFlag){
        return <TouchableHighlight key={index} underlayColor="transparent" onPress={()=>{this.checkPress(index)}}>
              <View style={this.state.sonViewStyle.sonView}>
                    <Image  source={defaultIcon[index]}/>
                    <Text style={[fonts.tinyText_Gray,styles.marginTop10]}>{titleInfo[index]}</Text>
                    <View style={styles.redIcon}></View>
              </View>
        </TouchableHighlight>
      }else{
      return <TouchableHighlight key={index} underlayColor="transparent" onPress={()=>{this.checkPress(index)}}>
            <View style={this.state.sonViewStyle.sonView}>
                  <Image  source={defaultIcon[index]}/>
                  <Text style={[fonts.tinyText_Gray,styles.marginTop10]}>{titleInfo[index]}</Text>
            </View>
      </TouchableHighlight>
      }
    }
  }
  checkPress(checkIndex){
    switch (checkIndex) {
      case 0:
        Actions.reset('Index',{});
        // Actions.Index({});
        break;
      // case 1:
      //   Actions.reset('ProjectIndex',{});
      //   // Actions.ProjectIndex({});
      //   break;
      case 1:
        Actions.reset('MyProject',{});
        // Actions.MyProject({});
        break;
      case 2:
        if (this.state.user) {
            Actions.reset('TouristIndex',{});
        }else {
          Actions.reset('Login',{sourceFlag:'TouristIndex'})
        }
        // Actions.TouristIndex({});
        break;
      case 3:
        if (this.state.user) {
          Actions.reset('PersonalIndex',{});
        }else {
          Actions.reset('Login',{sourceFlag:'PersonalIndex'})
        }

        // Actions.PersonalIndex({});
        break;
      default:
        Actions.reset('Index',{});
        // Actions.Index({});
    }
  }
  loadCurrentUser(){
    storage.load({
      key:keys.currentUser
    }).then(user=>{
      if (user) {
        this._loadRedFlag(user);
        // this.setState({user})
        if (user.projectManager) {
          this.setState({user:user,isProject:true,sonViewStyle:sonViewStyle5});
          // this.setState({isProject:true})
          // this.setState({sonViewStyle:sonViewStyle5})
        }else {
          this.setState({user:user,isProject:false,sonViewStyle:sonViewStyle4});
          // this.setState({isProject:false})
          // this.setState({sonViewStyle:sonViewStyle4})
        }
      }else {
        this.setState({user:null,isProject:false,sonViewStyle:sonViewStyle4});
        //
        // this.setState({user:null})
        // this.setState({isProject:false})
        // this.setState({sonViewStyle:sonViewStyle4})
      }
    }).catch(error=>{
      this.setState({user:null,isProject:false,sonViewStyle:sonViewStyle4});
      // this.setState({user:null})
      // this.setState({isProject:false})
      // this.setState({sonViewStyle:sonViewStyle4})
    })
  }
  render() {
    return (
      <View style={styles.tabView}>
            {
              activeInco.map((item,key)=>{
                return this.renderTab(item,key)
              })
            }
      </View>
    );
  }
}
