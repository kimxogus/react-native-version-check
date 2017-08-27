import { setAppID, setAppName } from '../providers/store';
import { getLatestVersion } from '../getLatestVersion';

describe('getLatestVersion', () => {
  it('get latest version properly', () => {
    setAppID('375380948');
    setAppName('apple-store');

    getLatestVersion()
      .then(r =>expect(typeof (+r) === 'number').toBeTruthy());
  });

  it('reject with invalid response', () => {
    getLatestVersion({
      provider: () => fetch('http://invalid.url/')
    }).then(() => {
      throw new Error();
    }).catch(e => expect(e).not.toBeNull());
  });
});
