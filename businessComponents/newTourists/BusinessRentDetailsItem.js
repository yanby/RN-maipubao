import React, {Component} from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    PixelRatio,
    Platform,
    NativeModules,
    AsyncStorage,
    NativeAppEventEmitter,
    Dimensions,
    AppRegistry,
    TouchableHighlight,
    Modal
} from 'react-native';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/tourists/BusinessRentDetails';
var moment = require('moment');
export default class BusinessRentDetailsItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flowType: this.props.flowType
                ? this.props.flowType
                : '',
            flowStatus: this.props.flowStatus
                ? this.props.flowStatus
                : '',
            failedType: this.props.failedType
                ? this.props.failedType
                : '',
            mark: this.props.flowMark
                ? this.props.flowMark
                : null,
            operatorType: this.props.operatorType
                ? this.props.operatorType
                : '',
            createDate: this.props.createTime
                ? moment(this.props.createTime).format('YYYY-MM-DD')
                : '',
            createTime: this.props.createTime
                ? moment(this.props.createTime).format('HH:mm:ss')
                : '',
            updateDate: this.props.updateTime
                ? moment(this.props.updateTime).format('YYYY-MM-DD')
                : '',
            updateTime: this.props.updateTime
                ? moment(this.props.updateTime).format('HH:mm:ss')
                : '',
        };
    }

    getRenderText() {
        if (this.state.flowStatus.indexOf('成功完结') >= 0) {
            return '平台：该签约已结佣'
        } else if (this.state.flowStatus.indexOf('成功') >= 0) {
            let msg = '项目经理' + this.state.flowStatus;
            if (this.state.flowStatus.indexOf('报备')) {
                return msg;
            } else {
                return this.state.mark
                    ? (msg + '\r\n' + this.state.mark)
                    : msg;
            }
        } else if (this.state.flowStatus.indexOf('失败') >= 0) {
            let msg = '项目经理' + this.state.flowStatus + '【' + this.state.failedType + '】';
            return this.state.mark
                ? (msg + '\r\n' + this.state.mark)
                : msg;
        } else if (this.state.flowStatus.indexOf('已设置') >= 0) {
            return '平台：此签约单可申请结佣'
        } else if (this.state.flowStatus.indexOf('待审核') >= 0) {
            return '平台：申请结佣中'
        } else if (this.state.flowStatus.indexOf('报备提交') >= 0) {
            return '经纪人预约看房'
        }

    }

    render() {
        if (this.state.flowStatus == '') {
            return null;
        } else if (this.state.flowStatus.indexOf('失败') >= 0) {
            return (<View style={[styles.view1]}>
                <View style={[styles.viewLeft]}>
                    <View style={[styles.viewLeftList]}>
                        <Text style={[fonts.hintText_Gray, styles.red, styles.marginBottom5,]}>{this.state.createDate}</Text>
                        <Text style={[fonts.tinyText_Gray, styles.red, styles.marginBottom15,]}>{this.state.createTime}</Text>
                    </View>
                </View>
                <View style={{flex:1,paddingLeft:10}}>
                      <View style={[styles.viewRight]}>
                            <View style={[styles.viewRightList]}>
                                  <Text style={[fonts.bodyText_Gray, styles.red, styles.marginBottom10]} >{this.state.flowStatus}：<Text style={[fonts.hintText_Gray, styles.red,]}>{this.state.failedType}</Text>
                                  </Text>
                                  <Text style={[fonts.hintText_Gray, styles.marginBottom10,]}>项目经理结束该交易</Text>
                             </View>
                      </View>
                      <Image style={[styles.viewRightIcon]} source={require('../../images/businessFlow5.png')}/>
                </View>
            </View>);
        } else if (this.state.flowStatus.match(/报备成功|报备失败/)) {
            return (<View>
                <View style={[styles.view1]}>
                    <View style={[styles.viewLeft]}>
                        <View style={[styles.viewLeftList]}>
                            <Text style={[fonts.hintText_Gray, styles.marginBottom5,]}>{this.state.createDate}</Text>
                            <Text style={[fonts.tinyText_Gray, styles.marginBottom15,]}>{this.state.createTime}</Text>
                        </View>
                    </View>
                    <View style={{flex:1,paddingLeft:10}}>
                          <View style={[styles.viewRight]}>
                                <View style={[styles.viewRightList]}>
                                    <Text style={[fonts.bodyText_Gray, styles.marginBottom10]} >报备提交</Text>
                                    <Text style={[fonts.hintText_Gray, styles.marginBottom10]} >经纪人预约看房</Text>
                                </View>
                          </View>
                          <Image style={[styles.viewRightIcon]} source={require('../../images/businessFlow7.png')}/>
                    </View>
                </View>
                <View style={[styles.view1]}>
                    <View style={[styles.viewLeft]}>
                        <View style={[styles.viewLeftList]}>
                            <Text style={[fonts.hintText_Gray, styles.marginBottom5,]}>{this.state.updateDate}</Text>
                            <Text style={[fonts.tinyText_Gray, styles.marginBottom15,]}>{this.state.updateTime}</Text>
                        </View>
                    </View>
                    <View style={{flex:1,paddingLeft:10}}>
                          <View style={[styles.viewRight]}>
                                <View style={[styles.viewRightList]}>
                                    <Text style={[fonts.bodyText_Gray, styles.marginBottom10]} >{this.state.flowStatus}</Text>
                                    <Text style={[fonts.hintText_Gray, styles.marginBottom10]} >{this.getRenderText()}</Text>
                                </View>
                          </View>
                          <Image style={[styles.viewRightIcon]} source={require('../../images/businessFlow7.png')}/>
                    </View>
                </View>
            </View>);
        } else if (this.state.flowStatus.indexOf('成功') >= 0 || this.state.flowStatus.indexOf('待审核') >= 0) {
            return (<View style={[styles.view1]}>
                <View style={[styles.viewLeft]}>
                    <View style={[styles.viewLeftList]}>
                        <Text style={[fonts.hintText_Gray, styles.marginBottom5,]}>{this.state.createDate}</Text>
                        <Text style={[fonts.tinyText_Gray, styles.marginBottom15,]}>{this.state.createTime}</Text>
                    </View>
                </View>
                <View style={{flex:1,paddingLeft:10}}>
                      <View style={[styles.viewRight]}>
                            <View style={[styles.viewRightList]}>
                                <Text style={[fonts.bodyText_Gray, styles.marginBottom10]} >{this.state.flowStatus}</Text>
                                <Text style={[fonts.hintText_Gray, styles.marginBottom10]} >{this.getRenderText()}</Text>
                            </View>
                      </View>
                      <Image style={[styles.viewRightIcon]} source={require('../../images/businessFlow7.png')}/>
                </View>
            </View>);
        } else {
            return (<View style={[styles.view1]}>
                <View style={[styles.viewLeft]}>
                    <View style={[styles.viewLeftList]}>
                        <Text style={[fonts.hintText_Gray, styles.marginBottom5,]}>{this.state.updateDate}</Text>
                        <Text style={[fonts.tinyText_Gray, styles.marginBottom15,]}>{this.state.updateTime}</Text>
                    </View>
                </View>
                <View style={{flex:1,paddingLeft:10}}>
                      <View style={[styles.viewRight]}>
                            <View style={[styles.viewRightList]}>
                                <Text style={[fonts.bodyText_Gray, styles.marginBottom10]} >{this.state.flowStatus}</Text>
                                <Text style={[fonts.hintText_Gray, styles.marginBottom10]} >{this.getRenderText()}</Text>
                            </View>
                      </View>
                      <Image style={[styles.viewRightIcon]} source={require('../../images/jxz.png')}/>
                </View>
            </View>);
        }
    }

}
