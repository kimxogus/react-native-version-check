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
  getVersion(option: PlayStoreGetVersionOption): Promise<string> {
    if (!option.packageName) {
      option.packageName = getVersionInfo().getPackageName();
    }

    const storeUrl = `http://itunes.apple.com/${option.country}/lookup?bundleId=${option.packageName}`;
    return fetch(storeUrl, option.fetchOptions)
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
