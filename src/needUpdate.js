/**
 * Created by kimxogus on 2016. 12. 16..
 */
import { isNil, isPlainObject, defaultsDeep, pick, keys } from "lodash";

import Native  from "./native";
import { getLatestVersion, defaultOption as defaultOptionForLatestVersion } from "./getLatestVersion";


function getVersionNumberArray(version, depth, delimiter) {
  version = String(version);

  if (version.indexOf(delimiter) == -1) {
    return version;
  } else {
    version = version.split(delimiter);

    let result = [];
    for (let i = 0, d = Math.min(depth, version.length); i < d; i++) {
      result.push(version[i]);
    }

    return result;
  }
}

export function needUpdate(option) {
  if (arguments.length && !isPlainObject(option)) {
    console.warn("[DEPRECATED] Use object type option instead. https://github.com/kimxogus/react-native-version-check#needUpdate");
    needUpdateDeprecated.apply(null, arguments);
  }

  option = defaultsDeep(option, {
    currentVersion: Native.getCurrentVersion(),
    latestVersion: null,
    depth: Infinity,
    delimiter: ".",

    ...defaultOptionForLatestVersion
  });

  if (isNil(option.latestVersion)) {
    return Promise.resolve()
      .then(() => getLatestVersion(pick(option, keys(defaultOptionForLatestVersion))))
      .then((latestVersion) => checkIfUpdateNeeded(option.currentVersion, latestVersion, pick(option, ["depth", "delimiter"])));
  }

  return Promise.resolve()
    .then(() => checkIfUpdateNeeded(option.currentVersion, option.latestVersion, pick(option, ["depth", "delimiter"])));
}

/**
 * @see https://github.com/kimxogus/react-native-version-check#needUpdate
 * @deprecated Since 1.0. Use object type option instead.
 */
function needUpdateDeprecated(depth = Infinity, delimiter = ".") {
  if (typeof depth === "string") {
    delimiter = depth;
    depth = Infinity;
  }

  let currentVersion = Native.getCurrentVersion();

  return Promise.resolve()
    .then(() => getLatestVersion())
    .then((latestVersion) => checkIfUpdateNeeded(currentVersion, latestVersion, { depth, delimiter }));
}

function checkIfUpdateNeeded(currentVersion, latestVersion, option) {
  currentVersion = getVersionNumberArray(currentVersion, option.depth, option.delimiter);
  let latestVersionArr = getVersionNumberArray(latestVersion, option.depth, option.delimiter);

  const needed = {
    isNeeded: true,
    currentVersion: currentVersion,
    latestVersion: latestVersion
  };
  const notNeeded = {
    isNeeded: false,
    currentVersion: currentVersion,
    latestVersion: latestVersion
  };

  for (let i = 0; i < option.depth; i++) {
    if (!latestVersionArr[i] && !currentVersion[i]) {
      return Promise.resolve(notNeeded);
    }
    if (!currentVersion[i]) {
      return Promise.resolve(needed);
    }
    if (latestVersionArr[i] > currentVersion[i]) {
      return Promise.resolve(needed);
    }
  }
  return Promise.resolve(notNeeded);
}
