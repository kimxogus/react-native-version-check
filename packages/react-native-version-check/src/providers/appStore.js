// @flow
import { getVersionInfo } from '../versionInfo';

import { type IProvider } from './types';

export type AppStoreGetVersionOption = {
  country?: string,
  packageName?: string,
  fetchOptions?: any,
};

export interface IAppStoreProvider extends IProvider {
  getVersion: AppStoreGetVersionOption => Promise<string>;
}

class AppStoreProvider implements IProvider {
  async getVersion(option: AppStoreGetVersionOption): Promise<string> {
    if (!option.country) {
      option.country = await getVersionInfo().getCountry();
    }
    if (!option.packageName) {
      option.packageName = getVersionInfo().getPackageName();
    }

    return fetch(
      `http://itunes.apple.com/${option.country}/lookup?bundleId=${
        option.packageName
      }`,
      option.fetchOptions
    )
      .then(res => res.json())
      .then(json => {
        if (json.resultCount) {
          return Promise.resolve(json.results[0].version);
        }
        return Promise.reject('No info about this app.');
      });
  }
}

export default new AppStoreProvider();
