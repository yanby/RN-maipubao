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
var moment = require('moment');
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/tourists/SignedForm';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel,} from 'react-native-simple-radio-button';
import {Actions, ActionConst,} from 'react-native-router-flux';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import {apis, sites, staticSite,} from '../../systemComponents/Remote/ApiStorage';
import DatePicker from 'react-native-datepicker';
import BasicComponent from '../basic/BasicComponent';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class SignedForm extends BasicComponent {
    constructor(props) {
        super(props);
        let nowTime = new Date().getTime();
        let updateTime = moment(nowTime).format("YYYY-MM-DD");
        this.state = {
            modalObject: {},
            loadingObject: {},
            customer: this.props.customer,
            businessId: this.props.businessId,
            types1: [
                {
                    label: '男',
                    value: '男',
                }, {
                    label: '女',
                    value: '女',
                },
            ],
            gender: this.props.customer.gender,
            types2: [
                {
                    label: '招商',
                    value: '招商',
                }, {
                    label: '销售',
                    value: '销售',
                },
            ],
            customerName: this.props.customer.name,
            customerTel: this.props.customer.tel,
            idCardNo: this.props.customer.idCardNo,
            signType: '招商',
            projectName: '',
            signShopNo: '',
            signPrice: '',
            signTime: updateTime,
            currentUser: '',
            signPic: null,
            flowMark: '',
            idPic: [],
            paperPic: [],
            idPicLocal: [],
            paperPicLocal: []
        }
    }

    componentWillMount() {
        storage.load({key: keys.currentUser}).then(retJson => {
            this.setState({currentUser: retJson})
        });
    }

    _uploadPaper() {
        if (this.state.paperPic.length > 6) {
            this.msgShort('最多上传6张签约凭证');
            return;
        }
        this.uploadModal(true, (image) => {
            image.then(a => {
                if (a && a.length > 0) {
                    this.closeModal();
                    if (this.state.paperPic.length + a.length > 6) {
                        this.timer = setTimeout(() => {
                            this.msgShort('最多只能选择6张图片');
                            clearTimeout(this.timer);
                        }, 500);
                        return;
                    }
                    this.openLoading('正在上传');
                    let uploadFlagNum = 0;
                    for (var j = 0; j < a.length; j++) {
                        let x = a[j];
                        this.uploadToRemote(x.path).then(respones => {
                            let paperPic = this.state.paperPic;
                            let paperPicLocal = this.state.paperPicLocal;

                            paperPicLocal.push(x.path);
                            paperPic.push(respones.url);
                            this.setState({paperPic: paperPic, paperPicLocal: paperPicLocal});
                            if (uploadFlagNum === a.length - 1) {
                                this.closeLoading();
                            }
                            uploadFlagNum++;
                        });
                    }
                } else if (a && a.path) {
                    this.closeModal();
                    if (this.state.paperPic.length >= 6) {
                        this.timer = setTimeout(() => {
                            this.msgShort('最多只能选择6张图片');
                            clearTimeout(this.timer);
                        }, 500);
                        return;
                    }
                    this.openLoading('正在上传');
                    this.uploadToRemote(a.path).then(respones => {
                        let paperPic = this.state.paperPic;
                        let paperPicLocal = this.state.paperPicLocal;

                        paperPicLocal.push(a.path);
                        paperPic.push(respones.url);
                        this.setState({paperPic: paperPic, paperPicLocal: paperPicLocal});
                        this.closeLoading();
                    });
                }
            })
        })
    }

    _uploadIDCard() {
        if (this.state.idPic.length > 6) {
            this.msgShort('最多上传6张身份证');
            return;
        }
        this.uploadModal(true, () => {});
        this.uploadModal(true, (image) => {
            image.then(a => {
                if (a && a.length > 0) {
                    this.closeModal();
                    this.openLoading('正在上传');

                    let uploadFlagNum = 0;
                    for (var j = 0; j < a.length; j++) {

                        let x = a[j];
                        this.uploadToRemote(x.path).then(respones => {
                            let idPic = this.state.idPic;
                            let idPicLocal = this.state.idPicLocal;

                            idPicLocal.push(x.path);
                            idPic.push(respones.url);

                            this.setState({idPic: idPic, idPicLocal: idPicLocal});
                            if (uploadFlagNum === a.length - 1) {
                                this.closeLoading();
                            }
                            uploadFlagNum++;
                        });
                    }
                } else if (a && a.path) {
                    this.closeModal();
                    this.openLoading('正在上传');
                    this.uploadToRemote(a.path).then(respones => {
                        let idPic = this.state.idPic;
                        let idPicLocal = this.state.idPicLocal;

                        idPicLocal.push(a.path);
                        idPic.push(respones.url);

                        this.setState({idPic: idPic, idPicLocal: idPicLocal})
                        this.closeLoading();
                    });
                }
            })
        })

    }

    save() {
        if (this.validate()) {
            storage.load({
                key: keys.addBusinessFlow,
                syncInBackground: false,
                syncParams: {
                    url: apis.addBusinessFlow + '?id=' + this.props.businessId,
                    body: {
                        flowType: '签约',
                        flowStatus: '签约成功',
                        flowMark: this.state.flowMark,
                        flowPic: this.state.paperPic.join(';'),
                        signType: this.state.signType,
                        signProjectName: this.state.projectName,
                        signPrice: this.state.signPrice,
                        signTime: this.state.signTime,
                        signShopNo: this.state.signShopNo,
                        operatorType: '项目经理',
                        operatorId: this.state.currentUser.id
                    },
                },
            }).then(ret => {
                if (ret.status == 200) {
                    try {
                        storage.load({
                            key: keys.businessNotify,
                            syncInBackground: false,
                            syncParams: {
                                url: apis.businessNotify + '?type=录签约&businessId=' + this.state.businessId
                            },
                        }).catch(err => {});
                    } catch (e) {}

                    this.updateCustomer();
                } else {
                    this.closeLoading();
                    this.msgShort('保存失败');
                }
            }).catch(err => {
                this.closeLoading();
                this.msgShort('请求异常');
            });
        }
    }

    deleteIDpic(index) {
        let idPic = this.state.idPic;
        let idPicLocal = this.state.idPicLocal;
        idPic.splice(index, 1);
        idPicLocal.splice(index, 1)
        this.setState({idPic: idPic, idPicLocal: idPicLocal,});
    }

    deletePaperPic(index) {
        let paperPic = this.state.paperPic;
        let paperPicLocal = this.state.paperPicLocal;
        paperPic.splice(index, 1);
        paperPicLocal.splice(index, 1)
        this.setState({paperPic: paperPic, paperPicLocal: paperPicLocal,});
    }

    updateCustomer() {
        storage.load({
            key: keys.patchCustomer,
            syncInBackground: false,
            syncParams: {
                url: apis.patchCustomer + '/' + this.props.customer.id,
                body: {
                    name: this.state.customerName,
                    idCardNo: this.state.idCardNo,
                    tel: this.state.customerTel
                },
            },
        }).then(ret => {
            if (ret.status == 200) {
                this.closeLoading();
                Actions.pop({
                    refresh: {
                        random: Math.random()
                    }
                });
                // Actions.replace('ProjectCustomerDetails',{id:this.props.businessId,projectId:this.props.projectId});
            } else {
                this.closeLoading();
                this.msgShort('保存失败');
            }
        }).catch(err => {
            this.closeLoading();
            this.msgShort('请求异常');
        });

    }

    validate() {
        if (!this.state.customerName || this.state.customerName.length > 10) {
            this.msgShort('客户姓名不能为空或者长度不能超过10个字');
            return false;
        }
        if (!this.state.customerTel || !/(^[1][0-9]{10}$)/.test(this.state.customerTel)) {
            this.msgShort('手机号格式不正确')
            return false;
        }
        if (!this.state.idCardNo || !this.state.idCardNo.match(/^\d{15}$|^\d{18}$|^\d{17}(\d|X|x)$/)) {
            this.msgShort('身份证号格式不正确')
            return false;
        }
        if (!this.state.projectName) {
            this.msgShort('项目名称不能为空')
            return false;
        }
        if (!this.state.signShopNo || this.state.signShopNo.length > 20) {
            this.msgShort('商铺编号不能为空或者不能超过20个字')
            return false;
        }
        if (!this.state.signPrice || !this.state.signPrice.match(/^[1-9][0-9]*([.]{1}[0-9]{1,2})?$/)) {
            this.msgShort('签约价格必须为数字且不能超过9位')
            return false;
        }
        if (!this.state.signTime) {
            this.msgShort('请选择签约时间')
            return false;
        }
        // if (this.state.idPic.length==0 || this.state.idPic.length>6) {
        //   this.msgShort('身份证图片不能为空或者超过6张')
        //   return false;
        // }
        if (this.state.paperPic.length == 0 || this.state.paperPic.length > 6) {
            this.msgShort('签约凭证图片不能为空或者超过6张')
            return false;
        }
        if (this.state.flowMark.length > 50) {
            this.msgShort('备注信息不能超过50个字')
            return false;
        }
        return true;
    }

    render() {
        return (<View style={[styles.main]}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
            <View style={[styles.nav]}>
                <TouchableHighlight style={[styles.navLeft]} underlayColor="transparent" onPress={() => {
                        this.confirm({
                            text: '确定结束编辑',
                            ok: {
                                click: () => {
                                    Actions.pop({
                                        refresh: {
                                            flag: Math.random()
                                        }
                                    })
                                },
                                text: '确定'
                            },
                            no: {
                                text: '取消'
                            },
                        })
                    }}>
                    <Image source={require('../../images/back.png')}></Image>
                </TouchableHighlight>
                <View style={[styles.navCenter]}>
                    <Text style={[fonts.t2_Black]}>录签约</Text>
                </View>
            </View>
            <ScrollView style={[styles.scrollView]} ref={(scrollView) => {
                    _scrollView = scrollView;
                }} automaticallyAdjustContentInsets={false}>
                <View style={[styles.view]}>
                    <View style={[styles.title, styles.borderView,]}>
                        <Image source={require('../../images/qykhxx.png')}></Image>
                        <Text style={[styles.titleText, fonts.t3_Black,]}>签约客户信息</Text>
                    </View>
                    <View style={[styles.basicInput]}>
                        <View style={[styles.listView]}>
                            <Text style={[fonts.bodyText_Blue]}>*</Text>
                            <Text style={[styles.listViewText, fonts.bodyText_Black,]}>客户姓名：</Text>
                            <TextInput style={[styles.listInput, fonts.bodyText_Gray,]} underlineColorAndroid="transparent" clearButtonMode="always" returnKeyType='done' placeholder="请输入客户姓名" placeholderTextColor="#ccc" value={this.state.customerName} onChangeText={(text) => this.setState({customerName: text})} blurOnSubmit={true}/>
                        </View>
                    </View>
                    <View style={[styles.basicInput]}>
                        <View style={[styles.listView]}>
                            <Text style={[fonts.bodyText_Blue]}>*</Text>
                            <Text style={[styles.listViewText, fonts.bodyText_Black,]}>联系方式：</Text>
                            <TextInput style={[styles.listInput, fonts.bodyText_Gray,]} underlineColorAndroid="transparent" clearButtonMode="always" returnKeyType='done' placeholder="请输入客户手机号" placeholderTextColor="#ccc" value={this.state.customerTel} onChangeText={(text) => this.setState({customerTel: text})}/>
                        </View>
                    </View>
                    <View style={[styles.basicInput]}>
                        <View style={[styles.listView]}>
                            <Text style={[fonts.bodyText_Blue]}>*</Text>
                            <Text style={[styles.listViewText, fonts.bodyText_Black,]}>身份证号码：</Text>
                            <TextInput style={[styles.listInput, fonts.bodyText_Gray,]} underlineColorAndroid="transparent" clearButtonMode="always" returnKeyType='done' placeholder="请输入客户身份证" placeholderTextColor="#ccc" value={this.state.idCardNo} onChangeText={(text) => this.setState({idCardNo: text})}/>
                        </View>
                    </View>
                </View>
                <View style={[styles.view, styles.mt10,]}>
                    <View style={[styles.title, styles.borderView,]}>
                        <Image source={require('../../images/qyspxx.png')}></Image>
                        <Text style={[styles.titleText, fonts.t3_Black,]}>签约商铺信息</Text>
                    </View>
                    <View style={[styles.basicInput]}>
                        <View style={[styles.listView]}>
                            <Text style={[fonts.bodyText_Blue]}>*</Text>
                            <Text style={[styles.listViewText, fonts.bodyText_Black,]}>项目名称：</Text>
                            <TextInput style={[styles.listInput, fonts.bodyText_Gray,]} underlineColorAndroid="transparent" clearButtonMode="always" returnKeyType='done' placeholder="请输入项目名称" placeholderTextColor="#ccc" onChangeText={(text) => this.setState({projectName: text})} onFocus={() => {
                                    _scrollView.scrollTo({y: 180});
                                }}/>
                        </View>
                    </View>
                    <View style={[styles.basicInput]}>
                        <View style={[styles.listView]}>
                            <Text style={[fonts.bodyText_Blue]}>*</Text>
                            <Text style={[styles.listViewText, fonts.bodyText_Black,]}>商铺编号：</Text>
                            <TextInput style={[styles.listInput, fonts.bodyText_Gray,]} underlineColorAndroid="transparent" clearButtonMode="always" returnKeyType='done' placeholder="请输入商铺编号" placeholderTextColor="#ccc" onChangeText={(text) => this.setState({signShopNo: text})} onFocus={() => {
                                    _scrollView.scrollTo({y: 180});
                                }}/>
                        </View>
                    </View>
                </View>
                <View style={[styles.view, styles.mt10,]}>
                    <View style={[styles.title, styles.borderView,]}>
                        <Image source={require('../../images/qtqyxx.png')}></Image>
                        <Text style={[styles.titleText, fonts.t3_Black,]}>其他签约信息</Text>
                    </View>
                    <View style={[styles.listView]}>
                        <Text style={[fonts.bodyText_Blue]}>*</Text>
                        <Text style={[styles.listViewText, fonts.bodyText_Black,]}>签约类型：</Text>
                        <View style={styles.radioView}>
                            <RadioForm formHorizontal={true} animation={true}>
                                {
                                    this.state.types2.map((obj, i) => {
                                        var onPress = (value, index) => {
                                            this.setState({signType: value})
                                        }
                                        return (<RadioButton labelHorizontal={true} key={i}>
                                            <RadioButtonInput obj={obj} index={i} isSelected={this.state.signType == obj.value} onPress={onPress} buttonInnerColor={'#3a8ff3'} buttonOuterColor={this.state.signType == obj.value
                                                    ? '#eaeaea'
                                                    : '#eaeaea'} buttonSize={10} buttonOuterSize={18} buttonWrapStyle={{
                                                    marginLeft: 10
                                                }}/>
                                            <RadioButtonLabel obj={obj} index={i} onPress={onPress} labelStyle={{
                                                    color: '#333'
                                                }} labelWrapStyle={{
                                                    marginLeft: 10
                                                }}/>
                                        </RadioButton>)
                                    })
                                }
                            </RadioForm>
                        </View>
                    </View>
                    <View style={[styles.basicInput]}>
                        <View style={[styles.listView]}>
                            <Text style={[fonts.bodyText_Blue]}>*</Text>
                            <Text style={[styles.listViewText, fonts.bodyText_Black,]}>签约价格：</Text>
                            <TextInput style={[styles.listInput, fonts.bodyText_Gray,]} underlineColorAndroid="transparent" clearButtonMode="always" returnKeyType='done' placeholder="请输入签约价格" placeholderTextColor="#ccc" onChangeText={(text) => this.setState({signPrice: text})} onFocus={() => {
                                    _scrollView.scrollTo({y: 180});
                                }}/>
                            <Text style={[fonts.bodyText_Black]}>元</Text>
                        </View>
                    </View>
                    <View style={[styles.basicInput]}>
                        <View style={[styles.listView]}>
                            <Text style={[fonts.bodyText_Blue]}>*</Text>
                            <Text style={[styles.listViewText, fonts.bodyText_Black,]}>签约日期：</Text>
                            <DatePicker style={{
                                    width: 200,
                                    height: 20,
                                    flex: 1,
                                }} date={this.state.signTime} mode="date" placeholder="请选择" format="YYYY-MM-DD" minDate="1980-01-01" maxDate="2100-01-01" confirmBtnText="确认" cancelBtnText="取消" showIcon={false} customStyles={{
                                    dateInput: {
                                        height: 20,
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        borderWidth: 0
                                    }
                                }} onDateChange={(date) => {
                                    this.setState({signTime: date})
                                }}/>
                            <Image style={styles.imgMl} source={require('../../images/more.png')}></Image>
                        </View>
                    </View>
                    <View style={[styles.basicInput]}>
                        <View style={[styles.listView]}>
                            <Text style={[fonts.bodyText_Blue]}>*</Text>
                            <Text style={[styles.listViewText, fonts.bodyText_Black,]}>签约面积：</Text>
                            <TextInput style={[styles.listInput, fonts.bodyText_Gray,]} underlineColorAndroid="transparent" clearButtonMode="always" returnKeyType='done' placeholder="请输入签约面积" placeholderTextColor="#ccc" onChangeText={(text) => this.setState({signPrice: text})} onFocus={() => {
                                    _scrollView.scrollTo({y: 180});
                                }}/>
                            <Text style={[fonts.bodyText_Black]}>㎡</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.view]}>
                    <View style={[styles.addImg]}>
                        <Text style={[fonts.bodyText_Blue]}>*</Text>
                        <Text style={[fonts.bodyText_Black]}>上传签约凭证：</Text>
                    </View>
                    <View style={{
                            flexWrap: 'wrap',
                            flexDirection: "row",
                            marginLeft: 15,
                            marginRight: 15,
                            marginTop: 20,
                        }}>
                        {
                            this.state.paperPicLocal.map((m, i) => {
                                return (<TouchableHighlight underlayColor="transparent" key={i} onPress={() => this.deletePaperPic(i)}>
                                    <Image style={{
                                            width: 100,
                                            height: 100,
                                            marginRight: 10,
                                            marginBottom: 10,
                                            borderRadius: 6
                                        }} source={{
                                            uri: m
                                        }} key={i}>
                                        <Image style={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0
                                            }} source={require('../../images/closeImg.png')}></Image>
                                    </Image>
                                </TouchableHighlight>)
                            })
                        }
                        {
                            this.state.paperPicLocal.length < 6
                                ? <TouchableHighlight underlayColor="transparent" onPress={() => this._uploadPaper()}>
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

                <View style={[styles.view]}>
                    <View style={[styles.remarks]}>
                        <Text style={[fonts.bodyText_Black]}>备注</Text>
                        <TextInput style={[styles.remarksInput, fonts.bodyText_Gray,]} multiline={true} underlineColorAndroid="transparent" clearButtonMode="always" returnKeyType='done' placeholder="请填写......" placeholderTextColor="#ccc" onChangeText={(text) => this.setState({flowMark: text})} onFocus={() => {
                                _scrollView.scrollTo({y: 720});
                            }} blurOnSubmit={true}/>
                    </View>
                </View>
            </ScrollView>
            <View style={[styles.viewBtn]}>
                <TouchableHighlight style={[styles.listBtn2]} underlayColor="#3a8ff3" onPress={() => {
                        this.save()
                    }}>
                    <Text style={[fonts.btnText_white]}>提交</Text>
                </TouchableHighlight>
            </View>
            {this.renderModal()}{this.renderLoading()}
        </View>);
    }
}
AppRegistry.registerComponent('SignedForm', () => SignedForm);
