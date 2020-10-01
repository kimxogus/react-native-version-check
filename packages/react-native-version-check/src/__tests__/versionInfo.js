jest.mock('react-native');

import VersionInfo from '../RNVersionInfo';

describe('Native', () => {
  it('Native variables should match', async () => {
    await VersionInfo.getCountry().then(country => expect(country).toBe('ko'));
    expect(VersionInfo.getPackageName()).toBe('com.reactnative.versioncheck');
    expect(VersionInfo.getCurrentBuildNumber()).toBe(1);
    expect(VersionInfo.getCurrentVersion()).toBe('0.0.1');
  });
});
