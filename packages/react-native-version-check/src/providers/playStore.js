// @flow
import { getVersionInfo } from '../versionInfo';

import { type IProvider } from './types';

const MARKETVERSION_STARTTOKEN = 'softwareVersion">';
const MARKETVERSION_STARTTOKEN_LENGTH = MARKETVERSION_STARTTOKEN.length;
const MARKETVERSION_ENDTOKEN = '<';

export type PlayStoreGetVersionOption = {
  packageName?: string,
  fetchOptions?: any,
};

export interface IPlayStoreProvider extends IProvider {
  getVersion: PlayStoreGetVersionOption => Promise<string>;
}

function error(text: string) {
  return {
    message:
      "Parse Error. Your app's play store page doesn't seem to have div[itemprop=softwareVersion].",
    text,
  };
}

class PlayStoreProvider implements IProvider {
  getVersion(option: PlayStoreGetVersionOption): Promise<string> {
    if (!option.packageName) {
      option.packageName = getVersionInfo().getPackageName();
    }

    return fetch(
      `https://play.google.com/store/apps/details?id=${option.packageName}`,
      option.fetchOptions
    )
      .then(res => res.text())
      .then(text => {
        const indexStart = text.indexOf(MARKETVERSION_STARTTOKEN);
        let latestVersion = null;
        if (indexStart === -1) {
          return Promise.reject(error(text));
        }

        text = text.substr(indexStart + MARKETVERSION_STARTTOKEN_LENGTH);

        const indexEnd = text.indexOf(MARKETVERSION_ENDTOKEN);
        if (indexEnd === -1) {
          return Promise.reject(error(text));
        }

        text = text.substr(0, indexEnd);

        latestVersion = text.trim();
        return Promise.resolve(latestVersion);
      });
  }
}

export default new PlayStoreProvider();
