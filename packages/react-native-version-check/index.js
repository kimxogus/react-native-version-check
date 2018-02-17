// @flow
import VersionInfo from './src/RNVersionInfo';
import builder, { type ReactNativeVersionCheck } from './builder';

const RNVC: ReactNativeVersionCheck = builder(VersionInfo);

export default RNVC;
