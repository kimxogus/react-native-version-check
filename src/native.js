/**
 * Created by kimxogus on 2016. 12. 15..
 */
import { NativeModules } from "react-native";

const { RNVersionCheck } = NativeModules;

const COUNTRY = RNVersionCheck.country;
const PACKAGE_NAME = RNVersionCheck.packageName;
const CURRENT_BUILD_NUMBER = RNVersionCheck.currentBuildNumber;
const CURRENT_VERSION = RNVersionCheck.currentVersion;
const getLatestVersionNative = RNVersionCheck.getLatestVersion;

export default {
  getCountry: () => COUNTRY,
  getPackageName: () => PACKAGE_NAME,
  getCurrentBuildNumber: () => CURRENT_BUILD_NUMBER,
  getCurrentVersion: () => CURRENT_VERSION,
  getLatestVersionNative: getLatestVersionNative,
};
