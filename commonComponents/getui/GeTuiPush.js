import { Platform, Alert } from 'react-native';
import Getui from 'react-native-getui'
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import { apis,sites } from '../../systemComponents/Remote/ApiStorage';

var platform = (Platform.OS === 'ios') ? 'IOS' : 'Android';

export const GeTuiPush = {

  // 记录设备信息
  recordDeviceInfo(id){
    try {
      Getui.clientId((param) => {
        if(param) {
          this.saveDeviceInfo(id, param);
        }
      })
    } catch (e) {

    }
  },
  // 记录设备信息
  checkDeviceInfo(id){
    try {
      Getui.clientId((param) => {
        if(param) {
          storage.load({
            key: keys.cid,
            syncInBackground: true
          }).then(cid => {
            if(param != cid){
              this.saveDeviceInfo(id, cid);
            }
          }).catch(e => {
            this.saveDeviceInfo(id, param);
          });
        }
      })
    } catch (e) {

    }
  },
  // 保存cid
  saveDeviceInfo(id, cid) {
    storage.load({
      key: keys.recordDeviceInfo,
      syncInBackground: false,
      syncParams: {
        url: apis.recordDeviceInfo +'?id=' + id + '&platform=' + platform + '&cid=' + cid
      }
    });
    storage.save({
      key: keys.cid,
      data: cid,
      expires: null
    });
  }
}
