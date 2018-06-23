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
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/tourists/CommonRecord';
import {apis,sites,staticSite} from '../../systemComponents/Remote/ApiStorage';
import {Actions,ActionConst} from 'react-native-router-flux';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import BasicComponent from '../basic/BasicComponent';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class RecordVisit extends BasicComponent {
  constructor(props){
    super(props);
    this.state={
      modalObject:{},
      loadingObject:{},
      businessId:this.props.businessId,
      imgPath:null,
      mark:null,
      currentUser:null,

    }
  }

  componentWillMount(){
    storage.load({
      key: keys.currentUser
    }).then(retJson => {this.setState({currentUser:retJson})});
  }

  _upload(){
     this.uploadModal(false,(image)=>{
       this._uploadImage(image)
     })
  }

  _uploadImage(image){
    image.then(a=>{
      if (a&&a.path) {
        this.closeModal();
        this.openLoading('正在上传')
        this.uploadToRemote(a.path).then(respones=>{
          this.setState({imgPath:a.path});
          this.setState({upimgUrl:respones.url})
          this.closeLoading()
        });
      }
    })
  }

  save(){
    if (!this.state.upimgUrl) {
      this.msgShort('必须上传凭证图片');
      return;
    }
    storage.load({
      key: keys.addBusinessFlow,
      syncInBackground: false,
      syncParams: {
         url: apis.addBusinessFlow+'?id='+this.props.businessId,
         body:{
           flowType:'到访',
           flowStatus:'到访成功',
           flowMark:this.state.mark,
           flowPic:this.state.upimgUrl,
           operatorType:'项目经理',
           operatorId:this.state.currentUser.id,

         }
      }
    }).then(ret => {
      this.closeLoading();
      if(ret.status == 200){
        try {
          storage.load({
          key: keys.businessNotify,
            syncInBackground: false,
            syncParams: {
               url: apis.businessNotify + '?type=录到访&businessId=' + this.state.businessId
            }
          }).catch(err => {

          });
        } catch (e) {

        }

        this.closeLoading();
        Actions.pop({refresh:{random:Math.random()}});
        // Actions.replace('ProjectCustomerDetails',{id:this.props.businessId,projectId:this.props.projectId});
      }else{
        this.msgShort('保存失败');
      }
    }).catch(err => {
      this.msgShort('请求异常');
    });
  }

  renderImg(){
    if(this.state.imgPath){
      return (<Image style={{width:100,height:100}} source={{uri:this.state.imgPath}}></Image>)
    }
    else{
      return (<Image style={[styles.selectIcon]} source={require('../../images/add.png')}></Image>)
    }
  }

  render() {
    return (
      <View style={[styles.main]}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
            <Title isLeftShow={true} backColor={true}  title={'录到访'} >
            </Title>
            <ScrollView ref={(scrollView) => { _scrollView = scrollView; }} automaticallyAdjustContentInsets={false}>
                  <View style={[styles.view]}>
                        <TouchableHighlight>
                                <View style={[styles.title]}>
                                      <Text style={[fonts.bodyText_Blue]}>*</Text>
                                      <Text style={[styles.titleText,fonts.bodyText_Black]}>到访凭证</Text>
                                </View>
                        </TouchableHighlight>
                  </View>
                  <View style={[styles.view]}>
                        <TouchableHighlight style={[styles.addImg]} onPress={()=>this._upload()}>
                          {this.renderImg()}
                        </TouchableHighlight>
                  </View>
                  <View style={[styles.view]}>
                        <View style={[styles.remarks]}>
                              <Text style={[fonts.bodyText_Black]}>备注：</Text>
                              <TextInput
                                style={[styles.remarksInput,fonts.bodyText_Gray]}
                                multiline={true}
                                underlineColorAndroid="transparent"
                                clearButtonMode="always" returnKeyType='done'
                                placeholder="请填写......"
                                placeholderTextColor="#ccc"
                                onChangeText={(text)=>this.setState({mark:text})}
                                onFocus={() => { _scrollView.scrollTo({y: 100}); }}
                                blurOnSubmit={true}
                              />
                        </View>
                  </View>
            </ScrollView>
            <View style={[styles.viewBtn]}>
                  <TouchableHighlight style={[styles.listNoBtn2]} onPress={()=>{Actions.pop({})}}>
                        <Text style={[fonts.btnText_Gray]}>取消</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={[styles.marginLeft15,styles.listBtn2]} onPress={()=>this.save()}>
                        <Text style={[fonts.btnText_white]}>提交</Text>
                  </TouchableHighlight>
            </View>
            {this.renderModal()}{this.renderLoading()}
      </View>
    );
  }
}
AppRegistry.registerComponent('RecordVisit', () => RecordVisit);
