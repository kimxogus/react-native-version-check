// @flow
import { getVersionInfo } from '../versionInfo';

import { type IProvider } from './types';

export type PlayStoreGetVersionOption = {
  packageName?: string,
  fetchOptions?: any,
  ignoreErrors?: boolean,
};

export interface IPlayStoreProvider extends IProvider {
  getVersion: PlayStoreGetVersionOption => Promise<string>;
}

function error(text: string) {
  return {
    message:
      "Parse Error. Your app's play store page doesn't seem to have latest app version info.",
    text,
  };
}

class PlayStoreProvider implements IProvider {
  getVersion(option: PlayStoreGetVersionOption): Promise<string> {
    try {
      if (!option.packageName) {
        option.packageName = getVersionInfo().getPackageName();
      }

      return fetch(
        `https://play.google.com/store/apps/details?id=${
          option.packageName
        }&hl=en`,
        option.fetchOptions
      )
        .then(res => res.text())
        .then(text => {
          match = text.match(/Current Version.+>([\d.]+)<\/span>/);
          if(match){
            latestVersion = match[1].trim();
            return Promise.resolve(latestVersion);
          }
          else{
            return Promise.reject(error(text));
          }
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

export default new PlayStoreProvider();
