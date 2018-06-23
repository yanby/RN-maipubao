import {Platform} from 'react-native';
import { apis,sites,uploadFileAction } from './ApiStorage'
import {keys} from '../SyncStorage/StorageKeys'

export const fetchGet=(url,params)=>{

  return _fetch(url,'GET',null,params);
}

export const fetchPost=(url,params)=>{
  let { syncParams: { body } } = params;
  return _fetch(url,'POST',body,params);
}

export const fetchPatch=(url,params)=>{
  let { syncParams: { body } } = params;
  return _fetch(url,'PATCH',body,params);
}

export const fetchDelete=(url,params)=>{
  let { syncParams: { body } } = params;
  return _fetch(url,'DELETE',body,params);
}
export const fetchFile=(fileURL)=>{
  let data = new FormData()
  data.append('file', {uri: fileURL, name: 'image.jpg', type: 'image/jpg'});
  let tempHeaders=Platform.OS === 'ios'?headers:imageHeader;
  let fetchParams = {method: 'POST',headers:tempHeaders,body:data}
  return fetch(uploadFileAction, fetchParams).then((response)=>{
    if (response.status=200) {
      return response.json()
    }else {
      return Promise.reject('error');
    }
  })
}

export const _fetch=(url,method,body,params)=>{
  let { resolve, reject, syncParams: { extraFetchOptions,isComplateUseCustomUrl } } = params;
  let fetchParams = {method: method,headers:headers,...extraFetchOptions};
  if (body) {
    fetchParams.body = JSON.stringify(body);
  }
  // console.log(url);
  // console.log(params);
  let _url = 'bj';
  return storage.load({key: keys.currentRemoteSite }).then(ret=>{
    switch (ret) {
      case 'bj':
        _url = sites.bj + url;
        break;
      case 'sh':
        _url = sites.sh + url;
        break;
      case 'tj':
        _url = sites.tj + url;
        break;
      case 'hn':
        _url = sites.hn + url;
        break;
      case 'cs':
        _url = sites.cs + url;
        break;
      case 'sy':
        _url = sites.sy + url;
        break;
      case 'sq':
        _url = sites.sq + url;
        break;
      case 'xz':
        _url = sites.xz + url;
        break;
      default:
        _url = sites.bj + url;
        break;
    }
    if (isComplateUseCustomUrl) {
        _url = url;
    }
    console.log(_url);
    return fetch(_url, fetchParams).then(json => {
        if(json){
          resolve && resolve(json);
        }
        else{
          reject && reject(new Error('data parse error'));
        }
    }).catch(err => {
          reject && reject(err);
    });
  }).catch((error)=>{
      storage.save({
         key: keys.currentRemoteSite,
         data: "bj",
         expires: null
      });
      reject && reject(err);
  });

}

const headers = {
  'Accept': 'application/json',
  'Content-Type':'application/json',
  'Authorization':'Basic dXAtYXBpLWNvbnN1bWVyOlVQLUBQMS1QUjBWMURFUg=='
}
const imageHeader={
  'Accept': 'application/json',
  'Content-Type':'multipart/form-data'
}
