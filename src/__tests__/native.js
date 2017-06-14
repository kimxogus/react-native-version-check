import Native from '../native';

describe('Native', () => {
  it('Native variables should match', () => {
    expect(Native.getCountry()).toBe('ko');
    expect(Native.getPackageName()).toBe('com.reactnative.versioncheck');
    expect(Native.getCurrentBuildNumber()).toBe(1);
    expect(Native.getCurrentVersion()).toBe('0.0.1');
  });
});
