import {Platform} from 'react-native';
import { apis, staticSite,currentVersion } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../SyncStorage/StorageKeys'


//判断版本是否需要弹出窗体提示更新
export const checkVersion=(remoteVersion)=>{
    if (remoteVersion && currentVersion < remoteVersion) {
      return storage.load({key:keys.customVersionFromRemote}).then(customVersionFromRemote=>{
        console.log(customVersionFromRemote);
        console.log(remoteVersion);
        //updateBasicVersion(remoteVersion);
        if (!customVersionFromRemote||customVersionFromRemote<remoteVersion) {
          return 1
        }else {
          return 2
        }
      }).catch(error=>{
        //updateBasicVersion(remoteVersion);
        return 1
      })
    }else {
      return Promise.resolve(3)
    }
}
export const updateBasicVersion=(remoteVersion)=>{
  storage.save({
    key:keys.customVersionFromRemote,
    data:remoteVersion,
    expires: 1000 * 3600 * 24 * 3
  })
}

//获取远程服务器最新版本号
export const getRemoteVersion=()=>{
  return storage.load({
    key: keys.checkVersion,
    syncInBackground: false,
    syncParams: {
       url: staticSite+apis.checkVersion+'?random='+Math.random(),
       isComplateUseCustomUrl:true,
    }
  }).then(ret => {
    if (ret.status==200) {
      return ret.json()
    }else {
      return Promise.reject('请求失败');
    }
  }).then(data => {
      return data
  }).catch(err=>{
      return null
  })
}
