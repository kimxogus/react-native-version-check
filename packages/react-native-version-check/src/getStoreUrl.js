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
  try {
    if (isNil(option.appID)) {
      throw new Error('appID is empty.');
    }

    if (!option.country) {
      option.country = await getVersionInfo().getCountry();
    }

    const countryCode = option.country ? `${option.country}/` : '';

    return `https://itunes.apple.com/${countryCode}app/id${option.appID}`;
  } catch (e) {
    if (option.ignoreErrors) {
      console.warn(e); // eslint-disable-line no-console
    } else {
      throw e;
    }
  }
};

export const getPlayStoreUrl = async (
  option: ?GetPlayStoreUrlOption = {}
): Promise<string> => {
  try {
    if (!option.packageName) {
      option.packageName = await getVersionInfo().getPackageName();
    }
    return `https://play.google.com/store/apps/details?id=${
      option.packageName
    }`;
  } catch (e) {
    if (option.ignoreErrors) {
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
