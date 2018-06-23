import React, { Component } from 'react';
import { View,ListView,FlatList,Text,StyleSheet,Modal,Image,TouchableHighlight} from 'react-native';
import {fonts} from '../../styles/commonStyle/Font';
import { NiceList } from '../niceList/NiceList';


import { Loading } from '../loading/Loading';



export class NiceEditList extends Component {
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
      renderItem:this.props.renderItem,
      page:this.props.page?this.props.page:0,
      remoteUrl:this.props.remoteUrl,
      storkey:this.props.storkey,
      renderSeparat:this.props.renderSeparat,
      contentContainerStyle:this.props.contentContainerStyle,
      pageSize:this.props.pageSize?this.props.pageSize:15,
      isNeedLoading:this.props.isNeedLoading,
      selectIndexArrary:this.props.selectIndexArrary ? this.props.selectIndexArrary : [],//当前选中的所有的
      isMutex:this.props.isMutex,//是否互斥
      getTotalCount:this.props.getTotalCount?this.props.getTotalCount:(totalCount)=>{console.log(totalCount);},
      getTotalPages:this.props.getTotalPages?this.props.getTotalPages:(totalPages)=>{console.log(totalPages);},
      normalList:_normalList,
      noDataInfo:noDataInfo,
      noDataFun:noDataFun,
      isShowEmptyInfo:isShowEmptyInfo
    }
  }
  componentWillMount(){
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.remoteUrl!=this.state.remoteUrl) {
      let {renderItem,contentContainerStyle,remoteUrl,storkey} = nextProps;
      this.setState({selectIndexArrary:[],noDataInfo:nextProps.noDataInfo,noDataFun:nextProps.noDataFun,remoteUrl:remoteUrl,contentContainerStyle:contentContainerStyle,renderItem:renderItem,storkey:storkey});
    }
  }
  rowIndexChange(index){
    let tempArrary = [];
    if (this.state.isMutex) {
      tempArrary.push(index);
      this.setState({selectIndexArrary:tempArrary});
    }else {
      if (this.state.selectIndexArrary.indexOf(index)==-1) {
        tempArrary = this.state.selectIndexArrary;
        tempArrary.push(index);
        this.setState({selectIndexArrary:tempArrary});
      }else {
        tempArrary=[];
        for (var i = 0; i < this.state.selectIndexArrary.length; i++) {
          if (this.state.selectIndexArrary[i]!=index) {
            tempArrary.push(this.state.selectIndexArrary[i]);
          }
        }
        this.setState({selectIndexArrary:tempArrary});
      }
    }
    this.props.returnCheckArrary(tempArrary);
  }
  render(){
    return(
      <NiceList
        renderItem={(rowData)=>
          this.state.renderItem(rowData,this.state.selectIndexArrary,(index)=>{this.rowIndexChange(index)})}
        contentContainerStyle={this.state.contentContainerStyle}
        remoteUrl={this.state.remoteUrl}
        storkey={this.state.storkey}
        isNeedLoading={this.state.isNeedLoading}
        getTotalCount={(totalCount)=>{this.state.getTotalCount(totalCount)}}
        getTotalPages={(totalPages)=>{this.state.getTotalPages(totalPages)}}
        normalList={this.state.normalList}
        noDataInfo={this.state.noDataInfo}
        noDataFun={this.state.noDataFun}
        isShowEmptyInfo={this.state.isShowEmptyInfo}
         />


    )
  }
}
