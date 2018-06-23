import React, {Component} from 'react';
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
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Actions, ActionConst,} from 'react-native-router-flux';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/commonStyle/ListForm';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import {apis, sites, staticSite,} from '../../systemComponents/Remote/ApiStorage';
import BasicComponent from '../basic/BasicComponent';
import {UMengAnalytics} from '../../commonComponents/umeng/UMAnalytics';
import {Title} from '../../commonComponents/CommentTitle/Title';
import lodash from 'lodash'
export default class Brander extends BasicComponent {

  constructor(props) {
    super(props);
    this.state = {
      modalObject: {},
      loadingObject: {},
      roleType: '品牌人',
      userId: '',
      name: '',
      brands: [
        {
          name: '',
          shopPlan: '',
          areas: [],
          propertyNeed: ''
        }
      ],
      brandName: '',
      brandArea: '',
      shopPlan: '',
      propertyNeed: '',
      positionName: '',
      visitingCardPic: '',
      showModal: false,
      selectLeftIndex: 0,
      selectRightIndex: -1,
      tempArray: [],
      finalArray: [
        []
      ],
      allCount: 0,
      currentSelectBrandIndex: 0,
      brandAreas: [
        {
          id: 1,
          name: '全国',
          subUserBrandAreas: [
            {
              id: 3,
              name: '不限'
            }
          ]
        }, {
          id: 2,
          name: '华北',
          subUserBrandAreas: [
            {
              id: 4,
              name: '天津'
            }, {
              id: 5,
              name: '山西'
            },
          ]
        },
      ]
    }
  }

  _loadUser() {
    storage.load({key: keys.currentUser}).then(currentUser => {
      storage.load({
        key: keys.getOneUser,
        syncInBackground: false,
        syncParams: {
          url: apis.getOneUser + currentUser.id
        },
      }).then(ret => {
        if (ret.status == 200) {
          return ret.json();
        } else {
          Actions.Login({})
        };
      }).then(retJson => {
        this.setState({userId: retJson.id, name: retJson.name})
      })
    }).catch(err => {
      //this.msgShort("用户失效，请重新登录2");
      Actions.Login({})
    })
  }

  _loadBrandAreas() {
    storage.load({
      key: keys.getUserBrandAreas,
      syncInBackground: false,
      syncParams: {
        url: apis.getUserBrandAreas
      },
    }).then(ret => {
      if (ret.status == 200) {
        return ret.json()
      } else {
        return Promise.reject(404)
      }
    }).then(res => {
      let allCount = this.state.allCount;
      for (var i in res) {
        allCount += res[i].subUserBrandAreas.length;
      }
      let finalArray = this.state.finalArray;
      finalArray[0] = new Array(res.length);
      for (var i = 0; i < res.length; i++) {
        finalArray[0][i] = [];
      }
      this.setState({brandAreas: res, allCount: allCount, finalArray: finalArray,});
    }).catch(err => {
      this.msgShort('获取品牌人拓展区域失败')
    });
  }

  _upload() {
    this.uploadModal(false, (image) => {
      this._uploadImage(image)
    })
  }
  _uploadImage(image) {
    image.then(a => {
      if (a && a.path) {
        this.closeModal();
        this.openLoading('正在上传')
        this.uploadToRemote(a.path).then(respones => {
          this.setState({visitingCardPic: a.path});
          this.setState({upimgUrl: respones.url})
          this.closeLoading()
        });
      }
    })
  }

  renderImage() {
    if (this.state.visitingCardPic) {
      return <Image style={{
          width: 100,
          height: 100,
        }} source={{
          uri: this.state.visitingCardPic
        }}/>
    } else {
      return <Image source={require('../../images/addImg.png')}></Image>
    }
  }

  componentWillMount() {
    this._loadUser();
    this._loadBrandAreas();
  }

  _submit() {
    let name = this.state.name
    let positionName = this.state.positionName
    let visitingCardPic = this.state.upimgUrl
    if (!name) {
      this.msgShort('请输入您的姓名！')
      return
    } else if (name.length > 40) {
      this.msgShort('姓名最多可输入40个字！')
      return
    }
    if (!positionName) {
      this.msgShort('请输入您的职位！')
      return
    } else if (positionName.length > 15) {
      this.msgShort('职位最多可输入15个字！')
      return
    }

    let userBrandRelations = [];
    for (var index in this.state.brands) {
      if (!this.state.brands[index].name) {
        this.msgShort('请输入您的品牌名称！')
        return
      } else if (this.state.brands[index].name.length > 15) {
        this.msgShort('品牌名称最多可输入15个字！')
        return
      }
      if (this.state.brands[index].areas.length <= 0) {
        this.msgShort('请选择您负责区域！')
        return
      }
      if (this.state.brands[index].shopPlan && this.state.brands[index].shopPlan.length > 200) {
        this.msgShort('开店计划最多可输入200个字！')
        return
      }
      if (this.state.brands[index].propertyNeed && this.state.brands[index].propertyNeed.length > 200) {
        this.msgShort('物业要求最多可输入200个字！')
        return
      }
      userBrandRelations.push({
        user: {
          id: this.state.userId
        },
        userBrand: {
          name: this.state.brands[index].name
        },
        shopPlan: this.state.brands[index].shopPlan,
        propertyNeed: this.state.brands[index].propertyNeed,
        areas: this.state.brands[index].areas
      });
    }

    let user = {
      "roleType": this.state.roleType,
      "id": this.state.userId,
      "name": name,
      "positionName": positionName,
      "visitingCardPic": visitingCardPic,
      "userBrandRelations": userBrandRelations
    }
    storage.load({
      key: keys.changeRoleType,
      syncInBackground: false,
      syncParams: {
        url: apis.changeRoleType,
        body: user,
      },
    }).then(ret => {
      if (ret.status == 200) {
        this.msgShort('提交成功', () => Actions.reset('PersonalIndex'));
      } else {
        return Promise.reject(500)
      }
    }).catch(err => {
      this.msgShort('提交失败');
    });
    UMengAnalytics.onEvent('personal_role_brand_submit');
  }
  renderLeftView() {
    return (<ScrollView style={styles.recommendMain} showsHorizontalScrollIndicator={false}>
      {
        this.state.brandAreas.map((item, index) => {
          let currentSelectBrandIndex = this.state.currentSelectBrandIndex;
          let curCount = this.state.finalArray[currentSelectBrandIndex][index].length;
          let allCount = item.subUserBrandAreas.length;
          if (item.name == '全国') {
            curCount = 0;
            for (var i in this.state.finalArray[currentSelectBrandIndex]) {
              curCount += this.state.finalArray[currentSelectBrandIndex][i].length;
            }
            allCount = this.state.allCount;
          }
          return (<TouchableOpacity key={index} activeOpacity={1} style={curCount == allCount
              ? styles.liViewRest
              : styles.liView} onPress={this.itemOnPressLeft.bind(this, index)}>
            <Text style={[
                styles.listLeft, this.state.selectLeftIndex == index
                  ? fonts.bodyText_Blue
                  : fonts.bodyText_Black,
              ]}>{item.name}({curCount}/{allCount})</Text>
          </TouchableOpacity>)
        })
      }
    </ScrollView>)
  }
  renderRightView(leftIndex) {
    let currentSelectBrandIndex = this.state.currentSelectBrandIndex;
    let curFinalArray = this.state.finalArray[currentSelectBrandIndex];
    let curCount = curFinalArray[leftIndex].length;
    let allCount = this.state.brandAreas[leftIndex].subUserBrandAreas.length;
    if (this.state.brandAreas[leftIndex].name == '全国') {
      curCount = 0;
      for (var i in curFinalArray) {
        curCount += curFinalArray[i].length;
      }
      allCount = this.state.allCount;
    }

    let finalArray = this.state.finalArray;
    let rightSelectText = curFinalArray[leftIndex]
      ? curFinalArray[leftIndex].join(',')
      : '';
    return (<ScrollView style={styles.recommendMainRest} showsHorizontalScrollIndicator={false}>
      <TouchableOpacity activeOpacity={1} style={styles.liView} onPress={() => {
          this.itemOnPressAll(leftIndex)
        }}>
        <Text style={[
            curCount == allCount
              ? fonts.bodyText_Blue
              : fonts.bodyText_Black
          ]}>全部</Text>
      </TouchableOpacity>
      {
        this.state.brandAreas[leftIndex].subUserBrandAreas.map((item, index) => {
          return (<TouchableOpacity key={index} activeOpacity={1} style={styles.liView} onPress={this.itemOnPressRight.bind(this, index)}>
            <Text style={[
                rightSelectText.indexOf(item.id) >= 0
                  ? fonts.bodyText_Blue
                  : fonts.bodyText_Black
              ]}>{item.name}</Text>
          </TouchableOpacity>)
        })
      }
    </ScrollView>)
  }
  itemOnPressAll(index) {
    let curLeft = this.state.brandAreas[index];
    let allAreas = this.state.brandAreas;
    let curFinalArray = this.state.finalArray[this.state.currentSelectBrandIndex];
    let selectCount = 0;
    for (var i in curFinalArray) {
      selectCount += curFinalArray[i].length;
    }

    if (curLeft.name == '全国') {
      if (selectCount == this.state.allCount) {
        curFinalArray = new Array(this.state.brandAreas.length);
        for (var i = 0; i < this.state.brandAreas.length; i++) {
          curFinalArray[i] = [];
        }
      } else {
        curFinalArray = [];
        for (var i in allAreas) {
          let tmp = [];
          for (var j in allAreas[i].subUserBrandAreas) {
            tmp.push(allAreas[i].subUserBrandAreas[j].id);
          }
          curFinalArray.push(tmp);
        }
      }
    } else {
      if (curFinalArray[index].length == curLeft.subUserBrandAreas.length) {
        curFinalArray[index] = [];
      } else {
        curFinalArray[index] = [];
        for (var i in curLeft.subUserBrandAreas) {
          curFinalArray[index].push(curLeft.subUserBrandAreas[i].id);
        }
      }
    }
    this.state.finalArray[this.state.currentSelectBrandIndex] = curFinalArray;
    this.setState({selectLeftIndex: index});
  }

  itemOnPressLeft(index) {
    this.setState({selectLeftIndex: index, selectRightIndex: -1});
  }
  itemOnPressRight(index) {
    let leftIndex = this.state.selectLeftIndex;
    let finalArray = this.state.finalArray;
    let rightSelectText = finalArray[this.state.currentSelectBrandIndex][leftIndex]
      ? finalArray[this.state.currentSelectBrandIndex][leftIndex].join(',')
      : '';
    let tempText = this.state.brandAreas[leftIndex].subUserBrandAreas[index].id;
    if (rightSelectText.indexOf(tempText) < 0) {
      finalArray[this.state.currentSelectBrandIndex][leftIndex] = finalArray[this.state.currentSelectBrandIndex][leftIndex]
        ? finalArray[this.state.currentSelectBrandIndex][leftIndex]
        : [];
      finalArray[this.state.currentSelectBrandIndex][leftIndex].push(tempText);
    } else {
      let popIndex = -1;
      for (var i in finalArray[this.state.currentSelectBrandIndex][leftIndex]) {
        if (finalArray[this.state.currentSelectBrandIndex][leftIndex][i] == tempText) {
          popIndex = i;
        }
      }
      finalArray[this.state.currentSelectBrandIndex][leftIndex].splice(popIndex, 1);
    }
    this.setState({finalArray: finalArray, selectRightIndex: index,})
  }
  _complete() {
    let curFinalArray = this.state.finalArray[this.state.currentSelectBrandIndex];
    this.state.brands[this.state.currentSelectBrandIndex].areas = [];
    for (var i in curFinalArray) {
      for (var j in curFinalArray[i]) {
        let areaId = curFinalArray[i][j];
        this.state.brands[this.state.currentSelectBrandIndex].areas.push({id: areaId});
      }
    }
    this.setState({showModal: false});
  }
  _cancel() {
    this.state.finalArray[this.state.currentSelectBrandIndex] = this.state.tempArray;
    this.setState({showModal: false});
  }
  showCheck(brandIndex) {
    let selectCount = 0;
    for (var i in this.state.finalArray[brandIndex]) {
      selectCount += this.state.finalArray[brandIndex][i].length;
    }
    return (<View style={styles.listInputRest}>
      <Text style={[styles.rightText, fonts.bodyText_Gray,]}>全国({selectCount}/{this.state.allCount})</Text>
      <TouchableOpacity style={styles.addNode} onPress={() => this.openAreaModal(brandIndex)}>
        <Image source={require('../../images/addBrander.png')}></Image>
      </TouchableOpacity>
    </View>)
  }
  itemDelet(brandIndex, index) {
    let finalArray = this.state.finalArray;
    finalArray[brandIndex].splice(index, 1);
    this.state.brands[brandIndex].areas.splice(index, 1);
    this.setState({finalArray: finalArray});
  }

  brandDelete(brandIndex) {
    let brands = this.state.brands;
    brands.splice(brandIndex, 1);
    this.setState({brands: brands});
  }
  addBrander() {
    let brands = this.state.brands;
    let finalArray = this.state.finalArray;
    brands.push({name: '', shopPlan: '', areas: [], propertyNeed: ''});
    let newArray = new Array(this.state.brandAreas.length);
    for (var i = 0; i < newArray.length; i++) {
      newArray[i] = [];
    }
    finalArray.push(newArray);
    this.setState({brands: brands, finalArray: finalArray});
  }
  openAreaModal(brandIndex) {
    this.state.tempArray = JSON.parse(JSON.stringify(this.state.finalArray[brandIndex]));
    this.setState({showModal: true, currentSelectBrandIndex: brandIndex});
  }

  render() {
    return (<View style={[styles.mainList, styles.bgColor,]}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
      <Title isLeftShow={true} backColor={true} isRightBtnShow={false} title={'品牌人'}/>
      <ScrollView>
        <View style={[styles.listView]}>
          <Text style={[styles.listIcon]}>*</Text>
          <Text style={[styles.listLeft, fonts.bodyText_Black,]}>姓       名:</Text>
          <TextInput style={[styles.listInput, fonts.bodyText_Gray,]} underlineColorAndroid="transparent" clearButtonMode="always" returnKeyType='done' placeholder="请输入您的姓名" placeholderTextColor="#ccc" value={this.state.name} onChangeText={(text) => this.setState({name: text})}/>
        </View>
        <View style={[styles.listView]}>
          <Text style={[styles.listIcon]}>*</Text>
          <Text style={[styles.listLeft, fonts.bodyText_Black,]}>职       位:</Text>
          <TextInput style={[styles.listInput, fonts.bodyText_Gray,]} underlineColorAndroid="transparent" clearButtonMode="always" returnKeyType='done' placeholder="请输入您的职位" placeholderTextColor="#ccc" onChangeText={(text) => this.setState({positionName: text})}/>
        </View>
        <View style={[styles.listTextRow, styles.bgRest]}>
              <Text style={[fonts.bodyText_Black,styles.flex2]}>名         片:</Text>
              <View style={[styles.listImg, styles.flex1,]}>
                <TouchableHighlight underlayColor="transparent" onPress={() => this._upload()}>
                  {this.renderImage()}
                </TouchableHighlight>
              </View>
        </View>
        {
          this.state.brands.map((item, index) => {
            let selectCount = 0;
            for (var i in this.state.finalArray[index]) {
              selectCount += this.state.finalArray[index][i].length;
            }
            return (<View key={index} style={{
                marginBottom: 10
              }}>
              <View style={[styles.lineBoder]}>
                <Text style={[styles.listTitle, fonts.bodyText_Black,]}>品牌信息</Text>
                {
                  index > 0
                    ? <TouchableHighlight style={styles.rightDel} underlayColor="transparent" onPress={() => this.brandDelete(index)}>
                        <Image source={require('../../images/red_del.png')}></Image>
                      </TouchableHighlight>
                    : null
                }
              </View>
              <View style={[styles.listView]}>
                <Text style={[styles.listIcon]}>*</Text>
                <Text style={[styles.listLeft, fonts.bodyText_Black,]}>品牌名称:</Text>
                <TextInput style={[styles.listInput, fonts.bodyText_Gray,]} underlineColorAndroid="transparent" clearButtonMode="always" returnKeyType='done' placeholder="请输入您的品牌名称" placeholderTextColor="#ccc" onChangeText={(text) => {
                    let brands = this.state.brands;
                    brands[index].name = text;
                    this.setState({brands: brands})
                  }}/>
              </View>
              <View style={[styles.listView]}>
                <Text style={[styles.listIcon]}>*</Text>
                <Text style={[styles.listLeft, fonts.bodyText_Black,]}>负责区域:</Text>
                {
                  selectCount > 0
                    ? this.showCheck(index)
                    : <TouchableHighlight style={[styles.listInput]} underlayColor="transparent" onPress={() => this.openAreaModal(index)}>
                        <Text style={[fonts.bodyText_Gray, styles.tipsText,]}>请选择</Text>
                      </TouchableHighlight>
                }
              </View>
              <View style={[styles.listView]}>
                <Text style={[styles.listIcon]}></Text>
                <Text style={[styles.listLeft, fonts.bodyText_Black,]}>
                  开店计划:</Text>
                <TextInput style={[styles.listInput, fonts.bodyText_Gray,]} underlineColorAndroid="transparent" clearButtonMode="always" returnKeyType='done' placeholder="请输入您的开店计划" placeholderTextColor="#ccc" onChangeText={(text) => {
                    let brands = this.state.brands;
                    brands[index].shopPlan = text;
                    this.setState({brands: brands})
                  }}/>
              </View>
              <View style={[styles.listView]}>
                <Text style={[styles.listIcon]}></Text>
                <Text style={[styles.listLeft, fonts.bodyText_Black,]}>
                  物业需求:</Text>
                <TextInput style={[styles.listInput, fonts.bodyText_Gray,]} underlineColorAndroid="transparent" clearButtonMode="always" returnKeyType='done' placeholder="请输入您的物业需求" placeholderTextColor="#ccc" onChangeText={(text) => {
                    let brands = this.state.brands;
                    brands[index].propertyNeed = text;
                    this.setState({brands: brands})
                  }}/>
              </View>
            </View>)
          })
        }
        <View style={styles.ViewtipsText}>
          <Text style={fonts.tinyText_Gray}>如您还负责其他品牌，可点击下方按钮，新增品牌</Text>
        </View>
        <TouchableHighlight underlayColor="transparent" onPress={() => this.addBrander()}>
          <View style={styles.addBrander}>
            <Image source={require('../../images/newBrander.png')}></Image>
            <Text style={[styles.leftM, fonts.bodyText_Gray,]}>新增品牌</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.listBtn, styles.positionBottom20,]} underlayColor="#3a8ff3" onPress={() => this._submit()}>
          <Text style={[fonts.btnText_white]}>提交</Text>
        </TouchableHighlight>
      </ScrollView>
      {this.renderModal()}
      {this.renderLoading()}

      <Modal animationType={"none"} transparent={true} visible={this.state.showModal}>
        <View style={styles.modalBody}>
          <View style={styles.btnView}>
            <TouchableHighlight style={[styles.btnViewTouch, styles.leftTouch,]} underlayColor="transparent" onPress={() => this._cancel()}>
              <Text style={[fonts.bodyText_Gray, styles.bodyText,]}>取消</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.btnViewTouch, styles.rightTouch,]} underlayColor="transparent" onPress={() => this._complete()}>
              <Text style={[fonts.bodyText_Gray, styles.bodyText,]}>完成</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.modalContent}>
            <View style={[styles.leftView]}>
              {
                this.state.showModal
                  ? this.renderLeftView()
                  : null
              }
            </View>
            <View style={[styles.rightView]}>
              {
                this.state.showModal
                  ? this.renderRightView(this.state.selectLeftIndex)
                  : null
              }
            </View>
          </View>
        </View>
      </Modal>
    </View>);
  }
}
AppRegistry.registerComponent('brander', () => brander);
