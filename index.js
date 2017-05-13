import Native from "./src/native";
import { getStoreUrl, getLatestVersion, setAppID, setAppName } from "./src/getLatestVersion";
import { needUpdate } from "./src/needUpdate";

export default {
  getCountry: Native.getCountry,
  getPackageName: Native.getPackageName,
  getCurrentBuildNumber: Native.getCurrentBuildNumber,
  getCurrentVersion: Native.getCurrentVersion,

  setAppID,
  setAppName,
  getStoreUrl,
  getLatestVersion,

  needUpdate
};
