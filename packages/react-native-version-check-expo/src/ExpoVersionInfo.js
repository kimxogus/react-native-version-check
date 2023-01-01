import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Localization from 'expo-localization';

let RNVersionCheck;
if (process.env.RNVC_ENV === 'test') {
  RNVersionCheck = {
    country: 'ko',
    packageName: 'com.reactnative.versioncheck',
    currentBuildNumber: 1,
    currentVersion: '0.0.1',
  };
} else {
  const manifest = Constants.manifest
    ? Constants.manifest
    : Constants.manifest2.extra.expoClient;
  const {
    version = null,
    android: { versionCode = null, package: androidPackageName = null } = {},
    ios: { bundleIdentifier = null, buildNumber = null } = {},
  } = manifest;
  let country;
  if (Constants.expoVersion < 31) {
    country = Localization.getCurrentDeviceCountryAsync();
  } else {
    // if can't return country use region instead
    country = Localization.country ? Localization.country : Localization.region;
  }

  RNVersionCheck = {
    currentVersion: version,
    country,
    currentBuildNumber: Platform.select({
      android: versionCode,
      ios: buildNumber,
    }),
    packageName: Platform.select({
      android: androidPackageName,
      ios: bundleIdentifier,
    }),
  };
}

const COUNTRY = RNVersionCheck.country;
const PACKAGE_NAME = RNVersionCheck.packageName;
const CURRENT_BUILD_NUMBER = RNVersionCheck.currentBuildNumber;
const CURRENT_VERSION = RNVersionCheck.currentVersion;

export default {
  getCountry: () => Promise.resolve(COUNTRY),
  getPackageName: () => PACKAGE_NAME,
  getCurrentBuildNumber: () => CURRENT_BUILD_NUMBER,
  getCurrentVersion: () => CURRENT_VERSION,
};
