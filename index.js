import { NativeModules } from 'react-native';

const { RNVersionCheck } = NativeModules;

const getCurrentVersion = RNVersionCheck.currentVersion;
const getLatestVersion = RNVersionCheck.latestVersion;


export default {
    getCurrentVersion,
    getLatestVersion,
    needUpdate: (depth = Infinity, delimiter = '.') => {
        if(typeof depth === 'string') {
            delimiter = depth;
            depth = Infinity;
        }

        let currentVersion, latestVersion;

        return Promise.resolve()

            .then(getCurrentVersion)
            .then((ver) => {
                currentVersion = ver;
            })

            .then(getLatestVersion)
            .then((ver) => {
                latestVersion = ver;
            })

            .then(() => {
                currentVersion = getVersion(currentVersion, depth, delimiter);
                latestVersion = getVersion(latestVersion, depth, delimiter);

                for(let i = 0; i < depth; i++) {
                    if(latestVersion[i] > currentVersion[i]) {
                        return Promise.resolve(true);
                    }
                }
                return Promise.resolve(false);
            });
    }
};


function getVersion(version, depth, delimiter) {
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