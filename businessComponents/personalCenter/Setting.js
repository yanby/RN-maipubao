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
import {styles} from '../../styles/commonStyle/ListForm';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { apis,sites,staticSite } from '../../systemComponents/Remote/ApiStorage';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class Setting extends Component {
  constructor(props){
    super(props);
  }
  exit(){
    storage.load({
      key: keys.patchOneUser,
      syncInBackground: false,
      syncParams: {
         url: apis.patchOneUser+'/'+this.props.userId,
         body:{
           cid:null,
           platform:null
         }
      }
    }).then(ret => {
      if(ret.status == 200){
        storage.save({
          key:keys.currentUser,
          data:null,
          expires: null
        }).then(res=>{
          Actions.Login({type:'reset',sourceFlag:'exit'});
        });
      }else{
        this.msgShort('退出失败');
      }
    }).catch(err => {
      this.msgShort('请求异常');
    })
  }

  render() {
    return (
      <View >
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <Title isLeftShow={true} backColor={true} isRightBtnShow={false} title={'设置'}/>
        <TouchableHighlight underlayColor="transparent" onPress={()=>Actions.ChangePassword({})}>
              <View style={[styles.listView,styles.listViewLeft]}>
                    <Text style={[styles.listInput,fonts.bodyText_Black]}>修改密码</Text>
                    <Image source={require('../../images/more.png')}></Image>
              </View>
        </TouchableHighlight>

        <TouchableHighlight underlayColor="transparent" onPress={()=>this.exit()}>
              <View style={[styles.settingBtn]}>
                    <Text style={[fonts.bodyText_Black]}>退出登录</Text>
              </View>
        </TouchableHighlight>
      </View>
    );
  }
}
AppRegistry.registerComponent('Setting', () => Setting);
