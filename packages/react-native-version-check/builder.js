// @flow
import { getLatestVersion } from './src/getLatestVersion';
import needUpdate from './src/needUpdate';
import { setVersionInfo, type IVersionInfo } from './src/versionInfo';
import getStoreUrl, {
  getAppStoreUrl,
  getPlayStoreUrl,
} from './src/getStoreUrl';

export interface ReactNativeVersionCheck extends IVersionInfo {
  getStoreUrl: typeof getStoreUrl;
  getAppStoreUrl: typeof getAppStoreUrl;
  getPlayStoreUrl: typeof getPlayStoreUrl;
  getLatestVersion: typeof getLatestVersion;
  needUpdate: typeof needUpdate;
}

export default (VersionInfoObject: IVersionInfo): ReactNativeVersionCheck => {
  setVersionInfo(VersionInfoObject);

  return {
    getCountry: VersionInfoObject.getCountry,
    getPackageName: VersionInfoObject.getPackageName,
    getCurrentBuildNumber: VersionInfoObject.getCurrentBuildNumber,
    getCurrentVersion: VersionInfoObject.getCurrentVersion,

    getStoreUrl,
    getAppStoreUrl,
    getPlayStoreUrl,
    getLatestVersion,

    needUpdate,
  };
};
