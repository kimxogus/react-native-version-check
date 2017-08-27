let RNVersionCheck;
if (process.env.RNVC_ENV === 'test') {
  RNVersionCheck = {
    country: 'ko',
    packageName: 'com.reactnative.versioncheck',
    currentBuildNumber: 1,
    currentVersion: '0.0.1',
  };
} else {
  try {
    const {
      version,
      android: { versionCode = null, package: androidPackage } = {},
      ios: { buildNumber = null, bundleIdentifier } = {},
    } = require('expo').Constants.manifest;
    const country = require('expo').Util.getCurrentDeviceCountryAsync();
    RNVersionCheck = require('react-native').Platform.select({
      android: {
        currentVersion: version,
        currentBuildNumber: versionCode,
        packageName: androidPackage,
        country
      },
      ios: {
        currentVersion: version,
        currentBuildNumber: buildNumber,
        package: bundleIdentifier,
        country
      }
    });
  } catch (e) {
    RNVersionCheck = require('react-native').NativeModules.RNVersionCheck;
  }
}

const COUNTRY = RNVersionCheck.country;
const PACKAGE_NAME = RNVersionCheck.packageName;
const CURRENT_BUILD_NUMBER = RNVersionCheck.currentBuildNumber;
const CURRENT_VERSION = RNVersionCheck.currentVersion;

export default {
  getCountry: () => COUNTRY,
  getPackageName: () => PACKAGE_NAME,
  getCurrentBuildNumber: () => CURRENT_BUILD_NUMBER,
  getCurrentVersion: () => CURRENT_VERSION,
};
