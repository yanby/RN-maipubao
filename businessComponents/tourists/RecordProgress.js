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
import {styles} from '../../styles/community/DemandInput';
import {Actions,ActionConst } from 'react-native-router-flux';
import ModalPicker from '../../commonComponents/ModalPicker/index';
import {apis,sites,staticSite} from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import BasicComponent from '../basic/BasicComponent';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class RecordProgress extends BasicComponent {
  constructor(props){
      super(props);
      this.state={
        modalObject:{},
        loadingObject:{},
        currentUser:'',
        businessId:this.props.businessId,
        lastFlowType:this.props.lastFlowType,
        flowPic:null,
        failedType:null,
        mark:null,
        endFlowType:this.getEndFlowType(),
      }
  }

  componentWillMount(){
    storage.load({
      key: keys.currentUser
    }).then((retJson) => {this.setState({currentUser:retJson})});
  }

  _upload(){
     this.uploadModal(false,(image)=>{
       image.then(a=>{
         if (a&&a.path) {
           this.closeModal();
           this.openLoading('正在上传');
           this.uploadToRemote(a.path).then(respones=>{
             this.setState({flowPic:a.path});
             this.setState({upimgUrl:respones.url})
             this.closeLoading();
           });
         }
       })
     })
  }

  getEndFlowType(){
    let type=this.props.lastFlowType;
    let businessType=this.props.businessType;
    switch (this.props.lastFlowType) {
      case '报备':
        return '到访';
        break;
      case '到访':
        if(businessType=='销售'){
          return '认购'
        }
        else {
          return '意向'
        }
        break;
      case '认购':
      case '意向':
        return '签约'
        break;
    }
  }

  save(){
    storage.load({
      key: keys.addBusinessFlow,
      syncInBackground: false,
      syncParams: {
         url: apis.addBusinessFlow+'?id='+this.props.businessId,
         body:{
           flowType:this.state.endFlowType,
           flowStatus:this.state.endFlowType+'失败',
           flowMark:this.state.mark,
           flowPic:this.state.upimgUrl,
           failedType:this.state.failedType,
           operatorType:'项目经理',
           operatorId:this.state.currentUser.id,
         }
      }
    }).then(ret => {
      if(ret.status == 200){
        try {
          let type = null;
          switch (this.props.lastFlowType) {
            case '报备':
              type = '到访结束';
              break;
            case '到访':
              type = '认购意向结束';
              break;
            case '认购':
            case '意向':
              type = '签约结束';
              break;
          }
          if(type) {
            storage.load({
              key: keys.businessNotify,
              syncInBackground: false,
              syncParams: {
                url: apis.businessNotify + '?type=' + type + '&businessId=' + this.state.businessId
              }
            }).catch(err => {

            });
          }
        } catch (e) {

        }

        this.closeLoading();
        this.msgShort('保存成功');
        Actions.pop({refresh:{random:Math.random()}});
        // Actions.ProjectCustomerDetails({id:this.props.businessId,projectId:this.props.projectId});
      }else{
        this.closeLoading();
        this.msgShort('保存失败');
      }
    }).catch(err => {
      this.closeLoading();
      this.msgShort('请求异常');
    });
  }


  render() {
    let index = 0;
    const data = [
        { key: index++, section: true, label: '请选择结束进展原因' },
    ];
    switch (this.props.lastFlowType) {
      case '报备':
          data.push({ key: index++, label: '客户未到访' })
          data.push({ key: index++, label: '客户已签约其他项目' })
          data.push({ key: index++, label: '其他' })
        break;
      case '到访':
          data.push({ key: index++, label: '客户无意向' })
          data.push({ key: index++, label: '客户已认购其他项目' })
          data.push({ key: index++, label: '其他' })
        break;
      case '认购':
          data.push({ key: index++, label: '客户未签约' })
          data.push({ key: index++, label: '客户退认购' })
          data.push({ key: index++, label: '客户退签约' })
          data.push({ key: index++, label: '其他' })
        break;
      case '意向':
        data.push({ key: index++, label: '客户未签约' })
        data.push({ key: index++, label: '客户退认购' })
        data.push({ key: index++, label: '客户退签约' })
        data.push({ key: index++, label: '其他' })
        break;
    }

    return (
      <ScrollView style={[styles.container,styles.viewMargin]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <Title isLeftShow={true} backColor={true}  title={'结束进展'} >
        </Title>
        <ScrollView ref={(scrollView) => { _scrollView = scrollView; }} automaticallyAdjustContentInsets={false}>
              <View style={styles.drowView}>
                    <View style={styles.drowViewBtn}>
                           <Text style={[fonts.bodyText_Blue]}>*</Text>
                           <Text style={[fonts.bodyText_Black,styles.flexLabel]}>结束进展原因:</Text>
                           <ModalPicker data={data} style={styles.flexLabel}
                            initValue="Select something yummy!"
                            cancelText="取消" cancelStyle={{backgroundColor:"#fff"}} optionContainer={{backgroundColor:"#fff"}}
                            onChange={(option)=>{this.setState({failedType:option.label})}}>
                            <TextInput
                                style={[fonts.bodyText_Black,styles.textInputValue]}
                                editable={false}
                                placeholder=""
                                value={this.state.failedType} />
                           </ModalPicker>
                           <Image source={require('../../images/dropFlag.png')}/>
                    </View>
              </View>
              <View style={styles.endView}>
                    <Text style={[styles.addText,fonts.bodyText_Black]}>上传凭证</Text>
                    <TouchableHighlight style={[styles.addImg]} onPress={()=>this._upload()}>
                      <View style={[styles.newlistView,styles.newlistViewRest]}>
                        {this.state.flowPic ?
                          <Image style={styles.pzImg} source={{uri:this.state.flowPic}} ></Image>
                          :
                          <Image  source={require('../../images/bigAdd.png')}></Image>
                        }

                      </View>
                    </TouchableHighlight>
              </View>
              <View style={styles.bzView}>
                    <Text style={[fonts.bodyText_Black]}>备注</Text>
                    <View style={styles.newlistView}>
                          <TextInput
                            style={[styles.listInput,fonts.bodyText_Gray,styles.inputPadding]}
                            underlineColorAndroid="transparent"
                            clearButtonMode="always" returnKeyType='done'
                            placeholder="请填写..." multiline={true} placeholderTextColor="#ccc"
                            onChangeText={(text)=>{this.setState({mark:text})}}
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
              <TouchableHighlight style={[styles.listBtn2]} onPress={()=>{this.save()}}>
                    <Text style={[fonts.btnText_white]}>保存</Text>
              </TouchableHighlight>
        </View>
        {this.renderModal()}{this.renderLoading()}
      </ScrollView>

    );
  }
}
AppRegistry.registerComponent('RecordProgress', () => RecordProgress);
