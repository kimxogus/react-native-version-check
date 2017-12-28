module.exports = {
  Platform: {
    select(selection) {
      return selection[process.env.RNVC_DEVICE || 'android'];
    },
  },
  NativeModules: {
    RNVersionCheck: {
      country: 'ko',
      packageName: 'com.reactnative.versioncheck',
      currentBuildNumber: 1,
      currentVersion: '0.0.1',
    }
  }
};
