
package io.xogus.reactnative.versioncheck;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import java.util.HashMap;
import java.util.Locale;
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

    @Override
    public @Nullable Map<String, Object> getConstants()
    {
        Map<String, Object> constants = new HashMap<>();

        constants.put("packageName", packageName);
        constants.put("country", getCountry());

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

    private String getCountry()
    {
        Locale locale = getReactApplicationContext().getResources().getConfiguration().locale;
        return locale.getCountry();
    }

    @Override
    public String getName()
    {
        return "RNVersionCheck";
    }

}
