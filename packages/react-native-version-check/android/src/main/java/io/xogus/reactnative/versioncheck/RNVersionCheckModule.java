
package io.xogus.reactnative.versioncheck;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.content.pm.SigningInfo;
import android.os.Build;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;

import java.security.MessageDigest;

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

    private static final char[] HEX_ARRAY = "0123456789ABCDEF".toCharArray();
    public static String bytesToHex(byte[] bytes) {
        char[] hexChars = new char[bytes.length * 2];
        for (int j = 0; j < bytes.length; j++) {
            int v = bytes[j] & 0xFF;
            hexChars[j * 2] = HEX_ARRAY[v >>> 4];
            hexChars[j * 2 + 1] = HEX_ARRAY[v & 0x0F];
        }
        return new String(hexChars);
    }

    public static String signatureToSHAHex(Signature sig) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA");
            digest.update(sig.toByteArray());
            return bytesToHex(digest.digest());            
        }
        catch (Exception e) {
            return null;
        }
    }

    public static List<String> signaturesToSHAHexList(Signature[] signatures) {
        List<String> signatureList = new ArrayList<String>();
        for (Signature sig : signatures) {
            signatureList.add(signatureToSHAHex(sig));
        }
        return signatureList;
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
            boolean useNewAPI = Build.VERSION.SDK_INT >= Build.VERSION_CODES.P;
            PackageInfo info = packageManager.getPackageInfo(packageName, useNewAPI ? PackageManager.GET_SIGNING_CERTIFICATES : PackageManager.GET_SIGNATURES);
 
            List<String> signatureList;

            if (useNewAPI)
            {
                // New signature
                SigningInfo sig = info.signingInfo;
                if (sig.hasMultipleSigners())
                {
                    // Send all with apkContentsSigners
                    signatureList = signaturesToSHAHexList(sig.getApkContentsSigners());
                }
                else
                {
                    // Send one with signingCertificateHistory
                    signatureList = signaturesToSHAHexList(sig.getSigningCertificateHistory());
                }
            }
            else
            {
                signatureList = signaturesToSHAHexList(info.signatures);
            }

            constants.put("signatures", signatureList);
            constants.put("currentVersion", info.versionName);
            constants.put("currentBuildNumber", info.versionCode);
        }
        catch (PackageManager.NameNotFoundException e)
        {
            constants.put("signatures", null);
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
