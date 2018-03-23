// @flow
export interface IVersionInfo {
  getCountry: () => Promise<string>;
  getPackageName: () => string;
  getCurrentBuildNumber: () => number;
  getCurrentVersion: () => string;
}

let VersionInfo: ?IVersionInfo = null;

export const setVersionInfo = (VI: IVersionInfo): void => (VersionInfo = VI);

export const getVersionInfo = (): IVersionInfo => VersionInfo;
