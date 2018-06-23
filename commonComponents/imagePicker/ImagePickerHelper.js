import ImagePicker from 'react-native-image-crop-picker';
import { fetchFile } from '../../systemComponents/Remote/RemoteHelp'
import { staticSite } from '../../systemComponents/Remote/ApiStorage'


export const imageHelper={
  uploadFile(filePath){
    return fetchFile(filePath).then(response=>{
      return response
    }).catch(err=>{
      console.log(err);
    })
  },
  //从相册上传一个文件
  //crop:{isCrop:上传后是否立刻对文件剪裁，width:剪裁宽度，height：剪裁高度}
  uploadOne(crop){
    let config = {includeBase64:true,loadingLabelText:'',mediaType:'photo',compressImageQuality:0.2};
    if(crop.isCrop) {
      config.cropping = crop.isCrop;
      config.width = crop.width;
      confgi.height = crop.height;
    }
    return ImagePicker.openPicker(config).then(image => {
      return image;
    }).catch(err => {
      return err
    });
  },
  //从相册上传多个文件（该函数不支持对文件剪裁）
  uploadMul(){
    let config = {includeBase64:true,loadingLabelText:'',multiple: true,waitAnimationEnd: false,mediaType:'photo',compressImageQuality:0.2};
    return ImagePicker.openPicker(config).then(images => {
      return images
    }).catch(err => {
      return err
    });
  },
  //从相机上传一个文件
  //crop:{isCrop:上传后是否立刻对文件剪裁，width:剪裁宽度，height：剪裁高度}
  uploadWithCamera(crop){
    let config = {includeBase64:true,loadingLabelText:'',mediaType:'photo',compressImageQuality:0.2};
    if(crop.isCrop) {
      config.cropping = crop.isCrop;
      config.width = crop.width;
      config.height = crop.height;
    }else {
      config.width = 500;
      config.height = 500;
    }
    return ImagePicker.openCamera(config).then(image => {
      return image;
    }).catch(err => {
      return err;
    });
  },
  //清空所有图片缓存
  cleanupAllImages(){
    return ImagePicker.clean().then(() => {
      return true
    }).catch(err => {
      return false
    });
  },
  //清空单个图片缓存
  cleanupSingleImage(image){
    return ImagePicker.cleanSingle(image ? image.uri : null).then(() => {
      return true
    }).catch(e => {
      return false
    })
  },
  //对单个图片进行裁剪
  cropLast(image,crop){
    if (!image) {
      return new Promise();
    }

    return ImagePicker.openCropper({
      path: image.uri,
      width: crop.width,
      height: crop.height
    }).then(image => {

    }).catch(err => {
      return err
    });
  }

}
