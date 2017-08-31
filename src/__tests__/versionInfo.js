import VersionInfo from '../versionInfo';

describe('Native', () => {
  it('Native variables should match', () => {
    expect(VersionInfo.getCountry()).toBe('ko');
    VersionInfo.getCountryAsync().then(country => expect(country).toBe('ko'));
    expect(VersionInfo.getPackageName()).toBe('com.reactnative.versioncheck');
    expect(VersionInfo.getCurrentBuildNumber()).toBe(1);
    expect(VersionInfo.getCurrentVersion()).toBe('0.0.1');
  });
});
