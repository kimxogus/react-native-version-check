// @flow
import { getVersionInfo } from '../versionInfo';

import { type IProvider } from './types';

export type AppStoreGetVersionOption = {
  country?: string,
  packageName?: string,
  fetchOptions?: any,
  ignoreErrors?: boolean,
};

export interface IAppStoreProvider extends IProvider {
  getVersion: AppStoreGetVersionOption => Promise<string>;
}

class AppStoreProvider implements IProvider {
  async getVersion(option: AppStoreGetVersionOption): Promise<string> {
    try {
      if (!option.country) {
        option.country = await getVersionInfo().getCountry();
      }
      if (!option.packageName) {
        option.packageName = getVersionInfo().getPackageName();
      }

      return fetch(
        `https://itunes.apple.com/${option.country}/lookup?bundleId=${
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
    } catch (e) {
      if (option.ignoreErrors) {
        console.warn(e); // eslint-disable-line no-console
      } else {
        throw e;
      }
    }
  }
}

export default new AppStoreProvider();
