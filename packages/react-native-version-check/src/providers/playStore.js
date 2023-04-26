// @flow
import { getVersionInfo } from '../versionInfo';

import { IProvider, IVersionAndStoreUrl } from './types';

export type PlayStoreGetVersionOption = {
  packageName?: string,
  fetchOptions?: any,
  ignoreErrors?: boolean,
};

export interface IPlayStoreProvider extends IProvider {
  getVersion: PlayStoreGetVersionOption => Promise<IVersionAndStoreUrl>;
}

function error(text: string) {
  return {
    message:
      "Parse Error. Your app's play store page doesn't seem to have latest app version info.",
    text,
  };
}

class PlayStoreProvider implements IProvider {
  getVersion(option: PlayStoreGetVersionOption): Promise<IVersionAndStoreUrl> {
    const opt = option || {};
    try {
      if (!opt.packageName) {
        opt.packageName = getVersionInfo().getPackageName();
      }

      opt.fetchOptions = {
        headers: { 'sec-fetch-site': 'same-origin' },
        ...opt.fetchOptions,
      };

      const storeUrl = `https://play.google.com/store/apps/details?id=${opt.packageName}&hl=en&gl=US`;

      return fetch(storeUrl, opt.fetchOptions)
        .then(res => res.text())
        .then(text => {
          const match = text.match(/Current Version.+?>([\d.-]+)<\/span>/);
          if (match) {
            const latestVersion = match[1].trim();

            return Promise.resolve({ version: latestVersion, storeUrl });
          }

          const matchNewLayout = text.match(/\[\[\["([\d-.]+?)"\]\]/);
          if (matchNewLayout) {
            const latestVersion = matchNewLayout[1].trim();

            return Promise.resolve({ version: latestVersion, storeUrl });
          }

          return Promise.reject(error(text));
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

export default new PlayStoreProvider();
