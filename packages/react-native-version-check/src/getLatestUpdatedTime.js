// @flow
import { Platform } from 'react-native';
import isFunction from 'lodash.isfunction';

import * as providers from './providers';
import { IProvider, IVersionAndStoreUrl } from './providers/types';

export type GetLatestUpdatedTimeOption = {
  provider?: string | Function | IProvider,
  fetchOptions?: any,
  ignoreErrors?: boolean,
};

export const defaultOption: GetLatestUpdatedTimeOption = {
  ignoreErrors: true,
  provider: Platform.select({
    ios: 'appStore',
    android: 'playStore',
  }),
};

const error = {
  message:
    "Parse Error. Your app's play store page doesn't seem to have latest app version info.",
};

export async function getLatestUpdatedTime(
  option: ?GetLatestUpdatedTimeOption = {}
): Promise<Date> {
  try {
    option = { ...defaultOption, ...option };

    if (option.provider.getVersion) {
      const {
        updatedTime,
      }: IVersionAndStoreUrl = await option.provider.getVersion(option);

      if (updatedTime instanceof Date) {
        return Promise.reject(error);
      }

      return Promise.resolve(updatedTime);
    }

    if (providers[option.provider]) {
      const { updatedTime }: IVersionAndStoreUrl = await providers[
        option.provider
      ].getVersion(option);

      if (updatedTime instanceof Date) {
        return Promise.reject(error);
      }

      return Promise.resolve(updatedTime);
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
