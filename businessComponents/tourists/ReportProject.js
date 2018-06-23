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
  ListView,
  ScrollView
} from 'react-native';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/tourists/ReportManagement';
import EditAttentionListItem from '../basic/EditAttentionListItem';
import { Actions,ActionConst } from 'react-native-router-flux';
import { DropDownMenu } from '../../commonComponents/menu/DropDownMenu';
import ListBasicComponent from '../basic/ListBasicComponent';
import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { NiceEditList } from '../../commonComponents/niceList/NiceEditList';
import {Title} from '../../commonComponents/CommentTitle/Title';
import lodash from 'lodash'
export default class ReportProject extends ListBasicComponent {
  constructor(props){
    super(props);
    this.state={
      source: this.props.source,
      projectId: this.props.projectId,
      customerId: this.props.customerId,
      modalObject: {},
      loadingObject: {},
      menuData: null,
      storkey: keys.projectList,
      baseUrl: apis.projectList + '?status=开启' + (this.props.speicialType ? '&specialType=' + this.props.speicialType : ''),
      remoteUrl: null,
      params: [['areaId', null], ['projectBusinessTypeId', null], ['leasePriceConditionId', null], ['salePriceConditionId', null], ['sort', 'sort,desc'], ['projectTypeId', null], ['projectTagIds', null]],
      paramsNews:[['areaId', null], ['projectBusinessTypeId', null], ['leasePriceConditionId', null], ['salePriceConditionId', null], ['sort', 'sort,desc'], ['projectTypeId', null], ['projectTagIds', null]],
      keywords: null,
      checkArrary: [],
      status:[false,false,false],
      currentIndex:0,
      status1:[false,false,false,false,false,false,false,false,false],
      currentIndex1:0,
      status2:[false,false,false,false,false],
      currentIndex2:0,
      classValues: ['sort,desc', 'followNum,desc', 'followNum,asc'],
      projectTypeValues: [null, '100', '200', '300', '400', '500', '600', '700', '1000'],
      projectTagValues: null,
      hotSearches: null,
      historySearch: null
    };
  }

  componentWillMount(){
    this._initData();
    this._initMenuData();
    this._initProjectTagData();
  }

  _initData(){
    if (this.state.source != null){
      storage.save({
        key: keys.reportSource,
        data: this.state.source,
        expires: null
      })
      if(this.state.projectId){
        let checkArrary = []
        checkArrary.push(this.state.projectId)
        this.setState({
          remoteUrl: this.state.baseUrl + '&projectId=' + this.state.projectId + '&sort=sort,desc',
          checkArrary: checkArrary
        })
      } else {
        this.setState({
          remoteUrl: this.state.baseUrl + '&sort=sort,desc'
        })
      }
   } else {
     storage.load({
       key: keys.reportProject
     }).then(reportProject => {
       let checkArrary = []
       checkArrary.push(reportProject)
       this.setState({
         remoteUrl: this.state.baseUrl + '&projectId=' + reportProject,
         checkArrary: checkArrary
       })
     })
   }
  }

  _initMenuData(){
    storage.load({
      key: keys.projectListConditions,
      syncInBackground: false,
      syncParams: {
         url: apis.projectListConditions
      }
    }).then(ret => {
      if (ret.json) {
        return ret.json()
      }
      return ret
    }).then(kv => {
      this.setState({
        menuData: kv[0],
        menuDataValue: kv[1]
      })
    })
  }

  _initProjectTagData(){
    storage.load({
      key: keys.projectTags,
      syncInBackground: false,
      syncParams: {
         url: apis.projectTags + '?sort=sort,desc'
      }
    }).then(ret => {
      return ret.json()
    }).then(content => {
      this.setState({
        projectTagValues: content._embedded.projectTags
      })
    })
  }

  _initSearchData(){
    storage.load({
      key: keys.hotSearchList,
      syncInBackground: false,
      syncParams: {
         url: apis.hotSearchList + '?sort=sort,desc'
      }
    }).then(ret => {
      return ret.json()
    }).then(content => {
      this.setState({
        hotSearchList: content._embedded.hotSearches
      })
    })
    storage.load({
      key:keys.historySearchList
    }).then(historySearch => {
      this.setState({
        historySearch: historySearch
      })
    }).catch(error => {
    })
  }

  _search(params){
    this.setState({
      remoteUrl: this.state.baseUrl + '&keywords=' + params.keywords
    });
    this.closeModal()
  }

  _emptySearchHistory(){
    storage.save({
      key: keys.historySearchList,
      data: [],
      expires: null
    });
    this.setState({
      historySearch: []
    })
  }

  _delSearchHistory(keywords){
    storage.load({
      key:keys.historySearchList
    }).then(historySearch => {
      historySearch.pop(keywords)
      storage.save({
        key: keys.historySearchList,
        data: historySearch,
        expires: null
      });
      this.setState({
        historySearch: historySearch
      })
    }).catch(error => {
    })
  }

  // 搜索弹框
  searchContent(){
    this.content(
      {
        isWholeCustom:true,
        customText:()=>{
          return (<View style={[styles.modalMask]}>
                <View style={styles.centerView}>
                      <View style={styles.searchTop}>
                            <View style={styles.searchInput}>
                                  <Image  source={require('../../images/search.png')}/>
                                  <TextInput style={[styles.searchIputRest,fonts.bodyText_Black]} autoFocus={true}
                                    underlineColorAndroid="transparent"
                                    placeholder="请输入项目名称或关键字" clearButtonMode="always" returnKeyType='send'
                                    onEndEditing={()=>this._onPressSearch()} onSubmitEditing={()=>this._onSubmitEditing()}
                                    placeholderTextColor="#898989"
                                    onChangeText={(text) => this.setState({keywords: text})}/>
                            </View>
                            <TouchableHighlight style={styles.cancelBtn} underlayColor="transparent" onPress={()=>{this.closeModal()}}>
                                <Text style={[fonts.bodyText_Black]}>取消</Text>
                            </TouchableHighlight>
                      </View>
                      {
                        this.state.hotSearchList && this.state.hotSearchList.length > 0 ?
                          <View style={styles.recommendView}>
                            <Text style={[fonts.bodyText_Black]}>最近热搜</Text>
                            <View style={styles.Recommend}>
                              {
                                this.state.hotSearchList.map((hotSearch, i) => {
                                  return (
                                    <TouchableHighlight key={i} style={styles.recommendTouch} underlayColor="transparent" onPress={()=>this._search({keywords: hotSearch.keywords})}>
                                      <Text style={fonts.hintText_Gray}>{hotSearch.keywords}</Text>
                                    </TouchableHighlight>
                                  )
                                })
                              }
                            </View>
                          </View>
                        : null
                      }
                      {
                        this.state.historySearch && this.state.historySearch.length > 0 ?
                          <View style={styles.historyView}>
                            <View style={styles.historyViewSon}>
                              <Text style={[fonts.bodyText_Black,styles.historyText]}>搜索历史</Text>
                              <TouchableHighlight style={styles.delectTouch} underlayColor="transparent" onPress={() => this._emptySearchHistory()}>
                                <Text style={[fonts.hintText_Gray]}>X</Text>
                              </TouchableHighlight>
                            </View>
                            {
                              this.state.historySearch.map((keywords, i) => {
                                return (
                                  <View style={styles.historyViewSon} key={i}>
                                    <TouchableHighlight style={styles.delectTouch} underlayColor="transparent" onPress={()=>this._search({keywords: keywords})}>
                                      <Text style={[fonts.bodyText_Gray,styles.historyText]}>{keywords}</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight style={styles.delectTouch} underlayColor="transparent" onPress={()=>this._delSearchHistory({keywords: keywords})}>
                                      <Text style={[fonts.hintText_Gray]}>X</Text>
                                    </TouchableHighlight>
                                  </View>
                                )
                              })
                            }
                          </View>
                        : null
                      }
                </View>
          </View>);
        }
      })
  }

  // 更多弹框
  _moreContent(){
    this.content(
      {
        isWholeCustom:true,
        customText:()=>{
          return (
            <View style={[styles.mask]}>
                <View style={styles.centerView}>
                      <View style={styles.moreNav}>
                            <TouchableHighlight style={styles.moreNavIcon} underlayColor="transparent" onPress={()=>{this.closeModal()}}>
                                <Image source={require('../../images/back.png')}/>
                            </TouchableHighlight>
                            <View style={styles.moreNavTitle}><Text style={fonts.t2_Black}>更多筛选</Text></View>
                      </View>
                      <ScrollView style={styles.moreMain}>
                            <View style={styles.moreMainTitle}>
                                  <Text style={fonts.t3_Black}>关注度（单选）</Text>
                            </View>
                            <View style={styles.moreMainList}>
                                  <TouchableHighlight style={this.state.status[0]?[styles.listTextSelect]:[styles.listText]} underlayColor="transparent" onPress={()=>this.addClass(0)}>
                                        <Text style={this.state.status[0]?[fonts.hintText_Blue]:[fonts.hintText_Gray]}>默认排序</Text>
                                  </TouchableHighlight>
                                  <TouchableHighlight style={this.state.status[1]?[styles.listTextSelect]:[styles.listText]} underlayColor="transparent" onPress={()=>this.addClass(1)}>
                                        <Text style={this.state.status[1]?[fonts.hintText_Blue]:[fonts.hintText_Gray]}>关注度由高到低</Text>
                                  </TouchableHighlight>
                                  <TouchableHighlight style={this.state.status[2]?[styles.listTextSelect]:[styles.listText]} underlayColor="transparent" onPress={()=>this.addClass(2)}>
                                        <Text style={this.state.status[2]?[fonts.hintText_Blue]:[fonts.hintText_Gray]}>关注度由低到高</Text>
                                  </TouchableHighlight>
                            </View>
                            <View style={styles.moreMainTitle}>
                                  <Text style={fonts.t3_Black}>项目类型（单选）</Text>
                            </View>
                            <View style={styles.moreMainList}>
                                  <TouchableHighlight style={this.state.status1[0]?[styles.listTextSelect]:[styles.listText]} underlayColor="transparent" onPress={()=>this.addProject(0)}>
                                        <Text style={this.state.status1[0]?[fonts.hintText_Blue]:[fonts.hintText_Gray]}>全部</Text>
                                  </TouchableHighlight>
                                  <TouchableHighlight style={this.state.status1[1]?[styles.listTextSelect]:[styles.listText]} underlayColor="transparent" onPress={()=>this.addProject(1)}>
                                        <Text style={this.state.status1[1]?[fonts.hintText_Blue]:[fonts.hintText_Gray]}>城市综合体</Text>
                                  </TouchableHighlight>
                                  <TouchableHighlight style={this.state.status1[2]?[styles.listTextSelect]:[styles.listText]} underlayColor="transparent" onPress={()=>this.addProject(2)}>
                                        <Text style={this.state.status1[2]?[fonts.hintText_Blue]:[fonts.hintText_Gray]}>购物中心／商场</Text>
                                  </TouchableHighlight>
                                  <TouchableHighlight style={this.state.status1[3]?[styles.listTextSelect]:[styles.listText]} underlayColor="transparent" onPress={()=>this.addProject(3)}>
                                        <Text style={this.state.status1[3]?[fonts.hintText_Blue]:[fonts.hintText_Gray]}>商业街</Text>
                                  </TouchableHighlight>
                                  <TouchableHighlight style={this.state.status1[4]?[styles.listTextSelect]:[styles.listText]} underlayColor="transparent" onPress={()=>this.addProject(4)}>
                                        <Text style={this.state.status1[4]?[fonts.hintText_Blue]:[fonts.hintText_Gray]}>商业裙楼</Text>
                                  </TouchableHighlight>
                                  <TouchableHighlight style={this.state.status1[5]?[styles.listTextSelect]:[styles.listText]} underlayColor="transparent" onPress={()=>this.addProject(5)}>
                                        <Text style={this.state.status1[5]?[fonts.hintText_Blue]:[fonts.hintText_Gray]}>社区商业</Text>
                                  </TouchableHighlight>
                                  <TouchableHighlight style={this.state.status1[6]?[styles.listTextSelect]:[styles.listText]} underlayColor="transparent" onPress={()=>this.addProject(6)}>
                                        <Text style={this.state.status1[6]?[fonts.hintText_Blue]:[fonts.hintText_Gray]}>专业市场</Text>
                                  </TouchableHighlight>
                                  <TouchableHighlight style={this.state.status1[7]?[styles.listTextSelect]:[styles.listText]} underlayColor="transparent" onPress={()=>this.addProject(7)}>
                                        <Text style={this.state.status1[7]?[fonts.hintText_Blue]:[fonts.hintText_Gray]}>主题商业</Text>
                                  </TouchableHighlight>
                                  <TouchableHighlight style={this.state.status1[8]?[styles.listTextSelect]:[styles.listText]} underlayColor="transparent" onPress={()=>this.addProject(8)}>
                                        <Text style={this.state.status1[8]?[fonts.hintText_Blue]:[fonts.hintText_Gray]}>其他</Text>
                                  </TouchableHighlight>
                            </View>
                            <View style={styles.moreMainTitle}>
                                  <Text style={fonts.t3_Black}>特色标签</Text>
                            </View>
                            {this.state.projectTagValues ?
                              <View style={styles.moreMainList}>
                                <TouchableHighlight style={this.state.status2[0]?[styles.listTextSelect]:[styles.listText]} underlayColor="transparent" onPress={()=>this.addFlag(0)}>
                                      <Text style={this.state.status2[0]?[fonts.hintText_Blue]:[fonts.hintText_Gray]}>全部</Text>
                                </TouchableHighlight>
                                {
                                  this.state.projectTagValues.map((projectTag, i) => {
                                    return (
                                      <TouchableHighlight style={this.state.status2[i + 1]?[styles.listTextSelect]:[styles.listText]} underlayColor="transparent" onPress={()=>this.addFlag(i + 1)} key={projectTag.id}>
                                        <Text style={this.state.status2[i + 1]?[fonts.hintText_Blue]:[fonts.hintText_Gray]}>{projectTag.name}</Text>
                                      </TouchableHighlight>
                                    )
                                  })
                                }
                              </View>
                            : null}
                      <View style={[styles.viewBtn]}>
                            <TouchableHighlight style={[styles.listNoBtn2]} underlayColor="transparent" onPress={() => {this._onEmptyConditions()}}>
                                  <Text style={[fonts.btnText_Gray]}>清空</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={[styles.listBtn2]} underlayColor="#3a8ff3" onPress={() => {this._onSaveConditions()}}>
                                  <Text style={[fonts.btnText_white]}>保存</Text>
                            </TouchableHighlight>
                      </View>
                      </ScrollView>
                </View>
            </View>
            );
            }
            })
  }

  // 当文本输入结束后调用此回调函数。
  _onPressSearch(){

  }
  // 此回调函数当软键盘的确定/提交按钮被按下的时候调用此函数
  _onSubmitEditing(){
    if(this.state.keywords) {
      storage.load({
        key: keys.reportSource
      }).then(reportSource => {
        if(reportSource != 1){
          storage.load({
            key:keys.historySearchList
          }).then(historySearch => {
            historySearch.unshift(this.state.keywords)
            if(historySearch.length == 9) {
              historySearch.pop()
            }
            storage.save({
              key: keys.historySearchList,
              data: historySearch,
              expires: null
            });
          }).catch(error => {
            let historySearch = [this.state.keywords];
            storage.save({
              key: keys.historySearchList,
              data: historySearch,
              expires: null
            });
          })
          this.setState({
            remoteUrl: this.state.baseUrl + '&keywords=' + this.state.keywords
          });
        }
      })
    }
    this.closeModal()
  }

  _menuChange(selection,row){
    storage.load({
      key: keys.reportSource
    }).then(reportSource => {
      if(reportSource != 1){
        let paramsString = ''
        let params = this.state.params
        let paramsNews = this.state.paramsNews
        if(selection == 2 || selection == 3 ){
          params = lodash.cloneDeep(paramsNews);
          params[selection][1] = this.state.menuDataValue[selection][row]
        }else{
          params[selection][1] = this.state.menuDataValue[selection][row]
          paramsNews[selection][1] = this.state.menuDataValue[selection][row]
        }
        params.forEach(param => {
          if(param[1]) {
              paramsString = '&' + param[0] + '=' + param[1] + paramsString
          }
        })
        this.setState({
          params: params,
          paramsNews: paramsNews,
          remoteUrl: this.state.baseUrl + paramsString
        });
      }
    })
  }

  _nextStep(){
    if(this.state.checkArrary.length == 0){
      this.msgShort('请选择项目');
      return
    }
    storage.save({
      key: keys.reportProject,
      data: this.state.checkArrary[0],
      expires: null
    })
    let params = {source: 1, projectId: this.state.checkArrary[0]}
    if(this.state.customerId) {
      params.customerId = this.state.customerId
    }
    Actions.ReportCustom(params)
  }

  _cancel(){
    storage.load({
      key: keys.reportSource
    }).then(reportSource => {
      if(reportSource == 0){
        Actions.pop({})
      } else if(reportSource == 1){
        Actions.pop({})
      } else if(reportSource == 2){
        Actions.pop({})
      }
    })
  }

  // 关注度选择
  async  addClass(index) {
    let showState = this.state.status;
    showState[this.state.currentIndex] = false;
    showState[index] = !showState[index];
    await this.setState({status:showState});
    await this.setState({currentIndex:index});
  }
  // 项目类型选择
  async addProject(index){
    let showState = this.state.status1;
    showState[this.state.currentIndex1] = false;
    showState[index] = !showState[index];
    await this.setState({status1:showState});
    await this.setState({currentIndex1:index});
  }
  // 特色标签选择
  async addFlag(index){
    let showState = this.state.status2;
    showState[this.state.currentIndex2] = false;
    showState[index] = !showState[index];
    await this.setState({status2:showState});
    await this.setState({currentIndex2:index});
  }

  async _onEmptyConditions(){
    storage.load({
      key: keys.reportSource
    }).then(reportSource => {
      if(reportSource != 1){
        let showState = this.state.status;
        showState[this.state.currentIndex] = false;
        let showState1 = this.state.status1;
        showState1[this.state.currentIndex1] = false;
        let showState2 = this.state.status2;
        showState2[this.state.currentIndex2] = false;
        this.setState({
          status: showState,
          status1: showState1,
          status2: showState2,
          currentIndex: 0,
          currentIndex1: 0,
          currentIndex2: 0
        });
        this._onSaveConditions();
      } else {
        this.closeModal();
      }
    })
  }

  _onSaveConditions(){
    storage.load({
      key: keys.reportSource
    }).then(reportSource => {
      if(reportSource != 1){
        let paramsString = ''
        let params = this.state.params
        params[4][1] = this.state.classValues[this.state.currentIndex]
        params[5][1] = this.state.projectTypeValues[this.state.currentIndex1]
        if (this.state.currentIndex2 == 0) {
          params[6][1] = null
        } else if (this.state.currentIndex2 > 0) {
          params[6][1] = this.state.projectTagValues[this.state.currentIndex2 - 1].id
        }

        params.forEach(param => {
          if(param[1]) {
            paramsString = '&' + param[0] + '=' + param[1] + paramsString
          }
        })
        this.setState({
          params: params,
          remoteUrl: this.state.baseUrl + paramsString
        });
      }
    })
    this.closeModal()
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
      <Title isLeftShow={true} backColor={true} isRightSearchShow={true} rightChoose={true} title={'客户报备'}  onClick={() => {this.searchContent()}} >
      </Title>
      <View style={styles.reportState}>
            <View style={styles.reportView}>
                  <Text style={[fonts.hintText_Gray,styles.flexView]}>选择报备项目</Text>
                  <Text style={[fonts.hintText_Gray,styles.flexView]}>选择报备客户</Text>
                  <Text style={[fonts.hintText_Gray,styles.flexView]}>填写报备信息</Text>
            </View>
            <Image  source={require('../../images/bb1.png')}/>
      </View>
      {this.state.menuData ?
        <View style={styles.dropdownView}>
              <DropDownMenu style={styles.downView} showMoreBtn={true} doubleList={[2]}
                            arrowImg={require('../../images/select.png')}      //set the arrow icon, default is a triangle
                            checkImage={require('../../images/tab.png')}    //set the icon of the selected item, default is a check mark
                            bgColor={"#fff"}                            //the background color of the head, default is grey
                            tintColor={"#333"}                        //the text color of the head, default is white
                            selectItemColor={"#3a8ff3"}                    //the text color of the selected item, default is red
                            data={this.state.menuData}
                            maxHeight={410}                            // the max height of the menu
                            handler={(selection, row) => this._menuChange(selection, row)}>
                            {this.state.remoteUrl ?
                              <NiceEditList
                                isMutex={true}
                                selectIndexArrary={this.state.checkArrary}
                                returnCheckArrary={(arrary) => {this.setState({checkArrary: arrary})}}
                                renderItem={(rowData,selectIndexArrary,rowSelect) => <EditAttentionListItem {...rowData} selectIndexArrary={selectIndexArrary} rowSelect={(index) => {rowSelect(index)}} />} contentContainerStyle={styles.list} remoteUrl={this.state.remoteUrl} storkey={this.state.storkey}  isNeedLoading={true} />
                            : null}
          </DropDownMenu>
          <TouchableHighlight  underlayColor="transparent" onPress={()=>{this._moreContent()}} style={{height:40,width:80,alignItems: "center", justifyContent: "center",position:'absolute',right:0,top:0}}>
                <View style={{flexDirection: 'row',position:'relative'}}>
                      <Text style={{flex: 1,textAlign:'center',fontSize:15,color:'#333',}} >更多</Text>
                      <Image style={{position:'absolute',right:10,top:5,}} source={require('../../images/select.png')}/>
                </View>
          </TouchableHighlight>
        </View>
      : null}
      <View style={styles.btnView}>
            <TouchableHighlight style={styles.touchBtn,styles.touchBtnRest} underlayColor="transparent" onPress={() => this._cancel()}>
                 <Text style={fonts.btnText_Gray}>取消</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.touchBtn} underlayColor="#3a8ff3" onPress={() => this._nextStep()}>
                 <Text style={fonts.bodyText_white}>下一步</Text>
            </TouchableHighlight>
      </View>
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
