/**
 * Created by kimxogus on 2016. 12. 15..
 */
import { isNil, defaultsDeep } from "lodash";
import { Platform } from "react-native";

import Native from "./native";

let latestVersion;
// Used by iOS Only
let appName;
let appID;

export function setAppName(_appName) {
  appName = _appName;
}
export function setAppID(_appID) {
  appID = _appID;
}

export const defaultOption = {
  forceUpdate: false,
  url: null,
  fetchOptions: {
    timeout: 5000
  }
};

export function getLatestVersion(option) {
  option = defaultsDeep(option, defaultOption);

  if (isNil(option.url)) {
    option.url = getStoreUrl(); // To prevent getStore to be executed when it's not needed.
  }

  if (!option.forceUpdate && !isNil(latestVersion)) {
    return Promise.resolve(latestVersion);
  } else {
    return getLatestVersionFromUrl(option.url, option.fetchOptions);
  }
}

function getStoreUrl() {
  if (Platform.OS === "ios" && (!appName || !appID)) {
    throw new Error("'appName' or 'appID' is undefined.\nSet those values correctly using 'setAppName()' and 'setAppID()'");
  }
  return Platform.select({
    android: "https://play.google.com/store/apps/details?id=" + Native.getPackageName(),
    ios: "https://itunes.apple.com/" + Native.getCountry() + "/app/" + appName + "/id" + appID
  });
}

const MARKETVERSION_STARTTOKEN = "softwareVersion\">";
const MARKETVERSION_STARTTOKEN_LENGTH = MARKETVERSION_STARTTOKEN.length;
const MARKETVERSION_ENDTOKEN = "<";
function getLatestVersionFromUrl(url, fetchOptions) {
  return fetch(url, fetchOptions)
    .then(res => res.text())
    .then(text => {
      const indexStart = text.indexOf(MARKETVERSION_STARTTOKEN);
      if (indexStart === -1) {
        latestVersion = text.trim();
        return Promise.resolve(latestVersion);
      }

      text = text.substr(indexStart + MARKETVERSION_STARTTOKEN_LENGTH);

      const indexEnd = text.indexOf(MARKETVERSION_ENDTOKEN);
      if (indexEnd === -1) {
        return Promise.reject("Parse error.");
      }

      text = text.substr(0, indexEnd);

      latestVersion = text.trim();
      return Promise.resolve(latestVersion);
    });
}