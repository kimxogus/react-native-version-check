
package io.xogus.reactnative.versioncheck;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.AsyncTask;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

public class RNVersionCheckModule extends ReactContextBaseJavaModule
{
    private final ReactApplicationContext reactContext;
    private final String packageName;

    public RNVersionCheckModule(ReactApplicationContext reactContext)
    {
        super(reactContext);
        this.reactContext = reactContext;
        this.packageName = this.reactContext.getPackageName();
    }


    @ReactMethod
    public void getLatestVersion(Promise promise)
    {
        new ParseMarket(promise).execute(packageName);
    }

    @Override
    public @Nullable Map<String, Object> getConstants()
    {
        Map<String, Object> constants = new HashMap<>();

        constants.put("packageName", packageName);

        PackageManager packageManager = this.reactContext.getPackageManager();
        try
        {
            PackageInfo info = packageManager.getPackageInfo(packageName, 0);
            constants.put("currentVersion", info.versionName);
            constants.put("currentBuildNumber", info.versionCode);
        }
        catch (PackageManager.NameNotFoundException e)
        {
            constants.put("currentVersion", null);
            constants.put("currentBuildNumber", null);
        }

        return constants;
    }

    @Override
    public String getName()
    {
        return "RNVersionCheck";
    }


    private class ParseMarket extends AsyncTask<String, Integer, String>
    {

        private Promise promise;

        private ParseMarket(Promise promise)
        {
            this.promise = promise;
        }

        @Override
        protected String doInBackground(String... params) {
            String packageName = params[0];
            StringBuilder mData = new StringBuilder();

            try {
                URL mUrl = new URL("https://play.google.com/store/apps/details?id=" + packageName);
                HttpURLConnection mConnection = (HttpURLConnection) mUrl.openConnection();

                if (mConnection == null)
                    return null;

                mConnection.setConnectTimeout(5000);
                mConnection.setUseCaches(false);
                mConnection.setDoOutput(true);

                if (mConnection.getResponseCode() == HttpURLConnection.HTTP_OK) {
                    BufferedReader mReader = new BufferedReader(new InputStreamReader(mConnection.getInputStream()));

                    String line;
                    while (true) {
                        line = mReader.readLine();

                        if (line == null) break;

                        mData.append(line);
                    }

                    mReader.close();
                }

                mConnection.disconnect();
            } catch (Exception e) {
                promise.reject("PARSE_ERROR", "Parsing market failed.");
            }

            String mVer;

            String startToken = "softwareVersion\">";
            String endToken = "<";
            int index = mData.indexOf(startToken);

            if (index == -1)
            {
                mVer = null;
            }
            else
            {
                mVer = mData.substring(index + startToken.length(), index + startToken.length() + 100);
                mVer = mVer.substring(0, mVer.indexOf(endToken)).trim();
            }

            promise.resolve(mVer);

            return null;
        }
    }
}
