import React, { Component } from 'react';
import { View,ListView,FlatList,Text,StyleSheet,Modal,Image,TouchableHighlight} from 'react-native';
import {fonts} from '../../styles/commonStyle/Font';

import { Loading } from '../loading/Loading';


export class NiceList extends Component {
  constructor(props){
    super(props);
    let _normalList = true;
    if (this.props.normalList === false) {
      _normalList=false;
    }
    let noDataInfo='您搜索的内容不存在哦';
    if (this.props.noDataInfo) {
      noDataInfo=this.props.noDataInfo;
    }
    let noDataFun = null;
    if (this.props.noDataFun) {
      noDataFun = this.props.noDataFun;
    }
    let isShowEmptyInfo = true;
    if (this.props.isShowEmptyInfo === false) {
      isShowEmptyInfo = false;
    }
    this.state={
      loadingObject:{},
      dataSource:[],
      renderItem:this.props.renderItem,
      page:this.props.page?this.props.page:0,
      remoteUrl:this.props.remoteUrl,
      storkey:this.props.storkey,
      renderSeparat:this.props.renderSeparat,
      contentContainerStyle:this.props.contentContainerStyle,
      refreshing:false,
      pageSize:this.props.pageSize?this.props.pageSize:15,
      totalPages:99999999,
      firstPageHasLoading:true,
      pageNetWorkHasError:false,
      hasData:true,
      pageLoading:false,
      isNeedLoading:this.props.isNeedLoading,
      loadingVisable:false,
      customListSourceFlag:this.props.customListSourceFlag,
      normalList:_normalList,
      noDataInfo:noDataInfo,
      noDataFun:noDataFun,
      isShowEmptyInfo:isShowEmptyInfo
    }
  }
  componentWillMount(){
    this.setState({firstPageHasLoading:true})
    this.getRemoteData();
  }
  async  componentWillReceiveProps(nextProps){
    if (nextProps.remoteUrl!=this.state.remoteUrl) {
      let {renderItem,contentContainerStyle,remoteUrl,storkey} = nextProps;
      await this.setState({noDataInfo:nextProps.noDataInfo,noDataFun:nextProps.noDataFun,customListSourceFlag:nextProps.customListSourceFlag,totalPages:99999999,normalList:nextProps.normalList,page:0,firstPageHasLoading:true,remoteUrl:remoteUrl,contentContainerStyle:contentContainerStyle,renderItem:renderItem,storkey:storkey,dataSource:[]});
       this.getRemoteData();
    }
  }
  _openLoading(){
    if (this.state.isNeedLoading&&this.state.firstPageHasLoading) {
      this.setState({loadingVisable:true});
    }
  }
  _closeLoading(){
    if (this.state.isNeedLoading) {
      let timer = setTimeout(()=>{
        this.setState({loadingVisable:false});
        clearTimeout(timer);
      },500);
    }
  }
  returnTotalPages(totalPages){
    if (this.props.getTotalPages) {
      this.props.getTotalPages(totalPages);
    }
  }
  returnTotalCount(totalCount){
    if (this.props.getTotalCount) {
      this.props.getTotalCount(totalCount);
    }
  }
   getRemoteData(){
    if (this.state.totalPages>=(this.state.page+1)) {
      let _url='';
      if (this.state.remoteUrl.indexOf('?')==-1) {
        _url = this.state.remoteUrl+'?size='+this.state.pageSize+'&page='+this.state.page
      }else {
        _url = this.state.remoteUrl+'&size='+this.state.pageSize+'&page='+this.state.page
      }
      this.setState({pageLoading:true});//开始加载数据
      this._openLoading();
       storage.load({key:this.state.storkey,syncInBackground: false,syncParams: {url:_url}}).then(ret=>{
        if(ret.status == '200'){
          return ret.json();
        }else if (ret.status == '404') {
          return Promise.reject('404');
        }else{
          return Promise.reject(ret);
        }
      }).then(retJson=>{
        let _tempData = retJson.content || retJson._embedded[this.state.customListSourceFlag];
        if (_tempData) {
          let _dataSource = this.state.dataSource.concat(_tempData);
          this.setState({dataSource: _dataSource,firstPageHasLoading:false});
          this.setState({hasData:_dataSource.length>0,pageLoading:false,pageNetWorkHasError:false});//加载完毕
        }
        let tempTotalPages = 0
        if (retJson.totalPages>=0) {
          tempTotalPages=retJson.totalPages;
        }else if (retJson.page&&retJson.page.totalPages>=0) {
          tempTotalPages=retJson.page.totalPages;
        }
        this.setState({totalPages:tempTotalPages});
        this.returnTotalPages(tempTotalPages);//返回
        this.returnTotalCount(this.state.dataSource.length);
        this._closeLoading();
      }).catch((error)=>{
        if (error === '404') {
          this.setState({hasData:false,firstPageHasLoading:false,pageLoading:false,pageNetWorkHasError:false});
        }else {
          console.log(this.state.storkey+error);
          this.setState({pageNetWorkHasError:true,firstPageHasLoading:false,pageLoading:false});
        }
        this._closeLoading();
      })
    }else {
      this.setState({firstPageHasLoading:false,pageLoading:false,pageNetWorkHasError:false});
      this._closeLoading();
    }
  }

  async _onEnd(){
    if (!this.state.pageLoading) {
      let currentPage = await this.state.page;
      currentPage = currentPage + 1;
      await this.setState({page:currentPage});
       this.getRemoteData();
    }

  }
  async _reFresh(){
    await this.setState({page:0,refreshing:true});
    let timer = setTimeout(()=>{
       this.setState({dataSource:[]});
       this.getRemoteData();
      clearTimeout(timer);
    },1000);
    await this.setState({refreshing:false});
  }
  renderNetWorkError(){
    if (this.state.pageNetWorkHasError&&this.state.normalList) {
      return <View style={styles.netWork}><Image source={require('../../images/ic.png')}/>
      <Text style={[fonts.t3_Gray,styles.marginTop10]}>网络开了小差</Text><Text style={[fonts.t3_Gray,styles.marginTop10]}>请检查您的网络</Text>
      <TouchableHighlight style={styles.touchBtn} underlayColor="transparent" onPress={()=>{this.getRemoteData()}}><Text style={fonts.bodyText_Gray}>重新加载</Text></TouchableHighlight>
      </View>;
    }
    return null;
  }
  renderNotFoundData(){
    if (!this.state.hasData&&!this.state.pageNetWorkHasError&&this.state.isShowEmptyInfo) {
      if (this.state.noDataFun) {
        return this.state.noDataFun();
      }else {
        return (
            <View style={styles.netWork}><Text style={fonts.t3_Gray}>{this.state.noDataInfo}</Text></View>
        )
      }
    }
    return null;
  }
  renderButtom(){
    let msg = '';
    if (this.state.firstPageHasLoading||!this.state.hasData||!this.state.normalList) {
      return null;
    }
    if (this.state.totalPages>=(this.state.page+1)&&this.state.pageLoading) {
      return <View style={styles.loadView}><Image style={styles.loadImg} source={require('../../images/load.gif')}/><Text style={fonts.tinyText_Gray}>正在努力加载。。</Text></View>
    }else {
      return <View style={styles.loadView}><Text style={fonts.tinyText_Gray}>已经没有更多了哦</Text></View>
    }
  }
  render(){
    return(
      <View style={styles.flex}>
      <Loading isShowImg={true} isVisible={this.state.loadingVisable} text={'正在加载'} ></Loading>

      {
        this.state.hasData&&!this.state.pageNetWorkHasError?<FlatList contentContainerStyle={this.state.contentContainerStyle}
                  data={this.state.dataSource}
                  onRefresh={()=>{this._reFresh()}}
                  refreshing={this.state.refreshing}
                  onEndReached={()=>this._onEnd()}
                  initialNumToRender={15}
                  ListFooterComponent={()=>this.renderButtom()}
                  keyExtractor={(item, index) => item.id}
                  onEndReachedThreshold={0.1}
                  renderItem={(rowData,a,index) => this.state.renderItem(rowData,a,index)}/>:null
      }

      {
        this.renderNotFoundData()
      }
      {
          this.renderNetWorkError()
      }
      </View>


    )
  }
}
export const styles = StyleSheet.create({
  flex:{
    flex:1,
  },
  netWork:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#f7f8fa",
  },
  touchBtn:{
    borderRadius:3,
    borderColor:"#eaeaea",
    borderWidth:1,
    paddingTop:12,
    paddingBottom:12,
    paddingLeft:30,
    paddingRight:30,
    marginTop:30,
  },
  firstEnterView:{
    backgroundColor:"transparent",
    alignItems:"center",
    justifyContent:'center',
    flex:1,
  },
  blackCenter:{
    width:80,
    height:85,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"rgba(0,0,0,0.8)",
    borderRadius:6,
  },
  refreshImg:{
    width:30,
    height:30,
    marginBottom:10,
    marginTop:10,
  },
  loadView:{
    alignItems:"center",
    justifyContent:"center",
    paddingTop:15,
    paddingBottom:15,
    flexDirection:"row"
  },
  loadImg:{
    width:17,
    height:17,
    marginRight:10,
  },
  marginTop10:{
    marginTop:10,
  }

});
