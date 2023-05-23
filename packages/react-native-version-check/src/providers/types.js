// @flow
export interface IProvider {
  getVersion: any => Promise<string>;
}

export interface IVersionAndStoreUrl {
  version: string;
  updatedTime: Date | undefined;
  storeUrl: string;
}
