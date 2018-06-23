'use strict';

import React, {Component, PropTypes,} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
export class DropDownMenu extends Component {
  constructor(props, context) {
    super(props, context);
    var selectIndex = new Array(this.props.data.length);
    for (var i = 0; i < selectIndex.length; i++) {
      selectIndex[i] = 0;
    }
    let activeLeftIndex = [];
    let leftClick = [];
    let leftCount = [];
    props.data.map((item, index) => {
      activeLeftIndex.push(-1);
      leftClick.push(false);
      if (this.props.doubleList && this.props.doubleList.indexOf(index) >= 0) {
        leftCount.push(item[1].length);
      } else {
        leftCount.push(1);
      }
    });

    this.state = {
      activityIndex: -1,
      selectIndex: selectIndex,
      activityLeftIndex: activeLeftIndex,
      rotationAnims: props.data.map(() => new Animated.Value(0)),
      showMoreBtn: this.props.showMoreBtn,
      doubleList: this.props.doubleList
        ? this.props.doubleList
        : [],
      showList: true,
      leftClick: leftClick,
      leftCount: leftCount,
      titleText: null,
      rightIndex: '',
    };
    this.defaultConfig = {
      bgColor: 'grey',
      tintColor: 'white',
      selectItemColor: "red",
      arrowImg: '../../images/select.png',
      checkImage: '../../images/tab.png',
    };
  }
  renderChcek(index, title) {
    var activityIndex = this.state.activityIndex;
    if (this.state.selectIndex[activityIndex] == index) {
      var checkImage = this.props.checkImage
        ? this.props.checkImage
        : require('../../images/tab.png');
      return (<View style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: "center",
          paddingHorizontal: 15,
          flexDirection: 'row',
        }}>
        <Text style={{
            color: this.props.selectItemColor
              ? this.props.selectItemColor
              : this.defaultConfig.selectItemColor
          ,fontSize: 15}}>{title}</Text>
        {
          // <Image source={checkImage}/>
        }
      </View>);
    } else {
      return (<View style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: "center",
          paddingHorizontal: 15,
          flexDirection: 'row',
        }}>
        <Text style={{
            color: 'black',
            fontSize: 15,
          }}>{title}</Text>
      </View>);
    }
  }
  renderleftChcek(index, title) {
    if (this.state.activityLeftIndex[this.state.activityIndex] == index) {
      var checkImage = this.props.checkImage
        ? this.props.checkImage
        : require('../../images/tab.png');
      return (<View style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: "center",
          paddingHorizontal: 15,
          flexDirection: 'row',
        }}>
        <Text style={{color: this.props.selectItemColor? this.props.selectItemColor: this.defaultConfig.selectItemColor
          ,fontSize:15}}>{title}</Text>
      </View>);
    } else {
      return (<View style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: "center",
          paddingHorizontal: 15,
          flexDirection: 'row',
        }}>
        <Text style={{
            color: 'black',
            fontSize: 15,
          }}>{title}</Text>
      </View>);
    }
  }
  renderActivityPanel() {
    if (this.state.activityIndex >= 0) {
      var currentTitles = this.props.data[this.state.activityIndex];
      var heightStyle = {};
      if (this.props.maxHeight && this.props.maxHeight < currentTitles.length * 44) {
        heightStyle.height = this.props.maxHeight;
      }
      let isDoubleList = false;
      for (var j = 0; j <= this.state.doubleList.length; j++) {
        if (this.state.activityIndex == this.state.doubleList[j]) {
          isDoubleList = true;
          break;
        } else {
          isDoubleList = false;
        }
      }
      if (isDoubleList) {
        var currentTitlesLeft = this.props.data[this.state.activityIndex][1];
        var leftText = [];
        if (this.state.activityLeftIndex[this.state.activityIndex] > -1) {
          var rightText = currentTitlesLeft[this.state.activityLeftIndex[this.state.activityIndex]][1];
        } else {
          var rightText = currentTitlesLeft[0][1];
        }
        currentTitlesLeft.forEach(data => {
          leftText.push(data[0]);
        })
        for (var i = 0; i <= this.props.data.lenght; i++) {
          this.props.data[i]
        }
      }
      return (<View style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 40,
          bottom: 0,
        }}>
        <TouchableOpacity onPress={() => this.openOrClosePanel(this.state.activityIndex)} activeOpacity={1} style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}>
          <View style={{
              opacity: 0.4,
              backgroundColor: 'black',
              flex: 1,
            }}/>
        </TouchableOpacity>
        <ScrollView style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: 'white',
            },
            heightStyle,
          ]}>
          {
            isDoubleList
              ? <View style={[
                    {
                      flexDirection: "row"
                    },
                    heightStyle,
                  ]}>
                  <View style={{
                      flex: 1.3
                    }}>
                    {
                      leftText.map((title, index) => <TouchableOpacity key={index} activeOpacity={1} style={{
                          height: 44
                        }} onPress={this.itemOnPressLeft.bind(this, index)}>
                        {this.renderleftChcek(index, title)}
                        <View style={{
                            backgroundColor: '#F6F6F6',
                            height: 1
                          }}/>
                      </TouchableOpacity>)
                    }
                  </View>
                  <View style={{
                      flex: 3,
                      backgroundColor: "#fff",
                      borderLeftWidth: 1,
                      borderColor: "#eaeaea",
                    }}>
                    {
                      rightText.map((title, index) => <TouchableOpacity key={index} activeOpacity={1} style={{
                          height: 44
                        }} onPress={this.itemOnPress.bind(this, index)}>
                        {this.renderChcek(index, title)}
                        <View style={{
                            backgroundColor: '#F6F6F6',
                            height: 1
                          }}/>
                      </TouchableOpacity>)
                    }
                  </View>
                </View>
              : <View>
                  {
                    currentTitles.map((title, index) => <TouchableOpacity key={index} activeOpacity={1} style={{
                        flex: 1,
                        height: 44,
                      }} onPress={this.itemOnPress.bind(this, index)}>
                      {this.renderChcek(index, title)}
                      <View style={{
                          backgroundColor: '#F6F6F6',
                          height: 1,
                          marginLeft: 15,
                        }}/>
                    </TouchableOpacity>)
                  }
                </View>
          }
        </ScrollView>
      </View>);
    } else {
      return (null);
    }
  }
  _renderItem = ({item}) => (<TouchableOpacity key={item} activeOpacity={1} style={{
      height: 44
    }} onPress={this.itemOnPress.bind(this, item)}>
    <View style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: "center",
        paddingHorizontal: 15,
        flexDirection: 'row',
      }}>
      <Text>{item.title}</Text>
    </View>
    <View style={{
        backgroundColor: '#F6F6F6',
        height: 1,
        marginLeft: 15,
      }}/>
  </TouchableOpacity>);
  openOrClosePanel(index) {
    this.props.bannerAction
      ? this.props.bannerAction()
      : null;
    if (this.state.activityIndex == index) {
      this.closePanel(index);
      this.setState({activityIndex: -1});
      // toValue = 0;
    } else {
      if (this.state.activityIndex > -1) {
        this.closePanel(this.state.activityIndex);
      }
      this.openPanel(index);
      this.setState({activityIndex: index});
      // toValue = 0.5;
    }
    // Animated.timing(
    //   this.state.rotationAnims[index],
    //   {
    //     toValue: toValue,
    //     duration: 300,
    //     easing: Easing.linear
    //   }
    // ).start();
  }
  openPanel(index) {
    Animated.timing(this.state.rotationAnims[index], {
      toValue: 0.5,
      duration: 300,
      easing: Easing.linear,
    }).start();
  }
  closePanel(index) {
    Animated.timing(this.state.rotationAnims[index], {
      toValue: 0,
      duration: 300,
      easing: Easing.linear,
    }).start();
  }

  itemOnPress(index) {
    if (this.state.activityIndex > -1) {
      var selectIndex = this.state.selectIndex;
      selectIndex[this.state.activityIndex] = index;
      let isDoubleList = false;
      for (var j = 0; j <= this.state.doubleList.length; j++) {
        if (this.state.activityIndex == this.state.doubleList[j]) {
          isDoubleList = true;
          break;
        } else {
          isDoubleList = false;
        }
      }
      if (isDoubleList) {
        this.state.leftClick[this.state.activityIndex] = false;
        this.setState({selectIndex: selectIndex, showList: false});
      } else {
        this.setState({selectIndex: selectIndex});
      }
      if (this.props.handler) {
        let baseCount = 0;
        for (var i = 0; i < this.state.activityIndex; i++) {
          baseCount += this.state.leftCount[i];
        }
        let leftIndex = this.state.activityLeftIndex[this.state.activityIndex] >= 0
          ? this.state.activityLeftIndex[this.state.activityIndex]
          : 0;
        this.props.handler(baseCount + leftIndex, index, this.state.activityIndex);
        // if (isDoubleList) {
        //   this.props.handler(this.state.activityIndex + this.state.activityLeftIndex[this.state.activityIndex], index);
        // } else {
        //   this.props.handler(this.state.activityIndex, index);
        // }
      }
    }
    this.openOrClosePanel(this.state.activityIndex);
  }
  itemOnPressLeft(index) {
    let activityLeftIndex = this.state.activityLeftIndex;
    activityLeftIndex[this.state.activityIndex] = index;
    let leftClick = this.state.leftClick;
    leftClick[this.state.activityIndex] = true;
    this.setState({activityLeftIndex: activityLeftIndex, leftClick: leftClick,});
    this.setState({
      titleText: this.props.data[this.state.activityIndex][0]
    });
  }
  renderDropDownArrow(index) {
    var icon = this.props.arrowImg
      ? this.props.arrowImg
      : require('../../images/select.png');

    return (<Animated.Image source={icon} style={{
        marginLeft: 8,
        marginRight:8,
        transform: [
          {
            rotateZ: this.state.rotationAnims[index].interpolate({
              inputRange: [
                0, 1,
              ],
              outputRange: [
                '0deg', '360deg',
              ],
            })
          }
        ],
      }}/>);
  }

  render() {

    return (<View style={{
        flexDirection: 'column',
        flex: 1,
      }}>
      {
        this.state.showList
          ? <View style={{
                flexDirection: 'row',
                backgroundColor: this.props.bgColor
                  ? this.props.bgColor
                  : this.defaultConfig.bgColor,
              }}>
              {
                this.props.data.map((rows, index) => <TouchableOpacity activeOpacity={1} key={index} onPress={this.openOrClosePanel.bind(this, index)} style={{
                    flex: 1,
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",

                  }}>
                  <View style={{
                      flexDirection: 'row',
                      alignItems: "center",
                      justifyContent: "center"
                    }} ellipsizeMode={'clip'}>
                    <Text style={{
                        color: this.props.tintColor
                          ? this.props.tintColor
                          : this.defaultConfig.tintColor,
                        fontSize: 15,
                      }} numberOfLines={1}>
                      {rows[this.state.selectIndex[index]]}
                    </Text>
                    {this.renderDropDownArrow(index)}
                  </View>
                </TouchableOpacity>)
              }
              {
                this.state.showMoreBtn
                  ? <View style={{
                        flex: 1,

                      }}></View>
                  : null
              }
            </View>
          : <View style={{
                flexDirection: 'row',
                backgroundColor: this.props.bgColor
                  ? this.props.bgColor
                  : this.defaultConfig.bgColor,
              }}>
              {
                this.props.data.map((rows, index) => {
                  let topText = '';
                  if (this.state.activityLeftIndex[index] >= 0) {
                    topText = rows[1][this.state.activityLeftIndex[index]][1][this.state.selectIndex[index]];
                  } else {
                    topText = rows[0][0];
                  }

                  return (<TouchableOpacity activeOpacity={1} key={index} onPress={this.openOrClosePanel.bind(this, index)} style={{
                      flex: 1,
                      height: 40,
                      alignItems: "center",
                      justifyContent: "center",

                    }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: "center",
                        justifyContent: "center"
                      }} ellipsizeMode={'clip'}>
                      <Text style={{
                          color: this.props.tintColor
                            ? this.props.tintColor
                            : this.defaultConfig.tintColor,
                          fontSize: 15,
                          textAlign: "left",
                          flex: 1,
                          paddingLeft: 13,
                        }} numberOfLines={1}>
                        {
                          this.props.doubleList.indexOf(index) == -1
                            ? rows[this.state.selectIndex[index]]
                            : this.state.leftClick[index]
                              ? this.state.titleText
                              : topText

                        }
                      </Text>
                      {this.renderDropDownArrow(index)}
                    </View>
                  </TouchableOpacity>)
                })
              }
              {
                this.state.showMoreBtn
                  ? <View style={{
                        flex: 1,

                      }}></View>
                  : null
              }
            </View>
      }
      {this.props.children}
      {this.renderActivityPanel()}
    </View>);
  }

}

// this.defaultConfig = {
//       bgColor: 'grey',
//       tintColor: 'white',
//       selectItemColor: "red",
//       arrowImg: './img/dropdown_arrow.png',
//       checkImage: './img/menu_check.png'
//     };

DropDownMenu.propTypes = {
  bgColor: PropTypes.string,
  tintColor: PropTypes.string,
  selectItemColor: PropTypes.string,
  arrowImg: PropTypes.number,
  checkImage: PropTypes.number,
  data: PropTypes.array,
  bannerAction: PropTypes.func
}

export default DropDownMenu;
