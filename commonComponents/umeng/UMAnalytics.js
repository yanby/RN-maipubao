import { Platform } from 'react-native';
import { keys } from '../../systemComponents/SyncStorage/StorageKeys';

var UMNative = (Platform.OS === 'ios') ? require('react-native').NativeModules.UMNative : require('react-native').NativeModules.UmengNativeModule;

export const UMengAnalytics = {

  // 自定义事件
  onEvent(eventId){
    try {
      storage.load({
        key: keys.currentRemoteSite
      }).then(site => {
        if(site == 'sq') {
          UMNative.onEvent(site + '_' + eventId);
        } else {
          UMNative.onEvent(eventId);
        }
      }).catch((e)=>{
        console.error(e);
      });
    } catch (e) {
      console.error(e);
    }
  },

  // 页面开始的时候调用此方法
  onPageBegin(pageName){
    try {
      // UMNative.onPageBegin(pageName);
    } catch (e) {
      console.error(e);
    }
  },

  // 页面结束的时候调用此方法
  onPageEnd(pageName){
    try {
      // UMNative.onPageEnd(pageName);
    } catch (e) {
      console.error(e);
    }
  }
}
