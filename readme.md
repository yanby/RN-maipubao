### 发布版本说明
1. 检测ApiStorage.js中API域名是否为正式环境
2. 更新ApiStorage.js中的版本号/版本号名称
3. 检查个推SDK配置是否正式环境
4. 更改Android/iOS的版本号

### Android发布版本说明
1. 更改android/app/build.gradle中L93/L94版本号
2. cd android && ./gradlew assembleRelease

### iOS发布版本说明
1. 更改Version/Build

### Android正式版打包说明
1.vi ~/.gradle/gradle.properties
      UP_RELEASE_STORE_FILE=release-key.keystore
      UP_RELEASE_KEY_ALIAS=kesun1
      UP_RELEASE_STORE_PASSWORD=kesun1
      UP_RELEASE_KEY_PASSWORD=kesun1
2.cd android && ./gradlew assembleRelease,The generated APK can be found under android/app/build/outputs/apk/app-release.apk, and is ready to be distributed.

Reference:[Generating Signed APK](https://facebook.github.io/react-native/docs/signed-apk-android.html)
