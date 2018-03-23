// @flow
export interface IProvider {
  getVersion: any => Promise<string>;
}
