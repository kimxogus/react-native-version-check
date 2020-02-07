// @flow
import { Platform } from 'react-native';
import isNil from 'lodash.isnil';
import { getVersionInfo } from './versionInfo';

export type GetAppStoreUrlOption = {
  country?: string,
  appID: string,
  ignoreErrors?: boolean,
};

export type GetPlayStoreUrlOption = {
  packageName?: string,
  ignoreErrors?: boolean,
};

export type GetStoreUrlOption = GetAppStoreUrlOption & GetPlayStoreUrlOption;

export const getAppStoreUrl = async (
  option: GetAppStoreUrlOption
): Promise<string> => {
  const opt = option || {};
  try {
    if (isNil(opt.appID)) {
      throw new Error('appID is empty.');
    }

    if (!opt.country) {
      opt.country = await getVersionInfo().getCountry();
    }

    const countryCode = opt.country ? `${opt.country}/` : '';

    // Opens directly App Store
    return `itms-apps://apps.apple.com/${countryCode}app/id${opt.appID}`;
  } catch (e) {
    if (opt.ignoreErrors) {
      console.warn(e); // eslint-disable-line no-console
    } else {
      throw e;
    }
  }
};

export const getPlayStoreUrl = async (
  option: ?GetPlayStoreUrlOption = {}
): Promise<string> => {
  const opt = option || {};
  try {
    if (!opt.packageName) {
      opt.packageName = await getVersionInfo().getPackageName();
    }
    return `https://play.google.com/store/apps/details?id=${opt.packageName}`;
  } catch (e) {
    if (opt.ignoreErrors) {
      console.warn(e); // eslint-disable-line no-console
    } else {
      throw e;
    }
  }
};

export default async (option: GetStoreUrlOption): Promise<string> =>
  Platform.select({
    android: getPlayStoreUrl,
    ios: getAppStoreUrl,
  })(option);
