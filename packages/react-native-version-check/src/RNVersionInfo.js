const RNVersionCheck = require('react-native').NativeModules.RNVersionCheck;

if (process.env.RNVC_EXPO) {
  throw new Error("expo support moved to 'react-native-version-check-expo' (https://npmjs.org/packages/react-native-version-check-expo)");
}

const COUNTRY = RNVersionCheck.country;
const PACKAGE_NAME = RNVersionCheck.packageName;
const CURRENT_BUILD_NUMBER = RNVersionCheck.currentBuildNumber;
const CURRENT_VERSION = RNVersionCheck.currentVersion;

export default {
  getCountry: () => {
    console.warn('getCountry will return Promise<country> in expo. Please use "await getCountry() or await getCountryAsync()". This will be deprecated from v3');

    return COUNTRY;
  },
  getCountryAsync: () => Promise.resolve(COUNTRY),
  getPackageName: () => PACKAGE_NAME,
  getCurrentBuildNumber: () => CURRENT_BUILD_NUMBER,
  getCurrentVersion: () => CURRENT_VERSION,
};
