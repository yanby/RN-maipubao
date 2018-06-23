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
    ScrollView,
    Linking,
} from 'react-native';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/tourists/SpareParts';
import {apis, staticSite, currentVersion,} from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import {Actions, ActionConst,} from 'react-native-router-flux';
var moment = require('moment');
import BasicComponent from '../basic/BasicComponent.js'
import Swiper from 'react-native-swiper';
const renderPagination = (index, total, context) => {
    return (<View style={styles.paginationStyle}>
        <Text style={fonts.bodyText_white}>
            <Text style={fonts.bodyText_white}>{index + 1}</Text>/{total}
        </Text>
    </View>)
}
export default class SpareParts extends BasicComponent {
    constructor(props) {
        super(props);
        this.state = {
            modalObject: {},
            loadingObject: {},
            flows: this.props.flows,
            swiperData: [],
            flowIndex: -1,
            paperPic: []
        }
    }

    componentWillMount() {
        for (i in this.props.flows) {
            if (this.props.flows[i].flowPic) {
                this.setState({swiperData: this.props.flows[i].flowPic.split(';'), flowIndex: i});
                break;
            }
        }
    }

    changeSwiperData(index) {
        if (this.props.flows[index].flowPic) {
            this.setState({swiperData: this.props.flows[index].flowPic.split(';'), flowIndex: index,})
        } else {
            this.setState({swiperData: [], flowIndex: index,})
        }
    }

    _uploadPaper() {
        this.uploadModal(true, (image) => {
            image.then(a => {
                this.closeModal();
                if (a && a.length > 6) {
                    this.timer = setTimeout(() => {
                        this.msgShort('最多只能选择6张图片');
                        clearTimeout(this.timer);
                    }, 500);
                } else if (a && a.length > 0 && a.length <= 6) {
                    this.timer = setTimeout(() => {
                        this.openLoading('正在上传');
                        clearTimeout(this.timer);
                    }, 500);
                    let uploadFlagNum = 0;
                    for (var j = 0; j < a.length; j++) {
                        let x = a[j];
                        this.uploadToRemote(x.path).then(respones => {
                            let paperPic = this.state.paperPic;
                            paperPic.push(respones.url);
                            if (uploadFlagNum == a.length - 1) {
                                let oldPic = this.props.flows[this.state.flowIndex].flowPic
                                    ? this.props.flows[this.state.flowIndex].flowPic.split(';')
                                    : [];
                                this.props.flows[this.state.flowIndex].flowPic = oldPic.concat(paperPic).join(';');
                                this.props.flows[this.state.flowIndex].flowPicAddCount = 1;
                                this.updateBusinessFlow();
                            }
                            uploadFlagNum++;
                        });
                    }
                } else if (a && a.path) {
                    this.uploadToRemote(a.path).then(respones => {
                        let paperPic = this.state.paperPic;
                        paperPic.push(respones.url);
                        let oldPic = this.props.flows[this.state.flowIndex].flowPic
                            ? this.props.flows[this.state.flowIndex].flowPic.split(';')
                            : [];
                        this.props.flows[this.state.flowIndex].flowPic = oldPic.concat(paperPic).join(';');
                        this.props.flows[this.state.flowIndex].flowPicAddCount = 1;
                        this.updateBusinessFlow();
                    });
                }
            })
        })
    }

    updateBusinessFlow() {
        storage.load({
            key: keys.patchBusinessFlow,
            syncInBackground: false,
            syncParams: {
                url: apis.patchBusinessFlow + '/' + this.props.flows[this.state.flowIndex].id,
                body: {
                    flowPic: this.props.flows[this.state.flowIndex].flowPic,
                    flowPicAddCount: 1,
                    operatorType: '项目经理',
                }
            }
        }).then(ret => {
            if (ret.status == 200) {
                return ret.json();
            } else {
                this.closeLoading();
                this.msgShort('更新交易流程请求失败');
            }
        }).then(retJson => {
            if (retJson != null) {
                this.closeLoading();
                this.msgShort('上传成功');
                this.changeSwiperData(this.state.flowIndex);
            } else {
                this.closeLoading();
                this.msgShort('更新交易流程返回异常');
            }
        }).catch(err => {
            this.closeLoading();
            this.msgShort('更新交易流程异常');
        });
    }

    render() {
        return (<View style={[styles.container]}>
            <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={false}/>
            <View style={[styles.nav]}>
                <TouchableHighlight style={[styles.navLeft]} underlayColor="transparent" onPress={() => {
                        Actions.pop({
                            refresh: {
                                random: Math.random()
                            }
                        })
                    }}>
                    <Image source={require('../../images/back.png')}></Image>
                </TouchableHighlight>
                <View style={[styles.navCenter]}>
                    <Text style={[fonts.t2_white]}>交易备件</Text>
                </View>
            </View>
            <View style={styles.mainView}>
                <View style={styles.swiper}>
                    {
                        this.state.swiperData
                            ? <Swiper style={styles.wrapper} renderPagination={renderPagination} loop={true}>
                                    {
                                        this.state.swiperData.map((url, index) => {
                                            let picDate = new Date(parseInt(url.match(/\d{13}/)[0]));
                                            return (<View style={styles.slide} key={index}>
                                                <TouchableHighlight underlayColor="transparent" onPress={() => {}}>
                                                    <Image style={styles.slideImg} onLoadStart={() => this.openLoading('图片加载中...')} onLoadEnd={() => this.closeLoading()} source={{
                                                            uri: staticSite + url
                                                        }}>
                                                        <Text style={fonts.bodyText_white}>{moment(picDate).format('YYYY-MM-DD HH:mm:ss')}</Text>
                                                    </Image>
                                                </TouchableHighlight>
                                            </View>)
                                        })
                                    }
                                </Swiper>
                            : null
                    }
                </View>
                {
                    !this.props.flows[this.state.flowIndex].flowPicAddCount
                        ? <View style={styles.uploadView}>
                                <TouchableHighlight style={styles.uploadTouch} onPress={() => this._uploadPaper()}>
                                    <Text style={fonts.hintText_white}>上传{this.props.flows[this.state.flowIndex].flowType}备件</Text>
                                </TouchableHighlight>
                            </View>
                        : null
                }
                <View style={styles.bottomView}>
                    {
                        this.props.flows.map((flow, index) => {
                            if (flow.flowStatus == '报备失败' || (flow.flowType.match(/到访$|认购$|意向$|签约$/) && flow.flowStatus)) {
                                return <TouchableHighlight style={this.state.flowIndex == index
                                        ? styles.bottomTouch1
                                        : styles.bottomTouch} underlayColor="transparent" key={index} onPress={() => this.changeSwiperData(index)}>
                                    <Text style={this.state.flowIndex == index?fonts.hintText_white:fonts.hintText_Blue}>{flow.flowType}凭证</Text>
                                </TouchableHighlight>
                            }
                        })
                    }
                </View>
            </View>
            {this.renderModal()}
            {this.renderLoading()}
        </View>);
    }
}
AppRegistry.registerComponent('SpareParts', () => SpareParts);
