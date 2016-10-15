
package io.xogus.reactnative.versioncheck;

import android.os.Build;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class RNVersionCheckModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public RNVersionCheckModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public Map<String, Object> getConstants() {
        Map<String, Object> constants = new HashMap<>();

        constants.put("currentVersion", Build.VERSION.RELEASE);

        try {
            constants.put("latestVersion", getMarketVersion(this.reactContext.getPackageName()));
        } catch (Exception e) {
            constants.put("latestVersion", null);
        }

        return constants;
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