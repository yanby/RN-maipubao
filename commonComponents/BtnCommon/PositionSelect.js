import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableHighlight,
  Image,Dimensions
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';

import {styles} from '../modal/modalStyle';
import {fonts} from '../../styles/commonStyle/Font';
import { ModalIndex } from '../modal/ModalIndex';
import { Loading } from '../loading/Loading';
import { imageHelper } from '../imagePicker/ImagePickerHelper'
import { shareHelper } from '../wechat/WechatShare'
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import {apis,sites} from '../../systemComponents/Remote/ApiStorage';
import {cityData} from '../../businessComponents/data/CityData';

export default class PositionSelect extends Component {

  /** 获取地理位置（经纬度） */
  static getPosition = (callback) => {
    /** 获取地理位置 */
    navigator.geolocation.getCurrentPosition(
      (position: any) => {

        const positionData: any = position.coords;
        // 经度：
        let longitude = positionData.longitude;
        // 纬度：
        let latitude = positionData.latitude;
        storage.load({
          key: keys.getAddress,
          syncInBackground: false,
          syncParams: {
    	       url: apis.getAddress +'?longitude='+longitude+'&latitude='+latitude
          }
        }).then(ret => {
          if(ret.status == 200){
            return ret.json();
          }
        }).then(retJson=>{
          if(retJson.status == 0){
            let province = retJson.result.addressComponent.province;
            let city = retJson.result.addressComponent.city;
            callback({province:province,city:city});
          }else{
              callback();
          }
        }).catch(err=>{
          if (callback) {
            callback();
          }
        })
        // this.setState({longitude:longitude,latitude:latitude});
        // 最后一步 todo：高德 || 百度地图逆地理编码转~~具体就是调个接口把经纬度丢进去就行了

      },
      (error: any) => {
        if (callback) {
          callback();
        }

      }, {
        // 提高精确度，但是获取的速度会慢一点
        // enableHighAccuracy: true,
        // 设置获取超时的时间20秒
        timeout: 20000,
        // 示应用程序的缓存时间，每次请求都是立即去获取一个全新的对象内容
        maximumAge: 1000
      }
    );
  }

  //把定位的城市写入缓存
  static  _onPosition = (callback) => {
    PositionSelect.getPosition((backAddress)=>{
      if(backAddress != undefined && backAddress.province && backAddress.city){
        console.log(backAddress);
        let province = backAddress.province;
        let city = backAddress.city;
        let address = province+city;
        for(i=0;i<cityData.length;i++){
          if(address.indexOf(cityData[i].text)>-1){
            storage.save({
               key: keys.currentRemoteSite,
               data: cityData[i].value,
               expires: null
            });
            break;
          }
        }
      }
      callback();
    })
  }

  //查询缓存城市
  static  _getSite = (backSite) => {
    storage.load({
      key:keys.currentRemoteSite
    }).then(sites=>{
      backSite(sites);
    }).catch((error)=>{
      backSite('bj');
    })
  }
}
