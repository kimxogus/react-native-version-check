// @flow
const RNVersionCheck = require('react-native').NativeModules.RNVersionCheck;

export default {
  getCountry: (): Promise<string> => Promise.resolve(RNVersionCheck.country),
  getPackageName: (): string => RNVersionCheck.packageName,
  getCurrentBuildNumber: (): number => RNVersionCheck.currentBuildNumber,
  getCurrentVersion: (): string => RNVersionCheck.currentVersion,
};
