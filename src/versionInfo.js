let RNVersionCheck;
const useExpo = !!process.env.RNVC_EXPO;
if (process.env.RNVC_ENV === 'test') {
  RNVersionCheck = {
    country: 'ko',
    packageName: 'com.reactnative.versioncheck',
    currentBuildNumber: 1,
    currentVersion: '0.0.1',
  };
} else if (useExpo) {
  const { Platform } = require('react-native');
  const { Constants, Util } = require('expo');

  const { manifest = {} } = Constants;
  const {
    version = null,
    android: {
      versionCode = null,
      package: androidPackageName = null
    } = {},
    ios: {
      bundleIdentifier = null,
      buildNumber = null
    } = {}
  } = manifest;

  RNVersionCheck = {
    currentVersion: version,
    country: Util.getCurrentDeviceCountryAsync(),
    currentBuildNumber: Platform.select({
      android: versionCode,
      ios: buildNumber
    }),
    packageName: Platform.select({
      android: androidPackageName,
      ios: bundleIdentifier
    })
  };
} else {
  RNVersionCheck = require('react-native').NativeModules.RNVersionCheck;
}

const COUNTRY = RNVersionCheck.country;
const PACKAGE_NAME = RNVersionCheck.packageName;
const CURRENT_BUILD_NUMBER = RNVersionCheck.currentBuildNumber;
const CURRENT_VERSION = RNVersionCheck.currentVersion;

export default {
  getCountry: () => {
    if (useExpo) {
      console.warn('getCountry will return Promise<country>. Use "await getCountry() or await getCountryAsync()"');
    }
    return COUNTRY;
  },
  getCountryAsync: () => Promise.resolve(COUNTRY),
  getPackageName: () => PACKAGE_NAME,
  getCurrentBuildNumber: () => CURRENT_BUILD_NUMBER,
  getCurrentVersion: () => CURRENT_VERSION,
};
