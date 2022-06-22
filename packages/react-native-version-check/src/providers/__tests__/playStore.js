import PlayStoreProvider from '../playStore';

const options = {
  packageName: 'com.myapp',
};

const storeUrl =
  'https://play.google.com/store/apps/details?id=com.myapp&hl=en&gl=US';

const mockSuccesfulResponse = returnBody => {
  global.fetch = jest.fn().mockImplementationOnce(
    () =>
      new Promise(resolve => {
        resolve(new Response(returnBody));
      })
  );
};

describe('PlayStoreProvider get version from older Play Store layouts', () => {
  it('get version from older (since ~Apr, 2018) Play Store layout', async () => {
    mockSuccesfulResponse(
      '\
      <html>\
      <div class="hAyfc">\
        <div class="BgcNfc">\
            Current Version\
        </div>\
        <span class="htlgb">\
          <div>\
            <span class="htlgb">0.10.0</span>\
          </div>\
        </span>\
      </div>\
      </html>\
    '
    );

    await PlayStoreProvider.getVersion(options).then(r =>
      expect(r).toEqual({ version: '0.10.0', storeUrl })
    );
  });

  it('get version from ancient (prior to ~Apr, 2018) Play Store layout', async () => {
    mockSuccesfulResponse(
      '\
      <html>\
      <div class="hAyfc">\
        <div class="BgcNfc">\
            Current Version\
        </div>\
        <span class="htlgb">\
            <span class="softwareVersion">0.10.0</span>\
        </span>\
      </div>\
      </html>\
    '
    );

    await PlayStoreProvider.getVersion(options).then(r =>
      expect(r).toEqual({ version: '0.10.0', storeUrl })
    );
  });
});

describe('PlayStoreProvider get version current (since ~Dec, 2018) Play Store', () => {
  it('with format x.x.x', async () => {
    mockSuccesfulResponse(
      '\
      <html>\
      <div class="hAyfc">\
        <div class="BgcNfc">\
            Current Version\
        </div>\
        <span class="htlgb">\
          <div class="IQ1z0d">\
            <span class="htlgb">0.10.0</span>\
          </div>\
        </span>\
      </div>\
      </html>\
    '
    );

    await PlayStoreProvider.getVersion(options).then(r =>
      expect(r).toEqual({ version: '0.10.0', storeUrl })
    );
  });

  it('with format xxx', async () => {
    mockSuccesfulResponse(
      '\
      <html>\
      <div class="hAyfc">\
        <div class="BgcNfc">\
            Current Version\
        </div>\
        <span class="htlgb">\
          <div class="IQ1z0d">\
            <span class="htlgb">234</span>\
          </div>\
        </span>\
      </div>\
      </html>\
    '
    );

    await PlayStoreProvider.getVersion(options).then(r =>
      expect(r).toEqual({ version: '234', storeUrl })
    );
  });
});

describe('PlayStoreProvider get version current (since ~May, 2022) Play Store', () => {
  it('with format x.x.x', async () => {
    mockSuccesfulResponse(
      'null,null,[[null,1]],null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,[2],null,[[["0.10.0"]],[[[30,"11"]],[[[16,"4.1"]]]],[["May 31, 2022"]]]'
    );

    await PlayStoreProvider.getVersion(options).then(r =>
      expect(r).toEqual({ version: '0.10.0', storeUrl })
    );
  });

  it('with format xxx', async () => {
    mockSuccesfulResponse(
      'null,null,[[null,1]],null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,[2],null,[[["234"]],[[[30,"11"]],[[[16,"4.1"]]]],[["May 31, 2022"]]]'
    );

    await PlayStoreProvider.getVersion(options).then(r =>
      expect(r).toEqual({ version: '234', storeUrl })
    );
  });
});
