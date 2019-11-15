import PlayStoreProvider from '../playStore';

const options = {
  packageName: 'com.myapp',
};

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
      expect(r).toBe('0.10.0')
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
      expect(r).toBe('0.10.0')
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
      expect(r).toBe('0.10.0')
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
      expect(r).toBe('234')
    );
  });
});
