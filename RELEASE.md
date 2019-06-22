## react-native-version-check Release documentation

1. Check if CI test succeeded.

   - [CircleCI](https://circleci.com/gh/kimxogus/react-native-version-check/tree/master)

2. Make sure `react-native-version-check-expo` depends on latest `react-native-version-check`

   - ex) When releasing `1.0.0`, `rnvc-expo@1.0.0` should depend on `rnvc@^1.0.0`
   - https://github.com/kimxogus/react-native-version-check/blob/master/packages/react-native-version-check-expo/package.json#L29

3. Run `lerna version VERSION`

   - Release commit and tag will be automatically pushed to remote

4. Run `lerna publish from-git` to release to npm
