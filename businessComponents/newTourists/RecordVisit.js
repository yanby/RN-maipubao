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
import {styles} from '../../styles/tourists/CommonRecord';
import {apis, sites, staticSite,} from '../../systemComponents/Remote/ApiStorage';
import {Actions, ActionConst,} from 'react-native-router-flux';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import BasicComponent from '../basic/BasicComponent';
import {Title} from '../../commonComponents/CommentTitle/Title';
export default class RecordVisit extends BasicComponent {
    constructor(props) {
        super(props);
        this.state = {
            modalObject: {},
            loadingObject: {},
            businessId: this.props.businessId,
            upimgUrl: [],
            mark: null,
            currentUser: null,
            paperPicLocal: [],
        }
    }

    componentWillMount() {
        storage.load({key: keys.currentUser}).then(retJson => {
            this.setState({currentUser: retJson})
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
                    this.state.paperPicLocal.push(a.path);
                    this.state.upimgUrl.push(respones.url);
                    this.setState({paperPicLocal: this.state.paperPicLocal});
                    this.closeLoading()
                });
            }
        })
    }

    deletePaperPic(index) {
        let paperPic = this.state.upimgUrl;
        let paperPicLocal = this.state.paperPicLocal;
        paperPic.splice(index, 1);
        paperPicLocal.splice(index, 1)
        this.setState({upimgUrl: paperPic, paperPicLocal: paperPicLocal,});
    }

    save() {
        if (this.state.upimgUrl.length < 1) {
            this.msgShort('必须上传凭证图片');
            return;
        }
        storage.load({
            key: keys.addBusinessFlow,
            syncInBackground: false,
            syncParams: {
                url: apis.addBusinessFlow + '?id=' + this.props.businessId,
                body: {
                    flowType: '到访',
                    flowStatus: '到访成功',
                    flowMark: this.state.mark,
                    flowPic: this.state.upimgUrl.join(';'),
                    operatorType: '项目经理',
                    operatorId: this.state.currentUser.id
                },
            },
        }).then(ret => {
            this.closeLoading();
            if (ret.status == 200) {
                try {
                    storage.load({
                        key: keys.businessNotify,
                        syncInBackground: false,
                        syncParams: {
                            url: apis.businessNotify + '?type=录到访&businessId=' + this.state.businessId
                        },
                    }).catch(err => {});
                } catch (e) {}

                this.closeLoading();
                Actions.pop({
                    refresh: {
                        random: Math.random()
                    }
                });
                // Actions.replace('ProjectCustomerDetails',{id:this.props.businessId,projectId:this.props.projectId});
            } else {
                this.msgShort('保存失败');
            }
        }).catch(err => {
            this.msgShort('请求异常');
        });
    }

    render() {
        return (<View style={[styles.main]}>
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
                          <Text style={[fonts.t2_Black]}>录到访</Text>
                    </View>
              </View>
            <ScrollView ref={(scrollView) => {
                    _scrollView = scrollView;
                }} automaticallyAdjustContentInsets={false} style={{
                    backgroundColor: "#fff"
                }}>
                <View style={[styles.title]}>
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
                            this.state.paperPicLocal.map((m, i) => {
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
                            this.state.paperPicLocal.length < 6
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
                <View style={styles.lineView}></View>
                <View style={[styles.newView]}>
                    <View style={[styles.remarks]}>
                        <Text style={[fonts.bodyText_Black]}>备注：</Text>
                        <TextInput style={[styles.remarksInput, fonts.bodyText_Gray,]} multiline={true} underlineColorAndroid="transparent" clearButtonMode="always" returnKeyType='done' placeholder="请填写......" placeholderTextColor="#ccc" onChangeText={(text) => this.setState({mark: text})} onFocus={() => {
                                _scrollView.scrollTo({y: 100});
                            }} blurOnSubmit={true}/>
                    </View>
                </View>
            </ScrollView>
            <View style={[styles.viewBtn]}>
                <TouchableHighlight style={[styles.listBtn2]} onPress={() => this.save()}>
                    <Text style={[fonts.btnText_white]}>提交</Text>
                </TouchableHighlight>
            </View>
            {this.renderModal()}{this.renderLoading()}
        </View>);
    }
}
AppRegistry.registerComponent('RecordVisit', () => RecordVisit);
