/**
 * Created by kimxogus on 2016. 12. 15..
 */
import { getLatestVersionNative, PACKAGE_NAME } from "./native";

let latestVersion;

export default () => {
    if (latestVersion) {
        return Promise.resolve(latestVersion);
    } else {
        return getLatestVersionNative()
            .then((version) => {
                latestVersion = version;
                return Promise.resolve(latestVersion);
            })
            .catch(() => {
                return fetch("https://play.google.com/store/apps/details?id=" + PACKAGE_NAME, { timeout: 5000 })
                    .then(res => {
                        return res.text();
                    })
                    .then((text) => {
                        const startToken = "softwareVersion\">";
                        const endToken = "<";

                        const indexStart = text.indexOf(startToken);

                        if (indexStart == -1) {
                            return Promise.reject();
                        } else {
                            text = text.substr(indexStart + startToken.length);
                            text = text.substr(0, text.indexOf(endToken));

                            latestVersion = text.trim();
                            return Promise.resolve(latestVersion);
                        }
                    });
            });
    }
};