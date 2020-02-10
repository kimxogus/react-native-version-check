// @flow
import { Platform } from 'react-native';
import isNil from 'lodash.isnil';
import isFunction from 'lodash.isfunction';

import * as providers from './providers';
import { IProvider, IVersionAndStoreUrl } from './providers/types';

const latestVersion = null;

export type GetLatestVersionOption = {
  forceUpdate?: boolean,
  provider?: string | Function | IProvider,
  fetchOptions?: any,
  ignoreErrors?: boolean,
};

export const defaultOption: GetLatestVersionOption = {
  forceUpdate: false,
  ignoreErrors: true,
  provider: Platform.select({
    ios: 'appStore',
    android: 'playStore',
  }),
};

export async function getLatestVersion(
  option: ?GetLatestVersionOption = {}
): Promise<string> {
  try {
    option = { ...defaultOption, ...option };

    if (!option.forceUpdate && !isNil(latestVersion)) {
      return Promise.resolve(latestVersion);
    }

    if (option.provider.getVersion) {
      const { version }: IVersionAndStoreUrl = await option.provider.getVersion(
        option
      );
      return Promise.resolve(version);
    }

    if (providers[option.provider]) {
      const { version }: IVersionAndStoreUrl = await providers[
        option.provider
      ].getVersion(option);
      return Promise.resolve(version);
    }

    if (isFunction(option.provider)) {
      return Promise.resolve(option.provider(option));
    }

    return Promise.reject(`Invalid provider: ${option.provider}`);
  } catch (e) {
    if (option.ignoreErrors) {
      console.warn(e); // eslint-disable-line no-console
    } else {
      throw e;
    }
  }
}
