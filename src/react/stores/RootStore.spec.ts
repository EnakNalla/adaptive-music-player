import RootStore from './rootStore';

describe('RootStore', () => {
  let rootStore: RootStore;
  beforeEach(() => {
    rootStore = new RootStore();
  });

  it('should load initialConfig', async () => {
    window.api.getConfigs = jest
      .fn()
      .mockResolvedValue([{ name: 'test', loadOnInit: true, songs: [] }]);

    await rootStore.initData();

    expect(rootStore.configStore.loadedConfig).toBe('test');
  });
});
