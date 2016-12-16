/**
 * Created by kimxogus on 2016. 12. 16..
 */
import Native  from "./native";
import { getLatestVersion } from "./getLatestVersion";


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

export default function needUpdate(depth = Infinity, delimiter = ".") {
  if (typeof depth === "string") {
    delimiter = depth;
    depth = Infinity;
  }

  let currentVersion = Native.getCurrentVersion();

  return Promise.resolve()
    .then(() => getLatestVersion())
    .then((latestVersion) => {
      currentVersion = getVersionNumberArray(currentVersion, depth, delimiter);
      let latestVersionArr = getVersionNumberArray(latestVersion, depth, delimiter);

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

      for (let i = 0; i < depth; i++) {
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
    });
}
