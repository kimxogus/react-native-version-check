import { NativeModules } from 'react-native';

const { RNVersionCheck } = process.env.NODE_ENV === 'test'
  ? {
    country: 'ko',
    packageName: 'com.reactnative.versioncheck',
    currentBuildNumber: 1,
    currentVersion: '0.0.1',
  }
  : NativeModules;

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
