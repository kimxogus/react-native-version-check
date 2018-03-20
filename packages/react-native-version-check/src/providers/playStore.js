// @flow
import { getVersionInfo } from '../versionInfo';

import { type IProvider } from './types';

const MARKETVERSION_STARTTOKEN = 'softwareVersion">';
const MARKETVERSION_ENDTOKEN = '<';
const MARKETVERSION_STARTTOKEN_NEW = 'Current Version</div><div><span class="htlgb">';


export type PlayStoreGetVersionOption = {
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

    return fetch(`https://play.google.com/store/apps/details?id=${option.packageName}`, option.fetchOptions)
      .then(res => res.text())
      .then(text => {
        let indexStart = text.indexOf(MARKETVERSION_STARTTOKEN);
        let startTokenLength = MARKETVERSION_STARTTOKEN.length;
        let latestVersion = null;
        if (indexStart === -1) {
          indexStart = text.indexOf(MARKETVERSION_STARTTOKEN_NEW);
          startTokenLength = MARKETVERSION_STARTTOKEN_NEW.length;
          if (indexStart === -1) {
            return Promise.reject({ message: 'Parse error.', text });
          }
        }

        text = text.substr(indexStart + startTokenLength);

        const indexEnd = text.indexOf(MARKETVERSION_ENDTOKEN);
        if (indexEnd === -1) {
          return Promise.reject({ message: 'Parse error.', text });
        }

        text = text.substr(0, indexEnd);

        latestVersion = text.trim();
        return Promise.resolve(latestVersion);
      });
  }
}

export default new PlayStoreProvider();
