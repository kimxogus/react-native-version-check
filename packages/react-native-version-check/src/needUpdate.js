import isNil from 'lodash.isnil';
import pick from 'lodash.pick';

import { getVersionInfo } from './versionInfo';
import {
  getLatestVersion,
  defaultOption as defaultOptionForLatestVersion,
} from './getLatestVersion';

function getVersionNumberArray(version, depth, delimiter) {
  version = String(version);

  if (version.indexOf(delimiter) === -1) {
    return [version];
  } else {
    version = version.split(delimiter);

    const result = [];
    for (let i = 0, d = Math.min(depth, version.length); i < d; i++) {
      result.push(version[i]);
    }

    return result;
  }
}

export function needUpdate(option) {
  option = {
    currentVersion: getVersionInfo().getCurrentVersion(),
    latestVersion: null,
    depth: Infinity,
    semantic: false,
    delimiter: '.',
    ...defaultOptionForLatestVersion,
    ...option,
  };

  if (isNil(option.latestVersion)) {
    return getLatestVersion(
      pick(option, Object.keys(defaultOptionForLatestVersion))
    ).then(latestVersion =>
      checkIfUpdateNeeded(
        option.currentVersion,
        latestVersion,
        pick(option, ['depth', 'delimiter', 'semantic'])
      )
    );
  }

  return checkIfUpdateNeeded(
    option.currentVersion,
    option.latestVersion,
    pick(option, ['depth', 'delimiter', 'semantic'])
  );
}

function checkIfUpdateNeeded(currentVersion, latestVersion, option) {
  const currentVersionArr = getVersionNumberArray(
    currentVersion,
    option.depth,
    option.delimiter
  );
  const latestVersionArr = getVersionNumberArray(
    latestVersion,
    option.depth,
    option.delimiter
  );

  const needed = {
    isNeeded: true,
    currentVersion,
    latestVersion,
  };
  const notNeeded = {
    isNeeded: false,
    currentVersion,
    latestVersion,
  };

  for (let i = 0; i < option.depth; i++) {
    const latestVersionToken = latestVersionArr[i];
    const currentVersionToken = currentVersionArr[i];

    if (!latestVersionToken && !currentVersionToken) {
      return Promise.resolve(notNeeded);
    }
    if (!currentVersionToken && +latestVersionToken !== 0) {
      return Promise.resolve(needed);
    }
    if (!isNaN(+latestVersionToken) && !isNaN(+currentVersionToken)) {
      if (+latestVersionToken > +currentVersionToken){
        return Promise.resolve(needed);
      }
      else if (+latestVersionToken < +currentVersionToken) {
        return Promise.resolve(notNeeded);
      }
    }
    if (latestVersionToken > currentVersionToken) {
      return Promise.resolve(needed);
    }
    if (option.semantic && latestVersionToken < currentVersionToken) {
      return Promise.resolve(notNeeded);
    }
  }
  return Promise.resolve(notNeeded);
}
