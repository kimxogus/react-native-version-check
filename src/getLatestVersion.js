/**
 * Created by kimxogus on 2016. 12. 15..
 */
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

export function getLatestVersion() {
  if (latestVersion) {
    return Promise.resolve(latestVersion);
  } else if (Platform.OS === "android") {
    return Native.getLatestVersionNative()
      .then((version) => {
        latestVersion = version;
        return Promise.resolve(latestVersion);
      })
      .catch(getLatestVersionFromStore);
  } else if (Platform.OS === "ios") {
    return Promise.resolve()
      .then(getLatestVersionFromStore);
  }
}

function getLatestVersionFromStore() {
  if (Platform.OS === "ios" && (!appName || !appID)) {
    throw new Error("'appName' or 'appID' is undefined.\nSet those values correctly using 'setAppName()' and 'setAppID()'");
  }
  return fetch(Platform.select({
    android: "https://play.google.com/store/apps/details?id=" + Native.getPackageName(),
    ios: "https://itunes.apple.com/" + Native.getCountry() + "/app/" + appName + "/id" + appID
  }), { timeout: 5000 })
    .then(res => {
      return res.text();
    })
    .then((text) => {
      const startToken = "softwareVersion\">";
      const endToken = "<";

      const indexStart = text.indexOf(startToken);

      if (indexStart == -1) {
        return Promise.reject();
      } else {
        text = text.substr(indexStart + startToken.length);
        text = text.substr(0, text.indexOf(endToken));

        latestVersion = text.trim();
        return Promise.resolve(latestVersion);
      }
    });
}