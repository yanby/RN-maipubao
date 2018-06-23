import {
  Alert
} from 'react-native';
import BasicComponent from '../../businessComponents/basic/BasicComponent';
import { Actions } from 'react-native-router-flux';
import { keys } from '../SyncStorage/StorageKeys';
import { apis } from '../Remote/ApiStorage';

export default class AppMessageCenter extends BasicComponent {

  static receiveRemoteNotification(payload) {
    storage.load({
      key: keys.currentRemoteSite
    }).then(ret => {
      if(ret == payload.site) {
        storage.load({
          key: keys.currentUser
        }).then(currentUser => {
          if(currentUser) {
            if(payload.type != '后台推送'){
              this.userNotificationUpdate(payload.id, currentUser.id);
            }else{
              this._setPushMessageRead(payload.pushMessageId, currentUser.id)
              if(payload.pushLocation >1){
                this.userNotificationUpdate(payload.id, currentUser.id);
              }
            }
            this.distributeMessage(currentUser.id, payload);
          } else {
            this.distributeMessage(null, payload);
          }
        }).catch(err => {
          this.distributeMessage(null, payload);
        });
      } else {
        let site = null;
        switch (payload.site) {
          case 'bj':
            site = '北京';
            break;
          case 'sh':
            site = '上海';
            break;
          case 'tj':
            site = '天津';
            break;
          case 'hn':
            site = '海南';
            break;
          case 'cs':
            site = '长沙';
            break;
          case 'sy':
            site = '沈阳';
            break;
          case 'sq':
            site = '商丘';
            break;
          default:
            site = '';
            break;
        }
        Alert.alert(
          '提示',
          '该项目为“' + site + '”的项目，请您切换城市到“' + site + '”查看此项目详情'
        );
      }
    }).catch(err => {
    });
  }

  static userNotificationUpdate(id, userId) {
    try {
      storage.load({
        key: keys.userNotificationUpdate,
        syncInBackground: false,
        syncParams: {
          url: apis.userNotificationUpdate +'?id=' + id +'&userId=' + userId +'&flag=false'
        }
      }).catch(err => {
      });
    } catch (e) {
    }
  }

  static _setPushMessageRead(pushMessageId, userId){
    storage.load({
      key: keys.pushLogInsert,
      syncInBackground: false,
      syncParams: {
         url: apis.pushLogInsert +'?pushMessageId=' + pushMessageId +'&userId=' + userId +'&openTypeVal=1'
      }
    }).then(ret => {
      if(ret.status == 200){
        return ret.json();
      }else{
        return Promise.reject('404')
      };
    }).catch(err => {
    });
  }

  static _pushMessageJump(payload){
    if(payload.effect){
      if(payload.pageType == '项目详情页' || payload.pageType == '旅居详情页'){
        Actions.ProjectDetails({id: payload.pageId,source:'message'});
      }else if(payload.pageType == '商铺详情页'){
        Actions.ShopDetails({id: payload.pageId,source:'message'});
      }else if(payload.pageType == '品牌详情页'){
        Actions.BrandsDetails({id: payload.pageId})
      }else if(payload.pageType == '资讯详情页'){
        Actions.Details({detailsId: payload.pageId})
      }else{
        return;
      }
    }else{
      Actions.reset('Index',{});
    }
  }

  static distributeMessage(userId, payload) {
    if(!userId) {
      if(payload.type == '新项目') {
        Actions.ProjectDetails({id: payload.projectId});
      } else {
        Actions.replace('Login',{sourceFlag:'PersonalIndex'});
      }
    } else {
      switch (payload.type) {
        case '报备提醒':
          Actions.reset('MyProject');
          break;
        case '报备成功':
          Actions.BusinessRentDetails({businessId: payload.businessId});
          break;
        case '报备失败':
          Actions.BusinessRentDetails({businessId: payload.businessId});
          break;
        case '录到访':
          Actions.BusinessRentDetails({businessId: payload.businessId});
          break;
        case '到访结束':
          Actions.BusinessRentDetails({businessId: payload.businessId});
          break;
        case '认购意向结束':
          Actions.BusinessRentDetails({businessId: payload.businessId});
          break;
        case '签约结束':
          Actions.BusinessRentDetails({businessId: payload.businessId});
          break;
        case '录认购':
          Actions.BusinessRentDetails({businessId: payload.businessId});
          break;
        case '录意向':
          Actions.BusinessRentDetails({businessId: payload.businessId});
          break;
        case '录签约':
          Actions.BusinessRentDetails({businessId: payload.businessId});
          break;
        case '新项目':
          Actions.ProjectDetails({id: payload.projectId});
          break;
        case '价格变动':
          Actions.ProjectDetails({id: payload.projectId});
          break;
        case '信息回复':
          try {
            storage.load({
              key: keys.notifications,
              syncInBackground: false,
              syncParams: {
                url: apis.notifications + '/' + payload.notificationId.toString()
              }
            }).then(res => {
              return res.json();
            }).then(content => {
              Actions.MessageDetails({
                id: content.id,
                userId: content.userId,
                contenTitle: content.title,
                content: content.content
              });
            }).catch(err => {
            })
          } catch (e) {
          }
          break;
        case '留言审核':
          Actions.Details({detailsId: payload.articleId});
          break;
        case '发帖审核':
          Actions.Details({detailsId: payload.articleId});
          break;
        case '后台推送':
          this._pushMessageJump(payload)
          break;
        default:
      }
    }
  }
}
