// @flow
import { getVersionInfo } from '../versionInfo';

import { type IProvider } from './types';

export type PlayStoreGetVersionOption = {
  country?: string,
  packageName?: string,
  fetchOptions?: any,
};

export interface IPlayStoreProvider extends IProvider {
  getVersion: PlayStoreGetVersionOption => Promise<string>
}

class PlayStoreProvider implements IProvider {
  async getVersion(option: PlayStoreGetVersionOption): Promise<string> {
    if (!option.country) {
      option.country = await getVersionInfo().getCountryNameAsync();
    }
    if (!option.packageName) {
      option.packageName = getVersionInfo().getPackageName();
    }

    return fetch(`http://itunes.apple.com/${option.country}/lookup?bundleId=${option.packageName}`, option.fetchOptions)
      .then(res => res.json())
      .then(json => {
        if (json.resultCount) {
          return Promise.resolve(json.results[0].version);
        } else {
          return Promise.reject('No info about this app.');
        }
      });
  }
}

export default new PlayStoreProvider();
