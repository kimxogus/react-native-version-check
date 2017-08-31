import VersionInfo from './src/versionInfo';
import {
  getLatestVersion,
} from './src/getLatestVersion';
import {
  getStoreUrl,
  setAppID,
  setAppName,
} from './src/providers/store';
import { needUpdate } from './src/needUpdate';

export default {
  getCountry: VersionInfo.getCountry,
  getPackageName: VersionInfo.getPackageName,
  getCurrentBuildNumber: VersionInfo.getCurrentBuildNumber,
  getCurrentVersion: VersionInfo.getCurrentVersion,

  setAppID,
  setAppName,
  getStoreUrl,
  getLatestVersion,

  needUpdate,
};
