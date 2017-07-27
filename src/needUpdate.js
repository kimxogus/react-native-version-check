import isNil from 'lodash.isnil';
import pick from 'lodash.pick';
import isPlainObject from 'lodash.isplainobject';

import Native from './native';
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
  if (arguments.length && !isPlainObject(option)) {
    console.warn(
      '[DEPRECATED] Use object type option instead. https://github.com/kimxogus/react-native-version-check#needUpdate'
    );
    needUpdateDeprecated.apply(null, arguments);
  }

  option = {
    currentVersion: Native.getCurrentVersion(),
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

/**
 * @see https://github.com/kimxogus/react-native-version-check#needUpdate
 * @deprecated Use object type option instead.
 * @since 1.0
 */
function needUpdateDeprecated(depth = Infinity, delimiter = '.') {
  if (typeof depth === 'string') {
    delimiter = depth;
    depth = Infinity;
  }

  return getLatestVersion().then(latestVersion =>
    checkIfUpdateNeeded(Native.getCurrentVersion(), latestVersion, {
      depth,
      delimiter,
    })
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
    if (!isNaN(+latestVersionToken) && !isNaN(+currentVersionToken) && +latestVersionToken > +currentVersionToken) {
      return Promise.resolve(needed);
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
