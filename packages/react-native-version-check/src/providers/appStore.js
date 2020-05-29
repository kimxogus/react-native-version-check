// @flow
import { getVersionInfo } from '../versionInfo';

import { IProvider, IVersionAndStoreUrl } from './types';

export type AppStoreGetVersionOption = {
  country?: string,
  packageName?: string,
  fetchOptions?: any,
  ignoreErrors?: boolean,
};

export interface IAppStoreProvider extends IProvider {
  getVersion: AppStoreGetVersionOption => Promise<IVersionAndStoreUrl>;
}

class AppStoreProvider implements IProvider {
  async getVersion(
    option: AppStoreGetVersionOption
  ): Promise<IVersionAndStoreUrl> {
    const opt = option;
    try {
      if (!opt.country) {
        opt.country = await getVersionInfo().getCountry();
      }
      if (!opt.packageName) {
        opt.packageName = getVersionInfo().getPackageName();
      }
      const countryCode = opt.country ? `${opt.country}/` : '';
      const dateNow = new Date().getTime();

      return fetch(
        `https://itunes.apple.com/${countryCode}lookup?bundleId=${opt.packageName}&date=${dateNow}`,
        opt.fetchOptions
      )
        .then(res => res.json())
        .then(json => {
          if (json.resultCount) {
            const version = json.results[0].version;
            const appId = json.results[0].trackId;
            const storeUrl = `itms-apps://apps.apple.com/${countryCode}app/id${appId}`;
            return Promise.resolve({
              version,
              storeUrl,
            });
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
