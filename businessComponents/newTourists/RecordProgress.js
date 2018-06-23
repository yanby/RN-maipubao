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
} from 'react-native';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/community/DemandInput';
import {Actions, ActionConst,} from 'react-native-router-flux';
import ModalPicker from '../../commonComponents/ModalPicker/index';
import {apis, sites, staticSite,} from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import BasicComponent from '../basic/BasicComponent';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class RecordProgress extends BasicComponent {
    constructor(props) {
        super(props);
        this.state = {
            modalObject: {},
            loadingObject: {},
            currentUser: '',
            businessId: this.props.businessId,
            lastStatus: this.props.lastStatus,
            flowPic: [],
            upimgUrl: [],
            failedType: null,
            mark: null,
            endFlowType: this.getEndFlowType()
        }
    }

    componentWillMount() {
        storage.load({key: keys.currentUser}).then((retJson) => {
            this.setState({currentUser: retJson})
        });
    }

    _upload() {
        this.uploadModal(false, (image) => {
            image.then(a => {
                if (a && a.path) {
                    this.closeModal();
                    this.openLoading('正在上传');
                    this.uploadToRemote(a.path).then(respones => {
                        this.state.flowPic.push(a.path);
                        this.state.upimgUrl.push(respones.url);
                        this.setState({flowPic: this.state.flowPic})
                        this.closeLoading();
                    });
                }
            })
        })
    }

    deletePaperPic(index) {
        let paperPic = this.state.upimgUrl;
        let paperPicLocal = this.state.flowPic;
        paperPic.splice(index, 1);
        paperPicLocal.splice(index, 1)
        this.setState({upimgUrl: paperPic, flowPic: paperPicLocal,});
    }

    getEndFlowType() {
        let type = this.props.lastStatus;
        let businessType = this.props.businessType;
        switch (this.props.lastStatus) {
            case '报备提交':
                return '报备';
                break;
            case '报备成功':
                return '到访';
                break;
            case '到访成功':
                if (businessType == '销售') {
                    return '认购'
                } else {
                    return '意向'
                }
                break;
            case '认购成功':
            case '意向成功':
                return '签约'
                break;
        }
    }

    save() {
        if (this.state.upimgUrl.length<1) {
            this.msgShort('必须上传凭证图片');
            return;
        }else if (!this.state.failedType) {
            this.msgShort('必须选择结束进展原因');
            return;
        }

        storage.load({
            key: keys.addBusinessFlow,
            syncInBackground: false,
            syncParams: {
                url: apis.addBusinessFlow + '?id=' + this.props.businessId,
                body: {
                    flowType: this.state.endFlowType,
                    flowStatus: this.state.endFlowType + '失败',
                    flowMark: this.state.mark,
                    flowPic: this.state.upimgUrl.join(';'),
                    failedType: this.state.failedType,
                    operatorType: '项目经理',
                    operatorId: this.state.currentUser.id
                },
            },
        }).then(ret => {
            if (ret.status == 200) {
                try {
                    let type = null;
                    switch (this.props.lastStatus) {
                        case '报备提交':
                            type = '报备失败';
                            break;
                        case '报备成功':
                            type = '到访结束';
                            break;
                        case '到访成功':
                            type = '认购意向结束';
                            break;
                        case '认购成功':
                        case '意向成功':
                            type = '签约结束';
                            break;
                    }
                    if (type) {
                        storage.load({
                            key: keys.businessNotify,
                            syncInBackground: false,
                            syncParams: {
                                url: apis.businessNotify + '?type=' + type + '&businessId=' + this.state.businessId
                            },
                        }).catch(err => {});
                    }
                } catch (e) {}

                this.closeLoading();
                this.msgShort('保存成功');
                Actions.pop({
                    refresh: {
                        random: Math.random()
                    }
                });
            } else {
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
            {
                key: index++,
                section: true,
                label: '请选择结束进展原因',
            },
        ];
        switch (this.props.lastStatus) {
            case '报备提交':
                data.push({
                    key: index++,
                    label: '案场老客户',
                })
                data.push({
                    key: index++,
                    label: '客户信息虚假',
                })
                data.push({
                    key: index++,
                    label: '未联系到经纪人',
                })
                data.push({
                    key: index++,
                    label: '项目合同结束',
                })
                data.push({
                    key: index++,
                    label: '其他',
                })
                break;
            case '报备成功':
                data.push({
                    key: index++,
                    label: '客户未到访',
                })
                data.push({
                    key: index++,
                    label: '客户已签约其他项目',
                })
                data.push({
                    key: index++,
                    label: '客户报备时间超保护期',
                })
                data.push({
                    key: index++,
                    label: '开发商政策调整',
                })
                data.push({
                    key: index++,
                    label: '其他',
                })
                break;
            case '到访成功':
                data.push({
                    key: index++,
                    label: '客户无意向',
                })
                data.push({
                    key: index++,
                    label: '客户已签约其他项目',
                })
                data.push({
                    key: index++,
                    label: '开发商政策调整',
                })
                data.push({
                    key: index++,
                    label: '其他',
                })
                break;
            case '认购成功':
            case '意向成功':
                data.push({
                    key: index++,
                    label: '客户未签约',
                })
                data.push({
                    key: index++,
                    label: '客户退认购',
                })
                data.push({
                    key: index++,
                    label: '客户退签约',
                })
                data.push({
                    key: index++,
                    label: '开发商政策调整',
                })
                data.push({
                    key: index++,
                    label: '其他',
                })
                break;
        }

        return (<View style={[styles.container, styles.viewMargin,]}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>

            <View style={[styles.nav]}>
                  <TouchableHighlight style={[styles.navLeft]} underlayColor="transparent" onPress={()=>{this.confirm(
                    {
                      text:'确定结束编辑',
                      ok:{click:()=>{Actions.pop({refresh:{flag:Math.random()}})},text:'确定'},
                      no:{text:'取消'},
                    })}}>
                      <Image source={require('../../images/back.png')}></Image>
                  </TouchableHighlight>
                  <View style={[styles.navCenter]}>
                        <Text style={[fonts.t2_Black]}>结束进展</Text>
                  </View>
            </View>
            <ScrollView ref={(scrollView) => {
                    _scrollView = scrollView;
                }} automaticallyAdjustContentInsets={false}>
                <View style={[styles.enterView]}>
                    <Image source={require('../../images/customerEnter.png')}></Image>
                    <Text style={[styles.enterTitle, fonts.bodyText_Black,]}>被结束交易</Text>
                </View>
                <View style={[styles.listView1,styles.borderView,]}>
                    <Text style={[styles.listViewText, fonts.bodyText_Black,]}>项目名称：<Text style={fonts.bodyText_Gray}>{this.props.business.project.name}</Text>
                    </Text>
                </View>
                <View style={[styles.listView1]}>
                    <Text style={[styles.listViewText, fonts.bodyText_Black,]}>客户姓名：<Text style={fonts.bodyText_Gray}>{this.props.business.customer.name}</Text>
                    </Text>
                </View>
                <View style={[styles.listView1,styles.bw]}>
                    <Text style={[styles.listViewText, fonts.bodyText_Black,]}>联系方式：<Text style={fonts.bodyText_Gray}>{this.props.business.customer.tel}</Text>
                    </Text>
                </View>
                <View style={[styles.listView,styles.bd10,styles.borderView]}>
                    <Text style={[styles.listViewText, fonts.bodyText_Black,]}>当前交易进展：</Text>
                    <Text style={fonts.bodyText_Gray}>{this.props.lastStatus}</Text>
                </View>
                <View style={styles.drowView}>
                    <View style={styles.drowViewBtn}>
                        <Text style={[fonts.bodyText_Blue]}>*</Text>
                        <Text style={[fonts.bodyText_Black, styles.flexLabel,]}>结束进展原因:</Text>
                        <ModalPicker data={data} style={styles.flexLabel} initValue="Select something yummy!" cancelText="取消" cancelStyle={{
                                backgroundColor: "#fff"
                            }} optionContainer={{
                                backgroundColor: "#fff"
                            }} onChange={(option) => {
                                this.setState({failedType: option.label})
                            }}>
                            <TextInput style={[fonts.bodyText_Black, styles.textInputValue,]} editable={false} placeholder="" value={this.state.failedType}/>
                        </ModalPicker>
                        <Image source={require('../../images/dropFlag.png')}/>
                    </View>
                </View>
                <View style={[styles.remarks1]}>
                    <Text style={[fonts.bodyText_Black]}>  结束交易说明:</Text>
                    <TextInput style={[styles.remarksInput1,fonts.bodyText_Gray,]} underlineColorAndroid="transparent" clearButtonMode="always" returnKeyType='done' placeholder="请填写..."  placeholderTextColor="#ccc" onChangeText={(text) => {
                            this.setState({mark: text})
                        }} onFocus={() => {
                            _scrollView.scrollTo({y: 0});
                        }} blurOnSubmit={true}/>
                </View>
                <View style={styles.endView1}>
                    <View style={[styles.title1]}>
                        <Text style={[fonts.bodyText_Blue]}>*</Text>
                        <Text style={[styles.titleText, fonts.bodyText_Black,]}>上传凭证</Text>
                    </View>
                    <View style={[styles.view]}>
                        <View style={{
                                flexWrap: 'wrap',
                                flexDirection: "row",
                                marginLeft: 15,
                                marginRight: 15
                            }}>
                            {
                                this.state.flowPic.map((m, i) => {
                                    return (<TouchableHighlight underlayColor="transparent" key={i} onPress={() => this.deletePaperPic(i)}>
                                        <Image style={{
                                                width: 100,
                                                height: 100,
                                                marginRight: 10,
                                                marginBottom: 10,
                                            }} source={{
                                                uri: m
                                            }} key={i}>
                                            <Image style={{position:'absolute',top:0,right:0}} source={require('../../images/closeImg.png')}></Image>
                                            </Image>
                                    </TouchableHighlight>)
                                })
                            }
                            {
                                this.state.flowPic.length < 6
                                    ? <TouchableHighlight underlayColor="transparent" onPress={() => this._upload()}>
                                            <Image style={{
                                                    width: 100,
                                                    height: 100,
                                                    marginRight: 10,
                                                    marginBottom: 10,
                                                }} source={require('../../images/addImg.png')}></Image>
                                        </TouchableHighlight>
                                    : null
                            }
                        </View>
                    </View>
                </View>
                <View style={[styles.viewBtn1]}>
                    <TouchableHighlight style={[styles.listBtn2]} onPress={() => {
                            this.save()
                        }}>
                        <Text style={[fonts.btnText_white]}>提交</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>

            {this.renderModal()}{this.renderLoading()}
        </View>);
    }
}
AppRegistry.registerComponent('RecordProgress', () => RecordProgress);
