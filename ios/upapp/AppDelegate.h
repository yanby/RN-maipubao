/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import <UIKit/UIKit.h>
#import <RCTGetuiModule/RCTGetuiModule.h>
#if __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_10_0
#import <UserNotifications/UserNotifications.h>
#endif
// 测试环境
// #define kGtAppId @"QmOoUe0BMC61iDGv3MssL3"
// #define kGtAppKey @"Z0Pj5HV4qsAjuwxUaYVpMA"
// #define kGtAppSecret @"U9BW6tvUfm9dLDy0WxEb03"
// 生产环境
#define kGtAppId @"0tj9v0F6vk6iNu36b7aFG3"
#define kGtAppKey @"p4s2Zf4tD7A4aQpoLj0ym8"
#define kGtAppSecret @"fWpf8BDoFy6uXMoaU2NHZ9"

@interface AppDelegate : UIResponder <UIApplicationDelegate,UNUserNotificationCenterDelegate,GeTuiSdkDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
