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
    const opt = option;
    try {
      if (!opt.country) {
        opt.country = await getVersionInfo().getCountry();
      }
      if (!opt.packageName) {
        opt.packageName = getVersionInfo().getPackageName();
      }
      const countryCode = opt.country ? `${opt.country}/` : '';

      return fetch(
        `https://itunes.apple.com/${countryCode}lookup?bundleId=${
          opt.packageName
        }`,
        opt.fetchOptions
      )
        .then(res => res.json())
        .then(json => {
          if (json.resultCount) {
            return Promise.resolve(json.results[0].version);
          }
          return Promise.reject('No info about this app.');
        });
    } catch (e) {
      if (opt.ignoreErrors) {
        console.warn(e); // eslint-disable-line no-console
      } else {
        throw e;
      }
    }
  }
}

export default new AppStoreProvider();
