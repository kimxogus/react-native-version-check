// @flow
import semver from 'semver';
import isNil from 'lodash.isnil';

import { getVersionInfo } from './versionInfo';
import {
  getLatestVersion,
  defaultOption as defaultOptionForLatestVersion,
} from './getLatestVersion';

const DELIMITER = '.';

function getVersionWithDepth(version: string, depth: number): string[] {
  let versionArray = null;
  if (version.indexOf(DELIMITER) === -1) {
    versionArray = [version];
  } else {
    versionArray = version
      .split(DELIMITER)
      .slice(0, Math.min(depth, version.length));
  }
  return [...versionArray, ...[0, 0, 0].slice(0, 3 - versionArray.length)].join(
    DELIMITER
  );
}

export type NeedUpdateOption = {
  currentVersion?: string,
  latestVersion?: string,
  depth?: number,
  ignoreErrors?: boolean,
};

export type NeedUpdateResult = {
  isNeeded: boolean,
  currentVersion: string,
  latestVersion: string,
};

export default async function needUpdate(
  option: ?NeedUpdateOption = {}
): Promise<NeedUpdateResult> {
  try {
    option = {
      currentVersion: null,
      latestVersion: null,
      depth: Infinity,
      ignoreErrors: true,
      ...defaultOptionForLatestVersion,
      ...option,
    };

    if (isNil(option.currentVersion)) {
      option.currentVersion = getVersionInfo().getCurrentVersion();
    }

    if (isNil(option.latestVersion)) {
      option.latestVersion = await getLatestVersion(option);
    }

    return checkIfUpdateNeeded(
      option.currentVersion,
      option.latestVersion,
      option
    );
  } catch (e) {
    if (option.ignoreErrors) {
      console.warn(e); // eslint-disable-line no-console
    } else {
      throw e;
    }
  }
}

function checkIfUpdateNeeded(currentVersion, latestVersion, option) {
  const currentVersionWithDepth = getVersionWithDepth(
    currentVersion,
    option.depth
  );
  const latestVersionWithDepth = getVersionWithDepth(
    latestVersion,
    option.depth
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

  return Promise.resolve(
    semver.gt(latestVersionWithDepth, currentVersionWithDepth)
      ? needed
      : notNeeded
  );
}
