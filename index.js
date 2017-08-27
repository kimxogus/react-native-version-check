import Native from './src/native';
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
  getCountry: Native.getCountry,
  getPackageName: Native.getPackageName,
  getCurrentBuildNumber: Native.getCurrentBuildNumber,
  getCurrentVersion: Native.getCurrentVersion,

  setAppID,
  setAppName,
  getStoreUrl,
  getLatestVersion,

  needUpdate,
};
