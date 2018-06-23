import * as WeChat from 'react-native-wechat';

export const shareHelper={
  checkIsInstallWechat(){
    return WeChat.isWXAppInstalled().then((isInstalled) => {
      return isInstalled;
    });
  },

  checkIsSupportApi(){
    return WeChat.isWXAppSupportApi().then(isSupport=>{
      return isSupport;
    })
  },
  //data:{
  //type:类型   包含：news，image，video，audio
  //title:标题  分享后的title
  //description:描述   分享后的描述内容
  //url:分享后的链接（根据不同的type，url对应的链接也不同请查看代码的switch）
  //}
  shareToTimeline(data){
    console.log(data);
    let webpageUrl='',imageUrl='',videoUrl='',musicUrl=''
    let config = {type:data.type,title:data.title,description:data.description,mediaTagName:undefined,messageExt:undefined}
    switch (data.type) {
      case 'news':
        config.webpageUrl=data.url
        break;
      case 'image':
        config.imageUrl=data.url
        break;
      case 'video':
        config.videoUrl=data.url
        break;
      case 'audio':
        config.musicUrl=data.url
        break;
      default:
        config.webpageUrl=data.url
    }
    if (data.thumbImage) {
      config.thumbImage=data.thumbImage
    }else {
      config.thumbImage='https://static.youpuchina.com/image/20170901/1504263436382011529.jpg'
    }
    console.log(config);
    return WeChat.shareToTimeline(config)
  },
  //data:{
  //type:类型   包含：news，image，video，audio
  //title:标题  分享后的title
  //description:描述   分享后的描述内容
  //url:分享后的链接（根据不同的type，url对应的链接也不同请查看代码的switch）
  //}
  shareToSession(data){
    let webpageUrl='',imageUrl='',videoUrl='',musicUrl=''
    let config = {type:data.type,title:data.title,description:data.description,mediaTagName:undefined,messageExt:undefined}
    switch (data.type) {
      case 'news':
        config.webpageUrl=data.url
        break;
      case 'image':
        config.imageUrl=data.url
        break;
      case 'video':
        config.videoUrl=data.url
        break;
      case 'audio':
        config.musicUrl=data.url
        break;
      default:
        config.webpageUrl=data.url
    }
    if (data.thumbImage) {
      config.thumbImage=data.thumbImage
    }else {
      config.thumbImage='https://static.youpuchina.com/image/20170901/1504263436382011529.jpg'
    }
    return WeChat.shareToSession(config)
  }


}
