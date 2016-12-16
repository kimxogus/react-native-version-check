import Native from "./src/native";
import * as LatestVersion from "./src/getLatestVersion";
import needUpdate from "./src/needUpdate";

export default {
  getCountry: Native.getCountry,
  getPackageName: Native.getPackageName,
  getCurrentBuildNumber: Native.getCurrentBuildNumber,
  getCurrentVersion: Native.getCurrentVersion,

  ...LatestVersion,

  needUpdate
};