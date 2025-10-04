export interface IVersionAndStoreUrl {
  version: string;
  storeUrl: string;
}

export interface IProvider {
  getVersion(option?: any): Promise<IVersionAndStoreUrl | undefined>;
}
