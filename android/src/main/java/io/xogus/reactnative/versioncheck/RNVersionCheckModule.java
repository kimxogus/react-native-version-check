
package io.xogus.reactnative.versioncheck;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class RNVersionCheckModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public RNVersionCheckModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @ReactMethod
    public void getCurrentVersion(Promise promise) {
        final String packageName = this.reactContext.getPackageName();
        PackageManager packageManager = this.reactContext.getPackageManager();
        try {
            PackageInfo info = packageManager.getPackageInfo(packageName, 0);
            promise.resolve(info.versionName);
        } catch (PackageManager.NameNotFoundException e) {
            promise.reject("NAME_NOT_FOUND", "Package name is not found.");
        }
    }

    @ReactMethod
    public void getLatestVerion(Promise promise) {
        final String packageName = this.reactContext.getPackageName();
        try {
            promise.resolve(getMarketVersion(packageName));
        } catch (Exception e) {
            promise.reject("PARSING_ERROR", "Parsing the latest app version failed.");
        }
    }

    private String getMarketVersion(String packageName) throws Exception {
        String mData = "", mVer = null;

        URL mUrl = new URL("https://play.google.com/store/apps/details?id="
                + packageName);
        HttpURLConnection mConnection = (HttpURLConnection) mUrl
                .openConnection();

        if (mConnection == null)
            return null;

        mConnection.setConnectTimeout(5000);
        mConnection.setUseCaches(false);
        mConnection.setDoOutput(true);

        if (mConnection.getResponseCode() == HttpURLConnection.HTTP_OK) {
            BufferedReader mReader = new BufferedReader(
                    new InputStreamReader(mConnection.getInputStream()));

            while (true) {
                String line = mReader.readLine();
                if (line == null)
                    break;
                mData += line;
            }

            mReader.close();
        }

        mConnection.disconnect();

        String startToken = "softwareVersion\">";
        String endToken = "<";
        int index = mData.indexOf(startToken);

        if (index == -1) {
            mVer = null;

        } else {
            mVer = mData.substring(index + startToken.length(), index
                    + startToken.length() + 100);
            mVer = mVer.substring(0, mVer.indexOf(endToken)).trim();
        }

        return mVer;
    }

    @Override
    public String getName() {
        return "RNVersionCheck";
    }
}