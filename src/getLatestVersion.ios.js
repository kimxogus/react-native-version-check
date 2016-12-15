/**
 * Created by kimxogus on 2016. 12. 15..
 */
import { PACKAGE_NAME } from "./native";

let latestVersion;

export default () => {
    if (latestVersion) {
        return Promise.resolve(latestVersion);
    } else {
        return Promise.resolve()
            .then(() => {
                return fetch("https://itunes.apple.com/${COUNTRY}/app/${APP_NAME}/id${APP_ID}?mt=8", { timeout: 5000 })
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