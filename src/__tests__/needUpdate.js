import { needUpdate } from '../needUpdate';

describe('needUpdate', () => {
  it('should work well', () => {
    needUpdate({
      currentVersion: '2.0',
      latestVersion: '10.0',
    }).then(res => {
      expect(res.isNeeded).toBe(true);
    });
  });
});
