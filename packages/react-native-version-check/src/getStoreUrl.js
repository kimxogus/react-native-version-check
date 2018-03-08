// @flow
import { Platform } from 'react-native';
import isNil from 'lodash.isnil';
import { getVersionInfo } from './versionInfo';

export type GetAppStoreUrlOption = {
  country?: string,
  appName: string,
  appID: string,
}

export type GetPlayStoreUrlOption = {
  packageName?: string,
}

export type GetStoreUrlOption = GetAppStoreUrlOption & GetPlayStoreUrlOption

export const getAppStoreUrl = async (option: GetAppStoreUrlOption): Promise<string> => {
  if (isNil(option.appID) || isNil(option.appName)) {
    throw new Error('At least one of appID and appName is empty.');
  }

  if (!option.country) {
    option.country = await getVersionInfo().getCountry();
  }

  return `https://itunes.apple.com/${option.country}/app/${option.appName}/id${option.appID}`;
};

export const getPlayStoreUrl = async (option: ?GetPlayStoreUrlOption = {}): Promise<string> => {
  if (!option.packageName) {
    option.packageName = await getVersionInfo().getPackageName();
  }
  return `https://play.google.com/store/apps/details?id=${option.packageName}`;
};

export default async (option: GetStoreUrlOption): Promise<string> => {
  return Platform.select({
    android: getPlayStoreUrl,
    ios: getAppStoreUrl,
  })(option);
};
