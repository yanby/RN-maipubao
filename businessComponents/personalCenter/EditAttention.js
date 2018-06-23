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
import { Actions,ActionConst } from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/personalCenter/MemberInfo';
import ListBasicComponent from '../basic/ListBasicComponent';
import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { NiceEditList } from '../../commonComponents/niceList/NiceEditList';
import EditAttentionListItem from '../basic/EditAttentionListItem';
import EditShopListItem from '../project/EditShopListItem';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class EditAttention extends ListBasicComponent {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      resultVisible:false,
      month:[],
      year:this.props.year,
      userId:'',
      remoteUrl: null,
      oriRemoteUrl: null,
      storkey:keys.attentionProjectList,
      storkeyShop:keys.attentionShopList,
      remoteUrlShop: null,
      oriRemoteUrlShop: null,
      checkArrary:[],
      reload:true,
      totalCount:0,
      flag : 0,
    };
  }
  _loadUser(){
    storage.load({key: keys.currentUser}).then(currentUser => {
      this.setState({
        userId:currentUser.id,
        remoteUrl:apis.attentionProjectList + '?userId=' + currentUser.id,
        oriRemoteUrl:apis.attentionProjectList + '?userId=' + currentUser.id
      });
    }).catch(err => {
      this.closeLoading();
      Actions.Login({})
    })
  }

  _loadShop(){
    storage.load({key: keys.currentUser}).then(currentUser => {
      this.setState({
        userId:currentUser.id,
        remoteUrlShop:apis.attentionShopList + '?userId=' + currentUser.id,
        oriRemoteUrlShop:apis.attentionShopList + '?userId=' + currentUser.id
      });
    }).catch(err => {
      this.closeLoading();
      Actions.Login({})
    })
  }
  componentWillMount(){
    storage.load({key: keys.currentShop}).then(ret => {
      if(ret == 1){
        this._loadShop();
      }else{
        this._loadUser();
      }
      this.setState({flag:ret});
    }).catch(err => {
      this._loadUser();
    })
  }

  _del(){
    if(this.state.checkArrary.length ==0){
      this.msgShort("请选择需要删除的项目");
      return
    }
    if(this.state.flag == 1){
      this._delShop();
    }else{
      this._delProject();
    }
  }

  _delProject(){
    this.state.checkArrary.map(
      (arrary,index)=>{
        storage.load({
          key: keys.delAttentionProject,
          syncInBackground: false,
          syncParams: {
    	       url: apis.delAttentionProject + '?userId=' + this.state.userId + '&projectId=' + arrary
          }
        }).then(ret => {
          console.log(ret)
          if(ret.status == 200){
            return ret.json();
          }else{
            this.msgShort('删除异常');
            this.closeLoading();
          };
        }).then(retJson=>{
          if(retJson){
            if(index == this.state.checkArrary.length-1){
              this.msgShort('删除成功');
              let _url = this.state.oriRemoteUrl;
              this.setState({remoteUrl:_url+'&_random_='+Math.random()});
              this.setState({checkArrary:[]});
            }
          }else{
            this.msgShort('删除异常');
            this.closeLoading();
          }
        }).catch(err => {
          this.msgShort('删除异常');
          this.closeLoading();
          return
        })

      }
    )
  }
  _delShop(){
    this.state.checkArrary.map(
      (arrary,index)=>{
        storage.load({
          key: keys.delAttentionShop,
          syncInBackground: false,
          syncParams: {
    	       url: apis.delAttentionShop + '?userId=' + this.state.userId + '&shopId=' + arrary
          }
        }).then(ret => {
          console.log(ret)
          if(ret.status == 200){
            return ret.json();
          }else{
            this.msgShort('删除异常');
            this.closeLoading();
          };
        }).then(retJson=>{
          if(retJson){
            if(index == this.state.checkArrary.length-1){
              this.msgShort('删除成功');
              let _url = this.state.oriRemoteUrlShop;
              this.setState({remoteUrlShop:_url+'&_random_='+Math.random()});
              this.setState({checkArrary:[]});
            }
          }else{
            this.msgShort('删除异常');
            this.closeLoading();
          }
        }).catch(err => {
          this.msgShort('删除异常');
          this.closeLoading();
          return
        })

      }
    )
  }
  _renderProject(){
    if(this.state.flag == 1){
      if(this.state.remoteUrlShop != null){
        return <NiceEditList isMutex={false}
        getTotalCount = {(ret)=>{this.setState({totalCount:ret})}}
        returnCheckArrary={(arrary)=>{this.setState({checkArrary:arrary})}}
        renderItem={(rowData,selectIndexArrary,rowSelect)=>
          <EditShopListItem {...rowData} selectIndexArrary={selectIndexArrary} rowSelect={(index)=>{rowSelect(index)}}  />}
          contentContainerStyle={styles.list}
          remoteUrl={this.state.remoteUrlShop}
          storkey={this.state.storkeyShop}
          isNeedLoading={true}/>
      }else{
        return null
      }
    }else{
      if(this.state.remoteUrl != null){
        return <NiceEditList isMutex={false}
        getTotalCount = {(ret)=>{this.setState({totalCount:ret})}}
        returnCheckArrary={(arrary)=>{this.setState({checkArrary:arrary})}}
        renderItem={(rowData,selectIndexArrary,rowSelect)=>
          <EditAttentionListItem {...rowData} selectIndexArrary={selectIndexArrary} rowSelect={(index)=>{rowSelect(index)}}  />}
          contentContainerStyle={styles.list}
          remoteUrl={this.state.remoteUrl}
          storkey={this.state.storkey}
          isNeedLoading={true}/>
      }else{
        return null
      }
    }

  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
      <Title isLeftShow={true} backColor={true} isRightBtnShow={false} title={'我的关注'}/>
      {
        this._renderProject()
      }
      {
        this.state.totalCount > 0 ?
      <TouchableHighlight style={styles.touchBtn} underlayColor="#3a8ff3" onPress={()=>{this._del()}}>
         <Text style={[fonts.bodyText_white]}>删除</Text>
      </TouchableHighlight>
      :null}
      {
        this.renderModal()
      }
      {
        this.renderLoading()
      }
      </View>
    );
  }
}
AppRegistry.registerComponent('EditAttention', () => EditAttention);
