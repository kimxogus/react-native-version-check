// @flow
import { Platform } from 'react-native';
import isNil from 'lodash.isnil';
import isFunction from 'lodash.isfunction';

import * as providers from './providers';
import { IProvider } from './providers/types';

const latestVersion = null;

export type GetLatestVersionOption = {
  forceUpdate?: boolean,
  provider?: string | Function | IProvider,
  fetchOptions?: any,
};

export const defaultOption: GetLatestVersionOption = {
  forceUpdate: false,
  provider: Platform.select({
    ios: 'appStore',
    android: 'playStore',
  }),
};

export function getLatestVersion(
  option: ?GetLatestVersionOption = {}
): Promise<string> {
  option = { ...defaultOption, ...option };

  if (!option.forceUpdate && !isNil(latestVersion)) {
    return Promise.resolve(latestVersion);
  }

  if (option.provider.getVersion) {
    return Promise.resolve(option.provider.getVersion(option));
  }

  if (providers[option.provider]) {
    return Promise.resolve(providers[option.provider].getVersion(option));
  }

  if (isFunction(option.provider)) {
    return Promise.resolve(option.provider(option));
  }

  return Promise.reject(`Invalid provider: ${option.provider}`);
}
