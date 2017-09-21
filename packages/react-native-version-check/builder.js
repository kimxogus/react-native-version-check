
import { getLatestVersion } from './src/getLatestVersion';
import {
  getStoreUrl,
  getStoreUrlAsync,
  setAppID,
  setAppName,
} from './src/providers/store';
import { needUpdate } from './src/needUpdate';

import { setVersionInfo } from './src/versionInfo';

export default (VersionInfoObject) => {

  setVersionInfo(VersionInfoObject);

  return {
    getCountry: VersionInfoObject.getCountry,
    getCountryAsync: VersionInfoObject.getCountryAsync,
    getPackageName: VersionInfoObject.getPackageName,
    getCurrentBuildNumber: VersionInfoObject.getCurrentBuildNumber,
    getCurrentVersion: VersionInfoObject.getCurrentVersion,

    setAppID,
    setAppName,
    getStoreUrl,
    getStoreUrlAsync,
    getLatestVersion,

    needUpdate,
  };};
