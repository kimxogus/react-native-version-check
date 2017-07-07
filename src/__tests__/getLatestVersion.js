import { getLatestVersion } from '../getLatestVersion';

describe('getLatestVersion', () => {
  it('get latest version properly', () => {
    getLatestVersion({
      url: 'https://itunes.apple.com/kr/app/apple-store/id375380948'
    }).then(r =>expect(typeof (+r) === 'number').toBeTruthy());
  });

  it('reject with invalid response', () => {
    getLatestVersion({
      url: 'http://invalid.url/'
    }).then(() => {
      throw new Error();
    }).catch(e => expect(e).not.toBeNull());
  });
});
