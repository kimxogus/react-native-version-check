import { needUpdate } from '../needUpdate';

describe('needUpdate', () => {
  it('should work well', () => {
    needUpdate({
      currentVersion: 10,
      latestVersion: 20,
    });
  });
});
