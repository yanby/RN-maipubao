package com.youpu;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.pusherman.networkinfo.RNNetworkInfoPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.getui.reactnativegetui.GetuiPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.reactnativecomponent.barcode.RCTCapturePackage;
import com.theweflex.react.WeChatPackage;
import com.youpu.umeng.UmengReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new RNNetworkInfoPackage(),
                    new WeChatPackage(),
                    new RCTCapturePackage(),
                    new PickerPackage(),
                    new UmengReactPackage(),
                    new GetuiPackage()
            );
        }
    };

    public void setReactNativeHost(ReactNativeHost reactNativeHost) {
        mReactNativeHost = reactNativeHost;
    }

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
