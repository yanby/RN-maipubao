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
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/community/DemandInput';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Actions,ActionConst } from 'react-native-router-flux';
import ListBasicComponent from '../basic/ListBasicComponent';
import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class AddForum extends ListBasicComponent {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let data = [];
    let user ={item:{name:'sasa'}};
    data.push(user);
    data.push(user);
    this.state={
      modalObject:{},
      loadingObject:{},
      dataSource: ds.cloneWithRows(data),
      selected:0,
      tabArrary:[],
      tabsId:[],
      types3: [],
      articleCategory:'',
      value3Index: '',
      title:'',
      content:'',
      articleCategory:'',
      forumId:''

    };
  }
  componentWillMount(){
    //渲染选择tab
    this._chooseType();
    this._getTitle();
   }
  _chooseType(){
    storage.load({
      key: keys.forumListTabs,
      syncInBackground: false,
      syncParams: {
	       url: apis.forumListTabs
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json();
      }else{
         this.msgShort(ret.msg)
      };
    }).then(res => {
        this.closeLoading();
        let newArry=[];
        let tabArrary=this.state.tabArrary;
        let tabsIdArry=[]
        let tabsId=this.state.tabsId;
        let newObject=[];
        let types3=this.state.types3;
        for (var j=0;j<res.length;j++){
          newArry.push(res[j].name);
          tabsIdArry.push(res[j].id);
        }
        for(var i=0; i<newArry.length; i++){
             var obj = {};
             var nObj = obj + i;
             nObj = {
                  label: "",
                  value: ""
             }
             nObj.label = newArry[i];
             nObj.value = tabsIdArry[i];
             newObject.push(nObj)
        }
        this.setState({types3:newObject})
    }).catch(err => {
      this.closeLoading();
      this.msgShort('获取异常')
    })


  }
  // 获取一级标题
  _getTitle(){
    storage.load({
      key: keys.forumTitle,
      syncInBackground: false,
      syncParams: {
	       url: apis.forumTitle
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json();
      }else{
         this.msgShort(ret.msg)
      };
    }).then(res => {
        let forumId=this.state.forumId;
        this.closeLoading();
        this.setState({forumId:res[0].id});
    }).catch(err => {
      this.closeLoading();
      this.msgShort('获取异常')
    })
  }
  // 保存帖子
  async _SaveForum(){
    let articleCategory = await this.state.articleCategory;
    let forumId = await this.state.forumId;
    if(!articleCategory){
      this.msgShort('请选择发帖类型')
      return
    }
    if(!this.state.title){
      this.msgShort('请写下你的问题')
      return
    }
    storage.load({key: keys.currentUser}).then(currentUser => {
        this.openLoading('正在保存...');
        let contentInfo={
            "user": '/users/'+ currentUser.id,
            "articleCategory":"/articleCategories/" + articleCategory ,
            "oneArticleCategory":"/articleCategories/" + forumId,
            "addSource":"APP",
            "auditing":"未审核",
            "title":this.state.title,
            "content":this.state.content
        }
        storage.load({
          key: keys.addForumInfo,
          syncInBackground: false,
          syncParams: {
             url: apis.addForumInfo,
             body:contentInfo
          }
        }).then(ret => {
          if(ret.status == 201){
            return ret.json()
          } else {
            this.msgShort(ret.msg)
          }
        }).then(res => {
            this.closeLoading();
            this.msgShort('提交已成功哦！');
            Actions.ForumList({});
        }).catch(err => {
          this.closeLoading();
          this.msgShort('保存异常')
        })
    }).catch(error=>{})
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
      <Title isLeftShow={true} backColor={true}  title={'发帖子'} >
      </Title>
      <View style={styles.chooseType}>
            <RadioForm formHorizontal={true} animation={true}>
            {this.state.types3.map((obj, i) => {
              var onPress = (value, index) => {
                  this.setState({
                    articleCategory: value,
                    value3Index: index
                  })
                }
                return (
                  <RadioButton labelHorizontal={true} key={i} >
                               <RadioButtonInput
                                  obj={obj}
                                  index={i}
                                  isSelected={this.state.value3Index === i}
                                  onPress={onPress}
                                  buttonInnerColor={'#3a8ff3'}
                                  buttonOuterColor={this.state.value3Index === i ? '#eaeaea' : '#eaeaea'}
                                  buttonSize={10}
                                  buttonOuterSize={18}
                                  buttonWrapStyle={{marginLeft: 10}}
                                />
                                <RadioButtonLabel
                                  obj={obj}
                                  index={i}
                                  onPress={onPress}
                                  labelStyle={{color: '#333'}}
                                  labelWrapStyle={{marginLeft:10,}}
                                />
                  </RadioButton>
                   )
            })}
            </RadioForm>
      </View>
      <View style={[styles.listView]}>
            <Text style={[styles.listViewText,fonts.bodyText_Black]}>请写下你的问题</Text>
            <TextInput
              style={[styles.listInput,fonts.bodyText_Gray,styles.inputRest]}
              underlineColorAndroid="transparent"
              clearButtonMode="always" returnKeyType='done'
              placeholder="请输入问题"
              placeholderTextColor="#ccc"
              maxLength={64}
              onChangeText={(text) => this.setState({title:text})}
            />
      </View>
      <View style={[styles.listView,styles.listViewRest]}>
            <TextInput
              style={[styles.listInput,styles.listInputRest,fonts.bodyText_Gray]}
              underlineColorAndroid="transparent"
              clearButtonMode="always" returnKeyType='done'
              placeholder="请填写相关问题描述"
              placeholderTextColor="#ccc"
              multiline={true}
              maxLength={500}
              onChangeText={(text) => this.setState({content:text})}
            />
      </View>
      <TouchableHighlight style={[styles.listBtn,styles.marginTop20]} underlayColor="#3a8ff3" onPress={()=>this._SaveForum()}>
          <Text style={fonts.bodyText_white}>提交</Text>
      </TouchableHighlight>
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
