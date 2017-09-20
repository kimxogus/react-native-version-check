import isNil from 'lodash.isnil';
import isFunction from 'lodash.isfunction';

import * as providers from './providers';

let latestVersion = null;

const providerMap = Object.keys(providers).reduce((a,b) => {
  a[b] = b;
  return a;
}, {});

export const defaultOption = {
  forceUpdate: false,
  provider: providerMap.store,
  fetchOptions: {
    timeout: 5000,
  },
};

export function getLatestVersion(option) {
  option = { ...defaultOption, ...option };

  if (!option.forceUpdate && !isNil(latestVersion)) {
    return Promise.resolve(latestVersion);
  }

  if (providers[option.provider]) {
    return Promise.resolve(providers[option.provider].get(option));
  }

  if (isFunction(option.provider)) {
    return Promise.resolve(option.provider(option));
  }

  return Promise.reject(`Invalid provider: ${option.provider}`);
}
