import { NativeModules } from 'react-native';

const { RNVersionCheck } = NativeModules;

const CURRENT_VERSION = RNVersionCheck.currentVersion;
const LATEST_VERISON = RNVersionCheck.latestVersion;


export default {
    getCurrentVersion: () => CURRENT_VERSION,
    getLatestVersion: () => LATEST_VERISON,
    needUpdate: (depth = 1, delimiter = '.') => {
        const currentVersion = getVersion(CURRENT_VERSION, depth, delimiter);
        const latestVersion = getVersion(LATEST_VERISON, depth, delimiter);

        for(let i = 0; i < depth; i++) {
            if(latestVersion[i] > currentVersion[i]) {
                return true;
            }
        }

        return false;
    }
};


function getVersion(version = "0", depth = 1, delimiter = '.') {
    version = String(version);

    if(version.indexOf(delimiter) == -1) {
        return version;
    } else {
        version = version.split(delimiter);

        let result = [];
        for(let i = 0, d = Math.min(depth, version.length); i < d; i++) {
            result.push(version[i]);
        }

        return result;
    }
}