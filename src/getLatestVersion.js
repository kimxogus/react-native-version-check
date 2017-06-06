/**
 * Created by kimxogus on 2016. 12. 15..
 */
import isNil from 'lodash.isnil';
import { Platform } from 'react-native';

import Native from './native';

let storeUrl = null;

let latestVersion = null;
// Used by iOS Only
let appNameGlobal = null;
let appIDGlobal = null;

export function setAppName(appName) {
  appNameGlobal = appName;
}
export function setAppID(appID) {
  appIDGlobal = appID;
}

export const defaultOption = {
  forceUpdate: false,
  url: null,
  fetchOptions: {
    timeout: 5000,
  },
};

export function getLatestVersion(option) {
  option = { ...defaultOption, ...option };

  if (isNil(option.url)) {
    option.url = getStoreUrl(); // To prevent getStore to be executed when it's not needed.
  }

  if (!option.forceUpdate && !isNil(latestVersion)) {
    return Promise.resolve(latestVersion);
  } else {
    return getLatestVersionFromUrl(option.url, option.fetchOptions);
  }
}

export function getStoreUrl(option) {
  option = { app: appNameGlobal, appID: appIDGlobal, ...option };

  if (
    isNil(storeUrl) ||
    option.appName !== appNameGlobal ||
    option.appID !== appIDGlobal
  ) {
    if (Platform.OS === 'ios' && (!option.appName || !option.appID)) {
      throw new Error(
        "'appName' or 'appID' is undefined.\nSet those values correctly using 'setAppName()' and 'setAppID()'"
      );
    }

    return Platform.select({
      android: `https://play.google.com/store/apps/details?id=${Native.getPackageName()}`,
      ios: `https://itunes.apple.com/${Native.getCountry()}/app/${option.appName}/id${option.appID}`,
    });
  }

  return storeUrl;
}

const MARKETVERSION_STARTTOKEN = 'softwareVersion">';
const MARKETVERSION_STARTTOKEN_LENGTH = MARKETVERSION_STARTTOKEN.length;
const MARKETVERSION_ENDTOKEN = '<';
function getLatestVersionFromUrl(url, fetchOptions) {
  return fetch(url, fetchOptions).then(res => res.text()).then(text => {
    const indexStart = text.indexOf(MARKETVERSION_STARTTOKEN);
    if (indexStart === -1) {
      latestVersion = text.trim();
      return Promise.resolve(latestVersion);
    }

    text = text.substr(indexStart + MARKETVERSION_STARTTOKEN_LENGTH);

    const indexEnd = text.indexOf(MARKETVERSION_ENDTOKEN);
    if (indexEnd === -1) {
      return Promise.reject('Parse error.');
    }

    text = text.substr(0, indexEnd);

    latestVersion = text.trim();
    return Promise.resolve(latestVersion);
  });
}
