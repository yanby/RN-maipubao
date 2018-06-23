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
import {styles} from '../../styles/tourists/ProjectCustomerDetails';
import {flow} from '../../styles/tourists/BusinessFlow';
import {apis} from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import BusinessHorizonLine from './BusinessHorizonLine';
import {Actions, ActionConst,} from 'react-native-router-flux';
var moment = require('moment');
import BasicComponent from '../basic/BasicComponent.js'
import {UMengAnalytics} from '../../commonComponents/umeng/UMAnalytics';

export default class ProjectCustomerDetails extends BasicComponent {
    constructor(props) {
        super(props);
        this.state = {
            modalObject: {},
            loadingObject: {},
            businessId: this.props.id,
            businessFlowId: null,
            business: null,
            flows: null
        }
    }
    componentWillReceiveProps(nextProps) {
        this._loadData();
    }
    componentWillMount() {
        this._loadData();
    }

    _loadData() {
        this.openLoading();
        storage.load({
            key: keys.getBusinessDetail,
            syncInBackground: false,
            syncParams: {
                url: apis.getBusinessDetail + '?id=' + this.state.businessId
            },
        }).then(ret => {
            if (ret.status == 200) {
                return ret.json();
            } else {
                this.closeLoading();
                this.msgShort('请求异常');
            }
        }).then(retJson => {
            if (retJson != null) {
                this.closeLoading();
                this.setState({
                    business: retJson,
                    flows: this.getFlowText(retJson.businessFlows)
                });
            } else {
                this.closeLoading();
                this.msgShort('获取交易数据异常');
            }
        }).catch(err => {
            this.closeLoading();
            this.msgShort('获取交易请求异常');
        });
    }

    getFlowText(flows) {
        let flowText = [];
        for (var i in flows) {
            flowText.push({
                type: flows[i].flowType,
                status: flows[i].flowStatus,
                date: flows[i].updateTime
                    ? moment(flows[i].updateTime).format('YYYY-MM-DD HH:mm:ss')
                    : null
            });
        }
        return flowText;
    }

    renderFlowImg(index) {
        if (this.state.flows[index].status == null) {
            return (<Image source={require('../../images/businessFlow1.png')}>
                <Text style={[flow.colorGray, flow.verticalListText,]}>{this.state.flows[index].type}</Text>
            </Image>);
        } else if (this.state.flows[index].status.indexOf('成功') >= 0 || this.state.flows[index].status.indexOf('待审核') >= 0) {
            return (<Image source={require('../../images/businessFlow3.png')}>
                <Text style={[flow.colorGreen, flow.verticalListText,]}>{this.state.flows[index].type}</Text>
            </Image>);
        } else if (this.state.flows[index].status.indexOf('失败') >= 0) {
            return (<Image source={require('../../images/businessFlow4.png')}>
                <Text style={[flow.colorRed, flow.verticalListText,]}>{this.state.flows[index].type}</Text>
            </Image>);
        } else {
            return (<Image source={require('../../images/businessFlow2.png')}>
                <Text style={[flow.colorYellow, flow.verticalListText,]}>{this.state.flows[index].type}</Text>
            </Image>);
        }
    }

    needShowSpareParts() {
        for (var i in this.state.business.businessFlows) {
            if (this.state.business.businessFlows[i].flowPic) {
                return true;
                break;
            }
        }
        return false;
    }

    renderBusinessFlowBtn() {
        let type = this.state.business.lastStatus;
        let flowType = this.state.business.businessType == '销售'
            ? '认购'
            : '意向';
        if (type == '报备提交') {
            return (<TouchableHighlight style={[styles.viewMore]} underlayColor="#3a8ff3" onPress={() => this.recordAudit(this.state.business.businessFlows[0].id)}>
                <Text style={[styles.viewTextMore, fonts.hintText_Blue,]}>审核报备成功</Text>
            </TouchableHighlight>)
        } else if (type == '报备成功') {
            return (<TouchableHighlight style={[styles.viewMore]} underlayColor="#3a8ff3" onPress={() => Actions.RecordVisit({businessId: this.state.businessId, projectId: this.props.projectId,})}>
                <Text style={[styles.viewTextMore, fonts.hintText_Blue,]}>录到访</Text>
            </TouchableHighlight>)
        } else if (type == '到访成功') {
            return (<TouchableHighlight style={[styles.viewMore]} underlayColor="#3a8ff3" onPress={() => Actions.RecordSubscription({businessId: this.state.businessId, flowType: flowType, projectId: this.props.projectId,})}>
                <Text style={[styles.viewTextMore, fonts.hintText_Blue,]}>录{flowType}</Text>
            </TouchableHighlight>)
        } else if (type == '意向成功' || type == '认购成功') {
            return (<TouchableHighlight style={[styles.viewMore]} underlayColor="#3a8ff3" onPress={() => Actions.SignedForm({businessId: this.state.businessId, customer: this.state.business.customer, projectId: this.props.projectId,})}>
                <Text style={[styles.viewTextMore, fonts.hintText_Blue,]}>录签约</Text>
            </TouchableHighlight>)
        }
        return null
    }

    recordAudit(flowId) {
        //添加弹窗询问代码
        this.confirm({
            text: '确认报备成功？报备成功的交易可到“待到访”列表中查询',
            ok: {
                click: () => {
                    this.updateBusinessFlow(flowId)
                },
                text: '确定',
            },
            no: {
                text: '取消'
            }
        });
    }

    updateBusiness() {
        storage.load({
            key: keys.patchBusiness,
            syncInBackground: false,
            syncParams: {
                url: apis.patchBusiness + '/' + this.state.businessId,
                body: {
                    lastStatus: '报备成功'
                },
            },
        }).then(ret => {
            if (ret.status == 200) {
                return ret.json();
            } else {
                this.closeLoading();
                this.msgShort('更新交易请求失败');
            }
        }).then(retJson => {
            if (retJson == null) {
                this.closeLoading();
                this.msgShort('更新交易请求返回异常');
            } else {
                try {
                    let type = '报备成功';
                    storage.load({
                        key: keys.businessNotify,
                        syncInBackground: false,
                        syncParams: {
                            url: apis.businessNotify + '?type=' + type + '&businessId=' + this.state.businessId
                        },
                    }).catch(err => {});
                } catch (e) {}
                this.closeLoading();
                this._loadData();
            }
        }).catch(err => {
            this.closeLoading();
            this.msgShort('更新交易请求异常');
        });
    }

    updateBusinessFlow(flowId) {
        this.openLoading('报备审核中');
        storage.load({
            key: keys.patchBusinessFlow,
            syncInBackground: false,
            syncParams: {
                url: apis.patchBusinessFlow + '/' + flowId,
                body: {
                    flowStatus: '报备成功',
                    operatorType: '项目经理'
                },
            },
        }).then(ret => {
            if (ret.status == 200) {
                return ret.json();
            } else {
                this.closeLoading();
                this.msgShort('更新交易流程请求失败');
            }
        }).then(retJson => {
            if (retJson != null) {
                this.updateBusiness();
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
        return (<View style={[styles.mainView]}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
            <View style={[styles.navC]}>
                <TouchableHighlight style={styles.navLeftC} underlayColor="transparent" onPress={() => Actions.pop({
                        refresh: {
                            selectTabIndex: 1
                        }
                    })}>
                    <Image source={require('../../images/back.png')}></Image>
                </TouchableHighlight>
                <View style={[styles.navCenterC]}>
                    <Text style={[fonts.t2_Black]}>交易详情</Text>
                </View>
            </View>
            {
                (this.state.business)
                    ? <ScrollView style={{
                                marginBottom: 50
                            }}>
                            <View style={[styles.view]}>
                                <View style={[styles.titleView]}>
                                    <Image source={require('../../images/xmmz.png')}></Image>
                                    <Text style={[styles.titleViewText, fonts.t3_Black,]}>项目名称</Text>
                                </View>
                                <View style={[styles.bodyView]}>
                                    <Text style={[styles.bodyViewText, fonts.bodyText_Black,]}>报备项目：<Text style={fonts.bodyText_Gray}>{this.state.business.project.name}</Text>
                                    </Text>
                                </View>
                            </View>
                            <View style={[styles.view]}>
                                <View style={[styles.titleView]}>
                                    <Image source={require('../../images/khxx.png')}></Image>
                                    <Text style={[styles.titleViewText, fonts.t3_Black,]}>客户信息</Text>
                                </View>
                                <View style={[styles.bodyView]}>
                                    <Text style={[styles.bodyViewText, fonts.bodyText_Black,]}>客户姓名：<Text style={fonts.bodyText_Gray}>{this.state.business.customer.name}</Text>
                                    </Text>
                                    <Text style={[styles.bodyViewText, fonts.bodyText_Black,]}>联系方式：<Text style={fonts.bodyText_Gray}>{this.state.business.customer.tel}</Text>
                                    </Text>
                                    {
                                        this.state.business.customer.brandName
                                            ? <Text style={[styles.bodyViewText, fonts.bodyText_Black,]}>品牌名称：<Text style={fonts.bodyText_Gray}>{this.state.business.customer.brandName}</Text>
                                                </Text>
                                            : null
                                    }
                                    <Text style={[styles.bodyViewText, fonts.bodyText_Black,]}>需求类型：<Text style={fonts.bodyText_Gray}>{this.state.business.customer.demandType}</Text>
                                    </Text>
                                    <Text style={[styles.bodyViewText, fonts.bodyText_Black,]}>预计到访时间：<Text style={fonts.bodyText_Gray}>{moment(this.state.business.businessFlows[0].expectedVisitTime).format('YYYY-MM-DD HH:mm')}</Text>
                                    </Text>
                                </View>
                            </View>
                            <View style={[styles.view]}>
                                <View style={[styles.titleView]}>
                                    <Image source={require('../../images/bbrxx.png')}></Image>
                                    <Text style={[styles.titleViewText, fonts.t3_Black,]}>报备人信息</Text>
                                </View>
                                <View style={[styles.bodyView]}>
                                    <Text style={[styles.bodyViewText, fonts.bodyText_Black,]}>用户姓名：<Text style={fonts.bodyText_Gray}>{this.state.business.user.name}</Text>
                                    </Text>
                                    <View style={[styles.row]}>
                                        <Text style={[styles.flex, styles.bodyViewText, fonts.bodyText_Black,]}>联系方式：<Text style={fonts.bodyText_Gray}>{this.state.business.user.account}</Text>
                                        </Text>
                                        <TouchableHighlight style={[styles.numBtn]} underlayColor="transparent" onPress={() => {
                                                UMengAnalytics.onEvent('project_customer_customer_details_connect_show');
                                                Linking.openURL('tel:' + this.state.business.user.account)
                                            }}>
                                            <Text style={[fonts.hintText_Blue]}>去联系</Text>
                                        </TouchableHighlight>
                                    </View>
                                    <Text style={[styles.bodyViewText, fonts.bodyText_Black,]}>用户类型：<Text style={fonts.bodyText_Gray}>{this.state.business.user.roleType}</Text>
                                    </Text>
                                </View>
                            </View>
                            <View style={[styles.view, styles.view1,]}>
                                <View style={[styles.titleView]}>
                                    <Image source={require('../../images/jyjz.png')}></Image>
                                    <Text style={[styles.titleViewText, fonts.t3_Black,]}>交易进展</Text>
                                    <View style={styles.rightTitle}>
                                        <Image source={require('../../images/jxz.png')}></Image>
                                        <Text style={[styles.rightTitleText, fonts.bodyText_Black,]}>进行中</Text>
                                        <Image source={require('../../images/businessFlow7.png')}></Image>
                                        <Text style={[styles.rightTitleText, fonts.bodyText_Black,]}>成功</Text>
                                        <Image source={require('../../images/businessFlow5.png')}></Image>
                                        <Text style={[styles.rightTitleText, fonts.bodyText_Black,]}>失败</Text>
                                    </View>
                                </View>
                                <View style={styles.flowsView}>
                                    <BusinessHorizonLine flows={this.state.flows}/>
                                </View>
                            </View>

                        </ScrollView>
                    : null
            }
            {this.state.business?
            <View style={styles.bottomView}>
                {
                    this.state.business.lastStatus.match(/报备提交$|报备成功$|到访成功$|认购成功$|意向成功$/)
                        ? <TouchableHighlight style={[styles.numBtnNo]} underlayColor="transparent" onPress={() => Actions.RecordProgress({businessId: this.state.businessId, lastStatus: this.state.business.lastStatus, businessType: this.state.business.businessType, business: this.state.business,})}>
                                <Text style={[fonts.hintText_Gray]}>结束交易</Text>
                            </TouchableHighlight>
                        : <TouchableHighlight style={[styles.numBtnNo1]} underlayColor="transparent">
                                <Text style={[fonts.hintText_Gray]}></Text>
                            </TouchableHighlight>
                }
                {
                    this.needShowSpareParts()
                        ? <TouchableHighlight style={[styles.viewMore]} underlayColor="transparent" onPress={() => Actions.SpareParts({flows: this.state.business.businessFlows})}>
                                <Text style={[styles.viewTextMore, fonts.hintText_Blue,]}>管理备件</Text>
                            </TouchableHighlight>
                        : null
                }
                <TouchableHighlight style={[styles.viewMore]} underlayColor="transparent" onPress={() => Actions.BusinessRentDetails({businessId: this.state.businessId, fromProject: true,})}>
                    <Text style={[styles.viewTextMore, fonts.hintText_Blue,]}>查看交易流程</Text>
                </TouchableHighlight>
                {this.renderBusinessFlowBtn()}
            </View>
            :null
          }
            {this.renderModal()}{this.renderLoading()}
        </View>);
    }
}
AppRegistry.registerComponent('ProjectCustomerDetails', () => ProjectCustomerDetails);
