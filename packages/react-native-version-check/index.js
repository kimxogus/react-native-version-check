import VersionInfo from './src/versionInfo';
import { getLatestVersion } from './src/getLatestVersion';
import {
  getStoreUrl,
  getStoreUrlAsync,
  setAppID,
  setAppName,
} from './src/providers/store';
import { needUpdate } from './src/needUpdate';

export default {
  getCountry: VersionInfo.getCountry,
  getCountryAsync: VersionInfo.getCountryAsync,
  getPackageName: VersionInfo.getPackageName,
  getCurrentBuildNumber: VersionInfo.getCurrentBuildNumber,
  getCurrentVersion: VersionInfo.getCurrentVersion,

  setAppID,
  setAppName,
  getStoreUrl,
  getStoreUrlAsync,
  getLatestVersion,

  needUpdate,
};
